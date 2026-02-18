"use client";

import React, { useEffect, useRef } from 'react';

const AnimatedCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
        followerRef.current.animate([
          { left: followerRef.current.style.left, top: followerRef.current.style.top },
          { left: e.clientX + 'px', top: e.clientY + 'px' }
        ], {
          duration: 300,
          fill: 'forwards',
          easing: 'ease-out'
        });
        followerRef.current.style.left = e.clientX + 'px';
        followerRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#d6c9a5', // beige
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s',
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(214,201,165,0.15)', // beige
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s',
        }}
      />
    </>
  );
};

export default AnimatedCursor;
