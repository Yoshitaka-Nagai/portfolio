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

  //ビューポートの高さ
  const windowHeight = window.innerHeight;

  //
  const items = [...document.querySelectorAll('.works__item')].map(e => new WorksItem(e));

  //
  const total = items.length;

  //
  const scrollOuter = document.getElementById('works__scroll-outer');

  //
  const navLinks = document.querySelectorAll('.works__nav-link');

  //
  const svgList = document.querySelectorAll('.skill__icon-svg');

  //ヘッダー
  const header = document.getElementById('header');

  //
  const videoWrap = document.getElementById('mv__video-wrap');

  //
  const catchcopyJa = document.getElementById('mv__catchcopy-ja');

  //
  const catchcopyEnImg = document.getElementById('mv__catchcopy-en-img');

  //
  const scrollBtn = document.getElementById('mv__scroll-btn');

  //
  const mm = gsap.matchMedia();

  //
  let currentIndex = -1;

  //
  let currentScroll;

  //
  let scrollToFunction;

  function updateIndex(index) {
    if (currentIndex === -1 && index === total) {
      items[index - 1].show();
      currentIndex = index - 1;
      activeNavLink(currentIndex);
    } else if (currentIndex === -1) {
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
    gsap.to(scrollOuter, {
      scrollTrigger: {
        trigger: scrollOuter,
        start: 'top top',
        end: `${total * scrollValue}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (e) => {
          const index = Math.floor(e.progress * total);
          updateIndex(index);
          currentScroll = e.progress * total * scrollValue;
        },
      }
    });
  }

  function setScrollNavLink(scrollValue) {
    scrollToFunction = (index, event) => {
      event.preventDefault();
      const scrollOuterPositon = scrollOuter.getBoundingClientRect().top + window.scrollY - currentScroll;

      gsap.to(window, {
        duration: 0.6,
        ease: 'linear',
        scrollTo: {
          y: scrollOuterPositon,
          offsetY: (index * -scrollValue) - 5,
        }
      });
    };

    gsap.utils.toArray('.works__nav-link').forEach((link, index) => {
      link.onclick = scrollToFunction.bind(null, index);
    });
  }

  //スキルセクションのsvgアイコン初期化処理
  function initSVG() {
    svgList.forEach((svg) => {
      svg.querySelectorAll('path').forEach((path) => {
        const pathLength = path.getTotalLength();
        path.style.strokeDashoffset = pathLength;
        path.style.strokeDasharray = pathLength;
        path.style.opacity = 1;
      });
    });
  }

  //スキルセクションのsvgアイコン描画処理
  function drawSVG() {
    const st = window.scrollY;
    for (let i = 0; i < svgList.length; i++) {
      const targetPos = svgList[i].getBoundingClientRect().top + st;
      if (st > targetPos - windowHeight * 0.5) {
        svgList[i].querySelectorAll('path').forEach((path) => {
          path.style.transitionProperty = 'stroke-dashoffset';
          path.style.transitionDuration = '2.5s';
          path.style.transitionTimingFunction = 'ease-in-out';
          path.style.strokeDashoffset = 0;
        });
      }
    }
  }

  //mvのアニメーション開始処理
  function startMvAnimation() {
    //ヘッダー表示処理を止める
    header.classList.remove('show');

    //ページ最上部にいるときのみ開始を少し遅らせる
    if (window.scrollY === 0) {
      setTimeout(() => {
        videoWrap.classList.add('active');
        catchcopyJa.classList.add('active');
        catchcopyEnImg.classList.add('active');
        scrollBtn.classList.add('active');
      }, 800);
      setTimeout(() => {
        header.classList.add('show');
      }, 2000);
    } else {
      videoWrap.classList.add('completed');
      videoWrap.classList.add('active');
      catchcopyJa.classList.add('completed');
      catchcopyJa.classList.add('active');
      catchcopyEnImg.classList.add('completed');
      catchcopyEnImg.classList.add('active');
      scrollBtn.classList.add('completed');
      scrollBtn.classList.add('active');
      header.classList.add('show');
    }
  }

  //
  function setGsapMatchMedia() {
    mm.add("(max-width: 767px)", () => {
      const scrollValue = scrollOuter.clientWidth * 2.1;
      setScrollSetting(scrollValue);
      setScrollNavLink(scrollValue);
    });

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      const scrollValue = scrollOuter.clientWidth * 1.4;
      setScrollSetting(scrollValue);
      setScrollNavLink(scrollValue);
    });

    mm.add("(min-width: 1024px)", () => {
      const scrollValue = scrollOuter.clientWidth * 0.7;
      setScrollSetting(scrollValue);
      setScrollNavLink(scrollValue);
    });
  }

  //mvのスクロールボタンのスムーススクロール
  document.getElementById('mv__scroll-btn').addEventListener('click', function (e) {
    e.preventDefault();
    gsap.to(window, {
      duration: 0.8,
      ease: 'ease-out',
      scrollTo: {
        y: '#message',
      }
    });
  });

  //スクロールイベント時処理
  window.addEventListener('scroll', function () {
    drawSVG();
  });

  //初期実行処理
  function topInit() {
    setGsapMatchMedia();
    startMvAnimation();
    initSVG();
  }

  topInit();

}, false);