import { useState,useEffect } from "react";
export type TimeFormat = string;

interface Props {
  onSelect: (time: string | any) => void;
  startTime: string;
  endTime: string;
  value?: string;
  isCurrentDate?:boolean
}

const Times = ({ onSelect, startTime, endTime, value,isCurrentDate }: Props) => {

  const scrollTo = () => {
    const element: any = document.getElementById("scroll-to");
    element?.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
  };
  useEffect(()=> {
    scrollTo()
  },[])
  const generateTimeIntervals = (startTime: string, endTime: string) => {
    const intervals = [];
    
    const current = new Date();
    const start = new Date(`2022-01-01T${startTime}:00`);
    const end = new Date(`2022-01-01T${endTime}:00`);

    while (start <= end) {
      const timeString = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      (isCurrentDate && current <= start) || !isCurrentDate && intervals.push(timeString) ;
      start.setTime(start.getTime() + 15 * 60 * 1000);
    }

    return intervals;
  };
  return (
    <div className="select-option">
      {generateTimeIntervals(startTime, endTime).map((time) => (
        <div
          className={`select-style ${value === time ? "active" : ""}`}
          id={value === time ? "scroll-to" : undefined}
          onClick={() => onSelect && onSelect(time)}
        >
          {time}
        </div>
      )) }
    </div>
  );
};

export default Times;
