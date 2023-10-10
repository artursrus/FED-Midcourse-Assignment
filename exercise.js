const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showItem(index) {
    carousel.style.transition = 'transform 1s ease-in-out';
    // Calculate the translateX value to center the next workout
    const translateXValue = -(index * 100) - (100 / carouselItems.length / 2);
    carousel.style.transform = `translateX(${translateXValue}%)`;
}

function nextItem() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showItem(currentIndex);
}

function previousItem() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showItem(currentIndex);
}

// Automatic rotation (change slide every 5 seconds)
setInterval(nextItem, 5000);

// Initial call to start the carousel rotation immediately
showItem(currentIndex);


