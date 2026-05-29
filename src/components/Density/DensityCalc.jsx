import { useState } from 'react';
import './DensityCalc.css';
import { calculateDensity } from '../../formulas/densityFormula';

const DensityCalc = () => {
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume);

    if (isNaN(m) || isNaN(v) || v <= 0) {
      setResult({ 
        error: true, 
        message: 'Zəhmət olmasa düzgün rəqəm daxil edin (həcm sıfırdan böyük olmalıdır).' 
      });
      return;
    }

    const densityValue = calculateDensity(m, v);
    const isAccepted = densityValue >= 720 && densityValue <= 775;

    setResult({
      error: false,
      mass: m,
      volume: v,
      density: densityValue,
      isAccepted
    });
  };

  const handleReset = () => {
    setMass('');
    setVolume('');
    setResult(null);
  };

  return (
    <div className="density-page">
      <div className="density-card">
        {/* Header */}
        <div className="density-header">
          <div className="density-icon">📏</div>
          <div>
            <h1 className="density-title">Sıxlıq Kalkulatoru</h1>
            <p className="density-subtitle">Yanacaq sıxlığının hesablanması və normativ yoxlaması</p>
          </div>
        </div>

        {/* Formula display */}
        <div className="density-formula-box">
          ρ = m / V (kg/m³)
        </div>

        {/* Inputs */}
        <div className="density-inputs">
          <div className="density-field">
            <label className="density-label">
              Kütlə (m)
              <span className="density-unit">kg</span>
            </label>
            <input
              className="density-input"
              type="number"
              placeholder="Məs: 750"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
              step="0.1"
            />
          </div>
          <div className="density-field">
            <label className="density-label">
              Həcm (V)
              <span className="density-unit">m³</span>
            </label>
            <input
              className="density-input"
              type="number"
              placeholder="Məs: 1"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              step="0.001"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="density-buttons">
          <button className="density-btn-calc" onClick={handleCalculate}>
            Hesabla
          </button>
          <button className="density-btn-reset" onClick={handleReset}>
            Sıfırla
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`density-result ${result.error ? 'result-error' : result.isAccepted ? 'result-pass' : 'result-fail'}`}>
            {result.error ? (
              <p className="result-message">{result.message}</p>
            ) : (
              <>
                <div className="result-icon">
                  {result.isAccepted ? '✅' : '❌'}
                </div>

                <div className="result-values">
                  ρ = <span className="result-density">{result.density.toFixed(4)}</span> kg/m³
                </div>

                <p className="result-message">
                  {result.isAccepted
                    ? 'Sıxlıq normativ aralığa uyğundur'
                    : 'Sıxlıq normativ aralığa uyğun deyil'}
                </p>

                <p className="result-note">
                  {result.isAccepted 
                    ? 'Yanacaq keyfiyyət göstəriciləri (720–775 kg/m³) daxilindədir.' 
                    : `Normativ aralıqdan kənarda (${result.density < 720 ? 'aşağı' : 'yuxarı'}).`}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DensityCalc;