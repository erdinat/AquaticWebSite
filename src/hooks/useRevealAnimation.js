import { useEffect } from 'react';

/**
 * useRevealAnimation
 * Intersection Observer hook that adds the 'visible' class to elements 
 * with the '.reveal' class when they come into view.
 * 
 * @param {number} threshold - How much of the element should be visible before triggering (0.0 to 1.0)
 */
export const useRevealAnimation = ({ threshold = 0.1, rootMargin = '0px' } = {}) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold, rootMargin }
        );

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [threshold, rootMargin]);
};
