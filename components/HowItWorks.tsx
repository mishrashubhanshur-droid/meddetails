import styles from './HowItWorks.module.css';

const steps = [
  {
    n: '01',
    title: 'Find a hospital',
    desc: 'Browse 15+ verified hospitals across Ranchi, Jamshedpur, Dhanbad and other Jharkhand districts with real contact details.',
  },
  {
    n: '02',
    title: 'Choose a doctor',
    desc: 'See OPD schedules, consultation fees (government & private), and specialties — all real data from hospital websites.',
  },
  {
    n: '03',
    title: 'Book your slot',
    desc: 'Select a time, fill in your details, and get a confirmation slip. Your booking is saved in your browser.',
  },
  {
    n: '04',
    title: 'Search medicines',
    desc: 'Look up any drug by name — get real FDA data on dosage, warnings, side effects, and manufacturer details.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>How it works</span>
          <h2 className={styles.h2}>Healthcare made simple for Jharkhand.</h2>
        </div>
      </div>
      <div className={styles.steps}>
        {steps.map((step) => (
          <div key={step.n} className={styles.step}>
            <span className={styles.n}>{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
