import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import TranslatePage from './pages/TranslatePage';
import CoursesPage from './pages/CoursesPage';
import MaterialsPage from './pages/MaterialsPage';
import CourseDetail from './pages/CourseDetail';
import MaterialDetail from './pages/MaterialDetail';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="translate" element={<TranslatePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="material/:materialId" element={<MaterialDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
