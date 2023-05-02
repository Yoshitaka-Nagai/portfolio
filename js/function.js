document.addEventListener('DOMContentLoaded', function () {
  //ビューポートの高さ
  const windowHeight = window.innerHeight;

  //ブレイクポイント：PC
  const breakPointPc = 1024;

  //ヘッダーロゴ
  const headerLogo = document.getElementById('header__logo-link');

  //
  const gnav = document.getElementById('gnav');

  //メニューボタン
  const menuBtn = document.getElementById('menu-btn');

  //ウィンドウリサイズ時処理
  window.addEventListener('resize', function () {
    const windowWidth = window.innerWidth;
    if (windowWidth >= breakPointPc) {
      headerInit();
    }
  });

  //メニューボタンクリック時処理
  menuBtn.addEventListener('click', function () {
    if (this.classList.contains('opened')) {
      headerInit();
    } else {
      this.classList.add('opened');
      gnav.classList.add('opened');
      headerLogo.classList.add('black');
    }
  });

  function headerInit() {
    menuBtn.classList.remove('opened');
    gnav.classList.remove('opened');
    headerLogo.classList.remove('black');
  }










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
  let scrollValue = itemOuter.clientWidth;
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

  gsap.to(itemOuter, {
    scrollTrigger: {
      trigger: itemOuter,
      start: 'top top',
      end: `${total * scrollValue}`,
      //markers: true,
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

  updateIndex(0);

























  setTimeout(() => {
    document.getElementById('mv__catchcopy-ja').classList.add('active');
    document.getElementById('mv__catchcopy-en-img').classList.add('active');
    document.getElementById('mv__scroll-btn').classList.add('active');
  }, 1000);




}, false);