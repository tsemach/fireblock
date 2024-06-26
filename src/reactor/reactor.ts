import fs from 'fs'
import { Readline } from '../types'
import { Cell } from '../cell'
import { Parser } from '../parser'

export class Reactor {
  private cells: Cell[]

  constructor() {
  }
  
  load(filename: string) {
    const content = fs.readFileSync(filename).toString()    
    this.cells = new Parser().parse(content)    
        
    this.cells.forEach(cell => {
      if ( ! cell.isComputed() ) {
        cell.emit()
      }
    })
  }
  
  resolve() {
    for (const call of this.cells) {

    }
  }

  set(index: number, value: string) {
    this.cells[index].set(value)
  }

  print(rl?: Readline) {
    for (const cell of this.cells) {
      cell.print(rl)
    }
  }

}