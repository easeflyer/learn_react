class TestThis{
    constructor(){
        this.v1 = 11;
        this.v2 = 22;
    }
    func1(){
        console.log(this.v1);
    }
    func2(){
        this.func1();
    }
}


obj1 = new TestThis();

obj1.func1()
obj1.func2()