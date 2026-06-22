const { createCrudRouter } = require('./crudFactory');
const { calculateEngagementScore } = require('../utils/scoring');

module.exports = createCrudRouter({
  title: '互动记录管理',
  menuKey: 'interactions',
  tableName: 'interactions',
  idField: 'dataId',
  fields: [
    { name: 'interactionId', label: '互动记录ID', type: 'text', required: true },
    { name: 'userName', label: '用户名称', type: 'text', required: true },
    { name: 'interactionType', label: '互动类型', type: 'select', options: ['评论', '点赞', '转发', '私信', '购买', '浏览'] },
    { name: 'comments', label: '用户评论', type: 'textarea' },
    { name: 'interactionOutcome', label: '互动结果', type: 'select', options: ['正向', '中性', '负面', '转化'] },
    { name: 'userInterests', label: '用户兴趣', type: 'text' },
    { name: 'interactionDate', label: '互动日期', type: 'datetime-local' },
    { name: 'additionalNotes', label: '附加备注', type: 'textarea' },
    { name: 'interactionScreenshot', label: '互动截图', type: 'text' },
    { name: 'userEngagementScore', label: '参与度评分', type: 'number', computed: true },
  ],
  searchFields: ['userName', 'interactionType'],
  listColumns: ['dataId', 'interactionId', 'userName', 'interactionType', 'interactionOutcome', 'interactionDate', 'userEngagementScore'],
  scoreField: 'userEngagementScore',
  scoreFn: calculateEngagementScore,
});
