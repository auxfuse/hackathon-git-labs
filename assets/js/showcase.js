const generateCard = (participant, template) => {
    // Create a new card element based on the template
    const card = template.content.firstElementChild.cloneNode(true);
    for (const child of card.children) {
        if (child.dataset.id == 'link') {
            child.setAttribute('href', `community/${participant.name}`);
        } else {
            child.children[0].innerText = participant[child.dataset.id];
        }
    }
    return card;
}
(()=>{
    let showcaseCount = 5;
})();