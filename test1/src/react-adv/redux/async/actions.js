import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

//选择options，初始值是reactjs
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

//
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

//发送请求
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}
//接受请求
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,//选择主题
    posts: json.data.children.map(child => child.data),//接收的数据
    receivedAt: Date.now()//接收时间，将会被保存为上次的请求时间
  }
}
//请求函数，参数是选择主题，来源于state
function fetchPosts(subreddit) {
  return dispatch => {
    /*发送器发送requestPosts到reducers，type为REQUEST_POSTS,调用posts函数，返回
    subreddit：{
        isFetching: true,//是不是正在请求
        didInvalidate: false
      }*/
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      //数据转化为json
      .then(response => response.json())
      /*响应成功后，将响应后的数据通过发送器receivePosts提交至reducers，type为RECEIVE_POSTS，寓意为接受成功
      修改state为
      subreddit：{
        isFetching: false,//请求成功，正在请求的状态结束
        didInvalidate: false,
        items: action.posts,//真实数据
        lastUpdated: action.receivedAt//上次请求时间
      } */
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
//是否发送请求判断函数，主要是看postsBySubreddit状态里面是不是已经存了东西。
function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    //选择主题没有请求过，就要返回true，
    return true
  } else if (posts.isFetching) {
    //已经请求过了，更换选择主题就不会再次请求
    return false
  } else {
    return posts.didInvalidate
  }
}
//发送请求，更新state
export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}