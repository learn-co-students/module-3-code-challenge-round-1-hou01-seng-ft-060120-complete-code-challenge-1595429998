document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

   //Enter the id from the fetched image here

  

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()
})
let imageId = 5668


const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

function getImage() {
  fetch("https://randopic.herokuapp.com/images/5668").then(res => res.json())
  .then(json => {myImage = json; renderImage(json)})
}

function renderImage() {
  addImageCard(myImage)
}

function addImageCard(myImage) {
  const imageCard = document.getElementById('image_card')
  imageCard.innerHTML =  `
    <img src="${myImage.url}" id="image" data-id=""/>
    <h4 id="name">${myImage.name}</h4>
    <span>Likes:
      <span id="likes">${myImage.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>
  `
  const comments = document.getElementById('comments')
  myImage.comments.forEach(comment => {
    const oneComment = document.createElement('li')
    oneComment.innerText = comment.content
    comments.appendChild(oneComment)

  })

  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', e => {
    myImage.like_count ++
    fetch("https://randopic.herokuapp.com/likes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      },
      body: JSON.stringify({
        image_id: 5668,
      })
    })
    .then(res => res.json()).then(myImage => addImageCard(myImage))
    
  })

  const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    handleCommentForm(e);
    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        image_id: 5668,
        
      })
    })
  })

}

function handleCommentForm(e) {
  console.log(e.target.content.value)
  const commentContent = e.target.content.value
  const newComment = {
    "content": commentContent
  }
}
