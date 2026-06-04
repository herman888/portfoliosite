import {
  ProjectTechnicalArticle,
  WriteupH2,
  WriteupP,
  WriteupUl,
} from "../_components/ProjectTechnicalArticle";

export default function UavNavigationModelTrainingPage() {
  return (
    <ProjectTechnicalArticle
      title="UAV Navigation Model Training"
      year="2023"
      breadcrumb="UAV model training"
      hero={{
        src: "/uav-gate-yolo-detection.png",
        alt: "Racing gate with YOLO-style bounding box overlay from onboard vision",
        heightClass: "h-56 min-h-[14rem] md:h-[22rem] md:min-h-[22rem]",
      }}
    >
      <WriteupP>
        This project built an end-to-end perception stack for <strong>high-speed gate detection</strong>{" "}
        on a racing quadrotor: field imagery → labeled dataset in{" "}
        <strong>Roboflow</strong> → <strong>YOLOv8</strong> training (Ultralytics / PyTorch) →
        evaluation and export for downstream navigation. The hard part was not “run a detector once,”
        but getting a model that stayed reliable under motion blur, wide dynamic range, and fast
        attitude changes—then packaging it so the flight stack could consume boxes at useful rates
        with predictable latency.
      </WriteupP>

      <WriteupH2>Dataset: Roboflow + labeling workflow</WriteupH2>
      <WriteupP>
        Raw frames from flight logs were organized by run and camera, then uploaded into a{" "}
        <strong>Roboflow</strong> project for versioning, train/valid/test splits, and team review.
        Bounding boxes followed a single class schema for the competition-style gate (including
        partial occlusions and skewed perspectives). Roboflow’s augmentations (mosaic-style mixes,
        blur/noise, exposure jitter) were tuned to mimic outdoor capture without destroying thin gate
        edges. When the label set changed, exports were regenerated in <strong>YOLOv8</strong>{" "}
        layout so training scripts always tracked a checksum-stable dataset revision.
      </WriteupP>

      <WriteupH2>Training stack: YOLOv8, PyTorch, Ultralytics</WriteupH2>
      <WriteupP>
        Models were trained with the <strong>Ultralytics YOLOv8</strong> API on top of{" "}
        <strong>PyTorch</strong>, using modest input resolutions first for iteration speed, then
        scaling up once precision on short-range approaches looked acceptable. Hyperparameters
        (IoU thresholds, confidence thresholds, augment strengths) were logged per experiment so
        regressions could be bisected. Offline validation emphasized{" "}
        <strong>recall on small / distant gates</strong> and temporal stability (IoU overlap
        frame-to-frame), not only headline mAP—what matters for a planner that fuses vision with
        IMU and motion priors.
      </WriteupP>

      <WriteupH2>Pre/post-processing: Python &amp; OpenCV</WriteupH2>
      <WriteupP>
        <strong>Python</strong> glue scripts handled ingest from bags/logs, timestamp alignment,
        and decode. <strong>OpenCV</strong> covered resizing, optional undistortion, and batch
        visualization for QA (drawing predictions, dumping failure clips). Before export, ONNX or
        native PyTorch weights were profiled on the target laptop / companion computer class
        hardware to estimate FPS and tail latency—inputs to the later integration summer where the
        same heads were wrapped for onboard inference.
      </WriteupP>

      <WriteupH2>What shipped</WriteupH2>
      <WriteupUl>
        <li>
          A reproducible Roboflow project + export pipeline (YOLOv8 format) with documented splits
          and augment presets.
        </li>
        <li>
          Fine-tuned YOLOv8 weights with evaluation notebooks/plots (PR curves, per-sequence error
          buckets) and known failure cases (specular highlights, heavy motion blur).
        </li>
        <li>
          OpenCV-backed visualization for field debugging and for communicating model limits to
          controls teammates before closed-loop flight.
        </li>
      </WriteupUl>
    </ProjectTechnicalArticle>
  );
}
