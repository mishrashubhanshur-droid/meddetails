'use client';

import { useState, useEffect } from 'react';
import styles from './MyBookings.module.css';

interface Booking {
  id: number;
  doctor: string;
  spec: string;
  patient: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  createdAt: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const load = () => {
      const data = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(data.reverse());
    };
    load();
    window.addEventListener('booking-updated', load);
    return () => window.removeEventListener('booking-updated', load);
  }, []);

  const deleteBooking = (id: number) => {
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem('bookings', JSON.stringify(updated.reverse()));
    setBookings(updated);
    window.dispatchEvent(new Event('booking-updated'));
  };

  const clearAll = () => {
    localStorage.removeItem('bookings');
    setBookings([]);
    window.dispatchEvent(new Event('booking-updated'));
  };

  const displayed = showAll ? bookings : bookings.slice(0, 3);

  if (bookings.length === 0) {
    return (
      <section className={styles.section} id="my-bookings">
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.entryNo}>Entry no. 008 — My Bookings</span>
            <h2 className={styles.h2}>Your appointment history.</h2>
          </div>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <p>No appointments booked yet.</p>
          <a href="#book" className={styles.bookLink}>Book your first appointment →</a>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="my-bookings">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>Entry no. 008 — My Bookings</span>
          <h2 className={styles.h2}>Your appointment history.</h2>
        </div>
        <p>You have {bookings.length} booking{bookings.length !== 1 ? 's' : ''} saved in this browser.</p>
      </div>

      <div className={styles.grid}>
        {displayed.map((b) => (
          <div key={b.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.slipId}>SLIP #{b.id}</span>
              <button className={styles.deleteBtn} onClick={() => deleteBooking(b.id)}>✕</button>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Doctor</span>
                <span className={styles.cardValue}>{b.doctor}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Specialty</span>
                <span className={styles.cardValue}>{b.spec}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Patient</span>
                <span className={styles.cardValue}>{b.patient}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Date</span>
                <span className={styles.cardValue}>{b.date}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Time</span>
                <span className={styles.cardValue}>{b.time}</span>
              </div>
              {b.reason && (
                <div className={styles.cardRow}>
                  <span className={styles.cardLabel}>Reason</span>
                  <span className={styles.cardValue}>{b.reason}</span>
                </div>
              )}
            </div>
            <div className={styles.cardFooter}>
              Booked: {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {bookings.length > 3 && (
          <button className={styles.showMore} onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show less' : `Show all ${bookings.length} bookings`}
          </button>
        )}
        <button className={styles.clearBtn} onClick={clearAll}>Clear all bookings</button>
      </div>
    </section>
  );
}
