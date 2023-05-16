document.addEventListener('DOMContentLoaded', function () {
  //ヒントアイコン表示エリア
  const hintArea = document.getElementById('site-view__hint-area');
  
  //画像スクロールエリア
  const scrollArea = document.getElementById('site-view__scroll-area');

  //画像部分がスクロールされたらヒントエリア非表示
  scrollArea.addEventListener('scroll', function(){
    hintArea.classList.add('js-hidden');
  });
}, false);