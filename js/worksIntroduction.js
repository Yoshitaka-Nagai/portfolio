//WORKS個別ページ用JS
document.addEventListener('DOMContentLoaded', function () {
  //サイトスクリーンショットのスクロールエリア
  const scrollInner = document.getElementById('site-view__scroll-area');

  //スクロールバーのハンドル
  const Thumb = document.getElementById('site-view__scrollbar-thumb');

  //スクロールバー
  const scrollbar = document.getElementById('site-view__scrollbar');

  //スクロールエリアの高さ
  let scrollableHeight = scrollInner.clientHeight;

  //スクロールエリア内部も含めた高さ
  let totalHeight = scrollInner.scrollHeight;

  //
  let barHeight = 10;

  //
  let scrollbarTrack = scrollableHeight - barHeight;

  //ドラッグ制御フラグ
  let active = false;

  let scrollbar_thumb_cursor_Y;







  scrollInner.addEventListener('scroll', function () {
    if (active) {
      return;
    }
    const y = (scrollInner.scrollTop * scrollbarTrack) / (totalHeight - scrollableHeight);
    Thumb.style.transform = "translate(-50%, " + y + "px)";
  }, { passive: true }
  );

  scrollbar.addEventListener('click', function (event) {
    console.log("click");
    event.preventDefault();
    active = true;
    var calc = event.layerY - barHeight / 2;
    scrollbar_thumb_Y = event.layerY;
    var elemElem = scrollbar_thumb_Y - barHeight / 2;
    var calc =
      (totalHeight - scrollableHeight) / (scrollableHeight - barHeight);
    var yy = elemElem * calc;
    if (elemElem < 0) { elemElem = 0; } else if (elemElem > scrollbarTrack) {
      elemElem = scrollbarTrack;
    }
    Thumb.style.transform = "translate(-50%, " + elemElem + "px)";
    scrollInner.scrollTop = yy;
    active = false;
  },
    { passive: false }
  );

  Thumb.addEventListener('mousedown', function (event) {
    console.log("mousedown");
    active = true;
    scrollbar_thumb_cursor_Y = event.pageY - this.getBoundingClientRect().top;
  },
    { passive: true }
  );

  document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (!active) return;
    event = event.pageY;
    var scrollbar_thumb_Y =
      ((event - scrollbar.getBoundingClientRect().top) / scrollbarTrack) *
      scrollbarTrack -
      scrollbar_thumb_cursor_Y;
    var calc =
      (totalHeight - scrollableHeight) / (scrollableHeight - barHeight);
    var yy = scrollbar_thumb_Y * calc;
    if (scrollbar_thumb_Y < 0) { scrollbar_thumb_Y = 0; } else if (scrollbar_thumb_Y > scrollbarTrack) {
      scrollbar_thumb_Y = scrollbarTrack;
    }
    Thumb.style.transform = "translate(-50%, " + scrollbar_thumb_Y + "px)";
    scrollInner.scrollTop = yy;
  },
    { passive: false }
  );

  document.addEventListener("mouseup", function (event) {
    console.log("mouseup");
    active = false;
  });










  // //スクロール可能量
  // let scrollableValue = totalHeight - scrollableHeight;

  // //ハンドルの現在のTOPからの位置：%
  // let currentThumbPositionPercent = 0;

  // //ハンドルの現在のTOPからの位置：px
  // let currentThumbPositionPx = 0;



  // //ウィンドウのリサイズ時処理
  // window.addEventListener('resize', function () {
  //   //スクリーンショット画像の高さを再取得
  //   totalHeight = scrollInner.scrollHeight;
  //   scrollableHeight = scrollInner.clientHeight;
  //   scrollableValue = totalHeight - scrollableHeight;

  //   //ハンドルの位置設定
  //   setScrollbarThumbPositon();
  // });

  // //エリアのスクロールイベント時処理
  // scrollInner.addEventListener('scroll', function () {
  //   //ハンドルの位置設定
  //   setScrollbarThumbPositon();
  // });

  // //スクロールバーハンドルの位置設定
  // function setScrollbarThumbPositon() {
  //   //エリア内のスクロール量
  //   const scrollValue = scrollInner.scrollTop;

  //   //位置の%
  //   currentThumbPositionPercent = Math.floor(scrollValue / scrollableValue * 100);

  //   //位置のpx
  //   currentThumbPositionPx = Math.floor(scrollableHeight * (currentThumbPositionPercent / 100));

  //   //スタイル設定
  //   Thumb.style.top = currentThumbPositionPx + 'px';
  // }
}, false);