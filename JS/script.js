// sorting posts by price





const fetchButtonThroughApi =()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res =>res.json())
    .then(data=> makeButtonWithDetails(data.categories))
}


fetchButtonThroughApi();

const makeButtonWithDetails=(catag)=>{
    const catagoryContainer =document.getElementById("catagoryContainer")
    catag.forEach(element => {
       const catDiv= document.createElement("div")
            catDiv.classList.add("h-24")
            catDiv.classList.add("w-[24%]")
            catDiv.innerHTML=`
            <button onclick="buttonHandlerById(${element.id},'${element.category}')" id="button${element.id}" class="btn bg-transparent border-[#0E7A81]   lg:h-24 w-full lg:text-2xl rounded-full"><img class=" lg:w-14  w-4" src="${element. category_icon}" alt=""> <span class="text-black">${element.category}</span></button>
            `
            catagoryContainer.appendChild(catDiv)
            

    });
}

const buttonHandlerById=(id, category)=>{
    // active effect on button 
    for(i=1;i<=4; i++ ){
        document.getElementById(`button${i}`).classList.remove("border-[#0E7A81]")
    }
     document.getElementById(`button${id}`).classList.add("border-[#0E7A81]")
     const url =`https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`
     document.getElementById("cardContainer").innerHTML=""
     defaultPost(url)


}

// fetching all post in dom
var prevUrl=""
const defaultPost=(url ="https://openapi.programming-hero.com/api/peddy/pets" , isSortByPrice=false)=>{
    prevUrl=url
    fetch(url)
    .then(res => res.json())
    .then(singlepost=>makeDefaultAllPost(singlepost.pets?singlepost.pets:singlepost.data , isSortByPrice))
    
}
defaultPost();
document.getElementById("sortByPrice").addEventListener("click",()=>{
    defaultPost(prevUrl, isSortByPrice=true)
})


const makeDefaultAllPost=(data , isSortByPrice=false )=>{
   const allPostContainer= document.getElementById("cardContainer")
    allPostContainer.classList.remove("grid")
    allPostContainer.classList.add("flex")
    allPostContainer.classList.add("flex-col")
    allPostContainer.innerHTML=`
    <span class="loading loading-bars loading-lg"></span>
    `

   




   setTimeout(()=>{
    allPostContainer.classList.remove("flex")
    allPostContainer.classList.add("grid")
    allPostContainer.innerHTML=""
    if(data.length==0){
        allPostContainer.classList.remove("grid")
        allPostContainer.classList.add("flex")
        allPostContainer.classList.add("flex-col")
        allPostContainer.innerHTML=`
        <img src="./images/error.webp" alt="">
        <h2 class="text-3xl font-semibold">No Information Aviable </h2>
        <p class="w-10/12 text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
          its layout. The point of using Lorem Ipsum is that it has a.</p>
        `

    }
    else{
        allPostContainer.classList.remove("flex")
        allPostContainer.classList.add("grid")
    }


   const arr = [...data]
   if(isSortByPrice){
    arr.sort((a,b)=>b.price-a.price)
    data=arr
    allPostContainer.innerHTML=""
   }
 
data.forEach(element => {
    const{petId,pet_name,breed,date_of_birth,gender,price,image}=element
       const post= document.createElement("div")
         post.classList.add("card")
         post.classList.add("shadow-xl")
         post.innerHTML=`
              <figure class="h-80">
         <img
            class="w-full object-cover h-full rounded-b-2xl"
           src="${image}"
           alt="petimage" />
       </figure>
       <div class="card-body gap-3">
         <h2 class="card-title text-3xl">${pet_name?pet_name:"Not Available"}</h2>
         <p class="text-xl"><i class="fa-solid fa-grid-2"></i> Breed: <span>${breed?breed:"Not Available"}</span></p>
         <p class="text-xl"><i class="fa-solid fa-calendar-week"></i>  Birth: <span>${date_of_birth?date_of_birth:"Not Available"}</span></p>
         <p class="text-xl"><i class="fa-solid fa-mercury"></i>  Gender:<span>${gender?gender:"Not Available"}</span></p>
         <p class="text-xl"><i class="fa-solid fa-dollar-sign"></i>  Price:<span>${price?price+"$":"Not Available"}</span></p>
         <hr>
         <div class="flex justify-between">
           <button id="likePost${petId}" onclick="likeHandle('${image}','likePost${petId}')" class="btn bg-transparent text-xl"><i class="fa-solid fa-thumbs-up"></i></button>
           <button id="adoptButton${petId}" onclick="adoptionHandler('adoptButton${petId}')" class="btn bg-transparent text-xl text-[#0E7A81]">Adopt</button>
           <button id="detailsButton${petId}" onclick="detailsHandler('${petId}')" class="btn bg-transparent text-xl text-[#0E7A81]">Details</button>
       
         </div>
       </div>
         `
    allPostContainer.appendChild(post)
    });
   },1500)


}

