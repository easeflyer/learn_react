import { observable, action, computed, autorun } from 'mobx';
//import agent from '../agent';
import { trace } from 'mobx';

class TestStore{
  @observable v1 = 'aa';
  @observable v2 = 'bb';
  @computed get v3(){
    return this.v1+this.v2
  }
  autoEnd = autorun(()=>{
    trace(true);
    console.log('v3:',this.v3)
  });

  @action.bound
  setV1(){
    this.v1 = 'aaaa';
  }
  @action.bound
  setV2(){
    this.v2 = 'bbbb';
    this.autoEnd();
  }


}

export default new TestStore();