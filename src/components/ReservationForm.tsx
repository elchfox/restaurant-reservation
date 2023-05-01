import { useEffect, useState } from "react";
import { CiCalendar, CiClock1, CiGlass, CiUser } from "react-icons/ci";
// import { IReservation, ITime } from "../models/Interface";
import Times, { TimeFormat } from "./Times";

import { createReservation, getReservationsInfo } from "../api/reservations";
import { DayOfWeek } from "../utils/momentFormat";
import BtnSelect from "./BtnSelect";
import CalenderCustom from "./CalenderCustom";
import Diners from "./Diners";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IInfo, IReservation } from "../models/Interface";

interface Props {
  onCreateReservation: (reservation: any) => void;
  info: IInfo;
}

const ReservationForm = ({ info }: Props) => {
  const [typeSelect, setTypeSelect] = useState<number | string>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [notAvailable, setNotAvailable] = useState<boolean>(true);
  const navigate = useNavigate();

  const [data, setData] = useState<IReservation>({
    reservedBy: "unknown",
    time:  info.details.openingHours[new Date().toLocaleDateString("en", { weekday: "long" })].open,
    date: new Date(),
    diners: 2,
  });

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    let res: any = await createReservation(data);
    if (res.errorMessage) {
      setMessage(res.errorMessage);
      setNotAvailable(true);
    } else {
      setMessage("Success");
      setNotAvailable(false);
      localStorage.setItem("reservationId" , res._id)
      navigate(`/reservation/${res._id}`)
    }
  };

  const onSelectType = (num: number | string) => {
    setTypeSelect(num);
  };

  const onCheckOrder = (fieldName: string, value: any) => {
    let dataUpdate = {
      ...data,
      [fieldName]: value,
    };
    let startDate = new Date(
      `${moment(dataUpdate.date).format("YYYY-MM-DD")}T${
        dataUpdate.time
      }:59.000Z`
    );
    let endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    let total = info.tables.find(
      (item) => item.tableSize === dataUpdate.diners
    ).total;
    let checkAvailable = info.reservations[
      moment(dataUpdate.date).format("YYYY-MM-DD")
    ]
      ? info.reservations[moment(dataUpdate.date).format("YYYY-MM-DD")].filter(
          (item) =>
            item.tableSize === dataUpdate.diners &&
            moment(item.date).isBetween(moment(startDate), moment(endDate))
        )
      : [];
    if (checkAvailable.length >= total) {
      setMessage(
        "No available tables at that time. Please try a different time or date."
      );
      setNotAvailable(true);
    } else {
      setMessage(null);
      setNotAvailable(false);
    }
    setData({ ...dataUpdate });
  };
  return (
    <div className="wapper-form" >
      <div className="wapper-input">
      <input placeholder="Reserved by" onChange={(e)=> setData({...data,reservedBy:e.target.value})}/> 
      </div>
      <div className="wapper-btn-select">
        <BtnSelect
          icon={<CiCalendar />}
          id={0}
          isActive={typeSelect === 0}
          onSelect={onSelectType}
          text={DayOfWeek(data.date)}
        />
        <BtnSelect
          icon={<CiClock1 />}
          id={1}
          isActive={typeSelect === 1}
          onSelect={onSelectType}
          text={data.time}
        />
        <BtnSelect
          icon={<CiUser />}
          onSelect={onSelectType}
          id={2}
          isActive={typeSelect === 2}
          text={`${data.diners} Diners`}
        />
      </div>
      {typeSelect === 0 && (
        <CalenderCustom
          onSelect={(date) => onCheckOrder("date", new Date(date))}
          value={data.date}
        />
      )}
      {typeSelect === 1 && (
        <Times
        isCurrentDate={new Date().setHours(0,0,0,0) === data.date.setHours(0,0,0,0)}
          onSelect={(time) => onCheckOrder("time", time)}
          value={data.time}
          startTime={
            info.details.openingHours[
              data.date.toLocaleDateString("en", { weekday: "long" })
            ].open
          }
          endTime={
            info.details.openingHours[
              data.date.toLocaleDateString("en", { weekday: "long" })
            ].close
          }
        />
      )}
      {typeSelect === 2 && (
        <Diners
          data={info.details.dinners}
          onSelect={(diners) => {
            onCheckOrder("diners", diners);
          }}
          value={data.diners}
        />
      )}

      <button type="submit" disabled={notAvailable} onClick={handleSubmit}>
        Create reservation
      </button>
      {message && (
        <div
          className={`${notAvailable ? "error-message" : "success-message"} `}
        >
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
