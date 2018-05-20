const DataSource = {
    listener:[],
    getBlogPost:function(id){
        return {id:1,title:'post title'}
    },
    getComments:function(postid){
        return [{id:1,text:'comment1'},
                {id:2,text:'comment2'}];
    },
    addChangeListener:function(func){
        this.listener.append(func);
    },
    dataChange:function(){
        this.listener.forEach((func)=>func());
    }
}

class BlogPost extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        blogPost: DataSource.getBlogPost(props.id)
      };
    }
  
    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }
  
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }
  
    handleChange() {
      this.setState({
        blogPost: DataSource.getBlogPost(this.props.id)
      });
    }
  
    render() {
      return <TextBlock text={this.state.blogPost} />;
    }
  }

  class CommentList extends React.Component {
    constructor() {
      super();
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        // "DataSource" 就是全局的数据源
        comments: DataSource.getComments()
      };
    }
  
    componentDidMount() {
      // 添加事件处理函数订阅数据
      DataSource.addChangeListener(this.handleChange);
    }
  
    componentWillUnmount() {
      // 清除事件处理函数
      DataSource.removeChangeListener(this.handleChange);
    }
  
    handleChange() {
      // 任何时候数据发生改变就更新组件
      this.setState({
        comments: DataSource.getComments()
      });
    }
  
    render() {
      return (
        <div>
          {this.state.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }
  }

  const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
  );
  
  const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
  );

  // 函数接受一个组件参数……
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
  }