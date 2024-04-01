import { ValueError } from "../errors"
import { ReactorEvent } from "../reactor/reactor-event"

export class CellNode {
  private _value: string
  private ln: CellNode
  private rn: CellNode

  constructor(value: string) {
    this._value = value
  }

  add(node: CellNode) {
    if ( ! this.ln ) {
      this.ln = node

      return this
    }
    this.rn = node

    if (this.isCurly()) {
      this.on(this.value)
      this._value = `link:${this.value}`
      this.ln = undefined
      this.rn = undefined
    }

    return this
  }
  
  cal() {
    if ( ! this.hasChilds() ) {
      return parseInt(this.value)
    }

    switch(this.value) {
    case '+': return this.ln.cal() + this.rn.cal()
    case '-': return this.ln.cal() - this.rn.cal()
    case '*': return this.ln.cal() * this.rn.cal()
    case '/': return this.ln.cal() / this.rn.cal()
    }
    
    throw new ValueError(`value ${this.value} is illegal`)
  }

  on(index: string) {
    ReactorEvent.instance.on(index, (value) => { this._value = value })
  }

  private hasChilds() {
    return this.ln && this.rn
  }

  isLink() {    
    if (typeof this.value !== 'string') {
      return false
    }

    if (this.value.startsWith('link')) {
      return true
    } 
    if (this.hasChilds()) {
      return this.ln.isLink() || this.rn.isLink()
    }
    
    return false
  }

  isLeaf() {
    return !this.hasChilds()
  }

  isCurly() {
    if ( ! this.hasChilds() ) {
      return false
    }

    return this.ln.value === '{' && this.rn.value === '}'
  }

  get value() {    
    return this._value
  }  

  set value(_value: string) {    
    this._value = _value    
  }  

  print(indent = 0) {
    console.log(this._value.toString().padStart(indent))
    if (this.hasChilds()) {
      this.ln.print(indent + 2)
      this.rn.print(indent + 2)
    }    
  }

}
