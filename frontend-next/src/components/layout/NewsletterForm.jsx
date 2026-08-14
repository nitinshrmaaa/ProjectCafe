"use client";

import { useState } from "react";
import { FaCheck, FaPaperPlane } from "react-icons/fa";
import { Spinner } from "../ui/Loader";
import { subscribeToNewsletter } from "../../services/reservation";
import { cn, isValidEmail } from "../../utils/helpers";

/** Compact email capture used in the footer. */
function NewsletterForm({ className }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      await subscribeToNewsletter(email.trim());

      setStatus("done");
      setEmail("");
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message);
    }
  };

  return (
    <div className={className}>
      <h3 className="font-serif text-xl text-white">Roast notes, monthly</h3>

      <p className="mt-2 text-sm leading-7 text-white/45">
        New single origins, brewing guides and first access to tastings.
      </p>

      {status === "done" ? (
        <p className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3.5 text-sm text-emerald-200">
          <FaCheck className="shrink-0" />
          You are on the list — check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-4">
          <div className="flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(error)}
              className={cn(
                "min-w-0 flex-1 rounded-full border bg-white/[0.04] px-5 py-3 text-sm text-cream placeholder:text-white/30 focus:border-gold-400 focus:outline-none",
                error ? "border-red-400/70" : "border-white/10"
              )}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              aria-label="Subscribe"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-400 text-espresso-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
            >
              {status === "loading" ? <Spinner className="h-4 w-4" /> : <FaPaperPlane />}
            </button>
          </div>

          {error && (
            <p role="alert" className="mt-2 text-sm text-red-300">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default NewsletterForm;
