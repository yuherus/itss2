import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import TranslatePage from './pages/TranslatePage';
import CoursesPage from './pages/CoursesPage';
import MaterialsPage from './pages/MaterialsPage';
import CourseDetail from './pages/CourseDetail';
import MaterialDetail from './pages/MaterialDetail';
import LoginPage from './pages/LoginPage';
import LessonDetail from './components/LessonDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="/lesson/:id" element={<LessonDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
