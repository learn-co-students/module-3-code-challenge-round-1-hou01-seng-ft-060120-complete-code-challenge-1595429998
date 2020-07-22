document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5665

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()
})
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
let imageId = 5665
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

function fetchImage() {
  fetch(imageURL)
  .then(res => res.json())
  .then(json => displayImage(json))
}

function displayImage(jsonImage) {
  let image = document.getElementById('image')
  image.src = jsonImage.url
  let title = document.getElementById('name')
  title.innerText = jsonImage.name
  let likes = document.getElementById('likes')
  likes.innerText = jsonImage.like_count
  let commentsList = document.getElementById('comments')
  displayComments(jsonImage, commentsList)
  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', () => {
    increaseLikes(jsonImage, likes)
  })
  let commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', (event) => {
    createComment(event, jsonImage, commentsList)
  })

}

function displayComments(jsonImage, commentsList) {
  jsonImage.comments.forEach( comment => {
    let singleComment = document.createElement('li')
    singleComment.innerText = comment.content
    let deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    singleComment.appendChild(deleteButton)
    commentsList.appendChild(singleComment)
    deleteButton.addEventListener('click', () => {
      deleteComment(comment, singleComment)
    })
  })

}

function deleteComment(comment, singleComment) {
  singleComment.remove()
  fetch(`${commentsURL}/${comment.id}`, {method: 'DELETE'})
}

function increaseLikes(jsonImage, likes) {
  jsonImage.like_count++
  likes.innerText = jsonImage.like_count
  let configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({'image_id': 5665})
  }
  fetch(likeURL, configObject)
}

function createComment(event, jsonImage, commentsList) {
  let form = event.currentTarget
  event.preventDefault()
  let commentInput = document.getElementById('comment_input')
  let newComment = document.createElement('li')
  let deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete"
  newComment.innerText = commentInput.value
  newComment.appendChild(deleteButton)
  commentsList.appendChild(newComment)
  let commentData = {
    'image_id': 5665,
    'content': commentInput.value
  }
  let configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(commentData)
  }
  fetch(commentsURL, configObject)
  form.reset()
}

