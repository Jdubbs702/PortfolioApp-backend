import { FaBlackTie } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork } from "react-icons/md";

import "./styles.scss";
import PageHeaderContent from "../../components/pageHeaderContent";
import resumeData from "./utils";

const Resume = () => {
  return (
    <section id="resume" className="resume">
      <PageHeaderContent
        headerText="My Resume"
        icon={<FaBlackTie size={40} />}
      />
      {/* TIMELINES */}
      <div className="timeline">
        {/* EDUCATION TIMELINE */}
        <div className="timeline__education">
          <h3 className="timeline__education__header-text">Accreditations</h3>
          <VerticalTimeline
            layout="1-column"
            lineColor="var(--selected-theme-main-color)"
          >
            {resumeData.accreditations.map((item) => (
              <VerticalTimelineElement
                key={item.title}
                className="timeline__education__vertical-timeline"
                contentStyle={{
                  background: "none",
                  color: "var(--selected-theme-main-color)",
                  border: "1.5px solid var(--selected-theme-main-color)",
                }}
                date={item.date}
                icon={<MdWork />}
                iconStyle={{
                  background: "#1818181",
                  color: "var(--selected-theme-main-color)",
                }}
              >
                <div className="vertical-timeline-element-title-wrapper">
                  <h3>{item.title}</h3>
                  <h4>{item.subTitle}</h4>
                </div>
                <p className="vertical-timeline-element-description-wrapper">
                  {item.description}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
        {/* EXPERIENCE TIMELINE */}
        <div className="timeline__experience">
          <h3 className="timeline__experience__header-text">Experience</h3>
          <VerticalTimeline
            layout="1-column"
            lineColor="var(--selected-theme-main-color)"
          >
            {resumeData.experience.map((item) => (
              <VerticalTimelineElement
                key={item.title}
                className="timeline__experience__vertical-timeline"
                contentStyle={{
                  background: "none",
                  color: "var(--selected-theme-main-color)",
                  border: "1.5px solid var(--selected-theme-main-color)",
                }}
                date={item.date}
                icon={<MdWork />}
                iconStyle={{
                  background: "#1818181",
                  color: "var(--selected-theme-main-color)",
                }}
              >
                <div className="vertical-timeline-element-title-wrapper">
                  <h3>{item.title}</h3>
                  <h4>{item.subTitle}</h4>
                </div>
                <p className="vertical-timeline-element-description-wrapper">
                  {item.description}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
          {/* EDUCATION TIMELINE */}
          <h3 className="timeline__education__header-text">Education</h3>
          <VerticalTimeline
            layout="1-column"
            lineColor="var(--selected-theme-main-color)"
          >
            {resumeData.education.map((item) => (
              <VerticalTimelineElement
                key={item.title}
                className="timeline__education__vertical-timeline"
                contentStyle={{
                  background: "none",
                  color: "var(--selected-theme-main-color)",
                  border: "1.5px solid var(--selected-theme-main-color)",
                }}
                date={item.date}
                icon={<MdWork />}
                iconStyle={{
                  background: "#1818181",
                  color: "var(--selected-theme-main-color)",
                }}
              >
                <div className="vertical-timeline-element-title-wrapper">
                  <h3>{item.title}</h3>
                  <h4>{item.subTitle}</h4>
                </div>
                <p className="vertical-timeline-element-description-wrapper">
                  {item.description}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default Resume;
