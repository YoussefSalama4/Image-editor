//Filters

let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hue = document.querySelector("#hue");

//btns

let upload = document.querySelector("#upload");
let download = document.querySelector("#download");
let reset = document.querySelector("span");

//image

let img = document.querySelector("#img");
let imgDesc = document.querySelector("#img-desc");
let imgBox = document.querySelector(".img-box");
let canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");
////upload functionlaity

upload.onchange = function () {
  resetValue();
  imgDesc.style.display = "none";
  reset.style.display = "block";
  download.style.display = "block";
  let imgSrc = new FileReader();
  imgSrc.readAsDataURL(upload.files[0]);
  imgSrc.addEventListener("load", function () {
    img.src = imgSrc.result;
  });
  imgSrc.addEventListener("load", function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  });
};

//applying filters
let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hue.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

//reset Function

function resetValue() {
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  blur.value = "0";
}
reset.onclick = resetValue;

//download

download.addEventListener("click", () => {
  download.href = canvas.toDataURL();
});
