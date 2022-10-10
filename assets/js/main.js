/**
 * Creates an array of numbers in a given range
 * @param {Number} max - Maximum number in range 
 * @param {Number} min - (optional) Minimum number in range. Defaults to 0
 * @returns Randomised list of numbers
 */
const genIndexes = (max, min = 0) => new Array(max - min).fill(0).map((_, i) => i + min);

/** Returns a random emoji from the emoji array passed */
const getRandomEmoji = emojis => emojis[Math.floor(Math.random() * emojis.length)];

/**
 * In place shuffles array into a random order
 * @param {Array} arr - Array to be shuffled
 * @returns Randomised array
 */
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a card element using the template and participant data passed.
 * @param {Object} participant - Participant data
 * @param {Array} emojis - Array of emojis
 * @param {Element} template - Template element to clone
 * @returns 
 */
const generateCardFromTemplate = (participant, emojis, template) => {
  const card = template.content.firstElementChild.cloneNode(true);
  const fields = card.querySelectorAll('[data-field]');

  const action = {
    'default': field => field.innerText = participant[field.dataset.field],
    'random_emoji': field => field.innerText = getRandomEmoji(emojis),
    'preview': field => field.src = `community/${participant.name}`,
    'link': field => field.setAttribute('href', `community/${participant.name}`)
  };

  for (const field of fields) {
    (action[field.dataset.field] || action['default'])(field);
    // We don't need the data-field anymore:
    delete field.dataset.field;
  }
  return card;
}

/**
 * Creates a list of participant cards based on the HTML template and participant data passed.
 * @param {Array} participants - Participant data
 * @param {Array} emojis - Emoji array
 * @param {Object} elements - Object of DOM elements and maximum number of cards to be produced
 * @param {Array} indexes - (Optional) List of participant indexes to use. If not present all participants are created in order. Indexes are assumed to be valid.
 * @param {Boolean} pages - (Optional) If true the partipant will only be added if they have a custom page
 */
const createParticipantesCards = (participants, emojis, elements, indexes = null, pages = false) => {
  /* By using a document fragment lots of little DOM mutations
      can be cached into one big one for better performance. */
  const fragment = new DocumentFragment();

  let remaining = elements.count;
  if (!indexes) indexes = genIndexes(participants.length);

  for (const idx of indexes) {
    // If the user has a custom page or if we don't care if they have one
    if (!pages || participants[idx].showcase) {
      remaining--;
      fragment.appendChild(generateCardFromTemplate(participants[idx], emojis, elements.template));
    }
    if (!remaining) break;
  }

  // Ensure the container is empty then add the new cards
  elements.container.innerHTML = "";
  elements.container.appendChild(fragment);
}

/**
 * Creates and appends skeleton loader elements.
 * @param {Object} elements - Object of elements to be used for container and template
 */
const createSkeletonLoaders = elements => {
  const fragment = new DocumentFragment();

  for (let i = 0; i < elements.count; i++) {
    const el = elements.template.content.firstElementChild.cloneNode(true);
    el.classList.add('skeleton');
    fragment.appendChild(el);
  }

  elements.container.appendChild(fragment);
}

(() => {

  const communityElements = {
    // Maximum number of cards to append for this section
    count: 10,
    // The element to append cards to
    container: document.querySelector("#community"),
    // The HTML template to use as a base for each card
    template: document.querySelector("#community > .item-template")
  };
  const showcaseElements = {
    count: 5,
    container: document.querySelector("#showcases"),
    template: document.querySelector("#showcases > .item-template")
  };

  // Create Loaders
  if (showcaseElements.container && showcaseElements.template) {
    createSkeletonLoaders(showcaseElements);
  }
  if (communityElements.container && communityElements.template) {
    createSkeletonLoaders(communityElements);
  }

  // Preload data
  Promise.all([

    // Participant records
    fetch("assets/data/community.json")
      .then(response => response.json()),
    // Emoji list
    fetch("assets/data/emojis.json")
      .then((response) => response.json()),

  ]).then((values) => {
    // When all data has loaded:
    const [participants, emojis] = values;

    if (showcaseElements.container && showcaseElements.template) {
      const indexes = shuffle(genIndexes(participants.length));
      createParticipantesCards(participants, emojis, showcaseElements, indexes, true);
    }

    if (communityElements.container && communityElements.template) {
      communityElements.count = participants.length;
      createParticipantesCards(participants, emojis, communityElements);
    }

  });

})();

// pagination

const paginationEl = document.getElementById("pagination");
const perPage = 6;

function pagePagination(participants) {
  const totalPages = Math.ceil(participants.length / perPage);
  
  for (let i = 0; i < totalPages; i++) {
    const paginationLi = document.createElement('li');
    const paginationLink = document.createElement('a');
    
    paginationLink.textContent = i + 1;
    paginationLink.href = `?page=${i+1}`;
    paginationEl.appendChild(paginationLi);
    paginationLi.append(paginationLink);
    
    console.log(paginationLink.href);
    
    const currentPage = window.location.pathname;
    console.log(`${currentPage} - current page`);
  }
  
  
  console.log(Math.ceil(participants.length / perPage));
  console.log(participants);
}