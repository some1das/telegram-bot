const fetch = require("node-fetch");

const getMeme = () => {
  return fetch(`https://meme-api.herokuapp.com/gimme`)
    .then((res) => res.json())
    .then((res) => {
      return res.url;
    })
    .catch((err) => {
      console.log(err);
      return "https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1";
    });
};
module.exports = getMeme;