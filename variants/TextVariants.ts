// If using framer-motion, import Variants type
import { Variants } from "framer-motion";

const revealFromBottom: Variants = {
  hidden: { opacity: 0, y: -10, transition: { type: "tween", duration: 0.5 } },
  hovered: { opacity: 1, y: -20, transition: { type: "tween", duration: 0.5 } },
};
export { revealFromBottom };
