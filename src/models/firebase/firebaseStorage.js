var firebase = require('./firebaseInit.js')();

/******************************************************************************/
/**
 * Upload the store's image
 * @param {File} file - store's id.
 * @param {string} fileName - image's name.
 * @param {string} storeId - store's id.
 * @param {uploadImageStore~callback} callback - The callback that handles the response.
 */
export const uploadPicture = ( file, fileName, storeId, callback ) => {

  if (file===undefined) {
    callback( null )
  } else {
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // get the extension
    var fileExtension = file.name.split('.').pop();

    // Create the file metadata
    var metadata = {
      contentType: 'image/' + fileExtension
    };

    var uploadTask = storageRef.child(`stores/${storeId}/${fileName}`).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log ( "firebase_storage.uploadPicture", "Upload is: ", progress, false);
        //console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log ( "firebase_storage.uploadPicture", "Upload is paused.", null, false);
            //console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log ( "firebase_storage.uploadPicture", "Upload is running.", null, false);
            //console.log('Upload is running');
            break;
        }
      }, function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log ( "firebase_storage.uploadPicture", "Error: ", error.code, false);
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
      callback( error.code );
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      callback( downloadURL );
    });
  }
}
/**
 * @callback uploadImageStore~callback
 * @param {string} downloadURL - picture's download url
 */
