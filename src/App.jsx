import { useState } from 'react';
import './App.css';

import DensityCalc from './components/Density/DensityCalc';
import OctaneCalc from './components/Octane/OctaneCalc';
import SulfurCalc from './components/Sulfur/SulfurCalc';
import ErrorCalc from './components/MeasureErr/ErrorCalc';

function App() {
  const [activeTab, setActiveTab] = useState('density'); // Default tab

  const tabs = [
    { id: 'density', label: 'Sıxlıq Kalkulyatoru', icon: '📏' },
    { id: 'octane', label: 'Oktan Ədədi', icon: '⛽' },
    { id: 'sulfur', label: 'Kükürd Miqdarı', icon: '⚗️' },
    { id: 'error', label: 'Ölçmə Xətası', icon: '📐' },
  ];

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-icon">🧪</div>
        <h1 className="app-title">Yanacaq Keyfiyyət Kalkulyatorları</h1>
        <p className="app-subtitle">
          Laboratoriya standartlarına uyğun yanacaq analizi alətləri
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <ul className="tabs">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Calculator Content */}
      <div className="content-area">
        {activeTab === 'density' && <DensityCalc />}
        {activeTab === 'octane' && <OctaneCalc />}
        {activeTab === 'sulfur' && <SulfurCalc />}
        {activeTab === 'error' && <ErrorCalc />}
      </div>
    </div>
  );
}

export default App;