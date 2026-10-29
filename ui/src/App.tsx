import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import Repositories from './pages/Repositories';
import Analysis from './pages/Analysis';
import Security from './pages/Security';
import AI from './pages/AI';
import Acceptance from './pages/Acceptance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-xl font-bold">RepoLens</h1>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/repositories" element={<Repositories />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/security" element={<Security />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/acceptance" element={<Acceptance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
