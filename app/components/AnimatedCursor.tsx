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
          width: 40,
          height: 40,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          background: 'none',
        }}
      >
        {/* Drone SVG cursor */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{position: 'absolute', left: 0, top: 0}}>
          {/* Central body */}
          <ellipse cx="20" cy="20" rx="7" ry="7" fill="#bfa94c" />
          {/* Arms */}
          <rect x="19" y="2" width="2" height="12" rx="1" fill="#6366f1" />
          <rect x="19" y="26" width="2" height="12" rx="1" fill="#6366f1" />
          <rect x="2" y="19" width="12" height="2" rx="1" fill="#6366f1" />
          <rect x="26" y="19" width="12" height="2" rx="1" fill="#6366f1" />
          {/* Propellers */}
          <ellipse cx="20" cy="6" rx="3" ry="1.5" fill="#6366f1" />
          <ellipse cx="20" cy="34" rx="3" ry="1.5" fill="#6366f1" />
          <ellipse cx="6" cy="20" rx="1.5" ry="3" fill="#6366f1" />
          <ellipse cx="34" cy="20" rx="1.5" ry="3" fill="#6366f1" />
          {/* Center highlight */}
          <circle cx="20" cy="20" r="3" fill="#fff" />
        </svg>
      </div>
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 60,
          height: 60,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          background: 'none',
        }}
      >
        {/* Follower drone shadow */}
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{position: 'absolute', left: 0, top: 0}}>
          <ellipse cx="30" cy="30" rx="20" ry="10" fill="rgba(214,201,165,0.15)" />
        </svg>
      </div>
    </>
  );
};

export default AnimatedCursor;
