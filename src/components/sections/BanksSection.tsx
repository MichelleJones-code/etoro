'use client'

export default function BanksSection() {
  const banks = [
    { name: 'J.P. Morgan', logo: '/images/logos/banks/jpm-logo.svg' },
    { name: 'UBS', logo: '/images/logos/banks/ubs-logo.svg', url: 'https://ubs.com/' },
    { name: 'Citi', logo: '/images/logos/banks/citi-logo.svg' },
    { name: 'Deutsche Bank', logo: '/images/logos/banks/db-logo.svg' },
  ]

  const bankRow2 = [
    { name: 'Coutts', logo: '/images/logos/banks/coutts-logo.svg' },
    { name: 'J. Safra Sarasin', logo: '/images/logos/banks/jss-logo.svg' },
    { name: 'The Pictet Group', logo: '/images/logos/banks/pictet-logo.svg' },
  ]

  return (
    <div className="banks_block wrapper">
      <div className="e-container">
        <div className="description center">
          <h2>Your funds are held in top-tier institutions</h2>
          <p>The eToro Group works with globally renowned banking partners including:</p>
        </div>

        <div className="bank-list">
          <div className="bank-list__row bank-list__row-first">
            {banks.map((bank, index) => (
              bank.url ? (
                <a key={index} href={bank.url} target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" className="bank_logo" src={bank.logo} alt={bank.name} />
                </a>
              ) : (
                <img key={index} loading="lazy" className="bank_logo" src={bank.logo} alt={bank.name} />
              )
            ))}
          </div>
          <div className="bank-list__row">
            {bankRow2.map((bank, index) => (
              <img key={index} loading="lazy" className="bank_logo" src={bank.logo} alt={bank.name} />
            ))}
          </div>
        </div>

        <div className="inner-disclaimer center">
          * These banks are partnered with the eToro group and do not serve all entities within the group
        </div>
      </div>

      <style jsx>{`
        .banks_block {
          background: #fff;
        }

        .description {
          margin-bottom: 40px;
        }

        .description h2 {
          margin-bottom: 16px;
        }

        .description p {
          color: var(--etoro-text);
        }

        .bank-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 32px;
        }

        .bank-list__row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .bank-list__row-first {
          gap: 48px;
        }

        .bank_logo {
          height: 40px;
          width: auto;
          object-fit: contain;
          filter: grayscale(100%);
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .bank_logo:hover {
          filter: grayscale(0%);
          opacity: 1;
        }

        @media only screen and (min-width: 769px) {
          .bank-list {
            gap: 48px;
            margin-bottom: 48px;
          }

          .bank-list__row {
            gap: 60px;
          }

          .bank-list__row-first {
            gap: 80px;
          }

          .bank_logo {
            height: 50px;
          }
        }

        @media only screen and (min-width: 1024px) {
          .bank_logo {
            height: 60px;
          }
        }
      `}</style>
    </div>
  )
}
