{
    test: /\.css$/,
    use: [
             {
               loader: "style-loader"
             }, {
               loader: "css-loader",
               options: {
                   modules: true, // 指定启用css modules
                   localIdentName: '[name]_[local]_[hash:base64:5]' // 指定css的类名格式
                   }
               }
         ],
  },