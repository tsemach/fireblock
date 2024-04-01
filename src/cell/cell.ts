import { ReactorEvent } from "../reactor/reactor-event"
import { Readline } from "../types"
import { CellNode } from "./cell-node"

export class Cell {  
  private index: number
  private expression: CellNode

  constructor(index: number, expression: CellNode) {
    this.index = index
    this.expression = expression
  }

  isComputed() {
    return this.expression.isLink()
  }

  emit() {
    ReactorEvent.instance.emit(this.index.toString(), this.expression.cal())
  }

  get() {
    return { index: this.index, value: this.expression.cal }
  }

  print(rl?: Readline) {
    if (rl) {
      rl.write(`[${this.index}: ${this.expression.cal()}], `)  

      return
    }
    process.stdout.write(`[${this.index}: ${this.expression.cal()}], `)
  }

}
