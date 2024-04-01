import { Cell } from "../cell";
import { CellNode } from "../cell/cell-node";
import { ParseError } from "../errors";
import { utils } from "../utils";

export class Parser {
  
  parse(content: string) {
    const inputs = content.split(',')
    const cells: Cell[] = []

    for (let i = 0; i < inputs.length; i++) {      
      const input = inputs[i].replace(/\s/g,'')

      if (input.charAt(0) === '=') {
        const root = this.parseExpression(input.substring(1))
        cells.push(new Cell(i, root))

        continue
      }

      cells.push(new Cell(i, new CellNode(input)))
    }

    return cells
  }

  parseExpression(expression: string) {
    const tokens = expression.split('');
    const stack: CellNode[] = [];
    let root: CellNode
    
    for (let token of tokens) {

      if (utils.isOpenLink(token)) {
        stack.unshift(new CellNode(token));
        continue
      }

      if (utils.isDigit(token)) {        
        if (stack.length === 0) {
          // this is the left side of a node
          stack.push(new CellNode(token));
          continue
        }

        const top = stack.shift()
        if (utils.isOpenLink(top.value)) {
          // this case is {2 top = '{', token='2'
          root = new CellNode(token).add(top)
          stack.unshift(root)        
  
          continue
        }

        // this case is 2+3, top='+', token='3'
        root = top.add(new CellNode(token))
        stack.push(root)        

        continue
      }
      
      if (utils.isCloseLink(token)) {
        root = stack.shift().add(new CellNode(token))
        if (stack.length > 0) {
          root = stack.shift().add(root)
          
        }
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