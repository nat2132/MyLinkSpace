import SectionHeaderText from "./SectionHeaderText";
import CardWraper from "./cardWraper";

import { Doughnut } from "react-chartjs-2";

import { useState, useEffect } from "react";
import { fetchPerformancedata } from "../api/analyticsAPI";
import NoData from "./noData";

import { performancedata } from "../data/const";

export default function Performance() {
  const [Performance, setPerformance] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPerformancedata = async () => {
      const data = await fetchPerformancedata();
      setPerformance(data.data);

      if (data.error) {
        setError(data.error);
        setPerformance(performancedata);
      }
    };

    getPerformancedata();
  }, []);

  const pieData = {
    datasets: [
      {
        data: Performance?.map((item) => item.clicks),
        backgroundColor: Performance?.map((item) => item.color),
      },
    ],
  };

  return (
    <div className="socialIcons">
      <div className="flex justify-between">
        {" "}
        <SectionHeaderText>Performance</SectionHeaderText>
      </div>

      <CardWraper>
        <div className="w-full h-full bg-[#676B5F] inset-0 rounded-[8px] bg-opacity-[2%] absolute"></div>

        <div className="text-sm text-[#2b3035] flex gap-2">
          <span className=" font-semibold">Clicks</span>{" "}
          <span className=" border-r border-gray-400"> </span>
          <span>chart</span>
        </div>
        {!Performance.length && (
          <div className="grid place-content-center w-full">
            <NoData />
            <div className="grid place-items-center">
              <span className="text-xs  text-red-300">{error}</span>
            </div>
          </div>
        )}
        <div className="flex  justify-between  items-center">
          <div className=" flex flex-col gap-1 justify-between  ">
            {Performance.map((p) => {
              return (
                <div className="flex flex-row  gap-1 items-center" key={p.name}>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: p.color }}
                  ></div>
                  <h1 className="text-[#212529] text-sm md:text-[14px]">
                    {p.name}
                  </h1>
                  <h2 className="md:text-[14px]  text-sm font-semibold text-[#212529]">
                    {p.clicks}
                  </h2>
                </div>
              );
            })}
          </div>
          <div className="p-5 mt-10 w-[170px] md:w-[200px]">
            <Doughnut data={pieData} />
          </div>
        </div>
        <div className="text-xs text-[#2b3035] flex gap-2">
          <span className="">Doughnut Chart</span>{" "}
        </div>

        <p className="text-xs text-[#53585F] border-t border-[#ebeef0] py-3 mt-3">
          <span className=" underline">Performance</span> metrics provide the
          average clicks generated daily, weekly, and monthly.
        </p>
      </CardWraper>
    </div>
  );
}
