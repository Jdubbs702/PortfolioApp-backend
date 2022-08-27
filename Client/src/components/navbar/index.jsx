import { Link } from "react-router-dom";
import { FaReact, FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { navMenu } from "./config";
import { useState } from "react";

import "./styles.scss";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <Link to={"/"} className="navbar__container__logo">
            <FaReact size={30} />
          </Link>
          <ul
            className={
              click
                ? "navbar__container__menu active"
                : "navbar__container__menu"
            }
          >
            {navMenu.map((item, key) => (
              <ul
                key={key}
                className="navbar__container__menu__item__container"
              >
                <li className="navbar__container__menu__item">
                  <Link
                    onClick={() => setClick(false)}
                    to={item.to}
                    className="navbar__container__menu__item__links"
                  >
                    {item.label}
                  </Link>
                </li>
              </ul>
            ))}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <HiX size={30} /> : <FaBars size={30} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
