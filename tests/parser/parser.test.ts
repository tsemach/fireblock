import { Parser } from "../../src/parser"
import { expect } from 'chai'

describe('Test Parser API', function() {
  this.beforeAll(async () => {    
  })

  this.afterAll(() => {  
  })

  it('parser.test.ts: test parser parse method', () => {
    const parser = new Parser()

    const root = parser.parseExpression('1+3*6')
    root.print()

    expect(root.value)
  })

  it('parser.test.ts: test parser with link', () => {
    const parser = new Parser()

    const root = parser.parseExpression('1+{3}*6')
    root.print()  
  })

  it('parser.test.ts: test calcullate value after parse', () => {
    const parser = new Parser()

    const root = parser.parseExpression('1+3*6')
    console.log("[parser.test.ts] value of root exrpession:", root.cal())
  })

})
