import React, {Component, PropTypes} from 'react'

class About extends Component {
    render() {
        return (
            <section className='site-content-main about'>
                <h3>关于我</h3>
                <p>
                    姓名：张源滨
                    <br/>
                    学校：广东工业大学
                    <br/>
                    班级：电子信息工程4班
                    <br/>
                    联系：zybbyzaa@163.com
                    <br/>
                </p>
                <h3>关于网站</h3>
                <p>
                    本博客网站使用nodejs为后端服务器，通过koajs与mongodb读取后台数据提供给前台页面进行渲染，前端使用reactjs进行组件开发，并利用redux对应用数据进行管理，使用webpack对静态资源进行打包压缩
                </p>
            </section>
        )
    }
}

export default About
