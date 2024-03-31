import fs from 'fs'
import { utils } from './utils'
import { ParseError } from './errors'

export class CellNode {
  private value: string | number
  private ln: CellNode
  private rn: CellNode

  constructor(value: string | number) {
    this.value = value
  }

  add(node: CellNode) {
    if ( ! this.ln ) {
      this.ln = node

      return this
    }

    this.rn = node

    return this
  }

  print(indent = 0) {
    console.log(this.value.toString().padStart(indent))
    if (this.hasChilds()) {
      this.ln.print(indent + 2)
      this.rn.print(indent + 2)
    }    
  }

  private isStringGuard(value: string | number): value is string {
    return typeof value === 'string'
  }

  private hasChilds() {
    return this.ln && this.rn
  }
}

export class Reactor {
  
  constructor() {
  }
  
  load(filename: string) {
    const content = fs.readFileSync(filename).toString()
    console.log('content', content)
    
    const tokens = content.split(',')
    console.log('tokens', tokens)    
  }
  
  parse(expression: string) {
    const tokens = expression.split('');
    const stack = [];
    let root: CellNode
    
    for (let token of tokens) {
      if (utils.isDigit(token)) {
        if (stack.length === 0) {
          // this is the left side of a node
          stack.push(new CellNode(parseInt(token)));

          continue
        }

        // this is the right side of node        
        root = stack.pop().add(new CellNode(token))
        stack.push(root)        

        continue
      }

      if ( ! utils.isOps(token)) {
        throw new ParseError(`expecting operation but got: ${token}`)
      }
      
      const node = new CellNode(token).add(stack.pop())
      stack.push(node)
      root = node
    }

    return root
  }

}