import EventEmitter from "./EventEmitter"

const MESSAGE_LIST_SCROLL_TO_END = "MESSAGE_LIST_SCROLL_TO_END"

export function emitScrollToEndEvent() {
  console.log(`Emitting: ${MESSAGE_LIST_SCROLL_TO_END}`)
  EventEmitter().emitEvent(MESSAGE_LIST_SCROLL_TO_END)
}

export function registerOnScrollToEndEvent(callback) {
  EventEmitter().addListener(MESSAGE_LIST_SCROLL_TO_END, () => {
    console.log(`Received event: ${MESSAGE_LIST_SCROLL_TO_END}`)
    callback()
  })
}

export const unregisterOnScrollToEndEvent = (callback) => {
  EventEmitter().removeListener(MESSAGE_LIST_SCROLL_TO_END, callback);
}
