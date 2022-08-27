import { Routes, Route, useLocation } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./App.scss";
import About from "./containers/about";
import Home from "./containers/home";
import Skills from "./containers/skills";
import Resume from "./containers/resume";
import Portfolio from "./containers/portfolio";
import Contact from "./containers/contact";
import Navbar from "./components/navbar";
import particlesConfig from "./helpers/particlesConfig";
import Theme from "./components/theme";

function App() {
  const location = useLocation();
  const pathIsHome = location.pathname === "/";

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="App">
      {/* particles js */}

      {pathIsHome && (
        <Particles
          id="particles"
          options={particlesConfig}
          init={particlesInit}
        />
      )}

      {/* navbar component */}

      <div className="App__navbar-wrapper">
        <Navbar />
      </div>

      {/* main page content */}

      <div className="App__main-content-wrapper">
        <Theme />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" index element={<About />} />
          <Route path="/skills" index element={<Skills />} />
          <Route path="/resume" index element={<Resume />} />
          <Route path="/portfolio" index element={<Portfolio />} />
          <Route path="/contact" index element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
