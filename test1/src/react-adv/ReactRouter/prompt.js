import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";


//功能解析，输入内容，再点击one or two前往路由，就会弹出是否前往，，不输入内容，或者提交，功能会取消
const PreventingTransitionsExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Form</Link>
        </li>
        <li>
          <Link to="/one">One</Link>
        </li>
        <li>
          <Link to="/two">Two</Link>
        </li>
      </ul>
      <Route path="/" exact component={Form} />
      <Route path="/one" render={() => <h3>One</h3>} />
      <Route path="/two" render={() => <h3>Two</h3>} />
    </div>
  </Router>
);

class Form extends React.Component {
//状态，是否弹出信息
  state = {
    isBlocking: false
  };

  render() {
    const { isBlocking } = this.state;

    return (
      <form
      //调提交就不会弹出信息
        onSubmit={event => {
          event.preventDefault();
          event.target.reset();
          this.setState({
            isBlocking: false
          });
        }}
      >
        {/*弹出信息组件*/}
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />

        <p>
          Blocking?{" "}
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </p>

        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            //输入内容就可以弹出信息
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              });
            }}
          />
        </p>

        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
    );
  }
}

ReactDOM.render(
    <PreventingTransitionsExample />,
    document.getElementById('root')
)