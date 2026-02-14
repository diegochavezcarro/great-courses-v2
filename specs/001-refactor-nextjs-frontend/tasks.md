# Tasks: Frontend Best-Practices Refactor

**Input**: Design documents from `/specs/001-refactor-nextjs-frontend/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Unit tests are REQUIRED for this feature. Integration and E2E tests are explicitly out of scope and MUST NOT be modified or executed.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish repository-level test command and workflow constraints required by all stories.

- [ ] T001 Update unit-only npm scripts contract in package.json
- [ ] T002 Add/confirm unit-only Jest command guidance in specs/001-refactor-nextjs-frontend/quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared refactor baseline and guardrails that all user stories depend on.

**⚠️ CRITICAL**: No user story implementation starts before this phase is complete.

- [ ] T003 [P] Create frontend module boundary inventory in specs/001-refactor-nextjs-frontend/research.md
- [ ] T004 [P] Define compliance checklist entries for touched modules in specs/001-refactor-nextjs-frontend/data-model.md
- [ ] T005 Establish test-scope enforcement notes in specs/001-refactor-nextjs-frontend/contracts/component-contracts.md

**Checkpoint**: Foundation ready — user stories can proceed.

---

## Phase 3: User Story 1 - Improve frontend maintainability (Priority: P1) 🎯 MVP

**Goal**: Refactor frontend modules to comply with Next.js best practices (Server-first boundaries, clear component responsibilities) without changing user-visible behavior.

**Independent Test Criteria**: Touched component unit tests pass, and maintainers can trace clear Server/Client boundaries in modified files.

### Tests for User Story 1 (Unit Only)

- [ ] T006 [P] [US1] Update component render behavior tests in __tests__/unit/course-card.test.tsx
- [ ] T007 [P] [US1] Update list item behavior tests in __tests__/unit/course-list-item.test.tsx
- [ ] T008 [P] [US1] Update form interaction tests in __tests__/unit/course-form-teacher-input.test.tsx

### Implementation for User Story 1

- [ ] T009 [US1] Refactor route composition boundaries in app/page.tsx
- [ ] T010 [US1] Refactor card display responsibility boundaries in components/course-card.tsx
- [ ] T011 [US1] Refactor list rendering boundaries in components/course-management/course-list.tsx
- [ ] T012 [US1] Refactor list item boundary and props flow in components/course-management/course-list-item.tsx
- [ ] T013 [US1] Refactor interactive form boundary in components/course-management/course-form.tsx
- [ ] T014 [US1] Refactor modal orchestration boundary in components/course-management/course-management-modal.tsx

**Checkpoint**: User Story 1 is independently functional and unit-testable.

---

## Phase 4: User Story 2 - Enforce safe test execution scope (Priority: P1)

**Goal**: Ensure the project executes unit tests only via `npm run test:unit` and default `npm test` behavior.

**Independent Test Criteria**: `npm run test:unit` and `npm test` run unit tests only; no integration or E2E suites are triggered.

### Tests for User Story 2 (Unit Only)

- [ ] T015 [P] [US2] Add unit command scope verification test notes in specs/001-refactor-nextjs-frontend/quickstart.md

### Implementation for User Story 2

- [ ] T016 [US2] Implement `test:unit` script and unit-only default test script in package.json
- [ ] T017 [US2] Ensure dedicated non-default integration command remains documented in package.json
- [ ] T018 [US2] Update test scope contract expectations in specs/001-refactor-nextjs-frontend/contracts/component-contracts.md

**Checkpoint**: User Story 2 is independently verifiable via unit-only command behavior.

---

## Phase 5: User Story 3 - Preserve existing user-facing behavior (Priority: P2)

**Goal**: Keep existing course-management outcomes unchanged while applying maintainability refactors.

**Independent Test Criteria**: Regression-focused unit tests pass for touched validation and course-flow behavior.

### Tests for User Story 3 (Unit Only)

- [ ] T019 [P] [US3] Update warning badge regression tests in __tests__/unit/course-form-warning-badge.test.tsx
- [ ] T020 [P] [US3] Update teacher validation regression tests in __tests__/unit/teacher-validation.test.ts
- [ ] T021 [P] [US3] Update course-form regression tests in __tests__/unit/course-form-teacher-input.test.tsx

### Implementation for User Story 3

- [ ] T022 [US3] Refactor course domain defaults and invariants in data/courses.ts
- [ ] T023 [US3] Refactor service behavior-preserving logic in data/services/course-service.ts
- [ ] T024 [US3] Refactor validation behavior-preserving logic in data/utils/validation.ts
- [ ] T025 [US3] Refactor delete flow behavior surface in components/course-management/delete-confirmation.tsx

**Checkpoint**: User Story 3 is independently functional with preserved behavior and passing unit tests.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, documentation, and validation across all stories.

- [ ] T026 [P] Document final best-practice compliance outcomes in specs/001-refactor-nextjs-frontend/research.md
- [ ] T027 Validate completion criteria and scope constraints in specs/001-refactor-nextjs-frontend/checklists/requirements.md
- [ ] T028 Record final unit-only validation steps/results in specs/001-refactor-nextjs-frontend/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies.
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories.
- **Phase 3-5 (User Stories)**: Depend on Phase 2 completion.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; independent of US2/US3.
- **US2 (P1)**: Starts after Foundational; independent of US1/US3 implementation details.
- **US3 (P2)**: Starts after Foundational; may reuse US1-refactored modules but remains independently testable.

### Within Each User Story

- Unit test updates first (where needed), then implementation refactor tasks.
- Keep changes localized to listed files.
- Validate story completion with unit-only criteria before moving on.

### Dependency Graph (Story Completion Order)

- Foundational → US1 (MVP)
- Foundational → US2
- Foundational → US3
- Recommended delivery order: US1 + US2, then US3.

---

## Parallel Opportunities

- **Setup**: T001 and T002 can run in parallel.
- **Foundational**: T003 and T004 can run in parallel.
- **US1**: T006/T007/T008 can run in parallel; T010/T011 can proceed in parallel after T009.
- **US2**: T015 can run in parallel with T016.
- **US3**: T019/T020/T021 can run in parallel; T023/T024 can run in parallel after T022.
- **Polish**: T026 and T028 can run in parallel.

### Parallel Example: User Story 1

```bash
# Parallel test updates
T006 __tests__/unit/course-card.test.tsx
T007 __tests__/unit/course-list-item.test.tsx
T008 __tests__/unit/course-form-teacher-input.test.tsx

