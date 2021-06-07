import React, { createRef } from "react"
import { connect } from 'react-redux'
import "./HeaderNav.css"
import imgs from '../../assets/QQ.png'
import {
    EnvironmentOutlined,
    RocketOutlined,
    // 飞机
    SendOutlined,
    // 水滴
    FireOutlined,
    // 指南针
    CompassOutlined,
    // 心
    HeartFilled,
    // 反转箭头
    SwapOutlined,
    // 左箭头
    LeftCircleOutlined ,
    // 右箭头
    RightCircleOutlined 
}
    from '@ant-design/icons'
import axios from "axios"
class HeaderNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: "河南 南阳",
            key: false,
            History: [],
            f1: [],
            timeFormat: "",
            HourList:[],
            f2: [],
            f3: [],
            WeatherList: [],
            AreaList: ["北京", "上海", "广州", "深圳", "天津", "西安", "武汉", "成都", "石家庄", "郑州", "哈尔滨", "太原", "乌鲁木齐", "济南", "福州", "日喀则", "厦门", "青岛", "扬州", "合肥", "重庆", "南昌", "唐山", "杭州", "邢台", "沈阳", "邯郸", "昆明"]
        }
        this.areas = createRef()
        this.father=createRef()

    }

    // 获取焦点显示展示栏
    componentDidMount() {
        //初始化城市  南阳
        this.getWeather("南阳")
        // 获取对应的24小时的天气
        this.getHourWeather("南阳")
       
    }
    // 展示
    Show = () => {
        this.setState({
            key: !this.state.key
        })

    }
    // 获取点击的城市
    GetAreas = (e) => {

        this.setState({
            area: e.target.dataset.item

        })
        // 将历史记录存进数组里面
        if (this.state.History.indexOf(e.target.dataset.item) === -1) {
            this.state.History.unshift(e.target.dataset.item)
        }
        this.setState({
            // 截取前四个
            History: this.state.History.slice(0, 4)
        })
        console.log(this.state.History);

        // 存入到  localStorage中
        if (!window.localStorage) {
            alert("您的浏览器不支持本地存储!")
            return
        } else {
            // 本地缓存
            // var storage=window.localStorage;
            // storage.setItem("history",this.state.History)
            // var s=  storage.getItem("history")
            // console.log(s);
            localStorage.setItem("history", this.state.History)

        }
        // 点击时调用城市
        this.getWeather(e.target.dataset.item)
        // 获取24小时的天气
        this.getHourWeather(e.target.dataset.item)



    }
    // 请求数据
    getWeather = (s) => {
        // 请求数据
        var p = new Promise(function (resolve, reject) {
            axios.get("/myApi/9-2/", {
                params: {
                    showapi_appid: "539387",
                    showapi_sign: "96626ba162df4dc2a65811e9bb0a38d8",
                    area: s
                }

            }).then(res => {
                resolve(res.data.showapi_res_body)

            })
        }.bind(this))
        p.then(res => {
            // console.log(res);
            this.setState({
                WeatherList: res,
                f1: res.f1,
                f2: res.f2,
                f3: res.f3
            })
            // console.log(this.state.WeatherList);
            console.log(this.state.f1);
        })
    }
    // 获取24小时的天气
    getHourWeather = (s) => {
        var p = new Promise(function (resolve, reject) {
            axios.get("/myApi/9-8/", {
                params: {
                    showapi_appid: "539387",
                    showapi_sign: "96626ba162df4dc2a65811e9bb0a38d8",
                    area: s
                }

            }).then(res => {
                resolve(res.data.showapi_res_body.hourList)

            })
        }.bind(this))
        p.then(res => {
            // console.log(res);
            this.setState({
               HourList:res
            })
            console.log(this.state.HourList);
        })
    }
    // 失去光标消失展示栏
    None = () => {
        this.setState({
            key: !this.state.key
        })
    }
    // 清除缓存
    onClear = () => {
        localStorage.removeItem("history")
        this.setState({
            History: []
        })
    }
    // 格式化时间
    // 202102191200
    TimeFormat = (s) => {
        var time = s.slice(8)
        var h = time.slice(0, 2)
        var m = time.slice(2)
        var timeF = h + ":" + m
        return timeF
    }
    // 左移动
    LeftMove=()=>{
      
        console.log( this.father);
        
    }

    render() {
        return (
            <div>
                {/* 头部导航 */}
                <div className="header">
                    <div className="content">
                        <img src={imgs} alt="腾讯天气" />
                        <div className="rightBox">
                            <EnvironmentOutlined className="zuobiao" />
                            <span className="txt area">{this.state.area}</span>
                            <span className="txt gz">[添加关注]</span>
                            <div className="inputBox">
                                <input type="text" onFocus={this.Show} onBlur={this.None} className="input" readOnly placeholder="搜索市，区，县等" />
                            </div>
                            <div className={`AreaList ${this.state.key === true && 'show'}`}>
                                <div className="s">当前定位</div>
                                <div className="p">{this.state.area}
                                    <EnvironmentOutlined /></div>
                                <div className={`s   ${this.state.History.length === 0 && "null"}`}>历史记录
                                <div className="clear" onClick={this.onClear}>清除</div>
                                    <div className="Areas">
                                        {
                                            this.state.History.map((a, k) => {
                                                return <p key={k} className={`a ${this.state.History.length === 0 && "null"}`}  >{a}</p>
                                            })
                                        }
                                    </div>
                                </div>
                                <div></div>
                                <div className="s">热门城市</div>

                                {
                                    this.state.AreaList.map((item, i) => {
                                        return <p className="m" ref={this.areas} onClick={this.GetAreas} data-item={item} key={i}>{item}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* 内容中心 */}
                <div className="tanner">
                    <div className="tan-Box">
                        <div className="time">中国气象台发布</div>
                        <div className="Detail">
                            <div className="D-left">
                                <span className="ts">{this.state.f1.day_air_temperature + "°"}</span>
                                <span className="as">{this.state.f1.day_weather}</span>
                                <span className="bs"> <RocketOutlined />紫外线 {this.state.f1.ziwaixian}</span>
                                <div>
                                    <span className="all"><SendOutlined />&nbsp; {this.state.f1.day_wind_direction + " " + this.state.f1.day_wind_power}</span>
                                    <span className="all"><FireOutlined /> &nbsp; 降水 {this.state.f1.jiangshui}</span>
                                    <span className="all"><CompassOutlined /> &nbsp; 气压 {this.state.f1.air_press}</span>
                                </div>
                                <div className="hao"><HeartFilled />&nbsp; 你若安好便是晴天 &nbsp;<SwapOutlined /></div>

                            </div>
                            <div className="D-right">
                                <img src={this.state.f1.day_weather_pic} alt="" />
                            </div>
                        </div>

                    </div>
                </div>
                 {/* 24小时天气 */}
                <div className="Hours">
                    <div className="top-box"><HeartFilled className="xin"/><span>逐小时预报</span>
                    <span className="shujv">数据来源于中国天气网</span>
                    <div className="move">
                    <LeftCircleOutlined  className="bow" onClick={this.LeftMove}/>&emsp;
                    <RightCircleOutlined className="bow"/>
        
                    </div>
                    </div>
                    <div className="hour-list">
                        <div className="father" ref={this.father}>
                        {
                            this.state.HourList.map((e,r)=>{
                                return  <div className="item" key={r}>
                                <p>{this.TimeFormat(e.time)}</p>
                                <p>{e.weather}</p>
                                <p>{e.temperature+"°"}</p>
                            </div>

                            })
                        }
                        </div>
                       
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {

    }
}, dispatch => {
    return {

    }

})(HeaderNav)