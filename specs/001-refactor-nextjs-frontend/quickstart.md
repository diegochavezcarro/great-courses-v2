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

## 4) Validate (unit only)
- Run:
  - `npm run test:unit`
- Optional command parity check:
  - `npm test`
- Confirm no integration or E2E tests are run.

## 5) Completion criteria
- Unit tests pass.
- Frontend changes comply with best-practice guidance.
- Integration/E2E files unchanged and suites unexecuted.
