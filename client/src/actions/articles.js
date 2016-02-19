import { ARTICLES_LOAD, ARTICLES_LOAD_SUCCESS, ARTICLES_LOAD_FAIL } from '../constants/articles'
import ajax from './apis'

export function load(callback) {
    return {
        types: [ARTICLES_LOAD, ARTICLES_LOAD_SUCCESS, ARTICLES_LOAD_FAIL],
        promise: ()=> {
            console.log('loading')
            return ajax({
                url: '/article',
                method: 'GET'
            })
        },
        after: ()=>{
            if (typeof callback === 'function') {
                callback()
            }
        },
        onData: result=>{
            const data = result.data

            return data
        },
        onError: error=>{
            const err = error.data.error || '加载文章失败 ——网络好像出现了问题'

            return err
        }
    }
}
