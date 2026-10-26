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

    // Terminal-style letter-by-letter typing headline
    const typeTimers: Array<ReturnType<typeof setTimeout>> = [];
    const typeTargets = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.typeTarget}`));
    const typeNext = (index: number) => {
      if (index >= typeTargets.length) return;
      const el = typeTargets[index];
      const text = el.dataset.typeText || "";
      const color = el.dataset.typeColor;
      if (color === "green") el.style.color = "var(--green)";
      if (color === "amber") el.style.color = "var(--amber)";
      let charIndex = 0;
      const typeChar = () => {
        charIndex++;
        const ch = text[charIndex - 1];
        const span = document.createElement("span");
        span.className = `${styles.typeChar} ${styles.typeCharActive}`;
        span.textContent = ch;
        el.appendChild(span);
        // settle the previous flash out, leave this one lit for a beat
        const prior = span.previousElementSibling as HTMLElement | null;
        if (prior) prior.classList.remove(styles.typeCharActive);
        if (charIndex < text.length) {
          typeTimers.push(setTimeout(typeChar, 45));
        } else {
          typeTimers.push(
            setTimeout(() => {
              span.classList.remove(styles.typeCharActive);
              const next = el.nextElementSibling as HTMLElement | null;
              if (next && next.hasAttribute("data-type-reveal")) {
                next.classList.add(styles.visible);
              }
              typeNext(index + 1);
            }, 180)
          );
        }
      };
      typeTimers.push(setTimeout(typeChar, 45));
    };
    typeTimers.push(setTimeout(() => typeNext(0), 350));

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
      videoIO.disconnect();
      window.removeEventListener("scroll", onScroll);
      typeTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.pageRoot} style={{ fontFamily: "var(--mono)" }}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            HERMAN ISAYENKA
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
              <circle cx="20" cy="18" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="100" cy="18" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="20" cy="46" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="100" cy="46" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <path
                d="M30 20L50 30M90 20L70 30M30 44L50 32M90 44L70 32"
                stroke="#1d4ed8"
                strokeWidth="2"
              />
              <rect x="48" y="26" width="24" height="12" rx="2" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.droneIcon} aria-hidden="true">
            <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="18" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="100" cy="18" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="20" cy="46" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="100" cy="46" r="9" stroke="#1d4ed8" strokeWidth="2" />
              <path
                d="M30 20L50 30M90 20L70 30M30 44L50 32M90 44L70 32"
                stroke="#1d4ed8"
                strokeWidth="2"
              />
              <rect x="48" y="26" width="24" height="12" rx="2" stroke="#1d4ed8" strokeWidth="2" />
              <circle cx="60" cy="32" r="2.4" fill="#38bdf8" />
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
              <span className={styles.heroPrompt}>{"> "}</span>
              <span className={styles.typeTarget} data-type-text="Building autonomy for" data-type-color="green"></span>
            </span>
            <span className={`${styles.line} ${styles.typeLine2}`}>
              <span className={styles.typeTarget} data-type-text="aerospace, space, and defense." data-type-color="amber"></span>
              <span className={styles.typeCursor}></span>
            </span>
          </h1>
          <div className={styles.heroSocials}>
            <a href="mailto:herman@my.yorku.ca">EMAIL</a>
            <a href="https://linkedin.com/in/hermanisayenka">LINKEDIN</a>
            <a href="https://github.com/herman888">GITHUB</a>
            <a href="https://hermanisayenka.ca">INSTAGRAM</a>
            <a href="https://hermanisayenka.ca">X</a>
            <span className={styles.internshipBadge}>Looking for Winter 2028 Internships</span>
          </div>
        </div>

        <div className={styles.scrollCue}>
          SCROLL TO EXPLORE
          <div className={styles.chev}>▾</div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className={styles.aboutBand}>
        <div className={styles.aboutFloor}></div>
        <div className={styles.aboutVignette}></div>
        <div className={styles.aboutInner}>
          <div className={styles.aboutTag}>{"// About"}</div>
          <p className={styles.aboutLine}>
            <span className={styles.aboutPrompt}>{">> "}</span>
            <span
              className={styles.typeTarget}
              data-type-text="2nd Year Electrical Engineering Student at York University"
              data-type-color="amber"
            ></span>
          </p>
          <p className={styles.aboutLine}>
            <span className={styles.aboutPrompt}>{">> "}</span>
            <span
              className={styles.typeTarget}
              data-type-text="Recipient of a $120,000 Schulich Leader Scholarship"
              data-type-color="amber"
            ></span>
          </p>
          <p className={styles.aboutLine}>
            <span className={styles.aboutPrompt}>{">> "}</span>
            <span
              className={styles.typeTarget}
              data-type-text="Incoming Hardware Engineering Intern @ Dominion Dynamics"
              data-type-color="amber"
            ></span>
          </p>
          <p className={styles.aboutLine}>
            <span className={styles.aboutPrompt}>{">> "}</span>
            <span
              className={styles.typeTarget}
              data-type-text="Recently built"
              data-type-color="amber"
            ></span>
            <Link href="/projects/sharingan" className={styles.aboutLink} data-type-reveal="">
              Sharingan
            </Link>
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={`${styles.terminalLine} ${styles.reveal}`}>
          <span>FEED LOCKED — TARGET: PORTFOLIO.LOG</span>
          <span className={styles.cursor}></span>
        </div>

        {/* ========== PROJECTS ========== */}
        <section id="projects" className={styles.panel}>
          <div className={`${styles.sectionTag} ${styles.reveal}`}>
            <span className={styles.num}>01</span> ALL PROJECTS
          </div>

          <div className={`${styles.projectsHeaderRow} ${styles.reveal}`}>
            <h2>My Projects</h2>
          </div>

          <div className={`${styles.pgroup} ${styles.reveal}`}>
            <h3 className={styles.groupLabel}>Work</h3>
            <div className={styles.workGrid}>
              <div className={styles.workCard}>
                <div className={`${styles.workLogo} ${styles.dark}`}>
                  <img src="/dominion-dynamics-logo.jpg" alt="Dominion Dynamics" />
                </div>
                <div className={styles.workInfo}>
                  <h4>Dominion Dynamics</h4>
                  <div className={styles.workRole}>Incoming Hardware Engineering Intern</div>
                </div>
              </div>
              <div className={styles.workCard}>
                <div className={`${styles.workLogo} ${styles.dark}`}>
                  <img src="/human-computer-lab-logo.jpg" alt="Human Computer Lab" />
                </div>
                <div className={styles.workInfo}>
                  <h4>Human Computer Lab</h4>
                  <div className={styles.workRole}>Technical Staff Intern</div>
                </div>
              </div>
              <div className={styles.workCard}>
                <div className={`${styles.workLogo} ${styles.light}`}>
                  <img src="/sellstatic-logo.png" alt="Sellstatic" />
                </div>
                <div className={styles.workInfo}>
                  <h4>Sellstatic</h4>
                  <div className={styles.workRole}>Software Engineering Intern</div>
                </div>
              </div>
              <div className={styles.workCard}>
                <div className={`${styles.workLogo} ${styles.light}`}>
                  <img src="/utias-fsc-logo.jpg" alt="UTIAS Flight Systems and Control" />
                </div>
                <div className={styles.workInfo}>
                  <h4>UTIAS</h4>
                  <div className={styles.workRole}>UAV Research Intern</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.pgroup} ${styles.reveal}`}>
            <h3 className={styles.groupLabel}>Research</h3>
            <div className={styles.pgrid}>
              <div className={styles.pcard}>
                <div className={styles.media}>
                  <video src="/droneracing.mp4" muted loop playsInline preload="none" />
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
                  <video src="/drone-racing-2023-loop.mp4" muted loop playsInline preload="none" />
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
            </div>
          </div>

          <div className={`${styles.pgroup} ${styles.reveal}`}>
            <h3 className={styles.groupLabel}>Projects</h3>
            <div className={styles.pgrid}>
              <Link href="/projects/sharingan" className={styles.pcard}>
                <div className={styles.media}>
                  <img src="/sharingan-team.jpg" alt="Sharingan scout drone team" />
                </div>
                <div className={styles.caption}>
                  <span>Embedded Systems</span>
                  <span className={styles.yr}>2025</span>
                </div>
                <div className={styles.body}>
                  <h3>Sharingan</h3>
                  <p>A scout drone built to see through walls from its own vantage point — fusing an onboard camera, mmWave radar, and WiFi CSI sensing into a single live picture of what&apos;s on the other side.</p>
                  <div className={styles.tech}>
                    <span>Sensor Fusion</span><span>FPV / Betaflight</span><span>Raspberry Pi</span><span>3D Printing</span>
                  </div>
                </div>
              </Link>
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
                  <img src="/uofthacks-team.jpg" alt="RedLamp team at UofTHacks, holding the lamp prototype after placing 2nd" />
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
                  <video src="/car.mov" muted loop playsInline preload="none" />
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
                  <video src="/timer.mp4" muted loop playsInline preload="none" />
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
                  <video src="/clock.mp4" muted loop playsInline preload="none" />
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
