import firebase from "../../config/fbConfig";
const db = firebase.firestore();

// Get messages from firestore
export const getFirestore = () => {
  return (dispatch) => {
    db
    .collection("messages")
    .orderBy("createdAt", "desc")
    .get()
    .then(snapshot => {
      let arr = [];
      snapshot.forEach(doc => {
        arr.push({data: doc.data(), id: doc.id})
      })
      dispatch({type: "GET_MESSAGES", payload: arr})
    })
    .catch(err => {
      console.error(err)
    })
  }
};

// Add new message to firestore
export const addMessage = (input) => {
  return (dispatch, getState) => {
    const profile = getState().auth.userData
    const authorId = JSON.parse(localStorage.getItem("authUser")).uid
    db
    .collection("messages")
    .add({
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      title: input.title,
      content: input.content,
      authorId: authorId,
      createdAt: new Date()
    })
    .then(message => {
      dispatch({type: "CREATE_MESSAGE", message: message})
    })
    .catch(err => {
      console.error(err)
    })
  }
};

// Delete message from firestore 
export const deleteMessage = (id) => {
  return (dispatch) => {
    db.collection("messages").doc(id).delete()
      .then(() => {
        dispatch({type: "DELETE_MESSAGE"})
      })
      .catch((err) => {
        console.log(err)
      })
  }
};

// Add comment to firestore 
export const addComment = (cred) => {
  return (dispatch) => {
    db.collection("comments").doc().set({
      firstName: cred.firstName,
      lastName: cred.lastName,
      comment: cred.comment,
      commentId: cred.id,
      createdAt: new Date()
    })
    .then(() => {
      dispatch({type: "ADD_COMMENT"})
    })
    .then(() => {
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
  }
};

// Get comments from firestore
export const getComments = () => {
  return (dispatch) => {
    db.collection("comments")
      .orderBy("createdAt", "desc")
      .get()
      .then(snapshot => {
        let arr = []
        snapshot.forEach((doc) => {
          arr.push({data: doc.data(), id: doc.id})
        })
        dispatch({type: "GET_COMMENTS", payload: arr})
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// get notifications from firestore
export const getNotificationsData = () => {
  return (dispatch) => {
    getNotifications(dispatch)
  }
}

const getNotifications = (dispatch) => {
  db
    .collection("notifications")
    .orderBy("time", "desc")
    .limit(5)
    .get()
    .then(snapshot => {
      let arr = []
      snapshot.forEach(doc => {
        arr.push({data: doc.data(), id: doc.id})
      })
      return dispatch({type: "GET_NOTIFICATIONS", payload: arr})
    })
}