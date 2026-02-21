import Link from "next/link";
import Image from "next/image";

export default function DroneRacingSummary() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5]">
      {/* Team photo at the top */}
      <div className="flex flex-col items-center mb-10">
        <a href="/team.jpg" target="_blank" rel="noopener noreferrer" className="block w-full max-w-xl h-56 md:h-64 rounded-xl overflow-hidden border-4 border-[#bfa94c] mb-2 relative flex items-center justify-center">
          <Image src="/team.jpg" alt="Drone Racing Team" width={600} height={250} style={{objectFit: 'cover', objectPosition: 'center'}} />
        </a>
        
      </div>
      {/* UTIAS association and logo */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Image src="/utias.jpeg" alt="UTIAS Logo" width={56} height={56} className="rounded-full border border-[#d6c9a5]" />
        <span className="text-lg font-semibold text-[#bfa94c]">Associated with UTIAS Flight Systems and Control Lab</span>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-[#bfa94c]">Drone Racing Project Summary</h1>
      <p className="text-gray-700 mb-8">A breakdown of my work at UTIAS Flight System and Control Laboratory, spanning three summers of research and development.</p>
      {/* Summer 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Summer 1: Data Collection & Annotation</h2>
        <div className="flex gap-6 items-start mb-2">
          <div className="w-48 h-32 rounded-lg bg-gray-200 border border-[#d6c9a5] flex items-center justify-center overflow-hidden">
            {/* Replace with your image for Summer 1 */}
            <Image src="/data.png" alt="Summer 1" width={192} height={128} style={{objectFit: 'cover', objectPosition: 'center'}} />
          </div>
          <div className="flex-1">
            <div className="text-gray-600 text-sm mb-2">Caption: Data collection and annotation in the lab</div>
            <ul className="list-disc pl-6 text-gray-700">
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
        <h2 className="text-xl font-semibold mb-2">Summer 2: Data Training & Hardware Integration</h2>
        <div className="flex gap-6 items-start mb-2">
          <div className="w-48 h-32 rounded-lg bg-gray-200 border border-[#d6c9a5] flex items-center justify-center overflow-hidden">
            {/* Replace with your image for Summer 2 */}
            <Image src="/testdrone.jpg" alt="Summer 2" width={192} height={128} style={{objectFit: 'contain', objectPosition: 'left top', background: '#e5e5e5'}} />
          </div>
          <div className="flex-1">
            <div className="text-gray-600 text-sm mb-2">Caption: Hardware integration and test flights</div>
            <ul className="list-disc pl-6 text-gray-700">
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
        <h2 className="text-xl font-semibold mb-2">Summer 3: Simulation & Trajectory Analysis</h2>
        <div className="flex gap-6 items-start mb-2">
          <div className="w-48 h-32 rounded-lg bg-gray-200 border border-[#d6c9a5] flex items-center justify-center overflow-hidden">
            {/* Replace with your image for Summer 3 */}
            <Image src="/simulation.png" alt="Summer 3" width={192} height={128} style={{objectFit: 'cover', objectPosition: 'center'}} />
          </div>
          <div className="flex-1">
            <div className="text-gray-600 text-sm mb-2">Caption: Simulating and analyzing drone trajectories</div>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Simulated drone trajectories using Simulink and Gazebo</li>
              <li>Analyzed flight paths and optimized control algorithms</li>
              <li>Developed tools for visualizing and comparing simulated vs. real flight data</li>
              <li>Documented findings and contributed to lab publications</li>
            </ul>
          </div>
        </div>
      </section>
      <Link href="/projects" className="inline-block mt-4 px-4 py-2 bg-[#bfa94c] text-white rounded hover:bg-[#a88c3c] transition">Back to Projects</Link>
    </div>
  );
}
