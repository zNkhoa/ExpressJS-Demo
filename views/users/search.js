
var input = document.getElementById('search-item');
input.value = sessionStorage.getItem('draft');
input.addEventListener('change', updateSessionStorage);
function updateSessionStorage() {
	sessionStorage.setItem('draft', input.value);
}