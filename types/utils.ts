/**
 * Type for class name utility function
 */
export type ClassNameValue = string | number | boolean | undefined | null
export type ClassNameMapping = Record<string, boolean | undefined | null>
export type ClassNameArgument = ClassNameValue | ClassNameMapping | ClassNameArgument[]

/**
 * Type for the cn utility function
 */
export type ClassNamesFn = (...args: ClassNameArgument[]) => string
