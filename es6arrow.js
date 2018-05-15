var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this 仍然指向 obj 而不是 函数自身了。
        return fn();
    }
};
age = obj.getAge(); 
console.log(age);


var people=['Wayou','John','Sherlock'];
function sayHello(people1,people2,people3){
    console.log(333);
    console.log(`Hello ${people1},${people2},${people3}`);
}
//改写为
sayHello(...people);//输出：Hello Wayou,John,Sherlock 
//sayHello(people[0],people[1],people[2])