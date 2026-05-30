import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import StoryTime from './pages/StoryTime';
import MocktailRecipes from './pages/MocktailRecipes';
import GitHubProjects from './pages/GitHubProjects';
import ClueTracker from './pages/ClueTracker';
import KidsCorner from './pages/KidsCorner';
import InteractiveHub from './pages/InteractiveHub';
import PlaylistConverter from './pages/PlaylistConverter';
import MosesBrownTrack from './pages/MosesBrownTrack';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="story-time" element={<StoryTime />} />
          <Route path="mocktail-recipes" element={<MocktailRecipes />} />
          <Route path="projects" element={<GitHubProjects />} />
          <Route path="clue" element={<ClueTracker />} />
          <Route path="kids-corner" element={<KidsCorner />} />
          <Route path="hub" element={<InteractiveHub />} />
          <Route path="convert" element={<PlaylistConverter />} />
          <Route path="quakers-track" element={<MosesBrownTrack />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
