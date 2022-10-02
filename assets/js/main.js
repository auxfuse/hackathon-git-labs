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
      <p class="card-sub margin-yt-sm">📅 Started: ${participant.course_start}</p>
      <p class="card-sub margin-yb-sm custom-underline">🎓 Stage:  ${participant.course_stage}</p>
      <p class="card-detail">Loves: ${participant.favorite_language} 😍 </p>
      <p class="card-detail custom-underline">Learning: ${participant.currently_learning} 📚 </p>
      <a class="participant-link" href="community/${participant.name}" data-content="View Work ➡">View Work ➡</a>
      `;

    const card = createElement("div", "card");
    card.innerHTML = cardHTML;
    communityContainer.appendChild(card);
  });
};

fetch("assets/data/community.json")
  .then((response) => response.json())
  .then((data) => createParticipantes(data));
