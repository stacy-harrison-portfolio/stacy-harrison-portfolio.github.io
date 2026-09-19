const hero = document.querySelector("#home");
const navName = document.querySelector("#nav-name");

const heroObserver = new IntersectionObserver(
    (entries) => {
        const heroVisible = entries[0].isIntersecting;

        if (heroVisible) {
            navName.classList.remove("visible");
        } else {
            navName.classList.add("visible");
        }
    },
    {
        threshold: 0
    }
);

heroObserver.observe(hero);