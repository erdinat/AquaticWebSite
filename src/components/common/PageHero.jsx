import React from 'react';

/**
 * PageHero
 * A reusable component for the hero section of all subpages.
 *
 * @param {string} title - The main title of the page
 * @param {string} subtitle - The subtitle/description
 * @param {string} bgImage - The background image URL
 * @param {string} extraOverlayClass - Additional CSS class for the overlay (e.g., 'careers-hero-overlay')
 */
const PageHero = ({ title, subtitle, bgImage, extraOverlayClass = '', children }) => {
    return (
        <section className="page-hero">
            <div className="page-hero-bg" />
            <div
                className={`page-hero-overlay ${extraOverlayClass}`}
                style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
            />
            <div className="page-hero-scrim" />
            <div className="container page-hero-content">
                {title && <h1 className="page-hero-title animate-fadeInUp">{title}</h1>}
                {subtitle && (
                    <p className="page-hero-subtitle animate-fadeInUp delay-1">{subtitle}</p>
                )}
                {children}
            </div>
            <div className="page-hero-wave" />
        </section>
    );
};

export default PageHero;
