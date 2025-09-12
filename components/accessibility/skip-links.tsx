"use client"

export function SkipLinks() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 99999, pointerEvents: "none" }}>
      <a
        href="#main-content"
        className="skip-link-override"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 99999,
          backgroundColor: "#000000 !important",
          color: "#ffffff !important",
          padding: "8px 16px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          border: "2px solid #ffffff",
          textDecoration: "none",
          pointerEvents: "auto",
          transform: "translateY(-100px)",
          transition: "transform 0.2s ease-in-out",
        }}
        onFocus={(e) => {
          e.target.style.transform = "translateY(0)"
        }}
        onBlur={(e) => {
          e.target.style.transform = "translateY(-100px)"
        }}
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="skip-link-override"
        style={{
          position: "fixed",
          top: "16px",
          left: "176px",
          zIndex: 99999,
          backgroundColor: "#000000 !important",
          color: "#ffffff !important",
          padding: "8px 16px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          border: "2px solid #ffffff",
          textDecoration: "none",
          pointerEvents: "auto",
          transform: "translateY(-100px)",
          transition: "transform 0.2s ease-in-out",
        }}
        onFocus={(e) => {
          e.target.style.transform = "translateY(0)"
        }}
        onBlur={(e) => {
          e.target.style.transform = "translateY(-100px)"
        }}
      >
        Skip to navigation
      </a>
    </div>
  )
}
