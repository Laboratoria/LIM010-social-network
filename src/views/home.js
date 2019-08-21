import { template } from '../utils.js';
import {
  addPost, deletePost, getPost, editTextPost,
} from '../models/posts.js';

export default (username) => {
  const welcomeMsg = `<nav role="navigation">
  <div class="burger">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
  </div>

  <div class="xs-hide">
    <a href="#/profile"> ${username}</a>
  </div>

  <div class="logo">
    <h4>Poetik</h4>
  </div>

  <ul class="nav-links xs-hide">
    <li>
      <a href="#/sign-out">
        <img src="/src/img/logout.png" alt="cerrar sesión" class="sign-out-icon"> Cerrar sesión</a>
    </li>
  </ul>

</nav>

<div class="burger-menu" id="menu">
  <ul>
    <li>
      <a href="#/profile"> ${username}</a>
    </li>
    <li>
      <a id="sign-out">
        <img src="/src/img/logout.png" alt="cerrar sesión" class="sign-out-icon"> Cerrar sesión</a>
    </li>

  </ul>
</div>

<div class="home-container">

  <div class="left">
    <p>¡Bienvenidx, ${username}!</p>
  </div>


  <div class="right">

    <div class="new-post-container">

      <textarea type="text" id="post-text" placeholder="¿Qué quieres compartir?" class="input-post"
        required></textarea>
      <button id="button-post" class="buttons btn-post">Compartir</button>
    </div>

  </div>`;
  document.getElementById('root').classList.remove('container');
  template(welcomeMsg);


  const btnPost = document.getElementById('button-post');
  const addPostOnSubmit = (evt) => {
    evt.preventDefault();
    const { uid } = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(() => {
      if (uid) {
        const inputText = document.getElementById('post-text');
        addPost(inputText.value, uid);
        inputText.value = '';
      }
    });
  };

  btnPost.addEventListener('click', addPostOnSubmit);

  const createPostView = (name, title, postId) => {
    const contentPost = `<div class="post-container">
    <div class="post-header">
      <span class="post-user">${name}</span>
      <span class="post-title">${title}</span>
    </div>
    <textarea type="text" id="${postId}" class="post" disabled>hola hola</textarea>
    <div class="post-footer">
      <button id="like${postId}" class="buttons btn-likes">

        <svg width="29" height="29">
          <g fill-rule="evenodd">
            <path
              d="M13.74 1l.76 2.97.76-2.97zM16.82 4.78l1.84-2.56-1.43-.47zM10.38 2.22l1.84 2.56-.41-3.03zM22.38 22.62a5.11 5.11 0 0 1-3.16 1.61l.49-.45c2.88-2.89 3.45-5.98 1.69-9.21l-1.1-1.94-.96-2.02c-.31-.67-.23-1.18.25-1.55a.84.84 0 0 1 .66-.16c.34.05.66.28.88.6l2.85 5.02c1.18 1.97 1.38 5.12-1.6 8.1M9.1 22.1l-5.02-5.02a1 1 0 0 1 .7-1.7 1 1 0 0 1 .72.3l2.6 2.6a.44.44 0 0 0 .63-.62L6.1 15.04l-1.75-1.75a1 1 0 1 1 1.41-1.41l4.15 4.15a.44.44 0 0 0 .63 0 .44.44 0 0 0 0-.62L6.4 11.26l-1.18-1.18a1 1 0 0 1 0-1.4 1.02 1.02 0 0 1 1.41 0l1.18 1.16L11.96 14a.44.44 0 0 0 .62 0 .44.44 0 0 0 0-.63L8.43 9.22a.99.99 0 0 1-.3-.7.99.99 0 0 1 .3-.7 1 1 0 0 1 1.41 0l7 6.98a.44.44 0 0 0 .7-.5l-1.35-2.85c-.31-.68-.23-1.19.25-1.56a.85.85 0 0 1 .66-.16c.34.06.66.28.88.6L20.63 15c1.57 2.88 1.07 5.54-1.55 8.16a5.62 5.62 0 0 1-5.06 1.65 9.35 9.35 0 0 1-4.93-2.72zM13 6.98l2.56 2.56c-.5.6-.56 1.41-.15 2.28l.26.56-4.25-4.25a.98.98 0 0 1-.12-.45 1 1 0 0 1 .29-.7 1.02 1.02 0 0 1 1.41 0zm8.89 2.06c-.38-.56-.9-.92-1.49-1.01a1.74 1.74 0 0 0-1.34.33c-.38.29-.61.65-.71 1.06a2.1 2.1 0 0 0-1.1-.56 1.78 1.78 0 0 0-.99.13l-2.64-2.64a1.88 1.88 0 0 0-2.65 0 1.86 1.86 0 0 0-.48.85 1.89 1.89 0 0 0-2.67-.01 1.87 1.87 0 0 0-.5.9c-.76-.75-2-.75-2.7-.04a1.88 1.88 0 0 0 0 2.66c-.3.12-.61.29-.87.55a1.88 1.88 0 0 0 0 2.66l.62.62a1.88 1.88 0 0 0-.9 3.16l5.01 5.02c1.6 1.6 3.52 2.64 5.4 2.96a7.16 7.16 0 0 0 1.18.1c1.03 0 2-.25 2.9-.7A5.9 5.9 0 0 0 23 23.24c3.34-3.34 3.08-6.93 1.74-9.17l-2.87-5.04z">
            </path>
          </g>
        </svg>

      </button>
    </div>
  </div>

</div>`;
    return (contentPost);
  };
  
  const showPost = async () => {
    const arr = await getPost();
    // console.log(arr[2]);
    for (let i; i < arr.length; i += 1) {
      console.log(arr[i].nameUser);
    }
  };
  showPost();
};
