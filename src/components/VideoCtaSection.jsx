"use client";

export default function VideoCtaSection() {
  return (
    <section className="video-cta-section">
      {/* Background video */}
      <video
        className="video-cta-bg"
        src="/Orang_bermain_game_seru_202607111334.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className="video-cta-overlay" />

      {/* Center content */}
      <div className="video-cta-content">
        <span className="video-cta-eyebrow">
          PLAY YOUR WAY
        </span>
        <h2 className="video-cta-heading">
          Buy <span className="video-cta-or">or</span> Rent
        </h2>
        <a
          href="https://wa.me/YOUR_PHONE_NUMBER"
          target="_blank"
          rel="noopener noreferrer"
          className="video-cta-link"
        >
          Contact us
        </a>
      </div>

      <style jsx>{`
        .video-cta-section {
          position: relative;
          width: 100%;
          height: 540px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background-color: #08080c;
        }

        /* ---- video ---- */
        .video-cta-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          opacity: 0.45;
        }

        /* ---- dark overlay ---- */
        .video-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8, 8, 12, 0.8) 0%,
            rgba(8, 8, 12, 0.9) 50%,
            rgba(8, 8, 12, 0.85) 100%
          );
          z-index: 1;
        }

        /* ---- content ---- */
        .video-cta-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 1.5rem;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(15px);
        }

        .video-cta-eyebrow {
          font-family: "Inter", sans-serif;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #ee0003; /* ROG Red */
          margin-bottom: 0.75rem;
          text-shadow: 0 0 10px rgba(238, 0, 3, 0.4);
          transform: translateX(-20px);
        }

        .video-cta-heading {
          font-family: var(--font-orbitron), sans-serif;
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          font-weight: 900;
          line-height: 1;
          color: #ffffff;
          margin-bottom: 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-cta-or {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.3em;
          font-weight: 300;
          font-style: italic;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 1rem;
          text-transform: lowercase;
          display: inline-block;
          transform: translateY(-0.1em);
        }

        /* ---- contact link ---- */
        .video-cta-link {
          margin-top: 1.75rem;
          display: inline-block;
          font-family: var(--font-alex-brush), cursive;
          font-size: clamp(2.2rem, 6vw, 3.2rem);
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.02em;
          transform: translateX(-15px);

          /* Shimmer Effect */
          background: linear-gradient(
            to right,
            #8e8e93 20%,
            #ffffff 45%,
            #ffffff 55%,
            #8e8e93 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 5s linear infinite;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.15));
        }

        .video-cta-link:hover {
          transform: translateX(-15px) scale(1.05);
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.45));
        }

        @keyframes textShimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </section>
  );
}


