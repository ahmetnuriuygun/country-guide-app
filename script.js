

searchButton =document.getElementById("searchbutton")
clearButton =document.getElementById("clearbutton")
searchInput =document.getElementById("searchinput")
searchDiv =document.getElementById("searchinput")


searchButton.addEventListener("click",()=>{
    countryName = searchInput.value ;
    getCountry(countryName);
    searchInput.value = "";
    searchInput.focus();
    searchButton.style.backgroundColor = "green"
})



async function getCountry(countryName){
const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`) ;
if(!res.ok){
    document.querySelector(".countries").innerHTML = `
    <h3> Oops! Something is wrong :: ${res.status} </h3>
    <img src="./404.png" alt="error image">  `

    throw new Error("Error message")

} 
const data = await res.json()
flag = data[0].flags.svg
console.log(data[0]);
console.log(flag);

document.querySelector("#iframe").src = flag

updateScreen(data[0])

}




const updateScreen=(country)=>{

    const{capital,currencies,region,languages,name,flags,population}=country
    
    
    document.querySelector(".countries").innerHTML = 
    `
    <div class="card mt-5" style="width: 18rem;">
        
        <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <p class="card-text">${region}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><i class="fas fa-lg fa-landmark"></i>${capital}</li>
            <li class="list-group-item"><i class="fas fa-lg fa-users"></i>${(population / 1_000_000).toFixed(1)}</li>
            <li class="list-group-item"><i class="fas fa-lg fa-comments"></i>${Object.values(currencies)[0].name},${Object.values(currencies)[0].symbol}</li>
            <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i>${Object.values(languages)[0]}</li>
        </ul>
    </div>
    `

}

clearButton.addEventListener("click",()=>{
    document.querySelector(".countries").innerHTML = ""
    document.querySelector("#iframe").src = "./GW7p.gif"
})

searchDiv.onmouseover=()=>{
    searchDiv.style.border = "thick solid green"
}
searchDiv.onmouseout=()=>{
    searchDiv.style.border = "none"
}

