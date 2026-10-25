"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./cinematic-theme.module.css";

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reveal on scroll
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

    // Nav hide-on-scroll-down + progress bar
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

    // Stat counters
    const stats = root.querySelectorAll<HTMLElement>(`.${styles.stat} .num[data-count]`);
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0", 10);
          const duration = 1100;
          const start = performance.now();
          function tick(now: number) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          statIO.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((el) => statIO.observe(el));

    // Category tabs
    const tabs = root.querySelectorAll<HTMLElement>(`.${styles.tab}`);
    const onTabClick = (tab: HTMLElement) => {
      tabs.forEach((t) => t.classList.remove(styles.active));
      tab.classList.add(styles.active);
      const cat = tab.dataset.cat;
      root.querySelectorAll<HTMLElement>(`.${styles.pgrid}[data-cat]`).forEach((g) => {
        g.style.display = g.dataset.cat === cat ? "grid" : "none";
      });
    };
    const tabHandlers: Array<[HTMLElement, () => void]> = [];
    tabs.forEach((tab) => {
      const handler = () => onTabClick(tab);
      tab.addEventListener("click", handler);
      tabHandlers.push([tab, handler]);
    });

    // Lazy-play card videos only when visible
    const cardVideos = root.querySelectorAll<HTMLVideoElement>(`.${styles.pcard} video`);
    const videoIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    cardVideos.forEach((v) => videoIO.observe(v));

    return () => {
      io.disconnect();
      statIO.disconnect();
      videoIO.disconnect();
      window.removeEventListener("scroll", onScroll);
      tabHandlers.forEach(([tab, handler]) => tab.removeEventListener("click", handler));
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
            <a href="#projects">PROJECTS</a>
            <a href="mailto:herman@my.yorku.ca">EMAIL</a>
            <a href="https://linkedin.com/in/hermanisayenka">LINKEDIN</a>
            <a href="https://github.com/herman888">GITHUB</a>
          </nav>
        </div>
        <div className={styles.scrollProgress}></div>
      </header>

      {/* ========== HERO ========== */}
      <section className={styles.heroCinematic}>
        <div className={styles.heroFloor}></div>

        <div className={styles.flightRig}>
          <div className={styles.droneTrail} aria-hidden="true">
            <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="18" r="9" stroke="#ffb454" strokeWidth="2" />
              <circle cx="100" cy="18" r="9" stroke="#ffb454" strokeWidth="2" />
              <circle cx="20" cy="46" r="9" stroke="#ffb454" strokeWidth="2" />
              <circle cx="100" cy="46" r="9" stroke="#ffb454" strokeWidth="2" />
              <path
                d="M30 20L50 30M90 20L70 30M30 44L50 32M90 44L70 32"
                stroke="#ffb454"
                strokeWidth="2"
              />
              <rect x="48" y="26" width="24" height="12" rx="2" stroke="#ffb454" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.droneIcon} aria-hidden="true">
            <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="18" r="9" stroke="#ffb454" strokeWidth="2" />
              <circle cx="100" cy="18" r="9" stroke="#ffb454" strokeWidth="2" />
              <circle cx="20" cy="46" r="9" stroke="#ffb454" strokeWidth="2" />
              <circle cx="100" cy="46" r="9" stroke="#ffb454" strokeWidth="2" />
              <path
                d="M30 20L50 30M90 20L70 30M30 44L50 32M90 44L70 32"
                stroke="#ffb454"
                strokeWidth="2"
              />
              <rect x="48" y="26" width="24" height="12" rx="2" stroke="#ffb454" strokeWidth="2" />
              <circle cx="60" cy="32" r="2.4" fill="#5fd4d0" />
            </svg>
          </div>
        </div>

        <div className={styles.radar} aria-hidden="true">
          <div className={styles.sweep}></div>
          <div className={styles.blip}></div>
        </div>

        <div className={styles.heroVignette}></div>

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            <span className={styles.line}>
              <span>Building autonomy for</span>
            </span>
            <span className={styles.line}>
              <span className={styles.accent}>aerospace, space, and defense.</span>
            </span>
          </h1>
          <div className={styles.heroSocials}>
            <a href="mailto:herman@my.yorku.ca">EMAIL</a>
            <a href="https://linkedin.com/in/hermanisayenka">LINKEDIN</a>
            <a href="https://github.com/herman888">GITHUB</a>
            <a href="https://hermanisayenka.ca">INSTAGRAM</a>
            <a href="https://hermanisayenka.ca">X</a>
          </div>
        </div>

        <div className={styles.scrollCue}>
          SCROLL TO EXPLORE
          <div className={styles.chev}>▾</div>
        </div>
      </section>

      <div className={styles.container}>
        <div className={`${styles.terminalLine} ${styles.reveal}`}>
          <span>FEED LOCKED — TARGET: PORTFOLIO.LOG</span>
          <span className={styles.cursor}></span>
        </div>

        {/* ========== ABOUT ========== */}
        <section className={styles.panel}>
          <div className={`${styles.sectionTag} ${styles.reveal}`}>
            <span className={styles.num}>01</span> ORIGIN
          </div>
          <div className={styles.aboutSplit}>
            <div className={styles.reveal}>
              <h2>From line-followers to counter-UAS interceptors.</h2>
              <p>
                I&apos;m an <strong>Electrical Engineering</strong> student at York University
                Lassonde, building across embedded systems, control theory, and applied software.
                My work spans UAV flight stacks, sensor fusion, computer vision, and the kind of
                hardware that has to work the first time it leaves the bench.
              </p>
              <p>
                Outside coursework, I build and fly things — from a scout drone that sees through
                walls to a fixed-wing interceptor platform — and compete in hackathons and case
                competitions along the way.
              </p>
              <div className={styles.statRow}>
                <div className={styles.stat}>
                  <div className={styles.num} data-count="20">0</div>
                  <div className={styles.label}>Projects shipped</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.num} data-count="4">0</div>
                  <div className={styles.label}>Hackathon podiums</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== FEATURED / SHARINGAN TRAILER ========== */}
        <section className={styles.panel}>
          <div className={`${styles.sectionTag} ${styles.reveal}`}>
            <span className={styles.num}>02</span> FEATURED — ACTIVE PROJECT
          </div>
          <div className={`${styles.trailer} ${styles.reveal}`}>
            <div className={styles.kb} style={{ backgroundImage: "url('/sharingan-drone.jpg')" }}></div>
            <div
              className={`${styles.kb} ${styles.kb2}`}
              style={{ backgroundImage: "url('/bracket-angle.png')", opacity: 0 }}
            ></div>
            <div className={styles.trailerContent}>
              <span className={styles.trailerBadge}>// Embedded Systems — New</span>
              <h3>Sharingan</h3>
              <p>
                A scout drone built to see through walls from its own vantage point — fusing an
                onboard camera, mmWave radar, and WiFi CSI sensing into a single live picture of
                what&apos;s on the other side. Custom flight stack, 3D-printed sensor mounts, and a
                Raspberry Pi payload running the fusion pipeline in real time.
              </p>
              <div className={styles.trailerTags}>
                <span>Sensor Fusion</span>
                <span>FPV / Betaflight</span>
                <span>Raspberry Pi</span>
                <span>3D Printing</span>
              </div>
              <Link className={styles.btnCta} href="/projects/sharingan">
                WATCH THE BRIEFING →
              </Link>
            </div>
          </div>
        </section>

        {/* ========== PROJECTS ========== */}
        <section id="projects" className={styles.panel}>
          <div className={`${styles.sectionTag} ${styles.reveal}`}>
            <span className={styles.num}>03</span> MISSION LOG — ALL PROJECTS
          </div>

          <div className={`${styles.tabs} ${styles.reveal}`} role="tablist">
            <button className={`${styles.tab} ${styles.active}`} data-cat="embedded">
              Embedded Systems
            </button>
            <button className={styles.tab} data-cat="math">
              Math
            </button>
            <button className={styles.tab} data-cat="software">
              Software
            </button>
          </div>

          {/* Embedded Systems */}
          <div className={`${styles.pgrid} ${styles.reveal}`} data-cat="embedded">
            <div className={styles.pcard}>
              <div className={styles.media}>
                <video src="/larp/larp-intro.mp4" muted loop playsInline />
              </div>
              <div className={styles.caption}>
                <span>C-UAS</span>
                <span className={styles.yr}>2026</span>
              </div>
              <div className={styles.body}>
                <h3>Localised Aerial Response Platform</h3>
                <p>C-UAS interceptor system for localized aerial threat response.</p>
                <div className={styles.tech}><span>Docs</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/wing-build-prototype-right-rot180.jpg" alt="Fixed-wing UAV airframe" />
              </div>
              <div className={styles.caption}>
                <span>Fixed-Wing</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Fixed-Wing UAV Airframe Design</h3>
                <p>Laser-cut wing iterations and a heat-shrink prototype skin for a fixed-wing airframe.</p>
                <div className={styles.tech}><span>CAD</span><span>Laser Cut</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <video src="/droneracing.mp4" muted loop playsInline />
              </div>
              <div className={styles.caption}>
                <span>Vision + ROS</span>
                <span className={styles.yr}>2024</span>
              </div>
              <div className={styles.body}>
                <h3>Integrating UAV Controls into Navigation</h3>
                <p>Vision models deployed on a drone&apos;s onboard compute, integrated with ROS for navigation control.</p>
                <div className={styles.tech}><span>ROS</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/car-line-follower.png" alt="Car line follower" />
              </div>
              <div className={styles.caption}>
                <span>Arduino</span>
                <span className={styles.yr}>2024</span>
              </div>
              <div className={styles.body}>
                <h3>Car Line Follower</h3>
                <p>Infrared sensors and Arduino logic for autonomous line-following.</p>
                <div className={styles.tech}><span>Arduino</span><span>IR Sensors</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <video src="/car.mov" muted loop playsInline />
              </div>
              <div className={styles.caption}>
                <span>Arduino</span>
                <span className={styles.yr}>2024</span>
              </div>
              <div className={styles.body}>
                <h3>Car with Obstacle Detection</h3>
                <p>An Arduino-controlled car that detects and avoids obstacles in real time.</p>
                <div className={styles.tech}><span>Arduino</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/water.jpg" alt="Autonomous water pump" />
              </div>
              <div className={styles.caption}>
                <span>Automation</span>
                <span className={styles.yr}>2024</span>
              </div>
              <div className={styles.body}>
                <h3>Autonomous Water Pump</h3>
                <p>Waters plants automatically based on live soil moisture readings.</p>
                <div className={styles.tech}><span>Arduino</span><span>Sensors</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <video src="/timer.mp4" muted loop playsInline />
              </div>
              <div className={styles.caption}>
                <span>Circuits</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Digital Timer</h3>
                <p>An Arduino-driven timer built around a 555 timer IC.</p>
                <div className={styles.tech}><span>Arduino</span><span>EasyEDA</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <video src="/clock.mp4" muted loop playsInline />
              </div>
              <div className={styles.caption}>
                <span>Circuits</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Digital Clock</h3>
                <p>An Arduino-based clock driving a 7-segment display.</p>
                <div className={styles.tech}><span>Arduino</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/heateddriveway.png" alt="Heated driveway" />
              </div>
              <div className={styles.caption}>
                <span>IoT</span>
                <span className={styles.yr}>2026</span>
              </div>
              <div className={styles.body}>
                <h3>Heated Driveway</h3>
                <p>Snow detection and heating controller with a live monitoring dashboard.</p>
                <div className={styles.tech}><span>Arduino</span><span>Relay State Machine</span></div>
              </div>
            </div>
          </div>

          {/* Math */}
          <div className={styles.pgrid} data-cat="math" style={{ display: "none" }}>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/simulation.png" alt="UAV navigation simulation" />
              </div>
              <div className={styles.caption}>
                <span>Controls</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Optimizing UAV Autonomous Navigation</h3>
                <p>Quadrotor co-simulation with cascaded attitude control design and tuning.</p>
                <div className={styles.tech}><span>MATLAB</span><span>Simulink</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/janestreet.jpeg" alt="Jane Street Estimation Competition" />
              </div>
              <div className={styles.caption}>
                <span>Estimation</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Jane Street Estimation Competition</h3>
                <p>Fermi estimation competition. Placed 1st.</p>
                <div className={styles.tech}><span>Fermi Estimation</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/forestorsfinancial.jpeg" alt="Foresters Financial Development Challenge" />
              </div>
              <div className={styles.caption}>
                <span>Case Comp</span>
                <span className={styles.yr}>2026</span>
              </div>
              <div className={styles.body}>
                <h3>Foresters Financial Development Challenge</h3>
                <p>Fintech case competition. Placed 1st.</p>
                <div className={styles.tech}><span>Financial Modeling</span></div>
              </div>
            </div>
          </div>

          {/* Software */}
          <div className={styles.pgrid} data-cat="software" style={{ display: "none" }}>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <video src="/drone-racing-2023-loop.mp4" muted loop playsInline />
              </div>
              <div className={styles.caption}>
                <span>ML / CV</span>
                <span className={styles.yr}>2023</span>
              </div>
              <div className={styles.body}>
                <h3>UAV Navigation Model Training</h3>
                <p>A YOLOv8 gate detector trained for autonomous drone racing navigation.</p>
                <div className={styles.tech}>
                  <span>YOLOv8</span><span>PyTorch</span><span>OpenCV</span><span>Roboflow</span>
                </div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <iframe
                  src="https://www.youtube.com/embed/gwU1twqMq40?autoplay=1&mute=1&loop=1&playlist=gwU1twqMq40&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="RedLamp project video"
                />
              </div>
              <div className={styles.caption}>
                <span>UofTHacks</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>RedLamp</h3>
                <p>A study lamp that detects student stress. 2nd place.</p>
                <div className={styles.tech}><span>Hardware + Software</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/shopify-card.jpg" alt="CityPath AI" />
              </div>
              <div className={styles.caption}>
                <span>Shopify Hackathon</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>CityPath AI</h3>
                <p>Analyzes street safety patterns from city data. 3rd place.</p>
                <div className={styles.tech}><span>Data Analysis</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <iframe
                  src="https://www.youtube.com/embed/P3chEYABVYA?autoplay=1&mute=1&loop=1&playlist=P3chEYABVYA&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="GrowthSync project video"
                />
              </div>
              <div className={styles.caption}>
                <span>CtrlHackDel 2.0</span>
                <span className={styles.yr}>2026</span>
              </div>
              <div className={styles.body}>
                <h3>GrowthSync</h3>
                <p>Visualizes subdivision impact for city planners.</p>
                <div className={styles.tech}><span>Visualization</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <iframe
                  src="https://www.youtube.com/embed/PQBeq-7WKRE?autoplay=1&mute=1&loop=1&playlist=PQBeq-7WKRE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="Finding N.E.M.O project video"
                />
              </div>
              <div className={styles.caption}>
                <span>Hack Concordia</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Finding N.E.M.O</h3>
                <p>A shipping-container recovery simulation.</p>
                <div className={styles.tech}><span>Simulation</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <iframe
                  src="https://www.youtube.com/embed/man2-PK6fbg?autoplay=1&mute=1&loop=1&playlist=man2-PK6fbg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="Giveway project video"
                />
              </div>
              <div className={styles.caption}>
                <span>Hack the 6ix</span>
                <span className={styles.yr}>2025</span>
              </div>
              <div className={styles.body}>
                <h3>Giveway</h3>
                <p>Meal requests paired with optimized driver routing.</p>
                <div className={styles.tech}><span>Routing</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <img src="/meal2go.png" alt="Meal2Go" />
              </div>
              <div className={styles.caption}>
                <span>Eureka Hacks</span>
                <span className={styles.yr}>2024</span>
              </div>
              <div className={styles.body}>
                <h3>Meal2Go</h3>
                <p>Health-tailored meal recommendations.</p>
                <div className={styles.tech}><span>Software</span></div>
              </div>
            </div>
            <div className={styles.pcard}>
              <div className={styles.media}>
                <iframe
                  src="https://www.youtube.com/embed/1M8MoqCxQCI?autoplay=1&mute=1&loop=1&playlist=1M8MoqCxQCI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="KinKitchen project video"
                />
              </div>
              <div className={styles.caption}>
                <span>Hack Canada</span>
                <span className={styles.yr}>2026</span>
              </div>
              <div className={styles.body}>
                <h3>KinKitchen</h3>
                <p>3D step-by-step recipe walkthroughs.</p>
                <div className={styles.tech}><span>3D</span><span>Software</span></div>
              </div>
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
