// play-draw5.js
// Adds popup for Attack or Defense choice when placing a card.
// Attack = horizontal rotation, Defense = vertical (default).

// ------------------ CONFIG AND DOM ------------------

const DECK_KEY = 'myDeck';
const HAND_KEY = 'handCards';
const PLAYER_KEY = 'playerCards';
const OPP_KEY = 'opponentCards';
const HAND_LIMIT = 5;

const drawButton = document.getElementById('draw-five-btn');
const deckCountElement = document.getElementById('deck-count');
const deckListElement = document.getElementById('deck-list');
const handContainer = document.getElementById('hand-cards');
const endTurnButton = document.getElementById('end-turn-btn');
const opponentContainer = document.getElementById('random-container');

let currentTurn = 'player';
let playerPlacedThisTurn = false;

// ------------------ STORAGE HELPERS ------------------

function load(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let deck = load(DECK_KEY);
let hand = load(HAND_KEY);

// ------------------ CARD CREATION ------------------

function makeCardElement(card, options = {}) {
  const el = document.createElement('div');
  el.className =
    'card-view w-full h-[220px] flex flex-col items-center justify-start text-white bg-orange-800 rounded-md mr-8 transition-transform duration-300';
  if (options.draggable) el.setAttribute('draggable', 'true');

  // If card is in defense mode, show it rotated
  if (card.mode === 'defense') {
    el.style.transform = 'rotate(90deg)';
    el.style.width = '220px';
    el.style.height = '140px';
  }

  el.innerHTML = `
    <img src="${card.image || './image/placeholder.jpg'}" alt="${card.name || ''}" 
         class="w-full h-[70%] object-cover rounded-md mb-2 pt-4" />
    <div class="bg-orange-300 w-full rounded-md mb-1 p-1 text-center text-black text-xs">
      <h3 class="font-bold">${card.name || 'No name'}</h3>
      <p class="text-xs">Power: <span class="text-red-700">${card.power ?? '-'}</span></p>
      <div class="flex justify-between text-xs mt-1">
        <span>ATK: <strong>${card.ATK ?? '-'}</strong></span>
        <span>DEF: <strong>${card.DEF ?? '-'}</strong></span>
      </div>
    </div>
  `;

  el.dataset.cardId = String(card.id ?? card.name);
  return el;
}

// Hand card (draggable)
function makeHandCard(card) {
  const el = makeCardElement(card, { draggable: true });
  el.classList.add('handCard', 'w-40', 'h-40', 'rounded-lg', 'flex', 'flex-col');

  el.addEventListener('dragstart', (e) => {
    if (currentTurn !== 'player' || playerPlacedThisTurn) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', String(card.id ?? card.name));
    el.classList.add('dragging');
  });

  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  return el;
}

// ------------------ RENDER FUNCTIONS ------------------

function renderDeckInfo() {
  deck = load(DECK_KEY);
  if (deckCountElement) deckCountElement.textContent = deck.length;
  if (!deckListElement) return;
  deckListElement.innerHTML = '';
  deck.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'text-xs border-b border-white/10 py-1';
    div.textContent = `${c.name || 'Card'} (${c.id ?? i})`;
    deckListElement.appendChild(div);
  });
}

function renderHand() {
  hand = load(HAND_KEY);
  handContainer.innerHTML = '';

  if (hand.length === 0) {
    for (let i = 0; i < HAND_LIMIT; i++) {
      const ph = document.createElement('div');
      ph.className =
        'handCard w-40 h-40 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-white/50 text-sm';
      ph.textContent = 'Empty';
      handContainer.appendChild(ph);
    }
    return;
  }

  for (let i = 0; i < HAND_LIMIT; i++) {
    const slot = document.createElement('div');
    slot.classList.add('flex', 'items-center', 'justify-center');
    if (hand[i]) slot.appendChild(makeHandCard(hand[i]));
    else {
      slot.className =
        'handCard w-40 h-40 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-white/50 text-sm';
      slot.textContent = 'Empty';
    }
    handContainer.appendChild(slot);
  }
}

function renderOpponentArea() {
  const opp = load(OPP_KEY);
  const slots = Array.from(opponentContainer.children);
  slots.forEach((slot, i) => {
    slot.innerHTML = '';
    const card = opp.find((c) => Number(c.slot) === i);
    if (!card) slot.innerHTML = '<div class="text-white/50 text-xs">Empty</div>';
    else slot.appendChild(makeCardElement(card));
  });
}

