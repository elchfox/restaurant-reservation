import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { deleteReservation, getReservationById } from '../api/reservations';

const ReservationDetails: React.FC = () => {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      let id = window.location.pathname.split("/").pop()
      const res = await getReservationById(id);
      setData({...res});
    };
    fetchReservation();
  }, []);

  const handleCancelReservation = async () => {
    let id = window.location.pathname.split("/").pop()
    let res =await  deleteReservation(id)
    localStorage.removeItem("reservationId")
    // await api.cancelReservation(id);
    // TODO: show success message and redirect to home page
  };

  return (
    <div className="Reservation ">
      {data ? (
        <>
          <h2>{moment(data.date).format('dddd, MMMM Do YYYY, h:mm a')}</h2>
          <p>Table size: {data.tableSize}</p>
          <p>Name: {data.reservedBy}</p>
          <p>Date: { moment(data.date).format()}</p>
          <button onClick={handleCancelReservation} type='submit' className='danger'>Cancel Reservation</button>
        </>
      ) : (
        <p>Loading reservation details...</p>
      )}
    </div>
  );
};

export default ReservationDetails;