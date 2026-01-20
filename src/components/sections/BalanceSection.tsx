'use client'

import { useState } from 'react'

export default function BalanceSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const balanceFeatures = [
    {
      title: 'Multi-Currency Account',
      description: 'Hold and manage multiple currencies in one account',
      features: ['USD, EUR, GBP and more', 'Instant currency conversion', 'No hidden fees'],
    },
    {
      title: 'Earn Interest',
      description: 'Get up to 3.55% annual interest on your balance',
      features: ['Daily compounding', 'No lock-in period', 'Flexible withdrawals'],
    },
    {
      title: 'Global Transfers',
      description: 'Send money worldwide quickly and securely',
      features: ['Low transfer fees', 'Fast processing', 'Bank-level security'],
    },
  ]

  return (
    <div id="balance" className="wrapper grey-bg">
      <div className="e-container">
        <div className="balance-content">
          <div className="balance-header center">
            <h2>Flexible balance management</h2>
            <p>Your money, your way - with multi-currency accounts and competitive interest rates</p>
          </div>

          <div className="balance-slider-wrapper">
            <div className="balance-slider">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {balanceFeatures.map((feature, index) => (
                  <div key={index} className="balance-slide">
                    <div className="balance-card">
                      <div className="balance-icon">
                        <div className="icon-placeholder"></div>
                      </div>
                      <h3>{feature.title}</h3>
                      <p className="balance-description">{feature.description}</p>
                      <ul className="feature-list">
                        {feature.features.map((item, idx) => (
                          <li key={idx}>
                            <span className="checkmark">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="swiper-pagination">
              {balanceFeatures.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-bullet ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="balance-cta center">
            <a href="#" className="e-cta">
              Open Account
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .balance-content {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .balance-header p {
          margin-top: 16px;
        }

        .balance-slider-wrapper {
          position: relative;
        }

        .balance-slider {
          overflow: hidden;
        }

        .slider-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }

        .balance-slide {
          min-width: 100%;
          padding: 0 16px;
        }

        .balance-card {
          background: white;
          border-radius: 16px;
          padding: 40px 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
        }

        .balance-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #13c636 0%, #00b066 100%);
        }

        .balance-card h3 {
          font-size: 28px;
          line-height: 32px;
          color: var(--etoro-dark);
        }

        .balance-description {
          color: var(--etoro-text);
          max-width: 400px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 400px;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--etoro-text);
          font-size: 16px;
          line-height: 24px;
        }

        .checkmark {
          color: var(--etoro-green);
          font-size: 20px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .swiper-pagination {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
        }

        .pagination-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .pagination-bullet:hover {
          background: #94a3b8;
        }

        .pagination-bullet.active {
          background: var(--etoro-green);
          width: 32px;
          border-radius: 6px;
        }

        @media only screen and (min-width: 661px) {
          .balance-slide {
            padding: 0 40px;
          }

          .balance-card {
            padding: 60px 48px;
          }

          .balance-icon {
            width: 100px;
            height: 100px;
          }
        }

        @media only screen and (min-width: 1024px) {
          .slider-track {
            justify-content: center;
          }

          .balance-slide {
            min-width: 50%;
            max-width: 600px;
          }
        }
      `}</style>
    </div>
  )
}
