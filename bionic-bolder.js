const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, td, caption, span, a')

for (let i = 0; i < text.length; i++) {
  text[i].innerHTML = '<b>' + text[i].innerHTML + '</b>'
  console.log(text[i])
}