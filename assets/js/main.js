const communityContainer = document.querySelector("#community");

/**
 * A function that creates an element and assigns a class name to it.
 */
const createElement = (element, className) => {
  const createdElement = document.createElement(element);
  createdElement.className = className;
  return createdElement;
};
const getRandomEmoji = async () => {
  return fetch("assets/data/emojis.json")
    .then((response) => response.json())
    .then((data) => data[Math.floor(Math.random() * data.length)]);
};

/**
 * It takes an array of objects, l
 * oops through each object, and creates a card for each object
 * @param listOfParticipants {Array} - This is the array of objects that we get from the API.
 */
const createParticipantes = (listOfParticipants) => {
  listOfParticipants.forEach(async (participant) => {
    const cardHTML = `
      <h2 class="card-title">${await getRandomEmoji()} ${participant.name}</h2>
      <h3 class="card-sub margin-yt-sm">📅 Started: ${participant.course_start}</h3>
      <h3 class="card-sub margin-yb-sm custom-underline">🎓 Stage:  ${participant.course_stage}</h3>
      <h3 class="card-detail">Loves: ${participant.favorite_language} 😍 </h3>
      <h3 class="card-detail custom-underline">Learning: ${participant.currently_learning} 📚 </h3>
      <a class="participant-link" href="community/${participant.name}" data-content="View Work ➡">View Work ➡</a>
      `;

    const card = createElement("div", "card");
    card.innerHTML = cardHTML;
    communityContainer.appendChild(card);
  });
};

const generateCardFromTemplate = (participant, template) => {
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
* @param {Array} indexes - List of random indexes of participants
* @param {Array} pages - Array of participants with custom pages
* @param {Object} showcases - Object of showcase data
*/
const createShowcases = (participants, indexes, pages, showcases) => {
  const fragment = new DocumentFragment();
  let remaining = showcases.count;

  for (const idx of indexes) {
      // Check participant has custom page
      if (pages.includes(participants[idx].name)) {
          remaining--;
          fragment.append(generateCardFromTemplate(participants[idx], showcases.template))
      }
      if (!remaining) break;
  }

  showcases.container.append(fragment);
}

const shuffle = (arr) => {
  for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const genRandomIndexes = (max, min = 0) => {
  const indexes = new Array(max - min).fill(0).map((v,i)=>i+min);
  return shuffle(indexes);
}

(()=>{
    const showcases = {
        count: 5,
        container: document.getElementById("showcases"),
        template: document.querySelector("#showcases > .item-template")
    };

    // Preload data
    Promise.all([
        fetch("assets/data/community.json")
            .then(response => response.json()),
        fetch("assets/data/communitypages.json")
            .then(response => response.json()),
    ]).then((values) => {
        // When all data has loaded:
        if (showcases.container && showcases.template) {
            createShowcases(values[0], genRandomIndexes(values[0].length), values[1], showcases);
        }
        createParticipantes(values[0]);
    });

})();