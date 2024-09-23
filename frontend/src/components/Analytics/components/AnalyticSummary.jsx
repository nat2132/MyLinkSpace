import { useEffect, useState } from "react";
import { fetchAnalyticsSummary } from "../api/analyticsAPI";

function AnalyticsSummary() {
  const [analytics, setAnalytics] = useState({
    clicks: "0",
    visitors: 0,
    bounce_rate: 0,
    engagement: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchAnalyticsSummary();
        setAnalytics(data.data);
        if (data.error) {
          setError(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAnalyticsData();
  }, []);

  return (
    <div className="AnalyticSummary px-[16px] mt-2">
      <div className=" bg-white stroke-[#D8D8D8] w-full rounded-[24px] p-3 grid place-items-center">
        <div className="">
          <h1 className=" font-semibold text-[#212529] text-[20px] mb-5">
            Lifetime Analytics
          </h1>
        </div>
        <div className="grid place-items-center">
          <ul className="grid  grid-cols-2 md:grid-cols-4 gap-7 md:gap-10  items-center">
            <li className="grid place-items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full items-center mr-1 bg-[#00D775]"></div>
                <h3 className="text-sm">Clicks:</h3>
              </div>
              <h1 className="text-lg font-semibold">{analytics.clicks}</h1>
            </li>

            <li className="grid place-items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full items-center mr-1 bg-[#7C41FF]"></div>
                <h3 className="text-sm">Bounce Rate:</h3>
              </div>
              <h1 className="text-lg font-semibold">
                {analytics.bounce_rate} %
              </h1>
            </li>

            <li className="grid place-items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full items-center mr-1 bg-[#00B6FF]"></div>
                <h3 className="text-sm">Visitors:</h3>
              </div>
              <h1 className="text-lg font-semibold">{analytics.visitors}</h1>
            </li>

            <li className="grid place-items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full items-center mr-1 bg-[#FF7CEA]"></div>
                <h3 className="text-sm">Engagement:</h3>
              </div>
              <h1 className="text-lg font-semibold">
                {analytics.engagement} %
              </h1>
            </li>
          </ul>
        </div>
        {error && (
          <div className="grid w-full mt-2 place-items-center py-1 border-t border-gray-100">
            <span className=" text-sm text-red-300">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsSummary;
