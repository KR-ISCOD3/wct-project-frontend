import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

// Register Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const StudentPieChart = () => {
  const data = {
    labels: ["Male Students", "Female Students"],
    datasets: [
      {
        data: [800, 502], // Example data
        backgroundColor: ["#297078", "#4fadb2"],
        hoverBackgroundColor: ["#45a049", "#f57c00"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 14,
            family: "Poppins, sans-serif",
          },
          color: "#333",
        },
      },
      datalabels: {
        color: "#fff", // Text color (change as needed)
        font: {
          size: 16,
          weight: "bold",
        },
        formatter: (value) => value, // Show numbers
        anchor: "end",
        align: "start",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "270px",
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
};

export default StudentPieChart;
