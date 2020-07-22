/////////////////////////////////////////////
// Apart of deliverable 2
let like = 1
///////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5663 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  ////////////////////////////////////////////
  // Deliverable 1
  fetchImage()

  function fetchImage() {
    fetch(imageURL)
    .then(response => response.json())
    .then(json => renderImage(json))
  }

  function renderImage(image) {
    const img = document.getElementById('image')
    img.src = image.url
    const name = document.getElementById('name')
    name.innerHTML = `${image.name}`
    const likes = document.getElementById('likes')
    likes.innerHTML = `${like}`
    image.comments.forEach(comment => renderComment(comment))
    likeButton(image.like_count)
  }

  function renderComment(comment) {
    const com = document.getElementById('comments')
    com.innerHTML = ""
    const li = document.createElement('li')
    li.innerHTML = `${comment.content}`
    com.append(li)
  }

  /////////////////////////////////////////////////
  // Deliverable 2 Working
  const button = document.getElementById('like_button')
  button.addEventListener('click', event => {
    const up = like++
  })


  ////////////////////////////////////////////////
  // Deliverable 3 not working 
  function likeButton(liker) {
    const button = document.getElementById('like_button')
    button.addEventListener('click', event => {
      const up = liker++
      fetch(likeURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(up)
      })
      .then(res => res.json())
      .then(() => fetchImage())
    })
  }

})