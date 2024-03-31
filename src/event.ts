import { EventEmitter } from 'node:events'
import { EventEmitterCB } from './types'

export class EventBridge {
  private static _instance: EventBridge
  private _event = new EventEmitter()

  private constructor() {    
  }

  public static get instance() {
    return EventBridge._instance || (EventBridge._instance = new EventBridge())
  }

  on(key: string, cb: EventEmitterCB) {
    this.even.on(key, cb)
  }

  get even() {
    return this._event
  }
}
