const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
  
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');

})

for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url)
      .then(res => res.json())
      .then(pokemon => {
        console.log(pokemon);
      });
  }