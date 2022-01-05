document.addEventListener('DOMContentLoaded', () => {

  const DEBUG_MODE = false

  // Store of possible words
  const wordArray = ['act', 'action', 'active', 'actor', 'adult', 'advice', 'africa', 'age', 'agenda', 'air', 'airbus', 'alarm', 'alibi', 'alley', 'alloy', 'alto', 'amount', 'anger', 'angle', 'angora', 'animal', 'anime', 'ankle', 'answer', 'ant', 'appeal', 'apple', 'april', 'arch', 'archer', 'area', 'aries', 'arm', 'army', 'arrow', 'art', 'ash', 'asia', 'atm', 'atom', 'attack', 'attic', 'august', 'aunt', 'author', 'avenue', 'babies', 'baboon', 'baby', 'back', 'bacon', 'badge', 'badger', 'bag', 'bagel', 'bail', 'bait', 'baker', 'bakery', 'ball', 'bamboo', 'banana', 'band', 'bangle', 'banjo', 'bank', 'banker', 'bar', 'barber', 'barge', 'base', 'basin', 'basket', 'bass', 'bat', 'bath', 'battle', 'bay', 'beach', 'bead', 'beam', 'bean', 'bear', 'beard', 'beast', 'beat', 'beauty', 'beaver', 'bed', 'bee', 'beech', 'beef', 'beer', 'beet', 'beetle', 'beggar', 'belief', 'bell', 'belt', 'bench', 'bengal', 'beret', 'berry', 'betty', 'bike', 'bill', 'birch', 'bird', 'birth', 'bit', 'bite', 'black', 'blade', 'block', 'blood', 'blouse', 'blow', 'blue', 'board', 'boat', 'bobcat', 'body', 'bolt', 'bomb', 'bomber', 'bone', 'bongo', 'bonsai', 'book', 'boot', 'border', 'botany', 'bottle', 'bottom', 'bow', 'bowl', 'box', 'boy', 'bra', 'brace', 'brain', 'brake', 'branch', 'brand', 'brandy', 'brass', 'brazil', 'bread', 'break', 'breath', 'brian', 'brick', 'bridge', 'broker', 'bronze', 'brow', 'brown', 'brush', 'bubble', 'bucket', 'budget', 'buffer', 'buffet', 'bugle', 'bulb', 'bull', 'bumper', 'bun', 'burma', 'burn', 'burst', 'bus', 'bush', 'butane', 'butter', 'button', 'cable', 'cactus', 'cafe', 'cake', 'calf', 'call', 'camel', 'camera', 'camp', 'can', 'canada', 'cancer', 'candle', 'cannon', 'canoe', 'canvas', 'cap', 'car', 'carbon', 'card', 'care', 'carol', 'carp', 'carrot', 'cart', 'case', 'cast', 'cat', 'catsup', 'cattle', 'cause', 'cave', 'cd', 'celery', 'cell', 'cellar', 'cello', 'cement', 'cent', 'cereal', 'chain', 'chair', 'chalk', 'chance', 'change', 'chard', 'check', 'cheek', 'cheese', 'chef', 'cheque', 'cherry', 'chess', 'chest', 'chick', 'chief', 'child', 'chill', 'chime', 'chin', 'china', 'chive', 'chord', 'church', 'cicada', 'cinema', 'circle', 'cirrus', 'city', 'clam', 'class', 'claus', 'clave', 'clef', 'clerk', 'click', 'client', 'climb', 'clock', 'close', 'closet', 'cloth', 'cloud', 'cloudy', 'clover', 'club', 'clutch', 'coach', 'coal', 'coast', 'coat', 'cobweb', 'cocoa', 'cod', 'coffee', 'coil', 'coin', 'coke', 'cold', 'collar', 'colon', 'colony', 'color', 'colt', 'column', 'comb', 'comic', 'comma', 'condor', 'cone', 'conga', 'congo', 'cook', 'copper', 'copy', 'cord', 'cork', 'corn', 'cornet', 'cost', 'cotton', 'couch', 'cougar', 'cough', 'course', 'court', 'cousin', 'cover', 'cow', 'crab', 'crack', 'crate', 'crayon', 'cream', 'credit', 'creek', 'crib', 'crime', 'crocus', 'crook', 'crop', 'cross', 'crow', 'crowd', 'crown', 'crush', 'cry', 'cub', 'cuban', 'cup', 'curler', 'curve', 'cut', 'cycle', 'cymbal', 'dad', 'dahlia', 'daisy', 'damage', 'dance', 'dancer', 'danger', 'daniel', 'dash', 'date', 'david', 'day', 'dead', 'deal', 'death', 'debt', 'debtor', 'decade', 'deer', 'degree', 'delete', 'den', 'denim', 'desert', 'design', 'desire', 'desk', 'detail', 'dew', 'dibble', 'digger', 'dill', 'dime', 'dimple', 'dinghy', 'dinner', 'dirt', 'dish', 'diving', 'dock', 'doctor', 'dog', 'doll', 'dollar', 'domain', 'donald', 'donkey', 'donna', 'door', 'double', 'doubt', 'dragon', 'drain', 'drake', 'drama', 'draw', 'drawer', 'dream', 'dress', 'drill', 'drink', 'drive', 'driver', 'drop', 'drug', 'drum', 'dry', 'dryer', 'duck', 'dugout', 'dust', 'eagle', 'ear', 'earth', 'ease', 'east', 'edge', 'edger', 'editor', 'edward', 'eel', 'effect', 'egg', 'eggnog', 'egypt', 'eight', 'elbow', 'emery', 'end', 'enemy', 'energy', 'engine', 'epoch', 'epoxy', 'era', 'error', 'europe', 'event', 'expert', 'eye', 'face', 'fact', 'fall', 'family', 'fan', 'fang', 'farm', 'farmer', 'fat', 'father', 'faucet', 'fear', 'feast', 'feet', 'felony', 'female', 'fender', 'ferry', 'fiber', 'fibre', 'field', 'fifth', 'fight', 'file', 'find', 'fine', 'finger', 'fir', 'fire', 'fish', 'flag', 'flame', 'flare', 'flat', 'flavor', 'flax', 'flesh', 'flight', 'flock', 'flood', 'floor', 'flower', 'flute', 'fly', 'foam', 'fog', 'fold', 'font', 'food', 'foot', 'force', 'forest', 'fork', 'form', 'format', 'fowl', 'fox', 'frame', 'france', 'freeze', 'french', 'freon', 'friday', 'fridge', 'friend', 'frog', 'front', 'frost', 'frown', 'fruit', 'fuel', 'fur', 'galley', 'gallon', 'game', 'gander', 'garage', 'garden', 'garlic', 'gas', 'gate', 'gauge', 'gear', 'geese', 'gemini', 'gender', 'george', 'german', 'ghana', 'ghost', 'giant', 'girdle', 'girl', 'glass', 'glider', 'glove', 'glue', 'goal', 'goat', 'gold', 'golf', 'gong', 'goose', 'grade', 'grain', 'gram', 'grape', 'grass', 'gray', 'grease', 'greece', 'greek', 'green', 'grey', 'grill', 'grip', 'ground', 'group', 'grouse', 'growth', 'guide', 'guilty', 'guitar', 'gum', 'gun', 'gym', 'hail', 'hair', 'hall', 'hammer', 'hand', 'handle', 'harbor', 'harp', 'hat', 'hate', 'hawk', 'head', 'health', 'heart', 'heat', 'heaven', 'hedge', 'height', 'helen', 'helium', 'hell', 'helmet', 'help', 'hemp', 'hen', 'heron', 'hill', 'hip', 'hockey', 'hoe', 'hole', 'home', 'honey', 'hood', 'hook', 'hope', 'horn', 'horse', 'hose', 'hot', 'hour', 'house', 'hub', 'hubcap', 'humor', 'hyena', 'ice', 'icicle', 'icon', 'idea', 'inch', 'income', 'index', 'india', 'ink', 'input', 'insect', 'iran', 'iraq', 'iris', 'iron', 'island', 'israel', 'italy', 'jacket', 'jaguar', 'jail', 'jam', 'james', 'japan', 'jar', 'jason', 'jaw', 'jeans', 'jeep', 'jeff', 'jelly', 'jet', 'jewel', 'john', 'join', 'joke', 'joseph', 'judge', 'judo', 'juice', 'july', 'jumbo', 'jump', 'jumper', 'june', 'jury', 'jute', 'kale', 'karate', 'karen', 'kayak', 'kendo', 'kenya', 'kettle', 'kevin', 'key', 'kick', 'kidney', 'kiss', 'kite', 'kitten', 'kitty', 'knee', 'knife', 'knight', 'knot', 'korean', 'lace', 'lake', 'lamb', 'lamp', 'lan', 'land', 'larch', 'latex', 'lathe', 'laugh', 'laura', 'law', 'lawyer', 'layer', 'lead', 'leaf', 'leek', 'leg', 'legal', 'lentil', 'leo', 'letter', 'level', 'libra', 'lier', 'lift', 'light', 'lilac', 'lily', 'limit', 'linda', 'line', 'linen', 'link', 'lion', 'lip', 'liquid', 'liquor', 'lisa', 'list', 'litter', 'liver', 'lizard', 'llama', 'loaf', 'loan', 'lock', 'locket', 'locust', 'look', 'loss', 'lotion', 'love', 'low', 'lumber', 'lunch', 'lung', 'lunge', 'lute', 'lycra', 'lynx', 'lyre', 'lyric', 'magic', 'maid', 'mail', 'makeup', 'male', 'mall', 'mallet', 'man', 'manx', 'map', 'maple', 'maraca', 'marble', 'march', 'margin', 'maria', 'mark', 'market', 'mary', 'mask', 'mass', 'match', 'math', 'may', 'meal', 'meat', 'melody', 'memory', 'men', 'menu', 'metal', 'meter', 'mexico', 'mice', 'middle', 'mile', 'milk', 'mimosa', 'mind', 'mine', 'mint', 'minute', 'mirror', 'mist', 'mitten', 'moat', 'modem', 'mole', 'mom', 'monday', 'money', 'monkey', 'month', 'moon', 'mosque', 'mother', 'motion', 'mouse', 'mouth', 'move', 'muscle', 'museum', 'music', 'nail', 'name', 'nancy', 'napkin', 'nation', 'neck', 'need', 'needle', 'neon', 'nepal', 'nephew', 'nerve', 'nest', 'net', 'news', 'nic', 'nickel', 'niece', 'night', 'node', 'noise', 'noodle', 'north', 'nose', 'note', 'notify', 'novel', 'number', 'nurse', 'nut', 'nylon', 'oak', 'oboe', 'ocean', 'ocelot', 'octave', 'offer', 'office', 'oil', 'okra', 'olive', 'onion', 'open', 'opera', 'option', 'orange', 'orchid', 'order', 'organ', 'otter', 'ounce', 'output', 'oval', 'oven', 'owl', 'owner', 'ox', 'oxygen', 'oyster', 'packet', 'page', 'pail', 'pain', 'paint', 'pair', 'pajama', 'palm', 'pan', 'panda', 'pansy', 'pantry', 'pants', 'panty', 'paper', 'parade', 'parcel', 'parent', 'park', 'parrot', 'part', 'party', 'pasta', 'paste', 'pastor', 'pastry', 'patch', 'path', 'patio', 'paul', 'pea', 'peace', 'peak', 'peanut', 'pear', 'peen', 'pen', 'pencil', 'peony', 'pepper', 'perch', 'period', 'person', 'peru', 'pest', 'pet', 'phone', 'piano', 'pickle', 'pie', 'pig', 'pigeon', 'pike', 'pillow', 'pilot', 'pimple', 'pin', 'pine', 'ping', 'pink', 'pint', 'pipe', 'pisces', 'pizza', 'place', 'plain', 'plane', 'planet', 'plant', 'plate', 'play', 'plier', 'plot', 'plough', 'plow', 'pocket', 'poet', 'point', 'poison', 'poland', 'police', 'polish', 'polo', 'pond', 'poppy', 'porch', 'port', 'porter', 'pot', 'potato', 'pound', 'powder', 'power', 'price', 'priest', 'print', 'prison', 'profit', 'prose', 'pruner', 'puffin', 'pull', 'puma', 'pump', 'punch', 'puppy', 'purple', 'push', 'pvc', 'pyjama', 'quail', 'quart', 'quartz', 'queen', 'quiet', 'quill', 'quilt', 'quince', 'quit', 'quiver', 'rabbi', 'rabbit', 'racing', 'radar', 'radio', 'radish', 'raft', 'rail', 'rain', 'rake', 'ramie', 'random', 'range', 'rat', 'rate', 'raven', 'ray', 'rayon', 'reason', 'recess', 'record', 'red', 'refund', 'regret', 'relish', 'repair', 'report', 'rest', 'result', 'reward', 'rhythm', 'rice', 'riddle', 'rifle', 'ring', 'rise', 'risk', 'river', 'road', 'roast', 'robert', 'robin', 'rock', 'rocket', 'rod', 'roll', 'ronald', 'roof', 'room', 'root', 'rose', 'rotate', 'route', 'router', 'rub', 'rubber', 'rugby', 'rule', 'run', 'russia', 'ruth', 'sack', 'sail', 'sailor', 'salad', 'salary', 'sale', 'salmon', 'salt', 'sampan', 'sand', 'sandra', 'santa', 'sarah', 'satin', 'sauce', 'save', 'saw', 'scale', 'scarf', 'scene', 'scent', 'school', 'screen', 'screw', 'sea', 'seal', 'search', 'season', 'seat', 'second', 'secure', 'seed', 'seeder', 'select', 'self', 'sense', 'server', 'sex', 'shade', 'shadow', 'shake', 'shame', 'shape', 'share', 'shark', 'sharon', 'shears', 'sheep', 'sheet', 'shelf', 'shell', 'shield', 'ship', 'shirt', 'shock', 'shoe', 'shop', 'shorts', 'shovel', 'show', 'shrimp', 'shrine', 'side', 'sign', 'silica', 'silk', 'silver', 'sing', 'singer', 'single', 'sink', 'sister', 'size', 'skate', 'skiing', 'skill', 'skin', 'skirt', 'sky', 'slash', 'slave', 'sled', 'sleep', 'sleet', 'slice', 'slime', 'slip', 'slope', 'smash', 'smell', 'smile', 'smoke', 'snail', 'snake', 'sneeze', 'snow', 'soap', 'soccer', 'sock', 'soda', 'sofa', 'soil', 'son', 'song', 'sort', 'sound', 'soup', 'soy', 'space', 'spade', 'spain', 'spark', 'spear', 'sphere', 'sphynx', 'spider', 'spike', 'spleen', 'sponge', 'spoon', 'spot', 'spring', 'sprout', 'spruce', 'spy', 'square', 'squash', 'squid', 'stage', 'stamp', 'star', 'start', 'state', 'steam', 'steel', 'stem', 'step', 'steven', 'stew', 'stick', 'stitch', 'stock', 'stone', 'stool', 'stop', 'store', 'storm', 'story', 'stove', 'straw', 'stream', 'street', 'string', 'study', 'subway', 'sudan', 'suede', 'sugar', 'suit', 'summer', 'sun', 'sunday', 'supply', 'susan', 'sushi', 'swamp', 'swan', 'sweets', 'swim', 'swing', 'swiss', 'switch', 'sword', 'syria', 'syrup', 'system', 'table', 'tail', 'tailor', 'taiwan', 'talk', 'tank', 'tanker', 'target', 'taste', 'taurus', 'tax', 'taxi', 'tea', 'team', 'teeth', 'teller', 'temper', 'temple', 'tempo', 'tennis', 'tenor', 'tent', 'test', 'text', 'theory', 'thing', 'thomas', 'thread', 'thrill', 'throat', 'throne', 'thumb', 'ticket', 'tie', 'tiger', 'tights', 'tile', 'time', 'timer', 'tin', 'tip', 'tire', 'title', 'toad', 'toast', 'toe', 'toilet', 'tomato', 'ton', 'tongue', 'tooth', 'top', 'touch', 'tower', 'town', 'toy', 'trade', 'trail', 'train', 'tramp', 'tray', 'tree', 'trial', 'trick', 'trip', 'trout', 'trowel', 'truck', 'trunk', 'tub', 'tuba', 'tulip', 'tuna', 'tune', 'turkey', 'turn', 'turnip', 'turret', 'turtle', 'tv', 'twig', 'twine', 'twist', 'tyvek', 'uganda', 'uncle', 'unit', 'use', 'vacuum', 'valley', 'value', 'van', 'vase', 'vault', 'veil', 'vein', 'velvet', 'verse', 'vessel', 'vest', 'view', 'vinyl', 'viola', 'violet', 'violin', 'virgo', 'vise', 'vision', 'voice', 'voyage', 'waiter', 'walk', 'wall', 'wallet', 'walrus', 'war', 'warm', 'wash', 'washer', 'wasp', 'waste', 'watch', 'water', 'wave', 'wax', 'way', 'wealth', 'weapon', 'weasel', 'wedge', 'weed', 'weeder', 'week', 'weight', 'whale', 'wheel', 'whip', 'white', 'whorl', 'willow', 'wind', 'window', 'wine', 'wing', 'winter', 'wire', 'wish', 'witch', 'wolf', 'woman', 'women', 'wood', 'wool', 'woolen', 'word', 'work', 'worm', 'wound', 'wren', 'wrench', 'wrist', 'writer', 'yacht', 'yak', 'yam', 'yard', 'yarn', 'year', 'yellow', 'yew', 'yogurt', 'yoke', 'zebra', 'zephyr', 'zinc', 'zipper', 'zone', 'zoo' ]

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
        if (!incorrectLetters.includes(guess[i])) {
          incorrectLetters.push(guess[i])
        }
        newScoreCard.push('⬛')
      }
    }
    scoreCard = newScoreCard
    updateDisplay()
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
