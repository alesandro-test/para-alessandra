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
    
/* -----------------------------
   PANTALLA DEL MINIJUEGO
----------------------------- */

const memoriesButton =
    document.getElementById("memoriesButton");

const quizScreen =
    document.getElementById("quizScreen");

const quizIntro =
    document.getElementById("quizIntro");

const startQuizButton =
    document.getElementById("startQuizButton");

const questionPage =
    document.getElementById("questionPage");


/* ABRIR PANTALLA DEL QUIZ */

if (memoriesButton && quizScreen) {

    memoriesButton.addEventListener("click", () => {

        /* desvanece la carta */
        giftContent.classList.add("leaving");

        setTimeout(() => {

            giftContent.classList.add("hidden");

            window.scrollTo(0, 0);

            quizScreen.classList.remove("hidden");
            quizScreen.classList.add("entering");

        }, 800);

    });

}


/* COMENZAR EL QUIZ */

if (startQuizButton && quizIntro && questionPage) {

    startQuizButton.addEventListener("click", () => {

        quizIntro.classList.add("leaving");

        setTimeout(() => {

            quizIntro.classList.add("hidden");

            questionPage.classList.remove("hidden");
            questionPage.classList.add("entering");
            renderQuestion();

        }, 650);

    });

}

/* -----------------------------
   LÓGICA DEL QUIZ
----------------------------- */

const questionNumber =
    document.getElementById("questionNumber");

const questionImage =
    document.getElementById("questionImage");

const questionText =
    document.getElementById("questionText");

const quizOptions =
    document.getElementById("quizOptions");

const quizFeedback =
    document.getElementById("quizFeedback");

const nextQuestionButton =
    document.getElementById("nextQuestionButton");


const questions = [

    {
        title: "Recuerdo 01",

        question:
            "¿Cuándo hicimos nuestro carnet para la licencia de lobos domesticados? 🐺",

        options: [
            "30 · 03 · 2026",
            "30 · 04 · 2026",
            "30 · 05 · 2026"
        ],

        correct: 1,

        hint:
            "Pista: fue a finales de abril 👀",

        success:
            "30 de abril de 2026 🐺❤️"
    },

    {
        title: "Recuerdo 02",

        question:
            "¿En qué mes hice este dibujo para ti? 🎨",

        options: [
            "Enero de 2026",
            "Febrero de 2026",
            "Marzo de 2026"
        ],

        correct: 1,

        hint:
            "Pista: fue casi terminando el segundo mes del año ❤️",

        success:
            "27 de febrero de 2026 ❤️"
    },

    {
        title: "Recuerdo 03",

        question:
            "¿Cuándo nos tomamos aquella foto juntos en GTA? 🎮",

        options: [
            "04 · 10 · 2025",
            "14 · 10 · 2025",
            "04 · 11 · 2025"
        ],

        correct: 0,

        hint:
            "Pista: fue un día 4 👀",

        success:
            "4 de octubre de 2025 🎮❤️"
    }

];


let currentQuestion = 0;
let attempts = 0;


/* MOSTRAR PREGUNTA */

function renderQuestion() {

    attempts = 0;

    const question =
        questions[currentQuestion];

    questionNumber.textContent =
        question.title;

    questionImage.src =
        question.image;

    questionImage.alt =
        question.title;

    questionText.textContent =
        question.question;

    quizFeedback.textContent = "";

    nextQuestionButton.classList.add("hidden");

    quizOptions.innerHTML = "";


    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "quiz-option";

        button.textContent =
            option;

        button.addEventListener(
            "click",
            () => checkAnswer(button, index)
        );

        quizOptions.appendChild(button);

    });

}


/* COMPROBAR RESPUESTA */

function checkAnswer(button, selectedIndex) {

    const question =
        questions[currentQuestion];

    attempts++;


    if (selectedIndex === question.correct) {

        button.classList.add("correct");

        quizFeedback.textContent =
            question.success;

        document
            .querySelectorAll(".quiz-option")
            .forEach(option => {
                option.disabled = true;
            });

        nextQuestionButton.classList.remove("hidden");

        return;
    }


    button.classList.add("wrong");


    if (attempts === 1) {

        quizFeedback.textContent =
            "¿Segura? 👀 Inténtalo otra vez.";

    } else {

        quizFeedback.textContent =
            question.hint;

    }


    setTimeout(() => {

        button.classList.remove("wrong");

    }, 700);

}


/* SIGUIENTE PREGUNTA */

nextQuestionButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        renderQuestion();

    } else {

        questionNumber.textContent =
            "Completado";

        questionText.textContent =
            "Todavía quedan muchos recuerdos por recorrer juntos. ❤️";

        quizOptions.innerHTML = "";

        quizFeedback.textContent =
            "Pero antes de terminar, quiero enseñarte algunas cosas que guardo con mucho cariño.";

        nextQuestionButton.classList.add("hidden");

    }

});

/* -----------------------------
    ANIMACIÓN DEL HILO ROJO
----------------------------- */

    const threadEnding =
        document.querySelector(".thread-ending");

    if (threadEnding) {

        const threadObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            threadEnding.classList.add("active");

                            threadObserver.unobserve(threadEnding);
                        }

                    });

                },
                {
                    threshold: 0.45
                }
            );

        threadObserver.observe(threadEnding);

    }
    setInterval(createHeart, 900);

});