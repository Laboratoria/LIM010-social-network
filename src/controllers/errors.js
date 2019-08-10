export default (code) => {
  const errorContainer = document.getElementById('error');
  let errorMessage;
  switch (code) {
    // errores de auth -* creando usuario *-
    case 'auth/invalid-email':
      errorMessage = 'Lo sentimos, el email ingresado es inválido o ya está registrado';
      break;

    case 'auth/email-already-in-use':
      errorMessage = 'Whoops! El email que intentas ingresar ya está registrado';
      break;

      // errores de auth -*login*-

    case 'auth/user-disabled':
      errorMessage = 'Whoops! El usuario asociado a este email se encuentra deshabilitado';
      break;

    case 'auth/user-not-found':
      errorMessage = 'El email ingresado no se encuentra registrado';
      break;
    case 'auth/wrong-password':
      errorMessage = 'Contraseña incorrecta, intenta nuevamente';
      break;

    default:
      break;
  }
  errorContainer.innerHTML = errorMessage;
};
