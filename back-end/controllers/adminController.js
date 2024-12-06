const Project = require("../models/Project");
const Report = require("../models/Report");
const User = require("../models/User");
const APIFeatures = require("../utils/APIFeaturs");
const filterObject = require("../utils/filterObject");
const { jsPDF } = require("jspdf");
const autoTable = require("jspdf-autotable");

exports.getData = async (req, res) => {
  try {
    const [userCounts, projectCounts, projects, activityData] =
      await Promise.all([
        User.aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]),
        Project.aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]),
        Project.find({}, "status majors"),
        Project.aggregate([
          {
            $group: {
              _id: { $month: "$startDate" },
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ]),
      ]);

    const activeUsersCount =
      userCounts.find((item) => item._id === "Active")?.count || 0;
    const bannedUsersCount =
      userCounts.find((item) => item._id === "Banned")?.count || 0;

    const activeProjectsCount = projectCounts
      .filter((item) => ["Not Started", "In Progress"].includes(item._id))
      .reduce((sum, item) => sum + item.count, 0);
    const doneProjectsCount =
      projectCounts.find((item) => item._id === "Finished")?.count || 0;

    // Process major counts
    const majorCounts = {};
    projects.forEach((project) => {
      const status = project.status || "Unknown Status";
      project.majors.forEach((major) => {
        if (!majorCounts[major]) {
          majorCounts[major] = {
            Completed: 0,
            "In Progress": 0,
            Open: 0,
            "Not Started": 0,
          };
        }
        if (status in majorCounts[major]) {
          majorCounts[major][status] += 1;
        }
      });
    });

    // Format major counts for chart
    const resultList = [
      ["Major", "Completed", "In Progress", "Open", "Not Started"],
    ];
    for (const [major, counts] of Object.entries(majorCounts)) {
      resultList.push([
        major,
        counts.Completed || 0,
        counts["In Progress"] || 0,
        counts.Open || 0,
        counts["Not Started"] || 0,
      ]);
    }

    const quarterMap = {
      1: "Q1",
      2: "Q1",
      3: "Q1",
      4: "Q2",
      5: "Q2",
      6: "Q2",
      7: "Q3",
      8: "Q3",
      9: "Q3",
      10: "Q4",
      11: "Q4",
      12: "Q4",
    };

    const quarterlyData = activityData.reduce((acc, { _id: month, count }) => {
      const quarter = quarterMap[month];
      acc[quarter] = (acc[quarter] || 0) + count;
      return acc;
    }, {});

    const lineChartData = [["Quarter", "Users"]];
    ["Q1", "Q2", "Q3", "Q4"].forEach((quarter) => {
      lineChartData.push([quarter, quarterlyData[quarter] || 0]);
    });

    res.status(200).json({
      success: true,
      record: {
        activeUsers: activeUsersCount,
        bannedUsers: bannedUsersCount,
        activeP: activeProjectsCount,
        DoneP: doneProjectsCount,
        majorChartData: resultList,
        userActivityChart: lineChartData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching data.",
      error: error.message,
    });
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const mockRes = {
      json(data) {
        this.data = data;
      },
      status(code) {
        this.statusCode = code;
        return this;
      },
    };
    await exports.getData(req, mockRes);
    console.log(mockRes);
    if (!mockRes) {
      throw new Error("Failed to fetch data for PDF generation.");
    }
    const {
      activeUsers,
      bannedUsers,
      activeP,
      DoneP,
      majorChartData,
      userActivityChart,
    } = mockRes.data.record;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40, 60, 100);
    doc.text("Statistical Report", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Generated on " + new Date().toLocaleDateString(), 105, 30, {
      align: "center",
    });

    doc.setDrawColor(100);
    doc.line(20, 35, 190, 35);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Summary", 20, 45);

    doc.setFontSize(12);
    doc.text(`- Active Users: ${activeUsers}`, 20, 55);
    doc.text(`- Banned Users: ${bannedUsers}`, 20, 63);
    doc.text(`- Active Projects: ${activeP}`, 20, 71);
    doc.text(`- Completed Projects: ${DoneP}`, 20, 79);

    autoTable.default(doc, {
      startY: 85,
      head: [["Quarter", "Users"]],
      body: userActivityChart.slice(1),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [100, 100, 255] },
      alternateRowStyles: { fillColor: [240, 240, 255] },
    });

    autoTable.default(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [majorChartData[0]],
      body: majorChartData.slice(1),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [100, 255, 100] },
      alternateRowStyles: { fillColor: [240, 255, 240] },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("This is an auto generated file.", 105, pageHeight - 10, {
      align: "center",
    });

    const pdfOutput = doc.output("arraybuffer");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=Statistical_Report.pdf"
    );
    res.status(200).send(Buffer.from(pdfOutput));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while generating the PDF.",
      error: error.message,
    });
  }
};

exports.getUsersData = async (req, res) => {
  try {
    const features = new APIFeatures(
      User.find({}, "username major status"),
      req.query
    ).filterUser();
    const users = await features.query;
    const projects = await Project.find({}, "members");

    const userProjectCount = {};
    projects.forEach((project) => {
      project.members.forEach((memberId) => {
        userProjectCount[memberId] = (userProjectCount[memberId] || 0) + 1;
      });
    });
    const formattedData = users.map((user) => {
      const projectCount = userProjectCount[user._id.toString()] || 0;
      return {
        id: user._id,
        Username: user.username,
        Major: user.major || "Unknown",
        Count: projectCount,
        Status: user.status,
      };
    });
    res.status(200).json({
      success: true,
      record: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data.",
      error: error.message,
    });
  }
};

exports.banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { status: "Banned" },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User with ID ${id} has been banned.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while banning the user.",
      error: error.message,
    });
  }
};

exports.unBanUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { status: "Active" },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User with ID ${id} has been unbanned.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while unbanning the user.",
      error: error.message,
    });
  }
};
exports.getReports = async (req, res) => {
  try {
    const features = new APIFeatures(
      Report.find()
        .populate("project", "_id title description")
        .sort({ date: -1 }),
      req.query
    ).filterReports();
    const reports = await features.query;
    console.log(reports);
    const formattedReports = reports.map((report) => ({
      id: report._id,
      projectID: report.project?._id || -1,
      projectTitle: report.project?.title || "Unknown Project",
      projectDescription:
        report.project?.description || "No description available",
      reportDescription: report.description,
      date: report.date,
      status: report.status,
    }));
    res.status(200).json({
      success: true,
      record: formattedReports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching reports.",
      error: error.message,
    });
  }
};
