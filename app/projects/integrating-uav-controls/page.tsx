import {
  ProjectTechnicalArticle,
  WriteupH2,
  WriteupP,
  WriteupUl,
} from "../_components/ProjectTechnicalArticle";

export default function IntegratingUavControlsPage() {
  return (
    <ProjectTechnicalArticle
      title="Integrating UAV Controls into Navigation"
      year="2024"
      breadcrumb="UAV hardware integration"
      hero={{
        src: "/testdrone.jpg",
        alt: "Quadrotor test platform with sensors and compute",
        variant: "contain",
      }}
    >
      <WriteupP>
        After models were trained offline, this phase concentrated on closing the loop: packaging
        inference for onboard execution, interfacing with the flight stack, and validating behavior
        on the real vehicle under component-test and controlled-flight protocols. The objective was
        dependable end-to-end latency—from camera frame to actuator commands—while preserving
        safe fallback behaviors when perception confidence dropped.
      </WriteupP>

      <WriteupH2>Software architecture</WriteupH2>
      <WriteupP>
        The perception node consumed camera frames, ran the detector with a fixed scheduling policy,
        and published structured observations (detections, timestamps, optional debug tensors) on
        the same middleware used by the rest of the autonomy stack. Serialization formats and
        queue depths were chosen to avoid unbounded backlog: frames that missed their deadline were
        dropped deliberately rather than processed late, which keeps the controller from acting on
        stale geometry. Where possible, warm-up routines and deterministic thread pinning improved
        tail latency on embedded Linux.
      </WriteupP>

      <WriteupH2>Hardware-in-the-loop and field testing</WriteupH2>
      <WriteupP>
        Integration proceeded in layers: bench checks (camera intrinsics, time sync sanity),
        tethered hover tests with perception-only logging, then gated forward flight with
        increasing speed caps. Component test flights isolated regressions—ESC arming, IMU bias,
        estimator divergence—before full mission attempts. Flight data was logged with uniform
        time bases so that post-flight replay could align motor commands, attitude estimates, and
        detector outputs for debugging.
      </WriteupP>

      <WriteupH2>CI/CD and release discipline</WriteupH2>
      <WriteupP>
        To keep the fleet of test rigs aligned, lightweight continuous integration was introduced
        for configuration manifests, launch files, and model checksums. Pipelines ran static checks,
        unit tests on message parsing, and containerized smoke tests where feasible so that a
        merged change set carried an auditable artifact version onto the field laptops. This
        reduced “works on my machine” drift between workstations and the cage environment.
      </WriteupP>

      <WriteupH2>Results and engineering trade-offs</WriteupH2>
      <WriteupUl>
        <li>
          End-to-end latency budgets drove decisions on input resolution, batch size, and whether to
          fuse detections with an IMU-driven motion prior before control.
        </li>
        <li>
          Field debugging benefited enormously from synchronized logs and explicit drop counters for
          missed frames.
        </li>
        <li>
          Rapid iteration required balancing flight-hour risk against statistical confidence—small,
          repeatable test cards outperformed ad hoc long flights for narrowing integration bugs.
        </li>
      </WriteupUl>
    </ProjectTechnicalArticle>
  );
}
