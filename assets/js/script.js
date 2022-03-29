var btnSearch = document.querySelector('#btn-search');
var sectionSearch = document.querySelector('#section-search');
var textboxSearch = document.querySelector('#textbox-search');

var omdbApiKey="ef78856e";
var omdbUrl ="https://www.omdbapi.com/?apikey=" + omdbApiKey + "&type=movie&s=";
var omdb1 = "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&i=tt1285016"
btnSearch.addEventListener('click',searchMovie);
textboxSearch.addEventListener('keyup', toggleSearchButton);

function toggleSearchButton(){
    textboxSearch.value.length>0 ? btnSearch.disabled=false :btnSearch.disabled=true;
}

function searchMovie(event){
    event.preventDefault();
    omdbSearch(textboxSearch.value);

    sectionSearch.setAttribute('class','hero');
}

function omdbSearch(movieTitle){
    fetch(omdbUrl + movieTitle).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            if (data['Response']==='False'){
                console.log("Not Found");
                Bulma().alert({
                    type: 'danger',
                    title: 'This is an alert!',
                    body: 'Ooohh what button you gonna click?',
                    confirm: 'Confirm it!',
                    cancel: 'Maybe not'
                });
            }
          });
        } else {
            
        }
      });
    
}


btnSearch.disabled = true;