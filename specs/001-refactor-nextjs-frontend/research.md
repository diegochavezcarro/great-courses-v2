# Phase 0 Research: Frontend Best-Practices Refactor

## Decision 1: Enforce Server-first component boundaries
- Decision: Keep components as Server Components by default and add Client Components only where interactivity (`useState`, event handlers, effects) is required.
- Rationale: This directly follows `skills/frontend/nextjs-best-practices.md`, reduces client bundle size, and clarifies responsibilities.
- Alternatives considered: Mark broad component trees with `'use client'` for convenience; rejected because it violates the guidance and increases bundle/maintenance cost.

## Decision 2: Preserve current user-facing workflows while refactoring internals
- Decision: Apply minimal, behavior-preserving refactors in course-management components and related data/validation modules.
- Rationale: The spec prioritizes maintainability without introducing feature regressions.
- Alternatives considered: Wide structural rewrite of all frontend modules; rejected because it raises regression risk and exceeds feature scope.

## Decision 3: Unit-test-only validation policy for this iteration
- Decision: Execute validation via `npm run test:unit`; ensure `npm test` resolves to unit tests only; do not run or modify integration/E2E suites.
- Rationale: Constitution v2.1.1 and feature requirements explicitly enforce unit-only scope for refactors.
- Alternatives considered: Running full test pyramid (unit + integration + e2e) for broader confidence; rejected for this iteration due to explicit policy constraints.

## Decision 4: Keep dependency surface unchanged
- Decision: Use existing stack (Next.js, React, Tailwind, Jest/Testing Library) and avoid adding new runtime libraries.
- Rationale: Constitution principle on minimal dependencies and this feature’s non-functional scope both disallow unnecessary additions.
- Alternatives considered: Introducing helper libraries for refactor convenience; rejected because benefits do not justify dependency expansion.

## Decision 5: Contract-first guardrails for safe implementation
- Decision: Define explicit contracts for component boundaries and test command behavior before task generation.
- Rationale: Prevents ambiguity during implementation and reduces accidental violations (e.g., touching integration/E2E).
- Alternatives considered: Deferring all constraints to tasks only; rejected because early contract clarity lowers execution risk.
