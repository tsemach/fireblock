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
