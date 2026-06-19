import React from 'react';

export function Atmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[40] bg-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 z-[41] bg-vignette" />
      <div className="pointer-events-none fixed inset-0 z-[50] bg-noise" />
    </>
  );
}
