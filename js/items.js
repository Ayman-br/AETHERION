// ✅ Must be outside DOMContentLoaded
const script = document.currentScript || document.querySelector('script[src*="items.js"]');
const params = new URLSearchParams(script.src.split('?')[1]);
const item = params.get('item');

document.addEventListener('DOMContentLoaded', () => {
  console.log(`item: ${item}`);

  // Get cards safely
  const stored = localStorage.getItem(item);
  const cards = stored ? JSON.parse(stored) : [];

  if (!cards.length) {
    console.warn("No cards found for:", item);
    return;
  }

  // Determine which container to use
  const containerName = item === "myDeck" ? "deck-container" : "favorite-container";
  const container = document.getElementById(containerName);

  if (!container) {
    console.error(`Container with id "${containerName}" not found.`);
    return;
  }

  console.log("Rendering cards...");

  cards.forEach((card) => {
    let cardHTML = `
      <div class="bg-orange-900 bg-opacity-80 rounded-xl shadow-lg flex flex-col items-center p-3 w-64 text-white">
        <img src="${card.image}" alt="${card.name}" class="w-full h-[350px] object-cover rounded-md mb-3">
        <div class="bg-orange-300 w-full rounded-md mb-4 p-2 text-center text-black">
          <h2 class="font-bold text-lg">${card.name}</h2>
          <p class="text-sm font-semibold">Power: <span class="text-red-700">${card.power}</span></p>
          <div class="flex justify-between text-sm mt-1">
            <span>ATK: <strong>${card.ATK}</strong></span>
            <span>DEF: <strong>${card.DEF}</strong></span>
          </div>
        </div>
    `;

    if (containerName === "favorite-container") {
      cardHTML += `
        <div class="flex gap-3">
          <button onclick="addToPanier(${card.id})" class="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-full transition">
            Add to Panier
          </button>
          <button onclick="removeFromFavourite(${card.id})" class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-full transition">
            Remove
          </button>
        </div>
      `;
    }

    cardHTML += `</div>`; // close main div

    container.innerHTML += cardHTML;
  });

  // Add the "+" card only for myDeck
  if (item === "myDeck") {
    container.innerHTML += `
      <div class="flex justify-center items-center bg-gray-400/70 w-full h-[350px] m-4 rounded-xl h-[450px]">
        <a href="market.html">
          <span class="text-4xl font-bold">+</span>
        </a>
      </div>
    `;
  }
});


const favouriteContainer = document.getElementById("favourite-container");

 // Load favourite cards
        let favouriteCards = JSON.parse(localStorage.getItem("userFavouriteCards")) || [];
        let panierCards = JSON.parse(localStorage.getItem("usercards")) || [];

        function addToPanier(id) {
            const card = favouriteCards.find(c => c.id === id);
            if (!card) return;

            let exist = panierCards.some(c => c.id === id);
            if (exist) {
                alert("You already added this card to your panier!");
                return;
            }

            panierCards.push(card);
            localStorage.setItem("usercards", JSON.stringify(panierCards));
            alert(`${card.name} added to your panier 🛒`);
        }

        // Remove from favourites
        function removeFromFavourite(id) {
            favouriteCards = favouriteCards.filter(c => c.id !== id);
            localStorage.setItem("userFavouriteCards", JSON.stringify(favouriteCards));
            renderFavourites();
            alert("Removed from favourites ");
        }

        // Initial render
        renderFavourites();



        