import { loginEmail, 
  loginFacebook,
  loginGoogle,
  loginRegister, 
  loginOut , 
  observador} from './control.js';

export const viewLogin = () => {
  event.preventDefault();
  const correo = document.getElementById('email').value;
  const contrasena = document.getElementById('password').value;
  const errores = document.getElementById('error');
  loginEmail(correo, contrasena)
    // .then(function () {
    //   observador();
    //   console.log('Bienvenido');
    //   //document.getElementById('root').innerHTML = 'hola';
    //   return changeRoute('#/home');
    // })
    .then((result) => {
      observador()

      console.log(result.user.emailVerified );
   
      if (result.user.emailVerified === false) {
        document.getElementById('error').innerHTML = 'No has verificado tu dirección de email';
      } else {
        return changeRoute('#/home');
      }
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      if(correo==='' || contrasena ===''){
        document.getElementById('error').innerHTML='Ingresa los campos completos';
      }
      else if(errorMessage){
        document.getElementById('error').innerHTML = 'La contraseña no es válida o el usuario no ha verificado su cuenta.';
      }
      //console.log(errorMessage);
      //console.log(errorCode);
    });
};

export const viewRegister = () => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginRegister(email, password)
  .then(function() {
  //   console.log(result.user.emailVerified );
  // observador()
  // if (result.user.emailVerified === false) {
  //   document.getElementById('error').innerHTML = 'No podemos encontrar una cuenta con ésta dirección de email';
  //else {
    if (name != '') {
      //console.log(user);
      const newName = MaysPrimera(name.toLowerCase());
      document.getElementById('screen-register').innerHTML = `
      <h1 class="register-ok">Foods Kids agradece tu registro ${newName}!</h1>
      <p class="ok">Verifica tu cuenta email para acceder a Foods Kids</p>
      <img src="./img/confeti.gif">
      <a class="ir-login" href="#/login" id="registrate">Ir a Log in</a>`;
    } else {
      document.getElementById('screen-register').innerHTML = `
      <h1 class="register-ok">Foods Kids agradece tu registro!</h1>
      <p class="ok">Verifica tu cuenta email para acceder a Foods Kids</p>
      <img src="./img/confeti.gif">
      <a class="ir-login" href="#/login" id="registrate">Ir a Log in</a>`;
    }
  })
  .catch(function (error) {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     if (errorMessage === 'The email address is badly formatted.') {
      document.getElementById('error').innerHTML = 'Completa correctamente los campos.'
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('email').classList.add('focus');
      document.getElementById('password').classList.add('focus');
     } else if (errorCode === 'auth/weak-password') {
      document.getElementById('error').innerHTML = 'La contraseña debe tener 6 caracteres o más.'
      document.getElementById('password').value = '';
      document.getElementById('email').classList.remove('focus');
      document.getElementById('password').classList.add('focus');
    } 
     //document.getElementById('error').innerHTML = errorMessage;
   });
}
const changeRoute = (route) => {
  location.hash = route;
};

const MaysPrimera = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const viewExit = () => {
  loginOut()
  .then(function() {
       // Sign-out successful.
       console.log('saliendo....')
       return changeRoute('#/login');
     }).catch(function(error) {
     // An error happened.
      console.log(error)
     });
}
export  const viewFacebook = () => {
  loginFacebook() 
  .then((response) => {
    console.log(response)
    return changeRoute('#/home');
  })
  .catch((error) => {
    console.log(error)
  });
}
export  const viewGoogle = () => {
  loginGoogle()
  .then((response) => {
    console.log(response)
    return changeRoute('#/home');
  })
  .catch((error) => {
    console.log(error)
  });
}
