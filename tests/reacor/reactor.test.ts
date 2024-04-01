import fs from 'fs'
import { Reactor } from "../../src/reactor/reactor"

describe('Test Reactor API', function() {
  this.beforeAll(async () => {    
  })

  this.afterAll(() => {  
  })

  it('reactor.test.ts: test reactor simple expression', () => {
    const reactor = new Reactor()
    const filename = 'fireblock.simple'
    
    console.log(__dirname)
    fs.writeFileSync(filename, '2, ={0}+1*5')

    reactor.load(filename)
    reactor.print()
  })

  it('reactor.test.ts: test reactor full load method', () => {
    const reactor = new Reactor()
    const filename = 'fireblock.full'
    
    console.log(__dirname)
    fs.writeFileSync(filename, '2, 18, =2*{0}, 9, ={2}+1*5')

    reactor.load(filename)
    reactor.print()
  })

})
