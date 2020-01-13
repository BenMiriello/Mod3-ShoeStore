
const URL_PREFIX = 'http://localhost:3000'

// 1 get sidebar
const sidebar = document.querySelector("#shoe-list")

// 2 get main container
const mainShoe = document.querySelector("#main-shoe")
const mainImg = document.querySelector("#shoe-image")
const mainName = document.querySelector("#shoe-name")
const mainDescription = document.querySelector("#shoe-description")
const mainPrice = document.querySelector("#shoe-price")

const formContainer = document.querySelector("#form-container")

const reviewsList = document.querySelector("#reviews-list")

fetch(`${URL_PREFIX}/shoes`)
.then(r => r.json())
.then(shoes => {
   
   // 1 first shoe automatically displays in container
   showShoeInMain(shoes[0])

   shoes.forEach(shoe => {
      newLi = document.createElement("li");
      newLi.className = "list-group-item";
      newLi.innerText = shoe.name;
      sidebar.append(newLi)
      newLi.addEventListener("click", () => {

         // 2 shoe link -> shows details in main container
         showShoeInMain(shoe);
      })
   })
});

function showShoeInMain(shoe){
   mainImg.src = shoe.image
   mainName.innerText = shoe.name
   mainDescription.innerText = shoe.description
   mainPrice.innerText = `$${shoe.price}`
   renderForm(shoe)
}

function renderForm(shoe) {
   formContainer.innerHTML = ""
   const form = document.createElement("form")
   form.id = "new-review";
   const formDiv = document.createElement("div")
   formDiv.className = "form-group"
   const formTextArea = document.createElement("textarea")
   formTextArea.className = "form-control"
   formTextArea.id = "review-content"
   formTextArea.rows = "3"
   const formInput = document.createElement("input")
   formInput.type = "submit"
   formInput.className = "btn btn-primary"

   formDiv.append(formTextArea, formInput)
   form.append(formDiv)
   formContainer.append(form)

   // show existing reviews
   reviewsList.innerText = ""
   shoe.reviews.forEach(review => {
      let reviewLi = document.createElement("li")
      reviewLi.innerText = review.content
      reviewsList.append(reviewLi)
   })

   form.addEventListener("submit", (e) => {
      e.preventDefault()
      let reviewText = document.querySelector("#review-content").value
      addReview(shoe, reviewText)
   })
}

// 3 form persists to back end
function addReview(shoe, reviewText){
   fetch(`${URL_PREFIX}/shoes/${shoe.id}/reviews`, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         content: reviewText
      })
   })
   .then(r => r.json())
   .then(review => {

      // 3 form content displays on page w/o refresh
      let newReviewLi = document.createElement("li")
      newReviewLi.innerText = review.content
      reviewsList.append(newReviewLi)
   })
}

// 3 check that new and old reviews visible w/o refresh