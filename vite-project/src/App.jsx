import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Info from './components/Info';
import Create from './components/Create';

import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div id='app'>
      <div className="navbar">
        <NavigationBar />
      </div>
      <Router>
        <div className='page-content'> 
           <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/create" element={<Create />} />
        </Routes>
        </div>
       
      </Router>
    </div>
  );
}

export default App;

