document.addEventListener('DOMContentLoaded', function () {

  //サイトスクリーンショットのスクロールエリア
  const scrollArea = document.getElementById('site-view__scroll-area');

  //スクロールバーのハンドル
  const scrollbarThumb = document.getElementById('site-view__scrollbar-thumb');

  //サイトスクリーンショット画像
  const screenShotImage = scrollArea.querySelector('.site-view__img');

  //サイトスクリーンショット画像の高さ
  let screenShotHeight = screenShotImage.clientHeight;

  //
  let currentThumbPositionPercent = 0;

  //ハンドル操作フラグ
  let isActive = false;

  //
  let currentThumbPosition;


  scrollbarThumb.addEventListener('mousedown', function(e){
    isActive = true;
    currentThumbPosition = e.pageY;
  });

  scrollbarThumb.addEventListener('mouseup', function(){
    isActive = false;
  });

  scrollbarThumb.addEventListener('mouseleave', function(){
    isActive = false;
  });

  scrollbarThumb.addEventListener('mousemove', function(e){
    if(!isActive){
      return;
    }
    const delta = e.pageY - currentThumbPosition;
    const deltaPercent = Math.floor(delta / scrollArea.clientHeight * 100);
    let resultPercent = currentThumbPositionPercent + deltaPercent;
    console.log(resultPercent);
    scrollbarThumb.style.top = resultPercent + '%';
    currentThumbPositionPercent = resultPercent;
    currentThumbPosition = e.pageY;
  });




  //ウィンドウのリサイズ時処理
  window.addEventListener('resize', function () {
    //スクリーンショット画像の高さを再取得
    screenShotHeight = screenShotImage.clientHeight;

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

    //位置の割合取得
    currentThumbPositionPercent = Math.floor(scrollValue / screenShotHeight * 100);

    //スタイル設定
    scrollbarThumb.style.top = currentThumbPositionPercent + '%';
  }

}, false);