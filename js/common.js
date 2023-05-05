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
    if (currentScrollPosition < scrollPosition) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
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

}, false);