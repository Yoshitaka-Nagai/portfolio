document.addEventListener('DOMContentLoaded', function () {

  const filterBtn = document.querySelectorAll('.works-view__filter-btn');

  filterBtn.forEach(e => {
    e.addEventListener('click', function () {
      filterBtn.forEach(e => e.classList.remove('is-active'));
      e.classList.add('is-active');
    })
  })

}, false);