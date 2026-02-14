# Data Model: Frontend Best-Practices Refactor

## Entity: FrontendModule
- Purpose: Represents a frontend file or module included in the refactor scope.
- Fields:
  - `path` (string, required): repository-relative file path.
  - `moduleType` (enum, required): `app-route`, `ui-component`, `feature-component`, `data-service`, `validation-util`, `test`.
  - `interactivityRequired` (boolean, required): whether hooks/event handlers are required.
  - `renderBoundary` (enum, required): `server-default`, `client-required`, `split-server-client`.
  - `status` (enum, required): `identified`, `refactored`, `verified`.
- Validation Rules:
  - `renderBoundary=client-required` only when `interactivityRequired=true`.
  - `moduleType=test` must map to `__tests__/unit` only in this feature.

## Entity: TestScopePolicy
- Purpose: Captures allowed automated test scope for this feature.
- Fields:
  - `allowedSuites` (set, required): must contain only `unit`.
  - `blockedSuites` (set, required): must include `integration`, `e2e`.
  - `enforcedCommands` (set, required): includes `npm run test:unit` and `npm test` (unit-only).
  - `status` (enum, required): `defined`, `enforced`, `validated`.
- Validation Rules:
  - `allowedSuites` cannot include `integration` or `e2e`.
  - `npm test` behavior must be equivalent in scope to `npm run test:unit`.

## Entity: BestPracticeComplianceCheck
- Purpose: Tracks compliance of touched modules with frontend best-practice guidance.
- Fields:
  - `ruleCategory` (enum, required): `server-client-boundary`, `app-router-pattern`, `component-organization`, `performance-constraint`, `error-loading-boundary`.
  - `targetPath` (string, required): module path under review.
  - `result` (enum, required): `pass`, `pass-with-justification`, `fail`.
  - `justification` (string, optional): required when `result=pass-with-justification`.
- Validation Rules:
  - `result=fail` blocks completion.
  - Any deviation from skills guidance must include explicit justification.

## Relationships
- `FrontendModule` is validated by one or more `BestPracticeComplianceCheck` records.
- `TestScopePolicy` constrains which `FrontendModule` records of `moduleType=test` are modifiable.

## State Transitions
- `FrontendModule.status`: `identified -> refactored -> verified`
  - Transition to `verified` requires passing associated `BestPracticeComplianceCheck` entries and unit-test validation.
- `TestScopePolicy.status`: `defined -> enforced -> validated`
  - Transition to `validated` requires successful execution of unit-only commands and no integration/E2E execution.
