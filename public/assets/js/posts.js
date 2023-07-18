const postFormHandler = async (event) => {
  // post form handler
  event.preventDefault(); // prevent default
  console.log('postFormHandler')
  const title = document.querySelector('#post-title').value.trim(); // get title
  const content = document.querySelector('#post-content').value.trim(); // get content

  if (title && content) {
    // if title and content exist
    const response = await fetch('/api/post', {
      // fetch post route
      method: 'POST', // use POST
      body: JSON.stringify({ title, content }), // send title and content
      headers: { 'Content-Type': 'application/json' }, // set content-type
    });

    if (response.ok) {
      // if response is ok
      document.location.replace('/dashboard'); // redirect to dashboard
    } else {
      // if response is not ok
      console.log(response.statusText); // alert response status
    }
  }
};

document
  .querySelector('#create-post-form')
  .addEventListener('submit', postFormHandler);
