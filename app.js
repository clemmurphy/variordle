document.addEventListener('DOMContentLoaded', () => {

  // Store of possible words
  const wordArray = ['apples']

  // Choose random word from store
  const pickRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)].toUpperCase()
  }

  // Initialise game variables
  const wordAsArray = pickRandomFromArray(wordArray).split('')
  const wordLength = wordAsArray.length
  let guessesMade = 0
  const guessesAllowed = 6
  let correctLetters = 0
  const duplicateLetterTracker = [...wordAsArray]
  let gameRunning = false

  let scoreCard = []
  for (let i = 1; i < wordLength; i++) {
    scoreCard.push('⬛')
  }

  // Initialise DOM Elements
  const startButton = document.getElementById('start-button')
  startButton.addEventListener('click', (e) => {
    gameRunning = true
    e.target.style.display = 'none'
    runGame()
  })
  const guessesCountDisplay = document.getElementById('guesses')
  const guessForm = document.getElementById('guess-form')

  const guessInput = document.getElementById('guess')
  const guessButton = document.getElementById('guess-submit')

  const gameGrid = document.getElementById('game')

  guessButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (guessInput.value.length === 6 && gameRunning) {
      handleGuess(guessInput.value.toUpperCase(), guessesMade + 1)
      guessInput.value = ''
    }
  })

  const updateDisplay = () => {
    guessesCountDisplay.innerText = `${guessesMade}/${guessesAllowed}`
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
    guessesCountDisplay.style.display = 'block'
    guessForm.style.display = 'flex'
  }

  const printScoreToConsole = () => {
    console.log(scoreCard)
    console.log(`${correctLetters}/${wordLength} letters guessed correctly`)
    console.log(`${guessesMade}/${guessesAllowed} guesses`)
  }


  const handleGuess = (guess, guessNumber) => {
    guessesMade++
    const guessRow = document.getElementById(`row${guessNumber}`)
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
        newScoreCard.push('⬛')
      }
    }
    scoreCard = newScoreCard
    updateDisplay()
    printScoreToConsole()
    gameEndCheck()
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
