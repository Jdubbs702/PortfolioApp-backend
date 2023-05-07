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
            <ul className="bulleted">
              <li>
                Developing a ReactJS web app for maintaining membership and access at a
                private swimming pool facility in Ein Vered, Israel 
              </li>
              <li>
                Extending and maintaining WordPress website at Ben Hahadarim middle
                school: https://www.yaridmada.co.il
              </li>
              <li>
                Excelled in ITC student engagement project, gaining insite into
                company dynamics and workflow
                <br /> Learned onboarding, task management, and coding standards
              </li>
              <li>
                Built multiple apps using Javascript, Python, SQL, React,
                NodeJs, MongoDB, AWS Elastic Beanstalk, and AWS RDS
                <br /> Built micro-frontend with React and Typescript
              </li>
              <li>Graduated Harvard CS50x</li>
              <li>Graduated ITC Full Stack Development</li>
              <li>Graduated ITC Data Analytics</li>
              <li>
                Continuing to improve knowledge of algorithms and data
                structures for solving more complex problems
              </li>
              <li>
                Passionate about learning new technologies and developing myself
                and my abilities
              </li>
            </ul>

            <p>
              About me personally:
              <br /> My family and I made Aliyah to Israel from Las Vegas. In my
              previous career as an electrical contractor, I taught myself many
              new skills including business management, project managment, and
              project estimating. My passions outside coding include singing and
              playing guitar and jamming with friends.
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
