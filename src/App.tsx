import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './sections/Navigation';
import { Contact } from './sections/Contact';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
        <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;
