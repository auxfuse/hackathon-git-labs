import { genIndexes, shuffle, clamp } from "./modules/utilities.js";
import {
    createParticipantesCards,
    createSkeletonLoaders,
} from "./modules/cards.js";

document
    .getElementById("showcases-slideshow")
    .addEventListener("slide-changed", (e) => {
        const titleEl = document.getElementById("showcases-slide-title");
        titleEl.innerHTML = "";
        titleEl.append(
            e.detail.querySelector(".slide-title > .card-title").cloneNode(true)
        );
    });

(() => {
    const communityElements = {
        // Maximum number of cards to append for this section
        count: 10,
        // The element to append cards to
        container: document.querySelector("#community"),
        // The HTML template to use as a base for each card
        template: document.querySelector("#community-section > .item-template"),
    };
    const showcaseElements = {
        count: 5,
        container: document.querySelector("#showcases-slideshow"),
        template: document.querySelector("#showcases > .item-template"),
    };

    // Create Loaders for community section cards
    if (communityElements.container && communityElements.template) {
        createSkeletonLoaders(communityElements);
    }

    // Preload data
    Promise.all([
        // Participant records
        fetch("assets/data/community.json").then((response) => response.json()),
        // Emoji list
        fetch("assets/data/emojis.json").then((response) => response.json()),
    ]).then((values) => {
        // When all data has loaded:
        const [participants, emojis] = values;
        const perPage = 6;
        let currentPage = Number(
            new URLSearchParams(window.location.search).get("page")
        );

        let pageParticipants = pagePagination(
            participants,
            currentPage,
            perPage
        );

        if (showcaseElements.container && showcaseElements.template) {
            const indexes = shuffle(genIndexes(participants.length));
            createParticipantesCards(
                participants,
                emojis,
                showcaseElements,
                indexes,
                true
            );
        }

        if (communityElements.container && communityElements.template) {
            // Alter count to show all cards
            communityElements.count = participants.length;
            communityElements.container.innerHTML = "";
            createParticipantesCards(
                participants,
                emojis,
                communityElements,
                pageParticipants
            );
        }
    });
})();

// pagination
const paginationParent = document.getElementById("community-section");
const paginationEl = document.getElementById("pagination");
let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;

function pagePagination(participants, currentPage, perPage) {
    const totalPages = Math.ceil(participants.length / perPage);

    currentPage = clamp(currentPage, 1, totalPages);

    const paginationNextLi = document.createElement("li");
    const paginationNextButton = document.createElement("a");

    paginationNextButton.textContent = "➡️";
    paginationNextButton.href = `?page=${currentPage + 1}#community-section`;
    paginationEl.appendChild(paginationNextLi);
    paginationNextLi.append(paginationNextButton);

    paginationNextLi.classList.add("next-button");

    if (currentPage === totalPages) {
        paginationNextLi.style.display = "none";
    }

    for (let i = 0; i < totalPages; i++) {
        const paginationLi = document.createElement("li");
        const paginationLink = document.createElement("a");

        paginationLink.textContent = i + 1;
        paginationLink.href = `?page=${i + 1}#community-section`;
        paginationEl.appendChild(paginationLi);
        paginationLi.append(paginationLink);

        if (currentPage == i + 1) {
            paginationLink.classList.add("pagination-active");
            if(paginationLink.classList.contains("pagination-active")) {
                if(!isMobile) {
                    paginationLink.innerHTML = `🐱‍🏍${i + 1}`;
                }
            }
        }
        paginationLi.classList.add("pagination-numbers");
    }

    const paginationPrevLi = document.createElement("li");
    const paginationPrevButton = document.createElement("a");

    paginationPrevButton.textContent = "⬅️";
    paginationPrevButton.href = `?page=${currentPage - 1}#community-section`;
    paginationEl.appendChild(paginationPrevLi);
    paginationPrevLi.append(paginationPrevButton);

    paginationPrevLi.classList.add("prev-button");

    if (currentPage === 1) {
        paginationPrevLi.style.display = "none";
    }

    let firstParticipantIndex = currentPage * perPage - perPage;
    let lastParticipantIndex = currentPage * perPage - 1;

    if (lastParticipantIndex >= participants.length) {
        lastParticipantIndex = participants.length - 1;
    }

    return genIndexes(lastParticipantIndex + 1, firstParticipantIndex);
}

// pagination observer

let tHold;
if(isMobile) {
    tHold = 0.25;
} else {
    tHold = 0.6;
}

const options = {
    root: null,
    threshold: tHold
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // console.log(entry);
      if(entry['isIntersecting'] === true) {
          paginationEl.style.opacity = 1;
      } else {
          paginationEl.style.opacity = 0;
      }
    });
}, options);

observer.observe(paginationParent);
