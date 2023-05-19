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

  //ハンドルの現在のTOPからの位置：%
  let currentThumbPositionPercent = 0;

  //ハンドルの現在のTOPからの位置：px
  let currentThumbPositionPx = 0;

  //ドラッグ制御フラグ
  let isActive = false;

  //
  let beforeMoveY;

  scrollbarThumb.addEventListener('mousedown', function (e) {
    isActive = true;
    beforeMoveY = e.pageY;
  });

  scrollbarThumb.addEventListener('mousemove', function (e) {
    if (!isActive) {
      return;
    }

    const delta = e.pageY - beforeMoveY;
    let resultPositionPx = currentThumbPositionPx + delta;
    if (resultPositionPx < 0) {
      resultPositionPx = 0;
    } else if (resultPositionPx > scrollAreaHeight) {
      resultPositionPx = scrollAreaHeight;
    }

    scrollbarThumb.style.top = resultPositionPx + 'px';
    currentThumbPositionPx = resultPositionPx;
  });

  scrollbarThumb.addEventListener('mouseup', function () {
    isActive = false;
    console.log('mouseup');
  });

  scrollbarThumb.addEventListener('mouseleave', function () {
    isActive = false;
    console.log('leave');
  });



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
    //エリア内のスクロール量
    const scrollValue = scrollArea.scrollTop;

    //位置の%
    currentThumbPositionPercent = Math.floor(scrollValue / scrollableValue * 100);

    //位置のpx
    currentThumbPositionPx = Math.floor(scrollAreaHeight * (currentThumbPositionPercent / 100));

    //スタイル設定
    scrollbarThumb.style.top = currentThumbPositionPx + 'px';
  }
}, false);