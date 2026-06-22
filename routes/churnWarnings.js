const { createCrudRouter } = require('./crudFactory');
const { calculateChurnRisk } = require('../utils/scoring');

module.exports = createCrudRouter({
  title: '流失预警管理',
  menuKey: 'churn-warnings',
  tableName: 'churn_warnings',
  idField: 'id',
  fields: [
    { name: 'userId', label: '用户ID', type: 'text', required: true },
    { name: 'userName', label: '用户名', type: 'text', required: true },
    { name: 'risk_level', label: '风险等级', type: 'select', options: ['low', 'medium', 'high'] },
    { name: 'last_active_date', label: '最后活跃日期', type: 'date' },
    { name: 'reason', label: '预警原因', type: 'textarea' },
    { name: 'status', label: '处理状态', type: 'select', options: ['pending', 'handled', 'ignored'] },
    { name: 'handle_notes', label: '处理备注', type: 'textarea' },
    { name: 'risk_score', label: '流失风险评分', type: 'number', computed: true },
  ],
  searchFields: ['userName', 'status'],
  listColumns: ['id', 'userId', 'userName', 'risk_level', 'last_active_date', 'risk_score', 'status'],
  scoreField: 'risk_score',
  scoreFn: calculateChurnRisk,
});
