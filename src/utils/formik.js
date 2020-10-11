export function simulateEvent(name, value) {
  return {
    target: {
      name,
      value
    }
  }
}
