import axios from "axios";

const axiosConfig = {
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
  withCredentials: true
};

// This needs work to be able to be used with non-trivial payloads
function urlEncode(data) {
  var urlEncodedString = "";
  Object.keys(data).forEach(function(key) {
    urlEncodedString += key + "=" + encodeURIComponent(data[key]) + "&";
  });
  return urlEncodedString.slice(0, -1); //remove the trailing '&'
}


export function _delete(endpoint) {
  return new Promise((resolve, reject) => {
    axios
      .delete(endpoint, axiosConfig)
      .then(response => {
        console.log("INFO: Response received for endpoint " + endpoint + ".");
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

/*
Default post function urlencodes payload. To prevent urlencoding, pass in additional parameter (keepDataAsIs) = true
*/
export function post(endpoint, payload, keepDataAsIs=false) {
  if (!keepDataAsIs) {
    payload = urlEncode(payload)
  }
  return new Promise((resolve, reject) => {
    axios
      .post(endpoint, payload, axiosConfig)
      .then(response => {
        console.log("INFO: Response received for endpoint " + endpoint + ".");
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

export function get(endpoint) {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint, axiosConfig)
      .then(response => {
        console.log("INFO: Response received for endpoint " + endpoint + ".");
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}
