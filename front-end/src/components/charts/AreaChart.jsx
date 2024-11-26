
import { Chart } from "react-google-charts";


export const options = {
    title: "Users Activity",
    titleTextStyle: {
      color: "#FFFFFF", // Title text color in white
      fontSize: 18, // Title font size
      fontName: "Tajawal", // Use the font from font-face
    },
    chartArea: { width: "60%", backgroundColor: "#31363F" },
    vAxis: {
      title: "Count",
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
      title: "Year",
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
      position: "none",
    },
    backgroundColor: "#31363F",
    colors: ["#2874a6", "#1f618d"],
  };
  
export default function AreaChart({data}){
    return ( <span className="bg-lightGray p-2 rounded-lg overflow-hidden">
        <Chart
          chartType="AreaChart"
          width="500px"
          height="380px"
          data={data}
          options={options}
        />
      </span>);
}