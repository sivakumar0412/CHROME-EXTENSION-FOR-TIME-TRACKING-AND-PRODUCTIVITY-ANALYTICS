// Popup script with animations
function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60))
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(start + (end - start) * easeOutQuart)

    if (element.textContent.includes("h")) {
      element.textContent = formatTime(current)
    } else {
      element.textContent = current + (element.textContent.includes("%") ? "%" : "h")
    }

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

function showLoadingState() {
  document.getElementById("totalTime").textContent = "..."
  document.getElementById("productiveTime").textContent = "..."
  document.getElementById("unproductiveTime").textContent = "..."

  // Add loading class
  document.querySelectorAll(".stat-value").forEach((el) => {
    el.classList.add("loading")
  })
}

function hideLoadingState() {
  document.querySelectorAll(".stat-value").forEach((el) => {
    el.classList.remove("loading")
  })
}

function loadTodayData() {
  showLoadingState()

  const today = new Date().toISOString().split("T")[0]

  window.chrome.storage.local.get([today], (result) => {
    setTimeout(() => {
      // Simulate loading delay for better UX
      hideLoadingState()

      const dayData = result[today] || {}

      let totalTime = 0
      let productiveTime = 0
      let unproductiveTime = 0

      const websites = Object.entries(dayData)
        .map(([domain, data]) => {
          totalTime += data.timeSpent

          if (data.category === "productive") {
            productiveTime += data.timeSpent
          } else if (data.category === "unproductive") {
            unproductiveTime += data.timeSpent
          }

          return {
            domain,
            ...data,
          }
        })
        .sort((a, b) => b.timeSpent - a.timeSpent)
        .slice(0, 10)

      // Animate stats with staggered timing
      setTimeout(() => animateValue(document.getElementById("totalTime"), 0, totalTime, 800), 100)
      setTimeout(() => animateValue(document.getElementById("productiveTime"), 0, productiveTime, 800), 200)
      setTimeout(() => animateValue(document.getElementById("unproductiveTime"), 0, unproductiveTime, 800), 300)

      // Update website list with staggered animation
      const websiteList = document.getElementById("websiteList")
      websiteList.innerHTML = ""

      websites.forEach((website, index) => {
        const item = document.createElement("div")
        item.className = "website-item"
        item.style.animationDelay = `${0.5 + index * 0.1}s`
        item.innerHTML = `
          <div>
            <div class="website-name category-${website.category}">${website.domain}</div>
          </div>
          <div class="website-time">${formatTime(website.timeSpent)}</div>
        `
        websiteList.appendChild(item)
      })
    }, 500)
  })
}

// Add click animation to button
document.getElementById("openDashboard").addEventListener("click", (e) => {
  const btn = e.target
  btn.style.transform = "scale(0.95)"

  setTimeout(() => {
    btn.style.transform = ""
    window.chrome.tabs.create({ url: "http://localhost:3000/dashboard" })
  }, 150)
})

// Load data when popup opens
loadTodayData()
