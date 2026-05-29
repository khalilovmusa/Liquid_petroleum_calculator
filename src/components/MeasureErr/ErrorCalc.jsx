import { useState } from 'react';
import './ErrorCalc.css';
import { calculateError } from '../../formulas/errorFormula';

const ErrorCalc = () => {
  const [measured, setMeasured] = useState('');
  const [norm, setNorm] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const meas = parseFloat(measured);
    const nrm = parseFloat(norm);

    if (isNaN(meas) || isNaN(nrm) || nrm === 0) {
      setResult({ 
        error: true, 
        message: 'Zəhmət olmasa düzgün rəqəm daxil edin (normativ sıfır ola bilməz).' 
      });
      return;
    }

    const errorValue = calculateError(meas, nrm);
    const isAccepted = errorValue <= 5;

    setResult({
      error: false,
      measured: meas,
      norm: nrm,
      errorValue,
      isAccepted
    });
  };

  const handleReset = () => {
    setMeasured('');
    setNorm('');
    setResult(null);
  };

  return (
    <div className="error-page">
      <div className="error-card">
        {/* Header */}
        <div className="error-header">
          <div className="error-icon">📏</div>
          <div>
            <h1 className="error-title">Ölçmə Xətasının Hesablanması</h1>
            <p className="error-subtitle">Nisbi xətanın qiymətləndirilməsi</p>
          </div>
        </div>

        {/* Formula display */}
        <div className="error-formula-box">
          δ = |X<sub>ölç</sub> − X<sub>norm</sub>| / X<sub>norm</sub> × 100%
        </div>

        {/* Inputs */}
        <div className="error-inputs">
          <div className="error-field">
            <label className="error-label">
              Ölçülmüş qiymət (X<sub>ölç</sub>)
              <span className="error-unit">vahid</span>
            </label>
            <input
              className="error-input"
              type="number"
              placeholder="Məs: 95.8"
              value={measured}
              onChange={(e) => setMeasured(e.target.value)}
              step="0.01"
            />
          </div>
          <div className="error-field">
            <label className="error-label">
              Normativ qiymət (X<sub>norm</sub>)
              <span className="error-unit">vahid</span>
            </label>
            <input
              className="error-input"
              type="number"
              placeholder="Məs: 95"
              value={norm}
              onChange={(e) => setNorm(e.target.value)}
              step="0.01"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="error-buttons">
          <button className="error-btn-calc" onClick={handleCalculate}>
            Hesabla
          </button>
          <button className="error-btn-reset" onClick={handleReset}>
            Sıfırla
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`error-result ${result.error ? 'result-error' : result.isAccepted ? 'result-accepted' : 'result-rejected'}`}>
            {result.error ? (
              <p className="result-message">{result.message}</p>
            ) : (
              <>
                <div className="result-icon">
                  {result.isAccepted ? '✅' : '❌'}
                </div>

                <div className="result-values">
                  δ = <span className="result-percentage">{result.errorValue.toFixed(2)}%</span>
                </div>

                <p className="result-message">
                  {result.isAccepted 
                    ? 'Nisbi xəta kiçik olduğundan ölçmə nəticələri etibarlıdır'
                    : 'Nisbi xəta böyük olduğundan ölçmə nəticələri etibarsızdır'}
                </p>

                <p className="result-note">
                  {result.isAccepted 
                    ? 'Xəta normativ həddə (≤ 5%) daxildir.' 
                    : `İcazə verilən həddən ${result.errorValue - 5} % artıqdır.`}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorCalc;