import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Animate } from "react-simple-animate";
import { Link } from "react-router-dom";

import "./styles.scss";
import Leopold_Jeremy_RCV from "./Leopold_Jeremy_RCV.pdf";

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home__intro-wrapper">
        <h1 className="home__intro-wrapper__intro">Hello, I'm Jeremy</h1>
      </div>
      <div className="home__title-wrapper">
        <h1 className="home__title-wrapper__title">Full Stack Developer</h1>
      </div>
      <Animate
        play
        duration={2}
        delay={2}
        start={{
          transform: "translateY(600px)",
        }}
        end={{
          transform: "translateX(0px)",
        }}
      >
        <div className="contact-me">
          <div className="contact-me__buttons-wrapper">
            <Link to="/contact">Hire Me</Link>
            <a href={Leopold_Jeremy_RCV} download="Leopold_Jeremy_RCV">
              Download Resume
            </a>
          </div>
          <div className="contact-me__socials-wrapper">
            <a
              href="https://www.linkedin.com/in/702leopold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="tooltip-text-left">Go to my LinkedIn</div>
              <FaLinkedin size={32} />
            </a>
            <a
              href="https://github.com/Jdubbs702"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={32} />
              <div className="tooltip-text-right">Go to my Github</div>
            </a>
          </div>
        </div>
      </Animate>
    </section>
  );
};

export default Home;
