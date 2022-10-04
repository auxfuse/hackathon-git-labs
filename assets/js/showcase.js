
const generateCard = (participant, template) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const fields = card.querySelectorAll('[data-field]');

    for (const field of fields) {
        if (field.dataset.field == 'link') {
            field.setAttribute('href', `community/${participant.name}`);
        } else {
            field.children[0].innerText = participant[field.dataset.field];
        }
    }
    return card;
}

/**
 * Creates and appends showcase cards 
 * @param {Array} participants - Array of participant objects 
 * @param {Element} template - The template element object to build individual cards from
 * @param {Element} container - The dom element to appened the cards too
 * @param {Number} showcaseCount - The number of showcases to create
 */
const createShowcases = (participants, template, container, showcaseCount) => {
    const fragment = new DocumentFragment();
    showcaseCount = Math.min(participants.length, showcaseCount);

    for (let i = 0; i < showcaseCount; i++) {
        fragment.append(generateCard(participants[i], template));
    }
    container.append(fragment);
}

const shuffle = (arr) => {
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

(()=>{
    const showcaseCount = 5;
    const showcaseContainer = document.getElementById("showcases");
    const showcaseTemplate = document.getElementById("participant-card-template");

    fetch("assets/data/community.json")
        .then((response) => response.json())
        .then((data) => createShowcases(shuffle(data), showcaseTemplate, showcaseContainer, showcaseCount));

})();