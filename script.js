document.addEventListener("DOMContentLoaded", () => {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const openGiftButton =
        document.getElementById("openGiftButton");

    const giftContent =
        document.getElementById("giftContent");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const musicPlayer =
        document.getElementById("musicPlayer");

    const musicTitle =
        document.getElementById("musicTitle");

    const musicArtist =
        document.getElementById("musicArtist");

    const playPauseButton =
        document.getElementById("playPauseButton");

    const prevSongButton =
        document.getElementById("prevSongButton");

    const nextSongButton =
        document.getElementById("nextSongButton");

    const playlist = [
        {
            title: "Mi Bello Ángel",
            artist: "Natanael Cano",
            file: "assets/music/mi-bello-angel.mp3"
        },
        {
            title: "Until I Found You",
            artist: "Stephen Sanchez",
            file: "assets/music/until-i-found-you.mp3"
        },
        {
            title: "Bajo el Agua",
            artist: "Manuel Medrano",
            file: "assets/music/bajo-el-agua.mp3"
        }
    ];

        function loadTrack(index) {

        const track = playlist[index];

        backgroundMusic.src = track.file;

        musicTitle.textContent = track.title;
        musicArtist.textContent = track.artist;

        backgroundMusic.load();
    }


    function updatePlayButton() {

        if (backgroundMusic.paused) {
            playPauseButton.textContent = "▶";
        } else {
            playPauseButton.textContent = "❚❚";
        }

    }


    function playCurrentTrack() {

        const playPromise =
            backgroundMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    updatePlayButton();

                })
                .catch(error => {

                    console.error(
                        "No se pudo reproducir:",
                        error
                    );

                    playPauseButton.textContent = "▶";

                });

        }

    }


    function nextTrack() {

        currentTrack++;

        if (currentTrack >= playlist.length) {
            currentTrack = 0;
        }

        loadTrack(currentTrack);
        playCurrentTrack();
    }


    function previousTrack() {

        currentTrack--;

        if (currentTrack < 0) {
            currentTrack = playlist.length - 1;
        }

        loadTrack(currentTrack);
        playCurrentTrack();
    }


    let currentTrack = 0;

    backgroundMusic.volume = 0.35;

    const yesButton =
    document.getElementById("yesButton");

    const letterContent =
        document.getElementById("letterContent");

    const finalAnswer =
        document.getElementById("finalAnswer");


    /* -----------------------------
       ABRIR REGALO
    ----------------------------- */

    openGiftButton.addEventListener("click", () => {

        welcomeScreen.classList.add("opening");

        musicPlayer.classList.remove("hidden");

        loadTrack(currentTrack);
        playCurrentTrack();

        setTimeout(() => {

            welcomeScreen.classList.add("hidden");

            giftContent.classList.remove("hidden");

        }, 900);

    });


    /* -----------------------------
    CONTROL DE MÚSICA
    ----------------------------- */

    playPauseButton.addEventListener("click", () => {

        if (backgroundMusic.paused) {

            playCurrentTrack();

        } else {

            backgroundMusic.pause();
            updatePlayButton();

        }

    });


    nextSongButton.addEventListener(
        "click",
        nextTrack
    );


    prevSongButton.addEventListener(
        "click",
        previousTrack
    );


    backgroundMusic.addEventListener(
        "error",
        () => {

            console.error(
                "Error cargando:",
                backgroundMusic.src,
                backgroundMusic.error
            );

        }
    );
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


        // Posición horizontal
        heart.style.left =
            Math.random() * 100 + "vw";


        // Tamaño
        heart.style.fontSize =
            10 + Math.random() * 18 + "px";


        // Velocidad
        heart.style.animationDuration =
            10 + Math.random() * 8 + "s";


        // Pequeña variación de tonos
        const colors = [
            "rgba(165, 42, 68, 0.24)",
            "rgba(183, 41, 69, 0.20)",
            "rgba(111, 23, 43, 0.25)",
            "rgba(210, 72, 101, 0.16)"
        ];

        heart.style.color =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        container.appendChild(heart);


        setTimeout(() => {
            heart.remove();
        }, 16000);
    }
    
/* -----------------------------
   PANTALLA DEL MINIJUEGO
----------------------------- */

const memoriesButton =
    document.getElementById("memoriesButton");

const quizScreen =
    document.getElementById("quizScreen");

