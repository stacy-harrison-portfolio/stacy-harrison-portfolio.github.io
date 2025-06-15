  const hamburger = document.getElementById('hamburger');
  const closeBtn = document.getElementById('close');
  const header = document.querySelector('header');

  // Hide the close button by default
  closeBtn.style.display = 'none';

  hamburger.addEventListener('click', () => {
    header.classList.add('header-active');
    hamburger.style.display = 'none';
    closeBtn.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    header.classList.remove('header-active');
    hamburger.style.display = 'block';
    closeBtn.style.display = 'none';
  });




  //Portfolio alert

const trigger = document.getElementById("Code-Portfolio"); 

trigger.addEventListener("click", () => {
  alert("You are here!");
});

//Blogr-Popup

window.addEventListener("DOMContentLoaded", () => {
  const blogrTrigger = document.getElementById("Blogr");
  const closeBtn = document.querySelector("#Blogr-Popup .close-butt");

  blogrTrigger.addEventListener("click", () => {
    const popup = document.getElementById("Blogr-Popup");
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    const popup = document.getElementById("Blogr-Popup");
    popup.style.display = "none";
  });
});

  const blogrBtn = document.getElementById('blogr-button');

  blogrBtn.addEventListener('click', () => {
    window.open('blogr-landing-page-main/solution/index.html', '_blank');
  });

//Japan-Popup

window.addEventListener("DOMContentLoaded", () => {
  const blogrTrigger = document.getElementById("Japan");
  const closeBtn = document.querySelector("#Japan-Popup .close-butt");

  blogrTrigger.addEventListener("click", () => {
    const popup = document.getElementById("Japan-Popup");
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    const popup = document.getElementById("Japan-Popup");
    popup.style.display = "none";
  });
});

  const japanBtn = document.getElementById('japan-button');

  japanBtn.addEventListener('click', () => {
    window.open('History_of_Japan/index.html', '_blank');
  });


//Recipe-Popup

window.addEventListener("DOMContentLoaded", () => {
  const blogrTrigger = document.getElementById("Recipe");
  const closeBtn = document.querySelector("#Recipe-Popup .close-butt");

  blogrTrigger.addEventListener("click", () => {
    const popup = document.getElementById("Recipe-Popup");
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    const popup = document.getElementById("Recipe-Popup");
    popup.style.display = "none";
  });
});

  const recipeBtn = document.getElementById('recipe-button');

  recipeBtn.addEventListener('click', () => {
    window.open('recipe-page-main/solution/index.html', '_blank');
  });