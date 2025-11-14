// play-draw5.js
// Player chooses Attack (horizontal) or Defense (vertical) on placement.
// Opponent mode still automatic. Battles resolved per-mode.

const DECK_KEY = 'myDeck';
const HAND_KEY = 'handCards';
const PLAYER_KEY = 'playerCards';
const OPP_KEY = 'opponentCards';
const HAND_LIMIT = 5;

const SCORE_KEY = 'gameScore';
const PLACED_PLAYER_KEY = 'placedPlayerCount';
const PLACED_OPP_KEY = 'placedOppCount';

const drawButton = document.getElementById('draw-five-btn');
const deckCountElement = document.getElementById('deck-count');
const deckListElement = document.getElementById('deck-list');
const handContainer = document.getElementById('hand-cards');
const endTurnButton = document.getElementById('end-turn-btn');
const opponentContainer = document.getElementById('random-container');

let currentTurn = 'player';
let playerPlacedThisTurn = false;

function load(key) {
  try { const data = localStorage.getItem(key); return data ? JSON.parse(data) : []; }
  catch { return []; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function loadScore() {
  try { const s = localStorage.getItem(SCORE_KEY); return s ? JSON.parse(s) : { player: 0, opponent: 0 }; }
  catch { return { player: 0, opponent: 0 }; }
}
function saveScore(score) { localStorage.setItem(SCORE_KEY, JSON.stringify(score)); }

function loadPlacedCounts() {
  const p = Number(localStorage.getItem(PLACED_PLAYER_KEY) || 0);
  const o = Number(localStorage.getItem(PLACED_OPP_KEY) || 0);
  return { player: p, opponent: o };
}
function savePlacedCounts(pl) {
  localStorage.setItem(PLACED_PLAYER_KEY, String(pl.player));
  localStorage.setItem(PLACED_OPP_KEY, String(pl.opponent));
}
function incPlaced(side) {
  const cur = loadPlacedCounts();
  if (side === 'player') cur.player++;
  else cur.opponent++;
  savePlacedCounts(cur);
}

let deck = load(DECK_KEY);
let hand = load(HAND_KEY);
if (!localStorage.getItem(SCORE_KEY)) saveScore({ player: 0, opponent: 0 });
if (!localStorage.getItem(PLACED_PLAYER_KEY)) localStorage.setItem(PLACED_PLAYER_KEY, '0');
if (!localStorage.getItem(PLACED_OPP_KEY)) localStorage.setItem(PLACED_OPP_KEY, '0');

function makeCardElement(card, options = {}) {
  const el = document.createElement('div');
  el.className = 'card-view w-full h-[170px] flex flex-col items-center justify-start text-white bg-orange-800 rounded-md mr-8 transition-transform duration-300 font-[irish]';
  if (options.draggable) el.setAttribute('draggable', 'true');

  // apply orientation: defense = vertical (rotated), attack = normal (horizontal card)
  if (card.mode === 'defense') {
    // rotate 90deg to show vertical orientation
    el.style.transform = 'rotate(90deg)';
    el.style.width = '220px';
    el.style.height = '140px';
  } else {
    // ensure attack (or undefined) shows normally
    el.style.transform = '';
    el.style.width = '';
    el.style.height = '';
  }

  el.innerHTML = `
    <img src="${card.image || './image/placeholder.jpg'}" alt="${card.name || ''}" 
         class="w-full h-[60%] object-cover rounded-md mb-2 pt-4" />
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

function makeHandCard(card) {
  const el = makeCardElement(card, { draggable: true });
  el.classList.add('handCard', 'w-40', 'h-40', 'rounded-lg', 'flex', 'flex-col');

  el.addEventListener('dragstart', (e) => {
    if (currentTurn !== 'player' || playerPlacedThisTurn) { e.preventDefault(); return; }
    e.dataTransfer.setData('text/plain', String(card.id ?? card.name));
    el.classList.add('dragging');
  });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  return el;
}

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
      ph.className = 'handCard w-40 h-40 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-white/50 text-sm';
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
      slot.className = 'handCard w-40 h-40 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center text-white/50 text-sm';
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

function selectModeAutomatically(card) {
  const atk = Number(card.ATK ?? 0);
  const def = Number(card.DEF ?? 0);
  card.mode = atk >= def ? 'attack' : 'defense';
  return card.mode;
}

function ensureResultBanner() {
  let banner = document.getElementById('battle-result-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'battle-result-banner';
    banner.style.position = 'fixed';
    banner.style.top = '8px';
    banner.style.left = '50%';
    banner.style.transform = 'translateX(-50%)';
    banner.style.zIndex = 1200;
    banner.style.background = 'rgba(0,0,0,0.7)';
    banner.style.color = 'white';
    banner.style.padding = '8px 12px';
    banner.style.borderRadius = '8px';
    banner.style.fontSize = '13px';
    banner.style.maxWidth = '90%';
    banner.style.textAlign = 'center';
    document.body.appendChild(banner);
  }
  return banner;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function(m) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
  });
}

function resolveBattles() {
  const playerCards = load(PLAYER_KEY);
  const oppCards = load(OPP_KEY);
  if (!playerCards || !oppCards) return;

  const playerMap = {};
  playerCards.forEach(c => playerMap[Number(c.slot)] = c);
  const oppMap = {};
  oppCards.forEach(c => oppMap[Number(c.slot)] = c);

  let score = loadScore();
  let messages = [];

  const allSlots = new Set([...Object.keys(playerMap).map(Number), ...Object.keys(oppMap).map(Number)]);
  const toRemovePlayerSlots = new Set();
  const toRemoveOppSlots = new Set();

  allSlots.forEach(slot => {
    const p = playerMap[slot];
    const o = oppMap[slot];
    if (!p || !o) return;

    if (!p.mode) selectModeAutomatically(p);
    if (!o.mode) selectModeAutomatically(o);

    const pATK = Number(p.ATK ?? 0);
    const pDEF = Number(p.DEF ?? 0);
    const oATK = Number(o.ATK ?? 0);
    const oDEF = Number(o.DEF ?? 0);

    let resultText = `Slot ${slot}: ${p.name || 'Player'} (${p.mode}) vs ${o.name || 'Opponent'} (${o.mode}) — `;
    let winner = null;

    if (p.mode === 'attack' && o.mode === 'attack') {
      if (pATK > oATK) winner = 'player';
      else if (pATK < oATK) winner = 'opponent';
      else winner = 'draw';
      resultText += `ATK ${pATK} vs ${oATK}`;
    } else if (p.mode === 'defense' && o.mode === 'defense') {
      if (pDEF > oDEF) winner = 'player';
      else if (pDEF < oDEF) winner = 'opponent';
      else winner = 'draw';
      resultText += `DEF ${pDEF} vs ${oDEF}`;
    } else if (p.mode === 'attack' && o.mode === 'defense') {
      if (pATK > oDEF) winner = 'player';
      else if (pATK < oDEF) winner = 'opponent';
      else winner = 'draw';
      resultText += `ATK ${pATK} vs DEF ${oDEF}`;
    } else if (p.mode === 'defense' && o.mode === 'attack') {
      if (oATK > pDEF) winner = 'opponent';
      else if (oATK < pDEF) winner = 'player';
      else winner = 'draw';
      resultText += `DEF ${pDEF} vs ATK ${oATK}`;
    } else {
      winner = 'draw';
      resultText += 'tie';
    }

    if (winner === 'player') {
      toRemoveOppSlots.add(slot);
      score.player = (score.player ?? 0) + 1;
      resultText += ` → Player wins this slot`;
    } else if (winner === 'opponent') {
      toRemovePlayerSlots.add(slot);
      score.opponent = (score.opponent ?? 0) + 1;
      resultText += ` → Opponent wins this slot`;
    } else {
      toRemovePlayerSlots.add(slot);
      toRemoveOppSlots.add(slot);
      resultText += ` → Draw (both removed)`;
    }

    messages.push(resultText);
  });

  let newPlayer = load(PLAYER_KEY).filter(c => !toRemovePlayerSlots.has(Number(c.slot)));
  let newOpp = load(OPP_KEY).filter(c => !toRemoveOppSlots.has(Number(c.slot)));

  save(PLAYER_KEY, newPlayer);
  save(OPP_KEY, newOpp);
  saveScore(score);

  const banner = ensureResultBanner();
  if (messages.length === 0) {
    banner.textContent = `No battles to resolve. Score — You: ${score.player} | Opponent: ${score.opponent}`;
  } else {
    banner.innerHTML = messages.slice(-3).map(m => `<div>${escapeHtml(m)}</div>`).join('') +
      `<div style="margin-top:6px;font-weight:bold;">Score — You: ${score.player} | Opponent: ${score.opponent}</div>`;
  }

  setTimeout(() => { updateUI(); checkMatchEnd(); }, 250);
}

function setupDragAndDrop() {
  const container = document.getElementById('player-container');
  const slots = Array.from(container.querySelectorAll('.player-card'));

  slots.forEach((slotEl, i) => {
    slotEl.ondragover = (e) => { e.preventDefault(); slotEl.classList.add('drop-over'); };
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

      // ASK PLAYER: OK = Attack (horizontal), Cancel = Defense (vertical)
      const [card] = hand.splice(idxInHand, 1);
      card.slot = i;
      const choice = confirm("Place as ATTACK? (OK = Attack , Cancel = Defense )");
      card.mode = choice ? 'attack' : 'defense';

      playerCards.push(card);
      save(HAND_KEY, hand);
      save(PLAYER_KEY, playerCards);

      incPlaced('player');
      playerPlacedThisTurn = true;
      updateUI();

      setTimeout(resolveBattles, 200);
    };
  });
}

function opponentPlaceOne() {
  deck = load(DECK_KEY);
  let opp = load(OPP_KEY);
  if (deck.length === 0) return;

  const totalSlots = opponentContainer.children.length;
  const used = opp.map((c) => Number(c.slot));
  let freeSlot = -1;
  for (let s = 0; s < totalSlots; s++) {
    if (!used.includes(s)) { freeSlot = s; break; }
  }
  if (freeSlot === -1) return;

  const card = deck.shift();
  card.slot = freeSlot;
  selectModeAutomatically(card);
  opp.push(card);

  save(DECK_KEY, deck);
  save(OPP_KEY, opp);
  incPlaced('opponent');

  setTimeout(() => { updateUI(); setTimeout(resolveBattles, 300); }, 200);
}

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

function checkMatchEnd() {
  const placed = loadPlacedCounts();
  if (placed.player >= HAND_LIMIT && placed.opponent >= HAND_LIMIT) finalizeMatch();
}

function finalizeMatch() {
  const score = loadScore();
  let result = 'Draw';
  if (score.player > score.opponent) result = 'You win!';
  else if (score.player < score.opponent) result = 'You lose';
  else result = 'Draw';

  const banner = ensureResultBanner();
  banner.innerHTML = `<div style="font-weight:bold;">Match over — ${result}</div>
    <div style="margin-top:6px;">Final Score — You: ${score.player} | Opponent: ${score.opponent}</div>`;

  setTimeout(() => {
    const restart = confirm(`Match over: ${result}\nFinal Score — You: ${score.player} | Opponent: ${score.opponent}\n\nRestart game? Press OK to reset.`);
    if (restart) resetMatch();
  }, 300);
}

function resetMatch() {
  localStorage.removeItem(PLAYER_KEY);
  localStorage.removeItem(OPP_KEY);
  localStorage.removeItem(HAND_KEY);
  saveScore({ player: 0, opponent: 0 });
  savePlacedCounts({ player: 0, opponent: 0 });

  const banner = ensureResultBanner();
  banner.textContent = 'Match reset. Start again!';
  setTimeout(() => { banner.textContent = ''; }, 1500);

  currentTurn = 'player';
  playerPlacedThisTurn = false;
  updateUI();
}

function updateUI() {
  renderDeckInfo();
  renderHand();
  renderPlayerArea();
  renderOpponentArea();
  setupDragAndDrop();
  drawButton.disabled = (load(HAND_KEY).length >= HAND_LIMIT) || (load(DECK_KEY).length === 0);
  endTurnButton.disabled = currentTurn !== 'player';

  const score = loadScore();
  const placed = loadPlacedCounts();
  const banner = ensureResultBanner();
  banner.textContent = `Score — You: ${score.player} | Opp: ${score.opponent} · Placed: You ${placed.player}/${HAND_LIMIT} • Opp ${placed.opponent}/${HAND_LIMIT}`;
}

if (drawButton) drawButton.addEventListener('click', drawToHand);
if (endTurnButton) endTurnButton.addEventListener('click', handleEndTurn);

updateUI();
