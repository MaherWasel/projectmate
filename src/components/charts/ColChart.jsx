
import { Chart } from "react-google-charts";


export const options = {
    title: "Projects / Major",
    titleTextStyle: {
      color: "#FFFFFF", // Title text color in white
      fontSize: 18, // Title font size
      fontName: "Tajawal", // Use the font from font-face
    },
    chartArea: { width: "65%", backgroundColor: "#31363F" },
    vAxis: {
      title: "Major",
      titleTextStyle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontName: "Tajawal", // Use the font from font-face
      },
      textStyle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontName: "Tajawal", // Use the font from font-face
      },
    },
    hAxis: {
      title: "Total Projects",
      minValue: 0,
      titleTextStyle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontName: "Tajawal", // Use the font from font-face
      },
      textStyle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontName: "Tajawal", // Use the font from font-face
      },
    },
    legend: {
      textStyle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontName: "Tajawal", // Use the font from font-face
      },
    },
    backgroundColor: "#31363F",
    colors: ["#ACADB3", "#76ABAE"],
  };
  
export default function ColChart({data}){
    return ( <span className="bg-lightGray p-2 rounded-lg overflow-hidden">
        <Chart
          chartType="ColumnChart"
          width="700px"
          height="400px"
          data={data}
          options={options}
        />
      </span>);
}