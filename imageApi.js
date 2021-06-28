
const fetch=require("node-fetch")

const  getImage=(name)=>{
    return fetch(`https://pixabay.com/api/?key=17934990-29dfea74198181a2564acdc83&q=${name}&image_type=photo&pretty=true`)
    .then(res=>res.json())//Filter stage res->JSON
    .then(res=>{
        const data=res.hits
        const no=Math.floor(1 + Math.random() * 19)
        console.log(no)
        
        return data[no].largeImageURL
    }).catch((err)=>{
        console.log(err)
        return "https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1"
    })
}
module.exports =getImage