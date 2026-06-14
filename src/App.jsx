import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MarketAccess from './pages/MarketAccess';


function App() {
  return (
    <div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<MarketAccess />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;