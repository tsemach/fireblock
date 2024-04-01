import { ReactorEvent } from "../reactor/reactor-event"
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

  print() {
    process.stdout.write(`[${this.index}: ${this.expression.cal()}], `)
  }

}
