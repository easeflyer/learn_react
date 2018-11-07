import { get, set, observable, values, autorun } from "mobx"


/**
 * 这里使用 observable.object 或者直接用 observable都可以
 * @observable 用在实例字段 或者属性的 geter 函数上。
 * autorun 会返回一个清理函数，用来清理autorun
 */
const twitterUrls = observable.object({
  "John": "twitter.com/johnny"
})

autorun(() => {
  console.log(get(twitterUrls, "Sara")) // get 可以追踪尚未存在的属性
})

const clrAutorun = autorun(() => {
  console.log("All urls: " + values(twitterUrls).join(", "))
})

set(twitterUrls, { "Sara": "twitter.com/horsejs" })
twitterUrls['ease'] = "www.ushow.org"; // 可以不用set 设置。直接修改即可。

clrAutorun(); // 清理
twitterUrls['other'] = "不会被输出"; // autorun 已经被清理。
twitterUrls['Sara'] = "Sara会被输出";