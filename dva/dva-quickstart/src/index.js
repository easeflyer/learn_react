import dva from 'dva';
import './index.css';

// 1. Initialize
//const app = dva();
const app = dva({
  initialState: {
    products: [
      { name: 'dva', id: 1 },
      { name: 'antd', id: 2 },
    ],
  },
});
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);

// 4. Router  .default 什么意思？ 为什么要这么个语法？ require
app.router(require('./router').default);

// 5. Start
app.start('#root');
