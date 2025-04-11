import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import TranslatePage from './pages/TranslatePage';
import CoursesPage from './pages/CoursesPage';
import MaterialsPage from './pages/MaterialsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="translate" element={<TranslatePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="materials" element={<MaterialsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
