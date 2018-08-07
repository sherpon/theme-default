var firebase = require('./firebaseInit.js')();
var Q = require('q');
var dateTime = require('node-datetime');

function makeRandomNameFile() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function uploadPicture ( pfile ) {
  //console.log ( "firebase_storage.uploadPicture", "START. pfile:", pfile, false);
  var deferred = Q.defer();

  if (pfile===undefined) {
    deferred.resolve( null )
  } else {
    // Create a root reference
    var storageRef = firebase.storage().ref();

    var file = pfile // use the Blob or File API

    // get the extension
    var fileExtension = file.name.split('.').pop();

    // begin to create new file's name
    var dt = dateTime.create();
    var newFileName = makeRandomNameFile();

    // Create the file metadata
    var metadata = {
      contentType: 'image/' + fileExtension
    };

    var uploadTask = storageRef.child(newFileName).put(file, metadata);

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
      deferred.reject( error.code );
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log ( "firebase_storage.uploadPicture.uploadTask.on().function()", "downloadURL:", downloadURL, false);

      deferred.resolve( downloadURL );
    });
  }

  //ref.put(file).then(function(snapshot) {
  //  console.log('Uploaded a blob or file!');
  //});
  return deferred.promise;
}

module.exports = {
  uploadPicture:uploadPicture
}