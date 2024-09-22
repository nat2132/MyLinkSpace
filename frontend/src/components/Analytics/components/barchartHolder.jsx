import BarChart from "./barChart";
import SectionHeaderText from "./SectionHeaderText";

export default function BarchartHolder() {
  return (
    <div className="barchart">
      <div className="flex justify-between">
        {" "}
        <SectionHeaderText>Clicks PerLink</SectionHeaderText>
        <span className="border border-gray-300 rounded-3xl px-3 text-gray-300">
          free
        </span>
      </div>
      <div className=" w-full h-auto bg-white rounded-[8px] mt-5">
        <BarChart />
      </div>
    </div>
  );
}
