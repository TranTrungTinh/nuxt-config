export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? 'Good morning' : hour <= 11 ? 'Good morning' : hour <= 13 ? 'Good afternoon' : hour < 20 ? 'Good afternoon' : 'Good evening'
}

// funny :D
export function welcome() {
  const arr = ['Take a break', 'What are you going to eat?', 'Do you want to play a AOV?', 'I guess you may be tired.']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}
