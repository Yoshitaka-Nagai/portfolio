document.addEventListener('DOMContentLoaded', function () {
  //ビューポートの高さ
  const windowHeight = window.innerHeight;

  //ブレイクポイント：PC
  const breakPointPc = 1024;

  //ヘッダー
  const header = document.getElementById('header');

  //ヘッダーロゴ
  const headerLogo = document.getElementById('header__logo-link');

  //
  const gnav = document.getElementById('gnav');

  //メニューボタン
  const menuBtn = document.getElementById('menu-btn');

  //
  let currentScrollPosition = 0;

  //
  window.addEventListener('scroll', function () {
    const scrollPosition = document.documentElement.scrollTop;
    if (currentScrollPosition > scrollPosition) {
      showHeader();
    } else {
      hideHeader();
    }

    currentScrollPosition = scrollPosition;
  });

  //ウィンドウリサイズ時処理
  window.addEventListener('resize', function () {
    const windowWidth = window.innerWidth;
    if (windowWidth >= breakPointPc) {
      headerInit();
    }
  });

  //メニューボタンクリック時処理
  menuBtn.addEventListener('click', function () {
    if (this.classList.contains('js-opened')) {
      headerInit();
    } else {
      this.classList.add('js-opened');
      gnav.classList.add('js-opened');
      headerLogo.classList.add('js-black');

      //メニューが開かれているときはスクロール禁止
      document.addEventListener('touchmove', noScroll, { passive: false });
      document.addEventListener('wheel', noScroll, { passive: false });
    }
  });

  function headerInit() {
    menuBtn.classList.remove('js-opened');
    gnav.classList.remove('js-opened');
    headerLogo.classList.remove('js-black');

    //スクロール禁止を解除
    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel', noScroll);
  }

  function noScroll(e) {
    e.preventDefault();
  }

  function showHeader(){
    header.classList.add('js-show');
  }

  function hideHeader(){
    header.classList.remove('js-show');
  }

  function init(){
    showHeader();
  }

  init();

}, false);