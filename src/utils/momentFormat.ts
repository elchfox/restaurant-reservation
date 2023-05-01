import { daysOfWeek } from "./config";
import moment from "moment";

export const DayOfWeek = (date: Date) => {
  return `${moment(date).format("D/M")} ${
    daysOfWeek[moment(date).format("E")]
  }`;
};
export const MonthDayAndDayOfWeek = (date: moment.MomentInput) => {
  return `${moment(date).format("MMMM D")} ${
    daysOfWeek[moment(date).format("E")]
  }`;
};
