var btnSearch = document.querySelector('#btn-search');
var sectionSearch = document.querySelector('#section-search');
var textboxSearch = document.querySelector('#textbox-search');

var omdbApiKey="ef78856e";
var omdbUrl ="https://www.omdbapi.com/?apikey=" + omdbApiKey + "&type=movie&s=";
var omdb1 = "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&i=tt1285016"
btnSearch.addEventListener('click',searchMovie);
textboxSearch.addEventListener('keyup', toggleSearchButton);

var pageNumber;
var totalPages;
var totalMovies;

function toggleSearchButton(){
    textboxSearch.value.length>0 ? btnSearch.disabled=false :btnSearch.disabled=true;
}

function searchMovie(event){
    event.preventDefault();
    omdbSearch(textboxSearch.value,2);

    
    sectionSearch.setAttribute('class','hero');
}

function omdbSearch(movieTitle,page){
    console.log(omdbUrl + movieTitle + "&page=" + page);
    fetch(omdbUrl + movieTitle + "&page=" + page).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if (data['Response']==='False'){
                console.log("Not Found");
            }
            else{
                showSearchResult(data);
            }
          });
        } else {
            
        }
      });
    
}

function showSearchResult(data){
    console.log(data);
    totalMovies=data['totalResults'];
    calculateTotalPages(totalMovies);


}

function calculateTotalPages(totalMovies){
    totalPages = Math.floor(totalMovies / 10);
    

    if (totalMovies%10>0)
    {
        totalPages++;
    }
    
    console.log("TOtal Movies " + totalMovies + "     totalPages " +totalPages);
}

btnSearch.disabled = true;

