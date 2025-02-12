# TWK Scroll Animations

A GSAP-powered scroll animations library that makes it easy to add scroll-triggered animations to your website.

## Installation
```bash
npm install twk-scroll-animations gsap
```

## Dependencies
- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/): Version ^3.0.0
  - Required for powerful, high-performance animations
  - Provides the core animation and ScrollTrigger functionality

## Usage
```javascript
import twkScrollAnimations from 'twk-scroll-animations';

// Initialize basic
const scrollAnimations = new twkScrollAnimations()

// Initialize with optional custom breakpoints
const scrollAnimations = new twkScrollAnimations({
    screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    }
});


// In your HTML
<div twk-aos="fade-up">
Animated content: fade-up on all screens with default duration.
</div>

<div twk-aos="fade-up" twk-aos-duration="800" twk-aos-delay="200" twk-aos-ease="power2.inOut">
Animated content: with duration, delay and ease.
</div>

<div twk-aos="fade-right" twk-aos-xl="fade-left">
Animated content: fade-left on XL screens and up, fade-right on smaller screens.
</div>
```

## Available Animations
- fade-in
- fade-up
- fade-down
- fade-left
- fade-right
- slide-up
- slide-down
- slide-left
- slide-right
- mask-right
- mask-sides


## Adding Custom Animations
```javascript
import twkScrollAnimations, { gsapEffects } from 'twk-scroll-animations'

// Add your custom animation before initializing
gsapEffects.push({
    id: "custom-zoom-in", // This will be the name used in twk-aos attribute
    animate: 'fromTo',
    props1: {
        scale: 0.5,
        autoAlpha: 0
    },
    props2: {
        scale: 1,
        autoAlpha: 1
    }
});

// Initialize after adding custom animations
const scrollAnimations = new twkScrollAnimations();
```

## Animation Properties

The animation object structure:
- `id`: String - The name of your animation
- `animate`: String - Can be 'from', 'to', or 'fromTo'
- `props1`: Object - Initial properties (or 'from' properties for fromTo)
- `props2`: Object - Final properties (only for fromTo animations)

You can use any GSAP properties in your animations, such as:
- `scale`
- `rotation`
- `x`, `y`
- `autoAlpha`
- `opacity`
- `skew`
- And more!


## Accessibility and Performance

### Reduced Motion Support
The library automatically respects user's `prefers-reduced-motion` setting. When a user has enabled reduced motion in their system preferences, animations will be disabled to ensure a comfortable browsing experience.

### No JavaScript Fallback
If JavaScript is disabled or not supported, the library gracefully falls back to displaying content without animations. This ensures that your website remains fully functional and accessible across all browsing environments.


## Attributes
- twk-aos: Animation name
- twk-aos-duration: Animation duration in milliseconds
- twk-aos-delay: Animation delay in milliseconds
- twk-aos-trigger: Custom trigger position
- twk-aos-ease: Custom easing function
- twk-aos-stagger: Stagger value for child elements
- twk-aos-marker: Enable GSAP markers for debugging

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### MIT License Highlights
- Commercial use allowed
- Modifications permitted
- Distribution allowed
- Private use allowed
- No warranty provided
