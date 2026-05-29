import { useState } from 'react';
import { calculateOctane } from '../../formulas/octaneFormula';
import './OctaneCalc.css';

const OctaneCalc = () => {
  const [measured, setMeasured] = useState('');
  const [norm, setNorm] = useState('');

  const isAccepted = calculateOctane(Number(measured), Number(norm));

  return (
    <div className="octane-container">
      <h2>Oktan Ədədi Müqayisəsi</h2>

      <div className="input-group">
        <label htmlFor="measured">Ölçülmüş oktan ədədi (ON)</label>
        <input
          id="measured"
          type="number"
          placeholder="Məs: 95.8"
          value={measured}
          onChange={(e) => setMeasured(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="norm">Normativ qiymət (ON_norm)</label>
        <input
          id="norm"
          type="number"
          placeholder="Məs: 95"
          value={norm}
          onChange={(e) => setNorm(e.target.value)}
        />
      </div>

      {measured && norm && (
        <>
          <div className="result">
            Ölçülmüş oktan ədədi: <span>{Number(measured).toFixed(1)}</span>
            <br />
            Normativ: <span>ON ≥ {norm}</span>
            <br />
            Müqayisə: <span>{measured} {isAccepted ? '>' : '<'} {norm}</span>
          </div>

          <div className={`status-box ${isAccepted ? 'accepted' : 'rejected'}`}>
            {isAccepted
              ? '✔ Yanacaq detonasiya dayanıqlığı baxımından standartın tələblərinə cavab verir'
              : '✘ Yanacaq detonasiya dayanıqlığı baxımından standartın tələblərinə cavab vermir'}
          </div>
        </>
      )}
    </div>
  );
};

export default OctaneCalc;