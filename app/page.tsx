'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Doctors from '@/components/Doctors';
import Booking from '@/components/Booking';
import MedicineSearch from '@/components/MedicineSearch';
import HospitalFinder from '@/components/HospitalFinder';
import Prescriptions from '@/components/Prescriptions';
import MyBookings from '@/components/MyBookings';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <Hero />
      <Doctors onSelectDoctor={setSelectedDoctor} />
      <Booking selectedDoctor={selectedDoctor} />
      <MedicineSearch />
      <HospitalFinder />
      <Prescriptions />
      <MyBookings />
      <HowItWorks />
      <Footer />
    </>
  );
}
