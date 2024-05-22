import { expect, test } from "vitest";
import { Either, left, right } from "./either";
import { describe } from "node:test";

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

describe('Either', () => {
  test('success result', () => {
    const result = doSomething(true)
  
    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })
  
  test('false result', () => {
    const result = doSomething(false)
  
    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})