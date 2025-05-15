import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LessonDetail from './components/LessonDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lesson/:id" element={<LessonDetail />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App; 