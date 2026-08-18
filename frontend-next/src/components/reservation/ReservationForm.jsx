"use client";

import { useState } from "react";
import { FaArrowRight, FaCheck, FaRegCalendarCheck } from "react-icons/fa";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { Spinner } from "../ui/Loader";
import { createReservation } from "../../services/reservation";
import {
  OCCASIONS,
  PARTY_SIZES,
  TIME_SLOTS,
} from "../../utils/constants";
import {
  formatDate,
  formatTime,
  isValidEmail,
  isValidPhone,
  todayISO,
} from "../../utils/helpers";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  date: todayISO(),
  time: "10:00",
  guests: "2",
  occasion: OCCASIONS[0],
  notes: "",
};

/** Table booking form with client-side validation and a confirmation state. */
function ReservationForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [confirmed, setConfirmed] = useState(null);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const found = {};

    if (values.name.trim().length < 2) found.name = "Please tell us your name.";
    if (!isValidEmail(values.email)) found.email = "We need a valid email to confirm.";
    if (!isValidPhone(values.phone)) found.phone = "Please add a contact number.";
    if (!values.date) found.date = "Choose a date.";
    if (values.date && values.date < todayISO())
      found.date = "That date has already passed.";

    setErrors(found);

    return Object.keys(found).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      const reservation = await createReservation({
        ...values,
        guests: Number(values.guests),
      });

      setConfirmed(reservation);
      setStatus("confirmed");
    } catch (error) {
      setStatus("idle");
      setErrors({ form: error.message });
    }
  };

  if (status === "confirmed" && confirmed) {
    return (
      <div className="card-surface rounded-[2rem] p-9 text-center sm:p-12">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/15 text-2xl text-gold-400">
          <FaCheck />
        </span>

        <h3 className="mt-7 font-serif text-3xl text-white sm:text-4xl">
          Table reserved
        </h3>

        <p className="mx-auto mt-4 max-w-md leading-8 text-white/50">
          Thank you, {confirmed.name.split(" ")[0]}. We have you down for{" "}
          {confirmed.guests} {confirmed.guests === 1 ? "guest" : "guests"} on{" "}
          {formatDate(confirmed.date)} at {formatTime(confirmed.time)}.
        </p>

        <dl className="mx-auto mt-9 grid max-w-md gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {[
            ["Reference", confirmed.reference ?? "—"],
            ["Guests", confirmed.guests],
            ["Date", formatDate(confirmed.date)],
            ["Time", formatTime(confirmed.time)],
          ].map(([label, value]) => (
            <div key={label} className="bg-espresso-900 px-6 py-5 text-left">
              <dt className="text-[0.625rem] uppercase tracking-[0.1875rem] text-white/40">
                {label}
              </dt>

              <dd className="mt-1.5 text-white/85">{value}</dd>
            </div>
          ))}
        </dl>

        {confirmed.pending && (
          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-gold-300/70">
            Held on this device — the booking server is not connected yet, so
            please call us to have it entered in the book.
          </p>
        )}

        <Button
          variant="outline"
          className="mt-9"
          onClick={() => {
            setValues(EMPTY);
            setConfirmed(null);
            setStatus("idle");
          }}
        >
          Book another table
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="card-surface rounded-[2rem] p-7 sm:p-10"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-gold-400">
          <FaRegCalendarCheck />
        </span>

        <div>
          <h3 className="font-serif text-2xl text-white">Book your table</h3>

          <p className="text-sm text-white/45">
            Tables are held for 15 minutes past the booking time.
          </p>
        </div>
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          placeholder="Jane Doe"
          autoComplete="name"
        />

        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="jane@example.com"
          autoComplete="email"
        />

        <Field
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          error={errors.phone}
          placeholder="+1 415 555 0142"
          autoComplete="tel"
        />

        <Field
          as="select"
          label="Guests"
          value={values.guests}
          onChange={update("guests")}
          options={PARTY_SIZES.map((size) => ({
            value: String(size),
            label: `${size} ${size === 1 ? "guest" : "guests"}`,
          }))}
        />

        <Field
          label="Date"
          type="date"
          min={todayISO()}
          value={values.date}
          onChange={update("date")}
          error={errors.date}
        />

        <Field
          as="select"
          label="Time"
          value={values.time}
          onChange={update("time")}
          options={TIME_SLOTS.map((slot) => ({
            value: slot,
            label: formatTime(slot),
          }))}
        />
      </div>

      <Field
        as="select"
        label="Occasion"
        className="mt-5"
        value={values.occasion}
        onChange={update("occasion")}
        options={OCCASIONS}
      />

      <Field
        as="textarea"
        label="Anything we should know?"
        className="mt-5"
        value={values.notes}
        onChange={update("notes")}
        placeholder="Allergies, pushchairs, a quiet corner…"
        hint="Optional — but it helps us seat you well."
      />

      {errors.form && (
        <p role="alert" className="mt-5 text-sm text-red-300">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-9 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Spinner className="h-4 w-4" />
            Confirming…
          </>
        ) : (
          <>
            Confirm reservation
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}

export default ReservationForm;
