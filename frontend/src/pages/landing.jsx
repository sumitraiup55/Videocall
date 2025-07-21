import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const router = useNavigate();
  // Responsive breakpoints
  const isMobile = window.innerWidth <= 600;
  const isTablet = window.innerWidth > 600 && window.innerWidth <= 900;
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(120deg, #986b41ff 0%, #292958ff 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <nav style={{
        padding: isMobile ? '1rem 0.5rem' : isTablet ? '1.2rem 1.2rem' : '1.5rem 2.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(34,34,59,0.15)',
        backdropFilter: 'blur(4px)',
        gap: isMobile ? '1rem' : 0,
      }}>
        <div className='navHeader'>
          <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: 1 }}>LiveLink</h2>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={() => router("/aljk23")}
            style={{
              background: 'linear-gradient(90deg, #ae7540ff 60%, #7575caff 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              padding: '0.7rem 1.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)'
            }}>
            Join as Guest
          </button>
          <button onClick={() => router("/auth")}
            style={{
              background: 'transparent',
              color: '#dc7718ff',
              border: '2px solid #de730fff',
              borderRadius: 16,
              padding: '0.7rem 1.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}>
            Register
          </button>
          <button onClick={() => router("/auth")}
            style={{
              background: '#0808b3ff',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              padding: '0.7rem 1.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(52, 65, 245, 0.1)'
            }}>
            Login
          </button>
        </div>
      </nav>
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '4vw',
        padding: isMobile ? '1rem 0.5rem' : isTablet ? '1.5rem 1rem' : '2rem 1rem',
        width: '100%',
      }}>
        <div style={{ maxWidth: isMobile ? 340 : isTablet ? 400 : 500, width: '100%' }}>
          <h1 style={{ fontSize: isMobile ? '2rem' : isTablet ? '2.2rem' : '2.7rem', fontWeight: 800, lineHeight: 1.1, textAlign: isMobile ? 'center' : 'left' }}>
            <span style={{ color: "#fc8626ff" }}>Connect</span> with your loved Ones
          </h1>
          <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', margin: isMobile ? '1rem 0 2rem 0' : '1.5rem 0 2.5rem 0', color: '#e1cbcbff', textAlign: isMobile ? 'center' : 'left' }}>
            Cover a distance by Video Call
          </p>
          <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <Link to={"/auth"} style={{
              background: '#cd6e01ff',
              color: 'white',
              textDecoration: 'none',
              padding: isMobile ? '0.8rem 1.5rem' : '1rem 2.5rem',
              borderRadius: 20,
              fontWeight: 700,
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              boxShadow: '0 2px 8px 0 rgba(43, 51, 159, 0.1)'
            }}>
              Get Started
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 'auto' }}>
          <video
            src="https://shorturl.at/ZpNzc"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: isMobile ? '90vw' : '100%', maxWidth: isMobile ? 220 : 350, borderRadius: "18px", boxShadow: '0 4px 24px 0 rgba(30, 36, 122, 0.1)' }}
          />
        </div>
      </main>
      <footer style={{ textAlign: 'center', padding: '1rem', color: '#fff8', fontSize: '1rem' }}>
        &copy; {new Date().getFullYear()} Videocall. All rights reserved.
      </footer>
    </div>
  );
}
