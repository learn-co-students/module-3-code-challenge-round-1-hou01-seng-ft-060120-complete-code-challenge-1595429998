let imageId = 5667 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let likeBtn = document.getElementById("like_button");
  likeBtn.addEventListener("click", like);

  let commentBtn = document.getElementById("comment_form");
  likeBtn.addEventListener("submit", addComment);

  displayImage()
})


function displayImage() {
  fetch(imageURL)
    .then((resp) => resp.json())
    .then((json) => {
      let img = json;
      document.getElementById("image").src = img.url;
      document.getElementById("name").innerText = img.name;
    })
}


function like() {
  fetch(imageURL)
    .then((resp) => resp.json())
    .then((json) => {
      let likeCount = json;
      displayLikes(likeCount)
    })
}

function displayLikes(likeCount) {
  likeCount.like_count += 1
  document.getElementById("likes").innerText = likeCount.like_count;
}

function addComment() {
  
}