---
name: spec-driven-development
description: Specification-driven workflow
---

# Spec Driven Development Skill

Use when following specification-driven development for features.

## Workflow

1. **SPEC**: Write detailed specification before code
2. **PLAN**: Break into vertical slices
3. **IMPLEMENT**: Build each slice completely
4. **VERIFY**: Test against spec
5. **DOCUMENT**: Update docs

## Spec Template

```markdown
# Feature: [Name]

## User Story
As a [user] I want to [action] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Requirements
- Performance: < 100ms
- Accessibility: WCAG AA
- Browser support: Modern + Safari 14+

## UI/UX Spec
- Design system tokens
- Responsive breakpoints
- Animation specs
- Error states
- Loading states

## Data Model
- Types
- API contracts
- Validation rules

## Edge Cases
- Empty states
- Error handling
- Offline support
```

## Arcade Theme Specs

Every component spec must include:
- Neon color usage
- CRT effect integration
- Reduced motion alternative
- Accessibility requirements