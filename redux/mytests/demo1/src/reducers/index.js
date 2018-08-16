/**
 * reducer 出入口
 * 进入：prestate,action
 * 返回：nextstate 
 */

export default (state=0,action)=>{
    switch(action.type){
        case 'INCREASE':
            return state + 1;
        case 'DECREASE':
            return state - 1;
        default:
            return state;
    }
}