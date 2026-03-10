import Link from "next/link";
import Image from "next/image";

export default function DroneRacingSummary() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-gray-100">
      {/* Team photo at the top */}
      <div className="flex flex-col items-center mb-10">
        <a
          href="/team.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-2xl h-56 md:h-64 rounded-xl overflow-hidden border border-[#2a2a2a] mb-4 relative flex items-center justify-center"
        >
          <Image src="/team.jpg" alt="Drone Racing Team" width={600} height={250} style={{objectFit: 'cover', objectPosition: 'center'}} />
        </a>
      </div>
      {/* UTIAS association and logo */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Image src="/utias.jpeg" alt="UTIAS Logo" width={56} height={56} className="rounded-full border border-[#2a2a2a]" />
        <span className="text-sm md:text-base font-semibold text-gray-300 tracking-[0.15em] uppercase about-me-line">
          Associated with UTIAS Flight Systems and Control Lab
        </span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-50 tracking-[0.2em] uppercase font-[&quot;Press Start 2P&quot;]">
        Drone Racing Project Summary
      </h1>
      {/* Summer 1 */}
      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-100 about-me-line">
          Summer 2023: Data Collection & Annotation
        </h2>
        <div className="flex gap-6 items-start mb-2">
          <div className="w-48 h-32 rounded-lg bg-black border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
            <Image src="/data.png" alt="Summer 2023" width={192} height={128} style={{objectFit: 'cover', objectPosition: 'center'}} />
          </div>
          <div className="flex-1">
            <ul className="list-disc pl-6 text-gray-200 about-me-line">
              <li>Collected flight data from various drone test runs</li>
              <li>Annotated sensor readings and flight logs for supervised learning</li>
              <li>Developed scripts for automated data preprocessing</li>
              <li>Collaborated with lab members to refine annotation protocols</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Summer 2 */}
      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-100 about-me-line">
          Summer 2024: Data Training &amp; Hardware Integration
        </h2>
        <div className="flex gap-6 items-start mb-2">
          <div className="w-48 h-32 rounded-lg bg-black border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
            <Image src="/testdrone.jpg" alt="Summer 2" width={192} height={128} style={{objectFit: 'contain', objectPosition: 'left top', background: '#e5e5e5'}} />
          </div>
          <div className="flex-1">
            <ul className="list-disc pl-6 text-gray-200 about-me-line">
              <li>Trained models on collected flight data</li>
              <li>Integrated trained models with drone hardware for real-time testing</li>
              <li>Conducted component test flights and performance evaluations</li>
              <li>Set up CI/CD pipelines for rapid deployment and testing</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Summer 3 */}
      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-100 about-me-line">
          Summer 2025: Simulation &amp; Trajectory Analysis
        </h2>
        <div className="flex gap-6 items-start mb-2">
          <div className="w-48 h-32 rounded-lg bg-black border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
            <Image src="/simulation.png" alt="Summer 3" width={192} height={128} style={{objectFit: 'cover', objectPosition: 'center'}} />
          </div>
          <div className="flex-1">
            <ul className="list-disc pl-6 text-gray-200 about-me-line">
              <li>Simulated drone trajectories using Simulink and Gazebo</li>
              <li>Analyzed flight paths and optimized control algorithms</li>
              <li>Developed tools for visualizing and comparing simulated vs. real flight data</li>
              <li>Documented findings and contributed to lab publications</li>
            </ul>
          </div>
        </div>
      </section>
      <Link
        href="/"
        className="inline-block mt-6 px-4 py-2 border border-[#2a2a2a] text-xs uppercase tracking-[0.2em] text-gray-200 hover:bg-black/60 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
