import {combineReducers} from "redux"
// 使用仓库要把仓库事先配置好

// reducers里面写状态，，actions里面写具体的函数方法

function getWeather (state=[],action) {
    // body
    switch (action.type) {
        case "GET_WEATHER":
            return action.content
        default:
            return state
    }
}




let reducer=combineReducers({
    getWeather

})

export default reducer