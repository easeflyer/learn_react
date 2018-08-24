// import React from 'react';
// // 普通 UI 组件 
// const Products = (props) => (
//   <h2>List of Products</h2>
// );

// export default Products;

// 以上为原始状态
// ---------------------------------------------------------------------------


/**
 * Products 是一个纯 UI 组件？ 是一个混合组件，因为发送了 Action 用到了 redux
 */
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
// 这个写法可读性不好。下面做一些改进。

// export default connect(({ products }) => ({
//   products,
// }))(Products);

/**
 * 这样改进后 也是3行语句，但是可读性好了很多。
 * 中间的部分就是
 * 语法解析：({ products }) => ({ products, })
 * 前面是参数，因此加小括号。里面转入的是 state ,利用析构赋值 抽取出了 products
 */
export default connect(
  ({ products }) => ({ products, })
)(Products);



// 下面这个更清晰
// const  mapStateProps =(state)=>{
//     return {
//         products:state.products
//     }
// }

// export default connect(mapStateProps)(Products)
