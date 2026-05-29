import { useState } from 'react';
import './OctaneCalc.css';
import { calculateOctane } from '../../formulas/octaneFormula';

const OctaneCalc = () => {
  const [measured, setMeasured] = useState('');
  const [norm, setNorm] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const meas = parseFloat(measured);
    const nrm = parseFloat(norm);

    if (isNaN(meas) || isNaN(nrm)) {
      setResult({ 
        error: true, 
        message: 'Zəhmət olmasa düzgün rəqəm daxil edin.' 
      });
      return;
    }

    const isAccepted = calculateOctane(meas, nrm);

    setResult({
      error: false,
      measured: meas,
      norm: nrm,
      isAccepted
    });
  };

  const handleReset = () => {
    setMeasured('');
    setNorm('');
    setResult(null);
  };

  return (
    <div className="octane-page">
      <div className="octane-card">
        {/* Header */}
        <div className="octane-header">
          <div className="octane-icon">⛽</div>
          <div>
            <h1 className="octane-title">Oktan Ədədi Müqayisəsi</h1>
            <p className="octane-subtitle">Yanacaq keyfiyyətinin detonasiya dayanıqlığı yoxlaması</p>
          </div>
        </div>

        {/* Formula display */}
        <div className="octane-formula-box">
          ON<sub>ölç</sub> ≥ ON<sub>norm</sub>
        </div>

        {/* Inputs */}
        <div className="octane-inputs">
          <div className="octane-field">
            <label className="octane-label">
              Ölçülmüş oktan ədədi (ON)
              <span className="octane-unit">ON</span>
            </label>
            <input
              className="octane-input"
              type="number"
              placeholder="Məs: 95.8"
              value={measured}
              onChange={(e) => setMeasured(e.target.value)}
              step="0.1"
            />
          </div>
          <div className="octane-field">
            <label className="octane-label">
              Normativ hədd (ON_norm)
              <span className="octane-unit">ON</span>
            </label>
            <input
              className="octane-input"
              type="number"
              placeholder="Məs: 95"
              value={norm}
              onChange={(e) => setNorm(e.target.value)}
              step="0.1"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="octane-buttons">
          <button className="octane-btn-calc" onClick={handleCalculate}>
            Hesabla
          </button>
          <button className="octane-btn-reset" onClick={handleReset}>
            Sıfırla
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`octane-result ${result.error ? 'result-error' : result.isAccepted ? 'result-pass' : 'result-fail'}`}>
            {result.error ? (
              <p className="result-message">{result.message}</p>
            ) : (
              <>
                <div className="result-icon">
                  {result.isAccepted ? '✅' : '❌'}
                </div>

                <div className="result-values">
                  <span>ON = <strong>{result.measured.toFixed(1)}</strong></span>
                  <span className="result-op">{result.isAccepted ? '≥' : '<'}</span>
                  <span>ON_norm = <strong>{result.norm.toFixed(1)}</strong></span>
                </div>

                <p className="result-message">
                  {result.isAccepted
                    ? 'Yanacaq detonasiya dayanıqlığı baxımından standartın tələblərinə cavab verir'
                    : 'Yanacaq detonasiya dayanıqlığı baxımından standartın tələblərinə cavab vermir'}
                </p>

                <p className="result-note">
                  {result.isAccepted 
                    ? 'Oktan ədədi normativ tələblərə uyğundur.' 
                    : `Normativdən ${Math.abs(result.measured - result.norm).toFixed(1)} bənd aşağıdır.`}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OctaneCalc;