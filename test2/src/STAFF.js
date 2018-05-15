// 怎么感觉这里做了一件没有意义的事情呢？
// 要说有意义就是 用 类封装了一下，然后增加了一些类型判断。
// [正解]这里其实是在 模拟数据库。如果前段需要做一些数据处理。可以建立这样一个文件进行处理封装。

class staffItem {
    constructor(item) {
        this.info = {};
        this.info.name = item.name;
        this.info.age = item.age || 0;
        this.info.sex = item.sex;
        this.info.id = item.id;
        this.info.descrip = item.descrip || '';
        this.key = ++staffItem.key;
    }
}
staffItem.key = 0;

export default class STAFF {

    constructor() {
        this.allStaff = [
            new staffItem(STAFF.rawData[0]),
            new staffItem(STAFF.rawData[1]),
            new staffItem(STAFF.rawData[2]),
            new staffItem(STAFF.rawData[3]),
            new staffItem(STAFF.rawData[4]),
            new staffItem(STAFF.rawData[5]),
            new staffItem(STAFF.rawData[6]),
            new staffItem(STAFF.rawData[7]),
            new staffItem(STAFF.rawData[8]),
            new staffItem(STAFF.rawData[9]),
            new staffItem(STAFF.rawData[10])
        ];
        // 为什么有allStaff 还要有 staff ，其实这里目的是为了以后排序搜索等进行临时存储。模拟数据库操作。
        this.staff = this.allStaff;
    }
    //增
    addStaffItem(item) {
        let newItem = new staffItem(item);
        this.allStaff.push(newItem);
        this.staff = this.allStaff;
        return this;
    }

}

STAFF.rawData = [{ descrip: '我是一匹来自远方的狼。', sex: '男', age: 20, name: '张三', id: '主任' },
                { descrip: '我是一匹来自远方的狼。', sex: '女', age: 21, name: '赵静', id: '学生' },
                { descrip: '我是一匹来自远方的狼。', sex: '女', age: 22, name: '王二麻', id: '学生' },
                { descrip: '我是一匹来自远方的狼。', sex: '女', age: 24, name: '李晓婷', id: '实习' },
                { descrip: '我是一匹来自远方的狼。', sex: '男', age: 23, name: '张春田', id: '实习' },
                { descrip: '我是一匹来自远方的狼。', sex: '男', age: 22, name: '刘建国', id: '学生' },
                { descrip: '我是一匹来自远方的狼。', sex: '男', age: 24, name: '张八', id: '主任' },
                { descrip: '我是一匹来自远方的狗。', sex: '男', age: 35, name: '李四', id: '老师' },
                { descrip: '我是一匹来自远方的猪。', sex: '男', age: 42, name: '王五', id: '学生' },
                { descrip: '我是一匹来自远方的牛。', sex: '男', age: 50, name: '赵六', id: '实习' },
                { descrip: '我是一匹来自远方的马。', sex: '男', age: 60, name: '孙七', id: '实习' }];