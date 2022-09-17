console.log("Ayo!");

const landing_content = document.querySelector('#content');

window.addEventListener("scroll", () => {
    console.log(scrollY);

    if(scrollY >= 200) {
        landing_content.style.opacity = 0;
    } else {
        landing_content.style.opacity = 1;
    }
});
