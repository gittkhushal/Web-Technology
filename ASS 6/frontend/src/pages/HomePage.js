import React from 'react';
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';

const HomePage = ({ user, books, loading }) => {
  return (
    <main className="home-page">
      <Hero />
      <div className="container">
        <FeaturedBooks books={books} loading={loading} />
      </div>

      <section className="cta">
        <div className="container">
          <h2>Need a Hand Picking Your Next Page-Turner?</h2>
          <p>Let our book experts help you find your next favorite read.</p>
          <button className="btn btn-secondary">Contact Us</button>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          flex: 1;
        }

        .cta {
          background: #6b7280;
          color: white;
          padding: 6rem 0;
          text-align: center;
        }

        .cta h2 {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .cta p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
      `}</style>
    </main>
  );
};

export default HomePage;
