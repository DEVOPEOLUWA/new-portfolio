export interface Project {
  slug: string
  name: string
  short: string
  category: string
  image: string
  tags: string[]
  brandColor: string
  strip: string[]
  stats: { value: string; label: string }[]
  descriptor: string
  challenge: string
  role: string
}

export const projects: Project[] = [
  {
    slug: 'ndic',
    name: 'NDIC Bank Liquidation System',
    short: 'NDIC',
    category: 'Enterprise · Fintech',
    image: '/images/ndic.png',
    tags: ['Angular 18', 'SSE', 'WebSockets', 'Enterprise'],
    brandColor: '#1a1f6e',
    strip: ['Team of 7–10', 'Frontend Developer', 'Collaborative Build'],
    stats: [
      { value: '20M+', label: 'Depositor records' },
      { value: '6', label: 'Core modules built' },
      { value: '60%', label: 'Coordination time cut' },
      { value: '99.9%', label: 'Upload success rate' },
    ],
    descriptor: "Moving NDIC's claims resolution off Excel and onto a fully electronic data capture and verification system — for 20M+ depositor records.",
    challenge: "NDIC needed to move entirely away from semi-electronic, Excel-based data capture for its Claims Resolution department. The system had to support field data collection on mobile devices, real-time upload to a central server, and seamless integration with downstream reporting systems — all while maintaining strict data integrity across 20M+ depositor records.",
    role: "As part of a cross-functional team of engineers and backend developers, I owned the frontend architecture for the system's most complex modules. I built the real-time background task tracking system using SSE with an HTTP polling fallback — handling inconsistent server event implementations across browsers. I engineered the dynamic filter system with JSON-path querying into embedded database columns, built runtime schema-aware table and header generation from live data shapes, and implemented the core set-off matching logic that nets depositor credit balances against risk assets. I also built the cross-cutting permission guard system with feature-level and action-level access control.",
  },
  {
    slug: 'nsia',
    name: 'NSIA Vendor Management',
    short: 'NSIA',
    category: 'Government · Procurement',
    image: '/images/nsia.png',
    tags: ['Vue.js', 'CI/CD', 'Realtime', 'Government'],
    brandColor: '#1a4a2e',
    strip: ['Team of 4–6', 'Frontend Engineer', 'Collaborative Build'],
    stats: [
      { value: '100+', label: 'Staff users' },
      { value: '70%', label: 'Faster deployments' },
      { value: '40%', label: 'Faster data processing' },
      { value: '7+', label: 'Regulatory systems' },
    ],
    descriptor: "Vendor onboarding, procurement planning and full contract lifecycle management for Nigeria's sovereign wealth authority.",
    challenge: "NSIA needed a single platform to manage the full procurement lifecycle — from annual planning and vendor registration through bid evaluation, contract award, and performance tracking — across multiple internal departments with distinct workflows and approval chains.",
    role: "As one of the major frontend engineers on a 4–6 person team, I was responsible for the entire client-side delivery of the platform. I built the CI/CD pipeline infrastructure that reduced deployment time by 70%, implemented server-side pagination and optimized API integration that improved data processing speed by 40%, and delivered the real-time notification system across both the admin and vendor-facing portals. I also contributed to the records migration module that brought legacy vendor data into the new system.",
  },
  {
    slug: 'ncc',
    name: 'NCC Licensing Platform',
    short: 'NCC',
    category: 'Regulatory · Government',
    image: '/images/licensing.png',
    tags: ['Angular', 'Form engine', 'RBAC', 'UX Engineering'],
    brandColor: '#2d2d8f',
    strip: ['Team of 2–3', 'Frontend Developer', 'Collaborative Build'],
    stats: [
      { value: '6', label: 'Step licensing flow' },
      { value: '3+', label: 'Licence categories' },
      { value: '1000', label: 'Active users' },
      { value: '2', label: 'Portals, one codebase' },
    ],
    descriptor: "Licence application, evaluation, payment and issuance for Nigeria's telecoms regulator — two separate portals, one Angular build.",
    challenge: "NCC required a platform serving two completely separate user personas — licensees applying for telecoms licences and internal NCC evaluators — from a single Angular build. The core complexity was orchestrating heavily stateful, multi-step regulated licensing processes with dynamic form and workflow configuration driven by admin-managed data, while maintaining session resilience through external payment redirects.",
    role: "Working in a small team of 2–3 engineers, I handled all frontend complexity on both the applicant and evaluator portals. I architected the dual-portal authentication and role-based routing system separating applicant and evaluator experiences within a shared codebase. I built the dynamic questionnaire and form builder engine — a runtime-configurable system allowing NCC administrators to create and version application structures without code changes. I also implemented the document management system with conditional validation per licence type, and the session persistence layer that survives external payment redirects and restores full application state on return.",
  },
]
