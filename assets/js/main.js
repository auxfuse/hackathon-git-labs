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
      <a class="participant-link" href="community/${participant.name}" data-content= "">${participant.name}'s Work ➡</a>
      `;

    const card = createElement("div", "card");
    card.innerHTML = cardHTML;
    communityContainer.appendChild(card);
  });
};

fetch("assets/data/community.json")
  .then((response) => response.json())
  .then((data) => createParticipantes(data));
