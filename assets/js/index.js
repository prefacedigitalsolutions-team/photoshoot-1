
// Language changes section Start

document.addEventListener("DOMContentLoaded", () => {

  const switcher = document.getElementById("language-switcher");
  const options = document.getElementById("language-options");
  const currentLang = document.getElementById("current-language");

  // English name → Google language code map
  const langCodeMap = {
    English: "en",
    Hindi: "hi",
    Gujarati: "gu",
    Marathi: "mr",
    Punjabi: "pa",
    Kannada: "kn",
    Bengali: "bn",
    Telugu: "te",
    French: "fr",
    German: "de",
    Spanish: "es",
    Portuguese: "pt",
    Russian: "ru",
    Japanese: "ja",
    Arabic: "ar",
    Nepali: "ne"
  };


  // Auto rotate language text

  const autoLangs = Object.keys(langCodeMap);
  let index = 0;
  let autoChange = null;

  if (currentLang && autoLangs.length) {
    autoChange = setInterval(() => {
      index = (index + 1) % autoLangs.length;
      currentLang.textContent = autoLangs[index];
    }, 2000);
  }


  // Open / close dropdown

  if (switcher && options) {
    switcher.addEventListener("click", (e) => {
      options.classList.toggle("hidden");
      e.stopPropagation();
    });
  }

  // Click on language → translate site

  if (options && currentLang) {
    options.querySelectorAll(".lang").forEach(item => {
      item.addEventListener("click", (e) => {
        const langName = e.currentTarget.getAttribute("data-en");
        const langCode = langCodeMap[langName];

        currentLang.textContent = langName;
        options.classList.add("hidden");
        if (autoChange) clearInterval(autoChange);

        // Trigger Google Translate
        const gtCombo = document.querySelector(".goog-te-combo");
        if (gtCombo && langCode) {
          gtCombo.value = langCode;
          gtCombo.dispatchEvent(new Event("change"));
        }

        e.stopPropagation();
      });
    });
  }


  // Click outside → close dropdown

  document.addEventListener("click", () => {
    if (options) options.classList.add("hidden");
  });


  // Animation on page load
  
  window.addEventListener("load", () => {
    if (switcher) switcher.classList.add("show");
  });

});

// Language changes section End





// Arro section start page up

document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// Arro section End page up




window.addEventListener("load", () => {
    const loader = document.getElementById("pageLoader");
    loader.classList.add("hidden");
});


// Gsap section start
gsap.utils.toArray(".gsap-section").forEach(section => {

  section.querySelectorAll(".gsap-heading").forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 1
    });
  });

  section.querySelectorAll(".gsap-left").forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: section,
        start: "top 75%"
      },
      x: -80,
      opacity: 0,
      duration: 1
    });
  });

  section.querySelectorAll(".gsap-image").forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: section,
        start: "top 75%"
      },
      scale: 0.85,
      opacity: 0,
      duration: 1
    });
  });

  section.querySelectorAll(".gsap-right").forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: section,
        start: "top 75%"
      },
      x: 80,
      opacity: 0,
      duration: 1
    });
  });

});

// gsap section End







// new banner section start

const controls = document.querySelectorAll(".control");
const strips = document.querySelectorAll(".strip");

/*  NEW SELECTORS */
const mask = document.querySelector(".left-line .underline-mask");
const leftLine = document.querySelector(".left-line");

let current = document.getElementById("bg1");
let next = document.getElementById("bg2");

/* PRELOAD IMAGES */
controls.forEach(c => {
  const img = new Image();
  img.src = c.dataset.img;
});

/* HOVER LOGIC */
controls.forEach((control, index) => {

  control.addEventListener("mouseenter", () => {

    /* ACTIVE STATE */
    controls.forEach(c => c.classList.remove("active"));
    control.classList.add("active");

    /* STRIP ANIMATION */
    strips.forEach(s => s.style.bottom = "-100%");
    strips[index].style.bottom = "0";

    /*  PERFECT UNDERLINE MASK (CENTER BREAK FIXED) */
    const totalWidth = leftLine.offsetWidth;
    const stripWidth = totalWidth / strips.length;

    // sirf left side ka portion fill hoga (center tak)
    const fillWidth = stripWidth * (index + 1);

    mask.style.width = fillWidth + "px";

    /* BACKGROUND IMAGE */
    const img = control.dataset.img;
    if (!current.style.backgroundImage.includes(img)) {
      next.style.backgroundImage = `url('${img}')`;
      next.classList.add("active");
      current.classList.remove("active");
      [current, next] = [next, current];
    }
  });
});



/* main heading animation */

document.querySelector(".controls").addEventListener("mouseleave", () => {
  mask.style.width = "0px";
  strips.forEach(s => s.style.bottom = "-100%");
  controls.forEach(c => c.classList.remove("active"));
});

// banner section end
const typingEl = document.getElementById("typing-text");
const text = typingEl.textContent;  

let i = 0;
typingEl.textContent = "";         

function typeEffect(){
  if(i < text.length){
    typingEl.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 60);
  }
}

window.addEventListener("load", typeEffect);


// banar section End








// Plugin ko register karein
gsap.registerPlugin(ScrollTrigger);

// Har ek row ke liye alag se animation trigger karenge taaki scroll smooth lage
const rows = document.querySelectorAll('.row');

rows.forEach((row) => {
    // Row ke andar ki images ko select karein
    const images = row.querySelectorAll('.gsap-img');

    gsap.to(images, {
        scrollTrigger: {
            trigger: row,        // Jab ye wali row screen par aaye
            start: "top 85%",    // Jab row ka top 85% window height par ho
            toggleActions: "play none none none", // Sirf ek baar play ho
        },
        opacity: 1,              // 0 se 1 ho jayega
        y: 0,                    // 50px niche se apni original jagah aayega
        duration: 1.2,           // Animation ki speed
        stagger: 0.2,            // Har image ke beech 0.2s ka gap (Premium look)
        ease: "power4.out"       // Smooth ending animation
    });
});