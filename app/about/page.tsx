import { ExternalLink } from "lucide-react";

const labs = [
  { name: "Robotics Lab",         desc: "Combat robots, autonomous systems, drive trains" },
  { name: "Embedded Systems Lab", desc: "STM32, RISC-V, bare-metal firmware, RTOS" },
  { name: "Edge AI Lab",          desc: "Vision pipelines, Jetson, TFLite on microcontrollers" },
  { name: "Networks & OS Lab",    desc: "Kernel modules, device drivers, packet-level networking" },
  { name: "Security Lab",         desc: "Embedded CTF, firmware reverse engineering, ethical hacking" },
];

const tracks = [
  { id: "01", track: "Embedded Systems",    desc: "Bare-metal firmware, RTOS, STM32, RISC-V" },
  { id: "02", track: "Mechanical / Mech",  desc: "Chassis design, drive trains, CAD, manufacturing" },
  { id: "03", track: "Edge AI / Vision",   desc: "CNNs on edge hardware, OpenCV, TFLite, Jetson" },
  { id: "04", track: "Embedded ML",        desc: "TinyML, model quantization, microcontroller inference" },
  { id: "05", track: "OS & Device Drivers",desc: "Linux kernel, device trees, QEMU, custom BSPs" },
  { id: "06", track: "Fullstack Dev",      desc: "Web infra for projects — dashboards, telemetry, APIs" },
  { id: "07", track: "App Development",    desc: "Robot control apps, iOS/Android, BLE/Wi-Fi control" },
  { id: "08", track: "Ethical Hacking",    desc: "Embedded security, CTF, firmware analysis" },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <p className="eyebrow mb-2">Who we are</p>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-off-white mb-4">About ANVIL</h1>
        <p className="text-smoke max-w-2xl leading-relaxed">
          ANVIL — Automation, Networks, Vision & Intelligent Labs — is an engineering and robotics
          club at Ramdeobaba University, Nagpur. We build things that move, compute, and survive
          combat arenas. Founded in 2026 with institutional backing, dedicated labs, and a mandate
          to ship real projects.
        </p>
      </div>

      <hr className="border-iron-border mb-12" />

      {/* Origin */}
      <section className="mb-14">
        <p className="eyebrow mb-4">The origin</p>
        <div className="card card-accent max-w-2xl">
          <p className="text-smoke leading-relaxed text-sm">
            ANVIL started as a conviction that engineering clubs should build, not talk.
            The name comes from the anvil — the thing everything gets hammered on to take shape.
            That's what we are: the place where ideas get forged into systems.
          </p>
          <p className="text-smoke leading-relaxed text-sm mt-3">
            Our first confirmed project is an antweight combat robot for Robowars.
            Future work includes DRDO and NEN problem statements, TattvaSilicon project briefs,
            and whatever interesting problems the founding batch decides to chase.
          </p>
        </div>
      </section>

      {/* Advisors */}
      <section className="mb-14">
        <p className="eyebrow mb-5">Advisory</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card card-gold">
            <p className="font-mono text-xs tracking-wider text-gold uppercase mb-1">Industry Advisor</p>
            <p className="font-semibold text-off-white text-lg">Chaitanya Rajguru</p>
            <p className="text-ash text-sm">CEO, TattvaSilicon</p>
            <a
              href="https://tattvasilicon.com"
              target="_blank"
              className="inline-flex items-center gap-1 text-gold text-xs font-mono mt-3 hover:underline"
            >
              tattvasilicon.com <ExternalLink size={11} />
            </a>
          </div>
          <div className="card card-gold">
            <p className="font-mono text-xs tracking-wider text-gold uppercase mb-1">Faculty Advisor</p>
            <p className="font-semibold text-off-white text-lg">Prof. P A Dwaramwar</p>
            <p className="text-ash text-sm">Ramdeobaba University, Nagpur</p>
          </div>
        </div>
      </section>

      {/* Labs */}
      <section className="mb-14">
        <p className="eyebrow mb-5">Infrastructure</p>
        <p className="text-ash text-sm mb-5 max-w-xl">
          ANVIL has a dedicated club room and five specialized labs, all within RBU.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {labs.map(l => (
            <div key={l.name} className="card">
              <p className="font-semibold text-off-white text-sm">{l.name}</p>
              <p className="text-ash text-xs mt-1 leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="mb-14">
        <p className="eyebrow mb-5">Technical tracks</p>
        <div className="space-y-2">
          {tracks.map(t => (
            <div key={t.id} className="flex gap-4 items-start border-b border-iron-border py-3 last:border-0">
              <span className="font-mono text-[0.6rem] text-ash w-6 shrink-0 mt-0.5">{t.id}</span>
              <span className="font-semibold text-off-white text-sm w-48 shrink-0">{t.track}</span>
              <span className="text-ash text-sm leading-relaxed">{t.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Backed by */}
      <section>
        <p className="eyebrow mb-5">Backed by</p>
        <div className="flex flex-wrap gap-4">
          <div className="border border-iron-border px-5 py-3">
            <p className="font-mono text-xs tracking-widest text-ash uppercase">Ramdeobaba University</p>
            <p className="text-off-white text-sm mt-1">Institutional funding + infrastructure</p>
          </div>
          <div className="border border-iron-border px-5 py-3">
            <p className="font-mono text-xs tracking-widest text-ash uppercase">TattvaSilicon</p>
            <p className="text-off-white text-sm mt-1">Industry partnership + project briefs</p>
          </div>
        </div>
      </section>
    </div>
  );
}
