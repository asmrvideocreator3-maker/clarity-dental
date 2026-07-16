import { useState } from "react";

const NAV_LINKS = ["Home", "Services", "About", "Contact"];

const FEATURES = [
  { title: "Live AI Booking", desc: "Book your appointment instantly with our AI-powered scheduler, available 24/7." },
  { title: "Pain-Free Technology", desc: "Advanced techniques and tools designed for a comfortable, anxiety-free visit." },
  { title: "Same Day Crowns", desc: "In-house 3D milling means your crown is ready before you leave the chair." },
  { title: "Flexible Scheduling", desc: "Evening and weekend slots designed to fit around your busy life." },
];

const SERVICES = [
  { title: "Restorative Care", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" },
  { title: "Cosmetic Design", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop" },
  { title: "Aligner Therapy", img: "https://images.unsplash.com/photo-1595621864071-4b1f6a1e6f1c?q=80&w=800&auto=format&fit=crop" },
];

const TEAM = [
  { name: "Dr. Elena Vance", title: "Lead Prosthodontist", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Marcus Thorne", title: "Cosmetic Specialist", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Sophia Chen", title: "Orthodontist", img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Julian Ross", title: "General & Preventive Care", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop" },
];

const FAQS = [
  { q: "What is Clarity Dental's approach?", a: "We combine AI-assisted diagnostics with a warm, patient-first approach to make every visit efficient and comfortable." },
  { q: "How does the AI booking work?", a: "Luna, our AI assistant, checks real-time availability and matches you to the right specialist automatically." },
  { q: "How can I get in touch?", a: "Use the Book an Appointment button, chat with Luna, or call our front desk directly." },
  { q: "Do you accept new patients?", a: "Yes — we're always accepting new patients and offer same-week new-patient exams." },
  { q: "Is there emergency support?", a: "Yes, we hold same-day slots for dental emergencies during business hours." },
];

function Section({ children, className = "" }) {
  return <section className={`px-6 md:px-20 ${className}`}>{children}</section>;
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white text-teal-dark">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 md:px-20 py-5 sticky top-0 bg-white/90 backdrop-blur z-50 border-b border-sage">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="w-6 h-6 rounded-full bg-teal inline-block" />
          Clarity Dental
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="hover:text-teal-dark transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#book" className="bg-teal text-white text-sm font-semibold px-6 py-3 rounded-pill hover:opacity-90 transition">
          Book Appointment
        </a>
      </header>

      {/* Hero */}
      <Section className="grid md:grid-cols-2 gap-12 items-center py-20 bg-mint">
        <div>
          <h1 className="text-5xl md:text-7xl font-normal leading-[1.05] text-teal-dark mb-6">
            Smile Confidently Again
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
            Advanced AI-integrated dental care designed for a pain-free experience. From 3D imaging to invisible aligners, we craft your perfect smile with precision.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <a href="#book" className="bg-teal text-white font-semibold px-8 py-4 rounded-pill hover:opacity-90 transition">
              Book an Appointment
            </a>
            <a href="#luna" className="border border-teal text-teal-dark font-semibold px-8 py-4 rounded-pill hover:bg-white transition">
              Chat with Luna
            </a>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="text-2xl font-bold">12k+</div>
              <div className="text-xs text-muted uppercase tracking-wide">Happy Patients</div>
            </div>
            <div>
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-xs text-muted uppercase tracking-wide">Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-xs text-muted uppercase tracking-wide">Average Rating</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=900&auto=format&fit=crop"
            alt="Dentist"
            className="rounded-[40px] w-full h-[420px] object-cover shadow-xl"
          />
        </div>
      </Section>

      {/* Feature cards */}
      <Section className="py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-sage/40 rounded-2xl p-6 hover:bg-sage/70 transition">
              <div className="w-10 h-10 rounded-full bg-teal/20 mb-4" />
              <h3 className="font-bold text-lg text-teal-dark mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section className="py-10 pb-24 text-center">
        <p className="text-coral text-sm font-semibold uppercase tracking-wide mb-3">Subspecialties</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Modern Dentistry Simplified</h2>
        <p className="text-muted max-w-xl mx-auto mb-12">
          Combining medical excellence with a spa-like atmosphere to ensure every visit exceeds expectations.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-3xl overflow-hidden group">
              <img src={s.img} alt={s.title} className="w-full h-72 object-cover group-hover:scale-105 transition duration-300" />
              <h3 className="font-semibold mt-4">{s.title}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* Meet Luna */}
      <Section className="pb-24" id="luna">
        <div className="bg-teal-dark rounded-section p-10 md:p-20 grid md:grid-cols-2 gap-10 items-center text-white">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Luna: Your Personal AI Dentist Assistant
            </h2>
            <ul className="space-y-3 text-white/80 mb-8">
              <li>• Luna analyzes your scans in real-time</li>
              <li>• Predicts dental issues before they happen</li>
              <li>• Coordinates your care plan with autonomous precision</li>
            </ul>
            <a href="#book" className="inline-block bg-white text-teal-dark font-semibold px-8 py-4 rounded-pill hover:opacity-90 transition">
              Talk to Luna
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop"
            alt="AI dental scan"
            className="rounded-3xl w-full h-72 object-cover"
          />
        </div>
      </Section>

      {/* Team */}
      <Section className="py-10 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Experts Behind The Technology</h2>
        <p className="text-muted max-w-xl mx-auto mb-12">
          Board-certified specialists blending decades of experience with cutting-edge tooling.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TEAM.map((t) => (
            <div key={t.name}>
              <img src={t.img} alt={t.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-4" />
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-muted">{t.title}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-10 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Common Inquiries</h2>
        <p className="text-muted max-w-xl mx-auto mb-12 text-center">
          Everything you need to know before your first visit.
        </p>
        <div className="max-w-2xl mx-auto divide-y divide-sage">
          {FAQS.map((f, i) => (
            <div key={f.q} className="py-4">
              <button
                className="w-full flex justify-between items-center text-left font-semibold"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                {f.q}
                <span className="text-teal">{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p className="text-muted text-sm mt-2 leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="pb-24" id="book">
        <div className="bg-teal-dark rounded-section p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to experience the future of your smile?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Book your consultation today and let Luna, and our expert team, take care of the rest.
          </p>
          <a href="#" className="inline-block bg-white text-teal-dark font-semibold px-8 py-4 rounded-pill hover:opacity-90 transition">
            Book an Appointment
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-10 border-t border-sage flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
        <div className="font-bold text-teal-dark">Clarity Dental</div>
        <div>&copy; {new Date().getFullYear()} Clarity Dental. All rights reserved.</div>
      </footer>
    </div>
  );
}
