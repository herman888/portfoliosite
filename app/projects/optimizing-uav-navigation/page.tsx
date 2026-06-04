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
        This project was about <strong>turning simulation into an engineering instrument</strong> for
        high-speed quadrotor flight through tight gate geometry: building a plant and control model
        that respected <strong>thrust limits, rate limits, and latency</strong>, then using it to
        answer why the real vehicle behaved differently than a naïve point-mass model would predict.
        The output was not a single “optimized gain set,” but a <strong>repeatable toolchain</strong>{" "}
        (scenario → run → log → metrics → compare to bags) that made controller changes auditable
        and made sim-to-real mismatch diagnosable instead of hand-wavy.
      </WriteupP>

      <WriteupH2>Plant modeling &amp; actuation constraints</WriteupH2>
      <WriteupP>
        The quadrotor was modeled as a <strong>rigid body</strong> with translation and rotation in
        three axes, <strong>actuated by four independent rotor thrusts</strong> combined through a
        standard quadrotor <strong>mixer</strong> that allocates total thrust and roll, pitch, and
        yaw torque across the four propellers. Per-rotor <strong>thrust saturation</strong>, a
        simple <strong>first-order motor/throttle lag</strong> to approximate ESC–motor bandwidth, and
        optional <strong>battery sag</strong> or thrust cap curves when we needed to reproduce
        end-of-pack softness seen in logs. Mass and inertia tensors were parameterized so Monte Carlo
        batches could stress inertia uncertainty. Aerodynamic drag was kept intentionally simple
        (body-frame drag coefficients) but was still important: without it, simulated cornering
        energy and ω peaks did not line up with flight. The goal was a plant that failed for the{" "}
        <em>same physical reasons</em> as hardware—saturation, rate limits, lag—not because of an
        exotic aerodynamic model we could not validate.
      </WriteupP>

      <WriteupH2>Control architecture (what was actually implemented)</WriteupH2>
      <WriteupP>
        The baseline stack was a <strong>cascaded controller</strong>: an{" "}
        <strong>inner body-rate loop</strong> (roll/pitch/yaw torque demand from angular velocity
        error) feeding a <strong>mixer</strong> that maps desired thrust + moments to four rotor
        commands, wrapped by an <strong>outer attitude loop</strong> that tracks quaternion or
        Euler references from the trajectory generator. Integrators on torque/thrust channels used{" "}
        <strong>anti-windup</strong> so saturation during hard turns did not destabilize the slow
        dynamics. Reference shaping (slew limits / low-pass on attitude setpoints) was used to
        keep references inside what the rate loop could track without perennial saturation. Where
        helpful, we inserted an explicit <strong>transport delay / ZOH block</strong> to match
        observed loop latency from vision/estimator pipelines so we did not tune against
        physically unrealizable phase margins.
      </WriteupP>

      <WriteupH2>Simulation stack: Simulink + 3D world (Gazebo-class)</WriteupH2>
      <WriteupP>
        <strong>MATLAB/Simulink</strong> held the controller, reference generation, and logging
        blocks so sweeps could be scripted and versioned cleanly. A complementary{" "}
        <strong>3D environment (Gazebo-style)</strong> provided geometric context (gates, camera
        viewpoints when needed) and helped sanity-check trajectories under clutter/occlusion
        assumptions, even when the core stability work remained dynamics-first. The workflow was
        co-simulation-like: same control outputs, same timing discipline, same exported time series
        format every run so downstream Python post-processing did not fork into one-off scripts per
        experiment.
      </WriteupP>

      <WriteupH2>Trajectory generation, scoring, and “optimization”</WriteupH2>
      <WriteupP>
        Trajectories were not judged only on <strong>time-to-goal</strong>. Each run produced a
        scored bundle: <strong>gate plane error</strong> (lateral/longitudinal offset at crossing),{" "}
        <strong>approach heading misalignment</strong>, <strong>peak body rates</strong>,{" "}
        <strong>specific thrust / saturation duty cycle</strong>, and integrated{" "}
        <strong>tracking error norms</strong> on attitude and velocity. For optimization-shaped work,
        we explored constrained parameter updates (gains, shaping time constants, gate approach
        speed caps) and short-horizon <strong>MPC-style</strong> feasibility checks where the
        question was “can this horizon fit inside compute + stability constraints?” When NLP-style
        optimization was brittle, we fell back to <strong>structured sweeps</strong> over
        low-dimensional knobs with clear physical meaning—preferring interpretable surfaces in
        gain space over a single opaque optimum.
      </WriteupP>

      <WriteupH2>Sim-to-flight: aligning signals and fixing the model</WriteupH2>
      <WriteupP>
        Flight bags were ingested into the same metric pipeline after <strong>time alignment</strong>{" "}
        (clock sync sanity, trim pre/post gate) and <strong>unit normalization</strong>. We
        overlaid ω, quaternion, commanded thrust / motor commands, and specific force against
        simulation traces to localize mismatch: excess high-frequency ω energy often pointed to
        unmodeled latency or overly aggressive rate gains; low-altitude speed bleed pointed to drag
        or thrust model errors; post-saturation oscillations pointed to integrator windup or mixer
        clipping. Those findings were fed back into <strong>disturbance blocks, delay, and drag</strong>{" "}
        rather than “fixing” the problem only in software gains on the real drone without updating
        the sim.
      </WriteupP>

      <WriteupH2>Engineering outputs</WriteupH2>
      <WriteupUl>
        <li>
          <strong>Versioned scenario set</strong> (wind cases, mass cases, approach speeds) with
          deterministic seeds and exported CSV/Parquet time series for regression checks.
        </li>
        <li>
          <strong>Controller + mixer + saturation model</strong> in Simulink suitable for batch
          sweeps and for side-by-side comparison against logged motor commands.
        </li>
        <li>
          <strong>Sim-vs-log dashboards</strong> (Python) for gate-passage segments: same metrics
          computed on both sources so disagreements were visible on one timeline.
        </li>
        <li>
          A short list of <strong>known model limits</strong> (sensor models omitted, simplified
          ground effect, etc.) so flight-test priorities stayed honest.
        </li>
      </WriteupUl>
    </ProjectTechnicalArticle>
  );
}
