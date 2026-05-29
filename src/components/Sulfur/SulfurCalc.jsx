import { useState } from 'react';
import './SulfurCalc.css';
import calculateSulfur from '../../formulas/SulfurFormula';

const SulfurCalc = () => {
  const [S, setS] = useState('');
  const [S_norm, setS_norm] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const sulfur = parseFloat(S);
    const norm = parseFloat(S_norm);

    if (isNaN(sulfur) || isNaN(norm)) {
      setResult({ error: true, message: 'Zəhmət olmasa düzgün rəqəm daxil edin.' });
      return;
    }

    const calc = calculateSulfur(sulfur, norm);
    setResult({ error: false, sulfur, norm, ...calc });
  };

  const handleReset = () => {
    setS('');
    setS_norm('');
    setResult(null);
  };

  return (
    <div className="sulfur-page">
      <div className="sulfur-card">

        {/* Header */}
        <div className="sulfur-header">
          <div className="sulfur-icon">⚗️</div>
          <div>
            <h1 className="sulfur-title">Kükürd Kalkulyatoru</h1>
            <p className="sulfur-subtitle">Yanacaqda kükürd miqdarının normativ yoxlaması</p>
          </div>
        </div>

        {/* Formula display */}
        <div className="sulfur-formula-box">
          S ≤ S_norm <span style={{ color: '#484f58', fontSize: '0.8rem' }}>(mq/kq)</span>
        </div>

        {/* Info strip */}
        <div className="sulfur-info-strip">
          <span>📋 Normativ: <strong>S ≤ S_norm (mq/kq)</strong></span>
          <span>🔬 ГОСТ 32332-2013</span>
        </div>

        {/* Inputs */}
        <div className="sulfur-inputs">
          <div className="sulfur-field">
            <label className="sulfur-label">
              Ölçülmüş kükürd miqdarı
              <span className="sulfur-unit">mq/kq</span>
            </label>
            <input
              className="sulfur-input"
              type="number"
              placeholder="məs. 7"
              value={S}
              onChange={(e) => setS(e.target.value)}
            />
          </div>

          <div className="sulfur-field">
            <label className="sulfur-label">
              Normativ hədd (S_norm)
              <span className="sulfur-unit">mq/kq</span>
            </label>
            <input
              className="sulfur-input"
              type="number"
              placeholder="məs. 10"
              value={S_norm}
              onChange={(e) => setS_norm(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="sulfur-buttons">
          <button className="sulfur-btn-calc" onClick={handleCalculate}>
            Hesabla
          </button>
          <button className="sulfur-btn-reset" onClick={handleReset}>
            Sıfırla
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className={`sulfur-result ${result.error ? 'result-error' : result.compliant ? 'result-pass' : 'result-fail'}`}>
            {result.error ? (
              <p className="result-message">{result.message}</p>
            ) : (
              <>
                <div className="result-icon">
                  {result.compliant ? '✅' : '❌'}
                </div>
                <div className="result-values">
                  <span>S = <strong>{result.sulfur.toFixed(1)} mq/kq</strong></span>
                  <span className="result-op">{result.compliant ? '≤' : '>'}</span>
                  <span>S_norm = <strong>{result.norm.toFixed(1)} mq/kq</strong></span>
                </div>
                <p className="result-message">{result.message}</p>
                {result.compliant ? (
                  <p className="result-note">
                    Fərq: normativdən <strong>{result.difference} mq/kq</strong> aşağıdır. Yanacaq ekoloji təhlükəsizlik tələblərinə uyğundur.
                  </p>
                ) : (
                  <p className="result-note">
                    Normativdən <strong>{Math.abs(result.difference)} mq/kq</strong> artıqdır.
                  </p>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default SulfurCalc;