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
        <div className={styles.kb} style={{ backgroundImage: "url('/bracket-angle.png')" }}></div>
        <div className={`${styles.projectHeroInner} ${styles.container}`}>
          <Link className={styles.back} href="/#projects">
            ← ALL PROJECTS
          </Link>
          <h1>Sharingan</h1>
          <p className={styles.subtitle}>
            A scout drone that sees through walls from its own vantage point — fusing an onboard
            camera with mmWave radar and WiFi CSI sensing into a single live read of what&apos;s
            on the other side, before you ever go in.
          </p>
          <div className={styles.tags}>
            <span>Embedded Systems</span>
            <span>Sensor Fusion</span>
            <span>FPV / Betaflight</span>
            <span>Raspberry Pi</span>
            <span>3D Printing</span>
          </div>
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
          <p>
            The airframe runs a <strong>Betaflight</strong>-based flight controller, which means
            the radio link and the sensing payload are two completely separate systems on the
            drone — the FC only ever sees stick and switch data, never the sensor stream. That
            separation keeps the flight-critical link simple and fast, and lets the sensing
            payload fail safely without touching control authority.
          </p>
          <p>
            Binding is the one-time pairing step that locks the receiver to a single transmitter
            so it won&apos;t respond to anyone else&apos;s radio on the same protocol — done once
            on the bench, holds until it&apos;s deliberately re-bound. Depending on the receiver
            protocol in use, the FC either passes raw channel data straight through
            (<strong>SBUS</strong>-style, one-way) or negotiates a two-way digital link that also
            returns link quality and RSSI back to the goggles/radio (<strong>CRSF/ELRS</strong>
            -style).
          </p>
          <div className={styles.callout}>
            <strong>Note:</strong> drop in your exact receiver model, protocol (SBUS / CRSF /
            ELRS), and channel map here — this section is written to the general binding process
            so it&apos;s accurate regardless of which one you lock in.
          </div>
          <ul className={styles.specList}>
            <li><span className={styles.k}>FLIGHT CONTROLLER</span><span className={styles.v}>Betaflight (F4)</span></li>
            <li><span className={styles.k}>RADIO PROTOCOL</span><span className={styles.v}>[confirm: SBUS / CRSF / ELRS]</span></li>
            <li><span className={styles.k}>ESC PROTOCOL</span><span className={styles.v}>DSHOT</span></li>
            <li><span className={styles.k}>TELEMETRY</span><span className={styles.v}>RSSI + link quality over the same RF link</span></li>
          </ul>
        </section>

        {/* ========== CUSTOM PRINTS AND MOUNTS ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>02 — Custom Prints &amp; Mounts</div>
          <h2>Sensor Bracket</h2>
          <p>
            Every sensor on the payload — camera, radar, and the WiFi sensing node — has to sit
            at a fixed, known position and orientation relative to the airframe for the fusion
            math downstream to hold up. A 3D-printed bracket does that job: a central mounting
            column for the primary sensor pair and a perpendicular side plate for the secondary
            module, all referenced to the same mounting pattern so the offsets between sensors
            stay constant and known.
          </p>
          <div className={styles.pgrid2}>
            <div className={styles.imgFrame}>
              <div className={`${styles.corner} ${styles.tl}`}></div>
              <div className={`${styles.corner} ${styles.tr}`}></div>
              <div className={`${styles.corner} ${styles.bl}`}></div>
              <div className={`${styles.corner} ${styles.br}`}></div>
              <img src="/bracket-top.png" alt="Sensor bracket — top-down view" />
              <div className={styles.cap}>TOP-DOWN — mounting pattern</div>
            </div>
            <div className={styles.imgFrame}>
              <div className={`${styles.corner} ${styles.tl}`}></div>
              <div className={`${styles.corner} ${styles.tr}`}></div>
              <div className={`${styles.corner} ${styles.bl}`}></div>
              <div className={`${styles.corner} ${styles.br}`}></div>
              <img src="/bracket-angle.png" alt="Sensor bracket — angled view" />
              <div className={styles.cap}>ISOMETRIC — sensor + side-module mounts</div>
            </div>
          </div>
          <p>Designed and sliced in Bambu Studio, printed on a Bambu printer.</p>
        </section>

        {/* ========== SENSORS + CAMERA ========== */}
        <section className={`${styles.psection} ${styles.reveal}`}>
          <div className={styles.ptag}>03 — Sensors + Camera</div>
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

          <div className={styles.diagramBox}>
            <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#ffb454" />
                </marker>
              </defs>
              <circle cx="90" cy="260" r="5" fill="#7fd99a" />
              <text x="100" y="264" fill="#9aa393" fontFamily="IBM Plex Mono" fontSize="11">SENSOR (0,0)</text>

              <line x1="90" y1="260" x2="90" y2="60" stroke="#262b22" strokeWidth="1" strokeDasharray="4 4" />
              <text x="96" y="70" fill="#5e6657" fontFamily="IBM Plex Mono" fontSize="10">HEADING / 0°</text>

              <line x1="90" y1="260" x2="430" y2="100" stroke="#ffb454" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <circle cx="430" cy="100" r="6" fill="#ff6b5e" />
              <text x="440" y="96" fill="#e8ece3" fontFamily="IBM Plex Mono" fontSize="12">TARGET</text>

              <path d="M 90 220 A 40 40 0 0 1 125 195" fill="none" stroke="#5fd4d0" strokeWidth="1.5" />
              <text x="128" y="215" fill="#5fd4d0" fontFamily="IBM Plex Mono" fontSize="12">θ (bearing — from camera)</text>

              <text x="230" y="165" fill="#ffb454" fontFamily="IBM Plex Mono" fontSize="12" transform="rotate(-27 230 165)">r (range — from radar / CSI)</text>

              <line x1="430" y1="100" x2="430" y2="260" stroke="#3a4233" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="260" x2="430" y2="260" stroke="#3a4233" strokeWidth="1" strokeDasharray="3 3" />
              <text x="440" y="275" fill="#5e6657" fontFamily="IBM Plex Mono" fontSize="10">x = r·sin(θ)</text>
              <text x="20" y="130" fill="#5e6657" fontFamily="IBM Plex Mono" fontSize="10">y = r·cos(θ)</text>
            </svg>
          </div>

          <p>
            With bearing <strong>θ</strong> from the camera and range <strong>r</strong> from the
            sensing payload, the target&apos;s position relative to the drone drops out of basic
            trigonometry:
          </p>
          <ul className={styles.specList}>
            <li><span className={styles.k}>x (lateral offset)</span><span className={styles.v}>r · sin(θ)</span></li>
            <li><span className={styles.k}>y (forward range)</span><span className={styles.v}>r · cos(θ)</span></li>
          </ul>
          <p>
            That (x, y) point, rotated into the drone&apos;s current heading and offset by its own
            position in the room, is what gets plotted on the live 2D map — one point per
            detection, updated every cycle as the drone moves and the sensor sweep refreshes.
          </p>

          <div className={styles.videoPlaceholder}>
            <div className={styles.icon}>▶</div>
            <div className={styles.label}>Walkthrough video — bearing/range fusion in practice</div>
            <div className={styles.note}>Drop the recorded explainer in here once it&apos;s edited.</div>
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
