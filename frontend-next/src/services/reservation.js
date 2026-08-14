import api from "./api";
import { bookingReference, sleep } from "../utils/helpers";

const STORAGE_KEY = "brewhaven.reservations";

/**
 * Sends a table booking to the API. While the backend is unavailable the
 * booking is confirmed locally and kept in localStorage, so the form is
 * fully usable and the confirmation screen can be demonstrated.
 */
export async function createReservation(details) {
  try {
    const { data } = await api.post("/reservations", details);

    return { ...data, pending: false };
  } catch (error) {
    if (!error.offline) throw error;

    return createLocalReservation(details);
  }
}

export async function sendContactMessage(message) {
  try {
    const { data } = await api.post("/contact", message);

    return data;
  } catch (error) {
    if (!error.offline) throw error;

    await sleep(700);

    return { received: true, pending: true };
  }
}

export async function subscribeToNewsletter(email) {
  try {
    const { data } = await api.post("/newsletter", { email });

    return data;
  } catch (error) {
    if (!error.offline) throw error;

    await sleep(500);

    return { subscribed: true, pending: true };
  }
}

/** Bookings made in this browser — used by the confirmation screen. */
export function getStoredReservations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function createLocalReservation(details) {
  await sleep(900);

  const reservation = {
    ...details,
    reference: bookingReference(),
    createdAt: new Date().toISOString(),
    status: "confirmed",
    /** Flags that this booking has not reached a server yet. */
    pending: true,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([reservation, ...getStoredReservations()].slice(0, 20))
  );

  return reservation;
}
