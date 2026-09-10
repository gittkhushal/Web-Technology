import React from "react";
import BookList from "../components/BookList";
import heroImage from "../assets/reading-room-hero.png";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">The Reading Room · Est. 2026</p>
          <h1>Stories that<br />spark joy.</h1>
          <p className="hero-description">Thoughtful books for slow mornings, curious minds, and every chapter in between.</p>
          <a className="hero-link" href="#featured">Explore the shelves <span>↓</span></a>
        </div>
        <div className="hero-image-wrap">
          <img src={heroImage} alt="A warm independent bookstore reading nook" />
          <p>Find a story worth lingering over.</p>
        </div>
      </section>
      <section className="featured-section" id="featured">
        <div className="section-intro">
          <p className="eyebrow">Curated for you</p>
          <h2>Featured finds</h2>
          <p>Books to keep close, give away, and return to often.</p>
        </div>
        <BookList />
      </section>
    </main>
  );
}
