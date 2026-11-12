"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./cinematic-theme.module.css";

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Lazy-play card videos only when visible, one at a time, fully
    // releasing the decoder for any video that isn't the active one.
    // (iOS Safari — especially in Private Browsing — can hang the whole
    // page if too many <video> elements are loaded/decoding at once, even
    // if most of them are paused; removing `src` + calling load() frees
    // the decoder instead of just pausing it.)
    const cardVideos = root.querySelectorAll<HTMLVideoElement>(`.${styles.pcard} video`);
    let activeVideo: HTMLVideoElement | null = null;
    const unloadVideo = (v: HTMLVideoElement) => {
      v.pause();
      if (v.getAttribute("src")) {
        v.removeAttribute("src");
        v.load();
      }
      if (activeVideo === v) activeVideo = null;
    };
    const videoIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (activeVideo && activeVideo !== v) unloadVideo(activeVideo);
            const src = v.dataset.src;
            if (src && v.getAttribute("src") !== src) {
              v.setAttribute("src", src);
              v.load();
            }
            v.play().catch(() => {});
            activeVideo = v;
          } else {
            unloadVideo(v);
          }
        });
      },
      { threshold: 0.3 }
    );
    cardVideos.forEach((v) => videoIO.observe(v));

    return () => {
      videoIO.disconnect();
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
      </header>

      {/* ========== INTRO ========== */}
      <section className={styles.heroStatic}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroPrompt}>{"> "}</span>
            Building autonomy for aerospace, space, and defense.
          </h1>

          <div className={styles.aboutLines}>
            <p className={styles.aboutLine}>
              <span className={styles.aboutPrompt}>{">> "}</span>
              2nd Year Electrical Engineering Student at York University
            </p>
            <p className={styles.aboutLine}>
              <span className={styles.aboutPrompt}>{">> "}</span>
              Recipient of a $120,000 Schulich Leader Scholarship
            </p>
            <p className={styles.aboutLine}>
              <span className={styles.aboutPrompt}>{">> "}</span>
              Incoming Hardware Engineering Intern @ Dominion Dynamics
            </p>
            <p className={styles.aboutLine}>
              <span className={styles.aboutPrompt}>{">> "}</span>
              Recently built{" "}
              <Link href="/projects/sharingan" className={styles.aboutLink}>
                Sharingan
              </Link>
            </p>
          </div>

          <div className={styles.heroSocials}>
            <a href="mailto:herman@my.yorku.ca">EMAIL</a>
            <a href="https://linkedin.com/in/hermanisayenka">LINKEDIN</a>
            <a href="https://github.com/herman888">GITHUB</a>
            <a href="https://hermanisayenka.ca">INSTAGRAM</a>
            <a href="https://hermanisayenka.ca">X</a>
            <span className={styles.internshipBadge}>Looking for Winter 2028 Internships</span>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* ========== PROJECTS ========== */}
        <section id="projects" className={styles.panel}>
          <div className={styles.sectionTag}>
            <span className={styles.num}>01</span> ALL PROJECTS
          </div>

          <div className={styles.projectsHeaderRow}>
            <h2>My Projects</h2>
          </div>

          <div className={styles.pgroup}>
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
              <Link href="/projects/integrating-uav-controls" className={styles.pcard}>
                <div className={styles.media}>
                  <video data-src="/droneracing.mp4" poster="/droneracing.jpg" muted loop playsInline preload="none" />
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
              </Link>
              <Link href="/projects/optimizing-uav-navigation" className={styles.pcard}>
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
              </Link>
              <Link href="/projects/uav-navigation-model-training" className={styles.pcard}>
                <div className={styles.media}>
                  <video data-src="/drone-racing-2023-loop.mp4" poster="/uav-gate-yolo-detection.jpg" muted loop playsInline preload="none" />
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
              </Link>
              <Link href="/projects/fixed-wing-uav-airframe" className={styles.pcard}>
                <div className={styles.media}>
                  <img src="/fixed-wing-cad.svg" alt="Fixed-wing UAV airframe — general-arrangement drawing" />
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
              </Link>
              <a href="https://github.com/herman888/citypathai" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
              <a href="https://devpost.com/software/red-lamp" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
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
              <Link href="/projects/arduino#car-line-follower" className={styles.pcard}>
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
              </Link>
              <Link href="/projects/arduino#car-obstacle" className={styles.pcard}>
                <div className={styles.media}>
                  <video data-src="/car.mov" poster="/car-obstacle-poster.jpg" muted loop playsInline preload="none" />
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
              </Link>
              <Link href="/projects/arduino#water-pump" className={styles.pcard}>
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
              </Link>
              <Link href="/projects/arduino#digital-timer" className={styles.pcard}>
                <div className={styles.media}>
                  <video data-src="/timer.mp4" poster="/digital-timer-poster.jpg" muted loop playsInline preload="none" />
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
              </Link>
              <Link href="/projects/arduino#digital-clock" className={styles.pcard}>
                <div className={styles.media}>
                  <video data-src="/clock.mp4" poster="/digital-clock-poster.jpg" muted loop playsInline preload="none" />
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
              </Link>
              <a href="https://github.com/herman888/heated-driveway" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
              <a href="https://devpost.com/software/growthsync" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
              <a href="https://devpost.com/software/finding-n-e-m-o" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
              <a href="https://github.com/herman888/route-optimizer" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
              <a href="https://devpost.com/software/mealtogo" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
              <a href="https://github.com/herman888/kinkitchen" target="_blank" rel="noopener noreferrer" className={styles.pcard}>
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
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        Herman Isayenka
      </footer>
    </div>
  );
}
