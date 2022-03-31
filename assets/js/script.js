// --------------------   VARIABLES DECLARED  -----------------------
var btnSearch = document.querySelector("#btn-search");
var sectionSearch = document.querySelector("#section-search");
var textboxSearch = document.querySelector("#textbox-search");
var sectionPaginationClick = document.getElementsByTagName("section");


var omdbApiKey="ef78856e";
var omdbUrl ="https://www.omdbapi.com/?apikey=" + omdbApiKey + "&type=movie&s=";
var omdbSingleSearchUrl = "https://www.omdbapi.com/?apikey=" + omdbApiKey + "&i="

var pageNumber;
var totalPages;
var totalMovies;
var currentPage;

btnSearch.addEventListener("click",searchMovie);
textboxSearch.addEventListener("keyup", toggleSearchButton);
document.addEventListener("click",check);

function toggleSearchButton(){
    var totalChild = document.body.children.length;
    textboxSearch.value.length>0 ? btnSearch.disabled=false :btnSearch.disabled=true;
}

function searchMovie(event){
    event.preventDefault();
    omdbSearchTitle(textboxSearch.value,1);

    
    sectionSearch.setAttribute("class","hero");
}

function omdbSearchTitle(movieTitle,page){
    
    fetch(omdbUrl + movieTitle + "&page=" + page).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if (data["Response"]==="False"){
                console.log("Not Found");
                //CHANGE console log to MODAL display
            }
            else{
                showSearchResult(data);
            }
          });
        } else {
            //if response not ok have to show error in modal
        }
      });
}

function omdbGetSingleMovieDetails(omdbid){
    fetch(omdbSingleSearchUrl+ omdbid).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if (data["Response"]==="False"){
                console.log("Not Found");
                //CHANGE console log to MODAL display
            }
            else{
                //console.log(data);
            }
          });
        } else {
            //if response not ok have to show error in modal
        }
      });
}

function showSearchResult(data){
    //console.log(data);
    // var totalChild = document.body.children.length;
    // console.log("before creating : " + document.body.children.length);
    //
    var sectionMovieResultPre = document.querySelector("#section-movie-result");
    const t = document.body.getElementsByClassName("display-result");
    if (sectionMovieResultPre !== null)
    {   
        document.body.removeChild(sectionMovieResultPre);
       // alert("i am in");

        var sectionPagination = document.querySelector("#section-pagination");
        if (sectionPagination!==null)
        {
            document.body.removeChild(sectionPagination);

        }
    }
    totalMovies=data["totalResults"];
    calculateTotalPages(totalMovies);
    

    var sectionMovieResult=document.createElement("section");
    sectionMovieResult.setAttribute("id","section-movie-result")
    sectionMovieResult.className= "hero display-result center-please";
    
    //console.log(sectionMovieResult.getAttribute('id'));
    var searchMovieDivContainer=document.createElement ("div");
    searchMovieDivContainer.className= "container is-fluid";
    var searchMovieDivContainerColumn = document.createElement("div");
    searchMovieDivContainerColumn.className = "columns is-multiline is-centered";
        
    for (var i=0; i< data["Search"].length; i++)
    {
        // -------------------- GET VALUES --------------------
        var poster = (data['Search'][i]['Poster']);
        var movieTitle =(data['Search'][i]['Title']);
        if (poster==="N/A")
        {
            poster="./assets/images/image-not-available.jpg";
        }
    
        omdbGetSingleMovieDetails(data['Search'][i]['imdbID']);



        // ------------------- GENERATE RESULT AND SHOW -------------------
        var divOutBox = document.createElement("div");
        divOutBox.className="column is-3-fullhd  is-3-desktop is-6-tablet is-12-mobile";
        var divInsideBox = document.createElement("div");
        divInsideBox.className="notification is-primary has-text-centered";

        var imgMovieImage = document.createElement("img");
        imgMovieImage.setAttribute("src",poster);

        var h3MovieTitle = document.createElement("h3");
        h3MovieTitle.className = "title is-6";
        h3MovieTitle.textContent = movieTitle;

        divInsideBox.appendChild(imgMovieImage);
        divInsideBox.appendChild(h3MovieTitle);
        divOutBox.appendChild(divInsideBox);

        searchMovieDivContainerColumn.appendChild(divOutBox);
    }
    searchMovieDivContainer.appendChild(searchMovieDivContainerColumn);
    sectionMovieResult.appendChild(searchMovieDivContainer);
    document.body.appendChild(sectionMovieResult);

    //console.log("after creating : " + document.body.children.length);
}

