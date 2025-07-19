// Content script for additional tracking
let pageStartTime = Date.now()
let isActive = true
const chrome = window.chrome // Declare the chrome variable

// Track page visibility
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    isActive = false
  } else {
    isActive = true
    pageStartTime = Date.now()
  }
})

// Track mouse movement and keyboard activity
let lastActivity = Date.now()

document.addEventListener("mousemove", () => {
  lastActivity = Date.now()
})

document.addEventListener("keypress", () => {
  lastActivity = Date.now()
})

// Send activity data to background script
setInterval(() => {
  const now = Date.now()
  const timeSinceLastActivity = now - lastActivity

  // Consider user inactive after 30 seconds of no activity
  if (timeSinceLastActivity < 30000 && isActive) {
    chrome.runtime.sendMessage({
      type: "ACTIVITY_UPDATE",
      domain: window.location.hostname,
      timestamp: now,
      active: true,
    })
  }
}, 5000)
