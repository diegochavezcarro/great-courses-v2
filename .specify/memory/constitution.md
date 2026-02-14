<!--
Sync Impact Report:
- Version change: 2.1.0 → 2.1.1 (PATCH - policy clarification for test scope and skills enforcement)
- Modified principles: Testing strategy clarified with explicit scope rules and execution constraints
- Added sections: Test Scope & Execution Policy
- Follow-up TODOs: Ensure package.json exposes test:unit and excludes integration/e2e from default test runs
-->

# Great Courses Constitution

## Core Principles

### I. Clean Code (NON-NEGOTIABLE)
Code must be readable, maintainable, and self-documenting. Every component and function should have a single, clear responsibility. Use meaningful names for variables, functions, and components. Follow consistent formatting and TypeScript best practices. Code should tell a story that any developer can understand without extensive comments.

**Rationale**: Clean code reduces cognitive load, accelerates onboarding, and prevents technical debt accumulation.

---

### II. Simple UX Responsive Design
User interface must prioritize simplicity and responsiveness across all devices. Mobile-first approach is mandatory. Use Tailwind CSS utilities for consistent, responsive layouts. Every UI element must serve a clear purpose and contribute to user goals. Avoid unnecessary animations, complex interactions, or visual clutter.

**Rationale**: Simple, responsive design ensures broad accessibility and optimal user experience.

---

### III. Minimal Dependencies
Limit external dependencies to the essential stack: Next.js 14.2.5, React 18.3.1, and Tailwind CSS 3.4.6. Prefer built-in browser APIs and React/Next.js capabilities over third-party solutions for non-testing functionality. Each dependency must solve a critical problem that cannot be reasonably implemented in-house.

**Rationale**: Minimal dependencies reduce security vulnerabilities, bundle size, maintenance overhead, and breaking changes.

---

### IV. Testing Strategy & Scope (NON-NEGOTIABLE)
Every change must be validated by tests. The required test scope (**unit**, **integration**, **end-to-end**) must be explicitly defined in the feature specification.

**Default policy for this project (until amended):**
- The active scope for refactors and incremental improvements is **UNIT tests only**.
- Integration and E2E tests are **out of scope by default** and must not be modified or executed unless a specification explicitly states otherwise.

**Execution rules (strict):**
- Implementations MUST ensure **all unit tests pass**.
- Implementations MUST **run unit tests** as part of the work (locally/CI as applicable).
- Implementations MUST NOT run integration or E2E suites unless explicitly enabled by the current specification.

**Rationale**: This enables safe refactoring and skills compliance without destabilizing higher-level test suites prematurely.

---

## Technology Stack Requirements

**Core Framework**: Next.js 14.2.5 with App Router (mandatory)  
**UI Library**: React 18.3.1 (mandatory)  
**Styling**: Tailwind CSS 3.4.6 (mandatory)  
**Language**: TypeScript 5.5.3 (mandatory)  
**Testing**: Jest + Testing Library for unit tests (mandatory)  
**Optional Testing**: Playwright/Cypress for E2E, integration frameworks as needed (only when explicitly in scope)  
**Node.js**: 18.18+ (development requirement)

All dependency versions must match those specified in package.json. Upgrades require constitutional amendment unless they are patch-level security fixes.

---

## Development Standards

**File Organization**: Follow Next.js App Router conventions with `app/`, `components/`, `lib/`, `data/`, and test directories.

**Component Structure**: Functional components with TypeScript interfaces for props as needed.

**Styling**: Tailwind utility classes only — no custom CSS files except `globals.css`.

**Code Quality**: ESLint configuration must pass without warnings.

**Performance**: Prioritize Core Web Vitals and mobile performance.

---

## Skills Enforcement (NON-NEGOTIABLE)

Frontend implementations MUST comply with:

- `skills/frontend/nextjs-best-practices.md`

This skill document is a binding source of conventions for:
- App Router patterns
- Server vs Client component boundaries
- Data fetching conventions
- Component organization and naming
- Error/loading boundaries
- Performance and best-practice constraints

Any deviation requires explicit justification in the specification.

---

## Test Scope & Execution Policy (Operational)

To avoid accidental destabilization:

1. The repository MUST provide a unit-test command:
   - `npm run test:unit`

2. The default `npm test` SHOULD execute unit tests only.

3. Integration and E2E tests MUST NOT run by default.
   - They must have dedicated commands, e.g.:
     - `npm run test:integration`
     - `npm run test:e2e`

4. During refactors aligned to skills compliance:
   - Modify/fix **unit tests only**
   - Do not edit integration/E2E tests
   - Do not add or change Playwright setup unless explicitly in scope

---

## Governance

This constitution supersedes all other development practices, templates, and guidance documents.

### Amendment Process
Constitution changes require explicit documentation of rationale and semantic version bumping.

### Compliance Review
Every specification must declare:
- Functional scope
- Testing scope (unit/integration/e2e)
- Any justified deviations

### Version Control
Use clear, descriptive commit messages. Reference relevant principles when applicable.

---

**Version**: 2.1.1  
**Ratified**: 2026-02-11  
**Last Amended**: 2026-02-14