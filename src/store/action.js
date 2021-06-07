import axios from "axios"


function getWeather(content) {
    // body
    return {
        type: "GET_WEATHER",
        content
    }
}

function getWeatherList() {
    return dispatch=>{
        var  p = new Promise(function (resolve,reject) {
          axios.get("/myApi/9-2/",{
              params:{
                showapi_appid:"539387",
                showapi_sign:"96626ba162df4dc2a65811e9bb0a38d8",
                
              }
            
          }).then(res=>{
              resolve(res.data)
              console.log(res.data);
          })
        })
        p.then(res=>{
            dispatch(getWeather(res))
        })
    }
  

}


// "/myApi/showapi_appid=539387&showapi_sign=96626ba162df4dc2a65811e9bb0a38d8"


    export {
        getWeather,
        getWeatherList
    }