import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// NPS brand colors
const colors = {
  primary: "#1E4D2B", // NPS Green
  secondary: "#F4A300", // Golden Hour
  accent: "#5B3A29", // Earth Brown
  danger: "#DC2626",
  closure: "#F97316",
  caution: "#FACC15",
  info: "#3B82F6",
  white: "#FFFFFF",
  gray: {
    100: "#F3F4F6",
    200: "#E5E7EB",
    600: "#4B5563",
    800: "#1F2937",
    900: "#111827",
  },
};

// Shared component styles
const cardStyle: React.CSSProperties = {
  background: colors.white,
  borderRadius: 12,
  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
  padding: 24,
};

// Scene 1: Current park page "Before"
const BeforeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[100],
        opacity,
        padding: 48,
      }}
    >
      {/* Browser chrome */}
      <div style={{
        background: colors.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        height: "100%",
      }}>
        {/* URL bar */}
        <div style={{
          background: colors.gray[200],
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#22C55E" }} />
          </div>
          <div style={{
            flex: 1,
            background: colors.white,
            borderRadius: 6,
            padding: "8px 16px",
            fontSize: 14,
            color: colors.gray[600],
          }}>
            bestusnationalparks.com/parks/yellowstone
          </div>
        </div>

        {/* Hero image placeholder */}
        <div style={{
          height: 300,
          background: `linear-gradient(to bottom, ${colors.primary}44, ${colors.primary}88)`,
          display: "flex",
          alignItems: "flex-end",
          padding: 32,
        }}>
          <div>
            <div style={{ color: colors.white, fontSize: 14, marginBottom: 8, opacity: 0.8 }}>
              Home / Parks / Wyoming
            </div>
            <h1 style={{ color: colors.white, fontSize: 48, fontWeight: 700, margin: 0 }}>
              Yellowstone
            </h1>
            <div style={{
              display: "inline-block",
              background: colors.secondary,
              color: colors.gray[900],
              padding: "4px 12px",
              borderRadius: 16,
              fontSize: 14,
              marginTop: 12,
            }}>
              Moderate
            </div>
          </div>
        </div>

        {/* Content placeholder */}
        <div style={{ display: "flex", padding: 32, gap: 32 }}>
          <div style={{ flex: 2 }}>
            <h2 style={{ fontSize: 24, color: colors.gray[900], margin: 0, marginBottom: 16 }}>Overview</h2>
            <div style={{ height: 80, background: colors.gray[200], borderRadius: 8 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...cardStyle, marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, margin: 0 }}>Quick Facts</h3>
            </div>
          </div>
        </div>
      </div>

      {/* "Before" label */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: colors.gray[800],
        color: colors.white,
        padding: "12px 32px",
        borderRadius: 24,
        fontSize: 24,
        fontWeight: 600,
      }}>
        Current Park Page
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Alert banner appears
const AlertBannerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideDown = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const alertY = interpolate(slideDown, [0, 1], [-80, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gray[100], padding: 48 }}>
      <div style={{
        background: colors.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        height: "100%",
      }}>
        {/* Alert Banner */}
        <div style={{
          background: colors.danger,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          transform: `translateY(${alertY}px)`,
        }}>
          <span style={{ fontSize: 24 }}>!</span>
          <div style={{ flex: 1 }}>
            <span style={{ color: colors.white, fontWeight: 700 }}>DANGER: </span>
            <span style={{ color: colors.white }}>
              Hydrothermal areas are dangerous. Stay on boardwalks.
            </span>
          </div>
          <a style={{ color: colors.white, textDecoration: "underline" }}>Details</a>
        </div>

        {/* Second alert */}
        <div style={{
          background: colors.closure,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          transform: `translateY(${alertY}px)`,
        }}>
          <span style={{ fontSize: 24 }}>!</span>
          <div style={{ flex: 1 }}>
            <span style={{ color: colors.white, fontWeight: 700 }}>CLOSURE: </span>
            <span style={{ color: colors.white }}>
              Grand Loop Road closed for winter maintenance.
            </span>
          </div>
          <a style={{ color: colors.white, textDecoration: "underline" }}>Details</a>
        </div>

        {/* Hero */}
        <div style={{
          height: 220,
          background: `linear-gradient(to bottom, ${colors.primary}44, ${colors.primary}88)`,
          display: "flex",
          alignItems: "flex-end",
          padding: 32,
        }}>
          <h1 style={{ color: colors.white, fontSize: 48, fontWeight: 700, margin: 0 }}>
            Yellowstone
          </h1>
        </div>

        {/* Content */}
        <div style={{ padding: 32 }}>
          <div style={{ height: 100, background: colors.gray[200], borderRadius: 8 }} />
        </div>
      </div>

      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 80,
        right: 80,
        background: colors.danger,
        color: colors.white,
        padding: "12px 32px",
        borderRadius: 24,
        fontSize: 20,
        fontWeight: 600,
      }}>
        Real-time NPS Alerts
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Campgrounds section
const CampgroundsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const campgrounds = [
    { name: "Madison Campground", sites: 278, fee: "$30/night", amenities: ["Restrooms", "Water"] },
    { name: "Bridge Bay Campground", sites: 432, fee: "$32/night", amenities: ["Restrooms", "Marina"] },
    { name: "Canyon Campground", sites: 273, fee: "$35/night", amenities: ["Showers", "Laundry"] },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gray[100], padding: 48 }}>
      <div style={{
        background: colors.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Mini header */}
        <div style={{
          height: 80,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
        }}>
          <h1 style={{ color: colors.white, fontSize: 24, margin: 0 }}>
            Yellowstone National Park
          </h1>
        </div>

        {/* Campgrounds section */}
        <div style={{ padding: 32, flex: 1 }}>
          <h2 style={{ fontSize: 28, color: colors.gray[900], margin: 0, marginBottom: 24 }}>
            Campgrounds
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {campgrounds.map((camp, i) => {
              const delay = i * 5;
              const cardSpring = spring({
                frame: frame - delay,
                fps,
                config: { damping: 12, stiffness: 80 },
              });
              const scale = interpolate(cardSpring, [0, 1], [0.8, 1]);
              const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

              return (
                <div
                  key={camp.name}
                  style={{
                    ...cardStyle,
                    transform: `scale(${scale})`,
                    opacity,
                    border: `2px solid ${colors.gray[200]}`,
                  }}
                >
                  <h3 style={{ fontSize: 18, margin: 0, marginBottom: 8, color: colors.gray[900] }}>
                    {camp.name}
                  </h3>
                  <p style={{ fontSize: 14, color: colors.gray[600], margin: 0, marginBottom: 12 }}>
                    {camp.sites} sites
                  </p>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    {camp.amenities.map(a => (
                      <span
                        key={a}
                        style={{
                          background: `${colors.primary}15`,
                          color: colors.primary,
                          padding: "4px 10px",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, color: colors.gray[900] }}>{camp.fee}</span>
                    <button style={{
                      background: colors.primary,
                      color: colors.white,
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 500,
                    }}>
                      Reserve
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 80,
        right: 80,
        background: colors.primary,
        color: colors.white,
        padding: "12px 32px",
        borderRadius: 24,
        fontSize: 20,
        fontWeight: 600,
      }}>
        Live Campground Data from NPS
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Events widget
const EventsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const events = [
    { title: "Ranger Talk: Wildlife Safety", date: "Jan 28", type: "Ranger Program" },
    { title: "Junior Ranger: Geysers", date: "Jan 29", type: "Family" },
    { title: "Snowshoe Hike", date: "Jan 30", type: "Guided Hike" },
    { title: "Night Sky Photography", date: "Feb 1", type: "Workshop" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gray[100], padding: 48 }}>
      <div style={{
        background: colors.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        height: "100%",
        display: "flex",
      }}>
        {/* Main content area */}
        <div style={{ flex: 2, padding: 32 }}>
          <div style={{ height: 100, background: colors.gray[200], borderRadius: 8, marginBottom: 24 }} />
          <div style={{ height: 100, background: colors.gray[200], borderRadius: 8 }} />
        </div>

        {/* Sidebar with events widget */}
        <div style={{ flex: 1, background: colors.gray[100], padding: 24 }}>
          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, margin: 0 }}>Quick Facts</h3>
          </div>

          {/* Events Widget */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: 18, margin: 0, marginBottom: 16, color: colors.gray[900] }}>
              Upcoming Events
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {events.map((event, i) => {
                const delay = i * 4;
                const slideIn = spring({
                  frame: frame - delay,
                  fps,
                  config: { damping: 15, stiffness: 100 },
                });
                const x = interpolate(slideIn, [0, 1], [50, 0]);
                const opacity = interpolate(slideIn, [0, 1], [0, 1]);

                return (
                  <div
                    key={event.title}
                    style={{
                      borderBottom: i < events.length - 1 ? `1px solid ${colors.gray[200]}` : "none",
                      paddingBottom: 12,
                      transform: `translateX(${x}px)`,
                      opacity,
                    }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 500, margin: 0, marginBottom: 4, color: colors.gray[900] }}>
                      {event.title}
                    </p>
                    <p style={{ fontSize: 12, color: colors.gray[600], margin: 0, marginBottom: 6 }}>
                      {event.date}
                    </p>
                    <span style={{
                      background: `${colors.secondary}22`,
                      color: colors.accent,
                      padding: "2px 8px",
                      borderRadius: 8,
                      fontSize: 11,
                    }}>
                      {event.type}
                    </span>
                  </div>
                );
              })}
            </div>

            <a style={{
              display: "block",
              color: colors.primary,
              fontSize: 14,
              marginTop: 16,
              textDecoration: "none",
            }}>
              View All Events
            </a>
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 80,
        right: 80,
        background: colors.secondary,
        color: colors.gray[900],
        padding: "12px 32px",
        borderRadius: 24,
        fontSize: 20,
        fontWeight: 600,
      }}>
        NPS Events & Programs
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Full page "After" view
const FullPageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gray[100], padding: 48, opacity }}>
      <div style={{
        background: colors.white,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Alert banners */}
        <div style={{ background: colors.danger, padding: "8px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: colors.white, fontWeight: 700, fontSize: 12 }}>DANGER:</span>
          <span style={{ color: colors.white, fontSize: 12 }}>Stay on boardwalks near thermal features</span>
        </div>
        <div style={{ background: colors.closure, padding: "8px 24px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: colors.white, fontWeight: 700, fontSize: 12 }}>CLOSURE:</span>
          <span style={{ color: colors.white, fontSize: 12 }}>North Entrance road closed</span>
        </div>

        {/* Compact hero */}
        <div style={{
          height: 120,
          background: `linear-gradient(to right, ${colors.primary}, ${colors.primary}cc)`,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
        }}>
          <h1 style={{ color: colors.white, fontSize: 32, margin: 0 }}>Yellowstone National Park</h1>
        </div>

        {/* Layout */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Main content */}
          <div style={{ flex: 2, padding: 24, overflowY: "auto" }}>
            <h2 style={{ fontSize: 20, margin: 0, marginBottom: 12 }}>Overview</h2>
            <div style={{ height: 40, background: colors.gray[200], borderRadius: 6, marginBottom: 24 }} />

            <h2 style={{ fontSize: 20, margin: 0, marginBottom: 12 }}>Campgrounds</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}>
              {["Madison", "Bridge Bay"].map(name => (
                <div key={name} style={{ ...cardStyle, padding: 16, border: `1px solid ${colors.gray[200]}` }}>
                  <h4 style={{ margin: 0, fontSize: 14 }}>{name}</h4>
                  <p style={{ margin: "4px 0", fontSize: 12, color: colors.gray[600] }}>250+ sites</p>
                  <button style={{
                    background: colors.primary,
                    color: colors.white,
                    border: "none",
                    padding: "4px 12px",
                    borderRadius: 4,
                    fontSize: 11,
                    marginTop: 8,
                  }}>Reserve</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ flex: 1, background: colors.gray[100], padding: 16 }}>
            <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
              <h4 style={{ margin: 0, fontSize: 14 }}>Quick Facts</h4>
            </div>
            <div style={{ ...cardStyle, padding: 16 }}>
              <h4 style={{ margin: 0, fontSize: 14, marginBottom: 8 }}>Upcoming Events</h4>
              {["Ranger Talk", "Junior Ranger", "Night Hike"].map(e => (
                <p key={e} style={{ margin: "6px 0", fontSize: 12, color: colors.gray[600] }}>{e}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: colors.primary,
        color: colors.white,
        padding: "12px 32px",
        borderRadius: 24,
        fontSize: 24,
        fontWeight: 600,
      }}>
        Enhanced Park Page with Live NPS Data
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Mobile view
const MobileScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.gray[900],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Phone frame */}
      <div style={{
        width: 375,
        height: 812,
        background: colors.gray[800],
        borderRadius: 40,
        padding: 12,
        transform: `scale(${interpolate(phoneScale, [0, 1], [0.8, 1])})`,
        opacity: interpolate(phoneScale, [0, 1], [0, 1]),
      }}>
        {/* Screen */}
        <div style={{
          width: "100%",
          height: "100%",
          background: colors.white,
          borderRadius: 32,
          overflow: "hidden",
        }}>
          {/* Alert */}
          <div style={{ background: colors.danger, padding: "12px 16px" }}>
            <span style={{ color: colors.white, fontSize: 12, fontWeight: 600 }}>DANGER: </span>
            <span style={{ color: colors.white, fontSize: 12 }}>Stay on trails</span>
          </div>

          {/* Hero */}
          <div style={{
            height: 180,
            background: `linear-gradient(to bottom, ${colors.primary}66, ${colors.primary})`,
            padding: 16,
            display: "flex",
            alignItems: "flex-end",
          }}>
            <h1 style={{ color: colors.white, fontSize: 28, margin: 0 }}>Yellowstone</h1>
          </div>

          {/* Content */}
          <div style={{ padding: 16 }}>
            <h2 style={{ fontSize: 18, margin: "0 0 12px 0" }}>Campgrounds</h2>
            <div style={{
              ...cardStyle,
              padding: 12,
              border: `1px solid ${colors.gray[200]}`,
              marginBottom: 12,
            }}>
              <h3 style={{ fontSize: 14, margin: 0 }}>Madison Campground</h3>
              <p style={{ fontSize: 12, color: colors.gray[600], margin: "4px 0" }}>278 sites - $30/night</p>
              <button style={{
                background: colors.primary,
                color: colors.white,
                border: "none",
                padding: "6px 12px",
                borderRadius: 4,
                fontSize: 12,
                marginTop: 4,
              }}>Reserve</button>
            </div>

            <h2 style={{ fontSize: 18, margin: "16px 0 12px 0" }}>Upcoming Events</h2>
            <div style={{ ...cardStyle, padding: 12, border: `1px solid ${colors.gray[200]}` }}>
              <p style={{ fontSize: 13, margin: 0 }}>Ranger Talk: Wildlife</p>
              <p style={{ fontSize: 11, color: colors.gray[600], margin: "4px 0" }}>Jan 28</p>
              <p style={{ fontSize: 13, margin: "8px 0 0 0" }}>Junior Ranger Program</p>
              <p style={{ fontSize: 11, color: colors.gray[600], margin: "4px 0" }}>Jan 29</p>
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        background: colors.white,
        color: colors.gray[900],
        padding: "12px 32px",
        borderRadius: 24,
        fontSize: 24,
        fontWeight: 600,
      }}>
        Fully Responsive Design
      </div>
    </AbsoluteFill>
  );
};

// Main composition
export const NPSIntegrationMockup: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Scene 1: Before (0-5s = 0-150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <BeforeScene />
      </Sequence>

      {/* Scene 2: Alert Banner (5-10s = 150-300 frames) */}
      <Sequence from={150} durationInFrames={150}>
        <AlertBannerScene />
      </Sequence>

      {/* Scene 3: Campgrounds (10-17s = 300-510 frames) */}
      <Sequence from={300} durationInFrames={210}>
        <CampgroundsScene />
      </Sequence>

      {/* Scene 4: Events (17-23s = 510-690 frames) */}
      <Sequence from={510} durationInFrames={180}>
        <EventsScene />
      </Sequence>

      {/* Scene 5: Full Page After (23-28s = 690-840 frames) */}
      <Sequence from={690} durationInFrames={150}>
        <FullPageScene />
      </Sequence>

      {/* Scene 6: Mobile (28-30s = 840-900 frames) */}
      <Sequence from={840} durationInFrames={60}>
        <MobileScene />
      </Sequence>
    </AbsoluteFill>
  );
};
