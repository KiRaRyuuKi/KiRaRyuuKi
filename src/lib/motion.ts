import type { Transition, Variants } from "motion/react";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SECTION_TRANSITION: Transition = {
  duration: 0.34,
  ease: EASE_OUT,
};

export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: SECTION_TRANSITION },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_OUT } },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: SECTION_TRANSITION },
};

export const POPOVER_TRANSITION: Transition = {
  duration: 0.18,
  ease: EASE_OUT,
};

export const popoverVariants: Variants = {
  initial: { opacity: 0, y: 6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: POPOVER_TRANSITION },
  exit: { opacity: 0, y: 6, scale: 0.98, transition: POPOVER_TRANSITION },
};
