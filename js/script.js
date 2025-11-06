const cardsData = [
  {
    id: 1,
    name: "hafozlik",
    image: "https://i.pinimg.com/736x/a9/80/57/a980578670029d3c2bf049667bf37f0a.jpg",
    ATK: 7000,
    DEF: 4000,
    power: "Darkness",
    type: "Mythic",
    price: 500,
    quantity: 1
  },
  {
    id: 2,
    name: "Zephyrax",
    image: "https://i.pinimg.com/736x/db/74/67/db746767684079439d647e8692b21d3a.jpg",
    ATK: 7600,
    DEF: 4200,
    power: "Storm",
    type: "Mythic",
    price: 500,
    quantity: 1
  },
  {
    id: 3,
    name: "Abyssion",
    image: "https://i.pinimg.com/736x/ce/2e/8e/ce2e8e42d1124ac9fb164d45e2fc8203.jpg",
    ATK: 7200,
    DEF: 4100,
    power: "Abyss",
    type: "Mythic",
    price: 500,
    quantity: 1
  },
  {
    id: 4,
    name: "Solarion",
    image: "https://i.pinimg.com/1200x/f4/1d/3b/f41d3b6c47199a3bb23d76a1b94f932a.jpg",
    ATK: 8000,
    DEF: 3900,
    power: "Light",
    type: "Mythic",
    price: 500,
    quantity: 0
  },
  {
    id: 5,
    name: "Nihra, Void Queen",
    image: "https://i.pinimg.com/736x/95/68/ea/9568ea1a5f8256050e5019d09b9bcadc.jpg",
    ATK: 8500,
    DEF: 4200,
    power: "Void",
    type: "Mythic",
    price: 500,
    quantity: 41
  },
  {
    id: 6,
    name: "Aymas the Brave",
    image: "https://i.pinimg.com/1200x/62/2a/2e/622a2edf56e6be001bc8f19c60efabad.jpg",
    ATK: 6000,
    DEF: 3500,
    power: "Fire",
    type: "Legendary",
    price: 300,
    quantity: 91
  },
  {
    id: 7,
    name: "Angilita the Pure",
    image: "https://i.pinimg.com/736x/8c/12/a4/8c12a4ddae2c4c20a0fbe7f9c6efbca7.jpg",
    ATK: 6200,
    DEF: 3600,
    power: "Light",
    type: "Legendary",
    price: 300,
    quantity: 1
  },
  {
    id: 8,
    name: "Tarnok, Lord of Blades",
    image: "https://i.pinimg.com/736x/7e/1f/ca/7e1fca724e3e0c2f3562902f7e3fb73f.jpg",
    ATK: 5900,
    DEF: 3700,
    power: "Metal",
    type: "Legendary",
    price: 300,
    quantity: 12
  },
  {
    id: 9,
    name: "Crystara",
    image: "https://i.pinimg.com/1200x/ee/ca/a0/eecaa03777c898532b0a4160d9efd7c9.jpg",
    ATK: 5000,
    DEF: 3100,
    power: "Ice",
    type: "Epic",
    price: 150,
    quantity: 19
  },
  {
    id: 10,
    name: "Draven the Silent",
    image: "https://i.pinimg.com/736x/6b/87/dd/6b87ddd9a1aa9a02d4cb498d778f5d3f.jpg",
    ATK: 5200,
    DEF: 2900,
    power: "Shadow",
    type: "Epic",
    price: 150,
    quantity: 15
  },
  {
    id: 11,
    name: "Flamoria",
    image: "https://i.pinimg.com/736x/1c/a9/32/1ca9320f06108f289ce76e6139758d5d.jpg",
    ATK: 5100,
    DEF: 3000,
    power: "Flame",
    type: "Epic",
    price: 150,
    quantity: 1
  },
  {
    id: 12,
    name: "Kelon Beast",
    image: "https://i.pinimg.com/736x/11/5a/c3/115ac3dc0bc6586620b5fed1f8ddcc1f.jpg",
    ATK: 3500,
    DEF: 2400,
    power: "Nature",
    type: "Rare",
    price: 80,
    quantity: 1
  },
  {
    id: 13,
    name: "Mira of the Tides",
    image: "https://i.pinimg.com/736x/f3/70/44/f37044a7e9ef6dcb8b2417da530888fe.jpg",
    ATK: 3400,
    DEF: 2300,
    power: "Water",
    type: "Rare",
    price: 80,
    quantity: 1
  },
  {
    id: 14,
    name: "Voltra",
    image: "https://i.pinimg.com/1200x/3a/c9/28/3ac9284b8f203b7123a48eb404cbb53f.jpg",
    ATK: 3700,
    DEF: 2100,
    power: "Electric",
    type: "Rare",
    price: 80,
    quantity: 1
  },
  {
    id: 15,
    name: "Slime Jr.",
    image: "https://i.pinimg.com/1200x/8e/4a/c3/8e4ac32c2ff078fef75da2c02a91640f.jpg",
    ATK: 800,
    DEF: 400,
    power: "Water",
    type: "Common",
    price: 30,
    quantity: 1
  },
  {
    id: 16,
    name: "Cactus Bug",
    image: "https://i.pinimg.com/736x/1e/6a/5d/1e6a5d4ab3c310b5d5380c9db2943b24.jpg",
    ATK: 1000,
    DEF: 600,
    power: "Earth",
    type: "Common",
    price: 30,
    quantity: 1
  },
  {
    id: 17,
    name: "Tiny Bat",
    image: "https://i.pinimg.com/736x/b5/c7/b3/b5c7b3992133d73c4d2cd7ce16a9bd1d.jpg",
    ATK: 900,
    DEF: 500,
    power: "Dark",
    type: "Common",
    price: 30,
    quantity: 1
  },
  {
    id: 18,
    name: "Fire Bug",
    image: "https://i.pinimg.com/736x/47/e1/49/47e149d2994ddd069412531fdcb5785c.jpg",
    ATK: 1100,
    DEF: 700,
    power: "Fire",
    type: "Common",
    price: 30,
    quantity: 1
  }
];

