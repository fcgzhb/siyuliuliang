function getPagination(page, totalItems, pageSize) {
  const p = Math.max(1, parseInt(page) || 1);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  return {
    currentPage: p,
    offset: (p - 1) * pageSize,
    limit: pageSize,
    totalPages,
  };
}

module.exports = { getPagination };
