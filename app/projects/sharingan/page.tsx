"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../../cinematic-theme.module.css";

export default function SharinganProject() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealEls = root.querySelectorAll(`.${styles.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    const nav = root.querySelector(`.${styles.topbar}`);
    const progress = root.querySelector(`.${styles.scrollProgress}`) as HTMLElement | null;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (progress && docH > 0) {
        progress.style.width = `${Math.min(100, (y / docH) * 100)}%`;
      }
      if (nav) {
        if (y > lastY && y > 140) {
          nav.classList.add(styles.navHidden);
        } else {
          nav.classList.remove(styles.navHidden);
        }
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.pageRoot}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <span className={styles.dot}></span> HERMAN ISAYENKA
          </div>
          <nav className={styles.links}>
            <Link href="/#projects">PROJECTS</Link>
            <a href="mailto:herman@my.yorku.ca">EMAIL</a>
            <a href="https://github.com/herman888">GITHUB</a>
          </nav>
        </div>
        <div className={styles.scrollProgress}></div>
      </header>

      <section className={styles.projectHero}>
        <video
          className={styles.heroVideo}
          src="/sharingan-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className={`${styles.projectHeroInner} ${styles.container}`}>
          <Link className={styles.back} href="/#projects">
            ← ALL PROJECTS
          </Link>
          <h1>Sharingan</h1>
        </div>
      </section>

      <div className={styles.container}>
        <div className={`${styles.terminalLine} ${styles.reveal}`}>
          <span>SHARINGAN FEED — LIVE FUSION ONLINE</span>
          <span className={styles.cursor}></span>
        </div>

        {/* ========== FLIGHT CONTROLS ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>01 — Flight Controls</div>
          <h2>Radio Link &amp; Binding</h2>
          <div className={styles.pgrid2}>
            <div>
              <p>
                The airframe runs a <strong>Betaflight</strong>-based flight controller, which
                means the radio link and the sensing payload are two completely separate systems
                on the drone — the FC only ever sees stick and switch data, never the sensor
                stream. That separation keeps the flight-critical link simple and fast, and lets
                the sensing payload fail safely without touching control authority.
              </p>
              <p>
                Binding is the one-time pairing step that locks the receiver to a single
                transmitter so it won&apos;t respond to anyone else&apos;s radio on the same
                protocol — done once on the bench, holds until it&apos;s deliberately re-bound.
                The receiver speaks <strong>SBUS</strong>, so once it&apos;s bound there&apos;s no
                handshake left to negotiate — it just streams raw channel data straight to the FC
                over a single one-way serial line, every frame, no acknowledgment expected back.
              </p>
              <p>
                That clip on the right is the link being checked at the signal level, not just
                &quot;the goggles show a picture&quot;: a logic analyzer is clipped onto the
                receiver&apos;s data line, and its top trace sits flat — nothing moving, no data.
                The moment a switch on the transmitter gets toggled, the trace immediately fills
                with a dense, continuous train of pulses and keeps streaming. That&apos;s proof
                the bind holds and the link is actually carrying commands, not just powered on.
              </p>
            </div>
            <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ minHeight: 0, maxWidth: "100%" }}>
              <div className={styles.squareClip}>
                <video
                  src="/radio-link-signal.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
              </div>
            </div>
          </div>
          <ul className={styles.specList}>
            <li><span className={styles.k}>FLIGHT CONTROLLER</span><span className={styles.v}>Betaflight (F4)</span></li>
            <li><span className={styles.k}>RADIO PROTOCOL</span><span className={styles.v}>SBUS</span></li>
            <li><span className={styles.k}>ESC PROTOCOL</span><span className={styles.v}>DSHOT</span></li>
            <li><span className={styles.k}>TELEMETRY</span><span className={styles.v}>None over the SBUS line — one-way, no return channel</span></li>
          </ul>
        </section>

        {/* ========== CONTROLS ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>02 — Controls</div>
          <h2>Controls</h2>
          <p>
            Before any of the sensing payload goes anywhere near the airframe, the base flight
            stack gets checked on its own, props off: can the flight controller actually spin
            each motor the way it&apos;s told to, and does the IMU report orientation correctly
            as the frame moves. Two separate sanity checks, done on the bench before anything
            gets trusted in the air.
          </p>

          <div className={styles.pgrid2}>
            <div>
              <h3>Motor Control</h3>
              <p>
                Each motor driven individually off the flight controller&apos;s ESC outputs —
                confirming direction, spin-up response, and that motor order matches the
                configured layout before trusting the mixer with any throttle input in flight.
              </p>
              <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ minHeight: 0, margin: 0, maxWidth: "100%" }}>
                <div className={styles.squareClip}>
                  <video
                    src="/motor-spin.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "100%", display: "block" }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3>IMU Data Feed</h3>
              <p>
                The frame rotated by hand through roll, pitch, and yaw while watching the live
                orientation feed, to confirm the IMU tracks the physical motion 1:1 before
                it&apos;s ever trusted to self-level or hold attitude in the air.
              </p>
              <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ minHeight: 0, margin: 0, maxWidth: "100%" }}>
                <div className={styles.squareClip}>
                  <video
                    src="/imu-feed.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "100%", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <p>
            The 3D model on the configurator screen is reading the same IMU the flight
            controller flies off of — not a separate preview. As the frame gets picked up and
            tilted in hand, the model on screen banks and rotates right along with it in real
            time, axis for axis, confirming the IMU is wired in correctly (no swapped or
            inverted axes) before it&apos;s trusted for self-leveling or attitude hold.
          </p>
        </section>

        {/* ========== CUSTOM PRINTS AND MOUNTS ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>03 — Custom Prints &amp; Mounts</div>
          <h2>Sensor Bracket</h2>
          <p>
            Every sensor on the payload — camera, radar, and the WiFi sensing node — has to sit
            at a fixed, known position and orientation relative to the airframe for the fusion
            math downstream to hold up. A 3D-printed bracket does that job: a central mounting
            column for the primary sensor pair and a perpendicular side plate for the secondary
            module, all referenced to the same mounting pattern so the offsets between sensors
            stay constant and known.
          </p>
          <p>Designed and sliced in Bambu Studio, printed on a Bambu printer.</p>
          <div className={styles.pgrid2}>
            <div>
              <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ maxWidth: "100%" }}>
                <div className={`${styles.corner} ${styles.tl}`}></div>
                <div className={`${styles.corner} ${styles.tr}`}></div>
                <div className={`${styles.corner} ${styles.bl}`}></div>
                <div className={`${styles.corner} ${styles.br}`}></div>
                <div className={styles.squareClip}>
                  <img src="/bracket-angle.png" alt="Sensor bracket — angled view" style={{ width: "100%", height: "100%" }} />
                </div>
                <div className={styles.cap}>ISOMETRIC — sensor + side-module mounts</div>
              </div>
            </div>
            <div>
              <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ minHeight: 0, maxWidth: "100%" }}>
                <div className={styles.squareClip}>
                  <video
                    src="/mount-printing.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", height: "100%", display: "block" }}
                  />
                </div>
                <div className={styles.cap}>THE PRINT — mount coming off the bed</div>
              </div>
            </div>
          </div>
          <p>
            Bottom to top: the battery feeds the drone frame, the printed mount bolts straight
            onto that frame, and the camera, the radar/WiFi-CSI sensor, and the Raspberry Pi all
            sit on that same mount — one reference point, every sensor offset known.
          </p>

          <div className={styles.pgrid2}>
          <div>
          <div className={styles.mediaTitle}>System Architecture</div>
          <figure className={`${styles.diagramBox} ${styles.mediaSquare}`} style={{ maxWidth: "100%", margin: 0 }}>
            <div className={styles.squareClip}>
            <svg viewBox="0 0 640 660" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Payload stack: battery feeds the drone frame, the printed mount bolts to the frame, and the camera, radar/WiFi-CSI sensor, and Raspberry Pi mount on it.">
              <defs>
                <marker id="stackArrow" markerWidth="7" markerHeight="7" refX="3.4" refY="3.4" orient="auto">
                  <path d="M0,0 L7,3.4 L0,6.8 Z" fill="#2563eb" />
                </marker>
              </defs>

              <text x="320" y="20" textAnchor="middle" fill="#94a3b8" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">SENSING + COMPUTE PAYLOAD</text>

              {/* ===== Camera ===== */}
              <rect x="60" y="40" width="160" height="110" rx="3" fill="none" stroke="#475569" strokeWidth="1.3" />
              <line x1="60" y1="122" x2="220" y2="122" stroke="#475569" strokeWidth="1" opacity="0.25" />
              <rect x="100" y="58" width="24" height="18" rx="1" fill="#eef2f7" stroke="#475569" strokeWidth="1.2" />
              <rect x="122" y="82" width="10" height="8" fill="#eef2f7" stroke="#475569" strokeWidth="1" />
              <circle cx="150" cy="86" r="19" fill="#475569" fillOpacity="0.06" stroke="#475569" strokeWidth="1.4" />
              <circle cx="150" cy="86" r="13" fill="none" stroke="#475569" strokeWidth="1" />
              <circle cx="150" cy="86" r="4.5" fill="#475569" />
              <circle cx="144" cy="80" r="1.8" fill="#fff" opacity="0.75" />
              <text x="140" y="138" textAnchor="middle" fill="#334155" fontFamily="IBM Plex Mono" fontSize="11">CAMERA</text>

              {/* ===== Radar / WiFi-CSI sensor ===== */}
              <rect x="250" y="40" width="140" height="110" rx="3" fill="none" stroke="#475569" strokeWidth="1.3" />
              <line x1="250" y1="122" x2="390" y2="122" stroke="#475569" strokeWidth="1" opacity="0.25" />
              <rect x="302" y="92" width="36" height="14" rx="2" fill="#eef2f7" stroke="#475569" strokeWidth="1.2" />
              <circle cx="320" cy="92" r="2.2" fill="#475569" />
              <path d="M310,92 A10,10 0 0,1 330,92" fill="none" stroke="#475569" strokeWidth="1.2" />
              <path d="M303,92 A17,17 0 0,1 337,92" fill="none" stroke="#475569" strokeWidth="1" opacity="0.7" />
              <path d="M296,92 A24,24 0 0,1 344,92" fill="none" stroke="#475569" strokeWidth="0.8" opacity="0.45" />
              <text x="320" y="138" textAnchor="middle" fill="#334155" fontFamily="IBM Plex Mono" fontSize="11">RADAR / WiFi CSI</text>

              {/* ===== Raspberry Pi ===== */}
              <rect x="420" y="40" width="160" height="110" rx="3" fill="none" stroke="#475569" strokeWidth="1.3" />
              <line x1="420" y1="122" x2="580" y2="122" stroke="#475569" strokeWidth="1" opacity="0.25" />
              <rect x="448" y="56" width="120" height="56" rx="2" fill="#eef6f2" stroke="#475569" strokeWidth="1.2" />
              <rect x="454" y="50" width="66" height="8" fill="#475569" fillOpacity="0.18" stroke="#475569" strokeWidth="0.8" />
              <path d="M458,50 V58 M463,50 V58 M468,50 V58 M473,50 V58 M478,50 V58 M483,50 V58 M488,50 V58 M493,50 V58 M498,50 V58 M503,50 V58 M508,50 V58 M513,50 V58" stroke="#475569" strokeWidth="0.5" opacity="0.6" />
              <rect x="462" y="72" width="22" height="22" fill="#334155" />
              <rect x="468" y="78" width="10" height="10" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.5" />
              <rect x="564" y="62" width="10" height="14" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              <rect x="564" y="82" width="10" height="14" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              <rect x="562" y="100" width="13" height="13" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
              <path d="M565,103 V110 M568,103 V110 M571,103 V110" stroke="#475569" strokeWidth="0.5" />
              <rect x="444" y="94" width="6" height="12" fill="#334155" />
              <circle cx="454" cy="62" r="1.8" fill="none" stroke="#475569" strokeWidth="0.9" />
              <circle cx="562" cy="62" r="1.8" fill="none" stroke="#475569" strokeWidth="0.9" />
              <circle cx="454" cy="106" r="1.8" fill="none" stroke="#475569" strokeWidth="0.9" />
              <circle cx="562" cy="106" r="1.8" fill="none" stroke="#475569" strokeWidth="0.9" />
              <text x="500" y="138" textAnchor="middle" fill="#334155" fontFamily="IBM Plex Mono" fontSize="11">RASPBERRY PI</text>

              {/* mount -&gt; camera / sensor / pi */}
              <line x1="280" y1="190" x2="140" y2="150" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#stackArrow)" />
              <line x1="320" y1="190" x2="320" y2="150" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#stackArrow)" />
              <line x1="360" y1="190" x2="500" y2="150" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#stackArrow)" />

              {/* ===== 3D-printed mount — the actual bracket silhouette: a Y-fork of two sensor
                   bosses down to a central column, a crossbar for the secondary module, and a
                   2-hole base plate, same topology as the printed part above ===== */}
              <rect x="220" y="190" width="200" height="170" rx="3" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.3" />
              <line x1="220" y1="322" x2="420" y2="322" stroke="#2563eb" strokeWidth="1" opacity="0.25" />
              <g fill="#2563eb">
                <polygon points="280,228 296,228 325,256 315,256" />
                <polygon points="344,228 360,228 325,256 315,256" />
                <rect x="312" y="254" width="16" height="20" />
                <rect x="270" y="270" width="100" height="16" rx="2" />
                <rect x="313" y="286" width="14" height="14" />
                <rect x="290" y="298" width="60" height="18" rx="4" />
                <circle cx="288" cy="222" r="11" />
                <circle cx="352" cy="222" r="11" />
                <circle cx="278" cy="278" r="9" />
                <circle cx="362" cy="278" r="9" />
              </g>
              <circle cx="288" cy="222" r="3.6" fill="#eff6ff" />
              <circle cx="352" cy="222" r="3.6" fill="#eff6ff" />
              <circle cx="278" cy="278" r="3" fill="#eff6ff" />
              <circle cx="362" cy="278" r="3" fill="#eff6ff" />
              <circle cx="304" cy="307" r="2.8" fill="#eff6ff" />
              <circle cx="336" cy="307" r="2.8" fill="#eff6ff" />
              <text x="320" y="342" textAnchor="middle" fill="#1d4ed8" fontFamily="IBM Plex Mono" fontSize="11">3D-PRINTED MOUNT</text>

              {/* frame -&gt; mount */}
              <line x1="320" y1="400" x2="320" y2="360" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#stackArrow)" />

              {/* ===== Drone frame — X configuration: center FC plate, 4 arms, motors with
                   dashed prop-disc circles (standard top-down convention for prop sweep) ===== */}
              <rect x="140" y="400" width="360" height="130" rx="3" fill="none" stroke="#475569" strokeWidth="1.3" />
              <line x1="140" y1="505" x2="500" y2="505" stroke="#475569" strokeWidth="1" opacity="0.25" />
              <line x1="320" y1="452" x2="230" y2="418" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <line x1="320" y1="452" x2="410" y2="418" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <line x1="320" y1="452" x2="230" y2="486" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <line x1="320" y1="452" x2="410" y2="486" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              <rect x="303" y="438" width="34" height="28" rx="3" fill="#eef2f7" stroke="#475569" strokeWidth="1.2" />
              <rect x="309" y="444" width="22" height="16" fill="#475569" opacity="0.25" />
              <circle cx="230" cy="418" r="20" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
              <circle cx="410" cy="418" r="20" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
              <circle cx="230" cy="486" r="20" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
              <circle cx="410" cy="486" r="20" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
              <circle cx="230" cy="418" r="8" fill="#334155" />
              <circle cx="410" cy="418" r="8" fill="#334155" />
              <circle cx="230" cy="486" r="8" fill="#334155" />
              <circle cx="410" cy="486" r="8" fill="#334155" />
              <text x="320" y="522" textAnchor="middle" fill="#334155" fontFamily="IBM Plex Mono" fontSize="11">DRONE FRAME</text>

              {/* battery -&gt; frame */}
              <line x1="320" y1="570" x2="320" y2="530" stroke="#2563eb" strokeWidth="1.4" markerEnd="url(#stackArrow)" />

              {/* ===== Battery (LiPo pack, strapped under the frame) ===== */}
              <rect x="240" y="570" width="160" height="70" rx="3" fill="none" stroke="#dc2626" strokeWidth="1.3" />
              <line x1="240" y1="620" x2="400" y2="620" stroke="#dc2626" strokeWidth="1" opacity="0.25" />
              <rect x="304" y="574" width="32" height="8" rx="1" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.2" />
              <rect x="266" y="582" width="108" height="30" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.3" />
              <text x="278" y="601" textAnchor="middle" fill="#dc2626" fontFamily="IBM Plex Mono" fontSize="11">+</text>
              <text x="362" y="601" textAnchor="middle" fill="#dc2626" fontFamily="IBM Plex Mono" fontSize="13">&#8722;</text>
              <text x="320" y="634" textAnchor="middle" fill="#334155" fontFamily="IBM Plex Mono" fontSize="11">BATTERY</text>
            </svg>
            </div>
            <figcaption className={styles.diagramCaption}>Bottom to top: battery → drone frame → 3D-printed mount → camera, radar/WiFi-CSI, Raspberry Pi.</figcaption>
          </figure>
          </div>

          <div>
          <div className={styles.mediaTitle}>Real Hardware Validation</div>
          <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ maxWidth: "100%" }}>
            <div className={`${styles.corner} ${styles.tl}`}></div>
            <div className={`${styles.corner} ${styles.tr}`}></div>
            <div className={`${styles.corner} ${styles.bl}`}></div>
            <div className={`${styles.corner} ${styles.br}`}></div>
            <div className={styles.squareClip}>
              <img src="/sharingan-drone.jpg" alt="The printed mount installed on the frame, with the camera, radar/WiFi-CSI sensor, and Raspberry Pi wired up" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className={styles.cap}>INSTALLED — camera, radar/WiFi-CSI sensor, and Pi mounted on the frame</div>
          </div>
          </div>
          </div>
        </section>

        {/* ========== 2D RADAR MAPPING ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>04 — Radar Mapping</div>
          <h2>2D Radar Mapping</h2>
          <div className={styles.pgrid2}>
            <div>
              <p>
                The first working version of the sensing stack ran on an <strong>LD240</strong>
                {" "}radar sensor, plotting raw detections straight onto a flat, top-down map —
                each return is just a range and a bearing from the drone, with no elevation. A
                person standing and a person lying down look identical, and nothing in the data
                says how far off the floor a detection actually sits. It was enough to prove the
                pipeline end to end — radar return in, bearing/range out, point on a 2D map — but
                it throws away a dimension the sensor is capable of giving back.
              </p>
              <p>
                The right-hand panel in the clip isn&apos;t a recording of actual LD240 output —
                it&apos;s a stand-in that illustrates what the sensor itself sees: just a point
                moving on a range axis off a fixed origin, nothing else. Starting just off the
                sensor, it moves away, reaches its farthest point around the six-second mark, then
                comes back — settling, by the end, about halfway between where it started and
                that farthest point. Once the real pipeline is recording, this is the panel actual
                detections replace.
              </p>
              <div className={styles.imgFrame} style={{ margin: "20px 0 0" }}>
                <img src="/radar-pcb-layout.png" alt="LD240 radar sensor PCB layout — 40mm x 15mm board with dual antenna pairs and RF front-end" style={{ width: "100%", display: "block" }} />
                <div className={styles.cap}>PCB LAYOUT — 40 × 15mm, antenna pairs + RF front-end</div>
              </div>
            </div>
            <div className={`${styles.imgFrame} ${styles.mediaSquare}`} style={{ minHeight: 0, maxWidth: "100%" }}>
              <div className={styles.squareClip}>
                <video
                  src="/radar-combined.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", display: "block" }}
                />
              </div>
              <div className={styles.cap}>LEFT — walking the sensor&apos;s field. RIGHT — range from SENSOR (0,0)</div>
            </div>
          </div>

          <p>
            From there the project moved on to real <strong>3D readings</strong> off the same
            sensor, piped into a <strong>Meta Quest</strong> so detections can be walked around
            and inspected volumetrically instead of squashed onto a plane — the same radar
            returns that used to land as a flat dot on a map now sit at their actual height in
            space, viewable from any angle.
          </p>
          <p>
            Each LD240 return already carries an elevation angle alongside range and bearing, so
            getting to a 3D position is just projecting that triple into Cartesian coordinates on
            the Pi — no second sensor or extra fusion step needed. The resulting point stream goes
            out over Wi-Fi as a lightweight UDP feed to the Quest, where a small Unity app built on
            the Meta XR SDK ingests it and renders every detection as a point anchored to the
            headset&apos;s room-scale origin, so the cloud of returns holds still in space while
            you walk around it and look from any angle.
          </p>
          <ul className={styles.specList}>
            <li><span className={styles.k}>SENSOR</span><span className={styles.v}>LD240 radar</span></li>
            <li><span className={styles.k}>STAGE 1</span><span className={styles.v}>2D top-down map — range + bearing, no elevation</span></li>
            <li><span className={styles.k}>STAGE 2</span><span className={styles.v}>Real 3D readings, visualized live in a Meta Quest</span></li>
          </ul>
        </section>

        {/* ========== SENSORS + CAMERA ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>05 — Sensors + Camera</div>
          <h2>Fusing Camera Bearing with Sensor Range</h2>
          <p>
            The camera and the radar/WiFi sensing stack measure fundamentally different things,
            and the fusion approach leans on that: the <strong>camera gives bearing</strong> — the
            angle to a detected person, derived from where it falls in the frame relative to the
            camera&apos;s known field of view — while the <strong>radar/CSI sensing gives range
            </strong> — how far away it is, independent of lighting or whether the target is even
            visible to the lens. Neither signal alone gives a position. Together, bearing and
            range are exactly the two numbers needed to place a detection on a 2D map.
          </p>

          <p>
            The same two numbers decompose differently depending on which way the sensor&apos;s
            pointed. Forward, bearing and range give a position on the floor; straight down, the
            identical trig — angle off vertical, plus range — gives height instead:
          </p>

          <div className={styles.pgrid2}>
            <div className={`${styles.diagramBox} ${styles.mediaCap}`}>
              <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8" />
                  </marker>
                </defs>
                <circle cx="90" cy="260" r="5" fill="#0ea5a4" />
                <text x="100" y="264" fill="#4b5d75" fontFamily="IBM Plex Mono" fontSize="11">SENSOR (0,0)</text>

                <line x1="90" y1="260" x2="90" y2="60" stroke="#d7e1ec" strokeWidth="1" strokeDasharray="4 4" />
                <text x="96" y="70" fill="#8292a6" fontFamily="IBM Plex Mono" fontSize="10">HEADING / 0°</text>

                <line x1="90" y1="260" x2="430" y2="100" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arrow)" />

                <circle cx="430" cy="100" r="6" fill="#dc2626" />
                <text x="440" y="96" fill="#0b1f3a" fontFamily="IBM Plex Mono" fontSize="12">TARGET</text>

                <path d="M 90 220 A 40 40 0 0 1 125 195" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="128" y="215" fill="#0e7490" fontFamily="IBM Plex Mono" fontSize="12">θ (bearing — from camera)</text>

                <text x="230" y="165" fill="#1d4ed8" fontFamily="IBM Plex Mono" fontSize="12" transform="rotate(-27 230 165)">r (range — from radar / CSI)</text>

                <line x1="430" y1="100" x2="430" y2="260" stroke="#aec0d6" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="90" y1="260" x2="430" y2="260" stroke="#aec0d6" strokeWidth="1" strokeDasharray="3 3" />
                <text x="440" y="275" fill="#8292a6" fontFamily="IBM Plex Mono" fontSize="10">x = r·sin(θ)</text>
                <text x="20" y="130" fill="#8292a6" fontFamily="IBM Plex Mono" fontSize="10">y = r·cos(θ)</text>
              </svg>
              <div className={styles.diagramCaption}>TOP-DOWN — bearing θ, range r → position on the floor</div>
            </div>

            <div className={`${styles.diagramBox} ${styles.mediaCap}`}>
              <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowDown" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#1d4ed8" />
                  </marker>
                </defs>

                <circle cx="110" cy="50" r="5" fill="#0ea5a4" />
                <text x="120" y="40" fill="#4b5d75" fontFamily="IBM Plex Mono" fontSize="11">DRONE / SENSOR</text>

                <line x1="110" y1="50" x2="110" y2="260" stroke="#d7e1ec" strokeWidth="1" strokeDasharray="4 4" />
                <text x="116" y="275" fill="#8292a6" fontFamily="IBM Plex Mono" fontSize="10">NADIR / 0°</text>

                <line x1="110" y1="50" x2="430" y2="240" stroke="#1d4ed8" strokeWidth="1.5" markerEnd="url(#arrowDown)" />

                <circle cx="430" cy="240" r="6" fill="#dc2626" />
                <text x="440" y="236" fill="#0b1f3a" fontFamily="IBM Plex Mono" fontSize="12">GROUND CONTACT</text>

                <path d="M 110 90 A 40 40 0 0 1 144 71" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="150" y="90" fill="#0e7490" fontFamily="IBM Plex Mono" fontSize="12">φ (depression — from sensor)</text>

                <text x="255" y="135" fill="#1d4ed8" fontFamily="IBM Plex Mono" fontSize="12" transform="rotate(27 255 135)">r (range — from radar / CSI)</text>

                <line x1="110" y1="240" x2="430" y2="240" stroke="#aec0d6" strokeWidth="1" strokeDasharray="3 3" />
                <text x="15" y="155" fill="#8292a6" fontFamily="IBM Plex Mono" fontSize="10">h = r·cos(φ)</text>
                <text x="230" y="260" fill="#8292a6" fontFamily="IBM Plex Mono" fontSize="10">d = r·sin(φ)</text>
              </svg>
              <div className={styles.diagramCaption}>STRAIGHT DOWN — depression φ, range r → height above the ground</div>
            </div>
          </div>

          <p>
            With bearing <strong>θ</strong> (or depression <strong>φ</strong>, pointed down) and
            range <strong>r</strong> from the sensing payload, the target&apos;s position — or the
            drone&apos;s own height — drops out of the same basic trigonometry:
          </p>
          <ul className={styles.specList}>
            <li><span className={styles.k}>x (lateral offset)</span><span className={styles.v}>r · sin(θ)</span></li>
            <li><span className={styles.k}>y (forward range)</span><span className={styles.v}>r · cos(θ)</span></li>
            <li><span className={styles.k}>d (ground distance, pointed down)</span><span className={styles.v}>r · sin(φ)</span></li>
            <li><span className={styles.k}>h (height, pointed down)</span><span className={styles.v}>r · cos(φ)</span></li>
          </ul>
          <p>
            That (x, y) point, rotated into the drone&apos;s current heading and offset by its own
            position in the room, is what gets plotted on the live 2D map — one point per
            detection, updated every cycle as the drone moves and the sensor sweep refreshes.
            Point the same sensor down instead and <strong>h</strong> is recomputed the same way,
            every cycle, straight from detections that are already coming in — filling the role a
            barometer normally would on a small drone, estimating altitude, except it&apos;s
            reading geometry off the radar instead of air pressure.
          </p>

          <div className={styles.imgFrame} style={{ maxWidth: 480, margin: "20px auto 0" }}>
            <video
              src="/meta-quest-walkthrough.mp4"
              controls
              playsInline
              preload="metadata"
              style={{ width: "100%", display: "block" }}
            />
            <div className={styles.cap}>
              WALKTHROUGH — bearing/range fusion in practice, live in the Meta Quest
            </div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.ping}></div>
        Herman Isayenka
      </footer>
    </div>
  );
}
