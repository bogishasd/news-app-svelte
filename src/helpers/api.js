export const request = (method, url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onload = resolve
  xhr.onerror = reject
  xhr.send()
})
