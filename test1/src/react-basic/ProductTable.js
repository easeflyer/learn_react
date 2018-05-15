import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 理解项目
 * 首先参考；http://react.yubolun.com/docs/thinking-in-react.html
 * 第一步：根据 UI 设计划分组件层级（父子组件）
 * 第二步：用 React 创建一个静态版本
 *      1）自顶向下，或者自底向上都可以，通常大项目先构造子组件。小应用可以从父组件开始。
 *      2）静态版本只使用props以及只有  render 方法。因为不需要交互。
 * 第三步：定义UI状态的最小表示（也就是说，我们需要几个state变量）
 * 第四步：确定state 应该位于哪里？
 *      1）确定谁需要这个state
 *      2) 确定他们的公共祖先
 */

//  产品分类 行
class ProductCategoryRow extends React.Component {
    render() {
        return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
}

// 产品 行
class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            // 注意 CSS 行内样式语法 是如何使用的。
            <span style={{ color: 'red' }}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}
/**
 * 产品表格 父组件
 * json 数据遍历和传递过程
 * 数据传递3 ： ProductRow
 * 注意:react渲染组件数组，直接输出即可。
*/
class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function (product) {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

// 搜索框
class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <p>
                    <input type="checkbox" />
                    {' '}
                    Only show products in stock
          </p>
            </form>
        );
    }
}

// 最外层组件
// 数据传递 2：ProductTable
class FilterableProductTable extends React.Component {
    render() {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
            </div>
        );
    }
}


var PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

// 数据传递1 ： FilterableProductTable
ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);
