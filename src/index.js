let imageId = 5670 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  getImage()
  submitComment()

  

  

})

function getImage() {
  fetch(`${imageURL}`)
  .then(res => res.json())
  .then(json => imageCard(json))
}

function imageCard(json) {
  let commentarr = json.comments
  console.log(json)
  let img = document.getElementById("image")
  img.src = `${json.url}`
  let title = document.getElementById("name")
  title.innerText = `${json.name}`
  let span = document.getElementById("likes")
  span.innerText = `${json.like_count}`
  let btn = document.getElementById("like_button")
  let ul = document.getElementById("comments")
  let li = document.createElement("li")
  
  commentarr.forEach(comment => {
    console.log(comment)
    
    li.innerText = comment.content
    
  });
  ul.appendChild(li)
  btn.addEventListener("click", () => {
    likeClicked(json)
  })

}

// function liMaker(arr) {
//   let ul = document.getElementById("comments")
//   arr.forEach(comment => {
//     let li = document.createElement("li")
//     ul.appendChild(li)
//   })


// }

function likeClicked(data) {
  data.like_count++
  fetch(`${likeURL}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: `${imageId}`
    })

  })
  // .then(res => res.json())
  // .then(json => console.log(json))
  imageCardAgain(data)
}
function imageCardAgain(data) {
  console.log(`${data.like_count}`)
  span = document.getElementById("likes")
  span.innerText=`${data.like_count}`
}

function submitComment() {
  let form = document.getElementById("comment_form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("comment submitted")
    let commentData = {
      "image_id": `${imageId}`,
      "content": e.target[0].value
    }
    postComment(commentData)
  })
}
function postComment(comment) {
  fetch(`${commentsURL}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
  // .then(res =>)
}

