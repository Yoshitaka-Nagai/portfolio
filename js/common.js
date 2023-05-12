document.addEventListener('DOMContentLoaded', function () {
  //ビューポートの高さ
  const windowHeight = window.innerHeight;

  //クラス付与のスクロール位置調整用
  const adjustmentNumber = 0.65;

  //ブレイクポイント：PC
  const breakPointPc = 1024;

  //wrapper
  const wrapper = document.getElementById('wrapper');

  //ヘッダー
  const header = document.getElementById('header');

  //ヘッダーロゴ
  const headerLogo = document.getElementById('header__logo-link');

  //グローバルナビゲーション
  const gnav = document.getElementById('gnav');

  //グローバルナビゲーションリスト
  const gnavList = document.querySelectorAll('.gnav__list');

  //メニュー開閉ボタン
  const menuBtn = document.getElementById('menu-btn');

  //js-クラス付与対象リスト
  const jsTargetList = document.querySelectorAll('.js-fadeIn, .js-fadeUp, .js-fadeUpLarge, .js-fadeRight');

  //現在のスクロール量
  let currentScrollPosition = 0;

  //スクロールイベント時処理
  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    if (currentScrollPosition > scrollPosition) {
      showHeader();
    } else {
      hideHeader();
    }
    currentScrollPosition = scrollPosition;

    setJsTargetActive();
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
      gnavList.forEach(li => {
        li.classList.add('js-active');
      });

      //メニューが開かれているときはスクロール禁止
      document.addEventListener('touchmove', noScroll, { passive: false });
      document.addEventListener('wheel', noScroll, { passive: false });
    }
  });

  //ヘッダー初期化
  function headerInit() {
    menuBtn.classList.remove('js-opened');
    gnav.classList.remove('js-opened');
    headerLogo.classList.remove('js-black');
    gnavList.forEach(li => {
      li.classList.remove('js-active');
    });

    //スクロール禁止を解除
    document.removeEventListener('touchmove', noScroll);
    document.removeEventListener('wheel', noScroll);
  }

  //イベント処理禁止用
  function noScroll(e) {
    e.preventDefault();
  }

  //ヘッダー表示
  function showHeader() {
    header.classList.add('js-show');
  }

  //ヘッダー非表示
  function hideHeader() {
    header.classList.remove('js-show');
  }

  //対象にクラス付与
  function setJsTargetActive() {
    const st = window.scrollY;
    jsTargetList.forEach((e) => {
      const position = e.getBoundingClientRect().top + st;
      if (st > position - windowHeight * adjustmentNumber) {
        e.classList.add('js-active');
      }
    });
  }

  function startPageAnimation(){
    wrapper.classList.add('js-active');
  }

  //初期実行処理
  function init() {
    startPageAnimation();
    showHeader();
  }

  init();

}, false);