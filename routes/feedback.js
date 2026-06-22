const { createCrudRouter } = require('./crudFactory');

module.exports = createCrudRouter({
  title: '反馈收集管理',
  menuKey: 'feedback',
  tableName: 'feedback',
  idField: 'id',
  fields: [
    { name: 'userId', label: '用户ID', type: 'text', required: true },
    { name: 'userName', label: '用户姓名', type: 'text', required: true },
    { name: 'feedback_type', label: '反馈类型', type: 'select', options: ['投诉', '建议', '表扬', '咨询'] },
    { name: 'content', label: '反馈内容', type: 'textarea', required: true },
    { name: 'rating', label: '评分(1-5)', type: 'number' },
    { name: 'status', label: '处理状态', type: 'select', options: ['pending', 'resolved'] },
    { name: 'resolution', label: '处理结果', type: 'textarea' },
  ],
  searchFields: ['userName', 'feedback_type'],
  listColumns: ['id', 'userId', 'userName', 'feedback_type', 'rating', 'status', 'created_at'],
});
