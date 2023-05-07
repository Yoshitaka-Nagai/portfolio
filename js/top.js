document.addEventListener('DOMContentLoaded', function () {
  class WorksItem {
    constructor(e) {
      this.txt = e.querySelector('.works__txt-wrap');
      this.img = e.querySelector('.works__img-wrap');
    }
    show() {
      this.showImage();
      this.showTexts();
    }
    hide() {
      this.hideImage();
      this.hideTexts();
    }
    showImage() {
      gsap.to(this.img, {
        autoAlpha: 1
      });
    }
    hideImage() {
      gsap.to(this.img, {
        autoAlpha: 0
      });
    }
    showTexts() {
      let e;
      (e = this.currentAnimation) == null || e.kill();
      this.currentAnimation = gsap.to(this.txt, {
        autoAlpha: 1,
        x: 0,
      });
    }
    hideTexts() {
      let e;
      (e = this.currentAnimation) == null || e.kill();
      this.currentAnimation = gsap.to(this.txt, {
        autoAlpha: 0,
        x: "-50px",
      });
    }
  }

  const items = [...document.querySelectorAll('.works__item')].map(e => new WorksItem(e));
  const total = items.length;
  const itemOuter = document.querySelector('.works__scroll-outer');
  let currentIndex = -1;

  function updateIndex(index) {
    if (currentIndex < 0) {
      items[index].show();
      currentIndex = index;
      activeNavLink(currentIndex);
    } else if (index !== currentIndex && index !== total) {
      items[currentIndex].hide();
      items[index].show();
      currentIndex = index;
      activeNavLink(currentIndex);
    }
  }

  const navLinks = document.querySelectorAll('.works__nav-link');
  function activeNavLink(activeIndex) {
    navLinks.forEach((e, index) => {
      if (index === activeIndex) {
        e.classList.add('is-active');
      } else {
        e.classList.remove('is-active');
      }
    });
  }

  function setScrollSetting(scrollValue) {
    gsap.to(itemOuter, {
      scrollTrigger: {
        trigger: itemOuter,
        start: 'top top',
        end: `${total * scrollValue}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (e) => {
          const index = Math.floor(e.progress * total);
          updateIndex(index);
        },
      }
    });
  }

  const mm = gsap.matchMedia();

  mm.add("(max-width: 767px)", () => {
    const scrollValue = itemOuter.clientWidth;
    setScrollSetting(scrollValue);
  });

  mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
    const scrollValue = itemOuter.clientWidth;
    setScrollSetting(scrollValue);
  });

  mm.add("(min-width: 1024px)", () => {
    const scrollValue = itemOuter.clientWidth;
    setScrollSetting(scrollValue);
  });

  updateIndex(0);






















  setTimeout(() => {
    document.getElementById('mv__catchcopy-ja').classList.add('active');
    document.getElementById('mv__catchcopy-en-img').classList.add('active');
    document.getElementById('mv__scroll-btn').classList.add('active');
  }, 1000);




}, false);