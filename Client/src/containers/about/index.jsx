import { BsInfoCircleFill } from "react-icons/bs";
import { DiNodejs, DiMongodb, DiReact } from "react-icons/di";
import { FaDev, FaDatabase } from "react-icons/fa";
import { Animate } from "react-simple-animate";

import "./styles.scss";
import PageHeaderContent from "../../components/pageHeaderContent/index";
import { personalData } from "./utils";
const About = () => {
  return (
    <section className="about">
      <PageHeaderContent
        headerText="About me"
        icon={<BsInfoCircleFill size={40} />}
      />

      <div className="about__content">
        <div className="about__content__personalWrapper">
          <Animate
            play
            duration={2}
            delay={0}
            start={{ transform: "translateX(-800px)" }}
            end={{ transform: "translateX(0px)" }}
          >
            <h3 className="developerContent">Full Stack Developer</h3>
            <p>
              As an ITC graduate of both their Full Stack and Data Analytics
              programs, I am now prepared and determined to enter into and
              thrive in this exciting new career!
              <br />
              I'm passionate about learning new technologies and developing
              myself and my abilities.
              <br />I was involved in a 2-month student engagement project which
              gave me insight into company dynamics, workflow, and real world
              experience. During my time there, I built a micro-frontend with
              React and Typescript. The company needed a good way to track their
              sent email publications. The project receives data, by client,
              from Mailgun API. Then it filters the data, receives other data
              from the company database, and displays the results in a table on
              the page. In addition, I learned their onboarding process, task
              management, coding standards, and worked on refinements of other
              components for another product.
              <br />
              <br />
              About me personally, my family and I made Aliyah to Israel from
              Las Vegas. In my previous career as an electrical contractor, I
              taught myself many new skills including business management,
              project managment, and project estimating. My passions outside
              coding include singing and playing guitar and jamming with
              friends.
            </p>
          </Animate>
          <Animate
            play
            duration={2}
            delay={0}
            start={{ transform: "translateX(500px)" }}
            end={{ transform: "translateX(0px)" }}
          >
            <h3 className="personalContent">Personal Information</h3>
            <ul>
              {personalData.map((item, key) => (
                <li key={key}>
                  <span className="title">{item.label}</span>
                  <span className="value">{item.value}</span>
                </li>
              ))}
            </ul>
          </Animate>
        </div>

        <div className="about__content__servicesWrapper">
          <Animate
            play
            duration={2}
            delay={0}
            start={{ transform: "translateY(-1800px)" }}
            end={{ transform: "translateY(0px)" }}
          >
            <div className="about__content__servicesWrapper__innerContent">
              <div>
                <DiNodejs color="var(--selected-theme-main-color)" size={70} />
              </div>
              <div>
                <DiMongodb color="var(--selected-theme-main-color)" size={65} />
              </div>
              <div>
                <DiReact color="var(--selected-theme-main-color)" size={60} />
              </div>
              <div>
                <FaDev color="var(--selected-theme-main-color)" size={55} />
              </div>
              <div>
                <FaDatabase
                  color="var(--selected-theme-main-color)"
                  size={50}
                />
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
};

export default About;
