import React from 'react';
import ReactDOM from 'react-dom';

//当一些组件，功能相同，模式相似，结构对等的时候，我们创建一个高阶组件来处理，会显得更加方便
//实际上高阶组件就是一个函数，将组件穿进去，他会返回一个新的组件
//MIXMIN混入曾经是一个解决办法，但会产生其他问题
//vue中同样有混入功能，把一些复用的组件选项，声明周期函数组合起来，在需要的地方复用

// 函数接受一个组件参数和数据源参数
/*
function withSubscription(WrappedComponent, selectData) {
    // ……返回另一个新组件……
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }

        componentDidMount() {
            // ……注意订阅数据……
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // ……使用最新的数据渲染组件
            // 注意此处将已有的props属性传递给原组件
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}*/

//我们来看看高阶组件是如何工作的
//首先定义一个普通组件
//如果你直接渲染它，页面不会有什么内容
class Person extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div></div>
    }
}

//我们定义一个高阶组件,接受一个组件和参数
function advance(Person, dataprops) {
    return class Hoc extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            return (
                <React.Fragment>
                    <Person></Person>
                    <h2>hello!</h2>
                </React.Fragment>
            )
        }
    }
}
//用高阶组件对原组件进行强化，
const Persons = advance(Person)
//此时页面就会出现，Hello
ReactDOM.render(<Persons />, document.getElementById('root'));

//你不仅仅可以在高阶组件里面添加新的元素，还可以添加公有方法，生命周期函数等
//让需要这些的组件经过高阶函数修改后，重新引用，可以避免代码重复

//当然我们应该遵循一些原则，比如，高阶组件意在抽离公有部分的逻辑，你不应该对原组件大量的修改，
//应当采用组合的方式包裹原组件，将需要更改和传送的数据通过props传递给包裹组件。
/*render() {
  // 过滤掉与高阶函数功能相关的props属性，
  // 不再传递
  const { extraProp, ...passThroughProps } = this.props;

  // 向包裹组件注入props属性，一般都是高阶组件的state状态
  // 或实例方法
  const injectedProp = someStateOrInstanceMethod;

  // 向包裹组件传递props属性
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}*/