function calculateTotalPages(totalMovies){
    totalPages = Math.floor(totalMovies / 10);
    

    if (totalMovies%10>0)
    {
        totalPages++;
    }
    
    if (totalPages>1)
    {
        generatePagination();
    }
    console.log("TOtal Movies " + totalMovies + "     totalPages " +totalPages);
}

function generatePagination(){
    var loopStartingInt;
    pageNumber=parseInt(localStorage.getItem("currentPage"));
    
    if (isNaN(pageNumber))
    {
        pageNumber=1;
    }

    console.log(pageNumber);
    var sectionPagination =document.createElement("section");
    sectionPagination.setAttribute("id","section-pagination");

    var navElement = document.createElement("nav");
    navElement.className="pagination is-centered";
    navElement.setAttribute("role","navigation");
    
    var ulElement = document.createElement("ul");
    ulElement.className="pagination-list";

    var liElement;
    var aElement;

    var showPages;
    totalPages>7 ? showPages=7 : showPages=totalPages;
    
    liElement = document.createElement("li");            
    aElement=document.createElement("a");
    aElement.className="pagination-link";
    aElement.setAttribute("data-label","1");
    aElement.textContent=1;
    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);

    switch (pageNumber)
    {
        case 2:
        case 1:
            loopStartingInt=2;
            break;
        case totalPages:
        case totalPages-1:
            loopStartingInt=totalPages-3;
            break;
        default:
                loopStartingInt=pageNumber-1;
            
    }
    //alert("Page number is = " + pageNumber + "    Loop start Int is " + loopStartingInt);
    
    if (pageNumber>3){
        liElement = document.createElement("li");
        aElement=document.createElement("a");
        aElement.className="pagination-ellipsis";
        aElement.textContent="...";
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }
        for(var i=loopStartingInt; i<(loopStartingInt+3); i++){    
                liElement = document.createElement("li");            
                aElement=document.createElement("a");
                aElement.className="pagination-link";
                aElement.setAttribute("data-label",i);
                aElement.textContent=i;
            
            liElement.appendChild(aElement);
            ulElement.appendChild(liElement);
        }
    
    if (pageNumber<(totalPages-2)){
        liElement = document.createElement("li");
        aElement=document.createElement("a");
        aElement.className="pagination-ellipsis";
        aElement.textContent="...";
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    }

    liElement = document.createElement("li");            
    aElement=document.createElement("a");
    aElement.className="pagination-link";
    aElement.setAttribute("data-label",totalPages);
    aElement.textContent=totalPages;
    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);


    navElement.appendChild(ulElement);
    sectionPagination.appendChild(navElement);
    document.body.appendChild(sectionPagination);
}


function check(event){
    //console.log(event.target);
    if((event.target).className==="pagination-link")
    {
        if (typeof(parseInt((event.target).textContent))==="number")
        {
            pageNumber=(event.target).textContent
            omdbSearchTitle(textboxSearch.value,pageNumber);
        }
    }
    localStorage.setItem("currentPage",pageNumber);
    
}

btnSearch.disabled = true;

function getDoesTheDogDie(event){
    event.preventDefault();
    fetch('https://www.doesthedogdie.com/dddsearch?q=titanic', {
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': 'aac874006225112ce8148d43228142c5',
        }
    }).then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
            });
          } 
          });    
}

