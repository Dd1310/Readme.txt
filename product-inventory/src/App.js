import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/app/store';
import HomePage from './pages/HomePage';
import ProductUpdate from './components/ProductUpdate';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/update/:id" element={<ProductUpdate />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
