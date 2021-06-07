import React from "react"
import "./BottomNav.css"
import img1 from '../../assets/1.png'
import img2 from '../../assets/2.png'
import img3 from '../../assets/3.png'
import { connect } from "react-redux"

class BottomNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="bottom">
                <div className="bottom-box">
                    <div className="imgBox">
                        <img src={img1} alt="" />
                        <img src={img2} alt="" />
                        <img src={img3} alt="" />
                    </div>
                    <div className="text">
                        <a href="javascript">关于腾讯 |</a>
                        <a href="javascript">About Tencent |</a>
                        <a href="javascript">服务协议 |</a>
                        <a href="javascript">隐私政策 |</a>
                        <a href="javascript">开放平台 |</a>
                        <a href="javascript">广告服务 |</a>
                        <a href="javascript">腾讯招聘 |</a>
                        <a href="#javascript">腾讯公益 |</a>
                        <a href="javascript">客服中心 |</a>
                        <a href="javascript">网站中心 |</a>
                        <a href="javascript">网站导航</a>
                        <div className="copy">Copyright © 1998 - 2021 Tencent. All Rights Reserved</div>
                        <div className="ban">
                            <span>腾讯公司</span>&nbsp;
                            <span>版权所有</span>
                        </div>
                    </div>
                 

                </div>
            </div>

        )
    }
}
// 导出
export default connect(state => {
    return {

    }
}, disptch => {
    return {

    }
})(BottomNav)