# Quickstart: Frontend Best-Practices Refactor

## Preconditions
- Use branch `001-refactor-nextjs-frontend`.
- Keep scope limited to frontend refactor + unit-test command behavior.
- Do not modify or execute integration/E2E tests.

## 1) Prepare workspace
- Install dependencies:
  - `npm install`

## 2) Apply refactor within bounded scope
- Align touched frontend modules with `skills/frontend/nextjs-best-practices.md`:
  - Server-first component decisions.
  - Client components only for interactivity.
  - Clear component responsibility boundaries.
  - Preserve user-visible behavior.

## 3) Enforce test command behavior
- Ensure `package.json` contains a dedicated unit command:
  - `npm run test:unit`
- Ensure default test command is unit-only:
  - `npm test`
- Ensure integration and E2E commands are explicit and non-default:
  - `npm run test:integration`
  - `npm run test:e2e`

## 4) Validate (unit only)
- Run:
  - `npm run test:unit`
- Optional command parity check:
  - `npm test`
- Confirm no integration or E2E tests are run.

## 4.1) Unit command scope verification
- Verify `npm run test:unit` only discovers tests under `__tests__/unit`.
- Verify `npm test` delegates to `npm run test:unit`.
- Do not execute `npm run test:integration` or `npm run test:e2e` in this feature iteration.

## 5) Completion criteria
- Unit tests pass.
- Frontend changes comply with best-practice guidance.
- Integration/E2E files unchanged and suites unexecuted.

## 6) Final validation record (T028)
- Executed on 2026-02-14:
  - `npm run test:unit`
  - `npm test`
- Observed result:
  - 5/5 unit test suites passed
  - 51/51 unit tests passed
  - only `__tests__/unit` suites executed
