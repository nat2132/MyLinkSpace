import { calendar } from "../data/const"
import { getFormattedDate } from "../utils/getFormattedDate"


const datetime = getFormattedDate();
export default function DateSelector() {

    return(
        <div className="DateSelector">
        <div className="flex h-[48px] bg-white items-center gap-5 p-5 rounded-[8px]">
          <label htmlFor="date">
            {" "}
            <img
              className="h-[20px] w-auto"
              src={calendar}
              alt="datetime"
            />
          </label>
          <input hidden type="date" name="date" id="date" />
          <h1 className="text-[14px]  text-[#0A0B0D]">
      {datetime}
          </h1>
        </div>
        <h3 className="text-[#53585F] ml-5 mt-5 text-sm">Performance Metrics</h3>
      </div>
    )
}