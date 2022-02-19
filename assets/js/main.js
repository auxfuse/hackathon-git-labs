const communityContainer = document.querySelector('#community');

fetch("community.json")
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
                const card = document.createElement("div");
                card.className = "card";
                const pName = document.createElement("h2");
                const pCourseStart = document.createElement("p");
                const pCourseStage = document.createElement("p");
                const pFavLanguage = document.createElement("p");
                const pCurrentLearn = document.createElement("p");

                pName.innerHTML += participant[0];
                pCourseStart.innerHTML += participant[1];
                pCourseStage.innerHTML += participant[2];
                pFavLanguage.innerHTML += participant[3];
                pCurrentLearn.innerHTML += participant[4];

                communityContainer.append(card);
                card.append(pName, pCourseStart, pCourseStage, pFavLanguage, pCurrentLearn);
            })
        }
    );