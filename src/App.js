import {connect} from "react-redux"
import './App.css';
import React from "react"
import BottomNav from './components/BottomNav/BottomNav.jsx'
import HeaderNav from './components/HeaderNav/HeaderNav.jsx'

// 引入图标
import {} from '@ant-design/icons';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      WeatherList:[]
    }
  }
componentDidMount(){
     
}


  render(){
    return(
    <div className="APP"> 
      <HeaderNav/>

      <BottomNav/>

     
    </div>
    )
  }
}
let mapState=state=>{
  return{
  
   
  }
}

  let mapActions=dispatch=>{
    return{
     
     
  }
}

export default connect(mapState,mapActions)(App)
