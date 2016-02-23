import React, { Component, PropTypes } from 'react'

class Create extends Component {
    render() {
        return (
          <section className='site-content create'>
            <form action="/api/create" method='post'>
                <label htmlFor="title">标题</label>
                <input type="text" id='title' name='title'/>
                <label htmlFor="content">内容</label>
                <textarea name="content" id="content" cols="200" rows="10"></textarea>
                <input type="submit" value='发送'/>
            </form>
          </section>
        )
    }
}

export default Create
