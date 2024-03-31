function isDigit(s: string){
  return /^\d+$/.test(s);
}

function isOps(s: string) {
  return  s === '+' || s === '-' || s === '*' || s === '/' 
}

export const utils = {
  isDigit,
  isOps
}