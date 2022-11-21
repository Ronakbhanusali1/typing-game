const quoteURL = 'http://api.quotable.io/random';
const randomQuote = document.getElementById('quote');
const inputValue = document.getElementById('input');
const timeValue = document.getElementById('timer');
let correct = true

inputValue.addEventListener('input', ()=> {
  const newArrayQuote = randomQuote.querySelectorAll('span')
  const newArrayValue = inputValue.value.split('')
  
  newArrayQuote.forEach((characterSpan, index) => {
   const character = newArrayValue[index]
   if (character == null ) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false

      
   }
  else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
      
   } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
   }
  })
  if (correct) getNextQuote()
})




function getQuote() {
  return  fetch (quoteURL)
     .then (response => response.json())
     .then (data => data.content)
}

async function getNextQuote () {
 const quote = await getQuote()
 randomQuote.innerHTML = ''
 quote.split("").forEach(character => {
    const characterSpan = document.createElement('span')
    // characterSpan.classList.add('incorrect')
    characterSpan.innerText = character
    randomQuote.appendChild(characterSpan)
 })
 inputValue.value = null
 startTimer()
}

let StartedTime 
function startTimer() {
   timeValue.innerText = 0
   StartedTime = new Date ()
   setInterval(() => {
      timeValue.innerText = clockTime ()
   }, 1000)
}

function clockTime() {
   return Math.floor((new Date() - StartedTime) / 1000)
   
}

getNextQuote ()