const galleryScreen =
    document.getElementById("galleryScreen");

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

        image:
            "assets/images/quiz/lobos.jpg",

        question:
            "¿Cuándo hicimos nuestro carnet para la licencia de lobos domesticados? 🐺",

        correctAnswer:
            "30 de abril de 2026",

        wrongOptions: [
            "18 de agosto de 2024",
            "12 de noviembre de 2025",
            "8 de enero de 2026",
            "21 de junio de 2026",
            "17 de septiembre de 2025",
            "9 de marzo de 2026",
            "24 de diciembre de 2025"
        ],

        // Posición 2
        correctPosition: 1,

        hint:
            "Pista: para ese momento ya teníamos varias locuras juntos 🐺👀",

        success:
            "30 de abril de 2026 🐺❤️"
    },

    {
        title: "Recuerdo 02",

        image:
            "assets/images/quiz/dibujo.jpg",

        question:
            "¿En qué mes hice este dibujo para ti? 🎨",

        correctAnswer:
            "Febrero de 2026",

        wrongOptions: [
            "Agosto de 2024",
            "Octubre de 2025",
            "Diciembre de 2025",
            "Enero de 2026",
            "Abril de 2026",
            "Julio de 2025",
            "Marzo de 2026"
        ],

        // Posición 4
        correctPosition: 3,

        hint:
            "Pista: fue en uno de los meses más cortitos del año 🎨❤️",

        success:
            "27 de febrero de 2026 ❤️"
    },

    {
        title: "Recuerdo 03",

        image:
            "assets/images/quiz/gta.jpg",

        question:
            "¿Cuándo nos tomamos aquella foto juntos en GTA? 🎮",

        correctAnswer:
            "4 de octubre de 2025",

        wrongOptions: [
            "16 de julio de 2024",
            "22 de septiembre de 2025",
            "11 de diciembre de 2025",
            "7 de enero de 2026",
            "19 de noviembre de 2025",
            "14 de marzo de 2026",
            "28 de agosto de 2025"
        ],

        // Posición 5
        correctPosition: 4,

        hint:
            "Pista: fue durante nuestros primeros meses juntos 👀",

        success:
            "4 de octubre de 2025 🎮❤️"
    }
];


let currentQuestion = 0;
let attempts = 0;


/* -----------------------------
   MEZCLAR OPCIONES
----------------------------- */

function shuffleArray(array) {

    const copy = [...array];

    for (
        let i = copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [copy[i], copy[j]] =
            [copy[j], copy[i]];
    }

    return copy;
}


/* -----------------------------
   MOSTRAR PREGUNTA
----------------------------- */

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

    nextQuestionButton.classList.add(
        "hidden"
    );

    quizOptions.innerHTML = "";


    /*
       La respuesta de 2024
       aparece siempre.
    */

    const option2024 =
        question.wrongOptions.find(
            option =>
                option.includes("2024")
        );


    /*
       El resto de respuestas
       incorrectas se eligen al azar.
    */

    const otherWrongOptions =
        question.wrongOptions.filter(
            option =>
                !option.includes("2024")
        );


    const randomWrongOptions =
        shuffleArray(
            otherWrongOptions
        ).slice(0, 3);


    /*
       Tenemos cuatro incorrectas:
       1 de 2024 + 3 aleatorias.
    */

    let options = [
        option2024,
        ...randomWrongOptions
    ];


    /*
       Mezclamos primero las incorrectas.
    */

    options =
        shuffleArray(options);


    /*
       Después colocamos la correcta
       en la posición fija correspondiente.
    */

    options.splice(
        question.correctPosition,
        0,
        question.correctAnswer
    );


    /*
       Crear los cinco botones.
    */

    options.forEach(option => {

        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.className =
            "quiz-option";

        button.textContent =
            option;


        button.addEventListener(
            "click",
            () => {

                checkAnswer(
                    button,
                    option
                );

            }
        );


        quizOptions.appendChild(
            button
        );
    });
}


/* -----------------------------
   COMPROBAR RESPUESTA
----------------------------- */

