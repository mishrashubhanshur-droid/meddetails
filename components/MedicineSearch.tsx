'use client';

import { useState } from 'react';
import styles from './MedicineSearch.module.css';

interface DrugResult {
  brand_name: string;
  generic_name: string;
  manufacturer_name: string;
  route: string[];
  substance_name: string;
  description: string;
  indications: string;
  warnings: string;
  contraindications: string;
  dosage_and_administration: string;
  overdosage: string;
  adverse_reactions: string;
  drug_interactions: string;
  pharmacology: string;
  mechanism: string;
  pharmacokinetics: string;
  clinical_pharmacology: string;
  how_supplied: string;
  boxed_warning: string;
  precautions: string;
  pregnancy: string;
  nursing: string;
  pediatric_use: string;
  geriatric_use: string;
  storage: string;
}

interface Condition {
  name: string;
  icon: string;
  description: string;
  symptoms: string[];
  medicines: { name: string; generic: string; dosage: string; type: string }[];
  homeRemedies: string[];
  whenToSeeDoctor: string;
}

const conditions: Condition[] = [
  {
    name: 'Headache',
    icon: '🤕',
    description: 'Pain or discomfort in the head, scalp, or neck area. Can be tension-type, migraine, or cluster headache.',
    symptoms: ['Throbbing pain', 'Sensitivity to light', 'Nausea', 'Neck stiffness', 'Blurred vision'],
    medicines: [
      { name: 'Paracetamol (Crocin/Dolo)', generic: 'Paracetamol 500mg', dosage: '500mg-1000mg every 4-6 hours. Max 4g/day.', type: 'Pain Reliever' },
      { name: 'Ibuprofen (Brufen/Micromax)', generic: 'Ibuprofen 400mg', dosage: '400mg every 6-8 hours with food. Max 1200mg/day.', type: 'NSAID' },
      { name: 'Combiflam', generic: 'Ibuprofen + Paracetamol', dosage: '1 tablet after food, 2-3 times/day.', type: 'Combo Pain Reliever' },
      { name: 'Saridon', generic: 'Paracetamol + Propyphenazone + Caffeine', dosage: '1 tablet, max 3/day.', type: 'Analgesic' },
      { name: 'Decstasy', generic: 'Paracetamol + Caffeine', dosage: '1-2 tablets every 4-6 hours.', type: 'Pain Reliever' },
    ],
    homeRemedies: ['Cold compress on forehead', 'Rest in dark room', 'Stay hydrated', 'Peppermint oil on temples', 'Deep breathing exercises'],
    whenToSeeDoctor: 'If headache is sudden and severe, lasts >3 days,伴随 fever/stiff neck/vision changes, or occurs after head injury.'
  },
  {
    name: 'Stomach Pain',
    icon: '🤢',
    description: 'Discomfort or cramps in the abdominal area. Can be due to gas, acidity, indigestion, food poisoning, or infections.',
    symptoms: ['Cramping', 'Bloating', 'Gas', 'Nausea', 'Heartburn', 'Loose motions'],
    medicines: [
      { name: 'Digene Gel', generic: 'Mag Hydroxide + Simethicone + Al(OH)', dosage: '2 spoons after meals, 3-4 times/day.', type: 'Antacid + Anti-gas' },
      { name: 'Pan-D', generic: 'Pantoprazole + Domperidone', dosage: '1 tablet before breakfast, 30 min before food.', type: 'PPI + Prokinetic' },
      { name: 'Omez DSR', generic: 'Omeprazole + Domperidone', dosage: '1 capsule before breakfast.', type: 'PPI + Prokinetic' },
      { name: 'Rantac-D', generic: 'Ranitidine + Domperidone', dosage: '1 tablet before meals, 2 times/day.', type: 'H2 Blocker + Prokinetic' },
      { name: 'Enterogermina', generic: 'Clostridium butyricum', dosage: '2-3 vials/day, shake before use.', type: 'Probiotic' },
      { name: 'Spasmo-Proxyvon', generic: 'Dicyclomine + Paracetamol', dosage: '1 tablet after food, 2-3 times/day.', type: 'Antispasmodic' },
    ],
    homeRemedies: ['ORS water', 'Ginger tea', 'Warm water sips', 'Avoid spicy food', 'Light khichdi/dal rice', 'Ajwain water'],
    whenToSeeDoctor: 'If pain is severe, blood in stool, vomiting blood, fever >101°F, or pain lasts >2 days.'
  },
  {
    name: 'Fever',
    icon: '🌡️',
    description: 'Body temperature above 98.6°F (37°C). Can be due to viral, bacterial, or other infections.',
    symptoms: ['High temperature', 'Body ache', 'Chills', 'Sweating', 'Weakness', 'Headache'],
    medicines: [
      { name: 'Paracetamol (Crocin/Dolo)', generic: 'Paracetamol 500mg', dosage: '500mg-1000mg every 4-6 hours. Max 4g/day.', type: 'Antipyretic' },
      { name: 'Dolo 650', generic: 'Paracetamol 650mg', dosage: '650mg every 4-6 hours. Max 4g/day.', type: 'Antipyretic' },
      { name: 'Ibuprofen (Brufen)', generic: 'Ibuprofen 400mg', dosage: '400mg every 6-8 hours with food.', type: 'NSAID + Antipyretic' },
      { name: 'Crocin Advance', generic: 'Paracetamol 500mg', dosage: '1-2 tablets every 4-6 hours.', type: 'Antipyretic' },
      { name: 'Fervex', generic: 'Paracetamol + Pheniramine + Vit C', dosage: '1 sachet in warm water, 3 times/day.', type: 'Cold & Fever Combo' },
    ],
    homeRemedies: ['Lukewarm sponging', 'ORS water', 'Light cotton clothes', 'Rest', 'Coconut water', 'Neem leaves water'],
    whenToSeeDoctor: 'If fever >103°F, lasts >3 days,伴随 rash/severe headache/difficulty breathing, or in children <2 years.'
  },
  {
    name: 'Cold & Cough',
    icon: '🤧',
    description: 'Common cold is a viral infection of the upper respiratory tract. Cough can be dry or with mucus.',
    symptoms: ['Runny nose', 'Sneezing', 'Sore throat', 'Cough', 'Mild fever', 'Congestion'],
    medicines: [
      { name: 'Cetirizine (Zyrtec/Alerid)', generic: 'Cetirizine 10mg', dosage: '10mg once daily at night.', type: 'Antihistamine' },
      { name: 'Montair LC', generic: 'Montelukast + Levocetirizine', dosage: '1 tablet at night.', type: 'Anti-allergy' },
      { name: 'Ascoril D+', generic: 'Dextromethorphan + Phenylephrine + Chlorpheniramine', dosage: '10ml 3-4 times/day.', type: 'Cough Syrup' },
      { name: 'Benadryl', generic: 'Diphenhydramine + Ammonium Chloride', dosage: '2 spoons 3-4 times/day.', type: 'Cough Syrup' },
      { name: 'Dexorange', generic: 'Iron + Folic Acid + Vit B12', dosage: '10ml daily on empty stomach.', type: 'Syrup for weakness' },
      { name: 'Sinarest', generic: 'Paracetamol + Phenylephrine + Caffeine', dosage: '1 tablet every 4-6 hours.', type: 'Cold Relief' },
    ],
    homeRemedies: ['Honey + ginger tea', 'Steam inhalation', 'Salt water gargle', 'Turmeric milk (haldi doodh)', 'Tulsi water', 'Warm soups'],
    whenToSeeDoctor: 'If cough lasts >2 weeks, blood in sputum, breathing difficulty, or high fever.'
  },
  {
    name: 'Diarrhea',
    icon: '💧',
    description: 'Loose, watery stools occurring more frequently than usual. Can be due to infection, food intolerance, or medication.',
    symptoms: ['Loose motions', 'Dehydration', 'Cramps', 'Nausea', 'Fever', 'Bloating'],
    medicines: [
      { name: 'ORS', generic: 'Oral Rehydration Salts', dosage: '1 sachet in 1 liter water. Sip frequently.', type: 'Rehydration' },
      { name: 'Lomotil', generic: 'Diphenoxylate + Atropine', dosage: '1-2 tablets after each loose stool. Max 8/day.', type: 'Antidiarrheal' },
      { name: 'Metronidazole (Flagyl)', generic: 'Metronidazole 400mg', dosage: '400mg 3 times/day for 5-7 days.', type: 'Antibiotic (if infection)' },
      { name: 'Enterogermina', generic: 'Clostridium butyricum', dosage: '2-3 vials/day.', type: 'Probiotic' },
      { name: 'Smecta', generic: 'Diosmectite', dosage: '1 sachet 3 times/day in water.', type: 'Adsorbent' },
      { name: 'Zinc tablets', generic: 'Zinc 20mg', dosage: '1 tablet daily for 10-14 days.', type: 'Supplement' },
    ],
    homeRemedies: ['ORS water frequently', 'Banana + curd', 'Rice kanji', 'Avoid dairy', 'Coconut water', 'Light khichdi'],
    whenToSeeDoctor: 'If diarrhea lasts >3 days, blood in stool, severe dehydration, or high fever.'
  },
  {
    name: 'Allergy',
    icon: '🤧',
    description: 'Immune system reaction to a substance. Can be seasonal, food-based, or drug-induced.',
    symptoms: ['Sneezing', 'Itchy eyes', 'Runny nose', 'Skin rash', 'Hives', 'Swelling'],
    medicines: [
      { name: 'Cetirizine (Zyrtec)', generic: 'Cetirizine 10mg', dosage: '10mg once daily.', type: 'Antihistamine' },
      { name: 'Levocetirizine (Xyzal)', generic: 'Levocetirizine 5mg', dosage: '5mg once daily at night.', type: 'Antihistamine' },
      { name: 'Montair LC', generic: 'Montelukast + Levocetirizine', dosage: '1 tablet at night.', type: 'Anti-allergy' },
      { name: 'Allegra', generic: 'Fexofenadine 120mg', dosage: '120mg once daily.', type: 'Non-drowsy Antihistamine' },
      { name: 'Deriphyllin', generic: 'Etophylline + Theophylline', dosage: '1 tablet 2-3 times/day.', type: 'Bronchodilator' },
    ],
    homeRemedies: ['Avoid allergen', 'Nasal saline wash', 'Cold compress on itchy eyes', 'Local honey', 'Steam inhalation'],
    whenToSeeDoctor: 'If breathing difficulty, face/throat swelling, severe rash, or symptoms don\'t improve with medicines.'
  },
  {
    name: 'Body Pain',
    icon: '💪',
    description: 'Pain in muscles, joints, or bones. Can be due to physical activity, injury, arthritis, or viral infections.',
    symptoms: ['Muscle ache', 'Joint pain', 'Stiffness', 'Swelling', 'Limited movement'],
    medicines: [
      { name: 'Ibuprofen (Brufen)', generic: 'Ibuprofen 400mg', dosage: '400mg every 6-8 hours with food.', type: 'NSAID' },
      { name: 'Diclofenac (Voltaren)', generic: 'Diclofenac 50mg', dosage: '50mg 2-3 times/day after food.', type: 'NSAID' },
      { name: 'Combiflam', generic: 'Ibuprofen + Paracetamol', dosage: '1 tablet after food, 2-3 times/day.', type: 'Combo' },
      { name: 'Volini Gel', generic: 'Diclofenac + Linseed Oil', dosage: 'Apply locally 3-4 times/day.', type: 'Topical Gel' },
      { name: 'Thiocolchicoside (Celin)', generic: 'Thiocolchicoside 4mg', dosage: '4mg 2 times/day.', type: 'Muscle Relaxant' },
      { name: 'Pan 40', generic: 'Pantoprazole 40mg', dosage: '40mg before breakfast (if taking NSAIDs).', type: 'Stomach Protection' },
    ],
    homeRemedies: ['Hot water bag', 'Gentle stretching', 'Rest', 'Epsom salt bath', 'Massage with warm oil'],
    whenToSeeDoctor: 'If pain is severe, swelling is significant, can\'t move joint, or pain lasts >1 week.'
  },
  {
    name: 'Vomiting',
    icon: '🤮',
    description: 'Forceful expulsion of stomach contents. Can be due to food poisoning, infection, motion sickness, or pregnancy.',
    symptoms: ['Nausea', 'Vomiting', 'Dizziness', 'Sweating', 'Dehydration'],
    medicines: [
      { name: 'Emeset (Ondansetron)', generic: 'Ondansetron 4mg', dosage: '4mg every 8 hours. Dissolve on tongue.', type: 'Anti-emetic' },
      { name: 'Domperidone (Domstal)', generic: 'Domperidone 10mg', dosage: '10mg 3 times/day before food.', type: 'Prokinetic' },
      { name: 'Vomikind', generic: 'Ondansetron 4mg', dosage: '4mg every 8 hours.', type: 'Anti-emetic' },
      { name: 'Digene Gel', generic: 'Mag Hydroxide + Simethicone', dosage: '2 spoons after vomiting episode.', type: 'Antacid' },
    ],
    homeRemedies: ['ORS sips', 'Cold water sips', 'Ginger tea', 'Avoid solid food for few hours', 'BRAT diet (Banana, Rice, Apple, Toast)'],
    whenToSeeDoctor: 'If vomiting blood, severe dehydration, lasts >24 hours, or伴随 high fever/severe headache.'
  },
  {
    name: 'Skin Problems',
    icon: '🩹',
    description: 'Includes rashes, acne, fungal infections, eczema, and other skin conditions.',
    symptoms: ['Rash', 'Itching', 'Redness', 'Bumps', 'Dry patches', 'Blisters'],
    medicines: [
      { name: 'Candid Cream', generic: 'Clotrimazole', dosage: 'Apply thin layer 2-3 times/day for 2-4 weeks.', type: 'Antifungal' },
      { name: 'Betnovate-C', generic: 'Betamethasone + Clotrimazole', dosage: 'Apply thin layer 1-2 times/day for 1-2 weeks.', type: 'Steroid + Antifungal' },
      { name: 'Permet', generic: 'Permethrin 5%', dosage: 'Apply to whole body, wash after 8-12 hours (for scabies).', type: 'Antiparasitic' },
      { name: 'Azithral 500', generic: 'Azithromycin 500mg', dosage: '500mg once daily for 3 days (for infected skin).', type: 'Antibiotic' },
      { name: 'Sofi gel', generic: 'Aloe vera + Vitamin E', dosage: 'Apply 2-3 times daily.', type: 'Soothing gel' },
    ],
    homeRemedies: ['Neem leaves paste', 'Aloe vera gel', 'Coconut oil', 'Keep area clean and dry', 'Avoid scratching'],
    whenToSeeDoctor: 'If rash spreads rapidly, has pus/blisters,伴随 fever, or doesn\'t improve in 1 week.'
  },
  {
    name: 'Joint Pain / Arthritis',
    icon: '🦴',
    description: 'Pain and inflammation in one or more joints. Common in knees, hips, hands, and spine.',
    symptoms: ['Joint stiffness', 'Swelling', 'Reduced range of motion', 'Morning stiffness', 'Creaking sound'],
    medicines: [
      { name: 'Diclofenac (Voltaren)', generic: 'Diclofenac 50mg', dosage: '50mg 2-3 times/day after food.', type: 'NSAID' },
      { name: 'Aceclofenac (Aceproxyvon)', generic: 'Aceclofenac 100mg', dosage: '100mg twice daily after food.', type: 'NSAID' },
      { name: 'Rantac-D', generic: 'Ranitidine + Domperidone', dosage: '1 tablet before meals (stomach protection).', type: 'PPI' },
      { name: 'Glucosamine', generic: 'Glucosamine + Chondroitin', dosage: '1 tablet 3 times/day.', type: 'Cartilage Support' },
      { name: 'Volini Gel', generic: 'Diclofenac + Linseed Oil', dosage: 'Apply locally 3-4 times/day.', type: 'Topical' },
      { name: 'Thiocolchicoside', generic: 'Thiocolchicoside 4mg', dosage: '4mg 2 times/day (for muscle spasm).', type: 'Muscle Relaxant' },
    ],
    homeRemedies: ['Hot water bag', 'Gentle exercise', 'Weight management', 'Fish oil supplements', 'Turmeric milk'],
    whenToSeeDoctor: 'If joint is red/hot, severe swelling, fever, or pain limits daily activities.'
  },
  {
    name: 'Acidity / Heartburn',
    icon: '🔥',
    description: 'Burning sensation in chest due to acid reflux from stomach to esophagus. Common after spicy food.',
    symptoms: ['Burning in chest', 'Sour taste in mouth', 'Bloating', 'Nausea', 'Difficulty swallowing'],
    medicines: [
      { name: 'Digene Gel', generic: 'Mag Hydroxide + Simethicone + Al(OH)', dosage: '2 spoons after meals, 3-4 times/day.', type: 'Antacid' },
      { name: 'Pantop 40', generic: 'Pantoprazole 40mg', dosage: '40mg before breakfast for 2-4 weeks.', type: 'PPI' },
      { name: 'Omez 20', generic: 'Omeprazole 20mg', dosage: '20mg before breakfast.', type: 'PPI' },
      { name: 'Rantac 150', generic: 'Ranitidine 150mg', dosage: '150mg before bed.', type: 'H2 Blocker' },
      { name: 'Pan-D', generic: 'Pantoprazole + Domperidone', dosage: '1 tablet before breakfast.', type: 'PPI + Prokinetic' },
    ],
    homeRemedies: ['Avoid spicy food', 'Don\'t lie down after eating', 'Elevate head while sleeping', 'Cold milk', 'Jeera water', 'Banana'],
    whenToSeeDoctor: 'If symptoms persist >2 weeks, difficulty swallowing, weight loss, or black stools.'
  },
  {
    name: 'Anxiety / Stress',
    icon: '😰',
    description: 'Feeling of worry, nervousness, or unease. Can be generalized or situational.',
    symptoms: ['Restlessness', 'Racing thoughts', 'Insomnia', 'Muscle tension', 'Rapid heartbeat', 'Sweating'],
    medicines: [
      { name: 'Serta 50', generic: 'Sertraline 50mg', dosage: '50mg once daily (prescription needed).', type: 'SSRI Antidepressant' },
      { name: 'Etizola', generic: 'Etizolam 0.5mg', dosage: '0.5mg 2-3 times/day (short term only).', type: 'Anxiolytic' },
      { name: 'Buspirone', generic: 'Buspirone 5mg', dosage: '5mg 3 times/day.', type: 'Non-benzodiazepine' },
    ],
    homeRemedies: ['Deep breathing exercises', 'Meditation', 'Regular exercise', 'Limit caffeine', 'Ashwagandha', 'Chamomile tea', 'Adequate sleep'],
    whenToSeeDoctor: 'If anxiety interferes with daily life, panic attacks, suicidal thoughts, or substance abuse.'
  },
];

