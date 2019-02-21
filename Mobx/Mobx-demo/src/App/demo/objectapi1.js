import { withRouter } from 'react-router-dom';
import React from 'react';
import { observable, when, computed, autorun, action,get,values,set } from 'mobx';
import { inject, observer,Provider } from 'mobx-react';


/**
 * 注意 mobx5 版本后，不使用 set get 一样可以。
 */

class ObjectState {
  @observable twitterUrls = {
    "John": "twitter.com/johnny"
  }
  constructor(){
    this.start();
  }

  start() {
    autorun(() => {
      console.log('追踪新加入的数据1：',this.twitterUrls['Sara1']); // get 可以追踪尚未存在的属性
    });
    autorun(() => {
      console.log('追踪新加入的数据2：',this.twitterUrls['Sara2']); // get 可以追踪尚未存在的属性
    });

    autorun(() => {
      console.log("All urls: " + values(this.twitterUrls).join(", "));
    })
  }
  @action.bound
  add(){
    this.twitterUrls["Sara2"] = "twitter.com/horsejs";
  }
}

const App = inject('store')(({store})=>{
  return(
    <div>
      <input type='button' defaultValue='确定' onClick={store.add} />
    </div>
  );
})

export default ()=>
  <Provider store={new ObjectState}>
    <App />
  </Provider>