import HeroCanvas from "./components/HeroCanvas";
import Animations from "./components/Animations";
/* eslint-disable @next/next/no-html-link-for-pages */
import CustomCursor from "./components/CustomCursor";

const AnchorIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2C14 2 8 6 8 14C8 22 14 26 14 26C14 26 20 22 20 14C20 6 14 2 14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
    <line x1="14" y1="2" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="7" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TabIconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const TabIconAnalytics = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const TabIconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001.08 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z" />
  </svg>
);

function MockTabBar({ activeTab }: { activeTab: "home" | "analytics" | "settings" }) {
  return (
    <div className="mock-tab-bar">
      <div className={`mock-tab ${activeTab === "home" ? "active" : ""}`}>
        <span className="mock-tab-icon"><TabIconHome /></span>
        Home
      </div>
      <div className={`mock-tab ${activeTab === "analytics" ? "active" : ""}`}>
        <span className="mock-tab-icon"><TabIconAnalytics /></span>
        Analytics
      </div>
      <div className={`mock-tab ${activeTab === "settings" ? "active" : ""}`}>
        <span className="mock-tab-icon"><TabIconSettings /></span>
        Settings
      </div>
    </div>
  );
}

function MockTitlebar() {
  return (
    <div className="mock-titlebar">
      <span className="mock-dot red" />
      <span className="mock-dot yellow" />
      <span className="mock-dot gray" />
      <span className="mock-title">Anchor</span>
    </div>
  );
}

