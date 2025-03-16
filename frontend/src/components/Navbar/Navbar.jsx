import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobile,
  faHeadphonesSimple,
  faComputer,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar bg-white shadow-lg max-w8xl ">
      <div className="navbar-container max-w7xl mx-auto px-4">
        <div className="navbar-content flex flex-col">
          {/* Top Section */}
          <div className="navbar-top flex items-center justify-between md:justify-center py-4 border-b">
            <div className="navbar-brand flex items-center space-x-2">
              <img
                src="/techmaven.png"
                alt="TechMaven Logo"
                className="navbar-logo h-8 w-8"
              />
              <a href="/">
                <h3 className="navbar-title text-2xl font-bold text-gray-800">
                  TechMaven
                </h3>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="navbar-toggle md:hidden rounded-lg focus:outline-none focus:shadow-outline"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FontAwesomeIcon
                icon={isOpen ? faXmark : faBars}
                className="toggle-icon w-6 h-6"
              />
            </button>
          </div>

          {/* Navigation Items */}
          <div
            className={`navbar-menu ${isOpen ? "block" : "hidden"} md:block`}
          >
            <div className="navbar-items flex flex-col md:flex-row md:justify-center md:space-x-12 py-4 space-y-4 md:space-y-0">
              <Link to="/collection/smartphones">
                <div className="nav-item flex items-center space-x-2 cursor-pointer  transition-colors">
                  <h3 className="nav-text text-gray-700   font-medium">
                    <FontAwesomeIcon icon={faMobile} className="nav-icon" />{" "}
                    Smartphones
                  </h3>
                </div>
              </Link>
              <Link to="/collection/laptops">
                <div className="nav-item flex items-center space-x-2 cursor-pointer  transition-colors">
                  <h3 className="nav-text text-gray-700 font-medium">
                    <FontAwesomeIcon icon={faComputer} className="nav-icon" />{" "}
                    Laptop & Computers
                  </h3>
                </div>
              </Link>
              <Link to="/collection/audio">
                <div className="nav-item flex items-center space-x-2 cursor-pointer  transition-colors">
                  <h3 className="nav-text text-gray-700 font-medium">
                    <FontAwesomeIcon
                      icon={faHeadphonesSimple}
                      className="nav-icon"
                    />{" "}
                    Audio
                  </h3>
                </div>
              </Link>
              <Link to="/collection/accessories">
                <div className="nav-item flex items-center space-x-2 cursor-pointer  transition-colors">
                  <h3 className="nav-text text-gray-700 font-medium">
                    <FontAwesomeIcon icon={faKeyboard} className="nav-icon" />{" "}
                    Accessories/Gadgets
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
