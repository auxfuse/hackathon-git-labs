const communityContainer = document.querySelector('#community');

createElement = (element, className) => {
    // Simple function for defining Elements and class names of same
    const el = document.createElement(element);
    el.className = className;
    return el;
};

fetch("community.json")
    // Fetch JSON data & add to DOM
    .then(
        response => response.json()
    )
    .then(
        data => {
            let participants = data.map(participant => [
                participant.name,
                participant.course_start,
                participant.course_stage,
                participant.favorite_language,
                participant.currently_learning
            ]);

            participants.forEach((participant) => {
                // Create Elements
                const card = createElement("div", "card");
                const name = createElement("h2", "card-title");
                const courseStart = createElement("p", "card-sub margin-yt-sm");
                const courseStage = createElement("p", "card-sub margin-yb-sm custom-underline");
                const favLanguage = createElement("p", "card-detail");
                const currentLearn = createElement("p", "card-detail custom-underline");
                const linkTo = createElement("a", "participant-link");
                
                // Inject data to new Created elements
                name.innerHTML += participant[0];
                courseStart.innerHTML += "📅 Started: " + participant[1];
                courseStage.innerHTML += "🎓 Stage: " + participant[2];
                favLanguage.innerHTML += "Loves: " + participant[3] + " 😍";
                currentLearn.innerHTML += "Learning: " + participant[4] + " 📚";
                linkTo.innerHTML += "More";

                let linkRef = participant[0];
                linkTo.setAttribute("href", `community/${linkRef}`)

                // Hierarchy of Container
                communityContainer.append(card);
                card.append(
                    name, courseStart, courseStage, favLanguage, currentLearn, linkTo
                );
            })
        }
    );