import { ExternalLink } from "lucide-react";

const sections = [
  {
    category: "Combat Robotics",
    items: [
      { name: "Fusion 360", desc: "CAD for chassis and mechanical design", link: "https://www.autodesk.com/products/fusion-360" },
      { name: "KiCad",      desc: "PCB schematic and layout", link: "https://www.kicad.org" },
      { name: "Betaflight", desc: "Flight controller firmware (adapted for combat)", link: "https://betaflight.com" },
    ],
  },
  {
    category: "Embedded Systems",
    items: [
      { name: "STM32CubeIDE",  desc: "IDE + HAL for STM32 bare-metal development", link: "https://www.st.com/en/development-tools/stm32cubeide.html" },
      { name: "PlatformIO",    desc: "Cross-platform embedded build system", link: "https://platformio.org" },
      { name: "OpenOCD",       desc: "On-chip debugging via JTAG/SWD", link: "https://openocd.org" },
      { name: "FreeRTOS",      desc: "Real-time OS for embedded targets", link: "https://freertos.org" },
    ],
  },
  {
    category: "VLSI & ASIC",
    items: [
      { name: "Verilog / SystemVerilog", desc: "RTL design language", link: null },
      { name: "Vivado",                  desc: "Xilinx FPGA synthesis and implementation", link: "https://www.xilinx.com/products/design-tools/vivado.html" },
      { name: "OpenLane",                desc: "Open-source ASIC flow (courtesy TattvaSilicon)", link: "https://github.com/The-OpenROAD-Project/OpenLane" },
      { name: "GTKWave",                 desc: "Waveform viewer for simulation", link: "http://gtkwave.sourceforge.net" },
    ],
  },
  {
    category: "Edge AI / Vision",
    items: [
      { name: "OpenCV",         desc: "Computer vision library", link: "https://opencv.org" },
      { name: "TensorFlow Lite",desc: "ML inference on microcontrollers and edge devices", link: "https://www.tensorflow.org/lite" },
      { name: "Ultralytics YOLO", desc: "Real-time object detection", link: "https://ultralytics.com" },
      { name: "NVIDIA Jetson",  desc: "Edge AI compute platform", link: "https://developer.nvidia.com/embedded/jetson-nano" },
    ],
  },
  {
    category: "Dev & Infra",
    items: [
      { name: "Next.js",    desc: "React framework — this site", link: "https://nextjs.org" },
      { name: "Supabase",   desc: "Postgres database + auth + real-time", link: "https://supabase.com" },
      { name: "Vercel",     desc: "Deployment platform", link: "https://vercel.com" },
      { name: "GitHub",     desc: "Source control + CI/CD", link: "https://github.com" },
    ],
  },
  {
    category: "Learning Resources",
    items: [
      { name: "NPTEL — Embedded Systems", desc: "Free courses from IITs", link: "https://nptel.ac.in" },
      { name: "Low Level Learning (YouTube)", desc: "C, embedded, OS internals", link: "https://www.youtube.com/@LowLevelTV" },
      { name: "Ben Eater (YouTube)", desc: "Build computers from scratch", link: "https://www.youtube.com/@BenEater" },
      { name: "Nandland (FPGA)", desc: "Verilog and FPGA tutorials", link: "https://www.nandland.com" },
    ],
  },
];

export default function ArsenalPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <p className="eyebrow mb-2">What we work with</p>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-off-white">Arsenal</h1>
        <p className="text-ash text-sm mt-2 max-w-xl">
          Tools, platforms, and resources ANVIL uses across our technical tracks.
          Useful if you're joining the club or want to get up to speed before recruitment.
        </p>
      </div>

      <div className="space-y-10">
        {sections.map(s => (
          <section key={s.category}>
            <p className="eyebrow mb-4">{s.category}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {s.items.map(item => (
                <div key={item.name} className="card flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-off-white text-sm">{item.name}</p>
                    <p className="text-ash text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ash hover:text-forge-red transition-colors shrink-0 mt-0.5"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
