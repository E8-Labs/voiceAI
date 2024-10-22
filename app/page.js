'use client'
import MainHomeScreen from '@/components/homepage/MainHomeScreen';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Home() {


  return (
    <div className='w-full'>
      <MainHomeScreen />
    </div>
  );
}
