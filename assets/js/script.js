var btnSearch = document.querySelector('#btn-search');
var sectionSearch = document.querySelector('#section-search');
var textboxSearch = document.querySelector('#textbox-search');

var omdbApiKey="ef78856e";
var omdbUrl ="https://www.omdbapi.com/?apikey=" + omdbApiKey + "&type=movie&page=2&s=";
var omdb1 = "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&i=tt1285016"
btnSearch.addEventListener('click',searchMovie);
textboxSearch.addEventListener('keyup', toggleSearchButton);

function toggleSearchButton(){
    textboxSearch.value.length>0 ? btnSearch.disabled=false :btnSearch.disabled=true;
}

function searchMovie(event){
    event.preventDefault();
    var omdb = omdbSearch(textboxSearch.value);

    sectionSearch.setAttribute('class','hero');
}

function omdbSearch(movieTitle){
    fetch(omdb1).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
    
          });
        } else {
          return "error";
        }
      });
    
}


btnSearch.disabled = true;