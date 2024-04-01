export interface Readline {
  write(data: string | Buffer, key?: any): void;
}