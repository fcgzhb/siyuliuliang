function calculateUserValueScore(data) {
  let score = 0;
  if (data.email) score += 10;
  if (data.userBio && data.userBio.length > 10) score += 10;
  if (data.purchaseHistory && data.purchaseHistory.length > 0) score += 20;
  const interests = (data.interests || '').split(/[，,、]/).filter(Boolean);
  score += Math.min(interests.length * 5, 25);
  if (data.registrationDate) {
    const months = (Date.now() - new Date(data.registrationDate).getTime()) / (1000 * 60 * 60 * 24 * 30);
    score += Math.min(Math.round(months), 35);
  }
  return Math.min(score, 100);
}

function calculateEngagementScore(data) {
  let score = 50;
  if (data.interactionOutcome === '正向') score += 20;
  else if (data.interactionOutcome === '转化') score += 30;
  else if (data.interactionOutcome === '负面') score -= 10;
  if (data.additionalNotes && data.additionalNotes.length > 0) score += 10;
  if (data.interactionScreenshot && data.interactionScreenshot.length > 0) score += 10;
  return Math.min(Math.max(score, 0), 100);
}

function calculateChurnRisk(data) {
  let score = 0;
  if (data.last_active_date) {
    const daysInactive = (Date.now() - new Date(data.last_active_date).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.min(daysInactive * 0.5, 50);
  } else {
    score += 50;
  }
  if (data.reason && data.reason.length > 0) score += 10;
  return Math.min(Math.round(score), 100);
}

function calculateActivityEffectScore(data) {
  let score = 0;
  score += Math.min(parseInt(data.participantCount) || 0, 50);
  score += (parseFloat(data.conversionRate) || 0) * 50;
  if (data.userFeedback && data.userFeedback.length > 0) score += 10;
  if (data.successFactors && data.successFactors.length > 0) score += 10;
  return Math.min(Math.round(score), 100);
}

module.exports = {
  calculateUserValueScore,
  calculateEngagementScore,
  calculateChurnRisk,
  calculateActivityEffectScore,
};
