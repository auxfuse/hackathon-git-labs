import { genIndexes, shuffle } from './modules/utilities.js';
import { createParticipantesCards, createSkeletonLoaders } from './modules/cards.js';

const attachShowcaseEvents = () => {
  document.querySelectorAll('#showcases-slideshow > .slideshow-slide')
    .forEach(el => el.addEventListener('wheel', function (e) {
      // If this is the active slide allow content scrolling
      if (this.classList.contains('active')) {
        const content = this.querySelector('.slideshow-contents');
        const scrollPos = content.contentWindow.scrollY + (e.deltaY * 2);
        const scrollBottom = content.contentDocument.body.scrollHeight
          - content.contentWindow.innerHeight;

        content.contentWindow.scrollTo({
          top: scrollPos,
          left: 0,
          behavior: 'smooth'
        });

        // Do we want to prevent the outer page from scrolling?
        if (scrollPos > 0 && scrollPos < scrollBottom) {
          e.preventDefault();
        }
      }
    }));
}

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
    attachShowcaseEvents();

    if (communityElements.container && communityElements.template) {
      // Alter count to show all cards
      communityElements.count = participants.length;
      communityElements.container.innerHTML = "";
      createParticipantesCards(participants, emojis, communityElements);
    }

  });

})();