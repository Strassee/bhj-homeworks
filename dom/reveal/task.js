const div = Array.from(document.querySelectorAll(".reveal"));

div.forEach((el) => {
        document.addEventListener("scroll", () => {
            if (isVisible(el)) {
                el.classList.add("reveal_active");
            }
        });

    });

function isVisible(el) {
    const {top} = el.getBoundingClientRect();
    console.log(top, window.innerHeight);
    if (top < window.innerHeight) {
        return true;
    }
    return false;
}