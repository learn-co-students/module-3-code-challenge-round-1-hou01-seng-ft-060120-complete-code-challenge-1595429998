document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5666 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  function fetchImage(){
    fetch(imageURL).then(resp => resp.json()).then(image => displayImage(image))
  };
      fetchImage()

  function displayImage(image){
      console.log(image)
      const imageTag = document.querySelector("#image")
        imageTag.setAttribute('src', `${image.url}`)
      const nameTag = document.querySelector("#name")
        nameTag.innerText = `${image.name}`
      let imgLikes = document.querySelector("#likes")
        imgLikes.innerText = `${image.like_count}`
        for(comment of image["comments"]){
          const ulTag = document.querySelector("#comments")
          const liTag = document.createElement('li')
            liTag.setAttribute('id', 'comments-list')
            liTag.innerText = comment.content;
            ulTag.append(liTag)
        }
      const likeBtn = document.querySelector("#like_button")    

      likeBtn.addEventListener('click', ()=> increaseLikeBtn(image));
  };

  function increaseLikeBtn(image){
    let imgLikes = document.querySelector("#likes")
    imgLikes.innerText = `${image.like_count+=1}`

    const data = {mage_id: 5666 }

    fetch(likeURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type': 'application/json',
        Accept: 'application/json'
      }
      })
      .then(resp => resp.json())
      .then(json => console.log(json))
  }
})