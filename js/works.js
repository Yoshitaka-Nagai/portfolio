document.addEventListener('DOMContentLoaded', function () {

  //
  const filterBtns = document.querySelectorAll('.works-view__filter-btn');

  //
  const worksList = document.querySelectorAll('.works-view__list');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(e => e.classList.remove('js-active'));
      btn.classList.add('js-active');
      filter(btn.dataset.filter);
    });
  });

  function filter(filterName) {
    if (filterName === 'all') {
      clearFilter();
      return;
    }
    worksList.forEach(item => {
      const tags = [...item.querySelectorAll('.works-view__tag')].map(e => e.dataset.tag);
      if (tags.includes(filterName)) {
        item.classList.remove('js-hidden');
      } else {
        item.classList.add('js-hidden');
      }
    });
  }

  function clearFilter() {
    worksList.forEach(item => {
      item.classList.remove('js-hidden');
    });
  }

}, false);