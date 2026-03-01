import { defineComponent, ref, computed, unref, useSSRContext, reactive, mergeProps, watch, withCtx, createTextVNode, createVNode, resolveDynamicComponent, toDisplayString, nextTick } from "vue";
import { ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport, ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useTheme } from "./useTheme-6FkntYwY.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { gsap } from "gsap";
import * as THREE from "three";
import "/Users/mac/Documents/new-portfolio/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import { _ as __nuxt_component_0 } from "./nuxt-link-D2KADB1i.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "/Users/mac/Documents/new-portfolio/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/new-portfolio/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/mac/Documents/new-portfolio/node_modules/radix3/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/ufo/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/@unhead/vue/dist/index.mjs";
const blindCount = 8;
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "LoadingIntro",
  __ssrInlineRender: true,
  emits: ["finished"],
  setup(__props, { emit: __emit }) {
    const { isDark } = useTheme();
    const visible = ref(true);
    const showBlinds = ref(false);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref([]);
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (visible.value) {
        _push(`<div class="${ssrRenderClass([unref(isDark) ? "bg-[#0A0A0A]" : "bg-[#F5F5F0]", "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"])}"><div class="absolute inset-0 pointer-events-none opacity-[0.04]" style="${ssrRenderStyle({ "background-image": "linear-gradient(var(--txt-primary) 1px, transparent 1px),\n                         linear-gradient(90deg, var(--txt-primary) 1px, transparent 1px)", "background-size": "60px 60px" })}"></div><div class="absolute pointer-events-none" style="${ssrRenderStyle({ "width": "700px", "height": "700px" })}"><svg class="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 700 700"><circle cx="350" cy="350" r="300" fill="none" stroke="var(--txt-primary)" stroke-width="0.5" stroke-dasharray="6 10"></circle><circle cx="350" cy="350" r="200" fill="none" stroke="var(--txt-primary)" stroke-width="0.4" stroke-dasharray="3 12"></circle><circle cx="350" cy="350" r="100" fill="none" stroke="var(--txt-primary)" stroke-width="0.4"></circle><!--[-->`);
        ssrRenderList(72, (n) => {
          _push(`<g${ssrRenderAttr("transform", `rotate(${n * 5}, 350, 350)`)}><line x1="350" y1="55" x2="350"${ssrRenderAttr("y2", n % 9 === 0 ? 68 : 61)} stroke="var(--txt-primary)"${ssrRenderAttr("stroke-width", n % 9 === 0 ? 0.8 : 0.3)}></line></g>`);
        });
        _push(`<!--]--></svg><div class="absolute inset-0 rounded-full" style="${ssrRenderStyle(`background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 8deg, ${unref(isDark) ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} 30deg, transparent 50deg);`)}"></div></div><div class="relative z-10 text-center px-6"><div class="relative flex items-center justify-center"><div class="flex items-end gap-1 select-none"><span class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight" style="${ssrRenderStyle({ "color": "var(--txt-primary)", "opacity": "0.04" })}">O</span><span class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full mb-[3vw] sm:mb-[2.5vw] md:mb-[1.8vw]" style="${ssrRenderStyle({ "background": "var(--txt-primary)", "opacity": "0.04" })}"></span><span class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight italic" style="${ssrRenderStyle({ "color": "var(--txt-primary)", "opacity": "0.04" })}">A</span></div><div class="absolute inset-0 flex items-end justify-center gap-1 select-none"><span class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight" style="${ssrRenderStyle({ "color": "var(--txt-primary)", "opacity": "0.9" })}">O</span><span class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full mb-[3vw] sm:mb-[2.5vw] md:mb-[1.8vw]" style="${ssrRenderStyle({ "background": "var(--accent)" })}"></span><span class="font-display text-[28vw] sm:text-[22vw] md:text-[16vw] leading-[0.85] tracking-tight italic" style="${ssrRenderStyle({ "color": "var(--accent)" })}">A</span></div></div><div class="mt-4 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase opacity-0" style="${ssrRenderStyle({ "color": "var(--txt-muted)" })}"> OPEOLUWA AYODEJI </div></div><div class="absolute top-6 left-6 md:top-8 md:left-10 font-mono text-[10px] tracking-[0.2em] space-y-1" style="${ssrRenderStyle({ "color": "var(--txt-muted)" })}"><div class="opacity-0">FRONTEND ENGINEER</div><div class="opacity-0">PORTFOLIO v2.0</div></div><div class="absolute top-6 right-6 md:top-8 md:right-10 font-mono text-[10px] tracking-[0.2em] text-right space-y-1" style="${ssrRenderStyle({ "color": "var(--txt-muted)" })}"><div class="opacity-0">${ssrInterpolate(currentYear.value)}</div><div class="opacity-0">&lt;/&gt;</div></div><div class="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-3"><div class="font-mono text-[10px] tracking-[0.3em] opacity-0 uppercase" style="${ssrRenderStyle({ "color": "var(--txt-muted)" })}"> ... initializing ... </div><div class="font-mono text-[11px] tracking-[0.5em] opacity-0" style="${ssrRenderStyle({ "color": "var(--txt-secondary)" })}"> { <span>000</span> } </div><div class="w-40 h-[1px] opacity-0 overflow-hidden" style="${ssrRenderStyle({ "background": "var(--line)" })}"><div class="h-full w-0" style="${ssrRenderStyle({ "background": "var(--accent)" })}"></div></div></div><div class="absolute bottom-6 left-6 md:bottom-8 md:left-10 font-mono text-[10px] tracking-[0.15em]" style="${ssrRenderStyle({ "color": "var(--txt-muted)", "opacity": "0.6" })}"><div class="opacity-0">SYS: READY</div></div><div class="absolute bottom-6 right-6 md:bottom-8 md:right-10 font-mono text-[10px] tracking-[0.15em] text-right" style="${ssrRenderStyle({ "color": "var(--txt-muted)", "opacity": "0.6" })}"><div class="opacity-0">LOADING ASSETS</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (showBlinds.value) {
          _push2(`<div class="fixed inset-0 z-[99] flex flex-row pointer-events-none"><!--[-->`);
          ssrRenderList(blindCount, (n) => {
            _push2(`<div class="${ssrRenderClass([unref(isDark) ? "bg-[#F0EDE8]" : "bg-[#1A1918]", "flex-1 h-full origin-bottom"])}"></div>`);
          });
          _push2(`<!--]--></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadingIntro.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
let lenisInstance = null;
function useLenis() {
  const isReady = ref(false);
  const initLenis = () => {
    return;
  };
  const scrollTo = (target, options) => {
    lenisInstance?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.5
    });
  };
  const stop = () => lenisInstance?.stop();
  const start = () => lenisInstance?.start();
  const destroy = () => {
    lenisInstance?.destroy();
    lenisInstance = null;
    isReady.value = false;
  };
  return {
    initLenis,
    scrollTo,
    stop,
    start,
    destroy,
    isReady
  };
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "TheNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark } = useTheme();
    useLenis();
    const scrolled = ref(false);
    const mobileOpen = ref(false);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const navLinks = reactive([
      { number: "01", label: "Projects", hoverLabel: "Works", id: "featured-works", hovered: false },
      { number: "02", label: "About", hoverLabel: "Story", id: "about", hovered: false },
      { number: "03", label: "Contact", hoverLabel: "Say Hi", id: "contact", hovered: false }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        ref: "navRef",
        class: ["fixed top-0 left-0 right-0 z-50 transition-all duration-500", [scrolled.value ? "nav-blur border-b border-line" : ""]]
      }, _attrs))} data-v-d290f7c1><div class="max-w-site mx-auto px-6 md:px-24 h-20 flex items-center justify-between" data-v-d290f7c1><a href="#" class="logo-link group relative flex items-center gap-0.5" data-v-d290f7c1><span class="logo-char font-display text-2xl md:text-3xl tracking-tight" data-v-d290f7c1>O</span><span class="logo-dot w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent inline-block self-end mb-1.5 md:mb-2 mx-[2px]" data-v-d290f7c1></span><span class="logo-char font-display text-2xl md:text-3xl tracking-tight italic" data-v-d290f7c1>A</span><span class="logo-cursor w-[2px] h-5 md:h-6 bg-accent self-end mb-1 ml-0.5 opacity-0" data-v-d290f7c1></span></a><nav class="hidden md:flex items-center gap-10" data-v-d290f7c1><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(`<a${ssrRenderAttr("href", `#${link.id}`)} class="nav-link group flex items-center gap-2" data-v-d290f7c1><span class="font-mono text-[10px] tracking-widest text-txt-muted italic transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5" data-v-d290f7c1>${ssrInterpolate(link.number)}</span><span class="nav-label-wrap" data-v-d290f7c1><span class="${ssrRenderClass([{ "slide-up": link.hovered }, "nav-label font-sans text-sm font-medium tracking-wide"])}" data-v-d290f7c1>${ssrInterpolate(link.label)}</span><span class="${ssrRenderClass([{ "slide-up": link.hovered }, "nav-label-hover font-sans text-sm font-medium tracking-wide text-accent"])}" data-v-d290f7c1>${ssrInterpolate(link.hoverLabel)}</span></span></a>`);
      });
      _push(`<!--]--><button class="w-9 h-9 rounded-full border border-line flex items-center justify-center transition-smooth hover:border-accent hover:text-accent" aria-label="Toggle theme" data-v-d290f7c1>`);
      if (unref(isDark)) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-d290f7c1><circle cx="12" cy="12" r="5" data-v-d290f7c1></circle><line x1="12" y1="1" x2="12" y2="3" data-v-d290f7c1></line><line x1="12" y1="21" x2="12" y2="23" data-v-d290f7c1></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-v-d290f7c1></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-v-d290f7c1></line><line x1="1" y1="12" x2="3" y2="12" data-v-d290f7c1></line><line x1="21" y1="12" x2="23" y2="12" data-v-d290f7c1></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-v-d290f7c1></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-v-d290f7c1></line></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-d290f7c1><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" data-v-d290f7c1></path></svg>`);
      }
      _push(`</button></nav><button class="md:hidden flex flex-col gap-1.5 p-2" style="${ssrRenderStyle({ "background": "none", "border": "none", "outline": "none", "cursor": "pointer" })}" aria-label="Toggle menu" data-v-d290f7c1><span class="${ssrRenderClass([{ "rotate-45 translate-y-[4px]": mobileOpen.value }, "block w-6 h-px bg-txt-primary transition-all duration-300"])}" data-v-d290f7c1></span><span class="${ssrRenderClass([{ "-rotate-45 -translate-y-[3px]": mobileOpen.value, "opacity-100": !mobileOpen.value }, "block w-6 h-px bg-txt-primary transition-all duration-300"])}" data-v-d290f7c1></span></button></div>`);
      if (mobileOpen.value) {
        _push(`<div class="md:hidden absolute top-20 left-0 right-0 border-b border-line nav-blur" data-v-d290f7c1><nav class="flex flex-col px-6 py-8 gap-6" data-v-d290f7c1><!--[-->`);
        ssrRenderList(navLinks, (link) => {
          _push(`<a${ssrRenderAttr("href", `#${link.id}`)} class="flex items-center gap-3 transition-smooth hover:text-accent" data-v-d290f7c1><span class="font-mono text-[10px] tracking-widest text-txt-muted italic" data-v-d290f7c1>${ssrInterpolate(link.number)}</span><span class="font-sans text-lg font-medium" data-v-d290f7c1>${ssrInterpolate(link.label)}</span></a>`);
        });
        _push(`<!--]--><button class="mt-4 px-4 py-2 border border-line rounded-full text-sm font-sans transition-smooth self-start" data-v-d290f7c1>${ssrInterpolate(unref(isDark) ? "☀ Light Mode" : "☾ Dark Mode")}</button></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheNavigation.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-d290f7c1"]]);
const gridVertexShader = (
  /* glsl */
  `
  uniform float uTime;
  uniform vec3 uMouse3D;
  uniform float uHover;
  uniform float uReveal;

  varying float vHeight;
  varying float vFog;
  varying vec2 vUv;
  varying float vMouseGlow;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Terrain deformation via FBM noise — gentle rolling waves
    float n = fbm(pos.xz * 0.35 + uTime * 0.06);
    float terrain = n * 0.9 * uReveal;

    // Mouse-reactive — smooth soft hill that follows cursor
    float mouseDist = distance(pos.xz, uMouse3D.xz);
    float mouseInfluence = smoothstep(4.5, 0.0, mouseDist) * uHover * 1.2;
    // Soft concentric ripples emanating from cursor
    float mouseRipple = sin(mouseDist * 2.0 - uTime * 2.0) * 0.08 * smoothstep(6.0, 1.5, mouseDist) * uHover;

    pos.y += terrain + mouseInfluence + mouseRipple;

    vHeight = pos.y;
    vMouseGlow = smoothstep(5.0, 0.0, mouseDist) * uHover;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vFog = smoothstep(2.0, 35.0, -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`
);
const gridFragmentShader = (
  /* glsl */
  `
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform float uTime;

  varying float vHeight;
  varying float vFog;
  varying vec2 vUv;
  varying float vMouseGlow;

  void main() {
    // Height-based color blend
    float heightMix = smoothstep(-0.1, 1.5, vHeight);
    vec3 col = mix(uColor, uAccentColor, heightMix * 0.55);

    // Subtle glow around cursor position
    col += uAccentColor * vMouseGlow * 0.4;

    // Subtle pulse at peaks
    col += uAccentColor * smoothstep(0.6, 1.3, vHeight) * 0.15;

    // Edge fade
    float edgeFade = 1.0 - vFog;

    gl_FragColor = vec4(col, edgeFade * 0.5);
  }
`
);
const axisVertexShader = (
  /* glsl */
  `
  varying float vT;
  attribute float aT;

  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
);
const axisFragmentShader = (
  /* glsl */
  `
  uniform vec3 uColor;
  varying float vT;

  void main() {
    float alpha = smoothstep(1.0, 0.0, vT) * 0.35;
    gl_FragColor = vec4(uColor, alpha);
  }
`
);
function useHero3D() {
  let scene;
  let camera;
  let renderer;
  let gridMesh;
  let rafId = null;
  let container = null;
  let isDestroyed = false;
  let time = 0;
  let sceneGroup;
  let gridUniforms;
  let mouseWorld = new THREE.Vector3(100, 0, 100);
  let mouseTarget = new THREE.Vector3(100, 0, 100);
  let hoverStrength = 0;
  let hoverTarget = 0;
  let targetRotY = 0;
  let targetRotX = 0;
  let revealProgress = 0;
  let revealTarget = 0;
  const init = (opts) => {
    container = opts.container;
    isDestroyed = false;
    const accentHex = opts.accentColor || "#6B5D52";
    scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 60);
    camera.position.set(0, 6, 10);
    camera.lookAt(0, 0, 0);
    renderer = new THREE.WebGLRenderer({
      antialias: false,
      // faster — wireframe doesn't need AA
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min((void 0).devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);
    const accentColor = new THREE.Color(accentHex);
    const baseColor = new THREE.Color(6049346);
    sceneGroup = new THREE.Group();
    sceneGroup.position.set(1.5, -2.3, 0);
    scene.add(sceneGroup);
    const gridSize = 28;
    const gridSegments = 50;
    const gridGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);
    gridGeo.rotateX(-Math.PI / 2);
    gridUniforms = {
      uTime: { value: 0 },
      uMouse3D: { value: new THREE.Vector3(100, 0, 100) },
      uHover: { value: 0 },
      uReveal: { value: 0 },
      uColor: { value: baseColor },
      uAccentColor: { value: accentColor }
    };
    const gridMat = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: gridUniforms,
      transparent: true,
      wireframe: true,
      depthWrite: false
    });
    gridMesh = new THREE.Mesh(gridGeo, gridMat);
    sceneGroup.add(gridMesh);
    const axisLength = 8;
    const axisData = [
      { dir: [1, 0, 0] },
      { dir: [0, 1, 0] },
      { dir: [0, 0, 1] }
    ];
    axisData.forEach(({ dir }) => {
      const points = 30;
      const positions = new Float32Array(points * 3);
      const ts = new Float32Array(points);
      for (let i = 0; i < points; i++) {
        const t = i / (points - 1);
        positions[i * 3] = dir[0] * t * axisLength;
        positions[i * 3 + 1] = dir[1] * t * axisLength;
        positions[i * 3 + 2] = dir[2] * t * axisLength;
        ts[i] = t;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("aT", new THREE.BufferAttribute(ts, 1));
      const mat = new THREE.ShaderMaterial({
        vertexShader: axisVertexShader,
        fragmentShader: axisFragmentShader,
        uniforms: { uColor: { value: accentColor } },
        transparent: true,
        depthWrite: false
      });
      const line = new THREE.Line(geo, mat);
      sceneGroup.add(line);
      for (let t = 1; t <= 7; t++) {
        const tickGeo = new THREE.BufferGeometry();
        const tickSize = 0.08;
        const base = [dir[0] * t, dir[1] * t, dir[2] * t];
        const perp = dir[0] === 1 ? [0, tickSize, 0] : [tickSize, 0, 0];
        const tickPositions = new Float32Array([
          base[0] - perp[0],
          base[1] - perp[1],
          base[2] - perp[2],
          base[0] + perp[0],
          base[1] + perp[1],
          base[2] + perp[2]
        ]);
        const tickTs = new Float32Array([t / axisLength, t / axisLength]);
        tickGeo.setAttribute("position", new THREE.BufferAttribute(tickPositions, 3));
        tickGeo.setAttribute("aT", new THREE.BufferAttribute(tickTs, 1));
        const tickLine = new THREE.Line(tickGeo, mat);
        sceneGroup.add(tickLine);
      }
    });
    animate();
  };
  const assembleIn = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        revealTarget = 1;
        setTimeout(resolve, 2e3);
      }, delay);
    });
  };
  const animate = () => {
    if (isDestroyed) return;
    time += 0.01;
    revealProgress += (revealTarget - revealProgress) * 0.035;
    mouseWorld.lerp(mouseTarget, 0.12);
    hoverStrength += (hoverTarget - hoverStrength) * 0.08;
    gridUniforms.uTime.value = time;
    gridUniforms.uMouse3D.value.copy(mouseWorld);
    gridUniforms.uHover.value = hoverStrength;
    gridUniforms.uReveal.value = revealProgress;
    sceneGroup.rotation.y += 3e-4;
    sceneGroup.rotation.y += (targetRotY - sceneGroup.rotation.y) * 0.03;
    sceneGroup.rotation.x += (targetRotX - sceneGroup.rotation.x) * 0.03;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };
  const raycaster = new THREE.Raycaster();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const mouseNDC = new THREE.Vector2();
  const intersectPt = new THREE.Vector3();
  const onMouseMove = (nx, ny) => {
    targetRotY = nx * 0.1;
    targetRotX = -ny * 0.05;
    mouseNDC.set(nx * 2, -ny * 2);
    raycaster.setFromCamera(mouseNDC, camera);
    const hit = raycaster.ray.intersectPlane(groundPlane, intersectPt);
    if (hit) {
      const local = intersectPt.clone();
      sceneGroup.worldToLocal(local);
      mouseTarget.copy(local);
      hoverTarget = 1;
    } else {
      hoverTarget = 0;
    }
  };
  const onResize = () => {
    if (!container || !camera || !renderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  const updateAccentColor = (hex) => {
    if (gridUniforms) gridUniforms.uAccentColor.value.set(hex);
  };
  const updateForDarkMode = (isDark) => {
    if (!gridUniforms) return;
    if (isDark) {
      gridUniforms.uColor.value.set(11049096);
    } else {
      gridUniforms.uColor.value.set(6049346);
    }
  };
  const destroy = () => {
    isDestroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    if (renderer && container) {
      container.removeChild(renderer.domElement);
      renderer.dispose();
    }
    if (sceneGroup) {
      sceneGroup.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          const mat = child.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    }
  };
  return {
    init,
    assembleIn,
    onMouseMove,
    onResize,
    updateAccentColor,
    updateForDarkMode,
    destroy
  };
}
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SectionHero",
  __ssrInlineRender: true,
  props: {
    revealed: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    useLenis();
    const { isDark } = useTheme();
    const hero3D = useHero3D();
    const sectionRef = ref(null);
    ref(null);
    const tagRef = ref(null);
    const headingWordRefs = ref([]);
    const dividerRef = ref(null);
    const subtitleRef = ref(null);
    const ctaRef = ref(null);
    const decorRef = ref(null);
    const metricsRef = ref(null);
    ref(null);
    const roleInnerRef = ref(null);
    const sceneReady = ref(false);
    const fps = ref(60);
    const viewW = ref(1440);
    const viewH = ref(900);
    const localTime = ref("00:00:00");
    performance.now();
    const headingWords = [
      { text: "I", class: "" },
      { text: "craft", class: "" },
      { text: "digital", class: "" },
      { text: "experiences", class: "italic text-accent" },
      { text: "that", class: "" },
      { text: "feel", class: "" },
      { text: "alive.", class: "italic" }
    ];
    const roleTexts = ["FRONTEND ENGINEER", "ENTERPRISE SYSTEM SPECIALIST"];
    let roleIndex = 0;
    let scrambleInterval = null;
    const scrambleTo = (target) => {
      if (!roleInnerRef.value) return;
      const el = roleInnerRef.value;
      const current = el.textContent || "";
      Math.max(current.length, target.length);
      if (scrambleInterval) clearInterval(scrambleInterval);
      scrambleInterval = setInterval();
    };
    const startRoleCycle = () => {
      const cycle = () => {
        roleIndex = (roleIndex + 1) % roleTexts.length;
        scrambleTo(roleTexts[roleIndex]);
        setTimeout(cycle, 4e3);
      };
      setTimeout(cycle, 3e3);
    };
    const runReveal = () => {
      const tl = gsap.timeline();
      tl.to(decorRef.value, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0);
      sceneReady.value = true;
      hero3D.assembleIn(200);
      if (tagRef.value) {
        tl.to(tagRef.value.querySelector("span"), {
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        }, 0.1);
      }
      headingWordRefs.value.forEach((wordEl, i) => {
        tl.to(wordEl, { y: 0, duration: 0.7, ease: "power3.out" }, 0.15 + i * 0.07);
      });
      tl.to(dividerRef.value, { scaleX: 1, duration: 0.7, ease: "power3.out" }, 0.6);
      tl.to(subtitleRef.value, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.75);
      tl.to(ctaRef.value, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.9);
      tl.to(metricsRef.value, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.85);
      setTimeout(startRoleCycle, 2500);
    };
    watch(isDark, (val) => {
      hero3D.updateForDarkMode(val);
    });
    watch(() => props.revealed, (val) => {
      if (val) setTimeout(runReveal, 50);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: "relative min-h-screen w-full flex flex-col justify-center overflow-hidden px-6 md:px-24 pt-24 pb-16"
      }, _attrs))} data-v-e44d4276><div class="architectural-grid" data-v-e44d4276></div><div class="${ssrRenderClass([{ "opacity-0": !sceneReady.value }, "absolute inset-0 pointer-events-none"])}" style="${ssrRenderStyle({ "transition": "opacity 1.2s ease" })}" data-v-e44d4276></div><div class="absolute inset-0 pointer-events-none overflow-hidden opacity-0" data-v-e44d4276><div class="absolute -top-40 -right-40 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full border border-line opacity-[0.08]" data-v-e44d4276></div><div class="absolute -bottom-24 -left-24 w-60 h-60 md:w-96 md:h-96 rounded-full border border-accent opacity-[0.06]" data-v-e44d4276></div></div><div class="relative z-10 max-w-site mx-auto w-full" data-v-e44d4276><div class="space-y-6 md:space-y-8" data-v-e44d4276><div class="overflow-hidden" data-v-e44d4276><span class="mono-tag block translate-y-full" data-v-e44d4276>{ <span data-v-e44d4276>FRONTEND ENGINEER</span> }</span></div><h1 class="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] tracking-tight" data-v-e44d4276><!--[-->`);
      ssrRenderList(headingWords, (word, wi) => {
        _push(`<span class="inline-block overflow-hidden mr-[0.25em]" data-v-e44d4276><span class="${ssrRenderClass([word.class, "inline-block translate-y-full"])}" data-v-e44d4276>${ssrInterpolate(word.text)}</span></span>`);
      });
      _push(`<!--]--></h1><div class="h-px bg-accent origin-left scale-x-0 w-24 md:w-32" data-v-e44d4276></div><p class="font-sans text-base md:text-lg lg:text-xl max-w-xl leading-relaxed opacity-0 translate-y-6" style="${ssrRenderStyle({ "color": "var(--txt-primary)", "opacity": "0.75" })}" data-v-e44d4276> I build enterprise-grade systems that handle real complexity — then make them feel effortless to use. </p><div class="flex items-center gap-6 pt-4 opacity-0 translate-y-6" data-v-e44d4276><a href="#featured-works" class="font-sans text-sm font-medium hover:text-accent transition-smooth flex items-center gap-2" style="${ssrRenderStyle({ "color": "var(--txt-primary)" })}" data-v-e44d4276> View Projects <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-e44d4276><line x1="7" y1="17" x2="17" y2="7" data-v-e44d4276></line><polyline points="7 7 17 7 17 17" data-v-e44d4276></polyline></svg></a><a href="mailto:ayodejiope13@gmail.com" class="font-sans text-sm font-medium hover:text-accent transition-smooth flex items-center gap-2" style="${ssrRenderStyle({ "color": "var(--txt-primary)", "opacity": "0.75" })}" data-v-e44d4276> Get in touch <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-e44d4276><line x1="7" y1="17" x2="17" y2="7" data-v-e44d4276></line><polyline points="7 7 17 7 17 17" data-v-e44d4276></polyline></svg></a></div></div></div><div class="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-24 md:right-24 flex items-end justify-between opacity-0" data-v-e44d4276><div class="flex items-center gap-8 md:gap-12" data-v-e44d4276><div class="font-mono text-[10px] tracking-[0.2em] text-txt-muted" data-v-e44d4276><span class="text-accent font-medium" data-v-e44d4276>${ssrInterpolate(fps.value)}</span> FPS </div><div class="hidden md:block font-mono text-[10px] tracking-[0.2em] text-txt-muted" data-v-e44d4276>${ssrInterpolate(viewW.value)} × ${ssrInterpolate(viewH.value)}</div><div class="font-mono text-[10px] tracking-[0.2em] text-txt-muted" data-v-e44d4276>${ssrInterpolate(localTime.value)}</div></div><button class="flex flex-col items-center gap-2 text-txt-muted cursor-pointer group" data-v-e44d4276><span class="mono-tag group-hover:text-accent transition-smooth" style="${ssrRenderStyle({ "writing-mode": "vertical-rl" })}" data-v-e44d4276>SCROLL</span><div class="w-px h-12 bg-line relative overflow-hidden" data-v-e44d4276><div class="w-full h-4 bg-accent scroll-pulse absolute top-0" data-v-e44d4276></div></div></button></div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionHero.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e44d4276"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SectionProjects",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark } = useTheme();
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref([]);
    ref([]);
    ref([]);
    ref([]);
    ref(null);
    const projects = [
      { slug: "ndic", name: "NDIC Bank Liquidation System", image: "/images/ndic.png", descriptor: "Transitioning NDIC's claims resolution from Excel-based workflows to a fully electronic data capture and verification system." },
      { slug: "nsia", name: "NSIA Vendor Management", image: "/images/nsia.png", descriptor: "Streamlining vendor onboarding, procurement planning, and contract lifecycle management for Nigeria's sovereign wealth authority." },
      { slug: "ncc", name: "NCC Licensing Platform", image: "/images/licensing.png", descriptor: "Automating licence application, evaluation, payment, and issuance for Nigeria's national telecommunications regulator across two separate user portals." }
    ];
    watch(isDark, () => {
      requestAnimationFrame(() => {
        const y = (void 0).scrollY;
        ScrollTrigger.refresh();
        requestAnimationFrame(() => (void 0).scrollTo({ top: y, behavior: "instant" }));
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "featured-works" }, _attrs))} data-v-70a27f5f><div class="fixed z-30 pointer-events-none hidden md:block" style="${ssrRenderStyle({ "left": "24px", "top": "50%", "transform": "translateY(-50%) rotate(-90deg)", "transform-origin": "center", "opacity": "0", "transition": "opacity 0.6s ease" })}" data-v-70a27f5f><span style="${ssrRenderStyle([{ "font-family": "'Space Mono',monospace", "font-size": "10px", "letter-spacing": "0.3em", "text-transform": "uppercase", "white-space": "nowrap" }, { color: unref(isDark) ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }])}" data-v-70a27f5f>Featured Works</span></div><div class="fixed right-0 top-0 z-30 pointer-events-none hidden md:block progress-track" style="${ssrRenderStyle({ "width": "2px", "height": "100vh" })}" data-v-70a27f5f><div class="progress-fill" style="${ssrRenderStyle({ "width": "100%", "transform": "scaleY(0)", "transform-origin": "top", "will-change": "transform" })}" data-v-70a27f5f></div></div><div class="fixed inset-0 z-[55] pointer-events-none blink-overlay hidden md:block" style="${ssrRenderStyle({ "opacity": "0" })}" data-v-70a27f5f></div><div class="block md:hidden" style="${ssrRenderStyle({ "background": "var(--bg-base)" })}" data-v-70a27f5f><div class="mc-header" data-v-70a27f5f><span class="mc-header-label" data-v-70a27f5f>Featured Works</span><span class="mc-header-label" data-v-70a27f5f>03</span></div><!--[-->`);
      ssrRenderList(projects, (project, i) => {
        _push(`<div class="mobile-card" data-v-70a27f5f><div class="mc-num" data-v-70a27f5f>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</div><h2 class="mc-name" data-v-70a27f5f>${ssrInterpolate(project.name)}</h2><div class="mc-rule" data-v-70a27f5f></div><p class="mc-desc" data-v-70a27f5f>${ssrInterpolate(project.descriptor)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/projects/${project.slug}`,
          class: "mc-cta"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View Case Study ↗`);
            } else {
              return [
                createTextVNode("View Case Study ↗")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<img${ssrRenderAttr("src", project.image)}${ssrRenderAttr("alt", project.name)} class="mc-img" data-v-70a27f5f></div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(projects, (_, i) => {
        _push(`<!--[-->`);
        if (i < projects.length - 1) {
          _push(`<div style="${ssrRenderStyle({ "height": "1px", "background": "var(--line)", "margin": "0 24px" })}" data-v-70a27f5f></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="hidden md:block section-bg" style="${ssrRenderStyle({ "opacity": "0" })}" data-v-70a27f5f><!--[-->`);
      ssrRenderList(projects, (project, i) => {
        _push(`<div class="scene-bg relative w-full flex overflow-hidden" style="${ssrRenderStyle({ "height": "100vh" })}" data-v-70a27f5f><div class="flex flex-col justify-center px-16 md:px-24 lg:px-32" style="${ssrRenderStyle({ "width": "50%", "height": "100%", "flex-shrink": "0" })}" data-v-70a27f5f><div style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(40px)" })}" data-v-70a27f5f><span class="number-watermark block" style="${ssrRenderStyle({ "font-family": "'Kalnia',serif", "font-size": "clamp(100px,12vw,160px)", "font-weight": "200", "line-height": "1" })}" data-v-70a27f5f>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><div class="rule my-6" style="${ssrRenderStyle({ "width": "40%", "height": "1px" })}" data-v-70a27f5f></div><h2 class="project-name" style="${ssrRenderStyle({ "font-family": "'Kalnia',serif", "font-size": "clamp(28px,3.5vw,48px)", "font-weight": "500", "line-height": "1.1", "letter-spacing": "-0.02em" })}" data-v-70a27f5f>${ssrInterpolate(project.name)}</h2><p class="descriptor mt-8" style="${ssrRenderStyle({ "font-family": "'Manrope',sans-serif", "font-size": "clamp(14px,1.3vw,17px)", "font-weight": "300", "opacity": "0.65", "line-height": "1.6", "max-width": "400px", "color": "var(--txt-secondary)" })}" data-v-70a27f5f>${ssrInterpolate(project.descriptor)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/projects/${project.slug}`,
          style: { "display": "inline-block", "margin-top": "32px", "font-family": "'Manrope',sans-serif", "font-size": "13px", "font-weight": "500", "letter-spacing": "0.08em", "color": "var(--txt-primary)", "text-decoration": "none", "opacity": "1", "transition": "opacity 0.2s ease" },
          onMouseenter: (e) => e.currentTarget.style.opacity = "0.6",
          onMouseleave: (e) => e.currentTarget.style.opacity = "1"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View Case Study ↗`);
            } else {
              return [
                createTextVNode("View Case Study ↗")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div><div class="panel-bg relative flex items-center justify-center flex-shrink-0" style="${ssrRenderStyle({ "width": "50%", "height": "100%" })}" data-v-70a27f5f><img${ssrRenderAttr("src", project.image)}${ssrRenderAttr("alt", project.name)} style="${ssrRenderStyle({ "width": "80%", "max-height": "75%", "object-fit": "cover", "object-position": "top", "border-radius": "12px", "box-shadow": "0 32px 72px rgba(0,0,0,0.3)", "display": "block", "transform": "translateX(80px) rotate(3deg)", "opacity": "0", "transition": "transform 0.6s cubic-bezier(0.23,1,0.32,1)" })}" data-v-70a27f5f></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionProjects.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-70a27f5f"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SectionAbout",
  __ssrInlineRender: true,
  setup(__props) {
    const sectionRef = ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref([]);
    ref(null);
    ref(null);
    ref(null);
    ref([]);
    ref(null);
    const bioParagraphs = [
      "I got into engineering because I love building things — taking what exists, pushing it further, and watching complexity fold into something that just works. There's a satisfaction in that I haven't found anywhere else.",
      "The problems I'm most drawn to are the ones that are genuinely hard. Not hard because nobody thought about them, but hard because they involve real scale, real users, and real consequences if you get it wrong. I've built systems that thousands of people depend on daily. That weight keeps me honest.",
      "My approach is simple: every problem is solvable. The question is always which solution fits the people who actually have to live with it. I build for the user's mental model, not my own.",
      "When I'm not at a screen, I'm usually solving puzzles, watching Korean variety shows, or deep in a conversation that went longer than anyone expected. I think the same way I code — looking for the pattern underneath everything.",
      "Where I want to be is simple. I want to build things that make hard things feel easy — the kind of automation and tooling that turns hours of human effort into seconds. The way AI is reshaping what's possible is exactly the direction I want to be moving."
    ];
    const timeline = [
      { role: "Frontend Engineer", company: "Encentral Solutions · Abuja", date: "Nov 2022 — Present" },
      { role: "Frontend Engineer Intern", company: "Encentral Solutions · Abuja", date: "Apr 2022 — Nov 2022" }
    ];
    const skills = ["Angular", "React", "Vue.js", "TypeScript", "REST APIs", "GraphQL", "WebSockets", "SSE", "CI/CD", "OAuth2", "JWT", "AWS S3"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        ref_key: "sectionRef",
        ref: sectionRef,
        style: { "background": "var(--bg-base)", "overflow-x": "hidden" }
      }, _attrs))} data-v-81b9649a><div class="about-outer" data-v-81b9649a><div style="${ssrRenderStyle({ "overflow": "hidden" })}" data-v-81b9649a><h2 class="about-heading" style="${ssrRenderStyle({ "clip-path": "inset(0 0 100% 0)" })}" data-v-81b9649a>About</h2></div><p style="${ssrRenderStyle({ "font-family": "'Instrument Serif',Georgia,serif", "font-style": "italic", "font-size": "clamp(24px,3vw,40px)", "font-weight": "400", "color": "var(--txt-primary)", "margin-top": "16px", "margin-bottom": "32px", "opacity": "0", "transform": "translateY(12px)" })}" data-v-81b9649a>Hello, I&#39;m Opeoluwa.</p><div style="${ssrRenderStyle({ "height": "1px", "background": "var(--line)", "transform-origin": "left", "transform": "scaleX(0)", "margin-bottom": "48px" })}" data-v-81b9649a></div><div class="about-columns" data-v-81b9649a><div class="about-left" data-v-81b9649a><div class="bio-block" data-v-81b9649a><!--[-->`);
      ssrRenderList(bioParagraphs, (para, i) => {
        _push(`<p class="bio-para" style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(20px)" })}" data-v-81b9649a>${ssrInterpolate(para)}</p>`);
      });
      _push(`<!--]--></div><a href="/resume.pdf" download class="resume-btn" style="${ssrRenderStyle({ "margin-top": "36px", "display": "inline-block" })}" data-v-81b9649a> Download Resume ↗ </a><div class="quote-block" style="${ssrRenderStyle({ "margin-top": "48px", "opacity": "0", "transform": "translateY(20px)" })}" data-v-81b9649a><p class="quote-text" data-v-81b9649a>&quot;There is nothing so useless as doing efficiently that which should not be done at all.&quot;</p><p class="quote-attr" data-v-81b9649a>— Peter Drucker</p><p class="quote-reflection" data-v-81b9649a>I don&#39;t want to make things that look good for the sake of it. I want to make things that matter — where taking them away would actually be felt.</p></div></div><div class="about-right" style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(20px)" })}" data-v-81b9649a><span class="zone-label" data-v-81b9649a>Experience</span><div class="timeline-wrap" data-v-81b9649a><div class="timeline-track" data-v-81b9649a><div class="timeline-fill" data-v-81b9649a></div></div><!--[-->`);
      ssrRenderList(timeline, (entry, i) => {
        _push(`<div class="timeline-entry" data-v-81b9649a><div class="timeline-node" data-v-81b9649a></div><h3 class="entry-role" data-v-81b9649a>${ssrInterpolate(entry.role)}</h3><p class="entry-company" data-v-81b9649a>${ssrInterpolate(entry.company)}</p><p class="entry-date" data-v-81b9649a>${ssrInterpolate(entry.date)}</p>`);
        if (i < timeline.length - 1) {
          _push(`<div class="entry-divider" data-v-81b9649a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div><div style="${ssrRenderStyle({ "margin-top": "clamp(60px,8vh,100px)", "opacity": "0", "transform": "translateY(20px)" })}" data-v-81b9649a><span class="zone-label" style="${ssrRenderStyle({ "margin-bottom": "24px" })}" data-v-81b9649a>Skills</span><div class="marquee-outer" data-v-81b9649a><div class="marquee-track" data-v-81b9649a><span class="marquee-set" aria-hidden="false" data-v-81b9649a><!--[-->`);
      ssrRenderList(skills, (skill, si) => {
        _push(`<span class="skill-item" data-v-81b9649a>${ssrInterpolate(skill)}`);
        if (si < skills.length - 1) {
          _push(`<span class="skill-dot" data-v-81b9649a> · </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></span><span class="marquee-set" aria-hidden="true" data-v-81b9649a><!--[-->`);
      ssrRenderList(skills, (skill, si) => {
        _push(`<span class="skill-item" data-v-81b9649a>${ssrInterpolate(skill)}`);
        if (si < skills.length - 1) {
          _push(`<span class="skill-dot" data-v-81b9649a> · </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></span></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionAbout.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-81b9649a"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SectionContact",
  __ssrInlineRender: true,
  setup(__props) {
    useLenis();
    const sectionRef = ref(null);
    ref(null);
    ref(null);
    ref([]);
    ref(null);
    const rows = [
      {
        label: "Email",
        value: "Reach out to me ↗",
        href: "mailto:ayodejiope13@gmail.com",
        external: false
      },
      {
        label: "LinkedIn",
        value: "Connect with me ↗",
        href: "https://www.linkedin.com/in/ayodeji-opeoluwa/",
        external: true
      },
      {
        label: "GitHub",
        value: "Check out my work ↗",
        href: "https://github.com/DEVOPEOLUWA/",
        external: true
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        ref_key: "sectionRef",
        ref: sectionRef,
        class: "contact-section"
      }, _attrs))} data-v-76c5d01a><div class="contact-body" data-v-76c5d01a><div class="contact-left" data-v-76c5d01a><p class="contact-opener" style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(16px)" })}" data-v-76c5d01a> &quot;Have a project in mind, or just want to talk engineering?&quot; </p><div class="contact-word-wrap" data-v-76c5d01a><span class="contact-word" style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(40px)" })}" data-v-76c5d01a>Contact</span></div></div><div class="contact-right" data-v-76c5d01a><!--[-->`);
      ssrRenderList(rows, (row, i) => {
        _push(`<div class="contact-row" style="${ssrRenderStyle({ "opacity": "0", "transform": "translateX(20px)" })}" data-v-76c5d01a><div class="row-divider" data-v-76c5d01a></div><div class="row-inner" data-v-76c5d01a><span class="row-label" data-v-76c5d01a>${ssrInterpolate(row.label)}</span>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(row.href ? "a" : "span"), {
          href: row.href || void 0,
          target: row.external ? "_blank" : void 0,
          rel: row.external ? "noopener noreferrer" : void 0,
          class: "row-value"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(row.value)}`);
            } else {
              return [
                createTextVNode(toDisplayString(row.value), 1)
              ];
            }
          }),
          _: 2
        }), _parent);
        _push(`</div></div>`);
      });
      _push(`<!--]--><div class="row-divider" style="${ssrRenderStyle({ "opacity": "0" })}" data-v-76c5d01a></div></div></div><div class="footer-bar" data-v-76c5d01a><div class="footer-rule" data-v-76c5d01a></div><div class="footer-inner" data-v-76c5d01a><span class="footer-text" data-v-76c5d01a>© 2025 Opeoluwa Ayodeji</span><span class="footer-text hidden md:block" data-v-76c5d01a>Design &amp; Engineering by O.A</span><button class="footer-text footer-top-btn" data-v-76c5d01a>BACK TO TOP ↑</button></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionContact.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-76c5d01a"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SectionGuestbook",
  __ssrInlineRender: true,
  setup(__props) {
    const entries = ref([]);
    const submitting = ref(false);
    const showConfirm = ref(false);
    const rateLimited = ref(false);
    const form = reactive({ name: "", message: "" });
    const errors = reactive({ name: "", message: "" });
    function formatDate(iso) {
      try {
        return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      } catch {
        return "";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "guestbook",
        class: "guestbook-section"
      }, _attrs))} data-v-fa820e7a><div class="guestbook-inner" data-v-fa820e7a><span class="gb-label" data-v-fa820e7a>Guestbook</span><p class="gb-sub" data-v-fa820e7a>Leave a note. Say anything.</p>`);
      if (rateLimited.value) {
        _push(`<p class="gb-rate-notice" data-v-fa820e7a>You just left a note — come back in a moment.</p>`);
      } else {
        _push(`<form class="gb-form" data-v-fa820e7a><div class="gb-field-wrap" data-v-fa820e7a><input${ssrRenderAttr("value", form.name)} type="text" placeholder="Your name" class="gb-input" maxlength="80"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-fa820e7a>`);
        if (errors.name) {
          _push(`<p class="gb-error" data-v-fa820e7a>${ssrInterpolate(errors.name)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="gb-field-wrap" style="${ssrRenderStyle({ "margin-top": "16px" })}" data-v-fa820e7a><textarea placeholder="What&#39;s on your mind?" class="gb-input gb-textarea" maxlength="280"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-fa820e7a>${ssrInterpolate(form.message)}</textarea>`);
        if (errors.message) {
          _push(`<p class="gb-error" data-v-fa820e7a>${ssrInterpolate(errors.message)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button type="submit" class="gb-submit"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-fa820e7a>${ssrInterpolate(submitting.value ? "Sending…" : "Leave a note ↗")}</button>`);
        if (showConfirm.value) {
          _push(`<p class="gb-confirm" data-v-fa820e7a>Note left. Thanks.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form>`);
      }
      _push(`<div class="gb-entries" style="${ssrRenderStyle({ "margin-top": "56px" })}" data-v-fa820e7a>`);
      if (entries.value.length === 0) {
        _push(`<p class="gb-empty" data-v-fa820e7a>No notes yet. Be the first.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(entries.value, (entry) => {
        _push(`<div class="gb-entry" data-v-fa820e7a><p class="gb-entry-name" data-v-fa820e7a>${ssrInterpolate(entry.name)}</p><p class="gb-entry-msg" data-v-fa820e7a>${ssrInterpolate(entry.message)}</p><p class="gb-entry-ts" data-v-fa820e7a>${ssrInterpolate(formatDate(entry.created_at))}</p><div class="gb-entry-divider" data-v-fa820e7a></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/SectionGuestbook.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fa820e7a"]]);
const LOADER_KEY = "portfolio_intro_shown";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useLenis();
    const loading = ref(false);
    const contentVisible = ref(false);
    const navVisible = ref(false);
    const heroRevealed = ref(false);
    const onLoadingFinished = () => {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem(LOADER_KEY, "1");
      }
      loading.value = false;
      contentVisible.value = true;
      nextTick(() => {
        setTimeout(() => {
          navVisible.value = true;
        }, 50);
        setTimeout(() => {
          heroRevealed.value = true;
        }, 100);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingIntro = _sfc_main$7;
      const _component_TheNavigation = __nuxt_component_1;
      const _component_SectionHero = __nuxt_component_2;
      const _component_SectionProjects = __nuxt_component_3;
      const _component_SectionAbout = __nuxt_component_4;
      const _component_SectionContact = __nuxt_component_5;
      const _component_SectionGuestbook = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (loading.value) {
        _push(ssrRenderComponent(_component_LoadingIntro, { onFinished: onLoadingFinished }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([
        "transition-opacity duration-200",
        contentVisible.value ? "opacity-100" : "opacity-0"
      ])}">`);
      if (navVisible.value) {
        _push(ssrRenderComponent(_component_TheNavigation, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      _push(ssrRenderComponent(_component_SectionHero, { revealed: heroRevealed.value }, null, _parent));
      _push(ssrRenderComponent(_component_SectionProjects, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionAbout, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionContact, null, null, _parent));
      _push(ssrRenderComponent(_component_SectionGuestbook, null, null, _parent));
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DwwxCWdc.js.map
