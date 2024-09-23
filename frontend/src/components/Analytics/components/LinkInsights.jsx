import CardWraper from "./cardWraper";
import SectionHeaderText from "./SectionHeaderText";
import NoData from "./noData";

import { useState, useEffect } from "react";
import { fetchTopAndBottomLinks } from "../api/analyticsAPI";
import { topAndBottomLinksDummy } from "../data/const";

export default function LinkInsights() {
  const [topAndBottomLinks, setTopAndBottomLinks] = useState({
    top_links: [],
    bottom_links: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopAndBottomLinks = async () => {
      const data = await fetchTopAndBottomLinks();
      setTopAndBottomLinks(data.data);
      if (data.error) {
        setError(data.error);
        // setTopAndBottomLinks(topAndBottomLinksDummy);
      }
    };

    getTopAndBottomLinks();
  }, []);

  return (
    <div className="ClicksPerLink">
      <div className="flex justify-between">
        {" "}
        <SectionHeaderText>Link Insights</SectionHeaderText>
      </div>
      <div>
        <p className="text-sm text-gray-500 mt-5">Top Performing Links</p>
      </div>
      <CardWraper>
        <div className="w-full h-full bg-[#676B5F] inset-0 rounded-[8px] bg-opacity-[2%] absolute"></div>
        <div className="flex justify-end text-sm text-[#969494] mb-3">
          {" "}
          <span>clicks</span>
        </div>
        {!topAndBottomLinks.top_links.length && (
          <>
            <NoData />

            <div className="grid place-items-center text-red-200">
              {" "}
              <span className=" text-sm">{error}</span>
            </div>
          </>
        )}
        {topAndBottomLinks.top_links.map((linkData) => {
          return (
            <div
              key={linkData.link}
              className="border-b  flex justify-between py-2 border-[#D7DCE1]"
            >
              <h1 className="text-[#212529] text-[14px]">{linkData.link_id}</h1>
              <h2 className="text-[14px] font-semibold text-[#212529]">
                {linkData.total_clicks}
              </h2>
            </div>
          );
        })}
      </CardWraper>
      <div>
        <p className="text-sm text-gray-500 mt-5">Low Performing Links</p>
      </div>
      <CardWraper>
        <div className="w-full h-full bg-[#676B5F] inset-0 rounded-[8px] bg-opacity-[2%] absolute"></div>
        <div className="flex justify-end text-sm text-[#969494] mb-3">
          {" "}
          <span>clicks</span>
        </div>
        {!topAndBottomLinks.bottom_links.length && (
          <>
            <NoData />

            <div className="grid place-items-center text-red-200">
              {" "}
              <span className=" text-sm">{error}</span>
            </div>
          </>
        )}
        {topAndBottomLinks.bottom_links.map((linkData) => {
          return (
            <div
              key={linkData.link}
              className="border-b  flex justify-between py-2 border-[#D7DCE1]"
            >
              <h1 className="text-[#212529] text-[14px]">{linkData.link_id}</h1>
              <h2 className="text-[14px] font-semibold text-[#212529]">
                {linkData.total_clicks}
              </h2>
            </div>
          );
        })}
      </CardWraper>
    </div>
  );
}
