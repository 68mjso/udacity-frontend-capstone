const serverURL = "http://localhost:8000";

function searchCity(input) {
  return new Promise((resolve, reject) => {
    fetch(`${serverURL}/search-city?input=${input}`)
      .then((res) => {
        if (res.status !== 200) {
          return null;
        }
        return res.json();
      })
      .then(function (res) {
        resolve(res);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}
function convertMiliToDay(diff) {
  return Math.ceil(diff / 24 / 60 / 60 / 1000);
}
// Export the handleSubmit function
export { convertMiliToDay, searchCity };
