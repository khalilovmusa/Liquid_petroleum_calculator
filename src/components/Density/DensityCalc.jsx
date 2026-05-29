import { useState } from 'react';
import { calculateDensity } from '../../formulas/densityFormula';
import './DensityCalc.css'

const DensityCalc = () => {
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');

  const density = calculateDensity(mass, volume);

  return (
    <div className="density-container">
      <h2>Sıxlıq Kalkulatoru</h2>
      <div className="input-group">
        <label htmlFor="mass">Kütlə (m), kg</label>
        <input
          id="mass"
          type="number"
          placeholder="Kütləni daxil edin"
          value={mass}
          onChange={(e) => setMass(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="volume">Həcm (V), m³</label>
        <input
          id="volume"
          type="number"
          placeholder="Həcmi daxil edin"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <div className="result">
        Sıxlıq (ρ): <span>{density ? density.toFixed(4) : '—'} kg/m³</span>
      </div>
      {density ? (
         <div className={`status-box ${density >= 720 && density <= 775 ? 'accepted' : 'rejected'}`}>
            {density >= 720 && density <= 775 ? '✔ Buraxılan' : '✘ Buraxılmayan'}
         </div>
      ) : null}
    </div>
  );
};

export default DensityCalc;