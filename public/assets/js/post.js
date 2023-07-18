document.querySelectorAll('.card').forEach((item) => {
  if (item.hasAttribute('data-id')) {
    const id = item.getAttribute('data-id'); // get data-id attribute
    item.addEventListener('click', (event) =>
      document.location.replace(`/post/${id}`)
    );
  }
});
