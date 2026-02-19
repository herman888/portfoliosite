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
          width: 32,
          height: 32,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s',
          background: 'none',
        }}
      >
        {/* Drone SVG cursor */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{position: 'absolute', left: 0, top: 0}}>
          <circle cx="16" cy="16" r="8" fill="#bfa94c" />
          <rect x="4" y="15" width="8" height="2" rx="1" fill="#6366f1" />
          <rect x="20" y="15" width="8" height="2" rx="1" fill="#6366f1" />
          <rect x="15" y="4" width="2" height="8" rx="1" fill="#6366f1" />
          <rect x="15" y="20" width="2" height="8" rx="1" fill="#6366f1" />
          <circle cx="16" cy="16" r="3" fill="#fff" />
        </svg>
      </div>
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 48,
          height: 48,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s',
          background: 'none',
        }}
      >
        {/* Follower drone shadow */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{position: 'absolute', left: 0, top: 0}}>
          <ellipse cx="24" cy="24" rx="16" ry="8" fill="rgba(214,201,165,0.15)" />
        </svg>
      </div>
    </>
  );
};

export default AnimatedCursor;
