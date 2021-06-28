const fetch = require("node-fetch");

const getMeme = () => {
  return fetch(`https://api.covid19india.org/data.json`)
    .then((res) => res.json())
    .then((res) => {
      let l=res.cases_time_series.length;
      return res.cases_time_series[l-1];
    })
    .catch((err) => {
      console.log(err);
      return "https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1";
    });
};
module.exports = getMeme;