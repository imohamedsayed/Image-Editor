

// filters..

let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let greyscale = document.getElementById("greyscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

// buutons and images

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let reset = document.querySelector("span");
let img = document.getElementById("img");

let imgBox = document.querySelector(".imgBox");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function resetValue() {
  img.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  greyscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

onload = (_) => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};
upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    context.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            sepia(${sepia.value}%)
            grayscale(${greyscale.value})
            brightness(${brightness.value}%)
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

// download...

download.onclick = () => {
  download.href = canvas.toDataURL("image/jpeg");
};