function checkAnswer(
    button,
    selectedAnswer
) {

    const question =
        questions[currentQuestion];


    /*
       RESPUESTA CORRECTA
    */

    if (
        selectedAnswer ===
        question.correctAnswer
    ) {

        button.classList.add(
            "correct"
        );

        quizFeedback.textContent =
            question.success;


        document
            .querySelectorAll(
                ".quiz-option"
            )
            .forEach(option => {

                option.disabled = true;

            });


        nextQuestionButton
            .classList.remove(
                "hidden"
            );

        return;
    }


    /*
       RESPUESTA ESPECIAL DE 2024
    */

    if (
        selectedAnswer.includes(
            "2024"
        )
    ) {

        button.classList.add(
            "wrong"
        );

        quizFeedback.textContent =
            "Amor... en 2024 todavía ni nos conocíamos 😭❤️";


        setTimeout(() => {

            button.classList.remove(
                "wrong"
            );

        }, 900);

        return;
    }


    /*
       OTRA RESPUESTA INCORRECTA
    */

    attempts++;

    button.classList.add(
        "wrong"
    );


    if (attempts === 1) {

        quizFeedback.textContent =
            "Mmm... piénsalo otra vez 👀❤️";

    } else {

        quizFeedback.textContent =
            question.hint;
    }


    setTimeout(() => {

        button.classList.remove(
            "wrong"
        );

    }, 700);
}


/* -----------------------------
   SIGUIENTE PREGUNTA
----------------------------- */

nextQuestionButton.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            renderQuestion();

        } else {

            questionPage.classList.add(
                "leaving"
            );


            setTimeout(() => {

                quizScreen.classList.add(
                    "hidden"
                );

                galleryScreen.classList.remove(
                    "hidden"
                );

                galleryScreen.classList.add(
                    "entering"
                );

                window.scrollTo(
                    0,
                    0
                );

            }, 700);
        }
    }
);

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
    setInterval(createHeart, 350);
    
/* -----------------------------
   FINAL DE LA CARTA
----------------------------- */

function calculateRelationshipTime() {

    const startDate =
        new Date(2025, 8, 20);

    const today =
        new Date();

    let years =
        today.getFullYear() -
        startDate.getFullYear();

    let months =
        today.getMonth() -
        startDate.getMonth();

    let days =
        today.getDate() -
        startDate.getDate();


    if (days < 0) {

        const daysInPreviousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();

        days += daysInPreviousMonth;

        months--;
    }


    if (months < 0) {

        months += 12;

        years--;
    }


    document.getElementById("yearsCount")
        .textContent = years;

    document.getElementById("monthsCount")
        .textContent = months;

    document.getElementById("daysCount")
        .textContent = days;


    document.getElementById("yearsLabel")
        .textContent =
            years === 1
                ? "año"
                : "años";

    document.getElementById("monthsLabel")
        .textContent =
            months === 1
                ? "mes"
                : "meses";

    document.getElementById("daysLabel")
        .textContent =
            days === 1
                ? "día"
                : "días";
}


/* EXPLOSIÓN DE CORAZONES */

function createFinalHearts(button) {

    const rect =
        button.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;


    for (let i = 0; i < 24; i++) {

        const heart =
            document.createElement("span");

        heart.className =
            "final-heart-burst";

        heart.textContent = "♥";


        const moveX =
            (Math.random() - 0.5) * 420;

        const moveY =
            -(120 + Math.random() * 300);

        const rotation =
            (Math.random() - 0.5) * 120;

        const size =
            12 + Math.random() * 20;


        heart.style.setProperty(
            "--start-x",
            `${centerX}px`
        );

        heart.style.setProperty(
            "--start-y",
            `${centerY}px`
        );

        heart.style.setProperty(
            "--move-x",
            `${moveX}px`
        );

        heart.style.setProperty(
            "--move-y",
            `${moveY}px`
        );

        heart.style.setProperty(
            "--rotation",
            `${rotation}deg`
        );

        heart.style.setProperty(
            "--heart-size",
            `${size}px`
        );


        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 1900);
    }
}


/* BOTÓN "SÍ, QUIERO" */

if (
    yesButton &&
    letterContent &&
    finalAnswer
) {

    yesButton.addEventListener("click", () => {

        createFinalHearts(yesButton);

        yesButton.textContent = "♥";

        letterContent.classList.add(
            "accepted"
        );


        setTimeout(() => {

            letterContent.classList.add(
                "hidden"
            );

            calculateRelationshipTime();

            finalAnswer.classList.remove(
                "hidden"
            );


            requestAnimationFrame(() => {

                finalAnswer.classList.add(
                    "show"
                );

            });

        }, 750);

    });
}

});