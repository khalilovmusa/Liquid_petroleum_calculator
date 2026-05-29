import { useState } from 'react';
import { calculateError } from '../../formulas/errorFormula';
import './ErrorCalc.css';

const ErrorCalc = () => {
  const [measured, setMeasured] = useState('');
  const [norm, setNorm] = useState('');

  const error = calculateError(Number(measured), Number(norm));

  return (
    <div className="error-container">
      <h2>Ölçmə Xətasının Hesablanması</h2>

      <div className="input-group">
        <label htmlFor="measured">Ölçülmüş qiymət (X<sub>ölç</sub>)</label>
        <input
          id="measured"
          type="number"
          placeholder="Məs: 95.8"
          value={measured}
          onChange={(e) => setMeasured(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="norm">Normativ qiymət (X<sub>norm</sub>)</label>
        <input
          id="norm"
          type="number"
          placeholder="Məs: 95"
          value={norm}
          onChange={(e) => setNorm(e.target.value)}
        />
      </div>

      {measured && norm && error !== null && (
        <>
          <div className="result">
            <div className="formula">
              δ = |{measured} − {norm}| / {norm} × 100%
            </div>
            <div className="formula-result">
              δ = <span>{error.toFixed(2)}%</span>
            </div>
          </div>

          <div className={`status-box ${error <= 5 ? 'accepted' : 'rejected'}`}>
            {error <= 5
              ? '✔ Nisbi xəta kiçik olduğundan ölçmə nəticələri etibarlı hesab edilir'
              : '✘ Nisbi xəta böyük olduğundan ölçmə nəticələri etibarsız hesab edilir'}
          </div>
        </>
      )}
    </div>
  );
};

export default ErrorCalc;