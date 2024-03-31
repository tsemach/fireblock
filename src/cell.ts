import { EventEmitter } from 'node:events'

export class Cell {
  private _event: EventEmitter

  constructor(_event: EventEmitter) {
    this._event = _event
  }
}