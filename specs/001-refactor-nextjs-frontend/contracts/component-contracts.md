# Contracts: Frontend Best-Practices Refactor

## Contract 1: Component Boundary Contract
- Intent: Ensure proper Server/Client boundaries per `skills/frontend/nextjs-best-practices.md`.
- Inputs:
  - Existing component responsibilities.
  - Interactivity needs (state, effects, handlers).
- Rules:
  - Default to Server Component for non-interactive rendering/data concerns.
  - Use Client Component only when interactivity is required.
  - For mixed concerns, split into Server parent and Client child.
- Expected Outcomes:
  - Clear responsibility separation.
  - No unnecessary `'use client'` propagation.
  - User-visible behavior unchanged.

## Contract 2: Refactor Safety Contract
- Intent: Keep this work as refactor-only, not feature expansion.
- Rules:
  - Preserve existing user-facing behavior for touched flows.
  - Keep edits minimal and localized to scoped modules.
  - Document any unavoidable best-practice deviation.
- Expected Outcomes:
  - Maintainability improves without introducing regressions.

## Contract 3: Test Scope Contract (Mandatory)
- Intent: Enforce unit-test-only execution and modification boundaries.
- Rules:
  - Required execution command: `npm run test:unit`.
  - `npm test` must execute unit tests only.
  - `npm run test:integration` may exist for future use but must not be executed in this iteration.
  - Integration and E2E tests must not be modified.
  - Integration and E2E suites must not be executed in this iteration.
- Expected Outcomes:
  - Unit test suite passes.
  - No integration/E2E activity occurs.

## Enforcement Notes (T005)
- Any code review for this feature must reject changes under `__tests__/integration` and `__tests__/e2e`.
- Any CI/local execution log attached to this feature must include `npm run test:unit` output.
- If `npm test` executes suites outside `__tests__/unit`, the feature is considered non-compliant until corrected.

## Contract 4: Dependency Contract
- Intent: Prevent unnecessary stack changes.
- Rules:
  - No new non-essential dependencies.
  - Keep framework/library versions aligned with current `package.json`.
- Expected Outcomes:
  - Dependency footprint remains stable.
