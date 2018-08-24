import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Product from './Product'

/**
 * 产品列表  路由组件
 * ！！注意只有通过 Route path=  componet={Products} 加载的组件，才有 match
 * 因此本组件不能被直接渲染。必须被路由组件包裹渲染。
 * 
 * 分析总结：
 *    从以上特点应该考虑到。路由组件和路由机制具有耦合性。因此什么样的组件应该
 *    用路由组件，什么样的组件不用？ 和页面跳转相关的，或者应用组件切换逻辑相关的
 *    考虑用路由组件，然而其他大多数的其他组件，应该尽可能不用路由组件。增加复用性。
 */
const Products = ({ match }) => {

  const productsData = [
    {
      id: 1,
      name: 'NIKE Liteforce Blue Sneakers',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie.',
      status: 'Available'

    },
    {
      id: 2,
      name: 'Stylised Flip Flops and Slippers',
      description: 'Mauris finibus, massa eu tempor volutpat, magna dolor euismod dolor.',
      status: 'Out of Stock'

    },
    {
      id: 3,
      name: 'ADIDAS Adispree Running Shoes',
      description: 'Maecenas condimentum porttitor auctor. Maecenas viverra fringilla felis, eu pretium.',
      status: 'Available'
    },
    {
      id: 4,
      name: 'ADIDAS Mid Sneakers',
      description: 'Ut hendrerit venenatis lacus, vel lacinia ipsum fermentum vel. Cras.',
      status: 'Out of Stock'
    },

  ];  // Create an array of `<li>` items for each product
  // linkList 产品链接 列表 li
  var linkList = productsData.map((product) => {
    return (
      <li>
        <Link to={`${match.url}/${product.id}`}>
          {product.name}
        </Link>
      </li>
    )

  })
  /**
   * <Route path={`${match.url}/:productId`}
   * 产品详情 组件
   * 注意 render 和 componet 都会 通过 props 接收到 match 对象。这里 match对象
   * 又通过 ...props 传递给了 Product 组件。
   * 
   * 分析理解：
   * Products/1,2 时本组件被渲染。渲染子组件 Product 添加 data 属性，合并其他 props
   * Product 收到 data 数据（所有产品的数据）利用下面的语句抽取单个产品：
   * product = data.find(p => p.id == match.params.productId);
   * 
   * 
   * <Route exact path={match.url}
   * 提示信息，注意 match.url 则随本组件一起显示。因为match.url 就是 /Products
   * 注意 exact 参数，精确匹配，如果有产品的时候，则此路由不渲染。
   * 
  */
  return (
    <div>
      <div>
        <div>
          <h3> Products--</h3>
          <ul> 
            {linkList} 
            <li><Link to={`${match.url}/5`}>无此产品</Link></li>
          </ul>
        </div>
      </div>
      <Route path={`${match.url}/:productId`}
        render={(props) => <Product data={productsData} {...props} />} />
      <Route exact path={match.url}
        render={() => (
          <div>Please select a product.</div>
        )}
      />
    </div>
  )
}

export default Products;