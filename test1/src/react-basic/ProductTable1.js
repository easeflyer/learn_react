import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 项目分析参考：http://react.yubolun.com/docs/thinking-in-react.html
 * 第四步：确定你的 State 应该位于哪里
 * 第五步：添加反向数据流（从子组件，设置的数据，修改父组件的  state）
 */

// 产品分类 行，（只有 render 方法）
class ProductCategoryRow extends React.Component {
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}
// 产品行：根据库存显示不同颜色。（只有 render 方法）
class ProductRow extends React.Component {
    render() {
        // 能用 let 不用 var
        // 这里这是定义了一个 name 他的显示状态由 产品数据列 stocked 状态决定。如果没有库存则显示为红色。
        let name = this.props.product.stocked ?
            this.props.product.name :
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
// 产品表格。 子组件包含：产品行，产品分类行。
// 根据产品属性和用户选项，渲染所有行。（只有 render 方法）
class ProductTable extends React.Component {
    render() {
        var rows = []; // 用于保存 所有的组件行。数组可以直接输出
        var lastCategory = null;
        console.log(this.props.inStockOnly)
        this.props.products.forEach((product) => { // 遍历所有产品json数组
            /**
             * 条件分析：
             * 如果 用户输入的 fileterText 当前遍历的产品名不包含，则直接return，也就是当前行被过滤掉。
             * 或者 当前产品无库存 并且 用户选中了过滤掉无库存产品 则 return 过滤掉。
             */
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            // 如果 遍历的当前产品的分类，不等于之前产品的分类（也就是个新分类）则 加入“产品分类”行。
            // 第一次遍历时，因为lastCategory=null 因此首先会增加产品分类行。
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            // 添加产品行。
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category; //记录当前产品的分类
        });
        // 以上创建了表的所有行。下面直接渲染即可。
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
/**
 * 搜索框
 * 需要设置两个事件处理。
 *  1）用户输入变化时：调用父组件的处理函数，修改父组件 state
 *  2）用户点击instock复选框后：调用父组件处理函数，修改父组件state
 */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            // 输入框:注意value的值，因为每当用户输入后，则表单会刷新，因此这里必须给value 赋值。
            // onChange 事件处理 调用父组件的 事件处理函数，修改父组件的 state 触发重新渲染。复选框设置同理。
            <form>
                <input type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    &nbsp;{' '}Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
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

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);

/* 不同于以上案列的代码，同样的设计，不同的书写方法，仅供参考，去掉注释即可使用

var arr = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
//官网的黄色组件，最顶层组件
class Yellow extends React.Component {
    constructor(props) {
        super(props);
        this.state={search:"",check:false}
    }
    searchChange(val){
        this.setState({search:val})
    }
    checkChange(val){
        this.setState({check:val})
    }
    render() {
        return (
            <div>
                <Blue methods={this.searchChange.bind(this)}  check={this.state.check} changemethods={this.checkChange.bind(this)}/>
                <Green arr={this.props.arr} search={this.state.search} check={this.state.check}/>
            </div>
        )
    }
}
//上方蓝色输入框和单选框组件
class Blue extends React.Component {
    constructor(props) {
        super(props)
        
    }
    searchChange(e){
        this.props.methods(e.target.value)
    }
    checkChange(){
        this.props.changemethods(!this.props.check)
    }
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." onChange={this.searchChange.bind(this)} />
                <p>
                    <input type="checkbox" checked={this.props.check} onChange={this.checkChange.bind(this)}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}
//绿色框，选染列表的顶层组件
class Green extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <span>Name</span>
                <span>Price</span>
                <Red arr={this.props.arr} search={this.props.search} check={this.props.check}/>
            </div>
        )
    }
}
//商品分类标题组件
class ShadowGreen extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <p>{this.props.text}</p>
    }
}
//渲染列表父组件，加上了商品列表标题
class Red extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {       
        const x = this.props.arr.concat().map((ele) => ele.category)       
        const cate = Array.from(new Set(x));
        return (
            <div>
                <ShadowGreen text={"sporting goods"} />
                <Redmin arr={this.props.arr} cate={cate[0]} search={this.props.search} check={this.props.check}/>
                <ShadowGreen text={"electronics"} />
                <Redmin arr={this.props.arr} cate={cate[1]} search={this.props.search} check={this.props.check}/>
            </div>
        )
    }
}
//渲染列表组件
class Redmin extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const search=this.props.search;
        const arr = this.props.arr.concat();
        var arrele = arr.filter((ele) => ele.category === this.props.cate&&ele.name.indexOf(search)>=0); 
        if(this.props.check){
            arrele=arr.filter((ele) => ele.category === this.props.cate&&ele.name.indexOf(search)>=0&&ele.stocked);
        }     
         
        const arreledom = arrele.map((ele) =>
            <li>
                <span>{ele.name}</span>
                <span>{ele.price}</span>
            </li>)
        return (
            <ul>{arreledom}</ul>
        )
    }
}
ReactDOM.render(
    <Yellow arr={arr} />,
    document.getElementById('app')
)
*/