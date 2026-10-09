---
name: test-driven-development
description: RED/GREEN/REFACTOR workflow
---

# Test Driven Development Skill

Use when following TDD methodology for all code changes.

## RED/GREEN/REFACTOR Cycle

1. **RED**: Write failing test first
2. **GREEN**: Write minimal code to pass
3. **REFACTOR**: Improve code while keeping tests green

## Test Types

- **Unit**: Pure functions, hooks, utilities
- **Integration**: Component interactions, context providers
- **E2E**: User flows, critical paths
- **Visual**: Component screenshots

## Rules

- Test before implementation
- One assertion per test (when possible)
- Descriptive test names
- Arrange-Act-Assert pattern
- Mock external dependencies
- Test edge cases
- Maintain >80% coverage

## Tools

- Vitest for unit/integration
- Playwright for E2E
- Testing Library for components
- MSW for API mocking