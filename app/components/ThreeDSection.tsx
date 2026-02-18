"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const Scene = dynamic(() => import('./ThreeDScene'), { ssr: false });

const ThreeDSection: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] bg-gradient-to-br from-indigo-100 to-indigo-300 dark:from-gray-900 dark:to-indigo-900 flex items-center justify-center">
      <Scene />
    </div>
  );
};

export default ThreeDSection;
