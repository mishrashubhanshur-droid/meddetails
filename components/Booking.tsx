'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import styles from './Booking.module.css';

const docHours: Record<string, string[]> = {
  'Dr. Priya Sharma': [
    '09:00','09:20','09:40','10:00','10:20','10:40',
    '11:00','11:20','11:40','12:00','12:20','12:40',
  ],
  'Dr. Amit Verma': [
    '08:30','08:45','09:00','09:15','09:30','09:45',
    '10:00','10:15','10:30','10:45','11:00','11:15',
  ],
  'Dr. Sneha Patel': [
    '12:00','12:20','12:40','13:00','13:20','13:40',
    '14:00','14:20','14:40','15:00','15:20','15:40',
  ],
  'Dr. Rajesh Kumar': [
    '15:00','15:25','15:50','16:15','16:40',
    '17:05','17:30','17:55','18:20','18:45',
  ],
  'Dr. Meera Nair': [
    '10:00','10:15','10:30','10:45','11:00','11:15',
    '11:30','11:45','12:00','12:15','12:30','12:45',
  ],
  'Dr. Vikram Singh': [
    '09:00','09:15','09:30','09:45','10:00','10:15',
    '10:30','10:45','11:00','11:15','11:30','11:45',
  ],
};

const takenSlots = ['09:20', '10:00', '11:00', '09:00', '09:45'];

const specMap: Record<string, string> = {
  'Dr. Priya Sharma': 'Cardiology',
  'Dr. Amit Verma': 'General Medicine',
  'Dr. Sneha Patel': 'Pediatrics',
  'Dr. Rajesh Kumar': 'Orthopedics',
  'Dr. Meera Nair': 'Dermatology',
  'Dr. Vikram Singh': 'ENT',
};

interface BookingProps {
  selectedDoctor: string | null;
}

export default function Booking({ selectedDoctor }: BookingProps) {
  const [doctor, setDoctor] = useState('Dr. Priya Sharma');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [slipCounter, setSlipCounter] = useState(4471);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
      setSelectedTime(null);
    }
  }, [selectedDoctor]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const spec = specMap[doctor] || '';
  const slots = docHours[doctor] || [];

  const handleConfirm = () => {
    if (!patientName || !date || !selectedTime) {
      setErrorMsg('Fill in name, date, and a time slot');
      setConfirmed(false);
      return;
    }
    setErrorMsg('');
    const newSlip = slipCounter + 1;
    setSlipCounter(newSlip);
    setConfirmed(true);

    const booking = {
      id: newSlip,
      doctor,
      spec,
      patient: patientName,
      phone,
      date,
      time: selectedTime,
      reason,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));
    window.dispatchEvent(new Event('booking-updated'));
  };

  return (
    <section className={styles.section} id="book">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>Entry no. 003 — Book an appointment</span>
          <h2 className={styles.h2}>Reserve a slot in under a minute.</h2>
        </div>
        <p>
          Pick a doctor, a day, and an open time. Your confirmation slip fills in
          on the right as you go.
        </p>
      </div>

      <div className={styles.bookingWrap}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label htmlFor="fDoctor">Doctor</label>
            <select
              id="fDoctor"
              value={doctor}
              onChange={(e) => {
                setDoctor(e.target.value);
                setSelectedTime(null);
              }}
            >
              <option value="Dr. Priya Sharma">Dr. Priya Sharma — Cardiology</option>
              <option value="Dr. Amit Verma">Dr. Amit Verma — General Medicine</option>
              <option value="Dr. Sneha Patel">Dr. Sneha Patel — Pediatrics</option>
              <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar — Orthopedics</option>
              <option value="Dr. Meera Nair">Dr. Meera Nair — Dermatology</option>
              <option value="Dr. Vikram Singh">Dr. Vikram Singh — ENT</option>
            </select>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="fName">Patient name</label>
              <input
                id="fName"
                type="text"
                placeholder="Full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="fPhone">Phone</label>
              <input
                id="fPhone"
                type="tel"
                placeholder="+91 00000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="fDate">Date</label>
            <input
              id="fDate"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Available times</label>
            <div className={styles.slots}>
              {slots.map((t) => {
                const isTaken = takenSlots.includes(t);
                const isSelected = selectedTime === t;
                return (
                  <div
                    key={t}
                    className={`${styles.slot} ${isTaken ? styles.taken : ''} ${isSelected ? styles.selected : ''}`}
                    onClick={() => {
                      if (!isTaken) {
                        setSelectedTime(t);
                      }
                    }}
                  >
                    {t}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="fReason">Reason for visit</label>
            <textarea
              id="fReason"
              rows={3}
              placeholder="Brief description — e.g. follow-up, new symptoms, prescription renewal"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            type="button"
            onClick={handleConfirm}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Confirm appointment
          </button>
        </form>

        <div className={styles.ticket}>
          <div className={styles.ticketHead}>
            <span className={styles.mark2}>Rx</span>
            <span className={styles.id}>
              SLIP #{slipCounter > 4471 ? slipCounter : '— — —'}
            </span>
          </div>
          <div className={styles.ticketBody}>
            <div className={styles.ticketRow}>
              <span className={styles.k}>Doctor</span>
              <span className={styles.v}>{doctor}</span>
            </div>
            <div className={styles.ticketRow}>
              <span className={styles.k}>Specialty</span>
              <span className={styles.v}>{spec}</span>
            </div>
            <div className={styles.ticketRow}>
              <span className={styles.k}>Patient</span>
              <span className={styles.v}>{patientName || '—'}</span>
            </div>
            <div className={styles.ticketRow}>
              <span className={styles.k}>Date</span>
              <span className={styles.v}>{date || '—'}</span>
            </div>
            <div className={styles.ticketRow}>
              <span className={styles.k}>Time</span>
              <span className={styles.v}>{selectedTime || '—'}</span>
            </div>
            <div className={styles.ticketRow}>
              <span className={styles.k}>Reason</span>
              <span className={styles.v}>{reason || '—'}</span>
            </div>
          </div>
          <div
            className={`${styles.stamp} ${!confirmed ? styles.pending : ''}`}
          >
            {errorMsg
              ? errorMsg
              : confirmed
              ? 'Confirmed — see you then'
              : 'Awaiting confirmation'}
          </div>
        </div>
      </div>
    </section>
  );
}
