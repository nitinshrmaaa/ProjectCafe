import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
  FaUsers,
} from "react-icons/fa";
import ReservationForm from "@/components/reservation/ReservationForm";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT, HOURS } from "@/utils/constants";
import { slideInRight } from "@/utils/animations";
import header from "@/assets/images/hero/hero5.jpg";

export const metadata = {
  title: "Reserve a Table",
  description:
    "Book a table at Brew Haven — up to 30 days ahead, confirmed in under a minute.",
  alternates: { canonical: "/reserve" },
};

const NOTES = [
  {
    icon: FaUsers,
    title: "Groups over twelve",
    body: "Call us and we will open the back room. It seats twenty-four with the long table in.",
  },
  {
    icon: FaRegClock,
    title: "Running late?",
    body: "We hold every table for fifteen minutes. Ring ahead and we will hold it longer.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Finding us",
    body: `${CONTACT.address.line1}, ${CONTACT.address.line2}. Two minutes from the station, gold awning.`,
  },
];

export default function ReservationPage() {
  return (
    <>
      <PageHeader
        name="Reserve"
        eyebrow="Reservations"
        title="Save your"
        highlight="seat"
        description="Weekday mornings are usually calm. Weekend brunch books out by Thursday."
        image={header}
      />

      <section className="bg-espresso-900 pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            <Reveal>
              <ReservationForm />
            </Reveal>

            <Reveal variants={slideInRight} className="space-y-5">
              {NOTES.map((note) => {
                const Icon = note.icon;

                return (
                  <div key={note.title} className="card-surface rounded-3xl p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/25 bg-gold-400/10 text-gold-400">
                      <Icon />
                    </span>

                    <h3 className="mt-6 font-serif text-xl text-white">
                      {note.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/50">{note.body}</p>
                  </div>
                );
              })}

              <div className="card-surface rounded-3xl p-7">
                <h3 className="font-serif text-xl text-white">Opening hours</h3>

                <dl className="mt-5 space-y-3 text-sm">
                  {HOURS.map((entry) => (
                    <div key={entry.days} className="flex justify-between gap-4">
                      <dt className="text-white/45">{entry.days}</dt>
                      <dd className="text-white/80">{entry.time}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={CONTACT.phoneHref}
                  className="mt-6 flex items-center gap-3 text-gold-400 transition-colors hover:text-gold-300"
                >
                  <FaPhoneAlt className="text-sm" />
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
