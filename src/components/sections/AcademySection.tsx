'use client'

import { useState } from 'react'

export default function AcademySection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const courses = [
    {
      title: 'Trading Basics',
      description: 'Learn the fundamentals of trading and investing',
      image: '/images/features/trading-basics.jpg',
      duration: '2 hours',
    },
    {
      title: 'Technical Analysis',
      description: 'Master chart patterns and technical indicators',
      image: '/images/features/technical-analysis.jpg',
      duration: '3 hours',
    },
    {
      title: 'Risk Management',
      description: 'Protect your capital with proper risk management',
      image: '/images/features/risk-management.jpg',
      duration: '1.5 hours',
    },
  ]

  return (
    <div className="wrapper dark-bg">
      <div className="e-container">
        <div className="academy-content">
          <div className="academy-header center">
            <h2>Learn to trade with eToro Academy</h2>
            <p>Free educational resources to help you become a better trader</p>
          </div>

          <div className="academy-carousel">
            <div className="carousel-wrapper">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {courses.map((course, index) => (
                  <div key={index} className="carousel-slide">
                    <div className="course-card">
                      <div className="course-image">
                        <div className="course-placeholder"></div>
                      </div>
                      <div className="course-content">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <div className="course-meta">
                          <span className="course-duration">{course.duration}</span>
                          <a href="#" className="e-cta-alt white">
                            Start Learning
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel-pagination">
              {courses.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-bullet ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="academy-cta center">
            <a href="#" className="e-cta white">
              Explore All Courses
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .academy-content {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .academy-header h2,
        .academy-header p {
          color: white;
        }

        .academy-header p {
          margin-top: 16px;
        }

        .academy-carousel {
          position: relative;
          overflow: hidden;
        }

        .carousel-wrapper {
          overflow: hidden;
          border-radius: 12px;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }

        .carousel-slide {
          min-width: 100%;
          padding: 0 10px;
        }

        .course-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .course-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .course-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #13c636 0%, #00b066 100%);
        }

        .course-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .course-content h3 {
          color: var(--etoro-dark);
          font-size: 24px;
          line-height: 30px;
        }

        .course-content p {
          color: var(--etoro-text);
        }

        .course-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }

        .course-duration {
          color: var(--etoro-text);
          font-size: 14px;
        }

        .carousel-pagination {
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
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .pagination-bullet.active {
          background: white;
          width: 32px;
          border-radius: 6px;
        }

        @media only screen and (min-width: 769px) {
          .carousel-slide {
            padding: 0 20px;
          }

          .course-image {
            height: 250px;
          }

          .course-content {
            padding: 32px;
          }
        }

        @media only screen and (min-width: 1024px) {
          .carousel-track {
            display: flex;
            justify-content: center;
          }

          .carousel-slide {
            min-width: 50%;
            max-width: 500px;
          }

          .course-image {
            height: 300px;
          }
        }
      `}</style>
    </div>
  )
}