const chartData = [
  { day: "Mon", height: 62, pct: "75%" },
  { day: "Tue", height: 60, pct: "" },
  { day: "Wed", height: 35, pct: "80%" },
  { day: "Thu", height: 4, pct: "" },
  { day: "Fri", height: 78, pct: "80%" },
  { day: "Sat", height: 8, pct: "88%" },
  { day: "Sun", height: 6, pct: "" },
];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Animations />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <AnchorIcon />
            <span className="nav-brand-text">Anchor</span>
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#download">Download</a>
          </div>
          <a href="#download" className="btn btn-accent btn-sm">Download Free</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <HeroCanvas />
        <div className="hero-content">
          <div className="hero-badge">Focus app for macOS</div>
          <h1 className="hero-headline">
            Stay <em>anchored</em> to<br />what matters
          </h1>
          <p className="hero-sub">
            Anchor is a focus timer that sits on your screen while you work. Write down what you&apos;re doing, start a session, and get to it.
          </p>
          <div className="hero-buttons">
            <a href="/Anchor.dmg" download className="btn btn-dark">Download for macOS</a>
            <a href="#features" className="btn btn-outline">See Features</a>
          </div>
          <p className="hero-note">Free during beta &middot; macOS 13+</p>

          {/* Mock App — Home Tab */}
          <div className="mock-app">
            <MockTitlebar />
            <MockTabBar activeTab="home" />
            <div className="mock-body-home">
              <div className="mock-question">What are you working on?</div>
              <div className="mock-input-wrap">
                <span className="mock-input">e.g. Build the login flow</span>
                <div className="mock-input-actions">
                  <span className="mock-input-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </span>
                  <span className="mock-input-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="16" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>
                  </span>
                </div>
              </div>
              <div className="mock-cta">Drop Anchor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Features</div>
            <h2>Everything in Anchor,<br />nothing you don&apos;t need</h2>
          </div>
          <div className="features-grid">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                ),
                title: "Goal-First Sessions",
                desc: "Every session starts with a task. Type what you're working on, set a timer, and hit Drop Anchor.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                ),
                title: "Floating Widget",
                desc: "A small widget stays on your screen showing your task, timer, and focus status. It\u2019s there when you need it, out of the way when you don\u2019t.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                ),
                title: "Focus Ratio",
                desc: "Anchor tracks how much of your session you actually spent focused. You get a percentage at the end so you know where the time went.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                ),
                title: "Session Analytics",
                desc: "See your week at a glance. Bar charts, daily breakdowns, and your top distractions so you can spot patterns.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                ),
                title: "Streak Tracking",
                desc: "Anchor counts your consecutive focus days. Nothing complicated, just a number that keeps you showing up.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                ),
                title: "Minimal by Design",
                desc: "No dashboards, no integrations, no setup wizard. One window, one purpose. You open it, you focus, you close it.",
              },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Feature Rows */}
      <section className="screenshot-rows">
        <div className="container">
          {/* Row 1: Floating Widget */}
          <div className="screenshot-row">
            <div className="screenshot-text">
              <div className="section-badge">Floating Widget</div>
              <h2>Always on screen,<br />never in the way</h2>
              <p>The widget floats on top of your other windows. It shows what you&apos;re working on, how long you&apos;ve been going, and whether you&apos;re locked in. Two buttons: break or end. That&apos;s it.</p>
            </div>
            <div className="screenshot-frame">
              <div className="widget-demo">
                <div className="widget-status">
                  <span className="widget-status-dot" />
                  <span className="widget-status-label">Locked in</span>
                  <span className="widget-status-sep">&middot;</span>
                  <span>Xcode</span>
                </div>
                <div className="widget-task-name">Code Anchor</div>
                <div className="widget-progress-bar">
                  <div className="widget-progress-fill" />
                </div>
                <div className="widget-bottom">
                  <span className="widget-timer">0:15</span>
                  <div className="widget-actions">
                    <span className="widget-pill-btn">Break</span>
                    <span className="widget-pill-btn">End</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Analytics */}
          <div className="screenshot-row reverse">
            <div className="screenshot-text">
              <div className="section-badge">Analytics</div>
              <h2>See where your<br />time actually goes</h2>
              <p>Weekly charts show how long you focused each day and what your focus ratio looked like. Anchor also surfaces your top distraction, your best focus time, and your most productive day.</p>
            </div>
            <div className="screenshot-frame">
              <div className="analytics-mock">
                <MockTitlebar />
                <MockTabBar activeTab="analytics" />
                <div className="analytics-body">
                  <div className="analytics-header">
                    <div className="analytics-header-left">
                      <span className="analytics-big-stat">83%</span>
                      <span className="analytics-trend">↗ 3%</span>
                      <span className="analytics-streak">&#x1F525; 2</span>
                    </div>
                    <span className="analytics-balanced">&#x2696; Balanced</span>
                  </div>
                  <div className="analytics-subtitle">17 sessions, 5h 41m this week</div>

                  <div className="analytics-insights">
                    <div className="analytics-insight-card">
                      <div className="analytics-insight-label">&#x26A0; Top Distraction</div>
                      <div className="analytics-insight-value">Messages &mdash; 4m lost</div>
                    </div>
                    <div className="analytics-insight-card">
                      <div className="analytics-insight-label">&#x1F3AF; Peak Focus</div>
                      <div className="analytics-insight-value">You focus best 9 AM</div>
                    </div>
                    <div className="analytics-insight-card">
                      <div className="analytics-insight-label">&#x1F4C5; Best Day</div>
                      <div className="analytics-insight-value">Sat &mdash; 2m</div>
                    </div>
                  </div>

                  <div className="analytics-chart-area">
                    <div className="analytics-y-axis">
                      <span className="analytics-y-label">200m</span>
                      <span className="analytics-y-label">150m</span>
                      <span className="analytics-y-label">100m</span>
                      <span className="analytics-y-label">50m</span>
                      <span className="analytics-y-label">0m</span>
                    </div>
                    <div className="analytics-chart-main">
                      <div className="analytics-avg-line" />
                      <div className="analytics-bar-group">
                        {chartData.map((d, i) => (
                          <div key={i} className="analytics-bar-col">
                            {d.pct && <span className="analytics-bar-pct">{d.pct}</span>}
                            <div className="analytics-bar" style={{ height: `${d.height}%` }} />
                          </div>
                        ))}
                      </div>
                      <div className="analytics-day-labels">
                        {chartData.map((d, i) => (
                          <span key={i} className="analytics-day-label">{d.day}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">How it Works</div>
            <h2>Three steps. That&apos;s it.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Drop your anchor</h3>
              <p>Type what you&apos;re working on and hit the button. The widget pops up on your screen.</p>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">2</div>
              <h3>Do your thing</h3>
              <p>Work like normal. The widget tracks your session and focus in the background.</p>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">3</div>
              <h3>Check your stats</h3>
              <p>When you&apos;re done, see how you did. Over time, the analytics show your patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download */}
      <section className="download" id="download">
        <div className="container">
          <div className="download-content">
            <AnchorIcon size={48} />
            <span className="download-brand">Anchor</span>
            <h2>Try Anchor. It&apos;s free.</h2>
            <div className="download-buttons">
              <a href="/Anchor.dmg" download className="btn btn-dark btn-lg">Download for macOS</a>
              <a href="#" className="btn btn-outline btn-lg">Windows Coming Soon</a>
            </div>
            <p className="download-note">Requires macOS 13 Ventura or later &middot; Apple Silicon &amp; Intel supported</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <AnchorIcon size={24} />
                <span>Anchor</span>
              </div>
              <p>Focus &amp; session tracking for macOS.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it Works</a>
              <a href="#download">Download</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Anchor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
