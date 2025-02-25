import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const IncomeLineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Income ($)",
        data: [1000, 3300, 9500, 3500, 13000, 12500, 14000, 14500, 13500, 15000, 15500, 16000],
        borderColor: "#245b61",
        backgroundColor: "rgba(123, 139, 124, 0.2)",
        pointBackgroundColor: "#4CAF50",
        pointBorderColor: "#fff",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Poppins, sans-serif",
          },
          color: "#333",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Income ($)",
          font: {
            size: 14, // Increased font size for readability
          },
        },
        beginAtZero: true,
        grid: {
          color: "#ddd", // Lighter grid lines
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "270px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default IncomeLineChart;
