const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const createNotification = (notification) => {
  return admin.firestore()
    .collection("notifications")
    .add(notification)
      .then(doc => console.log("notification added", doc))
};

exports.messageCreated = functions.firestore
  .document("messages/{messageId}")
  .onCreate(doc => {

    const message = doc.data();
    const notification = {
      content: "Posted a new message",
      user: `${message.authorFirstName} ${message.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
});

exports.userJoined = functions.auth
  .user()
  .onCreate(user => {

    return admin.firestore().collection("users").doc(user.uid)
      .get()
        .then(doc => {
          const newUser = doc.data()
          const notification = {
            content: "Joined the message board",
            user: `${newUser.firstName} ${newUser.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
          }
          
          return createNotification(notification)
        })
});

exports.userDeleted = functions.firestore
  .document("users/{userId}")
  .onDelete(doc => {
    const userUid = doc.id

    return admin.auth().deleteUser(userUid)
      .then(() => console.log("Successfully deleted user"))
      .catch(err => console.log(err))
  })