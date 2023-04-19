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







  setTimeout(() => {
    document.getElementById('mv__catchcopy-ja').classList.add('active');
    document.getElementById('mv__catchcopy-en').classList.add('active');
    document.getElementById('mv__scroll-btn').classList.add('active');
  }, 1000);




}, false);