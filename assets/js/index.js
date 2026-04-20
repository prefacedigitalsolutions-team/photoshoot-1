
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




// gsap section start All page

window.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

     // row
  document.querySelectorAll('.row').forEach((row) => {

    const images = row.querySelectorAll('.gsap-img');
    if (!images.length) return;

    gsap.to(images, {
      scrollTrigger: {
        trigger: row,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

  });



    //  SECTION WISE ANIMATION

  gsap.utils.toArray(".gsap-section").forEach(section => {

    const heading = section.querySelectorAll(".gsap-heading");
    const left    = section.querySelectorAll(".gsap-left");
    const image   = section.querySelectorAll(".gsap-image");
    const right   = section.querySelectorAll(".gsap-right");

    if (heading.length) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 1
      });
    }

    if (left.length) {
      gsap.from(left, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%"
        },
        x: -80,
        opacity: 0,
        duration: 1
      });
    }

    if (image.length) {
      gsap.from(image, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%"
        },
        scale: 0.85,
        opacity: 0,
        duration: 1
      });
    }

    if (right.length) {
      gsap.from(right, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%"
        },
        x: 80,
        opacity: 0,
        duration: 1
      });
    }

  });

});


// gsap section End

