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
    const perPage = 6;
    let currentPage = Number(new URLSearchParams(window.location.search).get("page"));

    let pageParticipants = pagePagination(participants, currentPage, perPage);

    if (showcaseElements.container && showcaseElements.template) {
      const indexes = shuffle(genIndexes(participants.length));
      createParticipantesCards(participants, emojis, showcaseElements, indexes, true);
    }

    if (communityElements.container && communityElements.template) {
      // Alter count to show all cards
      communityElements.count = participants.length;
      communityElements.container.innerHTML = "";
      createParticipantesCards(participants, emojis, communityElements, pageParticipants);
    }
  });
})();

// pagination

function pagePagination(participants, currentPage, perPage) {
  const paginationEl = document.getElementById("pagination");
  const totalPages = Math.ceil(participants.length / perPage);

  const paginationNextLi = document.createElement('li')
  const paginationNextButton = document.createElement('a');
  
  paginationNextButton.textContent = "Next";
  paginationNextButton.href = `?page=${currentPage + 1}`;
  paginationEl.appendChild(paginationNextLi);
  paginationNextLi.append(paginationNextButton);

  if(!currentPage) {
    window.location.href = '?page=1';
  }

  if (currentPage === totalPages) {
    paginationNextLi.style.display = "none";
  };

  for (let i = 0; i < totalPages; i++) {
    const paginationLi = document.createElement('li');
    const paginationLink = document.createElement('a');
    
    paginationLink.textContent = i + 1;
    paginationLink.href = `?page=${i+1}`;
    paginationEl.appendChild(paginationLi);
    paginationLi.append(paginationLink);

    if (currentPage == i + 1) {
      paginationLink.classList.add("pagination-active");
    };
  }

  const paginationPrevLi = document.createElement('li')
  const paginationPrevButton = document.createElement('a');
  
  paginationPrevButton.textContent = "Previous";
  paginationPrevButton.href = `?page=${currentPage - 1}`;
  paginationEl.appendChild(paginationPrevLi);
  paginationPrevLi.append(paginationPrevButton);

  if (currentPage === 1) {
    paginationPrevLi.style.display = "none";
  };
  
  let firstParticipantIndex = currentPage * perPage - perPage;
  let lastParticipantIndex = currentPage * perPage -1;
  
  if (lastParticipantIndex >= participants.length) {
    lastParticipantIndex = participants.length -1;
  };
  
return genIndexes(lastParticipantIndex+1, firstParticipantIndex);
};