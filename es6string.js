var string1 = 'food';
var substring1 = 'foo';

console.log(string1.indexOf(substring1) > -1);  // 判断 string1 是否包含 substring 如果 >-1 就是包含

// es6 语法
const string2 = 'food';
const substring2 = 'foo';

console.log(string2.includes(substring2)); // true


// es6 特殊字符串语法，使用起来非常方便。类似 python  ''' 
var text = "This string contains \"double quotes\" which are escaped.";
let text1 = `This string contains "double quotes" which don't need to be escaped anymore.`;

console.log(text)
console.log(text1)


// es6 支持模板变量如下，在 {} 中可以直接使用 表达式
const name = 'Tiger';
const age = 13;

console.log(`My cat is named ${name} and is ${age} years old.`);


var text11 = (
    'cat\n' +
    'dog\n' +
    'nickelodeon'
);
var text2 = [
    'cat',
    'dog',
    'nickelodeon'
].join('\n');
// es6 语法更加方便 简洁
let text3 = ( `es6      // 可以看到这里不能添加注释
cat
dog
nickelodeon`
);

console.log(text11)
console.log(text2)
console.log(text3)


// Destructuring Objects
// 解构对象

let luke = { occupation: 'jedi', father: 'anakin' };
let {occupation, father} = luke;

console.log(occupation); // 'jedi'
console.log(father); // 'anakin'