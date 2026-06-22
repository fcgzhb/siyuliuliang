const { createCrudRouter } = require('./crudFactory');
const { calculateActivityEffectScore } = require('../utils/scoring');

module.exports = createCrudRouter({
  title: '活动效果管理',
  menuKey: 'activity-effect',
  tableName: 'activity_effects',
  idField: 'dataId',
  fields: [
    { name: 'activityName', label: '活动名称', type: 'text', required: true },
    { name: 'activityType', label: '活动类型', type: 'select', options: ['线上活动', '线下活动', '混合活动', '促销活动', '品牌活动'] },
    { name: 'participantCount', label: '参与人数', type: 'number' },
    { name: 'conversionRate', label: '转化率(%)', type: 'number' },
    { name: 'userFeedback', label: '用户反馈', type: 'textarea' },
    { name: 'successFactors', label: '成功因素', type: 'textarea' },
    { name: 'startDate', label: '开始日期', type: 'date' },
    { name: 'activityDescription', label: '活动描述', type: 'textarea' },
    { name: 'reportFile', label: '活动报告', type: 'text' },
    { name: 'activityEffectScore', label: '活动效果评分', type: 'number', computed: true },
  ],
  searchFields: ['activityName', 'activityType'],
  listColumns: ['dataId', 'activityName', 'activityType', 'participantCount', 'conversionRate', 'startDate', 'activityEffectScore'],
  scoreField: 'activityEffectScore',
  scoreFn: calculateActivityEffectScore,
});
