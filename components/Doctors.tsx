'use client';

import { useRef } from 'react';
import styles from './Doctors.module.css';

const doctors = [
  {
    name: 'Dr. Priya Sharma',
    spec: 'Cardiology',
    initials: 'PS',
    meta: 'MD, DM Cardiology (RIMS Ranchi) · 14 years practicing · Hindi, English',
    fee: '₹500 (Govt) / ₹800 (Private)',
    hospital: 'RIMS Ranchi',
    schedule: [
      { days: 'Mon / Wed / Fri', hours: '09:00 – 13:00' },
      { days: 'Tue / Thu', hours: '14:00 – 18:00' },
      { days: 'Consult length', hours: '20 min' },
    ],
    btnText: 'Book with Dr. Sharma',
  },
  {
    name: 'Dr. Amit Verma',
    spec: 'General Medicine',
    initials: 'AV',
    meta: 'MBBS, MD Internal Medicine (PMCH Dhanbad) · 9 years practicing · Hindi, English',
    fee: '₹200 (Govt) / ₹500 (Private)',
    hospital: 'PMCH Dhanbad',
    schedule: [
      { days: 'Mon – Fri', hours: '08:30 – 12:30' },
      { days: 'Sat', hours: '09:00 – 12:00' },
      { days: 'Consult length', hours: '15 min' },
    ],
    btnText: 'Book with Dr. Verma',
  },
  {
    name: 'Dr. Sneha Patel',
    spec: 'Pediatrics',
    initials: 'SP',
    meta: 'MD Pediatrics (TMH Jamshedpur) · 11 years practicing · Hindi, English',
    fee: '₹300 (Govt) / ₹700 (Private)',
    hospital: 'Tata Main Hospital',
    schedule: [
      { days: 'Mon / Tue / Thu', hours: '12:00 – 17:00' },
      { days: 'Fri', hours: '10:00 – 14:00' },
      { days: 'Consult length', hours: '20 min' },
    ],
    btnText: 'Book with Dr. Patel',
  },
  {
    name: 'Dr. Rajesh Kumar',
    spec: 'Orthopedics',
    initials: 'RK',
    meta: 'MS Orthopedics (RIMS Ranchi) · 17 years practicing · Hindi, English, Sadri',
    fee: '₹400 (Govt) / ₹900 (Private)',
    hospital: 'RIMS Ranchi',
    schedule: [
      { days: 'Tue / Wed / Fri', hours: '15:00 – 19:00' },
      { days: 'Sat', hours: '10:00 – 13:00' },
      { days: 'Consult length', hours: '25 min' },
    ],
    btnText: 'Book with Dr. Kumar',
  },
  {
    name: 'Dr. Meera Nair',
    spec: 'Dermatology',
    initials: 'MN',
    meta: 'MD Dermatology (Medica Ranchi) · 8 years practicing · Hindi, English, Malayalam',
    fee: '₹300 (Govt) / ₹600 (Private)',
    hospital: 'Medica Hospital Ranchi',
    schedule: [
      { days: 'Mon / Wed / Sat', hours: '10:00 – 14:00' },
      { days: 'Thu / Fri', hours: '16:00 – 20:00' },
      { days: 'Consult length', hours: '15 min' },
    ],
    btnText: 'Book with Dr. Nair',
  },
  {
    name: 'Dr. Vikram Singh',
    spec: 'ENT',
    initials: 'VS',
    meta: 'MS ENT (TMH Jamshedpur) · 12 years practicing · Hindi, English, Punjabi',
    fee: '₹250 (Govt) / ₹650 (Private)',
    hospital: 'Tata Motors Hospital',
    schedule: [
      { days: 'Tue / Thu / Sat', hours: '09:00 – 13:00' },
      { days: 'Mon / Fri', hours: '14:00 – 18:00' },
      { days: 'Consult length', hours: '15 min' },
    ],
    btnText: 'Book with Dr. Singh',
  },
];

interface DoctorsProps {
  onSelectDoctor: (name: string) => void;
}

export default function Doctors({ onSelectDoctor }: DoctorsProps) {
  return (
    <section className={styles.section} id="doctors">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>Entry no. 002 — The doctors</span>
          <h2 className={styles.h2}>Six specialists, one waiting room.</h2>
        </div>
        <p>
          Every card shows this week&apos;s real hours and consultation fee. Tap a doctor to carry them
          straight into the booking form below.
        </p>
      </div>

      <div className={styles.doctorGrid}>
        {doctors.map((doc) => (
          <div key={doc.name} className={styles.doctorCard}>
            <div className={styles.docTop}>
              <div className={styles.avatar}>{doc.initials}</div>
              <div>
                <p className={styles.docName}>{doc.name}</p>
                <p className={styles.docSpec}>{doc.spec}</p>
              </div>
            </div>
            <p className={styles.docMeta}>{doc.meta}</p>
            <div className={styles.docStats}>
              <span className={styles.docHospital}>🏥 {doc.hospital}</span>
              <span className={styles.docFee}>{doc.fee}</span>
            </div>
            <div className={styles.docSchedule}>
              {doc.schedule.map((s, i) => (
                <div key={i} className={styles.row}>
                  <span>{s.days}</span>
                  <span>{s.hours}</span>
                </div>
              ))}
            </div>
            <button
              className={styles.docSelect}
              onClick={() => onSelectDoctor(doc.name)}
            >
              {doc.btnText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
