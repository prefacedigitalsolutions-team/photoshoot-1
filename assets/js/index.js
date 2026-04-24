
// DOM READY
document.addEventListener("DOMContentLoaded", () => {


  // SCROLL TOP BUTTON

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // BANNER SECTION

  const controls = document.querySelectorAll(".control");
  const strips = document.querySelectorAll(".strip");
  const mask = document.querySelector(".left-line .underline-mask");
  const leftLine = document.querySelector(".left-line");

  let current = document.getElementById("bg1");
  let next = document.getElementById("bg2");

  controls.forEach(c => {
    const img = new Image();
    img.src = c.dataset.img;
  });

  controls.forEach((control, index) => {
    control.addEventListener("mouseenter", () => {

      controls.forEach(c => c.classList.remove("active"));
      control.classList.add("active");

      strips.forEach(s => s.style.bottom = "-100%");
      if (strips[index]) strips[index].style.bottom = "0";

      if (leftLine && mask) {
        const totalWidth = leftLine.offsetWidth;
        const stripWidth = totalWidth / strips.length;
        mask.style.width = (stripWidth * (index + 1)) + "px";
      }

      const img = control.dataset.img;
      if (current && next && img && !current.style.backgroundImage.includes(img)) {
        next.style.backgroundImage = `url('${img}')`;
        next.classList.add("active");
        current.classList.remove("active");
        [current, next] = [next, current];
      }
    });
  });

  const controlsWrap = document.querySelector(".controls");
  if (controlsWrap) {
    controlsWrap.addEventListener("mouseleave", () => {
      if (mask) mask.style.width = "0px";
      strips.forEach(s => s.style.bottom = "-100%");
      controls.forEach(c => c.classList.remove("active"));
    });
  }


  // TYPING EFFECT

  const typingEl = document.getElementById("typing-text");

  if (typingEl) {
    const text = typingEl.textContent;
    let i = 0;
    typingEl.textContent = "";

    function typeEffect() {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 60);
      }
    }

    window.addEventListener("load", typeEffect);
  }


  // GSAP ANIMATIONS
 
  if (typeof gsap !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);

    // ROW ANIMATION
    document.querySelectorAll('.row').forEach((row) => {
      const images = row.querySelectorAll('.gsap-img');
      if (!images.length) return;

      gsap.to(images, {
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2
      });
    });

    // SECTION ANIMATION
    gsap.utils.toArray(".gsap-section").forEach(section => {

      const heading = section.querySelectorAll(".gsap-heading");
      const left = section.querySelectorAll(".gsap-left");
      const image = section.querySelectorAll(".gsap-image");
      const right = section.querySelectorAll(".gsap-right");

      if (heading.length) {
        gsap.from(heading, {
          scrollTrigger: { trigger: section, start: "top 80%" },
          y: 50, opacity: 0
        });
      }

      if (left.length) {
        gsap.from(left, {
          scrollTrigger: { trigger: section, start: "top 75%" },
          x: -80, opacity: 0
        });
      }

      if (image.length) {
        gsap.from(image, {
          scrollTrigger: { trigger: section, start: "top 75%" },
          scale: 0.85, opacity: 0
        });
      }

      if (right.length) {
        gsap.from(right, {
          scrollTrigger: { trigger: section, start: "top 75%" },
          x: 80, opacity: 0
        });
      }

    });

    // INTRO TEXT (tumhara wala)
    const intro = document.querySelector(".intro-text");
    if (intro) {
      gsap.to(intro, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: intro,
          start: "top 90%",
          once: true
        }
      });
    }

  }

});


// WINDOW LOAD (LOADER)

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) loader.classList.add("hidden");
});