document.addEventListener("DOMContentLoaded", () => {

let cardContainer = document.getElementById("card-container");
let cardCategory = document.getElementById('category');

let header = document.querySelector("header");
let footer = document.querySelector("footer");

  console.log("i'm going to add header content");
  header.innerHTML += `
  <nav id="nav-menu" class="hidden md:block absolute md:static top-16 right-4 md:right-auto bg-black md:bg-transparent bg-opacity-90 md:bg-opacity-0 border md:border-none border-yellow-400 md:border-0 rounded-lg md:rounded-none p-4 md:p-0 z-50 font-[irish]">
    <ul class="flex flex-col md:flex-row md:space-x-8 text-yellow-200 font-[irish]">
      <li><a href="./index.html" class="hover:text-indigo-400 block py-1">Home</a></li>
      <li><a href="./guide.html" class="hover:text-indigo-400 block py-1">Guide</a></li>
      <li><a href="./favourite.html" class="hover:text-indigo-400 block py-1">Favourite</a></li>
      <li><a href="./market.html" class="hover:text-indigo-400 block py-1">Market</a></li>
      <li><a href="./myDeck.html" class="hover:text-indigo-400 block py-1">My Deck</a></li>
      <li><a id="card-button" class="hover:text-indigo-400 block py-1 cursor-pointer">Card</a></li>
    </ul>
  </nav>`;

  footer.innerHTML += `
    <div class="flex justify-between mb-14 mt-12 gap-[400px]">
      <div class="ml-8">
        <h2 class="text-yellow-400 font-bold text-2xl tracking-wide mb-8 font-[Irish]">AETHERION</h2>
        <p class="text-white font-bold mb-2 font-[Irish]">
          Welcome to the Aetherion world — take your card, trade, and play to win.<br>
          It's your time to show the world your talent.
        </p>
      </div>

      <nav class="space-x-8 text-yellow-200 mr-16 pt-4 hidden md:block">
        <ul class="flex flex-wrap justify-between gap-10">
          <li><a href="./index.html" class="hover:text-indigo-400 font-[Irish]">Home</a></li>
          <li><a href="./guide.html" class="hover:text-indigo-400 font-[Irish]">Guide</a></li>
          <li><a href="./market.html" class="hover:text-indigo-400 font-[Irish]">Market</a></li>
          <li><a href="./myDeck" class="hover:text-indigo-400 font-[Irish]">My Deck</a></li>
          <li><a href="favourite.html" class="hover:text-indigo-400 font-[Irish]">Favourite</a></li>
          <li><a href="#" class="hover:text-indigo-400 font-[Irish]">Card</a></li>
          <li><a href="#" class="hover:text-indigo-400 font-[Irish]">Contact us</a></li>
          <li><a href="#" class="hover:text-indigo-400 font-[Irish]">FAQ</a></li>
          <li><a href="#" class="hover:text-indigo-400 font-[Irish]">About us</a></li>
        </ul>
      </nav>
    </div>  
  `;

  
  // Get references to the burger button and nav menu
  const burger = document.getElementById('burger-menu');
  const navMenu = document.getElementById('nav-menu');
console.log("1");
  // Toggle the menu when burger is clicked
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
console.log("2")
  // Optional: Close menu when a link is clicked (mobile)
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!navMenu.classList.contains('hidden')) {
        navMenu.classList.add('hidden');
      }
    });
  });

