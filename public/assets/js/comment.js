const addComment = async (event) => {
  event.preventDefault();

  const postId = window.location.toString().split('/').pop();
  const commentContent = document.querySelector('#comment-content').value.trim();

  if (commentContent) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ postId, commentContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
};

const commentForm = document.querySelector('#comment-form');
if (commentForm) {
  commentForm.addEventListener('submit', addComment);
}

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-text').value.trim();
  const url = window.location.href;
  const postId = url.substring(url.lastIndexOf('/') + 1);

  if (comment && postId) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const editPostBtnNavHandler = async (event) => {
  event.preventDefault();
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  document.location.replace(`/edit/${id}`);
};

const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const url = window.location.href;
  const postId = url.substring(url.lastIndexOf('/') + 1);

  if (title && content && postId) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert(response.statusText);
    }
  }
};

const deletePostHandler = async (event) => {
  event.preventDefault();

  const url = window.location.href;
  const postId = url.substring(url.lastIndexOf('/') + 1);

  const response = await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

const commentForm = document.querySelector('.comment-form');
if (commentForm) {
  commentForm.addEventListener('submit', commentFormHandler);
}

const editPostBtn = document.querySelector('.edit-post');
const deletePostBtn = document.querySelector('.delete-post');
const editPostForm = document.querySelector('.update-post-form');

if (editPostBtn && deletePostBtn) {
  editPostBtn.addEventListener('click', editPostBtnNavHandler);
  deletePostBtn.addEventListener('click', deletePostHandler);
}

if (editPostForm) {
  editPostForm.addEventListener('submit', editPostHandler);
}
