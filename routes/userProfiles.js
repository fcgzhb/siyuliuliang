const { createCrudRouter } = require('./crudFactory');
const { calculateUserValueScore } = require('../utils/scoring');

module.exports = createCrudRouter({
  title: '用户画像管理',
  menuKey: 'user-profiles',
  tableName: 'user_profiles',
  idField: 'dataId',
  fields: [
    { name: 'userId', label: '用户ID', type: 'text', required: true },
    { name: 'userName', label: '用户名', type: 'text', required: true },
    { name: 'email', label: '邮箱', type: 'text' },
    { name: 'gender', label: '性别', type: 'select', options: ['男', '女', '其他'] },
    { name: 'interests', label: '兴趣标签', type: 'text' },
    { name: 'registrationDate', label: '注册日期', type: 'date' },
    { name: 'userBio', label: '用户简介', type: 'textarea' },
    { name: 'purchaseHistory', label: '购买记录', type: 'textarea' },
    { name: 'userValueScore', label: '用户价值评分', type: 'number', computed: true },
  ],
  searchFields: ['userName', 'email'],
  listColumns: ['dataId', 'userId', 'userName', 'email', 'gender', 'registrationDate', 'userValueScore'],
  scoreField: 'userValueScore',
  scoreFn: calculateUserValueScore,
});