console.log("before burger")


  console.log("i'm before render");

// Render Cards
function renderCard(data, isFiltred = false) {
  if (isFiltred) cardContainer.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    cardContainer.innerHTML += `
      <div class="bg-orange-900 bg-opacity-80 rounded-xl shadow-lg flex flex-col items-center p-3 w-64 text-white transform hover:scale-105 transition-transform duration-300">
        <img src=${data[i].image} alt="Card-image" class="w-full h-[350px] object-cover rounded-md mb-3" />
        <div class="bg-orange-300 w-full rounded-md mb-4 p-2 text-center text-black ">
          <h2 class="font-bold text-lg">${data[i].name}</h2>
          <p class="text-sm font-semibold">Power: <span class="text-red-700">${data[i].power}</span></p>
          <div class="flex justify-between text-sm mt-1">
            <span>ATK: <strong>${data[i].ATK}</strong></span>
            <span>DEF: <strong>${data[i].DEF}</strong></span>
          </div>
        </div>
        <div class="flex gap-3">
          <button value="${data[i].id}" class="panier-button bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-full transition">Add to Panier</button>
          <button value="${data[i].id}" class="favourite-button bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-1 rounded-full transition">Add to Favourite</button>
        </div>
      </div>`;
  }

  setupButtons();
}

console.log("before filter")

function filterCard(cardType) {
  return cardsData.filter(c => c.type == cardType);
}

cardCategory.addEventListener('change', () => {
  if (cardCategory.value == "all") return renderCard(cardsData, true);
  renderCard(filterCard(cardCategory.value), true);
});

renderCard(cardsData);

console.log("before setup")
// Panier & Favourite Buttons
function setupButtons() {
  let payButton = document.querySelectorAll('.panier-button');
  let favouriteButton = document.querySelectorAll('.favourite-button');

  payButton.forEach(button => {
    button.addEventListener('click', () => {
      let userCards = JSON.parse(localStorage.getItem("usercards")) || [];
      const card = cardsData.find(c => c.id == button.value);
      if (!card) return;
      if (card.quantity <= 0) return alert("Out of stock!");
      if (userCards.some(c => c.id == card.id)) return alert("Already in panier.");
      alert(`"${card.name}" added to panier.`);
      userCards.push(card);
      localStorage.setItem("usercards", JSON.stringify(userCards));
    });
  });

  favouriteButton.forEach(button => {
    button.addEventListener('click', () => {
      let userFavouriteCards = JSON.parse(localStorage.getItem("userFavouriteCards")) || [];
      const card = cardsData.find(c => c.id == button.value);
      if (!card) return;
      if (userFavouriteCards.some(c => c.id == card.id)) return alert("Already in favourite.");
      alert(`"${card.name}" added to favourite.`);
      userFavouriteCards.push(card);
      localStorage.setItem("userFavouriteCards", JSON.stringify(userFavouriteCards));
    });
  });
}
console.log("before the panier")
// Panier Popup
const popup = document.getElementById('panier-popup');
const panierButton = document.getElementById('card-button');

