import { EventBridge } from "./event"

export class CellNode {
  private _value: string | number
  private ln: CellNode
  private rn: CellNode

  constructor(value: string | number) {
    this._value = value
  }

  add(node: CellNode) {
    if ( ! this.ln ) {
      this.ln = node

      return this
    }

    this.rn = node

    return this
  }

  get value() {    
    return ''
  }  

  on(value: string) {
    EventBridge.instance.on(value, this.setValue)
  }

  private setValue(_value: string) {
    this._value = _value
  } 

  print(indent = 0) {
    console.log(this._value.toString().padStart(indent))
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

  isLeaf() {
    return !this.hasChilds()
  }
}
