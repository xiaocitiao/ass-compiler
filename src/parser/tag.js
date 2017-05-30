import parseDrawing from './drawing';

function parseTag(text) {
  var tag = {};
  var numTags = [
    'b', 'i', 'u', 's', 'fsp',
    'k', 'K', 'kf', 'ko', 'kt',
    'fe', 'q', 'p', 'pbo', 'a', 'an',
    'fscx', 'fscy', 'fax', 'fay', 'frx', 'fry', 'frz', 'fr',
    'be', 'blur', 'bord', 'xbord', 'ybord', 'shad', 'xshad', 'yshad',
  ];
  for (var i = 0; i < numTags.length; i++) {
    var nt = numTags[i];
    var regex = new RegExp('^' + nt + '-?\\d');
    if (regex.test(text)) {
      tag[nt] = text.slice(nt.length) * 1;
    }
  }
  if (/^fn/.test(text)) tag.fn = text.slice(2);
  if (/^r/.test(text)) tag.r = text.slice(1);
  if (/^fs[\d+-]/.test(text)) tag.fs = text.slice(2);
  var p = [];
  if (/^\d?c&?H?[0-9a-f]+/i.test(text)) {
    p = text.match(/^(\d?)c&?H?(\w+)/);
    tag['c' + (p[1] || '1')] = ('000000' + p[2]).slice(-6);
  }
  if (/^\da&?H?[0-9a-f]+/i.test(text)) {
    p = text.match(/^(\d)a&?H?(\w\w)/);
    tag['a' + p[1]] = p[2];
  }
  if (/^alpha&?H?[0-9a-f]+/i.test(text)) {
    tag.alpha = text.match(/^alpha&?H?(\w\w)/)[1];
  }
  if (/^(?:pos|org|move|fad|fade)\(/.test(text)) {
    p = text.match(/^(\w+)\((.*?)\)/);
    tag[p[1]] = p[2]
      .trim()
      .split(/\s*,\s*/)
      .map(Number);
  }
  if (/^i?clip/.test(text)) {
    p = text
      .match(/^i?clip\((.*)\)/)[1]
      .trim()
      .split(/\s*,\s*/);
    tag.clip = {
      inverse: /iclip/.test(text),
      scale: 1,
      drawing: null,
      dots: null,
    };
    if (p.length === 1) {
      tag.clip.drawing = parseDrawing(p[0]);
    }
    if (p.length === 2) {
      tag.clip.scale = p[0] * 1;
      tag.clip.drawing = parseDrawing(p[1]);
    }
    if (p.length === 4) {
      tag.clip.dots = p.map(Number);
    }
  }
  if (/^t\(/.test(text)) {
    p = text
      .match(/^t\((.*)\)/)[1]
      .trim()
      .replace(/\\.*/, function (x) {
        return x.replace(/,/g, '\n');
      })
      .split(/\s*,\s*/);
    if (!p[0]) return tag;
    tag.t = {
      t1: 0,
      t2: 0,
      accel: 1,
      tags: p[p.length - 1]
        .replace(/\n/g, ',')
        .split('\\')
        .slice(1)
        .map(parseTag),
    };
    if (p.length === 2) {
      tag.t.accel = p[0] * 1;
    }
    if (p.length === 3) {
      tag.t.t1 = p[0] * 1;
      tag.t.t2 = p[1] * 1;
    }
    if (p.length === 4) {
      tag.t.t1 = p[0] * 1;
      tag.t.t2 = p[1] * 1;
      tag.t.accel = p[2] * 1;
    }
  }

  return tag;
}

export default parseTag;
