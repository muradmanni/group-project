var btnSearch = document.querySelector('#btn-search');
var sectionSearch = document.querySelector('#section-search');
var textboxSearch = document.querySelector('#textbox-search');

btnSearch.addEventListener('click',searchMovie);
textboxSearch.addEventListener('keyup', check);

function check(){
    console.log("Murad" + textboxSearch.value.length);
    textboxSearch.value.length>0 ? btnSearch.disabled=false :btnSearch.disabled=true;
    
}

function searchMovie(event){
    event.preventDefault();
    console.log("hello");

    sectionSearch.setAttribute('class','hero');
}

btnSearch.disabled = true;