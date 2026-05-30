import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import InteractiveHub from './pages/InteractiveHub';
import ClueTracker from './pages/projects/ClueTracker';
import KidsCorner from './pages/projects/KidsCorner';
import MosesBrownTrack from './pages/projects/MosesBrownTrack';
import PlaylistConverter from './pages/projects/PlaylistConverter';
import StoryTime from './pages/projects/StoryTime';
import MocktailRecipes from './pages/projects/MocktailRecipes';
import GitHubProjects from './pages/projects/GitHubProjects';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="hub" element={<InteractiveHub />} />
          <Route path="projects">
            <Route index element={<GitHubProjects />} />
            <Route path="clue" element={<ClueTracker />} />
            <Route path="kids-corner" element={<KidsCorner />} />
            <Route path="quakers-track" element={<MosesBrownTrack />} />
            <Route path="convert" element={<PlaylistConverter />} />
            <Route path="story-time" element={<StoryTime />} />
            <Route path="mocktail-recipes" element={<MocktailRecipes />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
