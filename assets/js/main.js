/**
 * Creates an array of numbers in a given range
 * @param {Number} max - Maximum number in range 
 * @param {Number} min - (optional) Minimum number in range
 * @returns Randomised list of numbers
 */
const genIndexes = (max, min = 0) => new Array(max - min).fill(0).map((_, i) => i + min);

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

  for (const field of fields) {
    if (field.dataset.field === 'link') {
      field.setAttribute('href', `community/${participant.name}`);
    } else if (field.dataset.field === 'random_emoji') {
      field.innerText = getRandomEmoji(emojis);
    } else {
      field.innerText = participant[field.dataset.field];
    }
    // We don't need the data-field anymore:
    delete field.dataset.field;
  }
  return card;
}

/**
 * Creates a list of participant cards based on the HTML template and participant data passed.
 * @param {Array} participants - Participant data
 * @param {Array} emojis - Emoji array
 * @param {Object} elements - Object of DOM elements and maximum cards to be produced
 * @param {Array} indexes - (Optional) List of participant indexes to use. If not present all participants are created in order. Indexes are assumed to be valid.
 * @param {Array} pages - (Optional) List of custom pages. If present this is used to filter participants so only those with valid pages are appended.
 */
const createParticipantesCards = (participants, emojis, elements, indexes = null, pages = null) => {
  // By using a document fragment lots of little DOM mutations
  // can be cached into one big one for better performance
  const fragment = new DocumentFragment();

  let remaining = elements.count;
  if (!indexes) indexes = genIndexes(participants.length);

  for (const idx of indexes) {
    // If the user has a custom page or we don't care if they have one
    if (!pages || pages.includes(participants[idx].name)) {
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
    fragment.append(el);
  }

  elements.container.append(fragment);
}

(() => {

  const communityElements = {
    count: 10,
    container: document.querySelector("#community"),
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
    // List of participant custom pages
    fetch("assets/data/communitypages.json")
      .then(response => response.json()),
    // Emoji list
    fetch("assets/data/emojis.json")
      .then((response) => response.json()),

  ]).then((values) => {
    // When all data has loaded:
    const [participants, pages, emojis] = values;

    if (showcaseElements.container && showcaseElements.template) {
      const indexes = shuffle(genIndexes(participants.length));
      createParticipantesCards(participants, emojis, showcaseElements, indexes, pages);
    }

    if (communityElements.container && communityElements.template) {
      communityElements.count = participants.length;
      createParticipantesCards(participants, emojis, communityElements);
    }
  });

})();