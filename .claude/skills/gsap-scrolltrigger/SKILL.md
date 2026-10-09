---
name: gsap-scrolltrigger
description: Scroll-driven animations, pinning, scrubbing
---

# GSAP ScrollTrigger Skill

Use when implementing scroll-driven animations with GSAP ScrollTrigger.

## Key Concepts

- ScrollTrigger.create() for basic triggers
- scrub: true for smooth scrubbing
- pin: true for pinning elements
- toggleActions for enter/leave events
- batch for multiple elements
- matchMedia for responsive triggers

## Performance Rules

- Use transform over width/height
- Limit simultaneous animations
- Use will-change sparingly
- Kill triggers on unmount
- Refresh on layout changes

## Arcade Theme Animations

- Neon pulse on scroll
- Parallax backgrounds
- Pin sections for 3D scenes
- Stagger reveals
- Text reveal animations