function renderPlayerArea() {
  const container = document.getElementById('player-container');
  const playerCards = load(PLAYER_KEY);
  const slots = Array.from(container.querySelectorAll('.player-card'));
  slots.forEach((slot, i) => {
    slot.innerHTML = '';
    const card = playerCards.find((c) => Number(c.slot) === i);
    if (!card) slot.innerHTML = '<div class="text-white/50 text-xs">Empty</div>';
    else slot.appendChild(makeCardElement(card));
  });
}

// ------------------ DRAG & DROP ------------------

function setupDragAndDrop() {
  const container = document.getElementById('player-container');
  const slots = Array.from(container.querySelectorAll('.player-card'));

  slots.forEach((slotEl, i) => {
    slotEl.ondragover = (e) => {
      e.preventDefault();
      slotEl.classList.add('drop-over');
    };

    slotEl.ondragleave = () => slotEl.classList.remove('drop-over');

    slotEl.ondrop = (e) => {
      e.preventDefault();
      slotEl.classList.remove('drop-over');

      if (currentTurn !== 'player') return alert("Not your turn!");
      if (playerPlacedThisTurn) return alert("You already placed a card this turn!");
      const id = e.dataTransfer.getData('text/plain');

      let hand = load(HAND_KEY);
      let playerCards = load(PLAYER_KEY);

      const slotFull = playerCards.some((pc) => Number(pc.slot) === i);
      if (slotFull) return alert("Slot is already occupied!");

      const idxInHand = hand.findIndex(
        (c) => c.id === id || String(c.id) === String(id) || c.name === id
      );
      if (idxInHand === -1) return;

      // Show popup to choose attack or defense
      const choice = confirm("Press OK for Attack, Cancel for Defense");

      const [card] = hand.splice(idxInHand, 1);
      card.slot = i;
      card.mode = choice ? 'attack' : 'defense'; // save mode for rendering
      playerCards.push(card);

      save(HAND_KEY, hand);
      save(PLAYER_KEY, playerCards);

      playerPlacedThisTurn = true;
      updateUI();
    };
  });
}

// ------------------ OPPONENT TURN ------------------

function opponentPlaceOne() {
  deck = load(DECK_KEY);
  let opp = load(OPP_KEY);
  if (deck.length === 0) return;

  const totalSlots = opponentContainer.children.length;
  const used = opp.map((c) => Number(c.slot));
  let freeSlot = -1;
  for (let s = 0; s < totalSlots; s++) {
    if (!used.includes(s)) {
      freeSlot = s;
      break;
    }
  }

  if (freeSlot === -1) return;
  const card = deck.shift();
  card.slot = freeSlot;
  opp.push(card);

  save(DECK_KEY, deck);
  save(OPP_KEY, opp);
  setTimeout(updateUI, 300);
}

// ------------------ TURN LOGIC ------------------

function handleEndTurn() {
  if (currentTurn !== 'player') return alert('Wait — opponent is moving.');
  if (!playerPlacedThisTurn) return alert('Place a card before ending your turn.');

  currentTurn = 'opponent';
  endTurnButton.textContent = 'Opponent moving...';

  setTimeout(() => {
    opponentPlaceOne();
    currentTurn = 'player';
    playerPlacedThisTurn = false;
    endTurnButton.textContent = 'End Turn';
    updateUI();
  }, 600);
}

// ------------------ DRAW FUNCTION ------------------

function drawToHand() {
  deck = load(DECK_KEY);
  hand = load(HAND_KEY);
  const space = HAND_LIMIT - hand.length;
  if (space <= 0) return alert('Your hand is full!');
  if (deck.length === 0) return alert('Deck is empty!');

  const take = Math.min(space, deck.length);
  const drawn = deck.splice(0, take);
  hand = hand.concat(drawn);
  save(HAND_KEY, hand);
  save(DECK_KEY, deck);
  updateUI();
}

// ------------------ UPDATE & INIT ------------------

function updateUI() {
  renderDeckInfo();
  renderHand();
  renderPlayerArea();
  renderOpponentArea();
  setupDragAndDrop();

  drawButton.disabled = hand.length >= HAND_LIMIT || deck.length === 0;
  endTurnButton.disabled = currentTurn !== 'player';
}

if (drawButton) drawButton.addEventListener('click', drawToHand);
if (endTurnButton) endTurnButton.addEventListener('click', handleEndTurn);

updateUI();
