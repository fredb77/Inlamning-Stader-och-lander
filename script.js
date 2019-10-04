
/*
    =================================================^===========
    Inlämnings uppgift: Städer och länder i Webbapplikation MVP
    Skapad av Fredrik Byström 2019
    =============================================================
*/

// requestar land.json
fetch("json/land.json")
.then(function(resp) {
    return resp.json();
})

.then(function(data) {
    // lägger datan från json i variabel
     land = data;
})

// requestar stad.json
fetch("json/stad.json")
.then(function(resp) {
    return resp.json();
})

.then(function(data) {
    // lägger datan från json i variabel
    stad = data;
    
    var landId = 1;

    for(i = 0; i < land.length; i++){ 
        
        if(land[i].id === landId){

            document.getElementById("output").innerHTML += "&nbsp;" + "<div class='btn-group'><div class='dropdown'>" + 
            "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenu2' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" + 
            land[i].countryname + "</button>" +
            "<div class='dropdown-menu' aria-labelledby='dropdownMenu2' id='" + landId + "'>";
            
            for(a = 0; a < stad.length; a++){
                
                if(stad[a].countryid === landId) {     // hämtar dom städerna som har samma id som landId
                    
                    document.getElementById(landId).innerHTML += "<button onclick=\"town_btn(this.value)\" id='infoBtn' value='" + stad[a].id + "' class='dropdown-item' type='button'>" + stad[a].stadname + "</button>";
                }
            }
            document.getElementById("output").innerHTML += "</div></div></div>&nbsp;";
        }   
        landId++;
    }
})

// skriver ut felmeddelande
.catch(err => {
    document.write(err);
    console.log(err);
})

// skapar array som vi lägger sparade städer i
var besoktaStader = [];

function town_btn(clicked){

    let townID = 0;
    townID = clicked --- 1;

    document.getElementById("info").innerHTML = "";
    document.getElementById("inv").innerHTML = "";
    document.getElementById("besokKnapp").innerHTML = "";
    document.getElementById("bes").innerHTML = "";
    document.getElementById("rensa").innerHTML = "";
    document.getElementById("pop").innerHTML = "";

    document.getElementById("besokKnapp").innerHTML += "<hr><button onclick=\"besokt(this.value)\" value=\"" + stad[townID].id + "\">Jag har besökt " + stad[townID].stadname + "</button>"; 
    document.getElementById("info").innerHTML += "<strong>" + stad[townID].stadname + "</strong>" + " är en stad med " + stad[townID].population + " invånare.";
}// end function town_btn

// lägger in besökta städer i localstorage
function besokt(value){
    
    besoktTown = value --- 1;
    var besoktaStader = JSON.parse(localStorage.getItem("id")) || [];
    besoktaStader.push(stad[besoktTown].id);
    localStorage.setItem("id", strfy()(besoktaStader));

    function strfy() {
        return JSON.stringify;
    }
    
}// end function besokt

// function besökta städer
function visited(){

    var visitedTowns = JSON.parse(localStorage.getItem("id")) || [];
    var people = 0;

    // här kollar jag om användaren har besökt någon stad
    if(visitedTowns <= 0){
        document.getElementById("bes").innerHTML = "Du har inte besökt någon stad än.";
    }else {
        document.getElementById("bes").innerHTML = "<b>Du har besökt:</b>";

        document.getElementById("rensa").innerHTML = "<hr><button onclick=\"check_del()\">Rensa listan</button>";
        visitedTowns.forEach(visitLista);
    }
    
    // denna function skriver ut en lista på städerna som är besökta och skriver ut antalet människor totalt
    function visitLista(value){
        document.getElementById("info").innerHTML = "";
        document.getElementById("besokKnapp").innerHTML = "";
        
        for (i = 0; i < stad.length; i++) {

            if (stad[i].id === value) {
                document.getElementById("bes").innerHTML += "<br>" + stad[i].stadname;
                people = people += stad[i].population;
            }      
        }
    }// end function

    if(visitedTowns != 0){
        document.getElementById("pop").innerHTML = "Du kan ha träffat <b>" + people + "</b> invånare.";
    }
    
}// end function visited

// här kollar jag med en alert om man vill rensa listan på städer
function check_del(){
    
    var check = confirm("Är du säker på att rensa hela listan ?");
    if (check == true) {
        clear_local();
    }
}

// här rensas listad med besökta städer
function clear_local(){
    document.getElementById("rensa").innerHTML = "";
    document.getElementById("bes").innerHTML = "";
    document.getElementById("pop").innerHTML = "<i>Listan rensas!</i>";
    setTimeout("location.href = '../Inlamning-Stader-och-lander/'",1500);
    localStorage.clear();
    
}