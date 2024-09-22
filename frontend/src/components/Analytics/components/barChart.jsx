import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { fetchClicksPerLink } from "../api/analyticsAPI";
import NoData from "./noData";
import { linkDatadefault } from "../data/const";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [barGraphData, setBarData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBarData = async () => {
      const data = await fetchClicksPerLink();
      setBarData(data.data);
      if (data.error) {
        setError(data.error);
        //   setBarData(linkDatadefault);
      }
    };

    getBarData();
  }, []);

  const barData = {
    labels: barGraphData.map((item) => item.link), // Extracting links for labels
    datasets: [
      {
        label: "Total Clicks",
        data: barGraphData.map((item) => item.total_clicks), // Extracting clicks for data
        backgroundColor: "#36A2EB", // Choose a color for the bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Clicks PerLink",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Links",
        },
      },
    },
  };

  return (
    <>
      
      <Bar data={barData} options={options} />
      {!barGraphData.length && (
        <div className=" flex justify-between">
          {" "}
          <span className="text-xs text-red-300">{error}</span>
        </div>
      )}
    </>
  );
}
