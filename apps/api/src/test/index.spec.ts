import { describe, expect, it } from 'vitest'

const sum = (a: number, b: number) => a + b

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toEqual(3)
  })
})
