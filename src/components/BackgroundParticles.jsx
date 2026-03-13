import React from 'react';

const BackgroundParticles = ({ count = 20 }) => {
    return (
        <div className="hero-particles">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundParticles;
