import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Trading from './pages/Trading';
import PrivateRoute from './components/PrivateRoute';
import TransactionHistory from './pages/TransactionHistory';
import TokenTransfer from './components/TokenTransfer';
import SmartContractInteraction from './components/SmartContractInteraction';
import GasFeeMonitor from './components/GasFeeMonitor';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/portfolio" element={
              <PrivateRoute>
                <Portfolio />
              </PrivateRoute>
            } />
            <Route path="/trading" element={
              <PrivateRoute>
                <Trading />
              </PrivateRoute>
            } />
            <Route path="/transactions" element={
              <PrivateRoute>
                <TransactionHistory />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App; 