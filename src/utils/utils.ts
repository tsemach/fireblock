function isDigit(s: string){
  return /^\d+$/.test(s);
}

function isOps(s: string) {
  return  s === '+' || s === '-' || s === '*' || s === '/' 
}

function isLink(s: string) {
  return s === '{' || s === '}'
}

function isOpenLink(s: string) {
  return s === '{'
}

function isCloseLink(s: string) {
  return s === '}'
}

export const utils = {
  isDigit,
  isOps,
  isLink,
  isOpenLink,
  isCloseLink
}