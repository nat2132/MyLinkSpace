import Header from "../Header/header";
import SectionHeaderText from "./components/SectionHeaderText";
import AnalyticsSummary from "./components/AnalyticSummary";
import DateSelector from "./components/DateSelector";
import LinkInsights from "./components/LinkInsights";

import ExportWordReport from "./components/ExportWordReport";
import Performance from "./components/performance";
import BarchartHolder from "./components/barchartHolder";
import "./analytics.css";

import { noDataIcon } from "./data/const";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
function Analytics() {
  return (
    <>
    <Header/>
      <div className="analytics">
        <AnalyticsSummary />

        <div className="wraper px-5 md:px-10 lg:px-96 py-5 flex flex-col gap-10">
          <DateSelector />
          <div className="activity">
            <SectionHeaderText>Analytics</SectionHeaderText>
            <div className="lg:px-10 grid place-items-center bg-white rounded-[8px] h-[245px] mt-5">
              <div className="grid place-items-center p-5 gap-3">
                <img src={noDataIcon} alt="Icon" />
                <h1 className="text-[16px] font-semibold">No activity data</h1>
                <p className="text-sm">
                  No activity in selected time range. Learn about sharing your
                  Linktree.
                </p>
              </div>
            </div>
          </div>

          <LinkInsights />

          <Performance />
          <BarchartHolder />

          <ExportWordReport />
        </div>
      </div>
    </>
  );
}

export default Analytics;
