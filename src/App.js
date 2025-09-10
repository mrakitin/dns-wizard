import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [beamline, setBeamline] = useState('');
  const [device, setDevice] = useState('');
  const [dnsName, setDnsName] = useState('');

  const beamlines = [
    { id: '2-ID', name: '2-ID', value: '2-ID', icon: '🔬' },
    { id: '3-ID', name: '3-ID', value: '3-ID', icon: '🔬' },
    { id: '4-BM', name: '4-BM', value: '4-BM', icon: '🧲' },
    { id: '4-ID', name: '4-ID', value: '4-ID', icon: '🔬' },
    { id: '5-ID', name: '5-ID', value: '5-ID', icon: '🔬' },
    { id: '6-BM', name: '6-BM', value: '6-BM', icon: '🧲' },
    { id: '6-ID', name: '6-ID', value: '6-ID', icon: '🔬' },
    { id: '7-BM', name: '7-BM', value: '7-BM', icon: '🧲' },
    { id: '7-ID-1', name: '7-ID-1', value: '7-ID-1', icon: '🔬' },
    { id: '7-ID-2', name: '7-ID-2', value: '7-ID-2', icon: '🔬' },
    { id: '8-BM', name: '8-BM', value: '8-BM', icon: '🧲' },
    { id: '8-ID', name: '8-ID', value: '8-ID', icon: '🔬' },
    { id: '9-ID', name: '9-ID', value: '9-ID', icon: '🔬' },
    { id: '10-ID', name: '10-ID', value: '10-ID', icon: '🔬' },
    { id: '11-BM', name: '11-BM', value: '11-BM', icon: '🧲' },
    { id: '11-ID', name: '11-ID', value: '11-ID', icon: '🔬' },
    { id: '12-ID', name: '12-ID', value: '12-ID', icon: '🔬' },
    { id: '16-BM', name: '16-BM', value: '16-BM', icon: '🧲' },
    { id: '16-ID', name: '16-ID', value: '16-ID', icon: '🔬' },
    { id: '17-BM', name: '17-BM', value: '17-BM', icon: '🧲' },
    { id: '17-ID-1', name: '17-ID-1', value: '17-ID-1', icon: '🔬' },
    { id: '17-ID-2', name: '17-ID-2', value: '17-ID-2', icon: '🔬' },
    { id: '18-ID', name: '18-ID', value: '18-ID', icon: '🔬' },
    { id: '19-ID', name: '19-ID', value: '19-ID', icon: '🔬' },
    { id: '21-ID', name: '21-ID', value: '21-ID', icon: '🔬' },
    { id: '22-IR-1', name: '22-IR-1', value: '22-IR-1', icon: '🌡️' },
    { id: '22-IR-2', name: '22-IR-2', value: '22-IR-2', icon: '🌡️' },
    { id: '23-ID-1', name: '23-ID-1', value: '23-ID-1', icon: '🔬' },
    { id: '23-ID-2', name: '23-ID-2', value: '23-ID-2', icon: '🔬' },
    { id: '24-IR', name: '24-IR', value: '24-IR', icon: '🌡️' },
    { id: '26-ID-1', name: '26-ID-1', value: '26-ID-1', icon: '🔬' },
    { id: '26-ID-2', name: '26-ID-2', value: '26-ID-2', icon: '🔬' },
    { id: '27-ID', name: '27-ID', value: '27-ID', icon: '🔬' },
    { id: '28-ID-1', name: '28-ID-1', value: '28-ID-1', icon: '🔬' },
    { id: '28-ID-2', name: '28-ID-2', value: '28-ID-2', icon: '🔬' },
    { id: '29-ID-1', name: '29-ID-1', value: '29-ID-1', icon: '🔬' },
    { id: '29-ID-2', name: '29-ID-2', value: '29-ID-2', icon: '🔬' },
  ];

  const devices = [
    { id: 'detector', name: 'Detector', value: 'det', icon: '📡' },
    { id: 'monitor', name: 'Monitor', value: 'mon', icon: '📺' },
    { id: 'camera', name: 'Camera', value: 'cam', icon: '📷' },
    { id: 'motor', name: 'Motor', value: 'mot', icon: '⚙️' },
    { id: 'sensor', name: 'Sensor', value: 'sens', icon: '🌡️' },
    { id: 'controller', name: 'Controller', value: 'ctrl', icon: '🎛️' },
    { id: 'daq', name: 'Data Acquisition', value: 'daq', icon: '💾' },
    { id: 'other', name: 'Other', value: 'dev', icon: '🔧' },
  ];

  const generateDnsName = (beamlineValue, deviceValue) => {
    if (!beamlineValue || !deviceValue) return '';

    // Extract the ID number from beamline (e.g., "9-ID" -> "9", "7-ID-1" -> "7")
    const beamlineId = beamlineValue.split('-')[0];

    // Zero-pad the beamline ID to 2 digits (e.g., "9" -> "09")
    const paddedBeamlineId = beamlineId.padStart(2, '0');

    // Determine the beamline type and machine ID
    let typeSuffix = '';
    let machineId = '';

    if (beamlineValue.includes('-BM')) {
      // BM beamlines: use "bm" without number
      typeSuffix = 'bm';
      machineId = '';
    } else if (beamlineValue.includes('-IR')) {
      // IR beamlines: use "ir" with number
      typeSuffix = 'ir';
      machineId = parseInt(beamlineId) + 1;
    } else if (beamlineValue.includes('-ID')) {
      // ID beamlines: use "id" with explicit number or default to "1"
      typeSuffix = 'id';
      if (beamlineValue.includes('-ID-')) {
        // Extract the explicit number (e.g., "17-ID-1" -> "1", "17-ID-2" -> "2")
        machineId = beamlineValue.split('-ID-')[1];
      } else {
        // Default to "1" for single ID beamlines (e.g., "2-ID" -> "1")
        machineId = '1';
      }
    }

    // Generate DNS name: xf + paddedBeamlineId + typeSuffix + machineId + "-" + device + .nsls2.bnl.gov
    return `xf${paddedBeamlineId}${typeSuffix}${machineId}-${deviceValue}.nsls2.bnl.gov`;
  };

  const handleBeamlineSelect = (selectedBeamline) => {
    setBeamline(selectedBeamline);
    setCurrentStep(1);
  };

  const handleDeviceSelect = (selectedDevice) => {
    setDevice(selectedDevice);
    const generatedDns = generateDnsName(beamline, selectedDevice);
    setDnsName(generatedDns);
    setCurrentStep(2);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setBeamline('');
    setDevice('');
    setDnsName('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-container">
            <h2>Select Beamline</h2>
            <p>Choose the beamline where the device will be integrated:</p>
            <div className="options-grid horizontal">
              {beamlines.map((beamlineOption) => (
                <button
                  key={beamlineOption.id}
                  className="option-button"
                  onClick={() => handleBeamlineSelect(beamlineOption.value)}
                >
                  <span className="beamline-icon">{beamlineOption.icon}</span>
                  <span className="beamline-name">{beamlineOption.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-container">
            <h2>Select Device Type</h2>
            <p>Choose the type of device to integrate:</p>
            <div className="options-grid">
              {devices.map((deviceOption) => (
                <button
                  key={deviceOption.id}
                  className="option-button"
                  onClick={() => handleDeviceSelect(deviceOption.value)}
                >
                  <span className="device-icon">{deviceOption.icon}</span>
                  <span className="device-name">{deviceOption.name}</span>
                </button>
              ))}
            </div>
            <button className="back-button" onClick={() => setCurrentStep(0)}>
              ← Back to Beamline Selection
            </button>
          </div>
        );

      case 2:
        return (
          <div className="step-container">
            <h2>Generated DNS Name</h2>
            <div className="result-container">
              <div className="dns-display">
                <h3>Your DNS Name:</h3>
                <div className="dns-name">{dnsName}</div>
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(dnsName)}
                >
                  📋 Copy to Clipboard
                </button>
              </div>

              <div className="breakdown">
                <h4>Name Breakdown:</h4>
                <ul>
                  <li><strong>xf</strong> - Standard prefix for beamline machines</li>
                  <li><strong>{beamline.split('-')[0].padStart(2, '0')}</strong> - Beamline ID (zero-padded)</li>
                  <li><strong>{beamline.includes('-BM') ? 'bm' : beamline.includes('-IR') ? 'ir' : 'id'}</strong> - Beamline type identifier</li>
                  <li><strong>{
                    beamline.includes('-BM') ? '' :
                    beamline.includes('-IR') ? (parseInt(beamline.split('-')[0]) + 1) :
                    beamline.includes('-ID-') ? beamline.split('-ID-')[1] : '1'
                  }</strong> - {beamline.includes('-BM') ? 'No number for BM beamlines' : 'Machine ID'}</li>
                  <li><strong>-{device}</strong> - Device type abbreviation</li>
                  <li><strong>.nsls2.bnl.gov</strong> - Default domain</li>
                </ul>
              </div>
            </div>

            <div className="action-buttons">
              <button className="reset-button" onClick={handleReset}>
                🔄 Generate Another Name
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔬 DNS Wizard</h1>
        <p>Generate DNS names for beamline devices</p>
      </header>

      <main className="app-main">
        <div className="wizard-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            />
          </div>

          <div className="step-indicator">
            Step {currentStep + 1} of 3
          </div>

          {renderStep()}
        </div>
      </main>

      <footer className="app-footer">
        <p>NSLS-II Beamline Device Naming System</p>
        <div className="footer-links">
          <a 
            href="https://github.com/mrakitin/dns-wizard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <span className="github-icon">🐙</span>
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
