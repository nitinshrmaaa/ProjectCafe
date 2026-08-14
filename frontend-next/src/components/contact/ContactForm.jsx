"use client";

import { useState } from "react";
import { FaCheck, FaPaperPlane } from "react-icons/fa";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { Spinner } from "../ui/Loader";
import { sendContactMessage } from "../../services/reservation";
import { isValidEmail } from "../../utils/helpers";

const SUBJECTS = [
  "General enquiry",
  "Private event or hire",
  "Wholesale beans",
  "Feedback",
  "Careers",
];

const EMPTY = {
  name: "",
  email: "",
  subject: SUBJECTS[0],
  message: "",
};

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const found = {};

    if (values.name.trim().length < 2) found.name = "Please tell us your name.";
    if (!isValidEmail(values.email)) found.email = "That email does not look right.";
    if (values.message.trim().length < 10)
      found.message = "A little more detail helps us reply properly.";

    setErrors(found);

    return Object.keys(found).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      await sendContactMessage(values);

      setStatus("sent");
      setValues(EMPTY);
    } catch (error) {
      setStatus("idle");
      setErrors({ form: error.message });
    }
  };

  if (status === "sent") {
    return (
      <div className="card-surface flex flex-col items-center rounded-3xl px-8 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/15 text-2xl text-gold-400">
          <FaCheck />
        </span>

        <h3 className="mt-7 font-serif text-3xl text-white">Message sent</h3>

        <p className="mt-4 max-w-sm leading-8 text-white/50">
          Thank you for writing. We read everything ourselves and usually reply
          within one working day.
        </p>

        <Button
          variant="outline"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="card-surface rounded-3xl p-7 sm:p-9"
    >
      <h3 className="font-serif text-2xl text-white">Send us a message</h3>

      <p className="mt-2 text-sm text-white/45">
        Questions about hire, wholesale or anything else — this reaches the
        team directly.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
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
      </div>

      <Field
        as="select"
        label="Subject"
        className="mt-5"
        value={values.subject}
        onChange={update("subject")}
        options={SUBJECTS}
      />

      <Field
        as="textarea"
        label="Message"
        className="mt-5"
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        placeholder="Tell us what you need…"
      />

      {errors.form && (
        <p role="alert" className="mt-5 text-sm text-red-300">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Spinner className="h-4 w-4" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <FaPaperPlane className="text-sm" />
          </>
        )}
      </Button>
    </form>
  );
}

export default ContactForm;
