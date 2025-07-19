// Options page script
// Declare the chrome variable to avoid undeclared variable errors
const chrome = window.chrome || {}

function loadWebsiteLists() {
  chrome.storage.sync.get(["productiveWebsites", "unproductiveWebsites"], (result) => {
    const productive = result.productiveWebsites || []
    const unproductive = result.unproductiveWebsites || []

    updateWebsiteList("productiveList", productive, "productive")
    updateWebsiteList("unproductiveList", unproductive, "unproductive")
  })
}

function updateWebsiteList(listId, websites, category) {
  const list = document.getElementById(listId)
  list.innerHTML = ""

  websites.forEach((website) => {
    const tag = document.createElement("span")
    tag.className = `website-tag ${category}`
    tag.textContent = website
    tag.onclick = () => removeWebsite(website, category)
    tag.style.cursor = "pointer"
    tag.title = "Click to remove"
    list.appendChild(tag)
  })
}

function addWebsite(website, category) {
  const storageKey = `${category}Websites`

  chrome.storage.sync.get([storageKey], (result) => {
    const websites = result[storageKey] || []

    if (!websites.includes(website)) {
      websites.push(website)
      chrome.storage.sync.set({ [storageKey]: websites }, () => {
        loadWebsiteLists()
      })
    }
  })
}

function removeWebsite(website, category) {
  const storageKey = `${category}Websites`

  chrome.storage.sync.get([storageKey], (result) => {
    const websites = result[storageKey] || []
    const filtered = websites.filter((w) => w !== website)

    chrome.storage.sync.set({ [storageKey]: filtered }, () => {
      loadWebsiteLists()
    })
  })
}

document.getElementById("addProductive").addEventListener("click", () => {
  const input = document.getElementById("productiveInput")
  const website = input.value.trim()

  if (website) {
    addWebsite(website, "productive")
    input.value = ""
  }
})

document.getElementById("addUnproductive").addEventListener("click", () => {
  const input = document.getElementById("unproductiveInput")
  const website = input.value.trim()

  if (website) {
    addWebsite(website, "unproductive")
    input.value = ""
  }
})

// Load initial data
loadWebsiteLists()
</merged_code>
