'use client'

export default function AwardsSection() {
  const awards = [
    { title: 'Best Trading Platform', year: '2024', organization: 'Finance Awards' },
    { title: 'Top Social Trading', year: '2024', organization: 'Trading Excellence' },
    { title: 'Best Crypto Platform', year: '2023', organization: 'Crypto Awards' },
    { title: 'Innovation Award', year: '2023', organization: 'FinTech Innovation' },
    { title: 'Best Mobile App', year: '2024', organization: 'App Awards' },
    { title: 'Customer Choice', year: '2024', organization: 'Users Choice' },
    { title: 'Best Trading Platform', year: '2024', organization: 'Finance Awards' },
    { title: 'Top Social Trading', year: '2024', organization: 'Trading Excellence' },
  ]

  return (
    <div className="awards-block">
      <div className="awards-carousel">
        <div className="awards-list">
          {awards.map((award, index) => (
            <div key={index} className="awards-item">
              <span className="awards-item__title">{award.title}</span>
              <span>{award.organization} {award.year}</span>
            </div>
          ))}
        </div>
        <div className="awards-list" aria-hidden="true">
          {awards.map((award, index) => (
            <div key={`duplicate-${index}`} className="awards-item">
              <span className="awards-item__title">{award.title}</span>
              <span>{award.organization} {award.year}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .awards-block {
          padding: 0;
        }

        .awards-carousel {
          display: flex;
          padding: 12px 0;
          background-color: var(--etoro-dark);
          overflow: hidden;
        }

        .awards-carousel:hover .awards-list {
          animation-play-state: paused;
        }

        .awards-list {
          display: flex;
          gap: 40px;
          padding: 0 20px;
          animation: ticker 55s infinite linear;
          flex-shrink: 0;
        }

        .awards-list:hover {
          animation-play-state: paused;
        }

        .awards-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5px 38px 6px;
          text-decoration: none;
          white-space: nowrap;
        }

        .awards-item::before,
        .awards-item::after {
          content: '';
          position: absolute;
          display: block;
          top: 0;
          width: 27px;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='27' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 0 L20 15 L13.5 30 L7 15 Z' fill='%2313c636'/%3E%3C/svg%3E") no-repeat left center/contain;
        }

        .awards-item::before {
          left: 0;
        }

        .awards-item::after {
          right: 0;
          transform: rotateY(180deg);
        }

        .awards-item span {
          display: block;
          width: max-content;
          font-size: 14px;
          line-height: 20px;
          color: #fff;
        }

        .awards-item__title {
          font-weight: var(--etoro-font-bold);
        }

        @media only screen and (min-width: 769px) {
          .awards-carousel {
            padding: 14px 0;
          }

          .awards-item span {
            font-size: 16px;
            line-height: 22px;
          }
        }

        @media screen and (min-width: 1025px) {
          .awards-item {
            padding-right: 41px;
            padding-left: 41px;
            transition: all 0.3s ease-in-out;
          }

          .awards-item::before,
          .awards-item::after {
            width: 40px;
          }

          .awards-item:hover {
            transform: scale(1.12);
          }
        }

        @media only screen and (min-width: 1281px) {
          .awards-list {
            padding-right: 26px;
            padding-left: 26px;
            gap: 52px;
          }
        }

        @media only screen and (min-width: 1920px) {
          .awards-carousel {
            padding: 16px 0;
          }

          .awards-list {
            padding-right: 30px;
            padding-left: 30px;
            gap: 60px;
          }

          .awards-item span {
            font-size: 18px;
            line-height: 26px;
          }
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
