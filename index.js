var containerForm = document.querySelector('.container__form');
// for animation
containerForm.addEventListener('click', () => containerForm.style.paddingTop = "5rem");

window.addEventListener('load', ()=> alert('THIS IS NOT RESPONSIVE :-('));

var input = document.querySelector('.inp');

var loadera = document.querySelector('.table-container');

var hiton = document.querySelector('.icon');

var displayResults = function(results) {

const searchResults = document.querySelector('.table-container');

searchResults.innerHTML = '';

// loop over result
results.forEach(result => {
//result here represents each object in our array
	
	 const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
	 searchResults.insertAdjacentHTML('beforeend', 
		 		`			<table>
		 					<th>
		 					<a href="${url}" target="_blank" rel="noopener">${result.title} &rarr;</a>
		 					</th>
		 					<tr>
		 					<td>${result.snippet}</td>
		 					</tr>
		 					</table>`
	 	);
});
};


// fatching data from url
var fetchData =  (searchQuery) => {
	const res = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
	
	fetch(res).then(response => response.json())
	
	.then(data => {

		const results = data.query.search;
		displayResults(results);
		clearLoader();
	})

	.catch(() => {
		clearLoader();
		alert('Error :-(')
		
		}

)};


var handleClicked = (event) => {
	
	let inputValue = input.value;
	// Prevent page from loading when clicked
	event.preventDefault();


renderLoader(loadera);
	// remove the white space
	let searchQuery = inputValue.trim();

	fetchData(searchQuery);
	inputValue.innerHTML = '';
}

input.addEventListener('keypress', (e)=> {
		if(e.which === 13){
		let inputValue = input.value;
		// Prevent page from loading when clicked
		event.preventDefault();

		// for loading animation

		renderLoader(loadera);

		// remove the white space
		let searchQuery = inputValue.trim();

		fetchData(searchQuery);
		inputValue.innerHTML = '';
		}; 

});

hiton.addEventListener('click', handleClicked);

function renderLoader(parent) {
	const loader = '<div class="loader"></div>';
	parent.insertAdjacentHTML('afterbegin', loader);
};

 function clearLoader() {
  const loader = document.querySelector('.loader');
    if (loader) loader.parentElement.removeChild(loader);
};