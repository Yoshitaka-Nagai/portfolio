//WORKS個別ページ用JS
document.addEventListener('DOMContentLoaded', function () {
  //サイトスクリーンショットのスクロールエリア
  const scrollArea = document.getElementById('site-view__scroll-area');

  //スクロールバー
  const scrollbar = document.getElementById('site-view__scrollbar');

  //スクロールバーのハンドル
  const scrollbarThumb = document.getElementById('site-view__scrollbar-thumb');

  //スクロールエリアの高さ
  let scrollAreaHeight = scrollArea.clientHeight;

  //スクロールエリア内部も含めた高さ
  let totalHeight = scrollArea.scrollHeight;

  //スクロール可能量
  let scrollableValue = totalHeight - scrollAreaHeight;

  //現在のハンドルのTOPからの位置：%
  let currentThumbPositionPercent = 0;

  //現在のハンドルのTOPからの位置：px
  let currentThumbPositionPx = 0;

  //ウィンドウのリサイズ時処理
  window.addEventListener('resize', function () {
    //スクリーンショット画像の高さを再取得
    totalHeight = scrollArea.scrollHeight;
    scrollAreaHeight = scrollArea.clientHeight;
    scrollableValue = totalHeight - scrollAreaHeight;

    //ハンドルの位置設定
    setScrollbarThumbPositon();
  });

  //エリアのスクロールイベント時処理
  scrollArea.addEventListener('scroll', function () {
    //ハンドルの位置設定
    setScrollbarThumbPositon();
  });

  //スクロールバーハンドルの位置設定
  function setScrollbarThumbPositon() {
    //スクロール量
    const scrollValue = scrollArea.scrollTop;

    //位置の%
    currentThumbPositionPercent = Math.floor(scrollValue / scrollableValue * 100);

    //位置のpx
    currentThumbPositionPx = Math.floor(scrollAreaHeight * (currentThumbPositionPercent / 100));

    //スタイル設定
    scrollbarThumb.style.top = currentThumbPositionPx + 'px';
  }
}, false);