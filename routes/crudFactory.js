const express = require('express');
const db = require('../db');
const config = require('../config');
const { getPagination } = require('../utils/pagination');

/**
 * CRUD Factory - creates standard routes from a module config.
 *
 * moduleConfig shape:
 * {
 *   title:        string          page heading
 *   menuKey:      string          sidebar active key
 *   tableName:    string          SQL table name
 *   idField:      string          primary key column name
 *   fields:       [{name, label, type, required, options, computed}]
 *   searchFields: [string]        columns to search
 *   listColumns:  [string]        columns to show in table
 *   scoreField:   string|null      field to auto-compute
 *   scoreFn:      function|null    scoring function
 *   beforeCreate: function|null    hook before insert
 *   beforeUpdate: function|null    hook before update
 * }
 */
function createCrudRouter(moduleConfig) {
  const {
    title, menuKey, tableName, idField,
    fields, searchFields, listColumns,
    scoreField, scoreFn,
    beforeCreate, beforeUpdate,
  } = moduleConfig;

  const router = express.Router();

  // List
  router.get('/', (req, res) => {
    const page = req.query.page || 1;
    const search = {};
    let searchQueryStr = '';

    for (const sf of searchFields) {
      if (req.query[sf]) {
        search[sf] = req.query[sf];
      }
    }

    let countSql = `SELECT COUNT(*) as total FROM ${tableName} WHERE 1=1`;
    let listSql = `SELECT * FROM ${tableName} WHERE 1=1`;
    const params = [];

    for (const [key, val] of Object.entries(search)) {
      countSql += ` AND ${key} LIKE ?`;
      listSql += ` AND ${key} LIKE ?`;
      params.push(`%${val}%`);
      searchQueryStr += `&${key}=${encodeURIComponent(val)}`;
    }

    const { total } = db.prepare(countSql).get(...params);
    const { currentPage, offset, limit, totalPages } = getPagination(page, total, config.pageSize);

    listSql += ` ORDER BY ${idField} DESC LIMIT ? OFFSET ?`;
    const items = db.prepare(listSql).all(...params, limit, offset);

    res.render('layout', {
      view: 'crud', title, activeMenu: menuKey, config: moduleConfig,
      items, currentPage, totalPages,
      searchQuery: searchQueryStr, search,
      currentUser: { display_name: req.session.displayName },
    });
  });

  // Create form
  router.get('/create', (req, res) => {
    res.render('layout', {
      view: 'crud', title, activeMenu: menuKey, config: moduleConfig,
      items: [], currentPage: 1, totalPages: 0,
      searchQuery: '', search: {},
      item: null, mode: 'create',
      currentUser: { display_name: req.session.displayName },
    });
  });

  // Create handler
  router.post('/', async (req, res) => {
    try {
      const data = {};
      for (const f of fields) {
        if (f.computed) continue;
        if (f.type === 'file') continue;
        if (req.body[f.name] !== undefined) {
          data[f.name] = req.body[f.name];
        }
      }

      if (scoreField && scoreFn) {
        data[scoreField] = scoreFn(data);
      }

      if (beforeCreate) {
        beforeCreate(data, req);
      }

      const cols = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      db.prepare(`INSERT INTO ${tableName} (${cols}) VALUES (${placeholders})`)
        .run(...Object.values(data));

      res.redirect(`/${menuKey}`);
    } catch (err) {
      console.error(`[Create Error] ${tableName}:`, err.message);
      res.render('layout', {
        view: 'crud', title, activeMenu: menuKey, config: moduleConfig,
        items: [], currentPage: 1, totalPages: 0,
        searchQuery: '', search: {},
        item: req.body, mode: 'create', error: err.message,
        currentUser: { display_name: req.session.displayName },
      });
    }
  });

  // Edit form
  router.get('/:id/edit', (req, res) => {
    const item = db.prepare(`SELECT * FROM ${tableName} WHERE ${idField} = ?`).get(req.params.id);
    if (!item) {
      return res.redirect(`/${menuKey}`);
    }
    // Get list items for context
    const page = 1;
    const { total } = db.prepare(`SELECT COUNT(*) as total FROM ${tableName}`).get();
    const { totalPages } = getPagination(page, total, config.pageSize);

    res.render('layout', {
      view: 'crud', title, activeMenu: menuKey, config: moduleConfig,
      items: [], currentPage: 1, totalPages,
      searchQuery: '', search: {},
      item, mode: 'edit',
      currentUser: { display_name: req.session.displayName },
    });
  });

  // Update handler
  router.post('/:id', async (req, res) => {
    try {
      const data = {};
      for (const f of fields) {
        if (f.computed) continue;
        if (f.type === 'file') continue;
        if (req.body[f.name] !== undefined) {
          data[f.name] = req.body[f.name];
        }
      }

      if (scoreField && scoreFn) {
        data[scoreField] = scoreFn(data);
      }

      if (beforeUpdate) {
        beforeUpdate(data, req);
      }

      data.updated_at = new Date().toISOString().replace('T', ' ').slice(0, 19);
      const sets = Object.keys(data).map(k => `${k} = ?`).join(', ');
      db.prepare(`UPDATE ${tableName} SET ${sets} WHERE ${idField} = ?`)
        .run(...Object.values(data), req.params.id);

      res.redirect(`/${menuKey}`);
    } catch (err) {
      console.error(`[Update Error] ${tableName}:`, err.message);
      const item = { ...req.body, [idField]: req.params.id };
      res.render('layout', {
        view: 'crud', title, activeMenu: menuKey, config: moduleConfig,
        items: [], currentPage: 1, totalPages: 0,
        searchQuery: '', search: {},
        item, mode: 'edit', error: err.message,
        currentUser: { display_name: req.session.displayName },
      });
    }
  });

  // Delete
  router.post('/:id/delete', (req, res) => {
    db.prepare(`DELETE FROM ${tableName} WHERE ${idField} = ?`).run(req.params.id);
    res.redirect(`/${menuKey}`);
  });

  return router;
}

module.exports = { createCrudRouter };
