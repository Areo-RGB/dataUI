# Finley Dashboard

A modern sports analytics dashboard with theme switching.

## Type System

This project uses TypeScript with a dedicated types directory for shared type definitions:

\`\`\`
types/
├── index.ts        # Re-exports all types
├── common.ts       # Common types used across the application
├── dashboard.ts    # Dashboard-specific types
├── layout.ts       # Layout component types
├── performance.ts  # Performance data types
├── tasks.ts        # Task-related types
├── user.ts         # User-related types
├── hooks.ts        # Hook-related types
└── utils.ts        # Utility types
\`\`\`

### Usage Guidelines

1. **Import Types**:
   \`\`\`typescript
   import type { PerformanceData } from '@/types/performance';
   // Or using the barrel export
   import type { PerformanceData } from '@/types';
   \`\`\`

2. **Component Props**:
   - Define component props as interfaces in the types directory
   - Use these interfaces in your components

3. **Type Extensions**:
   - Extend existing types using TypeScript's interface extension
   - Example: `interface CustomPerformanceData extends PerformanceData { ... }`

4. **Type Guards**:
   - Use type guards for runtime type checking
   - Example: `function isPerformanceData(data: unknown): data is PerformanceData { ... }`

## Adding New Types

1. Add your type to the appropriate file in the `types` directory
2. If creating a new domain, add a new file and export from `index.ts`
3. Use descriptive names and add JSDoc comments for complex types
4. Consider reusing existing types through composition or extension
\`\`\`

Let me know if you'd like me to continue with updating more components to use the new type system!
