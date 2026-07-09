'use client';

import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.topbar}>
      <div className={styles.topbarInner}>
        <div className={styles.brand}>
          <span className={styles.mark}>MD</span>
          MedDetalis <small>India Healthcare</small>
        </div>
        <nav className={`${styles.tabs} ${mobileOpen ? styles.open : ''}`}>
          <a href="#doctors" onClick={() => setMobileOpen(false)}>Doctors</a>
          <a href="#book" onClick={() => setMobileOpen(false)}>Book</a>
          <a href="#medicines" onClick={() => setMobileOpen(false)}>Medicines</a>
          <a href="#hospitals" onClick={() => setMobileOpen(false)}>Hospitals</a>
          <a href="#my-bookings" onClick={() => setMobileOpen(false)}>My Bookings</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
        </nav>
        <a className={styles.navCta} href="#book">Book a visit</a>
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
}
