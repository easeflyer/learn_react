/**
 * 产品详情 组件
 * 重点需要关注：如何匹配到一个具体的产品 productId
 * var product = data.find(p => p.id == match.params.productId);
 * Array.find(回调函数) 回调函数返回 true 的第一条数据被保留。
 * 
 * 组件逻辑：
 * 如果有 product 则构造界面渲染。
 * 如果没有 则输出 提示。
 */
import React from 'react'

const Product = ({ match, data }) => {
  var product = data.find(p => p.id == match.params.productId);
  var productData;

  if (product)
    productData = <div>
      <h3> {product.name} </h3>
      <p>{product.description}</p>
      <hr />
      <h4>{product.status}</h4>  </div>;
  else
    productData = <h2> Sorry. Product doesnt exist </h2>;

  return (
    <div>
      <div>
        {productData}
      </div>
    </div>
  )
}

export default Product;