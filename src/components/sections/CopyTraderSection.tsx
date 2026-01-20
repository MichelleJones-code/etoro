'use client'

import Image from 'next/image'

export default function CopyTraderSection() {
  return (
    <div className="wrapper grey-bg">
      <div className="e-container">
        <div className="e-row">
          <div className="col col_text">
            <div className="text-box">
              <div className="in-text-box e_col__text">
                <div className="copytrader-text">
                  <h2>
                    Copy the best traders <strong className="text-green-600">automatically</strong>
                  </h2>
                  <p>
                    Discover successful traders and automatically replicate their strategies. When they trade, you trade - it's that simple.
                  </p>
                </div>
                <div className="cta-group">
                  <a href="#" className="e-cta">
                    Start Copying
                  </a>
                  <a href="#" className="e-cta-alt">
                    Learn More
                  </a>
                </div>
                <div className="inner-disclaimer">
                  Past performance is not an indication of future results. Copy Trading does not amount to investment advice.
                </div>
              </div>
            </div>
          </div>
          <div className="col col_media">
            <div className="image-box">
              <div className="copytrader-visual">
                <div className="trader-card">
                  <div className="trader-avatar"></div>
                  <div className="trader-info">
                    <div className="trader-name">JohnTrader</div>
                    <div className="trader-stats">
                      <span className="stat">
                        <span className="stat-label">Gain</span>
                        <span className="stat-value text-green-600">+24.5%</span>
                      </span>
                      <span className="stat">
                        <span className="stat-label">Risk Score</span>
                        <span className="stat-value">5</span>
                      </span>
                    </div>
                  </div>
                  <button className="copy-btn">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .copytrader-text {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .copytrader-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 0;
        }

        .trader-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 400px;
          width: 100%;
        }

        .trader-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #13c636 0%, #00b066 100%);
          margin: 0 auto;
        }

        .trader-info {
          text-align: center;
        }

        .trader-name {
          font-size: 24px;
          font-weight: var(--etoro-font-medium);
          color: var(--etoro-dark);
          margin-bottom: 16px;
        }

        .trader-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--etoro-text);
        }

        .stat-value {
          font-size: 20px;
          font-weight: var(--etoro-font-medium);
          color: var(--etoro-dark);
        }

        .copy-btn {
          background: var(--etoro-green);
          color: white;
          border: none;
          border-radius: 100px;
          padding: 12px 32px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-btn:hover {
          background: var(--etoro-green-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(19, 198, 54, 0.3);
        }

        @media only screen and (max-width: 660px) {
          .e-row {
            display: flex;
            flex-direction: column;
          }
        }

        @media only screen and (min-width: 661px) {
          .e-row {
            display: flex;
            flex-wrap: wrap;
          }

          .col {
            display: flex;
            align-items: center;
            flex: 1 0 0;
            width: 100%;
            max-width: 50%;
          }
        }
      `}</style>
    </div>
  )
}
