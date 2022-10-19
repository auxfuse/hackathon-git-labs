import { genIndexes, getRandomEmoji } from './utilities.js';


/**
 * Generates a card element using the template and participant data passed.
 * @param {Object} participant - Participant data
 * @param {Array} emojis - Array of emojis
 * @param {Element} template - Template element to clone
 * @returns 
 */
export const generateCardFromTemplate = (participant, emojis, template) => {
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
export const createParticipantesCards = (participants, emojis, elements, indexes = null, pages = false) => {
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

    elements.container.appendChild(fragment);
}


/**
 * Creates and appends skeleton loader elements.
 * @param {Object} elements - Object of elements to be used for container and template
 */
export const createSkeletonLoaders = elements => {
    const fragment = new DocumentFragment();

    for (let i = 0; i < elements.count; i++) {
        const el = elements.template.content.firstElementChild.cloneNode(true);
        el.classList.add('skeleton');
        fragment.appendChild(el);
    }

    elements.container.appendChild(fragment);
}
