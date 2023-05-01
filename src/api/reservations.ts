import { IReservation } from '../models/Interface';
import { config } from '../utils/config';
// import { config } from './utils/config';

const URL = `${config.baseUrl}/resevation`;

export async function createReservation(reservation: IReservation): Promise<IReservation> {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation),
  });

  if (!response.ok) {
    throw new Error('Failed to create reservation');
  }

  const createdReservation = await response.json();
  return createdReservation;
}

export async function getReservationsInfo(): Promise<IReservation[]> {
  const response = await fetch(URL + "/info");

  if (!response.ok) {
    throw new Error('Failed to retrieve reservations');
  }

  const reservations = await response.json();
  return reservations;
}

export async function getReservationById(id:string = ""): Promise<IReservation[]> {
  const response = await fetch(URL + `/find/${id}`);

  if (!response.ok) {
    throw new Error('Failed to retrieve reservations');
  }

  const reservations = await response.json();
  return reservations;
}

export async function updateReservation(reservation: IReservation): Promise<IReservation> {
  const url = `${URL}/${reservation.id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation),
  });

  if (!response.ok) {
    throw new Error('Failed to update reservation');
  }

  const updatedReservation = await response.json();
  return updatedReservation;
}

export async function deleteReservation(id: string = ""): Promise<void> {
  const url = `${URL}/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete reservation');
  }
}
