import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div>
            <div className={styles.footerBrand}>MedDetalis</div>
            <p>
              India&apos;s healthcare directory — find real hospitals, search medicines
              with FDA data, and book appointments. Jamshedpur, Jharkhand focused.
            </p>
            <div className={styles.emergency}>Emergency: Call 108 (Ambulance) or 112 (All Services)</div>
          </div>
          <div className={styles.footerCol}>
            <h4>Quick Links</h4>
            <a href="#doctors">Doctors</a>
            <a href="#book">Book Appointment</a>
            <a href="#medicines">Medicine Search</a>
            <a href="#hospitals">Hospital Directory</a>
            <a href="#my-bookings">My Bookings</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Emergency Numbers</h4>
            <span className={styles.disabledLink}>108 — Ambulance (EMRI)</span>
            <span className={styles.disabledLink}>102 — Health Helpline</span>
            <span className={styles.disabledLink}>112 — Emergency Services</span>
            <span className={styles.disabledLink}>104 — Jharkhand Swasthya</span>
            <span className={styles.disabledLink}>14410 — Ayushman Bharat</span>
          </div>
          <div className={styles.footerCol}>
            <h4>Jharkhand Health</h4>
            <a href="https://rimsranchi.ac.in" target="_blank" rel="noopener noreferrer">RIMS Ranchi</a>
            <a href="https://www.tatamainhospital.com" target="_blank" rel="noopener noreferrer">Tata Main Hospital</a>
            <a href="https://www.jharkhand.gov.in/health" target="_blank" rel="noopener noreferrer">JH Govt Health Dept</a>
            <a href="https://abdm.gov.in" target="_blank" rel="noopener noreferrer">ABHA Health ID</a>
            <a href="https://bis.pmjay.gov.in" target="_blank" rel="noopener noreferrer">Ayushman Bharat (PMJAY)</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>MedDetalis — India Hospital &amp; Medicine Directory</span>
          <span>Data sourced from official hospital websites &amp; government portals. Always verify before visiting.</span>
        </div>
      </div>
    </footer>
  );
}
