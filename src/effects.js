import gsap from 'gsap'

/*
* Add new custom animations here.
*
* Important: to prevent flashing on load opacity 0 is added with CSS.
*  - autoAlpha value needs to be added always.
*  - if you don't want the opacity to be animated, add autoAlpha: 1 in both props1 and props2.
*/
export const gsapEffects = [
    { 
		id: "none",
		animate: 'fromTo',
		props1: { autoAlpha: 1 },
		props2: { autoAlpha: 1 }
	},
	{ 
		id: "fade-in",
		animate: 'fromTo',
		props1: { autoAlpha: 0 },
		props2: { autoAlpha: 1 }
	},
	{
		id: "fade-up",
		animate: 'fromTo',
		props1: { autoAlpha: 0, y: '100px' },
		props2: { autoAlpha: 1, y: '0px' }
	},
	{
		id: "fade-down",
		animate: 'fromTo',
		props1: { autoAlpha: 0, y: '-100px' },
		props2: { autoAlpha: 1, y: '0px' }
	},
	{
		id: "fade-left",
		animate: 'fromTo',
		props1: { autoAlpha: 0, x: '100px' },
		props2: { autoAlpha: 1, x: '0' }
	},
	{
		id: "fade-right",
		animate: 'fromTo',
		props1: { autoAlpha: 0, x: '-100px' },
		props2: { autoAlpha: 1, x: '0' }
	},
	{
		id: "slide-up",
		animate: 'fromTo',
		props1: { autoAlpha: 1, y: '100px' },
		props2: { autoAlpha: 1, y: '0' }
	},
	{
		id: "slide-down",
		animate: 'fromTo',
		props1: { autoAlpha: 1, y: '-100px' },
		props2: { autoAlpha: 1, y: '0' }
	},
	{
		id: "slide-left",
		animate: 'fromTo',
		props1: { autoAlpha: 1, x: '100px' },
		props2: { autoAlpha: 1, x: '0' }
	},
	{
		id: "slide-right",
		animate: 'fromTo',
		props1: { autoAlpha: 1, x: '-100px' },
		props2: { autoAlpha: 1, x: '0' }
	},
	{
		id: "mask-right",
		animate: 'fromTo',
		props1: { autoAlpha: 1, clipPath: 'inset(0% 100% 0% 0%)' },
		props2: { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' }
	},
	{
		id: "mask-sides",
		animate: 'fromTo',
		props1: { autoAlpha: 1, clipPath: 'inset(0% 30% 0% 30%)' },
		props2: { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' }
	},
];

export function initializeEffects() {
    gsapEffects.forEach(effect => {
        gsap.registerEffect({
            name: effect.id,
            extendTimeline: true,
            defaults: {}, // Add default values if needed
            effect(targets, config) {
                if (effect.animate === 'from') {
                    return gsap.from(targets, { ...effect.props1, ...config })
                } 
                else if (effect.animate === 'fromTo') {
                    return gsap.fromTo(targets, { ...effect.props1 }, { ...effect.props2, ...config })
                } else {
                    return gsap.to(targets, { ...effect.props1, ...config })
                }
            }
        });
    });
} 