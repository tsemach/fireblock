import { Reactor } from "../../src/reactor"

describe('Test Reactor API', function() {
  this.beforeAll(async () => {    
  })

  this.afterAll(() => {  
  })

  it('reactor.test.ts: test reactor parse method', () => {
    const reactor = new Reactor()

    const root = reactor.parse('1+3*6')
    root.print()
  })

})
