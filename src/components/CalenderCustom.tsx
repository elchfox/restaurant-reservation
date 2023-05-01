import moment from "moment";
import { useEffect } from "react";

import { MonthDayAndDayOfWeek } from "../utils/momentFormat";

interface Props {
  onSelect?: (date: string) => void;
  value?: Date | string;
  // reservations:[]
}

interface Table {
  id: string;
  tableSize: number;
}

const CalenderCustom = ({ onSelect, value }: Props) => {
  const scrollTo = () => {
    const element: any = document.getElementById("scroll-to");
    element?.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
  };
  useEffect(() => {
    scrollTo();
  }, []);
  return (
    <div className="select-option">
      {Array.from({ length: 90 }).map((day, index) => {
        let date: moment.MomentInput = MonthDayAndDayOfWeek(
          moment().add(index, "d")
        );
        let isActive = date === MonthDayAndDayOfWeek(moment(value));
        return (
          <div
            className={`select-style ${isActive ? "active" : ""}`}
            id={isActive ? "scroll-to" : undefined}
            onClick={() =>
              onSelect && onSelect(moment().add(index, "d").format("l"))
            }
          >
            {date}
          </div>
        );
      })}
    </div>
  );
};

export default CalenderCustom;
