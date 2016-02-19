/**
 * Created by kee on 15/10/21.
 */
import axios from 'axios'
const host = __DEVELOPMENT__ ? '/api' : '//localhost:8089/api'

export default function apis({ url, method, ...others }) {
    return axios({
        url: host + url,
        method: method,
        ...others
    })
}
