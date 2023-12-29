import { Routes, Route } from 'react-router-dom';
import { Create, Home } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<Create />} />
    </Routes>
  )
}

export default App