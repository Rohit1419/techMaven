import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer-section bg-gray-900 text-gray-300">
      <div className="footer-container max-w-7xl mx-auto px-4 py-12">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo text-2xl font-bold text-white mb-4">
              TechMaven
            </h3>
            <p className="footer-description text-sm mb-6">
              Your one-stop destination for premium tech products and
              accessories.
            </p>
            <div className="footer-social flex space-x-4">
              <a
                href="#"
                className="social-link hover:text-blue-500 transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="#"
                className="social-link hover:text-blue-400 transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="#"
                className="social-link hover:text-pink-500 transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="#"
                className="social-link hover:text-blue-600 transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-title text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="footer-list space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-categories">
            <h4 className="footer-title text-lg font-semibold text-white mb-4">
              Categories
            </h4>
            <ul className="footer-list space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Smartphones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Laptops & Computers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Audio Devices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-title text-lg font-semibold text-white mb-4">
              Stay Updated
            </h4>
            <p className="footer-newsletter-text text-sm mb-4">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <form className="footer-form flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-input px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="footer-button bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="footer-copyright text-sm">
              © 2024 TechMaven. All rights reserved.
            </p>
            <div className="footer-legal flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
