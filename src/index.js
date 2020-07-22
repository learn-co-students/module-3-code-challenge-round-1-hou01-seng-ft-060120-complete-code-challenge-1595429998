document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5660

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage(imageURL)
  
  
})
let likes = 0

function getImage(imageURL) {
  fetch(imageURL)
  .then(res => res.json())
  .then(picture => showImage(picture))
  
}

function showImage(picture, imageURL) {
  document.getElementById('image').src=`${picture.url}`;
  updateTitle(picture)
  showLikes()
  // showComment(picture)
  addLike(picture)
  saveComment(picture)
  addComment()
  
}

function updateTitle(picture){
  document.getElementById('name').innerText = picture.name;
}

function showLikes() {
  document.getElementById('likes').innerText = likes;
}

// optimistic rendering is real real dumb, calling this and updating it after the fetch is better, But this isn't done 
// function showComment(picture) {
//   const commentUl = document.getElementById('comments');
//   picture.comments.forEach(comment => {
//     let commentLi = document.createElement('li')
//     commentLi.innerText = comment.content
//     commentUl.appendChild(commentLi)
//   })
// }

function addComment() {
  document.getElementById('comment_form').addEventListener('submit', event => {
    event.preventDefault();
    let commentText = document.getElementById('comment_input').value
    const commentUl = document.getElementById('comments');
    let commentLi = document.createElement('li')
    commentLi.innerText = commentText
    commentUl.appendChild(commentLi)
  })
}

function addLike(picture) {
document.getElementById('like_button').addEventListener('click', () => {
  
  likes++
  document.getElementById('likes').innerText = likes
  
  fetch('https://randopic.herokuapp.com/likes', {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      image_id: picture.id,
      like_count: likes
    })
  })
    showLikes()
  })
}

function saveComment(picture) {
 document.getElementById('comment_form').addEventListener('submit', event => {
  event.preventDefault();
  let commentText = document.getElementById('comment_input').value
  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      image_id: picture.id,
      content: commentText
    })
  })
 })

}