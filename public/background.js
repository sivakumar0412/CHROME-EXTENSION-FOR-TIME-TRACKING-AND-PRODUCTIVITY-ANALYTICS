// Background script for Chrome extension
let activeTab = null
let startTime = null
const timeSpent = {}

// Website categories
const productiveWebsites = [
  "github.com",
  "stackoverflow.com",
  "developer.mozilla.org",
  "docs.google.com",
  "notion.so",
  "trello.com",
  "slack.com",
  "zoom.us",
  "codepen.io",
  "replit.com",
  "codesandbox.io",
]

const unproductiveWebsites = [
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "youtube.com",
  "tiktok.com",
  "reddit.com",
  "netflix.com",
  "twitch.tv",
  "pinterest.com",
]

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return "unknown"
  }
}

function classifyWebsite(domain) {
  if (productiveWebsites.some((site) => domain.includes(site))) {
    return "productive"
  }
  if (unproductiveWebsites.some((site) => domain.includes(site))) {
    return "unproductive"
  }
  return "neutral"
}

function saveTimeData(domain, timeSpent, category) {
  const today = new Date().toISOString().split("T")[0]

  window.chrome.storage.local.get([today], (result) => {
    const dayData = result[today] || {}

    if (!dayData[domain]) {
      dayData[domain] = {
        timeSpent: 0,
        category: category,
        visits: 0,
      }
    }

    dayData[domain].timeSpent += timeSpent
    dayData[domain].visits += 1

    window.chrome.storage.local.set({
      [today]: dayData,
    })
  })
}

window.chrome.tabs.onActivated.addListener((activeInfo) => {
  window.chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (activeTab && startTime) {
      const domain = getDomain(activeTab.url)
      const timeSpent = Date.now() - startTime
      const category = classifyWebsite(domain)

      saveTimeData(domain, timeSpent, category)
    }

    activeTab = tab
    startTime = Date.now()
  })
})

window.chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    if (activeTab && startTime && activeTab.url !== tab.url) {
      const domain = getDomain(activeTab.url)
      const timeSpent = Date.now() - startTime
      const category = classifyWebsite(domain)

      saveTimeData(domain, timeSpent, category)
    }

    activeTab = tab
    startTime = Date.now()
  }
})

window.chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === window.chrome.windows.WINDOW_ID_NONE) {
    // Browser lost focus
    if (activeTab && startTime) {
      const domain = getDomain(activeTab.url)
      const timeSpent = Date.now() - startTime
      const category = classifyWebsite(domain)

      saveTimeData(domain, timeSpent, category)
      startTime = null
    }
  } else {
    // Browser gained focus
    window.chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs[0]) {
        activeTab = tabs[0]
        startTime = Date.now()
      }
    })
  }
})
