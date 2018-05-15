import React from 'react'
import ReactDOM from 'react-dom'

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2       // 注意 后面用到的 [name] 就是其中之一
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    /**
     * 通过对 target.type 的判断对不同的 input 状态进行赋值
     * [name] 的结果就是 isGoing,numberOfGuests 之一，这是 es6 的语法：属性计算
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value   // 注意这个语法， name 是一个变量，[name] 结果 就是属性名。isGoing 或者是 numberOfGuests
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}
  
ReactDOM.render(
    <Reservation />,
    document.getElementById('root')
);