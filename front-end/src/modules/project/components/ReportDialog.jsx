import { Cancel } from "@mui/icons-material";
import Dialog from "../../../components/dialoge/Dialog";
import Divider from "../../../components/divider/Divider";
import Textarea from "../../../components/input/TextArea";
import Button from "../../../components/buttons/SubmitButton";
import axios from "axios";
import { useState } from "react";
import backendUrl from "../../../helpers/utils";

export default function ReportDialog({ dialogRef, targetType, targetId }) {
  const [reportState, setReportState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: undefined,
    message: undefined,
  });

  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!description.trim()) return;

    setReportState({
      loading: true,
      success: false,
      error: false,
      errorMessage: undefined,
      message: undefined,
    });

    const apiUrl =
      targetType === "project"
        ? `${backendUrl}/projects/${targetId}/report`
        : `${backendUrl}/profile/${targetId}/report`;

    try {
      const response = await axios.post(
        apiUrl,
        { description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setReportState({
          loading: false,
          success: true,
          error: false,
          message: response.data.message || "Report submitted successfully!",
        });
      }
    } catch (e) {
      setReportState({
        loading: false,
        success: false,
        error: true,
        errorMessage: e.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <Dialog ref={dialogRef}>
      <div className="flex bg-darkGray p-4 flex-col gap-4 text-2xl text-redError font-semibold">
        <div className="flex justify-between w-full">
          <h1>{targetType === "project" ? "Report Project" : "Report User"}</h1>
          <Cancel
            onClick={() => dialogRef.current.close()}
            className="text-lightBlue hover:cursor-pointer"
          />
        </div>
        <Divider color="lightBlue" />
        <Textarea
          rowNum={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {reportState.error && (
          <p className="text-red-600 my-4">{reportState.errorMessage}</p>
        )}
        {reportState.success && (
          <p className="text-green-400 my-4">{reportState.message}</p>
        )}
        <div>
          {!reportState.success && (
            <Button
              onClick={handleSubmit}
              loading={reportState.loading}
              disabled={!description.trim() || reportState.loading}
            >
              Submit
            </Button>
          )}
          {reportState.success && (
            <Button onClick={() => dialogRef.current.close()}>Close</Button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
