const { Router } = require('express');
const mongoose = require('mongoose');
const R = require('ramda');

const router = Router();

const SubentrySchema = new mongoose.Schema({
  title: String,
  visible: Boolean,
  text: String,
});

const EntrySchema = new mongoose.Schema({
  title: String,
  parent: String,
  entry: [
    SubentrySchema,
  ],
});

const Entry = mongoose.model('Entry', EntrySchema);

router.get('/entries', (req, res) => {
  const title = req.query.title ? { title: req.query.title.replace(/_/g, ' ') } : {};
  Entry.find(title, 'title parent entry', (error, entries) => {
    if (error) { console.error(error); }
    const textType = R.curry((transformFn, type, text) => ({
      type,
      text: transformFn(text),
    }));
    const textTypeUntouched = textType(text => text);
    const textTypeTail = textType(R.tail);
    const textTypeObfuscate = textType(text => R.reduce((accumulator, concat) => {
      if (concat === ' ') return `${accumulator} `;
      return `${accumulator}*`;
    }, '', text));
    const firstEquals = R.curry((equality, text) => R.equals(equality, R.head(text)));
    const formatFragment = R.cond([
      [firstEquals('@'), text => textTypeTail('link')(text)],
      [firstEquals('*'), text => textTypeTail('bold')(text)],
      [firstEquals('_'), text => textTypeTail('italics')(text)],
      [firstEquals('%'), text => textTypeObfuscate('obfuscated')(text)],
      [R.T, text => textTypeUntouched('normal')(text)],
    ]);
    const formatEntry = entry => ({
      _id: entry._id,
      title: entry.title,
      visible: entry.visible,
      text: R.map(formatFragment)(R.split('|', entry.text)),
    });
    const formatPage = page => ({
      _id: page._id,
      title: page.title,
      parent: page.parent,
      entry: R.map(formatEntry)(page.entry),
    });
    const formatContainer = container => R.map(formatPage)(container);
    res.json({
      entries: formatContainer(entries),
    });
  }).sort({ _id: 1 });
});

router.get('/entries/list', (req, res) => {
  Entry.find({}, 'title parent', (error, entries) => {
    if (error) { console.error(error); }
    res.json({
      entries,
    });
  }).sort({ _id: 1 });
});

router.get('/entries/tree', (req, res) => {
  const root = req.query.root ? req.query.root.replace(/_/g, ' ') : 'index';
  Entry.find({}, 'title parent', (error, entries) => {
    if (error) { console.error(error); }
    const sortEntries = R.sortBy(R.prop('title'));
    const getChildren = (nodes, node) => R.reduce((accumulator, concat) => {
      if (node.title === concat.parent) {
        accumulator.push({
          title: concat.title,
          children: getChildren(nodes, concat),
        });
      }
      return accumulator;
    }, [], nodes);
    const tree = {
      title: root,
      children: getChildren(sortEntries(entries), { title: root }),
    };
    res.json({
      tree,
    });
  }).sort({ _id: 1 });
});

router.get('/entries/path', (req, res) => {
  const root = req.query.root ? req.query.root.replace(/_/g, ' ') : 'index';
  Entry.find({}, 'title parent', (error, entries) => {
    if (error) { console.error(error); }
    const sortEntries = R.sortBy(R.prop('title'));
    const getPath = (accumulator, nodes, node) => {
      if (!node) return accumulator;
      accumulator.push(node.title);
      return getPath(accumulator, nodes, nodes.find(x => x.title === node.parent));
    };
    const pathArray = getPath([], sortEntries(entries), sortEntries(entries).find(x => x.title === root));
    const path = `/${R.pipe(R.reverse, R.join('/'))(pathArray)}`.replace(/ /g, '_');
    res.json({
      path,
    });
  }).sort({ _id: 1 });
});

module.exports = router;
