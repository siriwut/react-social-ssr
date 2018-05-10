export const required = (value: string) => (value ? undefined : ['validation.required'])

export const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? ['validation.maxLength', {max}] : undefined

export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? ['validation.minLength', {min}] : undefined

export const isNumber = (value: string) =>
  value && isNaN(Number(value)) ? ['validation.number'] : undefined

export const minValue = (min: number) => (value: string) =>
  value && Number(value) < min ? ['validation.minValue', {min}] : undefined

export const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? ['validation.email']
    : undefined
