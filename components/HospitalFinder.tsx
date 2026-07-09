'use client';

import { useState, useMemo } from 'react';
import styles from './HospitalFinder.module.css';

const hospitals = [
  // JHARKHAND
  { name: 'Tata Main Hospital (TMH)', city: 'Jamshedpur', state: 'Jharkhand', type: 'Private', specialty: 'Multi-specialty', beds: 1000, emergency: true, phone: '0657-6641012', emergencyPhone: '0657-6644444', ambulance: '0657-6644444', address: 'C Road West, Northern Town, Bistupur, Jamshedpur - 831001', website: 'https://www.tatamainhospital.com', established: 1908, featured: true, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Urology', 'Nephrology', 'Gastroenterology', 'ENT', 'Ophthalmology', 'Dermatology', 'Psychiatry', 'Emergency Medicine'] },
  { name: 'Tata Motors Hospital', city: 'Jamshedpur', state: 'Jharkhand', type: 'Private', specialty: 'Multi-specialty', beds: 404, emergency: true, phone: '0657-6647070', emergencyPhone: '0657-6647070', ambulance: '0657-6647070', address: 'Telco Colony, Jamshedpur - 831004', website: 'https://jsrhospital.tatamotors.com', established: 1965, featured: true, departments: ['General Medicine', 'General Surgery', 'ENT', 'Obstetrics & Gynaecology', 'Orthopedics', 'Anaesthesia', 'Pediatrics'] },
  { name: 'Brahmananda Narayana Hrudayalaya', city: 'Jamshedpur', state: 'Jharkhand', type: 'Private', specialty: 'Cardiology', beds: 120, emergency: true, phone: '0657-6641234', emergencyPhone: '0657-6641234', ambulance: '0657-6641234', address: 'Tamolia, Near Pardih Chowk, NH-33, Jamshedpur', website: '', established: 2005, featured: true, departments: ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'] },
  { name: 'Meherbai Tata Memorial Hospital', city: 'Jamshedpur', state: 'Jharkhand', type: 'Private', specialty: 'Oncology', beds: 100, emergency: true, phone: '0657-6643710', emergencyPhone: '0657-6643710', ambulance: '0657-6643710', address: 'Stocking Road, Northern Town, Bistupur, Jamshedpur - 831001', website: '', established: 1930, featured: true, departments: ['Oncology', 'General Medicine', 'Surgery', 'Palliative Care'] },
  { name: 'Rajendra Institute of Medical Sciences (RIMS)', city: 'Ranchi', state: 'Jharkhand', type: 'Government', specialty: 'Multi-specialty', beds: 1200, emergency: true, phone: '+91-651-2541533', emergencyPhone: '+91-651-2544471', ambulance: '+91-651-2547260', address: 'Bariatu, Ranchi - 834009', website: 'https://rimsranchi.ac.in', established: 1960, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Nephrology', 'Gastroenterology', 'Trauma & Emergency'] },
  { name: 'Bhagwan Mahavir Medica Superspecialty Hospital', city: 'Ranchi', state: 'Jharkhand', type: 'Private', specialty: 'Multi-specialty', beds: 300, emergency: true, phone: '+91-651-2545456', emergencyPhone: '+91-651-2545456', ambulance: '+91-651-2545456', address: 'Near Bariatu Road, Jai Prakash Nagar, Ranchi - 834009', website: '', established: 2000, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Nephrology', 'Urology', 'Critical Care'] },
  { name: 'Medanta Hospital', city: 'Ranchi', state: 'Jharkhand', type: 'Private', specialty: 'Multi-specialty', beds: 200, emergency: true, phone: '+91-651-2555555', emergencyPhone: '+91-651-2555555', ambulance: '+91-651-2555555', address: 'NH-33, IRBA, Ormanjhi, Ranchi - 835217', website: '', established: 2019, departments: ['Cardiology', 'Orthopedics', 'Neurology', 'Oncology', 'Emergency Medicine'] },
  { name: 'HCG Abdur Razzaque Ansari Cancer Hospital', city: 'Ranchi', state: 'Jharkhand', type: 'Private', specialty: 'Oncology', beds: 150, emergency: true, phone: '+91-651-3505050', emergencyPhone: '+91-651-3505050', ambulance: '+91-651-3505050', address: 'NH-33, Irba, Ranchi - 835217', website: '', established: 1980, departments: ['Surgical Oncology', 'Medical Oncology', 'Radiation Oncology', 'Palliative Care'] },
  { name: 'Orchid Medical Centre', city: 'Ranchi', state: 'Jharkhand', type: 'Private', specialty: 'Multi-specialty', beds: 200, emergency: true, phone: '091171 00100', emergencyPhone: '091171 00100', ambulance: '091171 00100', address: 'H.B. Road, Near Lalpur Thana, Ranchi - 834001', website: '', established: 2005, departments: ['Cardiology', 'Orthopedics', 'Neurology', 'Gastroenterology', 'Nephrology'] },
  { name: 'Ranchi Sadar Hospital', city: 'Ranchi', state: 'Jharkhand', type: 'Government', specialty: 'General', beds: 200, emergency: true, phone: '+91-651-2200043', emergencyPhone: '+91-651-2200043', ambulance: '108', address: 'Kankuspuria, Purulia Road, Ranchi - 834001', website: '', established: 1950, departments: ['General Medicine', 'Surgery', 'Obstetrics & Gynaecology', 'Pediatrics'] },
  { name: 'Dhanbad Medical College & Hospital', city: 'Dhanbad', state: 'Jharkhand', type: 'Government', specialty: 'Multi-specialty', beds: 500, emergency: true, phone: '+91-326-2300001', emergencyPhone: '+91-326-2300001', ambulance: '108', address: 'Dhanbad - 828103', website: '', established: 1960, departments: ['General Medicine', 'Surgery', 'Orthopedics', 'Obstetrics & Gynaecology', 'Pediatrics'] },
  { name: 'Patliputra Medical College & Hospital', city: 'Dhanbad', state: 'Jharkhand', type: 'Government', specialty: 'Multi-specialty', beds: 600, emergency: true, phone: '+91-326-2200001', emergencyPhone: '+91-326-2200001', ambulance: '108', address: 'Kolar Road, Dhanbad - 828108', website: '', established: 1960, departments: ['General Medicine', 'Surgery', 'Orthopedics', 'Cardiology', 'Neurology'] },

  // DELHI
  { name: 'AIIMS Delhi', city: 'New Delhi', state: 'Delhi', type: 'Government', specialty: 'Multi-specialty', beds: 2000, emergency: true, phone: '+91-11-26588500', emergencyPhone: '+91-11-26588500', ambulance: '108', address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029', website: 'https://www.aiims.edu', established: 1956, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Super Speciality'] },
  { name: 'Safdarjung Hospital', city: 'New Delhi', state: 'Delhi', type: 'Government', specialty: 'Multi-specialty', beds: 1500, emergency: true, phone: '+91-11-26707329', emergencyPhone: '+91-11-26707329', ambulance: '108', address: 'Ansari Nagar West, New Delhi - 110029', website: '', established: 1942, departments: ['General Medicine', 'Surgery', 'Cardiology', 'Neurology', 'Orthopedics', 'Emergency Medicine'] },
  { name: 'Sir Ganga Ram Hospital', city: 'New Delhi', state: 'Delhi', type: 'Private', specialty: 'Multi-specialty', beds: 650, emergency: true, phone: '+91-11-25861313', emergencyPhone: '+91-11-25861313', ambulance: '+91-11-25861313', address: 'Rajinder Nagar, New Delhi - 110060', website: 'https://www.sgrh.com', established: 1921, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Nephrology', 'Gastroenterology'] },
  { name: 'Max Super Speciality Hospital Saket', city: 'New Delhi', state: 'Delhi', type: 'Private', specialty: 'Multi-specialty', beds: 500, emergency: true, phone: '+91-11-26515050', emergencyPhone: '+91-11-26515050', ambulance: '+91-11-26515050', address: '1 Press Enclave Road, Mandi Village, Saket, New Delhi - 110017', website: 'https://www.maxhealthcare.in', established: 2000, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Urology', 'Nephrology'] },

  // MAHARASHTRA
  { name: 'Breach Candy Hospital', city: 'Mumbai', state: 'Maharashtra', type: 'Private', specialty: 'Multi-specialty', beds: 300, emergency: true, phone: '+91-22-23667788', emergencyPhone: '+91-22-23667788', ambulance: '+91-22-23667788', address: '60A, Bhulabhai Desai Road, Mumbai - 400026', website: 'https://www.breachcandyhospital.org', established: 1946, departments: ['Cardiology', 'Orthopedics', 'Neurology', 'Gastroenterology', 'Emergency Medicine'] },
  { name: 'Kokilaben Dhirubhai Ambani Hospital', city: 'Mumbai', state: 'Maharashtra', type: 'Private', specialty: 'Multi-specialty', beds: 340, emergency: true, phone: '+91-22-42696969', emergencyPhone: '+91-22-42696969', ambulance: '+91-22-42696969', address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai - 400053', website: 'https://www.kokilabenhospital.com', established: 2009, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Urology'] },
  { name: 'Tata Memorial Hospital', city: 'Mumbai', state: 'Maharashtra', type: 'Government', specialty: 'Oncology', beds: 600, emergency: true, phone: '+91-22-24177000', emergencyPhone: '+91-22-24177000', ambulance: '108', address: 'Dr E Borges Road, Parel, Mumbai - 400012', website: 'https://www.tmc.gov.in', established: 1941, departments: ['Surgical Oncology', 'Medical Oncology', 'Radiation Oncology', 'Preventive Oncology'] },

  // TAMIL NADU
  { name: 'Apollo Hospital Chennai', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', specialty: 'Multi-specialty', beds: 550, emergency: true, phone: '+91-44-28293333', emergencyPhone: '+91-44-28293333', ambulance: '+91-44-28298282', address: '21 Greams Road, Thousand Lights, Chennai - 600006', website: 'https://www.apollohospitals.com', established: 1983, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Transplant'] },
  { name: 'Christian Medical College (CMC)', city: 'Vellore', state: 'Tamil Nadu', type: 'Private', specialty: 'Multi-specialty', beds: 2000, emergency: true, phone: '+91-416-2225533', emergencyPhone: '+91-416-2225533', ambulance: '108', address: 'CMC Campus, Vellore - 632004', website: 'https://www.cmch-vellore.edu', established: 1900, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Super Speciality'] },
  { name: 'Sri Ramachandra Medical Centre', city: 'Chennai', state: 'Tamil Nadu', type: 'Private', specialty: 'Multi-specialty', beds: 800, emergency: true, phone: '+91-44-24768027', emergencyPhone: '+91-44-24768027', ambulance: '+91-44-24768027', address: '1 Ramachandra Nagar, Porur, Chennai - 600116', website: 'https://www.srmc.in', established: 1985, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Urology', 'Nephrology'] },

  // KARNATAKA
  { name: 'Narayana Health City', city: 'Bengaluru', state: 'Karnataka', type: 'Private', specialty: 'Multi-specialty', beds: 600, emergency: true, phone: '+91-80-71222222', emergencyPhone: '+91-80-71222222', ambulance: '+91-80-71222222', address: '258/A Bommasandra Industrial Area, Anekal Taluk, Bengaluru - 560105', website: 'https://www.narayanhealth.org', established: 2000, departments: ['Cardiology', 'Cardiac Surgery', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Transplant'] },
  { name: 'Manipal Hospital', city: 'Bengaluru', state: 'Karnataka', type: 'Private', specialty: 'Multi-specialty', beds: 650, emergency: true, phone: '+91-80-25024444', emergencyPhone: '+91-80-25024444', ambulance: '+91-80-25024444', address: '98 HAL Airport Road, Kodihalli, Bengaluru - 560017', website: 'https://www.manipalhospitals.com', established: 1991, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Gastroenterology', 'Nephrology'] },

  // WEST BENGAL
  { name: 'Apollo Gleneagles Hospital', city: 'Kolkata', state: 'West Bengal', type: 'Private', specialty: 'Multi-specialty', beds: 400, emergency: true, phone: '+91-33-23203040', emergencyPhone: '+91-33-23203040', ambulance: '+91-33-23203040', address: '58 Canal Circular Road, Kadapara, Kolkata - 700054', website: 'https://www.apollohospitals.com', established: 2003, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology'] },
  { name: 'AMRI Hospital Salt Lake', city: 'Kolkata', state: 'West Bengal', type: 'Private', specialty: 'Multi-specialty', beds: 350, emergency: true, phone: '+91-33-23350505', emergencyPhone: '+91-33-23350505', ambulance: '+91-33-23350505', address: 'JC-16 & 17, Salt Lake City, Kolkata - 700091', website: '', established: 2000, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Nephrology'] },

  // BIHAR
  { name: 'AIIMS Patna', city: 'Patna', state: 'Bihar', type: 'Government', specialty: 'Multi-specialty', beds: 750, emergency: true, phone: '+91-612-2451051', emergencyPhone: '+91-612-2451051', ambulance: '108', address: 'Phulwari Sharif, Patna - 801507', website: 'https://aiimspatna.org', established: 2012, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Trauma & Emergency'] },
  { name: 'Narayan Medical Centre', city: 'Patna', state: 'Bihar', type: 'Private', specialty: 'Multi-specialty', beds: 300, emergency: true, phone: '+91-612-2345678', emergencyPhone: '+91-612-2345678', ambulance: '108', address: 'Kankarbagh, Patna - 800020', website: '', established: 2005, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Surgery'] },

  // PUNJAB
  { name: 'PGIMER Chandigarh', city: 'Chandigarh', state: 'Punjab', type: 'Government', specialty: 'Multi-specialty', beds: 1500, emergency: true, phone: '+91-172-2747585', emergencyPhone: '+91-172-2747585', ambulance: '108', address: 'Sector 12, Chandigarh - 160012', website: 'https://pgimer.ac.in', established: 1962, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Transplant', 'Trauma & Emergency'] },

  // UTTAR PRADESH
  { name: 'Sanjay Gandhi Postgraduate Institute', city: 'Lucknow', state: 'Uttar Pradesh', type: 'Government', specialty: 'Multi-specialty', beds: 900, emergency: true, phone: '+91-522-2668700', emergencyPhone: '+91-522-2668700', ambulance: '108', address: 'Raebareli Road, Lucknow - 226014', website: 'https://sgpgi.ac.in', established: 1983, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Transplant'] },

  // GUJARAT
  { name: 'Sterling Hospital', city: 'Ahmedabad', state: 'Gujarat', type: 'Private', specialty: 'Multi-specialty', beds: 400, emergency: true, phone: '+91-79-40464444', emergencyPhone: '+91-79-40464444', ambulance: '+91-79-40464444', address: 'Off Gurukul Road, Memnagar, Ahmedabad - 380052', website: '', established: 2005, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology'] },

  // KERALA
  { name: 'Amrita Institute of Medical Sciences', city: 'Kochi', state: 'Kerala', type: 'Private', specialty: 'Multi-specialty', beds: 700, emergency: true, phone: '+91-484-2851234', emergencyPhone: '+91-484-2851234', ambulance: '+91-484-2851234', address: 'Ponekkara P.O., Edappally, Kochi - 682041', website: 'https://www.amritahospitals.org', established: 1998, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Transplant'] },

  // ODISHA
  { name: 'AIIMS Bhubaneswar', city: 'Bhubaneswar', state: 'Odisha', type: 'Government', specialty: 'Multi-specialty', beds: 1000, emergency: true, phone: '+91-674-2472855', emergencyPhone: '+91-674-2472855', ambulance: '108', address: 'Sijua, Bhubaneswar - 751019', website: 'https://aiimsbhubaneswar.gov.in', established: 2012, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Trauma & Emergency'] },

  // RAJASTHAN
  { name: 'Sawai Man Singh Hospital', city: 'Jaipur', state: 'Rajasthan', type: 'Government', specialty: 'Multi-specialty', beds: 1200, emergency: true, phone: '+91-141-2560291', emergencyPhone: '+91-141-2560291', ambulance: '108', address: 'JLN Marg, Jaipur - 302004', website: 'https://smsjaipur.nic.in', established: 1938, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology', 'Trauma & Emergency'] },

  // ANDHRA PRADESH
  { name: 'Apollo Hospital Hyderabad', city: 'Hyderabad', state: 'Andhra Pradesh', type: 'Private', specialty: 'Multi-specialty', beds: 500, emergency: true, phone: '+91-40-23551000', emergencyPhone: '+91-40-23551000', ambulance: '+91-40-23551000', address: 'Jubilee Hills, Hyderabad - 500033', website: 'https://www.apollohospitals.com', established: 1988, departments: ['Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Nephrology', 'Gastroenterology'] },
];

const allStates = Array.from(new Set(hospitals.map(h => h.state))).sort();
const allTypes = Array.from(new Set(hospitals.map(h => h.type))).sort();

export default function HospitalFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(null);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);

  const citiesInState = useMemo(() => {
    if (!selectedState) return Array.from(new Set(hospitals.map(h => h.city))).sort();
    return Array.from(new Set(hospitals.filter(h => h.state === selectedState).map(h => h.city))).sort();
  }, [selectedState]);

  const filtered = useMemo(() => {
    return hospitals.filter(h => {
      if (searchQuery && !h.name.toLowerCase().includes(searchQuery.toLowerCase()) && !h.city.toLowerCase().includes(searchQuery.toLowerCase()) && !h.state.toLowerCase().includes(searchQuery.toLowerCase()) && !h.specialty.toLowerCase().includes(searchQuery.toLowerCase()) && !h.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedState && h.state !== selectedState) return false;
      if (selectedCity && h.city !== selectedCity) return false;
      if (selectedType && h.type !== selectedType) return false;
      if (showEmergencyOnly && !h.emergency) return false;
      return true;
    });
  }, [searchQuery, selectedState, selectedCity, selectedType, showEmergencyOnly]);

  const featuredHospitals = filtered.filter(h => h.featured);
  const otherHospitals = filtered.filter(h => !h.featured);

  return (
    <section className={styles.section} id="hospitals">
      <div className={styles.sectionHead}>
        <div>
          <span className={styles.entryNo}>Entry no. 004 — Hospital Directory</span>
          <h2 className={styles.h2}>Find hospitals across India.</h2>
        </div>
        <p>Filter by state, city, hospital type, and view detailed information including departments, beds, contact numbers, and emergency services.</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          <input
            className={styles.textInput}
            type="text"
            placeholder="Search by name, city, specialty, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className={styles.selectInput} value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(''); }}>
            <option value="">All States</option>
            {allStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className={styles.selectInput} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">All Cities</option>
            {citiesInState.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={styles.selectInput} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">All Types</option>
            {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={showEmergencyOnly} onChange={(e) => setShowEmergencyOnly(e.target.checked)} />
            Emergency Only
          </label>
        </div>
      </div>

      <div className={styles.statsBar}>
        <span>{filtered.length} hospital{filtered.length !== 1 ? 's' : ''} found</span>
        <button className={styles.clearBtn} onClick={() => { setSearchQuery(''); setSelectedState(''); setSelectedCity(''); setSelectedType(''); setShowEmergencyOnly(false); }}>Clear Filters</button>
      </div>

      {selectedHospital && (
        <div className={styles.detailView}>
          <button className={styles.backBtn} onClick={() => setSelectedHospital(null)}>← Back to list</button>
          {selectedHospital.featured && <span className={styles.featuredBadge}>⭐ Featured Jharkhand Hospital</span>}
          <h3 className={styles.detailName}>{selectedHospital.name}</h3>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location</span>
              <span>{selectedHospital.city}, {selectedHospital.state}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Type</span>
              <span>{selectedHospital.type}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Specialty</span>
              <span>{selectedHospital.specialty}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Beds</span>
              <span>{selectedHospital.beds}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Established</span>
              <span>{selectedHospital.established}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Emergency</span>
              <span>{selectedHospital.emergency ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className={styles.contactSection}>
            <h4>Contact Information</h4>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>📞 Phone</span>
                <a href={`tel:${selectedHospital.phone}`}>{selectedHospital.phone}</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>🚨 Emergency</span>
                <a href={`tel:${selectedHospital.emergencyPhone}`}>{selectedHospital.emergencyPhone}</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>🚑 Ambulance</span>
                <a href={`tel:${selectedHospital.ambulance}`}>{selectedHospital.ambulance}</a>
              </div>
              {selectedHospital.website && (
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>🌐 Website</span>
                  <a href={selectedHospital.website} target="_blank" rel="noopener noreferrer">{selectedHospital.website}</a>
                </div>
              )}
            </div>
          </div>

          <div className={styles.addressSection}>
            <h4>📍 Address</h4>
            <p>{selectedHospital.address}</p>
          </div>

          <div className={styles.deptSection}>
            <h4>Departments</h4>
            <div className={styles.deptGrid}>
              {selectedHospital.departments.map(d => (
                <span key={d} className={styles.deptTag}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {!selectedHospital && (
        <>
          {featuredHospitals.length > 0 && (
            <div className={styles.featuredSection}>
              <h3 className={styles.featuredTitle}>⭐ Jharkhand Hospitals</h3>
              <div className={styles.grid}>
                {featuredHospitals.map(h => (
                  <div key={h.name} className={`${styles.card} ${styles.featured}`} onClick={() => setSelectedHospital(h)}>
                    <span className={styles.featuredBadge}>Featured</span>
                    <h4>{h.name}</h4>
                    <div className={styles.meta}>
                      <span>📍 {h.city}, {h.state}</span>
                      <span>🏥 {h.type}</span>
                      <span>🛏 {h.beds} beds</span>
                    </div>
                    <span className={styles.specialty}>{h.specialty}</span>
                    <div className={styles.deptTags}>
                      {h.departments.slice(0, 4).map(d => <span key={d} className={styles.deptTag}>{d}</span>)}
                      {h.departments.length > 4 && <span className={styles.deptTag}>+{h.departments.length - 4} more</span>}
                    </div>
                    <div className={styles.cardFooter}>
                      <a href={`tel:${h.phone}`} className={styles.callBtn} onClick={(e) => e.stopPropagation()}>📞 Call</a>
                      {h.emergency && <a href={`tel:${h.emergencyPhone}`} className={styles.emergencyBtn} onClick={(e) => e.stopPropagation()}>🚨 Emergency</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {otherHospitals.length > 0 && (
            <div className={styles.allSection}>
              {featuredHospitals.length > 0 && <h3 className={styles.sectionTitle}>All India Hospitals</h3>}
              <div className={styles.grid}>
                {otherHospitals.map(h => (
                  <div key={h.name} className={styles.card} onClick={() => setSelectedHospital(h)}>
                    <h4>{h.name}</h4>
                    <div className={styles.meta}>
                      <span>📍 {h.city}, {h.state}</span>
                      <span>🏥 {h.type}</span>
                      <span>🛏 {h.beds} beds</span>
                    </div>
                    <span className={styles.specialty}>{h.specialty}</span>
                    <div className={styles.deptTags}>
                      {h.departments.slice(0, 4).map(d => <span key={d} className={styles.deptTag}>{d}</span>)}
                      {h.departments.length > 4 && <span className={styles.deptTag}>+{h.departments.length - 4} more</span>}
                    </div>
                    <div className={styles.cardFooter}>
                      <a href={`tel:${h.phone}`} className={styles.callBtn} onClick={(e) => e.stopPropagation()}>📞 Call</a>
                      {h.emergency && <a href={`tel:${h.emergencyPhone}`} className={styles.emergencyBtn} onClick={(e) => e.stopPropagation()}>🚨 Emergency</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className={styles.disclaimer}>
        Data sourced from verified hospital directories. Always call ahead to confirm availability, OPD timings, and appointment requirements.
      </div>
    </section>
  );
}
