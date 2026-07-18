import { useState, useRef, useEffect } from "react";

const NAV_LINKS = ["Home", "Services", "About", "Contact"];
const N8N_WEBHOOK_URL = "https://test-ai-n8n.onrender.com/webhook/bc8a3350-dead-4c3e-8519-1e2e495b7085";

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

function getSessionId() {
  const key = "clarity-dental-session-id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function ChatWidget({ open, onClose, initialMessage }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi, I'm Luna, Clarity Dental's AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const bottomRef = useRef(null);
  const sentInitial = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && initialMessage && !sentInitial.current) {
      sentInitial.current = true;
      sendMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialMessage]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message_text: trimmed, session_id: getSessionId() }),
      });
      if (!res.ok) throw new Error("Bad response");
      const data = await res.json();
      const reply = data?.reply || data?.output || "Sorry, I didn't catch that — could you try again?";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e) {
      setError(true);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "I'm not able to connect right now — the clinic's AI assistant is still being set up. Please call the front desk to book directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end sm:items-end sm:justify-end p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/30 sm:hidden" onClick={onClose} />
      <div className="relative w-full sm:w-96 h-full sm:h-[560px] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-teal-dark text-white px-5 py-4 flex items-center justify-between">
          <div>
            <div className="font-semibold">Luna</div>
            <div className="text-xs text-white/70">Clarity Dental AI Assistant</div>
          </div>
          <button onClick={onClose} aria-label="Close chat" className="text-white/80 hover:text-white text-xl leading-none px-2">
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-mint/30">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-teal text-white" : "bg-white text-teal-dark shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-muted rounded-2xl px-4 py-2 text-sm shadow-sm">Luna is typing…</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <form
          className="border-t border-sage p-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            className="flex-1 rounded-full border border-sage px-4 py-2 text-sm focus:outline-none focus:border-teal"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-teal text-white rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </form>
        {error && (
          <div className="px-4 pb-3 text-xs text-coral">
            Luna's booking system is still being connected — this message won't be received yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState(null);

  function openChat(prefill) {
    setChatInitialMessage(prefill || null);
    setChatOpen(true);
    setMenuOpen(false);
  }

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
        <div className="flex items-center gap-3">
          <button
            onClick={() => openChat("I'd like to book an appointment.")}
            className="hidden sm:inline-block bg-teal text-white text-sm font-semibold px-6 py-3 rounded-pill hover:opacity-90 transition"
          >
            Book Appointment
          </button>
          <button
            className="md:hidden text-teal-dark p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] z-40 bg-white border-b border-sage shadow-lg px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-teal-dark font-medium py-1" onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
          <button
            onClick={() => openChat("I'd like to book an appointment.")}
            className="bg-teal text-white text-sm font-semibold px-6 py-3 rounded-pill hover:opacity-90 transition text-center"
          >
            Book Appointment
          </button>
        </div>
      )}

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
            <button
              onClick={() => openChat("I'd like to book an appointment.")}
              className="bg-teal text-white font-semibold px-8 py-4 rounded-pill hover:opacity-90 transition"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => openChat(null)}
              className="border border-teal text-teal-dark font-semibold px-8 py-4 rounded-pill hover:bg-white transition"
            >
              Chat with Luna
            </button>
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
            <button
              onClick={() => openChat(null)}
              className="inline-block bg-white text-teal-dark font-semibold px-8 py-4 rounded-pill hover:opacity-90 transition"
            >
              Talk to Luna
            </button>
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
          <button
            onClick={() => openChat("I'd like to book an appointment.")}
            className="inline-block bg-white text-teal-dark font-semibold px-8 py-4 rounded-pill hover:opacity-90 transition"
          >
            Book an Appointment
          </button>
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-10 border-t border-sage flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
        <div className="font-bold text-teal-dark">Clarity Dental</div>
        <div>&copy; {new Date().getFullYear()} Clarity Dental. All rights reserved.</div>
      </footer>

      {/* Floating chat launcher */}
      {!chatOpen && (
        <button
          onClick={() => openChat(null)}
          className="fixed bottom-6 right-6 z-50 bg-teal text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:opacity-90 transition"
          aria-label="Chat with Luna"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      )}

      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} initialMessage={chatInitialMessage} />
    </div>
  );
}
