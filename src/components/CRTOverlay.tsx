const CRTOverlay = () => {
  return (
    <>
      {/* Scanline effect */}
      <div className="crt-overlay" aria-hidden="true" />
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
};

export default CRTOverlay;
