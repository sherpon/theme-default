
/**
 * @function actionResponse
 * @param {string} text - user's message
 * @param {Number} action - action code
 * @param {string} url - current url
 * @param {uploadImageStore~callback} callback - The callback that handles the response.
 * @callback uploadImageStore~callback
 * @param {object} response - jordi response
 * @param {string} response.speech - jordi speech
 * @param {string[]} response.suggestions - jordi speech
 */
export const actionResponse = (text, action=null, url=null, callback) => {
  callback({ speech:'holaaaaa' })
}
