import Firebase from '../config/Firebase.js';

var Email = Firebase.auth.currentUser;
console.log(Email);
Firebase.auth().onAuthStateChanged(user => {
    if (user)
      Email = user.email;
});

export default {
  Email,
}
