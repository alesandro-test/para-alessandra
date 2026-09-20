document.addEventListener("DOMContentLoaded", () => {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const openGiftButton =
        document.getElementById("openGiftButton");

    const giftContent =
        document.getElementById("giftContent");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");


    /* -----------------------------
       ABRIR REGALO
    ----------------------------- */

    openGiftButton.addEventListener("click", () => {

        welcomeScreen.classList.add("opening");

        if (backgroundMusic.querySelector("source")) {

            backgroundMusic.play().catch(() => {
                console.log("La música todavía no está disponible.");
            });

        }

        setTimeout(() => {

            welcomeScreen.classList.add("hidden");

            giftContent.classList.remove("hidden");

            musicButton.classList.remove("hidden");

        }, 900);

    });


    /* -----------------------------
       CONTROL DE MÚSICA
    ----------------------------- */

    musicButton.addEventListener("click", () => {

        if (backgroundMusic.paused) {

            backgroundMusic.play();
            musicButton.textContent = "♪";

        } else {

            backgroundMusic.pause();
            musicButton.textContent = "×";

        }

    });


    /* -----------------------------
       BOTÓN CONTINUAR
    ----------------------------- */

    const continueButton =
        document.getElementById("continueButton");

    const redThreadSection =
        document.getElementById("redThreadSection");

    if (continueButton && redThreadSection) {

        continueButton.addEventListener("click", () => {

            redThreadSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* -----------------------------
       CORAZONES
    ----------------------------- */

    function createHeart() {

        const container =
            document.getElementById("heartsContainer");

        if (!container) return;

        const heart =
            document.createElement("div");

        heart.classList.add("floating-heart");
        heart.textContent = "♥";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            12 + Math.random() * 20 + "px";

        heart.style.animationDuration =
            7 + Math.random() * 7 + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 15000);

    }

    setInterval(createHeart, 900);

});