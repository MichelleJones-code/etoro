'use client'

export default function SponsorshipSection() {
  const teams = [
    { name: 'Mainz', logo: '/images/logos/mainz.svg' },
    { name: 'Alkmaar Zaanstreek', logo: '/images/logos/az.svg' },
    { name: 'Crystal Palace', logo: '/images/logos/crystalpalace.svg' },
    { name: 'Everton F.C.', logo: '/images/logos/everton.svg' },
    { name: 'Slavia', logo: '/images/logos/slavia.svg' },
    { name: 'West Ham', logo: '/images/logos/west-ham.svg' },
    { name: 'Union Berlin', logo: '/images/logos/union-berlin.svg' },
    { name: 'Bayer', logo: '/images/logos/bayer.svg' },
    { name: "Premiership Women's Rugby", logo: '/images/logos/pwr.svg' },
    { name: 'Premiership Rugby', logo: '/images/logos/prem.svg' },
    { name: 'FC Koln', logo: '/images/logos/koln.svg' },
    { name: 'Nottingham Forest', logo: '/images/logos/forestcrest.svg' },
  ]

  return (
    <div className="sponsorship">
      <h2 className="sponsorship__title">Sponsor of your favourite teams</h2>
      <div className="sponsorship__carousel">
        <div className="sponsorship__list">
          {teams.map((team, index) => (
            <div key={index} className="sponsorship__team">
              <img
                className="sponsorship__logo"
                src={team.logo}
                alt={team.name}
                title={team.name}
                width="55"
                height="75"
              />
            </div>
          ))}
        </div>
        <div className="sponsorship__list" aria-hidden="true">
          {teams.map((team, index) => (
            <div key={`duplicate-${index}`} className="sponsorship__team">
              <img
                className="sponsorship__logo"
                src={team.logo}
                alt={team.name}
                title={team.name}
                width="55"
                height="75"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sponsorship {
          background: #fff;
          padding: 60px 16px;
        }

        .sponsorship__title {
          text-align: center;
          font-size: 28px;
          line-height: 36px;
          margin-bottom: 40px;
          color: var(--etoro-dark);
        }

        .sponsorship__carousel {
          max-height: 65px;
          overflow: hidden;
          display: flex;
        }

        .sponsorship__carousel:hover .sponsorship__list {
          animation-play-state: paused;
        }

        .sponsorship__list {
          display: flex;
          gap: 40px;
          padding: 0 20px;
          animation: scroll 40s linear infinite;
          flex-shrink: 0;
        }

        .sponsorship__team {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 55px;
        }

        .sponsorship__logo {
          height: auto;
          max-height: 65px;
          width: auto;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .sponsorship__logo:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.1);
        }

        @media only screen and (min-width: 769px) {
          .sponsorship {
            padding: 80px 40px;
          }

          .sponsorship__title {
            font-size: 30px;
            line-height: 40px;
            margin-bottom: 48px;
          }

          .sponsorship__list {
            gap: 60px;
            padding: 0 30px;
          }

          .sponsorship__carousel {
            max-height: 80px;
          }

          .sponsorship__logo {
            max-height: 80px;
          }
        }

        @media only screen and (min-width: 1024px) {
          .sponsorship {
            padding: 100px 80px;
          }

          .sponsorship__list {
            gap: 80px;
          }
        }

        @keyframes scroll {
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
