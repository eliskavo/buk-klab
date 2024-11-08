import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { Books } from './pages/Books';
import { Members } from './pages/Members/Members';
import { About } from './pages/About';
import { Navbar } from './components/Navbar/Navbar';
import { SignIn } from './pages/SignIn';
import { Join } from './pages/Join';
import { Footer } from './components/Footer/Footer';

import './styles/global.scss';

export const App: React.FC = () => (
  <Router>
    <div className="page-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/members" element={<Members />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);
