import {
  ProjectTechnicalArticle,
  WriteupH2,
  WriteupP,
  WriteupUl,
} from "../_components/ProjectTechnicalArticle";

export default function OptimizingUavNavigationPage() {
  return (
    <ProjectTechnicalArticle
      title="Optimizing UAV Autonomous Navigation"
      year="2025"
      breadcrumb="UAV simulation and optimization"
      hero={{ src: "/simulation.png", alt: "Simulation and trajectory visualization" }}
    >
      <WriteupP>
        This work used high-fidelity simulation together with classical controls tooling to study
        quadcopter trajectories through gate-style constraints before committing changes to flight
        software. The central question was how far simulated trajectories, controllers, and
        disturbance models could predict real-world behavior when the vehicle was pushed toward
        aggressive timelines and tight clearance—without overfitting to a single simulator
        quirk.
      </WriteupP>

      <WriteupH2>Modeling stack</WriteupH2>
      <WriteupP>
        Vehicle dynamics were exercised in a co-simulation style workflow: multibody or
        simplified rigid-body dynamics with realistic actuator limits, wrapped by trajectory
        generation and tracking controllers implemented in MATLAB/Simulink, with complementary 3D
        environments (e.g., Gazebo-class worlds) used for geometric fidelity and sensor realism
        where needed. Controller gains, saturation blocks, and reference shaping filters were
        parameterized so that sweeps could be scripted and compared across wind gust profiles and
        mass uncertainties.
      </WriteupP>

      <WriteupH2>Trajectory analysis and optimization</WriteupH2>
      <WriteupP>
        Candidate paths were evaluated on criteria beyond time-to-goal: peak angular rates,
        motor saturation margin, gate alignment error at crossing, and sensitivity to initial
        condition perturbations. Where optimization was tractable, cost landscapes were explored
        with constrained nonlinear programs or sampled with model predictive control horizons short
        enough for real-time feasibility studies. When optimization was too brittle, structured
        heuristics (waypoint spacing, velocity profiles through gates) were benchmarked against
        brute-force parameter grids to localize robust regions of the gain space.
      </WriteupP>

      <WriteupH2>Bridging simulation and flight logs</WriteupH2>
      <WriteupP>
        A repeatable toolchain ingested bagged flight data and overlaid comparable signals from
        simulation runs—attitude, body rates, commanded thrust, and tracking error norms—after
        time alignment and unit normalization. Discrepancy dashboards highlighted systematic
        biases (drag mis-estimation, latency, IMU noise floors) that explained mismatch in high-
        speed segments. Those insights fed back into disturbance models and anti-windup tuning
        rather than being dismissed as “sim noise.”
      </WriteupP>

      <WriteupH2>Takeaways</WriteupH2>
      <WriteupUl>
        <li>
          Treating latency and actuator saturation as first-class states in simulation prevented
          optimistic controllers that collapse in hardware.
        </li>
        <li>
          Side-by-side sim-vs-log visualization was more valuable than single scalar scores for
          diagnosing gate passage failures.
        </li>
        <li>
          Parameter sweeps only scale with automation—versioned scenarios and scripted post-
          processing turned an otherwise manual tuning loop into an auditable experiment matrix.
        </li>
      </WriteupUl>
    </ProjectTechnicalArticle>
  );
}