panierButton.addEventListener('click', () => {
  console.log("click")
  popup.classList.toggle('hidden');
  renderMyCard();
});

// Render Cart
function renderMyCard() {
  const myCard = JSON.parse(localStorage.getItem('usercards')) || [];
  popup.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Panier</h2>
    ${myCard.length == 0 ? "<p>No cards in panier.</p>" : ""}
    ${myCard.map(c => `
      <div class="card-item flex justify-between items-center mb-2">
        <span>${c.name} (Price: ${c.price}$)</span>
        <input type="number" id="quantity-${c.id}" min="1" max="${c.quantity}" value="1" class="w-16 text-black" />
        <button data-id="${c.id}" class="sell-btn bg-green-600 text-white px-2 py-1 rounded">Sell</button>
        <button data-id="${c.id}" class="remove-btn bg-red-600 text-white px-2 py-1 rounded">Remove</button>
      </div>`).join('')}
    <div class="mt-4">
      <button id="sell-all-btn" class="bg-blue-600 text-white px-4 py-2 rounded mr-2">Sell All</button>
      <button id="remove-all-btn" class="bg-red-600 text-white px-4 py-2 rounded">Remove All</button>
    </div>`;
  
  attachCartButtons();
}

function attachCartButtons() {
  const myCard = JSON.parse(localStorage.getItem('usercards')) || [];

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const newCards = myCard.filter(card => card.id !== id);
      localStorage.setItem('usercards', JSON.stringify(newCards));
      renderMyCard();
    });
  });

  document.querySelectorAll('.sell-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const card = myCard.find(c => c.id === id);
      const qty = parseInt(document.getElementById(`quantity-${id}`).value);

      if (qty > 0 && qty <= card.quantity) {
        alert(`You sold ${qty} of "${card.name}" for ${qty * card.price}$`);

        let myDeck = JSON.parse(localStorage.getItem("myDeck")) || [];
        const existing = myDeck.find(c => c.id === card.id);
        if (existing) {
          existing.quantity += qty;
        } else {
          myDeck.push({ ...card, quantity: qty });
        }
        localStorage.setItem("myDeck", JSON.stringify(myDeck));

        const updated = myCard.filter(c => c.id !== id);
        localStorage.setItem('usercards', JSON.stringify(updated));
        renderMyCard();
      } else {
        alert('Invalid quantity.');
      }
    });
  });

  const sellAll = document.getElementById('sell-all-btn');
  if (sellAll) {
    sellAll.addEventListener('click', () => {
      let total = myCard.reduce((sum, c) => sum + c.price, 0);
      alert(`You sold all cards for ${total}$`);

      let myDeck = JSON.parse(localStorage.getItem("myDeck")) || [];
      myCard.forEach(card => {
        const existing = myDeck.find(c => c.id === card.id);
        if (existing) {
          existing.quantity += card.quantity;
        } else {
          myDeck.push({ ...card });
        }
      });
      localStorage.setItem("myDeck", JSON.stringify(myDeck));

      localStorage.removeItem('usercards');
      renderMyCard();
    });
  }

  const removeAll = document.getElementById('remove-all-btn');
  if (removeAll) {
    removeAll.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove all cards?')) {
        localStorage.removeItem('usercards');
        renderMyCard();
      }
    });
  }
}


});
