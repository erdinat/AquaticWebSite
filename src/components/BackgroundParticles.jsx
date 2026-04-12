import { useMemo } from 'react';

const BackgroundParticles = ({ count = 20 }) => {
    const particles = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
            })),
        [count]
    );

    return (
        <div className="hero-particles" aria-hidden="true">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.left,
                        top: p.top,
                        animationDelay: p.animationDelay,
                        animationDuration: p.animationDuration,
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundParticles;
