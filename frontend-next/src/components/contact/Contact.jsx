"use client";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { slideInRight } from "../../utils/animations";
import { cn } from "../../utils/helpers";

/**
 * Contact section. `compact` (home page) shows the details and points at
 * the contact route; the full variant includes the message form.
 */
function Contact({ compact = false, withHeading = true }) {
  return (
    <Section id="contact" tone="deep" glow="top" divider>
      <Container>
        {withHeading && (
          <SectionHeading
            eyebrow="Come Say Hello"
            title="Find us on"
            highlight="Roasters Lane"
            description="Two minutes from the station, with the roaster running most mornings. Walk in, or book ahead for the weekend."
          />
        )}

        <div
          className={cn(
            "grid gap-8 lg:grid-cols-2 lg:gap-12 3xl:gap-16",
            withHeading && "mt-16"
          )}
        >
          <ContactInfo />

          {compact ? (
            <Reveal
              variants={slideInRight}
              className="card-surface flex flex-col justify-center rounded-3xl p-9 text-center lg:p-12"
            >
              <h3 className="font-serif text-3xl leading-snug text-white">
                Planning something
                <span className="gold-text italic"> a little bigger?</span>
              </h3>

              <p className="mx-auto mt-5 max-w-sm leading-8 text-white/50">
                Book a table, hire the back room for an evening, or ask us
                about wholesale beans for your own bar.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Button href="/reserve">
                  Reserve a table
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>

                <Button href="/contact" variant="outline">
                  Send a message
                </Button>
              </div>
            </Reveal>
          ) : (
            <Reveal variants={slideInRight}>
              <ContactForm />
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Contact;
