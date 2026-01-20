'use client'

export default function HeroSection() {
  return (
    <section className="hp-cover wrapper">
      <div className="e-container">
        <div className="e-row">
          {/* Left Content */}
          <div className="col col_text">
            <div className="text-box">
              <div className="in-text-box e_col__text">
                <div className="cover-text">
                  <h1>
                    Yep, it&apos;s <strong>all in one app</strong>
                  </h1>
                  <p className="cv_d">
                    Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app
                  </p>
                </div>

                <div className="cta-group">
                  <a href="#" className="e-cta">
                    Join eToro
                  </a>
                </div>

                <div className="inner-disclaimer">
                  **<a href="#" className="underline">Terms and Conditions</a> apply.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="col col_media">
            <div className="image-box">
              <img
                src="/images/hero-image.webp"
                alt="eToro App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hp-cover {
          background: linear-gradient(180deg, #f7f7f7 0%, #ffffff 100%);
        }

        .cover-text {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cover-text h1 {
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .cover-text h1 strong {
          display: block;
          color: var(--etoro-green);
        }

        .cv_d {
          font-size: var(--etoro-p-size);
          line-height: var(--etoro-p-height);
        }

        @media only screen and (max-width: 660px) {
          .e-row {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }

          .cover-text {
            text-align: center;
          }

          .cta-group {
            align-items: center;
          }

          .inner-disclaimer {
            text-align: center;
          }
        }

        @media only screen and (min-width: 661px) {
          .e-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }

          .col {
            display: flex;
            align-items: center;
            flex: 1 0 0;
            width: 100%;
            max-width: 50%;
          }

          .col_media {
            justify-content: center;
          }
        }

        @media only screen and (min-width: 1024px) {
          .col_text {
            max-width: 45%;
          }

          .col_media {
            max-width: 55%;
          }
        }
      `}</style>
    </section>
  )
}
