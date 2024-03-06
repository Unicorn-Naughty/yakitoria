import { sliderArr } from "../data/blogpagedata/sliderdata.js";
import { cart } from "../data/cart.js";
import { updateCarQuanity } from "../data/cart.js";
let sliderHTML = "";
sliderArr.forEach((sliderItem) => {
  sliderHTML += `
                <div class="blog__item-slider  ">
                <a class="blog__item-imglink" href="#">
                  <img
                    class="blog__item-img"
                    src="${sliderItem.image}"
                    alt="slider-img-item"
                  />
                </a>
                <div class="blog__item-box">
                  <a
                    class="blog__item-linktitle"
                    href="#
                "
                    ><h4 class="blog__item-title">
                      ${sliderItem.title}
                    </h4></a
                  >
                  <p class="blog__item-text">
                    ${sliderItem.text}
                  </p>
                  <a class="blog__item-link" href="#">Читать дальше</a>
                </div>
              </div>
  `;
  document.querySelector(".blog__items-slider").innerHTML = sliderHTML;
});
const slides = document.querySelectorAll(".blog__item-slider");
let currentIndex = 0;
function showSlide(index) {
  slides[currentIndex].classList.remove("blog__item-slider--active");
  slides[index].classList.add("blog__item-slider--active");
  currentIndex = index;
}
document.querySelector(".slider__contrlos").addEventListener("click", (e) => {
  const checkClick = e.target;
  if (checkClick.classList.contains("prev")) {
    let index = currentIndex - 1;
    if (index < 0) {
      index = slides.length - 1;
    }
    showSlide(index);
  } else if (checkClick.classList.contains("next")) {
    let index = currentIndex + 1;
    if (index >= slides.length) {
      index = 0;
    }
    showSlide(index);
  }
});
showSlide(currentIndex);

const tabsBtn = document.querySelectorAll(".blog__tabs-title");
tabsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const preventBtn = document.querySelector(".blog__tabs-title--active");
    const preventSlide = document.querySelector(".tabs__item--show");
    if (preventBtn) {
      preventBtn.classList.remove("blog__tabs-title--active");
    }
    if (preventSlide) {
      preventSlide.classList.remove("tabs__item--show");
    }
    const nextSlideId = `#${btn.getAttribute("data-target-id")}`;
    const nextSlide = document.querySelector(nextSlideId);
    btn.classList.add("blog__tabs-title--active");
    nextSlide.classList.add("tabs__item--show");
  });
});
updateCarQuanity();
let arr = document.querySelector(".arrow");
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  let x = document.querySelector(".header__wrapper-bot");

  if (scrollPosition > 120) {
    x.classList.add("header__wrapper-bot--scroll");
  } else {
    x.classList.remove("header__wrapper-bot--scroll");
  }
  if (scrollPosition >= 750) {
    arr.style.opacity = 1;
  } else {
    arr.style.opacity = 0;
  }
});
arr.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
