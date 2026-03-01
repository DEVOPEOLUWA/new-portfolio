import { _ as __nuxt_component_0 } from "./nuxt-link-D2KADB1i.js";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { u as useTheme } from "./useTheme-6FkntYwY.js";
import { u as useHead } from "../server.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/hookable/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/ufo/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mac/Documents/new-portfolio/node_modules/unctx/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/h3/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/radix3/dist/index.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/defu/dist/defu.mjs";
import "/Users/mac/Documents/new-portfolio/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDark } = useTheme();
    const route = useRoute();
    useRouter();
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref([]);
    const allProjects = [
      {
        slug: "ndic",
        name: "NDIC Bank Liquidation System",
        category: "Enterprise · Fintech",
        image: "/images/ndic.png",
        tags: ["Angular 18", "Enterprise", "WebSockets"],
        brandColor: "#1a1f6e",
        strip: ["Team of 7–10", "Frontend Developer", "Collaborative Build"],
        stats: [
          { value: "20M+", label: "Depositor Records", animValue: ref("20M+") },
          { value: "6", label: "Core Modules Built", animValue: ref("6") },
          { value: "60%", label: "Coordination Time Reduced", animValue: ref("60%") },
          { value: "99.9%", label: "Upload Success Rate", animValue: ref("99.9%") }
        ],
        challenge: "NDIC needed to move entirely away from semi-electronic, Excel-based data capture for its Claims Resolution department. The system had to support field data collection on mobile devices, real-time upload to a central server, and seamless integration with downstream reporting systems — all while maintaining strict data integrity across 20M+ depositor records.",
        role: "As part of a cross-functional team of engineers and backend developers, I owned the frontend architecture for the system's most complex modules. I built the real-time background task tracking system using SSE with an HTTP polling fallback — handling inconsistent server event implementations across browsers. I engineered the dynamic filter system with JSON-path querying into embedded database columns, built runtime schema-aware table and header generation from live data shapes, and implemented the core set-off matching logic that nets depositor credit balances against risk assets. I also built the cross-cutting permission guard system with feature-level and action-level access control."
      },
      {
        slug: "nsia",
        name: "NSIA Vendor Management",
        category: "Government · Procurement",
        image: "/images/nsia.png",
        tags: ["Vue.js", "Government", "Frontend Lead"],
        brandColor: "#1a4a2e",
        strip: ["Team of 4–6", "Sole Frontend Engineer", "Collaborative Build"],
        stats: [
          { value: "100+", label: "Staff Users", animValue: ref("100+") },
          { value: "Full", label: "Procurement Lifecycle", animValue: ref("Full") },
          { value: "2", label: "User Role Types", animValue: ref("2") },
          { value: "7+", label: "Regulatory Systems", animValue: ref("7+") }
        ],
        challenge: "NSIA needed a single platform to manage the full procurement lifecycle — from annual planning and vendor registration through bid evaluation, contract award, and performance tracking — across multiple internal departments with distinct workflows and approval chains.",
        role: "As the sole frontend engineer on a 4–6 person team, I was responsible for the entire client-side delivery of the platform. I built the CI/CD pipeline infrastructure that reduced deployment time by 70%, implemented server-side pagination and optimized API integration that improved data processing speed by 40%, and delivered the real-time notification system across both the admin and vendor-facing portals. I also contributed to the records migration module that brought legacy vendor data into the new system."
      },
      {
        slug: "ncc",
        name: "NCC Licensing Platform",
        category: "Regulatory · Government",
        image: "/images/licensing.png",
        tags: ["Angular", "Regulatory", "UX Engineering"],
        brandColor: "#2d2d8f",
        strip: ["Team of 2–3", "Frontend Developer", "Collaborative Build"],
        stats: [
          { value: "6", label: "Step Licensing Flow", animValue: ref("6") },
          { value: "3+", label: "Licence Categories", animValue: ref("3+") },
          { value: "1000", label: "Active Users", animValue: ref("1000") },
          { value: "40%", label: "Data Processing Improvement", animValue: ref("40%") }
        ],
        challenge: "NCC required a platform serving two completely separate user personas — licensees applying for telecoms licences and internal NCC evaluators — from a single Angular build. The core complexity was orchestrating heavily stateful, multi-step regulated licensing processes with dynamic form and workflow configuration driven by admin-managed data, while maintaining session resilience through external payment redirects.",
        role: "Working in a small team of 2–3 engineers, I handled all frontend complexity on both the applicant and evaluator portals. I architected the dual-portal authentication and role-based routing system separating applicant and evaluator experiences within a shared codebase. I built the dynamic questionnaire and form builder engine — a runtime-configurable system allowing NCC administrators to create and version application structures without code changes. I also implemented the document management system with conditional validation per licence type, and the session persistence layer that survives external payment redirects and restores full application state on return."
      }
    ];
    const slug = computed(() => route.params.slug);
    const project = computed(() => allProjects.find((p) => p.slug === slug.value) ?? allProjects[0]);
    const currentIndex = computed(() => allProjects.findIndex((p) => p.slug === slug.value));
    const prevProject = computed(() => allProjects[(currentIndex.value - 1 + allProjects.length) % allProjects.length]);
    const nextProject = computed(() => allProjects[(currentIndex.value + 1) % allProjects.length]);
    useHead(() => ({
      title: `${project.value.name} — Opeoluwa Ayodeji`,
      meta: [{ name: "description", content: project.value.challenge }]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: [{ "min-height": "100vh" }, { background: unref(isDark) ? "#0a0a0a" : "#f5f5f0" }]
      }, _attrs))}><div class="fixed left-0 top-0 w-full z-[200] pointer-events-none" style="${ssrRenderStyle([{ "height": "50vh" }, { background: project.value.brandColor }])}"></div><div class="fixed left-0 bottom-0 w-full z-[200] pointer-events-none" style="${ssrRenderStyle([{ "height": "50vh" }, { background: project.value.brandColor }])}"></div><div class="fixed top-6 left-8 z-50"><button class="flex items-center gap-2 group" style="${ssrRenderStyle({ "background": "none", "border": "none", "cursor": "pointer", "padding": "0", "font-family": "'Space Mono', monospace" })}"><span class="transition-transform duration-300 group-hover:-translate-x-1" style="${ssrRenderStyle([{ "font-size": "12px" }, { color: unref(isDark) ? "rgba(240,237,232,0.5)" : "rgba(26,25,24,0.5)" }])}">←</span><span style="${ssrRenderStyle([{ "font-size": "11px", "letter-spacing": "0.15em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.5)" : "rgba(26,25,24,0.5)" }])}">All Work</span></button></div><section class="w-full px-12 md:px-20 pt-28 pb-0" style="${ssrRenderStyle({ background: project.value.brandColor })}"><div style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(100%)", "overflow": "hidden" })}"><p style="${ssrRenderStyle({ "font-family": "'Space Mono', monospace", "font-size": "11px", "letter-spacing": "0.25em", "text-transform": "uppercase", "color": "rgba(255,255,255,0.45)", "margin-bottom": "24px" })}">${ssrInterpolate(project.value.category)}</p><h1 style="${ssrRenderStyle({ "font-family": "'Kalnia', Georgia, serif", "font-size": "clamp(40px, 6vw, 88px)", "font-weight": "700", "color": "#fff", "line-height": "0.95", "letter-spacing": "-0.02em" })}">${ssrInterpolate(project.value.name)}</h1><div class="flex items-center flex-wrap mt-6" style="${ssrRenderStyle({ "gap": "0" })}"><!--[-->`);
      ssrRenderList(project.value.strip, (item, idx) => {
        _push(`<span class="flex items-center"><span style="${ssrRenderStyle({ "font-family": "'Space Mono', monospace", "font-size": "11px", "letter-spacing": "0.15em", "text-transform": "uppercase", "color": "rgba(255,255,255,0.5)", "white-space": "nowrap" })}">${ssrInterpolate(item)}</span>`);
        if (idx < project.value.strip.length - 1) {
          _push(`<span style="${ssrRenderStyle({ "display": "inline-block", "width": "1px", "height": "12px", "background": "rgba(255,255,255,0.25)", "margin": "0 16px", "flex-shrink": "0" })}"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-center" style="${ssrRenderStyle({ "opacity": "0", "transform": "translateY(-40px)", "margin-top": "40px" })}"><img${ssrRenderAttr("src", project.value.image)}${ssrRenderAttr("alt", project.value.name)} style="${ssrRenderStyle({ "width": "80%", "max-width": "900px", "height": "auto", "object-fit": "cover", "object-position": "top", "border-radius": "16px 16px 0 0", "box-shadow": "0 -20px 80px rgba(0,0,0,0.35)", "display": "block" })}"></div></section><section style="${ssrRenderStyle({ "background": "var(--bg-surface)", "width": "100%" })}"><div class="grid grid-cols-2 md:grid-cols-4"><!--[-->`);
      ssrRenderList(project.value.stats, (stat, i) => {
        _push(`<div class="flex flex-col justify-center px-10 py-14 border-r last:border-r-0" style="${ssrRenderStyle({ "border-color": "var(--line)", "opacity": "0", "transform": "translateY(20px)" })}"><span style="${ssrRenderStyle({ "font-family": "'Kalnia', Georgia, serif", "font-size": "clamp(36px, 5vw, 64px)", "font-weight": "600", "color": "var(--txt-primary)", "line-height": "1", "display": "block" })}">${ssrInterpolate(stat.animValue)}</span><span style="${ssrRenderStyle({ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.2em", "text-transform": "uppercase", "color": "var(--txt-secondary)", "margin-top": "8px", "display": "block" })}">${ssrInterpolate(stat.label)}</span></div>`);
      });
      _push(`<!--]--></div></section><section class="w-full grid grid-cols-1 md:grid-cols-2" style="${ssrRenderStyle({ "opacity": "0", "background": "var(--bg-base)", "transition": "background-color 0.4s ease" })}"><div class="px-12 md:px-20 py-20 md:py-28 border-r" style="${ssrRenderStyle({ "border-color": "var(--line)" })}"><p style="${ssrRenderStyle({ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.25em", "text-transform": "uppercase", "margin-bottom": "32px", "color": "var(--txt-secondary)" })}">The Challenge</p><p style="${ssrRenderStyle({ "font-family": "'Instrument Serif', Georgia, serif", "font-size": "clamp(18px, 1.8vw, 24px)", "line-height": "1.6", "color": "var(--txt-primary)" })}">${ssrInterpolate(project.value.challenge)}</p></div><div class="px-12 md:px-20 py-20 md:py-28"><p style="${ssrRenderStyle({ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.25em", "text-transform": "uppercase", "margin-bottom": "32px", "color": "var(--txt-secondary)" })}">My Role</p><p style="${ssrRenderStyle({ "font-family": "'Manrope', sans-serif", "font-size": "clamp(15px, 1.4vw, 18px)", "font-weight": "300", "line-height": "1.7", "color": "var(--txt-secondary)" })}">${ssrInterpolate(project.value.role)}</p></div></section><footer class="w-full grid grid-cols-3 items-center" style="${ssrRenderStyle({
        background: unref(isDark) ? "#0a0a0a" : "#f5f5f0",
        borderTop: unref(isDark) ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)"
      })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/projects/${prevProject.value.slug}`,
        class: "flex items-center gap-3 px-10 py-10 group",
        style: { "text-decoration": "none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-mono text-sm group-hover:-translate-x-1 transition-transform duration-300" style="${ssrRenderStyle({ color: unref(isDark) ? "#f0ede8" : "#1a1918" })}"${_scopeId}>←</span><div class="flex flex-col"${_scopeId}><span style="${ssrRenderStyle([{ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.2em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.35)" : "rgba(26,25,24,0.35)" }])}"${_scopeId}>Previous</span><span style="${ssrRenderStyle([{ "font-family": "'Kalnia', Georgia, serif", "font-size": "14px", "margin-top": "4px" }, { color: unref(isDark) ? "#f0ede8" : "#1a1918" }])}"${_scopeId}>${ssrInterpolate(prevProject.value.name)}</span></div>`);
          } else {
            return [
              createVNode("span", {
                class: "font-mono text-sm group-hover:-translate-x-1 transition-transform duration-300",
                style: { color: unref(isDark) ? "#f0ede8" : "#1a1918" }
              }, "←", 4),
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("span", {
                  style: [{ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.2em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.35)" : "rgba(26,25,24,0.35)" }]
                }, "Previous", 4),
                createVNode("span", {
                  style: [{ "font-family": "'Kalnia', Georgia, serif", "font-size": "14px", "margin-top": "4px" }, { color: unref(isDark) ? "#f0ede8" : "#1a1918" }]
                }, toDisplayString(prevProject.value.name), 5)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex justify-center items-center py-10",
        style: { "text-decoration": "none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle([{ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.25em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.4)" : "rgba(26,25,24,0.4)" }])}"${_scopeId}>All Work</span>`);
          } else {
            return [
              createVNode("span", {
                style: [{ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.25em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.4)" : "rgba(26,25,24,0.4)" }]
              }, "All Work", 4)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/projects/${nextProject.value.slug}`,
        class: "flex items-center justify-end gap-3 px-10 py-10 group",
        style: { "text-decoration": "none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-end"${_scopeId}><span style="${ssrRenderStyle([{ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.2em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.35)" : "rgba(26,25,24,0.35)" }])}"${_scopeId}>Next</span><span style="${ssrRenderStyle([{ "font-family": "'Kalnia', Georgia, serif", "font-size": "14px", "margin-top": "4px" }, { color: unref(isDark) ? "#f0ede8" : "#1a1918" }])}"${_scopeId}>${ssrInterpolate(nextProject.value.name)}</span></div><span class="font-mono text-sm group-hover:translate-x-1 transition-transform duration-300" style="${ssrRenderStyle({ color: unref(isDark) ? "#f0ede8" : "#1a1918" })}"${_scopeId}>→</span>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-end" }, [
                createVNode("span", {
                  style: [{ "font-family": "'Space Mono', monospace", "font-size": "10px", "letter-spacing": "0.2em", "text-transform": "uppercase" }, { color: unref(isDark) ? "rgba(240,237,232,0.35)" : "rgba(26,25,24,0.35)" }]
                }, "Next", 4),
                createVNode("span", {
                  style: [{ "font-family": "'Kalnia', Georgia, serif", "font-size": "14px", "margin-top": "4px" }, { color: unref(isDark) ? "#f0ede8" : "#1a1918" }]
                }, toDisplayString(nextProject.value.name), 5)
              ]),
              createVNode("span", {
                class: "font-mono text-sm group-hover:translate-x-1 transition-transform duration-300",
                style: { color: unref(isDark) ? "#f0ede8" : "#1a1918" }
              }, "→", 4)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-D55LgPkk.js.map
