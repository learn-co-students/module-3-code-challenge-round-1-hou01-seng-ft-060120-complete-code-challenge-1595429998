
  let imageId = 5655

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/${imageId}`

  const commentsURL = `https://randopic.herokuapp.com/comments/${imageId}`


  fetch(imageURL).then(function(response){
    return response.json()
}).then(function(json){
  renderImage(json)
})


function renderImage(json){
  const nameDiv = document.getElementById('name')
  const likesDiv = document.getElementById('likes')
  const imgDiv = document.getElementById('image')
  const likeBtn = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  const commentList = document.getElementById('comments')
  const imageCard = document.getElementById('image-card')

  nameDiv.innerText = json.name
  likesDiv.innerText = json.like_count
  imgDiv.src = json.url

  imageCard.appendChild(nameDiv)
  imageCard.appendChild(likesDiv)
  imageCard.appendChild(imgDiv)


  }

  // createLike(imgID, likeURL){
  //   return fetch(likeURL, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'},
  //     body: JSON.stringify({})
  //   })
  // }

  