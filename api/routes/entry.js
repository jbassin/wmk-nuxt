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
    const firstEquals = R.curry((equality, text) => R.equals(equality, R.head(text)));
    const formatFragment = R.cond([
      [firstEquals('@'), text => textTypeTail('link')(text)],
      [firstEquals('*'), text => textTypeTail('bold')(text)],
      [firstEquals('_'), text => textTypeTail('italics')(text)],
      [firstEquals('%'), text => textTypeTail('obfuscated')(text)],
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
    // formatPage(entries);
    // _.each(entries, (page, pageIndex) => {
    //   formattedInfo.push(page);
    //   _.each(page.entry, (entry, entryIndex) => {
    //     const entryArray = [];
    //     _.each(entry.text.split('|'), (text) => {
    //       switch (text.charAt(0)) {
    //         case '@':
    //           entryArray.push({
    //             type: 'link',
    //             text: text.substr(1),
    //           });
    //           break;
    //         case '*':
    //           entryArray.push({
    //             type: 'bold',
    //             text: text.substr(1),
    //           });
    //           break;
    //         case '_':
    //           entryArray.push({
    //             type: 'italics',
    //             text: text.substr(1),
    //           });
    //           break;
    //         case '%':
    //           const rudeString = 'FUCKYOU';
    //           let obfuString = text.substr(1);
    //           for (let i = 0; i < obfuString.length; i += 1) {
    //             if (obfuString.charAt(i) === ' ') continue;
    //             obfuString = setCharAt(obfuString, i, rudeString.charAt(i % rudeString.length));
    //           }
    //           entryArray.push({
    //             type: 'obfuscated',
    //             text: obfuString,
    //           });
    //           break;
    //         default:
    //           entryArray.push({
    //             type: 'normal',
    //             text,
    //           });
    //           break;
    //       }
    //     });
    //     formattedInfo[pageIndex].entry[entryIndex].text = [JSON.stringify(entryArray)];
    //   });
    // });
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

module.exports = router;
