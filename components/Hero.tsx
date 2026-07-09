'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    );
  }, []);

  return (
    <div className={styles.hero}>
      <div>
        <span className={styles.eyebrow}>Jamshedpur, Jharkhand — India Healthcare Directory</span>
        <h1 className={styles.h1}>
          Find hospitals,<br />
          <em>doctors &amp; medicines.</em>
        </h1>
        <p className={styles.lede}>
          Search real hospitals across India — from Tata Main Hospital Jamshedpur
          to AIIMS Delhi. Look up medicine details from the FDA database. Book
          appointments and save your records.
        </p>
        <div className={styles.heroActions}>
          <a href="#hospitals" className={`${styles.btn} ${styles.btnPrimary}`}>
            Find hospitals
          </a>
          <a href="#medicines" className={`${styles.btn} ${styles.btnGhost}`}>
            Search medicines
          </a>
          <a href="#book" className={`${styles.btn} ${styles.btnGhost}`}>
            Book appointment
          </a>
        </div>
      </div>
      <div className={styles.todayCard}>
        <div className={styles.label}>
          <span>Quick Access</span>
          <span>{dateStr}</span>
        </div>
        <div className={styles.todayRow}>
          <span className={styles.t}>108</span>
          <span>Ambulance (EMRI)</span>
        </div>
        <div className={styles.todayRow}>
          <span className={styles.t}>102</span>
          <span>Health Helpline</span>
        </div>
        <div className={styles.todayRow}>
          <span className={styles.t}>112</span>
          <span>Emergency (Police/Fire)</span>
        </div>
        <div className={styles.todayRow}>
          <span className={styles.t}>104</span>
          <span>Swasthya Helpline</span>
        </div>
        <div className={styles.todayStat}>
          <span className={styles.num}>36+</span>
          <span className={styles.numLabel}>
            states &amp; union territories covered
          </span>
        </div>
      </div>
    </div>
  );
}
