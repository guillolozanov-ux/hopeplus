"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { curva } from "@/styles/tokens";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, DrawSVGPlugin, Flip, CustomEase, useGSAP);

// Curvas de marca disponibles por nombre en cualquier tween: ease: "inOutFuerte"
Object.entries(curva).forEach(([nombre, valores]) => CustomEase.create(nombre, valores));

gsap.defaults({ ease: "expo.out", duration: 1.1 });

/** Media query compartida para respetar `prefers-reduced-motion`. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, Draggable, Flip, useGSAP };
