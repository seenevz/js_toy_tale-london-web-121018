const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toysUrl = 'http://localhost:3000/toys'
const toyDisplay = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE

const getToys = () => {

    fetch(toysUrl)
      .then((resp) => resp.json())
      .then(renderToys);
};

const postToy = () => {
  return fetch(toysUrl, {
    method: 'post',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(grabToy())
  }).then((resp) => resp.json());
};

const grabToy = () => {
  return obj = {
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0
    }
};

const renderToys = (toys) => {

    toys.forEach(toy => {
      createToyCard(toy)
    });
};

const createToyCard = (toy) => {
  const containerAnchor = document.querySelector('#toy-collection');
  const card = document.createElement('div')

  card.setAttribute('data-id', toy.id)
  // debugger
  // if (containerAnchor.contains(card)) {}
  card.className = 'card'
  card.innerHTML = `<h2>${toy.name}</h2><img class='toy-avatar' src=${toy.image}><p>Likes: ${toy.likes}</p><button class='like-btn'>Like!</button>`;
  containerAnchor.appendChild(card);
  
};

const getToy = (card) => {
  let toyUrl = `${toysUrl}/${card.dataset.id}`;
  let obj = null

  fetch(toyUrl)
    .then(resp =>resp.json())
    .then((jso) => {
      obj = jso;
      // debugger
      updateLikes(obj, card)
    });

};

const updateLikes = (toy, card) => {
  let patchUrl = `${toysUrl}/${toy.id}`;
  let updatedLikes = toy.likes + 1
  // debugger
    fetch(patchUrl, {
      method: 'PATCH',
      headers: { Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({likes: updatedLikes})
  })
    .then(resp => resp.json())
    card.querySelector('p').innerText = `Likes: ${updatedLikes}`

  };

const init = () => {
  getToys();

  addBtn.addEventListener('click', () => {
    addToy = !addToy

    if (addToy) {
      toyFormContainer.style.display = 'block'
    } else {
      toyFormContainer.style.display = 'none'
    };
  });

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()

    postToy()
      .then(createToyCard)
      toyForm.reset()
      toyFormContainer.style.display = 'none'
  });

  toyDisplay.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      const card = event.target.parentElement
      
      getToy(card);
      // debugger
    };
  });
  
};

init()
