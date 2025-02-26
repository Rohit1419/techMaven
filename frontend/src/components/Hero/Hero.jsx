import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import headphones_c_1 from "../../assets/Hero/headphones_c_1.webp";

export default function Hero() {
  return (
    <div className="hero-section min-h-screen bg-gradient-to-r from-gray-100 to-gray-50">
      <div className="hero-container h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-content flex flex-col-reverse md:flex-row items-center justify-center min-h-screen py-6 md:py-16 gap-8">
          {/* Left Content */}
          <div className="hero-text-content w-full md:w-1/2 text-center md:text-left">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Discover Next-Gen
              <span className="hero-title-accent text-blue-600 block mt-2">
                Tech Excellence
              </span>
            </h1>
            <p className="hero-description text-base sm:text-lg text-gray-600 mt-6 max-w-xl mx-auto md:mx-0">
              Experience cutting-edge technology with our premium selection of
              devices. From smartphones to laptops, we've got your tech needs
              covered.
            </p>
            <div className="hero-cta-group flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
              <button className="hero-cta-primary w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Shop Now
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="hero-cta-icon"
                />
              </button>
              <button className="hero-cta-secondary w-full sm:w-auto border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
                View Deals
              </button>
            </div>
          </div>

          {/* Right Content - Featured Product Image */}
          <div className="hero-image-content w-full md:w-1/2 relative">
            <div className="hero-image-wrapper relative z-10 transform hover:scale-105 transition-transform duration-300">
              <img
                src={headphones_c_1}
                alt="Featured Tech Product"
                className="hero-image w-[80%] md:w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
              {/* Floating Stats Card */}
              <div className="hero-stats-card absolute -bottom-4 left-4 md:-left-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="hero-stats-label text-sm text-gray-600">
                  Best Seller
                </p>
                <p className="hero-stats-rating font-bold text-blue-600">
                  4.9 ★★★★★
                </p>
              </div>
            </div>
            {/* Background Decorative Elements */}
            <div className="hero-blob-1 hidden md:block absolute top-1/2 right-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="hero-blob-2 hidden md:block absolute top-1/2 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
