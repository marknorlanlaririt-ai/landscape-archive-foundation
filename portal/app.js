const list = document.getElementById('fed-modules')

if (list) {
  fetch('/schema/manifest.json')
    .then((r) => r.json())
    .then((manifest) => {
      list.replaceChildren(
        ...manifest.modules.map((mod) => {
          const li = document.createElement('li')
          const a = document.createElement('a')
          a.href = mod.path
          a.textContent = `${mod.label} · v${mod.version}`
          const p = document.createElement('p')
          p.textContent = mod.description
          li.append(a, p)
          return li
        })
      )
    })
    .catch(() => {
      list.innerHTML = '<li>Schema manifest unavailable.</li>'
    })
}
