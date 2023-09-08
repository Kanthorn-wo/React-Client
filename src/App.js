import './App.css';
import FormProduct from './components/FormProduct';
import FormEditProduct from './components/FormEditProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path='/' element={<FormProduct />} />
          <Route path="/edit/:id" element={<FormEditProduct />} />
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
