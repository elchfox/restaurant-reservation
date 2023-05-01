import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationForm from '../components/ReservationForm';
import { IReservation } from '../models/Interface';
import './Reservation.scss';
import { getReservationsInfo } from '../api/reservations';

interface ReservationParams {
  tableSize: string;
}

function Reservation() {
  const [info, setInfo] = useState<any>();
  const init = async () => {
    let res = await getReservationsInfo();
    setInfo(res)
  };
  useEffect(() => {
    init()
    return () => {};
  }, []);

  return (
    <div className="Reservation">
       {info && <ReservationForm onCreateReservation={(data:IReservation)=>{console.log(data)} } info={info}/> }
      
    </div>
  );
}

export default Reservation;