# Parallel implementation after route boundary pass
T010 components/course-card.tsx
T011 components/course-management/course-list.tsx
```

### Parallel Example: User Story 2

```bash
# Parallel scope and script work
T015 specs/001-refactor-nextjs-frontend/quickstart.md
T016 package.json
```

### Parallel Example: User Story 3

```bash
# Parallel regression test updates
T019 __tests__/unit/course-form-warning-badge.test.tsx
T020 __tests__/unit/teacher-validation.test.ts
T021 __tests__/unit/course-form-teacher-input.test.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 and Phase 2.
2. Deliver US1 (Phase 3) as the first production-ready increment.
3. Validate US1 independently with unit tests only.

### Incremental Delivery

1. Foundation complete.
2. Deliver US1 (maintainability refactor).
3. Deliver US2 (test command enforcement).
4. Deliver US3 (behavior-preserving hardening).
5. Run final polish and unit-only validation.

### Parallel Team Strategy

1. One developer handles command/test-scope tasks (US2).
2. One developer handles UI boundary refactor tasks (US1).
3. One developer handles data/validation behavior preservation tasks (US3).
4. Merge only after unit-only completion criteria are satisfied.

---

## Notes

- All tasks strictly follow checklist format: `- [ ] T### [P] [US#] Description with file path`.
- Story labels are applied only to user-story phases.
- Integration and E2E tests are excluded by design for this feature.
- Tasks are executable without additional context and aligned to the current plan/spec artifacts.
