/*!
 * TWK Scroll Animations
 * 
 * A GSAP-powered scroll animations library that makes it easy to add scroll-triggered animations to your website.
 * 
 * @author: TWK Media
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initializeEffects, gsapEffects } from './effects'
import './global.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

class TWKScrollAnimations {
    constructor(config = {}) {
        this.config = {
            screens: {
                xs: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
                ...config.screens
            },
            ...config
        };
        
        if (typeof window !== 'undefined') {
            this.initialize();
        }
    }

    initialize() {
        initializeEffects();
        this.setupMediaQueries();
        this.setupResizeObserver();
    }

    getSectionAnimation(section, screenSize = '') {
        const suffix = screenSize ? `-${screenSize}` : '';
        const effect = section.getAttribute(`twk-aos${suffix}`);
        const duration = section.getAttribute(`twk-aos-duration${suffix}`) || 800;
        const delay = section.getAttribute(`twk-aos-delay${suffix}`) || 0;
        const trigger = section.getAttribute(`twk-aos-trigger${suffix}`) || 'top bottom-=100';
        const ease = section.getAttribute(`twk-aos-ease${suffix}`) || 'power2.out';
        const stagger = section.getAttribute(`twk-aos-stagger${suffix}`);
        const marker = section.getAttribute(`twk-aos-marker${suffix}`);

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: trigger,
                markers: marker === 'true',
                onEnter: () => {
                    if (!this.onFirstBlock) {
                        this.onFirstBlock = true;
                    }
                }
            }
        });

        if (stagger) {
            const children = section.children;
            timeline[effect](children, {
                duration: duration / 1000,
                stagger: parseFloat(stagger),
                delay: delay / 1000,
                ease
            });
        } else {
            timeline[effect](section, {
                duration: duration / 1000,
                delay: delay / 1000,
                ease
            });
        }

        return timeline;
    }

    setupMediaQueries() {
        const mm = gsap.matchMedia();
        const screens = this.config.screens;

        const breakpoints = {
            isXS: `(min-width: ${parseInt(screens.xs)}px)`,
            isSM: `(min-width: ${parseInt(screens.sm)}px)`,
            isMD: `(min-width: ${parseInt(screens.md)}px)`,
            isLG: `(min-width: ${parseInt(screens.lg)}px)`,
            isXL: `(min-width: ${parseInt(screens.xl)}px)`,
            is2XL: `(min-width: ${parseInt(screens['2xl'])}px)`,
            reduceMotion: "(prefers-reduced-motion: reduce)"
        };

        mm.add(breakpoints, (context) => {
            const { reduceMotion } = context.conditions;

            if (reduceMotion) {
                console.info('User prefers reduced motion');
                return;
            }

            this.initializeAnimations(context.conditions);
        });
    }

    setupResizeObserver() {
        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(() => {
                ScrollTrigger.refresh();
            });
            resizeObserver.observe(document.body);
        }
    }

    initializeAnimations(conditions) {
        const sections = gsap.utils.toArray('[twk-aos]');
        
        sections.forEach(section => {
            const { is2XL, isXL, isLG, isMD, isSM, isXS } = conditions;
            
            if (is2XL && section.getAttribute('twk-aos-2xl')) {
                this.getSectionAnimation(section, '2xl');
            } else if (isXL && section.getAttribute('twk-aos-xl')) {
                this.getSectionAnimation(section, 'xl');
            } else if (isLG && section.getAttribute('twk-aos-lg')) {
                this.getSectionAnimation(section, 'lg');
            } else if (isMD && section.getAttribute('twk-aos-md')) {
                this.getSectionAnimation(section, 'md');
            } else if (isSM && section.getAttribute('twk-aos-sm')) {
                this.getSectionAnimation(section, 'sm');
            } else if (isXS && section.getAttribute('twk-aos-xs')) {
                this.getSectionAnimation(section, 'xs');
            } else {
                this.getSectionAnimation(section);
            }
        });
    }
}

// Export additional utilities if needed
export { TWKScrollAnimations as default, gsapEffects }