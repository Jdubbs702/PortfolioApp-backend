import { AiFillProject } from "react-icons/ai";
import { useEffect, useState } from "react";

import "./styles.scss";
import PageHeaderContent from "../../components/pageHeaderContent";
import { filterOptions } from "./utils";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../components/ErrorModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Portfolio = () => {
  const [filterValue, setFilterValue] = useState("1");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filteredPortfolioData, setFilteredPortfolioData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest("/project");
        const filteredPortfolioData =
          filterValue === "1"
            ? response
            : response.filter((item) => item.sectionId === filterValue);
        setFilteredPortfolioData(filteredPortfolioData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filterValue]);

  const handleFilterClick = (optionId) => {
    setFilterValue(optionId);
  };

  return (
    <>
      <ErrorModal nobackdrop={false} error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}

      <section id="portfolio" className="portfolio">
        <PageHeaderContent
          headerText="Portfolio"
          icon={<AiFillProject size={40} />}
        />

        <div className="portfolio__content">
          <ul className="portfolio__content__filter">
            {filterOptions.map((option) => (
              <li
                onClick={() => handleFilterClick(option.id)}
                key={`filter${option.id}`}
                className={option.id === filterValue ? "active" : ""}
              >
                {option.label}
              </li>
            ))}
          </ul>
          <div className="portfolio__content__cards">
            {filteredPortfolioData.map((item, key) => (
              <div
                onMouseEnter={() => setHoveredIndex(key)}
                onMouseLeave={() => setHoveredIndex(null)}
                key={key}
                className="portfolio__content__cards__item"
              >
                <div className="portfolio__content__cards__item__img-wrapper">
                  <div>
                    <img
                      src={item.image}
                      alt="project"
                      rel="noopener noreferrer"
                    />
                  </div>
                </div>
                {/* overlay wrapped in anchor */}
                <a
                  href={item.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="overlay">
                    {hoveredIndex === key && (
                      <div className="overlay__content">
                        <p>{item.projectName}</p>
                        <div className="overlay__content__description">
                          {item.description}
                        </div>
                        <button>Visit</button>
                      </div>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