const allConditions = conditions.map(c => c.name.toLowerCase());
const allSymptoms = Array.from(new Set(conditions.flatMap(c => c.symptoms.map(s => s.toLowerCase()))));

export default function MedicineSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugResult | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchTab, setSearchTab] = useState<'conditions' | 'fda'>('conditions');

  const mapDrug = (r: any): DrugResult => ({
    brand_name: r.openfda?.brand_name?.[0] || 'N/A',
    generic_name: r.openfda?.generic_name?.[0] || 'N/A',
    manufacturer_name: r.openfda?.manufacturer_name?.[0] || 'N/A',
    route: r.openfda?.route || [],
    substance_name: r.openfda?.substance_name?.[0] || 'N/A',
    description: r.description?.[0] || 'No description available.',
    indications: r.indications_and_usage?.[0] || 'Not specified.',
    warnings: r.warnings?.[0] || 'No specific warnings listed.',
    contraindications: r.contraindications?.[0] || 'Not specified.',
    dosage_and_administration: r.dosage_and_administration?.[0] || 'Consult your doctor.',
    overdosage: r.overdosage?.[0] || 'Not specified.',
    adverse_reactions: r.adverse_reactions?.[0] || 'Not specified.',
    drug_interactions: r.drug_interactions?.[0] || 'Not specified.',
    pharmacology: r.description?.[0] || '',
    mechanism: r.mechanism_of_action?.[0] || 'Not specified.',
    pharmacokinetics: r.pharmacokinetics?.[0] || 'Not specified.',
    clinical_pharmacology: r.clinical_pharmacology?.[0] || 'Not specified.',
    how_supplied: r.how_supplied?.[0] || 'N/A',
    boxed_warning: r.boxed_warning?.[0] || '',
    precautions: r.precautions?.[0] || 'Not specified.',
    pregnancy: r.pregnancy?.[0] || 'Not specified.',
    nursing: r.nursing_mothers?.[0] || 'Not specified.',
    pediatric_use: r.pediatric_use?.[0] || 'Not specified.',
    geriatric_use: r.geriatric_use?.[0] || 'Not specified.',
    storage: r.storage_and_handling?.[0] || 'Store at room temperature.',
  });

  const searchConditions = (q: string): Condition[] => {
    const lower = q.toLowerCase().trim();
    if (!lower) return [];
    return conditions.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.symptoms.some(s => s.toLowerCase().includes(lower)) ||
      c.medicines.some(m => m.name.toLowerCase().includes(lower) || m.generic.toLowerCase().includes(lower))
    );
  };

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;

    const matchedConditions = searchConditions(q);
    if (matchedConditions.length > 0) {
      setSelectedCondition(matchedConditions[0]);
      setResults([]);
      setError('');
      return;
    }

    setSelectedCondition(null);
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(q)}&limit=5`
      );
      const data = await res.json();

      if (data.error) {
        const res2 = await fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${encodeURIComponent(q)}&limit=5`
        );
        const data2 = await res2.json();
        if (data2.error) {
          setError(`No results found for "${q}". Try: headache, stomach pain, fever, cold, or medicine names like Paracetamol.`);
        } else {
          setResults(data2.results.map(mapDrug));
        }
      } else {
        setResults(data.results.map(mapDrug));
      }
    } catch {
      setError('Failed to fetch data. Check your internet connection.');
    }
    setLoading(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  return (
    <section className={styles.section} id="medicines">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>Entry no. 006 — Medicine Lookup</span>
          <h2 className={styles.h2}>Search diseases, symptoms, or medicines.</h2>
        </div>
        <p>Type your problem in plain language — like "headache", "stomach pain", "fever" — and get instant medicine suggestions with dosage. Or search any drug on the FDA database.</p>
      </div>

      <div className={styles.searchTabs}>
        <button className={`${styles.searchTab} ${searchTab === 'conditions' ? styles.searchTabActive : ''}`} onClick={() => setSearchTab('conditions')}>
          🩺 Diseases &amp; Symptoms
        </button>
        <button className={`${styles.searchTab} ${searchTab === 'fda' ? styles.searchTabActive : ''}`} onClick={() => setSearchTab('fda')}>
          💊 Search Any Drug (FDA)
        </button>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder={searchTab === 'conditions' ? 'Type your problem — headache, stomach pain, fever, cold, allergy...' : 'Search any medicine — Paracetamol, Amoxicillin, Dolo 650...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {searchTab === 'conditions' && !selectedCondition && (
        <div className={styles.quickConditions}>
          <span className={styles.quickLabel}>Quick access:</span>
          <div className={styles.quickGrid}>
            {conditions.map(c => (
              <button key={c.name} className={styles.quickCard} onClick={() => { setSelectedCondition(c); setQuery(c.name); }}>
                <span className={styles.quickIcon}>{c.icon}</span>
                <span className={styles.quickName}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {selectedCondition && (
        <div className={styles.conditionDetail}>
          <button className={styles.backBtn} onClick={() => { setSelectedCondition(null); setQuery(''); }}>← Back</button>
          <div className={styles.conditionHeader}>
            <span className={styles.conditionIcon}>{selectedCondition.icon}</span>
            <div>
              <h3>{selectedCondition.name}</h3>
              <p>{selectedCondition.description}</p>
            </div>
          </div>

          <div className={styles.conditionSection}>
            <h4>Common Symptoms</h4>
            <div className={styles.symptomTags}>
              {selectedCondition.symptoms.map(s => (
                <span key={s} className={styles.symptomTag}>{s}</span>
              ))}
            </div>
          </div>

          <div className={styles.conditionSection}>
            <h4>Recommended Medicines</h4>
            <div className={styles.medicineCards}>
              {selectedCondition.medicines.map((m, i) => (
                <div key={i} className={styles.medicineCard}>
                  <div className={styles.medicineCardHeader}>
                    <span className={styles.medicineType}>{m.type}</span>
                    <h5>{m.name}</h5>
                  </div>
                  <div className={styles.medicineCardMeta}>
                    <span>Generic: {m.generic}</span>
                  </div>
                  <div className={styles.medicineCardDosage}>
                    <strong>Dosage:</strong> {m.dosage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.conditionSection}>
            <h4>Home Remedies</h4>
            <ul className={styles.remedyList}>
              {selectedCondition.homeRemedies.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className={styles.warningBox}>
            <h4>⚠ When to See a Doctor</h4>
            <p>{selectedCondition.whenToSeeDoctor}</p>
          </div>
        </div>
      )}

      {!selectedCondition && searchTab === 'conditions' && (
        <div className={styles.conditionsList}>
          {conditions.map(c => (
            <div key={c.name} className={styles.conditionCard} onClick={() => { setSelectedCondition(c); setQuery(c.name); }}>
              <span className={styles.conditionCardIcon}>{c.icon}</span>
              <div className={styles.conditionCardInfo}>
                <h4>{c.name}</h4>
                <p>{c.description}</p>
                <span className={styles.medicineCount}>{c.medicines.length} medicines available</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTab === 'fda' && results.length > 0 && (
        <div className={styles.resultsList}>
          <div className={styles.resultsHeader}>{results.length} result{results.length !== 1 ? 's' : ''} found (FDA Database)</div>
          {results.map((drug, i) => (
            <div key={i} className={styles.resultCard} onClick={() => { setSelectedDrug(drug); setExpandedSections(new Set()); }}>
              <div className={styles.resultHeader}>
                <h3>{drug.brand_name}</h3>
                <span className={styles.generic}>{drug.generic_name}</span>
              </div>
              <div className={styles.resultMeta}>
                <span>🏭 {drug.manufacturer_name}</span>
                {drug.route.length > 0 && <span>💊 {drug.route.join(', ')}</span>}
              </div>
              <p className={styles.resultDesc}>{drug.description.substring(0, 180)}...</p>
              <span className={styles.viewMore}>View Full Details →</span>
            </div>
          ))}
        </div>
      )}

      {selectedDrug && (
        <div className={styles.detailCard}>
          <button className={styles.backBtn} onClick={() => setSelectedDrug(null)}>← Back to results</button>
          <div className={styles.detailHeader}>
            <h3>{selectedDrug.brand_name}</h3>
            <span className={styles.generic}>{selectedDrug.generic_name}</span>
          </div>

          {selectedDrug.boxed_warning && (
            <div className={styles.boxedWarning}>
              <strong>⚠ Boxed Warning:</strong> {selectedDrug.boxed_warning}
            </div>
          )}

          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Manufacturer</span>
              <span>{selectedDrug.manufacturer_name}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Substance</span>
              <span>{selectedDrug.substance_name}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Route</span>
              <span>{selectedDrug.route.join(', ') || 'N/A'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Supply Form</span>
              <span>{selectedDrug.how_supplied}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Storage</span>
              <span>{selectedDrug.storage}</span>
            </div>
          </div>

          {[
            { key: 'description', title: 'Description', content: selectedDrug.description },
            { key: 'indications', title: 'Indications & Usage', content: selectedDrug.indications },
            { key: 'dosage', title: 'Dosage & Administration', content: selectedDrug.dosage_and_administration },
            { key: 'warnings', title: 'Warnings', content: selectedDrug.warnings, warning: true },
            { key: 'precautions', title: 'Precautions', content: selectedDrug.precautions },
            { key: 'adverse', title: 'Adverse Reactions / Side Effects', content: selectedDrug.adverse_reactions },
            { key: 'interactions', title: 'Drug Interactions', content: selectedDrug.drug_interactions },
            { key: 'contraindications', title: 'Contraindications', content: selectedDrug.contraindications },
            { key: 'overdosage', title: 'Overdosage', content: selectedDrug.overdosage },
            { key: 'pregnancy', title: 'Pregnancy & Nursing', content: `Pregnancy: ${selectedDrug.pregnancy}\n\nNursing: ${selectedDrug.nursing}` },
            { key: 'clinical', title: 'Clinical Pharmacology', content: selectedDrug.clinical_pharmacology },
            { key: 'pediatric', title: 'Pediatric & Geriatric Use', content: `Pediatric: ${selectedDrug.pediatric_use}\n\nGeriatric: ${selectedDrug.geriatric_use}` },
          ].map(section => (
            <div key={section.key} className={`${styles.detailSection} ${section.warning ? styles.warningBox : ''}`}>
              <button className={styles.sectionToggle} onClick={() => toggleSection(section.key)}>
                <h4>{section.title}</h4>
                <span>{expandedSections.has(section.key) ? '−' : '+'}</span>
              </button>
              {expandedSections.has(section.key) && <p>{section.content}</p>}
            </div>
          ))}
        </div>
      )}

      <div className={styles.disclaimer}>
        Medicine suggestions are for informational purposes only. Always consult a qualified doctor before taking any medicine. Indian brand names may vary — verify with your pharmacist.
      </div>
    </section>
  );
}
