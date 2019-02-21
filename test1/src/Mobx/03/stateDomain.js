// 本文件只是讲解分析，无法运行

/**
 * State 可以分为两类 UiState 和 DomainState 也就是界面相关和业务逻辑相关或者叫
 * 领域相关
 * 
 * 业务逻辑相关的　State
 * 这个例子虽然不能运行，但是提供了一个 业务逻辑 State 的编写模板，可供参考。
 * 如何处理 传输层 transportLayer，store 属于模型层（业务模型）
 * 参考：https://cn.mobx.js.org/best/store.html 有很好的讲解。
 * 
 */

import {observable, autorun, computed, reaction} from 'mobx';
import uuid from 'node-uuid';

export class TodoStore {
    authorStore;
    transportLayer;
    @observable todos = [];
    @observable isLoading = true;

    constructor(transportLayer, authorStore) {
        this.authorStore = authorStore;         // 可以为我们提供 author 的 store
        this.transportLayer = transportLayer;   // 可以为我们发起服务端请求的东西
        this.transportLayer.onReceiveTodoUpdate(updatedTodo => this.updateTodoFromServer(updatedTodo));
        this.loadTodos();
    }

    /**
     * 从服务端拉取所有的 todo
     * 然后更新本地 Todo this.updateTodoFromServer(json)
     */
    loadTodos() {
        this.isLoading = true;
        this.transportLayer.fetchTodos().then(fetchedTodos => {
            fetchedTodos.forEach(json => this.updateTodoFromServer(json));
            this.isLoading = false;
        });
    }

    /**
     * 使用服务器中的信息更新 todo。保证一个 todo 只存在一次。
     * 可能构造一个新的 todo，更新现有的 todo,
     * 或删除 todo，如果它已经在服务器上被删除的话。
     */
    updateTodoFromServer(json) {
        var todo = this.todos.find(todo => todo.id === json.id);
        if (!todo) {
            todo = new Todo(this, json.id);
            this.todos.push(todo);
        }
        if (json.isDeleted) {
            this.removeTodo(todo);
        } else {
            todo.updateFromJson(json);
        }
    }

    /**
     * 在客户端和服务端都创建一个新的 todo
     */
    createTodo() {
        var todo = new Todo(this);
        this.todos.push(todo);
        return todo;
    }

    /**
     * 如果一个 todo 被删除了，将其从客户端内存中清理掉
     */
    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        todo.dispose();
    }
}

export class Todo {

    /**
     * todo 的唯一 id, 不可改变。
     */
    id = null;

    @observable completed = false;
    @observable task = "";

    /**
     * 引用一个 author 对象(来自 authorStore)
     */
    @observable author = null;

    store = null;

    /**
     * 指示此对象的更改是否应提交到服务器
     */
    autoSave = true;

    /**
     * 为自动存储此 Todo 的副作用提供的清理方法
     * 参见 @dispose.
     */
    saveHandler = null;

    constructor(store, id=uuid.v4()) {
        this.store = store;
        this.id = id;

        this.saveHandler = reaction(
            // 观察在 JSON 中使用了的任何东西:
            () => this.asJson,
            // 如何 autoSave 为 true, 把 json 发送到服务端
            (json) => {
                if (this.autoSave) {
                    this.store.transportLayer.saveTodo(json);
                }
            }
        );
    }

    /**
     * 在客户端和服务端中删除此 todo
     */
    delete() {
        this.store.transportLayer.deleteTodo(this.id);
        this.store.removeTodo(this);
    }

    @computed get asJson() {
        return {
            id: this.id,
            completed: this.completed,
            task: this.task,
            authorId: this.author ? this.author.id : null
        };
    }

    /**
     * 使用服务端信息更新此 todo
     */
    updateFromJson(json) {
        // 请确保我们的更改不会发送回服务器
        this.autoSave = false;
        this.completed = json.completed;
        this.task = json.task;
        this.author = this.store.authorStore.resolveAuthor(json.authorId);
        this.autoSave = true;
    }

    dispose() {
        // 清理观察者
        this.saveHandler();
    }
}



/**
 * React 优化建议
 * 参考：https://cn.mobx.js.org/best/react-performance.html
 * 
 * # 晚一点使用间接引用值
 * 
 * 运行快的:
 * <DisplayName person={person} />
 * 运行慢的:
 * <DisplayName name={person.name} />
 * 
 * 注意第一种情况，当 person.name 改变时，父组件不会从新渲染。然而第二种情况则会。
 * 因为第二种情况，直接使用了.name 的值。因此渲染量增大，造成相对比较慢。
 * 
 * 
 * # 尽早绑定函数

// 不好的：因为每次 render 都会产生新的闭包函数。
render() {
    return <MyWidget onClick={() => { alert('hi') }} />
}

// 好的方式： render 中不产生闭包函数。
render() {
    return <MyWidget onClick={this.handleClick} />
}

handleClick = () => {
    alert('hi')
}
 * 
 */
