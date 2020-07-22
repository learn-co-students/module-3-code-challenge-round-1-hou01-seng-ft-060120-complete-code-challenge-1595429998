let imageId = 5664 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage();
})

function fetchImage() {
  fetch(imageURL)
  .then(response => response.json())
  .then(json => renderImage(json))
};

function renderImage(imageObject) {
  console.log(imageObject)
  const imageCard = document.getElementById('image_card')
 
    const image = document.getElementById('image')
    image.setAttribute('src', `${imageObject.url}`) 

    const name = document.getElementById("name")
    name.innerHTML= `${imageObject.name}`
    
    const likes = document.getElementById("likes")
    likes.innerHTML= `${imageObject.like_count}`
   
    // for ( const comment of imageObject["comments"])
    //   const blurb = document.getElementById("comments")
    //   const line = document.createElement('li')
    //   blurb.append(line)
    //   line.innerHTML= `${imageObject.comments.content}`

    //   function shallowIterator (target) {
    //     for (const comment in imageObject) {
    //       if (typeof target[comment] === 'object') {
    //         for (const nestedKey in target[key]) {
    //           console.log(target[key][nestedKey]);
    //         }
    //       } else {
    //         console.log(target[key]);
    //       }
    //     }
    //   }

     
        for (const comments in imageObject) {
          console.log(imageObject[comments]);
          const blurb = document.getElementById("comments")
          const line = document.createElement('li')
          blurb.append(line)
          line.innerHTML = `${comments.content}`
        }
      

};
