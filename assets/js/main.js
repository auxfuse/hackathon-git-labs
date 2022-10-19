import { genIndexes, shuffle } from './modules/utilities.js';
import { createParticipantesCards, createSkeletonLoaders } from './modules/cards.js';


document.getElementById('showcases-slideshow')
  .addEventListener('slide-changed', e => {
    const titleEl = document.getElementById('showcases-slide-title');
    titleEl.innerHTML = '';
    titleEl.append(e.detail.querySelector('.slide-title > .card-title').cloneNode(true));
  });


(() => {

  const communityElements = {
    // Maximum number of cards to append for this section
    count: 10,
    // The element to append cards to
    container: document.querySelector("#community"),
    // The HTML template to use as a base for each card
    template: document.querySelector("#community-section > .item-template")
  };
  const showcaseElements = {
    count: 5,
    container: document.querySelector("#showcases-slideshow"),
    template: document.querySelector("#showcases > .item-template")
  };

  // Create Loaders for community section cards
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
      // Alter count to show all cards
      communityElements.count = participants.length;
      communityElements.container.innerHTML = "";
      createParticipantesCards(participants, emojis, communityElements);
    }

  });

})();