community = {};

const communityContainer = document.querySelector('#community');

fetch("community.json")
    .then(
        response => response.json()
    )
    .then(
        data => {
            data.participants.forEach((dev) => {
                let participant = {
                    name: dev.name,
                    course_stage: dev.course_stage,
                    course_start: dev.course_start,
                    favorite_language: dev.favorite_language,
                    currently_learning: dev.currently_learning
                };

                const {
                    name,
                    course_stage,
                    course_start,
                    favorite_language,
                    currently_learning
                } = participant;

                communityContainer.innerHTML = name + " " + course_stage + " " + course_start + " " + favorite_language + " " + currently_learning;
            })
        }
    );

