const { createCrudRouter } = require('./crudFactory');

module.exports = createCrudRouter({
  title: '营销策略管理',
  menuKey: 'marketing-strategy',
  tableName: 'marketing_strategies',
  idField: 'id',
  fields: [
    { name: 'strategy_name', label: '策略名称', type: 'text', required: true },
    { name: 'description', label: '策略描述', type: 'textarea' },
    { name: 'strategy_type', label: '策略类型', type: 'select', options: ['促销', '拼团', '推荐奖励', '会员日', '节日活动', '其他'] },
    { name: 'target_group', label: '目标群体', type: 'text' },
    { name: 'start_date', label: '开始日期', type: 'date' },
    { name: 'end_date', label: '结束日期', type: 'date' },
    { name: 'budget', label: '预算(元)', type: 'number' },
    { name: 'expected_roi', label: '预期ROI', type: 'number' },
    { name: 'actual_roi', label: '实际ROI', type: 'number' },
    { name: 'status', label: '状态', type: 'select', options: ['draft', 'active', 'paused', 'completed'] },
  ],
  searchFields: ['strategy_name', 'status'],
  listColumns: ['id', 'strategy_name', 'strategy_type', 'target_group', 'start_date', 'status', 'budget'],
});
