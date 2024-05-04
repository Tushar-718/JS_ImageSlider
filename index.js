const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const slideContainer = document.getElementById("slideshow-container");
const slides = document.getElementById("slides");
const slidingDotContainer = document.getElementById("dot-container");
const numberOfImage = document.getElementById("number-of-image");

let amountOfImagesInFrame = 1;
let imageIndex = 0;

const imgData = [
  "./images/img1.jpeg",
  "./images/img2.jpeg",
  "./images/img3.jpeg",
  "./images/img4.jpeg",
  "./images/img5.jpeg",
  "./images/img6.jpeg",
];

const createImages = () => {
  for (let i = 0; i < imgData.length; i++) {
    const image = document.createElement("img");
    image.src = imgData[i];
    image.classList.add("image");
    slides.appendChild(image);
  }
};
createImages();

let imageSliderDots = [];

const createSliderDots = () => {
  const numberOfDots = Math.ceil(imgData.length / amountOfImagesInFrame);

  for (let i = 0; i < numberOfDots; i++) {
    const imageSliderDot = document.createElement("div");
    imageSliderDot.classList.add("dot");
    slidingDotContainer.appendChild(imageSliderDot);
    imageSliderDots.push(imageSliderDot);
  }
};
createSliderDots();

const slideImages = document.querySelectorAll(".image");

slideImages.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

numberOfImage.addEventListener("change", (e) => {
  e.preventDefault();
  amountOfImagesInFrame = numberOfImage.selectedIndex + 1;
  slidingDotContainer.innerHTML = "";
  imageSliderDots = [];
  imageIndex = 0;
  count = 0;
  numberOfDots = 0;
  createSliderDots();
  imageSlide();
  showArrowButton();
});

const showArrowButton = () => {
  imageIndex === 0
    ? prevBtn.classList.add("hide")
    : prevBtn.classList.remove("hide");
  imageIndex === imageSliderDots.length - 1
    ? nextBtn.classList.add("hide")
    : nextBtn.classList.remove("hide");
};
showArrowButton();

const sliderDotHandler = () => {
  imageSliderDots.forEach((dot, index) => {
    imageIndex === index
      ? dot.classList.add("active")
      : dot.classList.remove("active");
  });
};
sliderDotHandler();

imageSliderDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    imageIndex = i;
    imageSlide();
  });
});

let count = 0;
const imageSlide = () => {
  const totalCycles = Math.ceil(imgData.length / amountOfImagesInFrame);
  const frameWidthPercentage = 100 / amountOfImagesInFrame;
  slideImages.forEach((slide, i) => {
    slide.style.width = `${frameWidthPercentage}%`;
    slide.style.left = `${i * frameWidthPercentage}%`;
    if (amountOfImagesInFrame == 3 && count < totalCycles) {
      slide.style.transform = `translateX(-${imageIndex * 300}%)`;
    } else if (amountOfImagesInFrame == 2 && count < totalCycles) {
      slide.style.transform = `translateX(-${imageIndex * 200}%)`;
    } else if (amountOfImagesInFrame == 1 && count < totalCycles) {
      slide.style.transform = `translateX(-${imageIndex * 100}%)`;
    } else {
      return;
    }
  });
  if (count >= totalCycles) {
    count = 0;
  } else {
    count++;
  }

  sliderDotHandler();
  showArrowButton();
};

nextBtn.addEventListener("click", () => {
  if (imageIndex === imageSliderDots.length - 1) return imageIndex;
  imageIndex++;
  imageSlide();
});

prevBtn.addEventListener("click", () => {
  if (imageIndex === 0) return imageIndex;
  imageIndex--;
  imageSlide();
});

let autoSlideInterval = null;
const autoPlaySlide = () => {
  autoSlideInterval = setInterval(() => {
    if (imageIndex === imageSliderDots.length - 1) imageIndex = -1;
    imageIndex++;
    imageSlide();
    showArrowButton();
    count = 0;
  }, 3000);
};
autoPlaySlide();

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

slideContainer.addEventListener("mouseleave", () => {
  autoPlaySlide();
});
