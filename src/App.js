import React from 'react';
import Header from './components/Header';
import ServerHealth from './components/ServerHealth';
import MetricsOverview from './components/MetricsOverview';
import ActiveAlerts from './components/ActiveAlerts';

function App() {
  return (
    <div>
      <Header />
      <ServerHealth />
      <MetricsOverview serverId={1} />
      <ActiveAlerts/>
    </div>
  );
}

export default App;
