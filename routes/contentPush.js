const { createCrudRouter } = require('./crudFactory');

module.exports = createCrudRouter({
  title: '内容推送管理',
  menuKey: 'content-push',
  tableName: 'content_push',
  idField: 'id',
  fields: [
    { name: 'title', label: '内容标题', type: 'text', required: true },
    { name: 'content', label: '内容详情', type: 'textarea' },
    { name: 'push_type', label: '推送类型', type: 'select', options: ['文章', '视频', '优惠券', '活动通知', '图文'] },
    { name: 'target_audience', label: '目标受众', type: 'text' },
    { name: 'push_date', label: '推送日期', type: 'datetime-local' },
    { name: 'push_status', label: '推送状态', type: 'select', options: ['draft', 'sent', 'cancelled'] },
    { name: 'read_count', label: '阅读量', type: 'number' },
    { name: 'click_count', label: '点击量', type: 'number' },
  ],
  searchFields: ['title', 'push_status'],
  listColumns: ['id', 'title', 'push_type', 'target_audience', 'push_date', 'push_status', 'read_count'],
});
