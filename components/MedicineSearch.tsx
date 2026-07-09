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

const medicineCategories = [
  { name: 'Pain Relief', drugs: ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Diclofenac', 'Naproxen'] },
  { name: 'Antibiotics', drugs: ['Amoxicillin', 'Azithromycin', 'Ciprofloxacin', 'Doxycycline', 'Metronidazole'] },
  { name: 'Diabetes', drugs: ['Metformin', 'Glimepiride', 'Gliclazide', 'Insulin', 'Sitagliptin'] },
  { name: 'Blood Pressure', drugs: ['Amlodipine', 'Losartan', 'Atenolol', 'Enalapril', 'Hydrochlorothiazide'] },
  { name: 'Gastric', drugs: ['Omeprazole', 'Pantoprazole', 'Ranitidine', 'Esomeprazole', 'Domperidone'] },
  { name: 'Allergy', drugs: ['Cetirizine', 'Loratadine', 'Levocetirizine', 'Fexofenadine', 'Montelukast'] },
  { name: 'Vitamins', drugs: ['Vitamin D', 'Vitamin B12', 'Vitamin C', 'Calcium', 'Iron'] },
  { name: 'Antifungal', drugs: ['Fluconazole', 'Terbinafine', 'Ketoconazole', 'Clotrimazole'] },
];

const popularDrugs = [
  'Paracetamol', 'Amoxicillin', 'Metformin', 'Omeprazole', 'Cetirizine',
  'Azithromycin', 'Ibuprofen', 'Amlodipine', 'Pantoprazole', 'Losartan',
  'Dolo 650', 'Crocin', 'Dolo', 'Combiflam', 'Azee', 'Augmentin',
  'Gudcef CV', 'Pan D', 'Rantac', 'Montair LC', 'Telekast F',
  'Glycomet GP', 'Glycomet', 'Stamlo', 'Telma', 'Telma H',
  'Shelcal 500', 'Neurobion', 'Becosules', 'Supradyn', 'Revital',
];

export default function MedicineSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DrugResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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

  const searchMedicine = async (q?: string) => {
    const searchTerm = q || query;
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    setSelectedDrug(null);

    try {
      const res = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(searchTerm)}&limit=5`
      );
      const data = await res.json();

      if (data.error) {
        const res2 = await fetch(
          `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${encodeURIComponent(searchTerm)}&limit=5`
        );
        const data2 = await res2.json();
        if (data2.error) {
          setError(`No results found for "${searchTerm}". Try a different name — e.g. Paracetamol, Amoxicillin, Dolo.`);
        } else {
          setResults(data2.results.map(mapDrug));
        }
      } else {
        setResults(data.results.map(mapDrug));
      }
    } catch {
      setError('Failed to fetch data. Please check your internet connection.');
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
          <h2 className={styles.h2}>Search any medicine, powered by FDA data.</h2>
        </div>
        <p>Look up drug information, dosage, side effects, interactions, and manufacturer details from the US FDA open database — free and instant.</p>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search medicine — e.g. Paracetamol, Amoxicillin, Dolo 650, Combiflam..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMedicine()}
        />
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => searchMedicine()} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.categories}>
        <span className={styles.catLabel}>Categories:</span>
        <div className={styles.catTags}>
          {medicineCategories.map(cat => (
            <button
              key={cat.name}
              className={`${styles.catTag} ${selectedCategory === cat.name ? styles.catTagActive : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className={styles.categoryDrugs}>
          <span className={styles.catDrugsLabel}>{selectedCategory}:</span>
          <div className={styles.popularDrugs}>
            {medicineCategories.find(c => c.name === selectedCategory)?.drugs.map(d => (
              <button key={d} className={styles.popularBtn} onClick={() => { setQuery(d); searchMedicine(d); setSelectedCategory(''); }}>{d}</button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.popular}>
        <span className={styles.popularLabel}>Popular in India:</span>
        <div className={styles.popularDrugs}>
          {popularDrugs.map((p) => (
            <button key={p} className={styles.popularBtn} onClick={() => { setQuery(p); searchMedicine(p); }}>{p}</button>
          ))}
        </div>
      </div>

      {!selectedDrug && results.length > 0 && (
        <div className={styles.resultsList}>
          <div className={styles.resultsHeader}>{results.length} result{results.length !== 1 ? 's' : ''} found</div>
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
              <div className={styles.resultActions}>
                <span className={styles.viewMore}>View Full Details →</span>
              </div>
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

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('description')}>
              <h4>Description</h4>
              <span>{expandedSections.has('description') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('description') && <p>{selectedDrug.description}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('indications')}>
              <h4>Indications &amp; Usage</h4>
              <span>{expandedSections.has('indications') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('indications') && <p>{selectedDrug.indications}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('dosage')}>
              <h4>Dosage &amp; Administration</h4>
              <span>{expandedSections.has('dosage') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('dosage') && <p>{selectedDrug.dosage_and_administration}</p>}
          </div>

          <div className={`${styles.detailSection} ${styles.warningBox}`}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('warnings')}>
              <h4>Warnings</h4>
              <span>{expandedSections.has('warnings') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('warnings') && <p>{selectedDrug.warnings}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('precautions')}>
              <h4>Precautions</h4>
              <span>{expandedSections.has('precautions') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('precautions') && <p>{selectedDrug.precautions}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('adverse')}>
              <h4>Adverse Reactions / Side Effects</h4>
              <span>{expandedSections.has('adverse') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('adverse') && <p>{selectedDrug.adverse_reactions}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('interactions')}>
              <h4>Drug Interactions</h4>
              <span>{expandedSections.has('interactions') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('interactions') && <p>{selectedDrug.drug_interactions}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('contraindications')}>
              <h4>Contraindications</h4>
              <span>{expandedSections.has('contraindications') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('contraindications') && <p>{selectedDrug.contraindications}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('overdosage')}>
              <h4>Overdosage</h4>
              <span>{expandedSections.has('overdosage') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('overdosage') && <p>{selectedDrug.overdosage}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('pregnancy')}>
              <h4>Pregnancy &amp; Nursing</h4>
              <span>{expandedSections.has('pregnancy') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('pregnancy') && (
              <>
                <p><strong>Pregnancy:</strong> {selectedDrug.pregnancy}</p>
                <p><strong>Nursing:</strong> {selectedDrug.nursing}</p>
              </>
            )}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('clinical')}>
              <h4>Clinical Pharmacology</h4>
              <span>{expandedSections.has('clinical') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('clinical') && <p>{selectedDrug.clinical_pharmacology}</p>}
          </div>

          <div className={styles.detailSection}>
            <button className={styles.sectionToggle} onClick={() => toggleSection('pediatric')}>
              <h4>Pediatric &amp; Geriatric Use</h4>
              <span>{expandedSections.has('pediatric') ? '−' : '+'}</span>
            </button>
            {expandedSections.has('pediatric') && (
              <>
                <p><strong>Pediatric:</strong> {selectedDrug.pediatric_use}</p>
                <p><strong>Geriatric:</strong> {selectedDrug.geriatric_use}</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className={styles.disclaimer}>
        Data sourced from openFDA. Not for clinical use. Always consult a qualified doctor before taking any medicine. Indian brand names may vary — verify with your pharmacist.
      </div>
    </section>
  );
}
