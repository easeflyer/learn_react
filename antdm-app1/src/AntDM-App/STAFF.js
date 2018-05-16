export default class STAFF {
    constructor(){
		//this.staff = this.genData(0);
		this.rData = STAFF.rawData;
		this.allData = this.rData;
		this.staff = {};
		this.staff = this.genData(0);
		this.allStaff = this.staff;
	}
	genData(pIndex){
		const dataBlobs = {};
		for(var i=0;i<10;i++){
			const ii = pIndex*10 + i;
			if(this.rData[i]===undefined) break;
			dataBlobs[`${ii}`] = this.rData[i];
		}
		//this.staff = {...this.staff,...dataBlobs};
		return dataBlobs;
		//console.log(this.staff);
		//return dataBlobs;
	}
	//筛选
	filtStaff = (filtType) => {
		this._filtStaff(filtType);
		// console.log('this.rData')
		// console.log(this.rData);
		this.staff = this.genData(0);
		console.log('this.staff')
		console.log(this.staff);
		return this;
	}
	sortStaff(sortType){
	    this._sortStaff(sortType);
		//this._filtStaff(this.filtType);
		//this._searchStaff(this.word);
		this.staff = this.genData(0);
		return this;
	}
	
	_filtStaff = (filtType) => {
	    this.filtType = filtType;
	    switch(parseInt(filtType)){
		    case 0: 
			    this.rData = this.allData;
				break;
			case 1: 
			    this.rData = this.allData.filter(item => {
				    return item.id == '主任';
				});
				break;
			case 2: 
			    this.rData = this.allData.filter(item => {
					//console.log(item.id);
				    return item.id == '老师';
				});
				break;
			case 3: 
			    this.rData = this.allData.filter(item => {
				    return item.id == '学生';
				});
				break;
			case 4: 
			    this.rData = this.allData.filter(item => {
				    return item.id == '实习';
				});
				//console.log(this.rData);
				break;
			default: break;
		}
	}
	//排序
	_sortStaff(sortType) {
	    this.sortType = sortType;
	    switch(parseInt(sortType)){
		    case 0: //身份
			    this.rData.forEach(item => {
				    switch(item.id) {
					  case '主任':
					      item.id = 1; break;
					  case '老师':
					      item.id = 2; break;	
					  case '学生':
					      item.id = 3; break;	
					  case '实习':
					      item.id = 4; break;
                      default: break;						  
					}
				});
				this.rData.sort(function(item1, item2){
				    if(item1.id < item2.id)
					    return -1;
					else if (item1.id > item2.id)
					    return 1;
					else 
					    return 0;
				});
			    this.rData.forEach(item => {
				    switch(item.id) {
					  case 1:
					      item.id = '主任'; break;
					  case 2:
					      item.id = '老师'; break;	
					  case 3:
					      item.id = '学生'; break;	
					  case 4:
					      item.id = '实习'; break;
                      default: break;						  
					}
				});
			    break;
			case 1: //年龄升
			    this.rData.sort(function(item1, item2){
				    if(item1.age < item2.age)
					    return -1;
					else if (item1.age > item2.age)
					    return 1;
					else 
					    return 0;
				});
				break;
			case 2: //年龄降
			    this.rData.sort(function(item1, item2){
				    if(item1.age < item2.age)
					    return 1;
					else if (item1.age > item2.age)
					    return -1;
					else 
					    return 0;
				});
				break;
			default: break;
		}
	}
	
		
}
// STAFF.rawData = [{ descrip:'我是一匹来自远方的狼。', sex: '男', age: 20, name: '张三', id: '主任'},
//                  { descrip:'我是一匹来自远方的狼。', sex: '女', age: 21, name: '赵静', id: '学生'},
// 				 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 22, name: '王二麻', id: '学生'},
// 				 { descrip:'我是一匹来自远方的牛。', sex: '男', age: 50, name: '赵六', id: '实习'},
// 				 { descrip:'我是一匹来自远方的马。', sex: '男', age: 60, name: '孙七', id: '实习'}];


STAFF.rawData = [{ descrip:'我是一匹来自远方的狼。', sex: '男', age: 20, name: '张三', id: '主任'},
                 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 21, name: '赵静', id: '学生'},
				 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 22, name: '王二麻', id: '学生'},
				 { descrip:'我是一匹来自远方的狼。', sex: '女', age: 24, name: '李晓婷', id: '实习'},
				 { descrip:'我是一匹来自远方的狼。', sex: '男', age: 23, name: '张春田', id: '实习'},
				 { descrip:'我是一匹来自远方的狼。', sex: '男', age: 22, name: '刘建国', id: '学生'},
				 { descrip:'我是一匹来自远方的狼。', sex: '男', age: 24, name: '张八', id: '主任'},
                 { descrip:'我是一匹来自远方的狗。', sex: '男', age: 35, name: '李四', id: '老师'},
				 { descrip:'我是一匹来自远方的猪。', sex: '男', age: 42, name: '王五', id: '学生'},
				 { descrip:'我是一匹来自远方的牛。', sex: '男', age: 50, name: '赵六', id: '实习'},
				 { descrip:'我是一匹来自远方的马。', sex: '男', age: 60, name: '孙七', id: '实习'}];				 