export const SWIFT_SPRING: any = {
  type: "spring",
  stiffness: 350,
  damping: 28,
  mass: 0.8,
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: SWIFT_SPRING },
};
