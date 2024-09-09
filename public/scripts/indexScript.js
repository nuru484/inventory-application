document
  .getElementById('menu-list')
  .addEventListener('click', function (event) {
    if (event.target.classList.contains('menu-item')) {
      const targetId = event.target.getAttribute('data-target');

      const targetList = document.getElementById(targetId);
      targetList.classList.toggle('hidden');
    }
  });
