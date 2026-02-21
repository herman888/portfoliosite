import Link from "next/link";

export default function DroneRacingSummary() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 bg-[#f5f5dc] rounded-xl shadow border border-[#d6c9a5]">
      <h1 className="text-3xl font-bold mb-6 text-[#bfa94c]">Drone Racing Project Summary</h1>
      <p className="text-gray-700 mb-8">A breakdown of my work at UTIAS Flight System and Control Laboratory, spanning three summers of research and development.</p>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Summer 1: Data Collection & Annotation</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Collected flight data from various drone test runs</li>
          <li>Annotated sensor readings and flight logs for supervised learning</li>
          <li>Developed scripts for automated data preprocessing</li>
          <li>Collaborated with lab members to refine annotation protocols</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Summer 2: Data Training & Hardware Integration</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Trained models on collected flight data</li>
          <li>Integrated trained models with drone hardware for real-time testing</li>
          <li>Conducted component test flights and performance evaluations</li>
          <li>Set up CI/CD pipelines for rapid deployment and testing</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Summer 3: Simulation & Trajectory Analysis</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Simulated drone trajectories using Simulink and Gazebo</li>
          <li>Analyzed flight paths and optimized control algorithms</li>
          <li>Developed tools for visualizing and comparing simulated vs. real flight data</li>
          <li>Documented findings and contributed to lab publications</li>
        </ul>
      </section>
      <Link href="/projects" className="inline-block mt-4 px-4 py-2 bg-[#bfa94c] text-white rounded hover:bg-[#a88c3c] transition">Back to Projects</Link>
    </div>
  );
}
