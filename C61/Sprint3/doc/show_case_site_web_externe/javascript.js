let compagnies = []
let info_compagnie = {}

window.addEventListener("load", () =>{
    let lieu =location.href
    if(lieu.includes("index.html")){
        setTimeout(get_api, 1000)
        get_compagnie_info(1)
    }
})

const get_api = () =>{
    
    fetch("http://localhost:5000/showcase", {
        method: "POST",
        body: null,
        async: false
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result)
        document.querySelector(".compagnie").innerHTML = result[0][1]
    })
}

const get_compagnie_info = (id_compagnie) =>{

    url = "http://localhost:5000/api/compagnie_info/" + id_compagnie
    
    fetch(url, {
        method: "POST",
        body: null,
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result)
        document.querySelector(".centres").innerHTML = result["centres"]
        document.querySelector(".salles").innerHTML = result["salles"]
        document.querySelector(".horaires").innerHTML = result["horaires"]
        document.querySelector(".reservations").innerHTML = result["reservations"]

    })
}

const add_reservation = (reservation) =>{
    
    formData = new FormData()
    formData.append("reservation", reservation)

    fetch("/api/reservation", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result)
    })
}

const change_page_for_compagnie = () =>{
    console.log(document.querySelector(".dropdown-content").textContent)
}