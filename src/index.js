let imageId = 5656;
const IMAGE_URL = `https://randopic.herokuapp.com/images/${imageId}`;
const LIKES_URL = `https://randopic.herokuapp.com/likes/`;
const COMMENTS_URL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener("DOMContentLoaded", () => {
  feetchImageData()

  const commentForm = document.getElementById("comment_form");
  commentForm.addEventListener("submit", (e) => handleCommentForm(e));

  document.addEventListener("click", (e) => {
    if (e.target.nodeName == "BUTTON" && e.target.hasAttribute("comment-id")) {
      deleteComment(e.target)
    }
  })
})

function feetchImageData() {
  fetch(IMAGE_URL)
    .then(resp => resp.json())
    .then(json => renderImageData(json))
}

function renderImageData(imageData) {
  const commentsUl = document.getElementById("comments");
  const likes_element = document.getElementById("likes");

  likes_element.innerText = `${imageData.like_count}`;
  document.getElementById("image").src = `${imageData.url}`;
  document.getElementById("name").innerText = `${imageData.name}`;

  imageData.comments.forEach(comment => {
    const commentLi = document.createElement("li");

    commentLi.innerHTML = `
      ${comment.content} <button comment-id="${comment.id}">Delete</button>
    `;
    commentsUl.appendChild(commentLi);
  })

  const likeButton = document.getElementById("like_button");
  likeButton.addEventListener("click", () => handleLikeButton(imageData, likes_element));
}

function handleLikeButton(imageData, likes_element) {
  imageData.like_count++;
  likes_element.innerText = `${imageData.like_count}`;

  fetch(LIKES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "image_id": 5656,
      "like_count": imageData.like_count
    })
  })
}

function handleCommentForm(e) {
  e.preventDefault();
  
  const commentsUl = document.getElementById("comments");
  const newCommentLi = document.createElement("li");
  let newComment = e.target.comment.value;

  if (newComment == "") {
    alert("Please type a comment first!")
  } else {
    newCommentLi.innerHTML = `${newComment} <button comment-id="">Delete</button>`;
    commentsUl.appendChild(newCommentLi);

    fetch(COMMENTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "image_id": 5656,
        "content": newComment
      })
    }).then(resp => resp.json()).then(json => {
      newCommentLi.querySelector("button").setAttribute("comment-id", json.id)
    })
  }

  e.target.reset();
}

function deleteComment(button) {
  const commentId = button.getAttribute("comment-id");
  button.parentNode.remove();

  fetch(`${COMMENTS_URL}/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
}