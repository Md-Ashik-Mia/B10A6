all the function are written in script.js folder

1 cataegoryContainer id div contains the button dynamically by api

2 imageContainer id div contains image that posted  image is liked by the user

3 cardContainer id div contains all the post fetched by trough api

4 fetchButtonThroughApi() this function is used for  automatically for creating and fetching data from through api 

5 makeButtonWithDetails() for making button with fetched data

6 buttonHandlerById() for handling button click fetching 

7 defaultPost() function is used for fetching data from through api it takes 2 parameter url or you can say api and another is a boolean value when data is fetched it converts data from json to normal object 
after that it call a function makeDefaultAllPost()

8 makeDefaultAllPost()this function takes data and boolean value and make post and shows posts  in dom

9 likeHandle() handle like button click when click on post like button it triggered this function and this shows the image of the post to the left side of post in dom 

10 similarly adoptionHandler() handle adoption and showModal when adoption button is clicked 

11 and lastly details button  show modal for details  button is clicked it trigger detailsHandler()function  via showing additional details in the modal 




 Now Feature of This project 



1. sorting posts via price in descending order 

2. Showing Liked Image in the left of the posts

3. Showing posts dynamically 

4. Showing available post by the category 

5. showing additional details of post when clicking details button

6. disabling adoption button and like button after one click for that post button is clicked 

