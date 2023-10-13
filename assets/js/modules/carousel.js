const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll("#carouselContainer i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const cardh2 = document.querySelectorAll("h2")

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "left") {
            carousel.scrollLeft -= firstCardWidth; // Subtract width for the left button
        } else if (btn.id === "right") {
            carousel.scrollLeft += firstCardWidth; // Add width for the right button
        }
    });
});

let isDragging = false, startX, startScrollLeft;

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

const displayBodyParts = document.querySelector('#carouselContainer');
let currentIndex = 0; // Initialize the current index

let capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

let collectedBodyPart = "";

const bodyParts = async () => {
    // Replaces spaces with characters for API exercise call
    const urlAPI = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
    const keyAPI = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'be5c212be8msh814b96c66fae9d1p1031efjsnc5860e51a01f',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
    };

    const response = await fetch(urlAPI, keyAPI);
    const result = await response.json();

    console.log(result);

    // Variable to store the currently collected body part


    result.forEach((part, index) => {
        console.log(part);
        const cardID = document.getElementById(`card-${index + 1}`);

        if (cardID) {
            cardID.textContent = capitalizeLetter(part);;
        }
        cardID.addEventListener('click', (event) => {
            // Prevents load to a new page without getting exercise name
            event.preventDefault();
            collectedBodyPart = cardh2.textContent.toLowerCase();
            console.log(collectedBodyPart)
            window.location.href = `exerciseList.html?exercises/bodyPart/${collectedBodyPart}?limit=5`;
        })
    });
};

bodyParts();
