import { wordArray, DEBUG_MODE } from "./settings.js"

document.addEventListener('DOMContentLoaded', () => {

  // Choose random word from store
  const pickRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)].toUpperCase()
  }

  // Initialise game variables
  const wordAsArray = pickRandomFromArray(wordArray).split('')
  const wordLength = wordAsArray.length
  let guessesMade = 0
  const guessesAllowed = wordLength
  let correctLetters = 0
  const duplicateLetterTracker = [...wordAsArray]
  let gameRunning = false
  const incorrectLetters = []

  let scoreCard = []
  for (let i = 1; i < wordLength; i++) {
    scoreCard.push('⬛')
  }

  // Initialise DOM Elements
  const startButton = document.getElementById('start-button')

  const guessesCountDisplay = document.getElementById('guesses')
  const guessForm = document.getElementById('guess-form')

  const guessInput = document.getElementById('guess')
  guessInput.setAttribute('maxlength', wordLength)
  const guessButton = document.getElementById('guess-submit')

  const gameGrid = document.getElementById('game')
  const incorrectLetterTray = document.getElementById('incorrect-letter-tray')
  const incorrectLetterDisplay = document.getElementById('incorrect-letters')

  guessButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (guessInput.value.length === wordLength && gameRunning) {
      handleGuess(guessInput.value.toUpperCase(), guessesMade + 1)
      guessInput.value = ''
    }
  })

  const updateDisplay = () => {
    incorrectLetterDisplay.innerText = incorrectLetters.join(' ')
    guessesCountDisplay.innerText = `${guessesMade}/${guessesAllowed}`
    if (DEBUG_MODE) {
      printScoreToConsole()
    }
  }

  const addGameRow = (rowNumber) => {
    const row = document.createElement('div')
    row.style.display = 'flex'
    row.style.marginBottom = '5px'
    row.id = `row${rowNumber}`
    for (let i = 1; i < wordLength + 1; i++) {
      const cell = document.createElement('div')
      cell.style.height = '50px'
      cell.style.width = '50px'
      cell.style.borderRadius = '8px'
      cell.style.backgroundColor = 'gray'
      cell.style.marginRight = '5px'
      cell.style.textTransform = 'uppercase'
      cell.style.fontWeight = 'bold'
      cell.style.fontSize = '32px'
      cell.style.textAlign = 'center'
      cell.style.lineHeight = '50px'
      cell.id = `letter${i}`
      row.appendChild(cell)
    }
    gameGrid.appendChild(row)
  }
  
  const runGame = () => {
    updateDisplay()
    for (let i = 1; i < guessesAllowed + 1; i++) {
      addGameRow(i)
    }
    incorrectLetterTray.style.display = 'block'
    guessesCountDisplay.style.display = 'block'
    guessForm.style.display = 'flex'
  }

  startButton.addEventListener('click', (e) => {
    gameRunning = true
    e.target.style.display = 'none'
    runGame()
  })

  const printScoreToConsole = () => {
    console.log(scoreCard)
    console.log(`${correctLetters}/${wordLength} letters guessed correctly`)
    console.log(`${guessesMade}/${guessesAllowed} guesses`)
  }


  const handleGuess = async (guess, guessNumber) => {
    const guessRow = document.getElementById(`row${guessNumber}`)
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
      .then((res) => {
        if (res.status !== 404) {
          guessesMade++
          const guessAsArray = guess.split('')
          const newScoreCard = []
          for (let i = 0; i < guessAsArray.length; i++) {
            guessRow.children[i].innerText = guessAsArray[i]
            if (guessAsArray[i] === wordAsArray[i]) {
              if (duplicateLetterTracker[i] !== null) {
                correctLetters++
              }
              duplicateLetterTracker[i] = null
              newScoreCard.push('🟩')
              guessRow.children[i].style.backgroundColor = 'green'
            } else if (guessAsArray[i] !== wordAsArray[i] && wordAsArray.includes(guessAsArray[i])) {
              newScoreCard.push('🟨')
              guessRow.children[i].style.backgroundColor = 'yellow'
            } else {
              if (!incorrectLetters.includes(guess[i])) {
                incorrectLetters.push(guess[i])
              }
              newScoreCard.push('⬛')
            }
          }
          scoreCard = newScoreCard
          updateDisplay()
          gameEndCheck()
        } else {
          console.log('Word not found!')
          guessInput.classList.add('incorrect-guess')
          setTimeout(() => {
            guessInput.classList.remove('incorrect-guess')
          }, 700)
        }
      })
  }

  const gameEndCheck = () => {
    if (guessesMade >= guessesAllowed) {
      endGame()
      return true
    }
    if (correctLetters === wordLength) {
      endGame()
      return true
    }
    return false
  }

  const endGame = () => {
    console.log('Game ended')
    gameRunning = false
    guessForm.style.display = 'none'
    const finalScore = document.createElement('h3')
    finalScore.innerText = `You guessed ${correctLetters}/${wordLength} letters in ${guessesMade}/${guessesAllowed} guesses`
    gameGrid.appendChild(finalScore)
  }

})