const likeHandle=(urli, postId)=>{
    document.getElementById(postId).setAttribute("disabled",true)
    const imagecontainer =document.getElementById("imagecontainer")
    const  img1 =document.createElement("img")
    img1.classList.add("rounded-3xl")
    img1.setAttribute("src", urli);
    imagecontainer.appendChild(img1)

 console.log(urli)
}

const adoptionHandler=(id)=>{
    document.getElementById(id).setAttribute("disabled",true)
    document.getElementById(id).innerText="Adopted"
    openModal()
}

function openModal() {
    const modal = document.getElementById("countdownModal");
    const countDownElement = document.getElementById("countdown");
    let counter = 3;

    modal.showModal();
    countDownElement.innerText = counter; // Set initial value immediately

    const intervalId = setInterval(() => {
        counter--; // Decrement first
        if (counter < 1) { // Close when countdown reaches 0
            clearInterval(intervalId);
            modal.close();
        } else {
            countDownElement.innerText = counter;
        }
    }, 1000);
}





//details handlder function is here 
const detailsHandler=(id)=>{
    const url =`https://openapi.programming-hero.com/api/peddy/pet/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data=>makeDetailsModal(data))
}
const makeDetailsModal=(data)=>{
    const{petId, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name}=data.petData
    document.getElementById("modal1").innerHTML=`
    
        <dialog id="my_modal_4" class="modal max-h-screen">
           <div class="modal-box w-9/12 flex   flex-col max-w-5xl">
                
            
             <img class="rounded-3xl" src="${image}" alt="" />
             <h3 class="text-4xl text-black mb-3 font-bold">${pet_name}</h3>
             <div class="flex justify-between items-center gap-5">
               <div>

                 <p class="text-xl">
                   <i class="fa-solid fa-mercury"></i> Gender:<span
                     >${gender?gender:"Not Available"}</span
                   >
                 </p>
                 <p class="text-xl">
                   <i class="fa-solid fa-grid-2"></i> Vaccination:<span
                     >${vaccinated_status?vaccinated_status:"Not Available"}</span
                   >
                 </p>
               </div>
               <div>
                 <p class="text-xl">
                  <i class="fa-solid fa-calendar-week"></i> Birth:
                  <span>${date_of_birth?date_of_birth:"Not Available"}</span>
                 </p>
                 <p class="text-xl">
                   <i class="fa-solid fa-dollar-sign"></i> Price:<span
                     >${price?price+"$":"Not Available"}</span
                   >
                 </p>
               </div>
             </div>
             <h3 class="text-black text-3xl font-semibold my-4">Detail Information</h3>
             <p class="py-4">
               ${pet_details?pet_details:"Not Available"}
             </p>
             <div class="">
               <form method="dialog">
                 <!-- if there is a button, it will close the modal -->
                <button class="btn btn-outline btn-primary w-full ">Close</button>
               </form>
             </div>
           </div>
         </dialog>
    `


    my_modal_4.showModal()

    }








