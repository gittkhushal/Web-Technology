import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Stories That Spark Joy</h1>
        <p>Discover awesome reads that make every day an adventure.</p>
        <Link to="/books" className="btn btn-primary">Explore Our Collection</Link>
      </div>
      <div className="hero-image">
        <img 
          src="https://images.unsplash.com/photo-150784272343-583f20270319?w=700&h=500&fit=crop" 
          alt="Reading books" 
        />
      </div>

      <style jsx>{`
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: 6rem 0;
          background: linear-gradient(135deg, var(--color-accent) 0%, rgba(127, 179, 213, 0.1) 100%);
        }

        .hero-content {
          padding: 0 2rem;
        }

        .hero-content h1 {
          font-family: var(--font-serif);
          font-size: 3.5rem;
          color: var(--color-dark);
          margin-bottom: 1rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .hero-image {
          height: 500px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 3rem 0;
            gap: 2rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-image {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
