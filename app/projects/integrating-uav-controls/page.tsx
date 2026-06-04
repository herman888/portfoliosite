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
        heightClass: "h-56 min-h-[14rem] md:h-[22rem] md:min-h-[22rem]",
      }}
    >
      <WriteupP>
        This phase was about <strong>closing the loop from weights on disk to thrust commands in the
        air</strong>: packaging a trained gate detector for <strong>onboard inference</strong>,
        hanging it on the same <strong>ROS</strong> graph as estimation and control, and proving—
        with logs, not vibes—that latency, jitter, and failure modes were understood before we
        chased speed. “Integration” here meant <strong>contracts</strong> (message schema, time
        stamps, frame IDs), <strong>resource budgets</strong> (CPU, thermals, memory), and{" "}
        <strong>degradation rules</strong> when vision stuttered, not only dropping a model into a
        launch file.
      </WriteupP>

      <WriteupH2>From training artifacts to a flight-ready inference path</WriteupH2>
      <WriteupP>
        Exported checkpoints through a reproducible path—typically <strong>PyTorch → ONNX</strong>{" "}
        for a portable runtime—with fixed opsets and pinned dependency versions so a field laptop
        could not silently pick up a broken kernel build. The inference node enforced a{" "}
        <strong>fixed scheduling policy</strong>: decode JPEG/compressed image → resize/letterbox
        to model input → NMS / score filtering → publish a compact observation message. Batch size
        stayed at <strong>1</strong> for determinism; any “dynamic” batching was treated as a
        regression risk for tail latency.
      </WriteupP>

      <WriteupH2>ROS graph: topics, queues, and never feeding stale geometry</WriteupH2>
      <WriteupP>
        Perception published <strong>timestamped</strong> detections bound to the camera{" "}
        <code>frame_id</code> and capture time; downstream nodes rejected observations older than a
        configured <strong>max age</strong> relative to the estimator clock. Image transport used
        bounded subscriber queues: if inference fell behind, <strong>frames were dropped
        deliberately</strong> rather than processed late, because a controller acting on late
        detections is worse than one that briefly holds the last good setpoint under a failsafe.
        Serialization stayed lean (fixed-size arrays where possible) to cut copy overhead on
        embedded Linux; where helpful, debug tensors were gated behind a param flag so nominal
        flights did not pay logging tax.
      </WriteupP>

      <WriteupH2>Hooking vision into navigation / control</WriteupH2>
      <WriteupP>
        The engineering work was to define how a bounding box becomes a <strong>trackable
        error</strong>: intrinsics-based ray or pinhole projection to a body-fixed direction,
        optional fusion with altitude / range assumptions, then mapping to a yaw / lateral command
        or a position-setpoint offset the existing outer loop already understood. Outputs were{" "}
        <strong>clamped</strong> when box aspect ratio, area, or detector score looked out of
        distribution relative to calibration data. When confidence dropped below a threshold, the
        stack fell back to a <strong>rate-limited hold</strong> or last-good command rather than
        chasing noise—trading a small tracking error spike for stability.
      </WriteupP>

      <WriteupH2>Time sync, calibration, and what “aligned logs” actually required</WriteupH2>
      <WriteupP>
        Integration debugging lived or died on <strong>one timeline</strong>: camera exposure
        timestamp, IMU propagation, estimator output, and motor commands had to be replayable on the
        same axis. That meant sanity checks on <strong>chrony/PTP</strong> where available, static
        camera intrinsics/extrinsics loaded from versioned YAML, and explicit logging of{" "}
        <strong>inference start/stop ticks</strong> plus queue depth. Post-flight Python notebooks
        overlaid detector events on attitude and thrust so we could see if a tracking glitch was a
        vision miss, an estimator lag, or a control saturation issue.
      </WriteupP>

      <WriteupH2>Bench → cage: test cards we actually ran</WriteupH2>
      <WriteupUl>
        <li>
          <strong>Bag replay</strong> on saved flights to regression-test inference throughput and
          numerical parity with the training workstation.
        </li>
        <li>
          <strong>Tethered / hover passes</strong> with perception logging only, validating IMU
          health, arming sequences, and drop counters before coupling to aggressive forward flight.
        </li>
        <li>
          <strong>Gated forward flight</strong> with monotonically increasing speed caps, stopping
          when tail latency or drop rate crossed budget.
        </li>
        <li>
          <strong>Post-flight diff</strong>: same metrics computed on sim vs. logs where applicable
          (e.g., commanded rate vs. achieved rate during detector dropouts).
        </li>
      </WriteupUl>

      <WriteupH2>CI/CD: keeping the fleet on the same artifacts</WriteupH2>
      <WriteupP>
        Lightweight pipelines validated <strong>launch file graphs</strong>, <strong>model
        checksums</strong>, and <strong>message schema</strong> compatibility before tagging a build
        for the field. Static analysis and unit tests covered parsing, config loading, and “known
        bad” rosbags that should trigger failsafes. The point was not enterprise DevOps theater—it
        was to stop subtle drift between two laptops from turning a Tuesday flight into a four-hour
        bisect.
      </WriteupP>

      <WriteupH2>What changed in how we flew</WriteupH2>
      <WriteupUl>
        <li>
          <strong>End-to-end latency</strong> became a designed quantity with a budget, not a
          post-hoc surprise.
        </li>
        <li>
          <strong>Explicit drops + counters</strong> made “silent slowdown” visible instead of
          masquerading as pilot error.
        </li>
        <li>
          <strong>Navigation-facing clamps and failsafes</strong> turned occasional detector misses
          into bounded motion rather than divergent chases.
        </li>
      </WriteupUl>
    </ProjectTechnicalArticle>
  );
}
