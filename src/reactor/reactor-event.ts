import { EventEmitter } from 'node:events'
import { EventEmitterCB } from '../types'

export class ReactorEvent {
  private static _instance: ReactorEvent
  private _event = new EventEmitter()

  private constructor() {    
  }

  public static get instance() {
    return ReactorEvent._instance || (ReactorEvent._instance = new ReactorEvent())
  }

  on(key: string, cb: EventEmitterCB) {
    this.event.on(key, cb)
  }

  emit(name: string, value: string) {
    this.event.emit(name, value)
  }

  get event() {
    return this._event
  }
}
