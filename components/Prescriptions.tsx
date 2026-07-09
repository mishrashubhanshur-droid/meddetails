'use client';

import { useState } from 'react';
import styles from './Prescriptions.module.css';

const sampleRx: Record<string, { doc: string; patient: string; date: string }> = {
  '4471': { doc: 'Dr. Priya Sharma — Cardiology (RIMS Ranchi)', patient: 'Rahul Sharma', date: '08 Jul 2026' },
  '3390': { doc: 'Dr. Amit Verma — General Medicine (PMCH Dhanbad)', patient: 'Kavita Iyer', date: '02 Jul 2026' },
};

const prescriptions = [
  {
    name: 'Amlodipine',
    detail: 'For managing blood pressure. Take at the same time each day, with or without food.',
    tags: ['Oral tablet', '5 mg', 'Blood pressure'],
    dose: '1× daily\nmorning\n30 days',
  },
  {
    name: 'Atorvastatin',
    detail: 'Lowers cholesterol. Best taken in the evening; avoid grapefruit juice while on this course.',
    tags: ['Oral tablet', '10 mg', 'Cholesterol'],
    dose: '1× daily\nevening\n90 days',
  },
  {
    name: 'Aspirin',
    detail: 'Low-dose, for cardiovascular protection. Take with food to reduce stomach upset.',
    tags: ['Oral tablet', '75 mg', 'Preventive'],
    dose: '1× daily\nwith lunch\nongoing',
  },
];

export default function Prescriptions() {
  const [search, setSearch] = useState('');
  const [rxDoc, setRxDoc] = useState('Dr. Priya Sharma — Cardiology');
  const [rxPatient, setRxPatient] = useState('Rahul Sharma');
  const [rxDate, setRxDate] = useState('08 Jul 2026');
  const [rxSlip, setRxSlip] = useState('#4471');

  const lookupRx = () => {
    const raw = search.replace(/[^0-9]/g, '');
    const record = sampleRx[raw];
    if (record) {
      setRxDoc(record.doc);
      setRxPatient(record.patient);
      setRxDate(record.date);
      setRxSlip('#' + raw);
    } else if (raw) {
      setRxDoc('No record found for that slip number');
      setRxPatient('—');
      setRxSlip('#' + raw);
    }
  };

  const loadSample = () => {
    setSearch('SLIP #4471');
    const record = sampleRx['4471'];
    setRxDoc(record.doc);
    setRxPatient(record.patient);
    setRxDate(record.date);
    setRxSlip('#4471');
  };

  return (
    <section className={styles.section} id="prescriptions">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>Entry no. 004 — Prescriptions and medicines</span>
          <h2 className={styles.h2}>Your prescription pad, kept digital.</h2>
        </div>
        <p>
          Look up a past visit by slip number, or browse the sample record below to
          see how dosage, frequency, and instructions are laid out.
        </p>
      </div>

      <div className={styles.rxLookup}>
        <input
          type="text"
          placeholder="Enter slip number, e.g. SLIP #4471"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={lookupRx}>
          Look up
        </button>
        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={loadSample}>
          Load sample record
        </button>
      </div>

      <div className={styles.rxPad}>
        <div className={styles.rxPadHead}>
          <div>
            <div className={styles.rxPadLabel}>Prescribed by</div>
            <div className={styles.rxDoc}>{rxDoc}</div>
          </div>
          <div className={styles.patient}>
            Patient: <strong>{rxPatient}</strong>
            <br />
            Visit date: {rxDate} · Slip {rxSlip}
          </div>
        </div>
        <div className={styles.rxList}>
          {prescriptions.map((rx, i) => (
            <div key={i} className={styles.rxItem}>
              <span className={styles.rxIdx}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className={styles.rxName}>{rx.name}</p>
                <p className={styles.rxDetail}>{rx.detail}</p>
                <div className={styles.rxTags}>
                  {rx.tags.map((tag) => (
                    <span key={tag} className={styles.rxTag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className={styles.rxDose}>{rx.dose}</span>
            </div>
          ))}
        </div>
        <div className={styles.perforation}></div>
        <div className={styles.rxPadFoot}>
          <span>Refills remaining: 2</span>
          <span>Next review: 07 Aug 2026</span>
        </div>
      </div>
    </section>
  );
}
