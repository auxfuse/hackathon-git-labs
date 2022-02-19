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
        }
    );
