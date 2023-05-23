//WORKS個別ページ用JS
document.addEventListener('DOMContentLoaded', function () {
  //スクロールエリア
  const scrollArea = document.getElementById('site-view__scroll-area');

  //スクロールバーのハンドル
  const scrollbarThumb = document.getElementById('site-view__scrollbar-thumb');

  //スクロールバー
  const scrollbar = document.getElementById('site-view__scrollbar');

  //スクロールエリアの高さ
  let scrollAreaHeight = scrollArea.clientHeight;

  //スクロールエリア内部も含めた高さ
  let totalHeight = scrollArea.scrollHeight;

  //ハンドルの高さ
  let thumbHeight = scrollbarThumb.clientHeight;

  //
  let scrollbarTrack = scrollAreaHeight - thumbHeight;

  //ハンドル制御フラグ
  let active = false;

  //
  let scrollbarThumbPositionY;

  //ウィンドウのリサイズ時処理
  window.addEventListener('resize', function () {
    //各値の再取得
    scrollAreaHeight = scrollArea.clientHeight;
    totalHeight = scrollArea.scrollHeight;
    thumbHeight = scrollbarThumb.clientHeight;
    scrollbarTrack = scrollAreaHeight - thumbHeight;

    //ハンドルの位置設定
    const y = (scrollArea.scrollTop * scrollbarTrack) / (totalHeight - scrollAreaHeight);
    scrollbarThumb.style.transform = "translate(-50%, " + y + "px)";
  });

  scrollArea.addEventListener('scroll', function () {
    if (active) {
      return;
    }
    const y = (scrollArea.scrollTop * scrollbarTrack) / (totalHeight - scrollAreaHeight);
    scrollbarThumb.style.transform = "translate(-50%, " + y + "px)";
  }, { passive: true }
  );

  scrollbar.addEventListener('click', function (event) {
    event.preventDefault();
    active = true;
    const scrollbarThumbY = event.layerY;
    const calc =
      (totalHeight - scrollAreaHeight) / (scrollAreaHeight - thumbHeight);
    let resultY = scrollbarThumbY - thumbHeight / 2;
    let scrollY = resultY * calc;
    if (resultY < 0) {
      resultY = 0;
    } else if (resultY > scrollbarTrack) {
      resultY = scrollbarTrack;
    }
    scrollbarThumb.style.transform = "translate(-50%, " + resultY + "px)";
    scrollArea.scrollTop = scrollY;
    active = false;
  },
    { passive: false }
  );

  scrollbarThumb.addEventListener('mousedown', function (event) {
    active = true;
    scrollbarThumbPositionY = event.pageY - this.getBoundingClientRect().top;
  },
    { passive: true }
  );

  scrollbarThumb.addEventListener('touchstart', function (event) {
    active = true;
    scrollbarThumbPositionY = event.touches[0].pageY - this.getBoundingClientRect().top;
  },
    { passive: true }
  );

  document.addEventListener('mousemove', function (event) {
    if (!active) return;
    let scrollbarThumbY =
      ((event.pageY - scrollbar.getBoundingClientRect().top) / scrollbarTrack) *
      scrollbarTrack -
      scrollbarThumbPositionY;
    const calc =
      (totalHeight - scrollAreaHeight) / (scrollAreaHeight - thumbHeight);
    const scrollY = scrollbarThumbY * calc;
    if (scrollbarThumbY < 0) {
      scrollbarThumbY = 0;
    } else if (scrollbarThumbY > scrollbarTrack) {
      scrollbarThumbY = scrollbarTrack;
    }
    scrollbarThumb.style.transform = "translate(-50%, " + scrollbarThumbY + "px)";
    scrollArea.scrollTop = scrollY;
  },
    { passive: false }
  );

  document.addEventListener('touchmove', function (event) {
    if (!active) return;
    let scrollbarThumbY =
      ((event.touches[0].pageY - scrollbar.getBoundingClientRect().top) / scrollbarTrack) *
      scrollbarTrack -
      scrollbarThumbPositionY;
    const calc =
      (totalHeight - scrollAreaHeight) / (scrollAreaHeight - thumbHeight);
    const scrollY = scrollbarThumbY * calc;
    if (scrollbarThumbY < 0) {
      scrollbarThumbY = 0;
    } else if (scrollbarThumbY > scrollbarTrack) {
      scrollbarThumbY = scrollbarTrack;
    }
    scrollbarThumb.style.transform = "translate(-50%, " + scrollbarThumbY + "px)";
    scrollArea.scrollTop = scrollY;
  },
    { passive: false }
  );

  document.addEventListener("mouseup", function () {
    active = false;
  });

  document.addEventListener('touchend', function () {
    active = false;
  });
}, false);