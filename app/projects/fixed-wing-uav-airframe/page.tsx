import {
  ProjectTechnicalArticle,
  WriteupH2,
  WriteupP,
  WriteupUl,
} from "../_components/ProjectTechnicalArticle";

const BUILD_VIDEO_SRC =
  "/86FB32C9-63D6-47E1-AAA5-D185AF7679D0.mp4";

export default function FixedWingUavAirframePage() {
  return (
    <ProjectTechnicalArticle
      title="Fixed-Wing UAV Airframe Design"
      year="2023"
      breadcrumb="Fixed-wing airframe"
      hero={{
        src: "/wing-airframe-hero.jpg",
        alt: "Wing build: heat-shrink covering on one panel and internal rib mesh on the other",
        variant: "contain",
        imageQuality: 95,
        heightClass: "h-56 min-h-[14rem] md:h-[24rem] md:min-h-[24rem]",
      }}
    >
      <WriteupP>
        This build was an iterative search for a wing that was <strong>light, stiff enough to carry
        avionics without fluttering</strong>, and <strong>honest to manufacture</strong> with the
        tools we had in the lab. We went through <strong>three distinct internal architectures</strong>{" "}
        before converging on the airframe in the photos: each revision changed the rib spacing,
        spar carry-through, and skinning approach—and each taught a different failure mode (twist,
        panel buckling, or build time blowing up).
      </WriteupP>

      <WriteupH2>Version 0: covered prototype skin</WriteupH2>
      <WriteupP>
        <strong>Version 0</strong> was deliberately crude: a laser-cut balsa/ply skeleton sized to
        prove hinge lines, servo bays, and overall planform before we committed carbon or more
        expensive stock. We skinned the first panels using <strong>model-grade heat-shrink film</strong>{" "}
        (the tight, almost plastic covering you see on the left of the build photo)—applied with a{" "}
        <strong>covering iron and heat gun</strong> so the film shrank down smooth and compact over
        the ribs without bridging the open bays. That pass was about <strong>learning the process</strong>{" "}
        (tack, shrink sequence, relief cuts) and catching gross aerodynamic mistakes early, not about
        hitting a final weight target.
      </WriteupP>

      <WriteupH2>Wing iteration 1 — “open mesh,” minimum rib count</WriteupH2>
      <WriteupP>
        The first structural direction maximized <strong>open lightening holes</strong> and kept
        rib count low to save mass. The <strong>mesh-like lattice</strong> looked great on the bench
        and printed fast on the laser.
      </WriteupP>
      <WriteupUl>
        <li>
          <strong>Pros:</strong> very low blank weight, fast iteration on CAD, easy to inspect wiring
          and run cables through the bay.
        </li>
        <li>
          <strong>Cons:</strong> large unsupported skin spans wanted to <strong>oil-can</strong>{" "}
          under torsion; the wing felt “soft” in washout when we loaded the tip; harder to keep
          consistent film tension across big cutouts.
        </li>
      </WriteupUl>

      <WriteupH2>Wing iteration 2 — denser ribs, tighter mesh</WriteupH2>
      <WriteupP>
        We tightened rib spacing and added <strong>secondary stiffeners</strong> near the root and
        control-surface hard points, accepting a small mass penalty for a much stiffer torque box.
      </WriteupP>
      <WriteupUl>
        <li>
          <strong>Pros:</strong> noticeably better <strong>torsional stiffness</strong>, cleaner
          covering jobs, more predictable glue joints at high-stress corners.
        </li>
        <li>
          <strong>Cons:</strong> part count and build time went up; small alignment errors stacked
          during assembly; harder to rework a bay after servos were mounted.
        </li>
      </WriteupUl>

      <WriteupH2>Wing iteration 3 — final layout (what you see assembled)</WriteupH2>
      <WriteupP>
        The third direction balanced the first two: enough <strong>mesh structure</strong> to keep
        weight down, but enough <strong>closed panels and spar continuity</strong> that the skin
        behaved like a stressed surface instead of a drum head. The internal shot shows the{" "}
        <strong>GPS / avionics stack</strong> integrated into the bay with service loops kept short
        so nothing could chafe through the covering during vibration checks. This is the geometry we
        carried into final integration and ground handling—still not “perfect,” but{" "}
        <strong>repeatable</strong> and matched to the autopilot assumptions we wanted to test in
        flight.
      </WriteupP>
      <WriteupUl>
        <li>
          <strong>Pros:</strong> best stiffness-to-build-time ratio of the three, fewer surprises
          when torquing down linkages, easier to seal bays against dust.
        </li>
        <li>
          <strong>Cons:</strong> least “open” for last-minute hacks; tighter tolerances on spar
          slots; a bit heavier than iteration 1 on paper (worth it in practice).
        </li>
      </WriteupUl>

      <WriteupH2>Build video</WriteupH2>
      <WriteupP>
        Field and bench clips from the covering and assembly passes are in the video below—mostly
        <strong> Version 0 / early skinning</strong> and fit-up before the exterior looked like the
        finished ship in the stills.
      </WriteupP>
      <div className="flex justify-center">
        <div className="inline-block max-w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm ring-1 ring-border/60">
          <video
            src={BUILD_VIDEO_SRC}
            controls
            playsInline
            preload="metadata"
            className="mx-auto block max-h-[min(88vh,920px)] w-auto max-w-full"
          />
        </div>
      </div>
    </ProjectTechnicalArticle>
  );
}
