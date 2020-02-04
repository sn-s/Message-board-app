import firebase from "../../config/fbConfig";
const db = firebase.firestore();

// check if user is signed in
export const authCheck = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        localStorage.setItem("authUser", JSON.stringify(user)) 
        dispatch({type: "AUTH_CHECK", payload: user.uid})
      } 
    })
  }
}

// get auth data function
const getAuthDataFunction = (id, dispatch) => {
  db
      .collection("users")
      .doc(id)
      .get()
      .then((snapshot) => {
        localStorage.setItem("authData", JSON.stringify(snapshot.data()))
        dispatch({type: "GET_AUTH", payload: snapshot.data()})
      })
      .catch(err => {
        console.log(err)
      })
}

// get authenticated user data
export const getAuthData = (id) => {
  return (dispatch) => {
    getAuthDataFunction(id, dispatch)
  }
}

// sign up user
export const signUp = (credentials, history) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        db
          .collection("users")
          .doc(user.user.uid)
          .set({
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            initials: credentials.firstName[0] + credentials.lastName[0],
            dateOfBirth: credentials.dateOfBirth.split('-').reverse().join('-'),
            city: credentials.city,
            occupation: credentials.occupation
        })
        dispatch({type: "SIGNUP_SUCCESS", payload: user, initials: credentials.firstName[0] + credentials.lastName[0]})
        // localStorage.setItem("initials", JSON.stringify(credentials.firstName[0] + credentials.lastName[0]))
        return user;
      })
      .then((user) => {
        getAuthDataFunction(user.user.uid, dispatch)
      })
      .then(() => { 
        history.push("/")
      })
      .catch(err => {
        dispatch({type: "SIGNUP_ERROR", err: err})
      })
  }
};

// sign in user
export const signIn = (credentials, history) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        db.collection("users").doc(user.user.uid).get().then(doc => {
          dispatch({type: "SIGNIN_SUCCESS", payload: doc.data(), initials: doc.data().initials})
          // localStorage.setItem("initials", JSON.stringify(doc.data().initials))
        })
        return user;
      })
      .then((user) => {
        getAuthDataFunction(user.user.uid, dispatch)
      })
      .then(() => {
        history.push("/")
      })
      .catch(err => {
        dispatch({type: "SIGNIN_ERROR", err: err})
      })
  }
}

// sign out user
export const signOut = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("authUser")
        localStorage.removeItem("authData")
        dispatch({type: "SIGNOUT_SUCCESS", payload: "user signed out"})
      })
      .then(() => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }
};

// update user data
export const updateUser = (credentials) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;

    const updateUserFunction = (key, value) => {
      db.collection("users").doc(user.uid).update({
        [key]: value
      })
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 500);
        })
        .catch((err) => {
          console.log(err)
        })
    }
       if(credentials.firstName) updateUserFunction("firstName", credentials.firstName)
       if(credentials.lastName) updateUserFunction("lastName", credentials.lastName)
       if(credentials.dateOfBirth) updateUserFunction("dateOfBirth", credentials.dateOfBirth.split('-').reverse().join('-'))
       if(credentials.city) updateUserFunction("city", credentials.city)
       if(credentials.occupation) updateUserFunction("occupation", credentials.occupation)
  }
};

// reauthenticate user 
const reauthenticate = (oldPassword) => {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);

  return user.reauthenticateWithCredential(cred);
}

// update email
export const updateEmailFunction = ( oldPassword, newEmail) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;

    reauthenticate(oldPassword)
      .then(() => {
        user.updateEmail(newEmail).then(() => {
          const user = firebase.auth().currentUser;
          db.collection("users").doc(user.uid).update({
            email: newEmail
          })
          .then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 500);
          })
        }).catch((err) => {
          dispatch({type: "EMAIL_ERROR", err: err})
        })
      })
      .catch(err => {
        dispatch({type: "PASSWORD_ERROR", err: err})
      })
  }
};

// update password
export const updatePasswordFunction = (oldPassword, newPassword) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;

    reauthenticate(oldPassword)
      .then(() => {
        user.updatePassword(newPassword).then(() => {
          console.log("Password was updated")
        })
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 500);
        })
        .catch((err) => {
          dispatch({type: "PASSWORD_ERROR", err: err})
        })
      })
      .catch(err => {
        dispatch({type: "PASSWORD_ERROR", err: err})
      })
  }
};

// delete user account
export const deleteUser = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    db.collection("users").doc(user.uid).delete()
    .then(() => {
      firebase.auth().signOut()
    })
    .then(() => {
      localStorage.removeItem("authUser")
      localStorage.removeItem("authData")
    })
    .then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    })
    .catch(err => {
      console.log(err)
    })
  }
};