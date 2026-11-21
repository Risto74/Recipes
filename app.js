(function () {
  'use strict';

  var KEY = 'recipeapp.v1';
  var DBVER = 2;
  var HUB_URL = 'https://risto74.github.io/Family-Hub/';
  var DAYNAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var PH = ['#D6E2E7', '#DCE6DA', '#CFDAE3', '#E0E6D9', '#D3DFE0', '#DDE3EA', '#E3EAD9', '#D8E0E5'];
  var CATS = ['Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Side', 'Snack', 'Dessert', 'Baking', 'Drink'];
  var CUISINES = ['American', 'Italian', 'Mexican', 'Greek', 'Mediterranean', 'Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese',
    'Indian', 'French', 'Spanish', 'Middle Eastern', 'Southern', 'Cajun'];

  /* ---------- data ---------- */

  function seed() {
    var out = {
      ver: DBVER,
      recipes: [
        { id: 's1', sample: true, title: 'Lemon herb baked salmon', servings: 4, prep: 10, cook: 25, cat: ['Dinner'], cuisine: '', tags: ['Under 30 min'],
          ingredients: [
            { q: 4, u: 'fillets', n: 'salmon, skin on' }, { q: 2, u: 'tbsp', n: 'olive oil' }, { q: 1, u: '', n: 'lemon, sliced' },
            { q: 3, u: 'cloves', n: 'garlic, minced' }, { q: 2, u: 'tbsp', n: 'fresh dill, chopped' }, { q: 1, u: 'lb', n: 'asparagus' }],
          steps: [
            { t: 'Heat the oven to 400°F and line a sheet pan.', s: 0 },
            { t: 'Rub the salmon with oil, garlic, and dill. Lay lemon slices on top.', s: 0 },
            { t: 'Add the asparagus to the pan and bake for 12 to 15 minutes.', s: 900 },
            { t: 'Rest for 3 minutes, then serve.', s: 180 }] },
        { id: 's2', sample: true, title: 'Chicken tortilla soup', servings: 6, prep: 15, cook: 30, cat: ['Dinner'], cuisine: 'Mexican', tags: ['Soups'],
          ingredients: [
            { q: 1.5, u: 'lb', n: 'chicken breast' }, { q: 1, u: '', n: 'onion, diced' }, { q: 3, u: 'cloves', n: 'garlic, minced' },
            { q: 1, u: 'can', n: 'diced tomatoes' }, { q: 4, u: 'cups', n: 'low-sodium chicken broth' }, { q: 1, u: 'tbsp', n: 'chili powder' }, { q: 1, u: 'tsp', n: 'cumin' }],
          steps: [
            { t: 'Soften the onion and garlic in a large pot over medium heat.', s: 300 },
            { t: 'Add the chicken, tomatoes, broth, chili powder, and cumin. Simmer until the chicken is cooked through.', s: 1200 },
            { t: 'Shred the chicken with two forks and stir it back into the pot.', s: 0 }] },
        { id: 's3', sample: true, title: 'Greek chicken bowls', servings: 4, prep: 10, cook: 20, cat: ['Dinner', 'Lunch'], cuisine: 'Greek', tags: ['Under 30 min'],
          ingredients: [
            { q: 1.5, u: 'lb', n: 'chicken thighs, boneless' }, { q: 2, u: 'tbsp', n: 'olive oil' }, { q: 1, u: 'tbsp', n: 'dried oregano' },
            { q: 1, u: '', n: 'cucumber, diced' }, { q: 1, u: 'cup', n: 'cherry tomatoes, halved' }, { q: 0.5, u: 'cup', n: 'plain Greek yogurt' }],
          steps: [
            { t: 'Toss the chicken with oil and oregano.', s: 0 },
            { t: 'Cook the chicken in a skillet over medium heat until browned and cooked through.', s: 720 },
            { t: 'Slice the chicken and serve over the cucumber and tomatoes with a spoonful of yogurt.', s: 0 }] },
        { id: 's4', sample: true, title: 'Shrimp and zucchini skillet', servings: 4, prep: 10, cook: 10, cat: ['Dinner'], cuisine: '', tags: ['Under 30 min'],
          ingredients: [
            { q: 1, u: 'lb', n: 'shrimp, peeled' }, { q: 2, u: '', n: 'zucchini, sliced' }, { q: 2, u: 'tbsp', n: 'olive oil' },
            { q: 2, u: 'cloves', n: 'garlic, minced' }, { q: 1, u: '', n: 'lemon, juiced' }],
          steps: [
            { t: 'Heat the oil in a large skillet over medium-high heat.', s: 0 },
            { t: 'Cook the zucchini until just tender.', s: 240 },
            { t: 'Add the garlic and shrimp and cook until the shrimp turn pink.', s: 180 },
            { t: 'Finish with the lemon juice.', s: 0 }] },
        { id: 's5', sample: true, title: 'Blueberry streusel muffins', servings: 12, prep: 20, cook: 22, cat: ['Breakfast', 'Baking'], cuisine: 'American', tags: ['Make ahead'],
          ingredients: [
            { h: 'Muffins' },
            { q: 2, u: 'cups', n: 'all-purpose flour' }, { q: 0.75, u: 'cup', n: 'granulated sugar' }, { q: 2.5, u: 'tsp', n: 'baking powder' },
            { q: 0.5, u: 'tsp', n: 'salt' }, { q: 1, u: 'cup', n: 'milk' }, { q: 0.33, u: 'cup', n: 'vegetable oil' }, { q: 1, u: '', n: 'large egg' },
            { q: 1, u: 'tsp', n: 'vanilla extract' }, { q: 1.5, u: 'cups', n: 'fresh blueberries' },
            { h: 'Streusel topping' },
            { q: 0.33, u: 'cup', n: 'granulated sugar' }, { q: 0.33, u: 'cup', n: 'all-purpose flour' }, { q: 3, u: 'tbsp', n: 'cold butter, cubed' },
            { q: 0.5, u: 'tsp', n: 'ground cinnamon' }],
          steps: [
            { h: 'Get ready' },
            { t: 'Move an oven rack to the center position and heat the oven to 400°F. Line a 12-cup muffin pan with paper liners, or grease each cup well with butter or oil. If your pan is dark metal, check the muffins a couple of minutes early because dark pans brown faster.' },
            { h: 'Make the streusel' },
            { t: 'In a small bowl, stir together the sugar, flour, and cinnamon. Add the cold butter and rub it in with your fingertips until the mixture looks like coarse crumbs with some pea-sized clumps. Put the bowl in the refrigerator while you make the batter so the butter stays cold.' },
            { h: 'Make the batter' },
            { t: 'In a large bowl, whisk the flour, sugar, baking powder, and salt. In a second bowl, whisk the milk, oil, egg, and vanilla until smooth.' },
            { t: 'Pour the wet ingredients into the dry ingredients and fold with a spatula just until no dry flour is visible. The batter should be thick and a little lumpy. Overmixing makes tough muffins, so stop as soon as it comes together.' },
            { t: 'Gently fold in the blueberries. Divide the batter evenly among the muffin cups, filling each almost to the top, then sprinkle the streusel over each one and press it in lightly.' },
            { h: 'Bake' },
            { t: 'Bake until the tops are golden and a toothpick pushed into the center comes out clean or with a few dry crumbs, about 18 to 22 minutes. Cool in the pan for 5 minutes, then move the muffins to a wire rack so the bottoms do not steam.' }] }
      ],
      plan: {},
      config: { cats: CATS.slice(), cuisines: CUISINES.slice() }
    };
    // Steps without a time set get their timers from the step text.
    out.recipes.forEach(function (r) {
      r.steps.forEach(function (s) {
        if (s.h == null && s.s == null) { s.ts = timerList(s.t); s.s = s.ts[0] || 0; }
      });
    });
    return out;
  }

  var db = load();

  function load() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { s = null; }
    if (!s || !s.recipes) { return seed(); }
    if (!s.plan) { s.plan = {}; }
    if (!s.config) { s.config = { cats: CATS.slice(), cuisines: CUISINES.slice() }; }
    if ((s.ver || 1) < DBVER) { migrate(s); }
    return s;
  }

  function fixTags(r) {
    if (!r.cat) {
      r.cat = [];
      var rest = [];
      (r.tags || []).forEach(function (t) {
        var idx = -1;
        for (var i = 0; i < CATS.length; i++) { if (CATS[i].toLowerCase() === String(t).toLowerCase()) { idx = i; } }
        if (idx >= 0) { r.cat.push(CATS[idx]); } else { rest.push(t); }
      });
      r.tags = rest;
    }
    if (!r.tags) { r.tags = []; }
    if (typeof r.cuisine !== 'string') { r.cuisine = ''; }
  }

  function migrate(s) {
    var fresh = seed().recipes.filter(function (r) { return r.sample; });
    var hadSamples = s.recipes.some(function (r) { return r.sample; });
    s.recipes = s.recipes.filter(function (r) { return !r.sample; });
    s.recipes.forEach(fixTags);
    if (hadSamples) { s.recipes = s.recipes.concat(fresh); }
    s.ver = DBVER;
  }

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* ignore */ }
  }

  function save() {
    persist();
    cloudChanged();
  }

  function byId(id) {
    for (var i = 0; i < db.recipes.length; i++) { if (db.recipes[i].id === id) { return db.recipes[i]; } }
    return null;
  }

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function dkey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  function ph(id) {
    var h = 0;
    for (var i = 0; i < id.length; i++) { h = (h * 31 + id.charCodeAt(i)) >>> 0; }
    return PH[h % PH.length];
  }

  function fmtQty(x) {
    if (x == null || x === '' || isNaN(x) || x <= 0) { return ''; }
    var w = Math.floor(x + 1e-9);
    var f = x - w;
    var fr = [[0, ''], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, '']];
    var best = fr[0];
    var d = 9;
    for (var i = 0; i < fr.length; i++) {
      var dd = Math.abs(f - fr[i][0]);
      if (dd < d) { d = dd; best = fr[i]; }
    }
    if (d < 0.04) {
      if (best[0] === 1) { w += 1; }
      var s = (w ? String(w) : '') + best[1];
      return s || '0';
    }
    return String(Math.round(x * 10) / 10);
  }

  function amount(ing, scale) {
    var q = ing.q != null ? fmtQty(ing.q * scale) : '';
    return (q + ' ' + (ing.u || '')).trim();
  }

  function timeText(r) {
    var t = (r.prep || 0) + (r.cook || 0);
    if (!t) { return ''; }
    if (t >= 60) { var h = Math.floor(t / 60); var m = t % 60; return h + ' hr' + (m ? ' ' + m + ' min' : ''); }
    return t + ' min';
  }

  function metaText(r) {
    var p = [];
    var t = timeText(r);
    if (t) { p.push(t); }
    p.push(r.servings + ' servings');
    return p.join(' · ');
  }

  function kindText(r) {
    return (r.cat || []).concat(r.cuisine ? [r.cuisine] : []).join(' · ');
  }

  /* ---------- text parsing (rule-based, runs in the page) ---------- */

  var UF = { '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125 };
  var UNITS = {};
  ('tsp tbsp teaspoon teaspoons tablespoon tablespoons cup cups c oz ounce ounces lb lbs pound pounds g gram grams kg ml l liter liters ' +
    'clove cloves can cans pinch dash slice slices fillet fillets bunch package packages pkg stick sticks head heads sprig sprigs piece pieces ' +
    'jar jars quart quarts pint pints bag bags bottle bottles container containers handful handfuls box boxes').split(' ').forEach(function (u) { UNITS[u] = 1; });

  var QRE = /^(\d+\s+\d+\/\d+|\d+\s*[¼½¾⅓⅔⅛]|\d+\/\d+|\d*\.\d+|\d+|[¼½¾⅓⅔⅛])(?:\s*(?:-|–|to)\s*(?:\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+))?\s*(.*)$/;

  function numFrom(tok) {
    tok = tok.trim();
    var m = tok.match(/^(\d+)\s*([¼½¾⅓⅔⅛])$/);
    if (m) { return +m[1] + UF[m[2]]; }
    if (UF[tok]) { return UF[tok]; }
    m = tok.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (m) { return +m[1] + m[2] / m[3]; }
    m = tok.match(/^(\d+)\/(\d+)$/);
    if (m) { return m[1] / m[2]; }
    var n = parseFloat(tok);
    return isNaN(n) ? null : n;
  }

  function parseQtyUnit(s) {
    s = (s || '').trim();
    var m = s.match(QRE);
    if (!m) { return { q: null, u: s }; }
    return { q: numFrom(m[1]), u: m[2].trim() };
  }

  function splitUnit(rest) {
    var dm = rest.match(/^([A-Za-z]+)\s*\/\s*(\d*\.?\d+\s*[A-Za-z]+)\s+(\S.*)$/);
    if (dm && UNITS[dm[1].toLowerCase()]) { return { u: dm[1], n: dm[3] + ' (' + dm[2].replace(/\s+/, '') + ')' }; }
    var m = rest.match(/^([A-Za-z]+\.?)\s+(.*)$/);
    if (m && UNITS[m[1].toLowerCase().replace('.', '')]) { return { u: m[1], n: m[2] }; }
    return { u: '', n: rest };
  }

  function parseIngredientLine(line) {
    line = line.trim().replace(/^[•●▪◦·‣∙]\s*/, '').replace(/^[-–*]\s+/, '').trim();
    var om = line.match(/^((?:option|choice)\s*\d+)\s*[:.\-\u2013]\s*(.+)$/i);
    if (om) {
      var inner = parseIngredientLine(om[2]);
      inner.n = inner.n + ' (' + om[1].charAt(0).toUpperCase() + om[1].slice(1).toLowerCase() + ')';
      return inner;
    }
    var pm = line.match(/^(?:an?\s+)?(pinch|dash|splash|handful|drizzle)\s+(?:of\s+)?(.+)$/i);
    if (pm) { return { q: 1, u: pm[1].toLowerCase(), n: pm[2], found: true }; }
    var m = line.match(QRE);
    if (m && numFrom(m[1]) != null && m[2]) {
      var su = splitUnit(m[2]);
      return { q: numFrom(m[1]), u: su.u, n: su.n.replace(/^of\s+/i, ''), found: true };
    }
    m = line.match(/^(.*?)\s*[-–:]\s*(\S.*)$/);
    if (m) {
      var p = parseQtyUnit(m[2]);
      if (p.q != null && m[1]) { return { q: p.q, u: p.u, n: m[1], found: true }; }
    }
    m = line.match(/^(.*?)\s+((?:\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+|[¼½¾⅓⅔⅛])\s*[A-Za-z]+\.?)$/);
    if (m) {
      var p2 = parseQtyUnit(m[2]);
      if (p2.q != null && UNITS[p2.u.toLowerCase().replace('.', '')]) { return { q: p2.q, u: p2.u, n: m[1], found: true }; }
    }
    return { q: null, u: '', n: line, found: false };
  }

  // Every time found in a step, in order. Ranges use the longer time. "1 hour 30 minutes" counts as one time.
  function timerList(t) {
    var text = t.replace(/(\d+)\s*(?:hours?|hrs?)\s*(?:and\s*)?(\d+)\s*(?:min(?:ute)?s?)/gi, function (m0, h, mm) { return (+h * 60 + +mm) + ' min'; });
    var re = /(\d+)(?:\s*(?:-|–|to)\s*(\d+))?\s*(min(?:ute)?s?|hours?|hrs?)\b/gi;
    var out = [];
    var m;
    while ((m = re.exec(text)) !== null) {
      var n = m[2] ? +m[2] : +m[1];
      var secs = /^h/i.test(m[3]) ? n * 3600 : n * 60;
      if (secs > 0 && out.indexOf(secs) < 0) { out.push(secs); }
    }
    return out;
  }

  function timerSecs(t) {
    var l = timerList(t);
    return l.length ? l[0] : 0;
  }

  // A short line that names a group, like "For the sauce:" or "TOPPING". Returns the heading text or null.
  function groupHead(l) {
    var t = (l || '').trim();
    if (!t || t.length > 50 || /\d/.test(t)) { return null; }
    if (/:$/.test(t)) { return t.replace(/:$/, '').trim(); }
    if (/^for the\s+\S/i.test(t) && !/[.,;!?]/.test(t)) { return t; }
    if (t === t.toUpperCase() && /[A-Z]{3}/.test(t)) { return t.charAt(0) + t.slice(1).toLowerCase(); }
    return null;
  }

  function looksIng(l) {
    return parseIngredientLine(l).found && l.length < 60 && !/[.!?]$/.test(l);
  }

  function isIngPara(p) {
    if (p.length === 1 && groupHead(p[0]) !== null) { return true; }
    var cnt = 0;
    p.forEach(function (l) {
      if (groupHead(l) !== null || looksIng(l) || (l.length < 40 && !/[.!?]$/.test(l))) { cnt++; }
    });
    return cnt / p.length >= 0.6;
  }

  function segMins(str) {
    var t = 0;
    var m;
    var re = /(\d+(?:\.\d+)?)\s*(hours?|hrs?|minutes?|mins?)/gi;
    while ((m = re.exec(str)) !== null) { t += /^h/i.test(m[2]) ? Math.round(+m[1] * 60) : Math.round(+m[1]); }
    return t;
  }

  var VERBS = {};
  ('add season blend cook let shred return simmer mix stir heat bake preheat combine place pour whisk chop slice serve cover remove transfer drain ' +
    'bring reduce toss set press fold grease line rest cool refrigerate brown sear saute sauté boil roast grill top spread melt dice mince peel rinse pat ' +
    'rub marinate spoon divide garnish finish assemble prepare make start turn use open sprinkle layer arrange beat cream knead shape cut fill wrap ' +
    'scoop pile pull flip squeeze fry mash steam strain puree process crush chill freeze thaw soak warm microwave prep gather drizzle crack unwrap dissolve coat insert push check').split(' ').forEach(function (v) { VERBS[v] = 1; });
  var SMALL = { the: 1, 'in': 1, a: 1, an: 1, of: 1, and: 1, to: 1, 'for': 1, on: 1, 'with': 1, '&': 1 };

  var STARTERS = { 'if': 1, then: 1, once: 1, when: 1, 'while': 1, after: 1, before: 1, 'in': 1, meanwhile: 1, finally: 1, next: 1 };

  function isStarter(tk) {
    var w = tk.toLowerCase();
    return !!(VERBS[w] || STARTERS[w] || (/ly$/.test(w) && w.length > 4));
  }

  // "Season the Meat Season pork..." -> heading "Season the Meat", step "Season pork...". Returns null when no run-in heading is found.
  function splitStepTitle(l) {
    var toks = l.split(/\s+/);
    if (toks.length < 4 || !/^[A-Z]/.test(toks[0])) { return null; }
    var best = -1;
    for (var i = 1; i < toks.length - 1 && i <= 12; i++) {
      var tk = toks[i];
      var okTitle = /^[A-Z&]/.test(tk) || SMALL[tk.toLowerCase()];
      if (!okTitle) { break; }
      if (/^[A-Z]/.test(tk) && isStarter(tk) && /^[a-z]/.test(toks[i + 1])) {
        var pre = toks.slice(0, i);
        if (!/[.:;,!?]$/.test(pre[pre.length - 1])) { best = i; }
      }
    }
    if (best < 1) { return null; }
    return { h: toks.slice(0, best).join(' '), t: toks.slice(best).join(' ') };
  }

  function sentences(t) {
    return t.replace(/([.!?])\s+(?=[A-Z])/g, '$1\n').split('\n').map(function (x) { return x.trim(); }).filter(Boolean);
  }

  function isHeading(l) {
    var t = l.replace(/:$/, '').trim();
    if (t.length > 45) { return null; }
    if (/^(?:the\s+)?ingredients?(?:\s+list)?$/i.test(t)) { return 'i'; }
    if (/^(?:step[\s-]by[\s-]step\s+)?(?:cooking\s+)?(?:directions?|instructions?|steps?|method|preparation)$/i.test(t)) { return 's'; }
    return null;
  }

  // Text pasted with its line breaks stripped, like "...slicedA few fine slivers...1/2 cup water1.5 tbsp...". Put the breaks back.
  function needsRepair(text) {
    var nb = text.split('\n').filter(function (l) { return l.trim(); }).length;
    return nb <= 4 && text.length > 250;
  }

  function repairGlued(t) {
    t = t.replace(/\r/g, '');
    t = t.replace(/([a-z)])(?=[A-Z])/g, '$1\n');
    t = t.replace(/([a-z):])(?=\d)/g, '$1\n');
    t = t.replace(/(:)(?=[A-Z])/g, '$1\n');
    t = t.replace(/\s+(Step\s*\d+\s*:)/gi, '\n$1');
    t = t.replace(/\s+((?:Step-by-Step\s+)?(?:Cooking\s+)?(?:Ingredients|Instructions|Directions))(?=\s*\n|\s+Step)/g, '\n$1');
    return t;
  }

  // A short plain line in the ingredient list followed by an ingredient with an amount, like "Blender Sauce".
  function implicitHead(l, next) {
    if (!next || !parseIngredientLine(next).found) { return false; }
    var t = l.trim();
    if (!t || t.length > 40 || !/^[A-Z]/.test(t)) { return false; }
    if (t.split(/\s+/).length > 4 || /[,.;!?\d()]/.test(t)) { return false; }
    if (/\b(to taste|optional|pinch|dash|as needed|for serving|for garnish)\b/i.test(t)) { return false; }
    if (/^(salt|pepper|water|oil|ice|sugar|butter|flour)\b/i.test(t)) { return false; }
    return true;
  }

  function parseText(text) {
    var glued = false;
    if (needsRepair(text)) { text = repairGlued(text); glued = true; }
    var lines = text.replace(/\r/g, '').split('\n').map(function (l) { return l.trim().replace(/^[•●▪◦·‣∙]\s*/, '').replace(/^[*]\s+/, '').replace(/^[-–]\s+/, ''); });
    var out = { title: '', servings: 4, minutes: 0, ing: [], steps: [] };
    var sm = text.match(/(?:serves|servings?|yields?|makes)\s*:?\s*(\d+)/i);
    if (!sm) { sm = text.match(/\(\s*(\d+)\s*servings?\s*\)/i) || text.match(/(\d+)\s*servings?\b/i); }
    if (sm) { out.servings = +sm[1]; }
    var tot = 0;
    var sumT = 0;
    var mre = /\b(prep|cook|total)(?:\s*time)?\s*:\s*([^\n]*?)(?=\s+(?:prep|cook|total|servings?|serves|yields?|makes)\b|\n|$)/gi;
    var mm;
    while ((mm = mre.exec(text)) !== null) {
      var mins = segMins(mm[2]);
      if (mm[1].toLowerCase() === 'total') { tot += mins; } else { sumT += mins; }
    }
    out.minutes = tot || sumT;
    var i = 0;
    while (i < lines.length && !lines[i]) { i++; }
    if (i < lines.length) { out.title = lines[i].replace(/^#+\s*/, ''); i++; }
    var rest = lines.slice(i).filter(function (l) {
      return !/^(serves|servings?|yields?|makes)\s*:?\s*\d+/i.test(l) && !/^(prep|cook|total)(\s*time)?\s*:/i.test(l);
    });
    var ing = [];
    var stp = [];
    var hasHead = rest.some(function (l) { return isHeading(l) !== null; });
    if (hasHead) {
      var mode = null;
      rest.forEach(function (l) {
        if (!l) { return; }
        var hd = isHeading(l);
        if (hd) { mode = hd; return; }
        (mode === 's' ? stp : ing).push(l);
      });
    } else {
      var paras = [];
      var cur2 = [];
      rest.forEach(function (l) {
        if (l) { cur2.push(l); } else if (cur2.length) { paras.push(cur2); cur2 = []; }
      });
      if (cur2.length) { paras.push(cur2); }
      if (paras.length === 1) {
        paras[0].forEach(function (l) { (looksIng(l) || groupHead(l) !== null ? ing : stp).push(l); });
      } else {
        var inSteps = false;
        paras.forEach(function (p) {
          if (!inSteps && isIngPara(p)) { ing = ing.concat(p); } else { inSteps = true; stp = stp.concat(p); }
        });
      }
    }
    out.ing = [];
    ing.forEach(function (l, idx) {
      var pl = parseIngredientLine(l);
      var h = groupHead(l);
      if (!pl.found && h !== null) { out.ing.push({ h: h }); }
      else if (!pl.found && implicitHead(l, ing[idx + 1])) { out.ing.push({ h: l.replace(/:$/, '').trim() }); }
      else if (pl.n) { out.ing.push(pl); }
    });
    var clean = stp.filter(function (l) { return !/^(step\s*)?\d+[.):]?$/i.test(l); }).map(function (l) { return l.replace(/^\d+[.)]\s+/, ''); }).filter(Boolean);
    var splits = clean.map(splitStepTitle);
    var useSplit = splits.filter(Boolean).length >= 2;
    out.steps = [];
    clean.forEach(function (l, i) {
      var sp = l.match(/^step\s*\d+\s*[:.\-\u2013]\s*(.*)$/i);
      if (sp) {
        var rest2 = sp[1].trim();
        if (!rest2) { return; }
        if (rest2.length <= 70 && !/[.!?]$/.test(rest2)) { out.steps.push('# ' + rest2); return; }
        if (glued) {
          var st = splitStepTitle(rest2);
          if (st) { out.steps.push('# ' + st.h); sentences(st.t).forEach(function (x) { out.steps.push(x); }); return; }
          sentences(rest2).forEach(function (x) { out.steps.push(x); });
          return;
        }
        l = rest2;
      }
      var h = groupHead(l);
      if (h !== null) { out.steps.push('# ' + h); return; }
      if (useSplit && splits[i]) { out.steps.push('# ' + splits[i].h); out.steps.push(splits[i].t); return; }
      out.steps.push(l);
    });
    out.title = out.title.replace(/\s*\(\s*\d+\s*servings?\s*\)\s*$/i, '').replace(/\s+recipe$/i, '');
    if (out.title === out.title.toUpperCase() && /[A-Z]{3}/.test(out.title)) {
      out.title = out.title.toLowerCase().replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
    }
    return out;
  }

  /* ---------- ui state ---------- */

  var ui = {
    fCat: 'All', fCuisine: 'All', fTag: 'All', q: '', servings: {}, weekOffset: 0, step: 0, tpick: {}, timer: null, tick: null,
    nutri: { busy: false, id: null, msg: '', review: null, pick: null, q: '', smsg: '', sbusy: false }, draft: null, editId: null, importTab: 'text', importText: '', linkUrl: '', linkMsg: '', linkBusy: false, modal: null, confirmDel: null, confirmCfg: null, reorder: false, focusRow: null, lastPtr: ''
  };
  var wakeLock = null;

  function servingsOf(r) { return ui.servings[r.id] || r.servings; }

  function stepDurs(s) {
    if (s.ts && s.ts.length) { return s.ts; }
    return s.s ? [s.s] : [];
  }

  // Cooking mode steps: group headings become a label on the steps that follow.
  function cookSteps(r) {
    var out = [];
    var g = '';
    r.steps.forEach(function (s) {
      if (s.h != null) { g = s.h; } else { out.push({ t: s.t, ts: stepDurs(s), g: g }); }
    });
    return out;
  }

  /* ---------- icons ---------- */

  var IC = {
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>',
    rules: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.500 7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    imp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>',
    hd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="18" height="18"><path d="M7 5v14M17 5v14M7 12h10"/></svg>',
    lst: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="18" height="18"><path d="M5 7h14M5 12h14M5 17h14"/></svg>',
    hub: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M9 5l7 7-7 7"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M15 5l-7 7 7 7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="18" height="18"><path d="M12 5v14M5 12h14"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="18" height="18"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>'
  };

  /* ---------- views ---------- */

  function navItem(name, label, icon, active) {
    return '<a class="navitem' + (active === name ? ' on' : '') + '" href="#/' + (name === 'library' ? '' : name) + '">' + icon + label + '</a>';
  }

  function sourceLine(r) {
    if (!r.src || !/^https?:\/\//i.test(r.src)) { return ''; }
    var host = r.src.replace(/^https?:\/\/(www\.)?/i, '').split('/')[0];
    return '<p class="meta" style="margin-top:4px;font-size:13px">Source: <a href="' + esc(r.src) + '" target="_blank" rel="noopener noreferrer">' + esc(host) + '</a></p>';
  }

  function creditLine(r) {
    var c = r && r.credit;
    if (!c || !/^https:\/\/pixabay\.com\//i.test(c.p || '')) { return ''; }
    return '<p class="meta" style="margin-top:4px;font-size:13px">Image by ' + esc(c.n || 'a photographer') + ' on <a href="' + esc(c.p) + '" target="_blank" rel="noopener noreferrer">Pixabay</a></p>';
  }

  function imgTag(r) {
    if (!r) { return ''; }
    var u = r.photo ? photoUrl(r) : r.img;
    return u ? '<img class="pimg" src="' + esc(u) + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">' : '';
  }

  function shell(active, inner) {
    var hub = window.HubApp ? '<span class="grow"></span><a class="navitem" href="' + HUB_URL + '">' + IC.hub + 'Hub</a>' : '';
    return '<div class="shell"><nav class="nav" aria-label="Main">' +
      navItem('library', 'Recipes', IC.book, active) + navItem('plan', 'Plan', IC.cal, active) + navItem('import', 'Import', IC.imp, active) + navItem('profile', 'Rules', IC.rules, active) + navItem('settings', 'Settings', IC.gear, active) +
      hub + '</nav><main class="main">' + inner + '</main></div>' + modalHtml();
  }

  function gridHtml() {
    var q = ui.q.trim().toLowerCase();
    var list = db.recipes.filter(function (r) {
      if (ui.fCat !== 'All' && (r.cat || []).indexOf(ui.fCat) < 0) { return false; }
      if (ui.fCuisine !== 'All' && r.cuisine !== ui.fCuisine) { return false; }
      if (ui.fTag !== 'All' && (r.tags || []).indexOf(ui.fTag) < 0) { return false; }
      if (!q) { return true; }
      if (r.title.toLowerCase().indexOf(q) >= 0) { return true; }
      if ((kindText(r) + ' ' + (r.tags || []).join(' ')).toLowerCase().indexOf(q) >= 0) { return true; }
      return r.ingredients.some(function (i) { return i.n && i.n.toLowerCase().indexOf(q) >= 0; });
    });
    if (!list.length) { return '<div class="empty">No recipes match.</div>'; }
    return list.map(function (r) {
      var kind = kindText(r);
      return '<a class="card" href="#/recipe/' + esc(r.id) + '"><div class="photo" aria-hidden="true" style="background:' + ph(r.id) + '">' +
        esc(r.title.charAt(0).toUpperCase()) + imgTag(r) + '</div><div class="body">' +
        (kind ? '<div class="kind">' + esc(kind) + '</div>' : '') +
        '<div class="t">' + esc(r.title) + '</div><div class="meta">' + esc(metaText(r)) + '</div>' + sugarChip(r) + flagChip(r) + '</div></a>';
    }).join('');
  }

  function usedList(base, getter, sortIt) {
    var counts = {};
    var order = [];
    db.recipes.forEach(function (r) {
      getter(r).forEach(function (v) { if (!counts[v]) { counts[v] = 0; order.push(v); } counts[v]++; });
    });
    var vals = base.filter(function (v) { return counts[v]; });
    order.forEach(function (v) { if (vals.indexOf(v) < 0) { vals.push(v); } });
    if (sortIt) { vals.sort(); }
    return { vals: vals, counts: counts };
  }

  function selBox(label, key, info, current) {
    if (!info.vals.length) { return ''; }
    return '<label class="fsel"><span>' + label + '</span><select data-filter="' + key + '"><option value="All">All</option>' +
      info.vals.map(function (v) {
        return '<option value="' + esc(v) + '"' + (v === current ? ' selected' : '') + '>' + esc(v) + ' (' + info.counts[v] + ')</option>';
      }).join('') + '</select></label>';
  }

  function libraryView() {
    var cats = usedList(db.config.cats, function (r) { return r.cat || []; }, false);
    var cuis = usedList(db.config.cuisines, function (r) { return r.cuisine ? [r.cuisine] : []; }, false);
    var tags = usedList([], function (r) { return r.tags || []; }, true);
    if (cats.vals.indexOf(ui.fCat) < 0) { ui.fCat = 'All'; }
    if (cuis.vals.indexOf(ui.fCuisine) < 0) { ui.fCuisine = 'All'; }
    if (tags.vals.indexOf(ui.fTag) < 0) { ui.fTag = 'All'; }
    var active = ui.fCat !== 'All' || ui.fCuisine !== 'All' || ui.fTag !== 'All';
    var hasSample = db.recipes.some(function (r) { return r.sample; });
    return shell('library',
      '<div class="top"><h1>Recipes</h1><span class="sp"></span>' +
      '<label for="q" style="position:absolute;left:-9999px">Search recipes</label>' +
      '<input id="q" class="search" type="search" placeholder="Search recipes or ingredients" value="' + esc(ui.q) + '">' +
      '<a class="btn primary" href="#/import">' + IC.plus + 'Add recipe</a></div>' +
      (hasSample ? '<div class="notice">Some recipes here are samples so you can try the app. <button class="btn" data-act="rm-samples">Remove samples</button></div>' : '') +
      '<div class="filters">' + selBox('Type', 'fCat', cats, ui.fCat) + selBox('Cuisine', 'fCuisine', cuis, ui.fCuisine) + selBox('Tag', 'fTag', tags, ui.fTag) +
      (active ? '<button class="btn" data-act="clear-filters">Clear</button>' : '') + '<span class="sp"></span><a class="btn" href="#/settings">' + IC.gear + 'Edit lists</a></div>' +
      '<div class="grid" id="grid">' + gridHtml() + '</div>');
  }

  /* ----- lists page (types, cuisines, tags) ----- */

  function listValues(kind) {
    if (kind !== 'tags') { return db.config[kind]; }
    var t = [];
    db.recipes.forEach(function (r) { (r.tags || []).forEach(function (x) { if (t.indexOf(x) < 0) { t.push(x); } }); });
    return t.sort();
  }

  function useCount(kind, v) {
    return db.recipes.filter(function (r) {
      if (kind === 'cats') { return (r.cat || []).indexOf(v) >= 0; }
      if (kind === 'cuisines') { return r.cuisine === v; }
      return (r.tags || []).indexOf(v) >= 0;
    }).length;
  }

  function listPanel(title, kind, note) {
    var vals = listValues(kind);
    var movable = kind !== 'tags';
    var rows = vals.map(function (v, i) {
      var n = useCount(kind, v);
      var key = kind + '|' + v;
      return '<div class="crow"><input class="inp" aria-label="Rename ' + esc(v) + '" data-cfg="' + kind + '" data-old="' + esc(v) + '" value="' + esc(v) + '">' +
        '<span class="cnt">' + n + (n === 1 ? ' recipe' : ' recipes') + '</span>' +
        (movable ? '<button class="rowx" data-act="cfg-up" data-kind="' + kind + '" data-n="' + i + '" aria-label="Move up"' + (i === 0 ? ' disabled' : '') + '>\u25B2</button>' +
          '<button class="rowx" data-act="cfg-down" data-kind="' + kind + '" data-n="' + i + '" aria-label="Move down"' + (i === vals.length - 1 ? ' disabled' : '') + '>\u25BC</button>' : '') +
        '<button class="btn' + (ui.confirmCfg === key ? ' danger' : '') + '" data-act="cfg-del" data-kind="' + kind + '" data-v="' + esc(v) + '">' +
        (ui.confirmCfg === key ? (n ? 'Remove from ' + n + '?' : 'Tap again') : 'Remove') + '</button></div>';
    }).join('');
    var add = kind === 'tags' ? '' : '<div class="crow"><input class="inp" id="add-' + kind + '" placeholder="Add a new one" aria-label="Add to ' + esc(title) + '">' +
      '<button class="btn primary" data-act="cfg-add" data-kind="' + kind + '">Add</button></div>';
    return '<section class="panel"><h2>' + esc(title) + '</h2><p class="note">' + note + '</p>' + (rows || '<p class="note">None yet.</p>') + add + '</section>';
  }

  function settingsView() {
    return shell('settings', '<div class="top"><h1>Settings</h1></div>' +
      '<div class="cfgwrap">' + accountPanel() +
      listPanel('Types', 'cats', 'The choices shown when you tag a recipe, like Breakfast or Dessert. Rename a type by editing it. Use the arrows to change the order.') +
      listPanel('Cuisines', 'cuisines', 'The cuisine suggestions. A new cuisine you type on a recipe is added here for you.') +
      listPanel('Tags', 'tags', 'Free tags come from your recipes. You can rename or remove them here. Add new ones while editing a recipe.') +
      '<div class="panel"><h2>Bulk import</h2><p class="note">A one-time import of many recipe links, for example from a Google Keep export.</p><div><a class="btn" href="#/bulk">Open bulk import</a></div></div></div>');
  }

  function ingItems(r, scale) {
    return r.ingredients.map(function (i) {
      if (i.h != null) { return '<li class="ghead">' + esc(i.h) + '</li>'; }
      return '<li><span class="q">' + esc(amount(i, scale)) + '</span><span>' + esc(i.n) + '</span></li>';
    }).join('');
  }

  function recipeView(r) {
    var sv = servingsOf(r);
    var scale = sv / r.servings;
    var num = 0;
    var chips = (r.cat || []).map(function (t) { return '<span class="tag cat">' + esc(t) + '</span>'; }).join('') +
      (r.cuisine ? '<span class="tag cui">' + esc(r.cuisine) + '</span>' : '') +
      (r.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
    return shell('library',
      '<div class="detail"><div class="left"><a class="back" href="#/">' + IC.back + 'All recipes</a>' +
      '<div class="hero" aria-hidden="true" style="background:' + ph(r.id) + '">' + esc(r.title.charAt(0).toUpperCase()) + imgTag(r) + '</div>' + photoBar(r) +
      '<div><h1 class="hero-t">' + esc(r.title) + '</h1><p class="meta" style="margin-top:8px;font-size:14px">' + esc(metaText(r)) + '</p>' + sourceLine(r) + creditLine(r) + '</div>' +
      (chips ? '<div class="tags">' + chips + '</div>' : '') +
      '<div class="actions"><a class="btn primary big" href="#/cook/' + esc(r.id) + '">' + IC.play + 'Cook</a>' +
      '<button class="btn outline big" data-act="addplan" data-id="' + esc(r.id) + '">Add to plan</button></div>' +
      '<div class="actions"><a class="btn" href="#/edit/' + esc(r.id) + '">Edit recipe</a>' +
      '<button class="btn danger" data-act="del" data-id="' + esc(r.id) + '">' + (ui.confirmDel === r.id ? 'Tap again to delete' : 'Delete') + '</button></div>' + nutritionPanel(r) + flagsPanel(r) + '</div>' +
      '<div class="right"><section class="panel"><div class="row"><h2>Ingredients</h2><div class="stepper"><span class="meta" style="font-size:14px">Servings</span>' +
      '<button data-act="sv-" data-id="' + esc(r.id) + '" aria-label="Fewer servings">−</button><b>' + sv + '</b>' +
      '<button data-act="sv+" data-id="' + esc(r.id) + '" aria-label="More servings">+</button></div></div>' +
      '<ul class="ings">' + ingItems(r, scale) + '</ul></section>' + nutritionPanel(r, 'review') +
      '<section class="panel"><h2>Steps</h2><ol class="steps">' + r.steps.map(function (s) {
        if (s.h != null) { return '<li class="shead">' + esc(s.h) + '</li>'; }
        num++;
        return '<li><span class="n">' + num + '</span><span>' + esc(s.t) + '</span></li>';
      }).join('') + '</ol></section></div></div>');
  }

  function stepSize(t) {
    var n = t.length;
    return n <= 90 ? 'sz1' : (n <= 170 ? 'sz2' : (n <= 320 ? 'sz3' : 'sz4'));
  }

  function cookView(r) {
    var sv = servingsOf(r);
    var scale = sv / r.servings;
    var cs = cookSteps(r);
    var n = cs.length;
    if (ui.step >= n) { ui.step = n - 1; }
    if (ui.step < 0) { ui.step = 0; }
    var st = cs[ui.step] || { t: '', ts: [], g: '' };
    var bars = '';
    for (var i = 0; i < n; i++) { bars += '<i class="' + (i <= ui.step ? 'on' : '') + '"></i>'; }
    var last = ui.step === n - 1;
    var pick = ui.tpick[ui.step] || 0;
    var picks = '';
    if (st.ts.length > 1) {
      picks = '<div class="picks" role="group" aria-label="Choose a time">' + st.ts.map(function (s, k) {
        return '<button class="chip' + (k === pick ? ' on' : '') + '" data-act="t-pick" data-v="' + k + '">' + fmtClock(s) + '</button>';
      }).join('') + '</div>';
    }
    return '<div class="cook"><header class="cook-h"><a class="btn" href="#/recipe/' + esc(r.id) + '">' + IC.x + 'Exit</a>' +
      '<div class="info"><b>' + esc(r.title) + '</b><span>Step ' + (ui.step + 1) + ' of ' + n + '</span></div>' +
      '<div class="stepper"><span class="meta" style="font-size:14px">Servings</span><button data-act="sv-" data-id="' + esc(r.id) + '" aria-label="Fewer servings">−</button><b>' + sv +
      '</b><button data-act="sv+" data-id="' + esc(r.id) + '" aria-label="More servings">+</button></div>' +
      '<div class="bars" aria-hidden="true">' + bars + '</div></header>' +
      '<div class="cook-b"><section class="cook-main">' + (st.g ? '<div class="grp">' + esc(st.g) + '</div>' : '') +
      '<div class="bigstep ' + stepSize(st.t) + '">' + esc(st.t) + '</div>' +
      (st.ts.length ? '<div class="timer"><div><div class="lbl">Timer</div><div class="t" id="tm">' + fmtClock(timerLeft()) + '</div></div>' +
        '<button class="btn primary big" id="tstart" data-act="t-toggle">Start timer</button>' +
        '<button class="btn big" data-act="t-add">+1 min</button><button class="btn big" data-act="t-reset">Reset</button>' + picks + '</div>' : '') +
      '</section><aside class="cook-side"><h3>Ingredients</h3><ul>' + ingItems(r, scale) + '</ul></aside></div>' +
      '<footer class="cook-f"><button class="btn big" style="flex:1" data-act="c-prev"' + (ui.step === 0 ? ' disabled' : '') + '>Previous</button>' +
      (last ? '<a class="btn primary big" style="flex:2" href="#/recipe/' + esc(r.id) + '">Done</a>' :
        '<button class="btn primary big" style="flex:2" data-act="c-next">Next step</button>') + '</footer></div>';
  }

  function planView() {
    var now = new Date();
    var mon = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7) + ui.weekOffset * 7);
    var todayKey = dkey(now);
    var days = [];
    var planned = 0;
    var mins = 0;
    for (var i = 0; i < 7; i++) {
      var d = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i);
      var k = dkey(d);
      var r = db.plan[k] ? byId(db.plan[k]) : null;
      if (r) { planned++; mins += (r.prep || 0) + (r.cook || 0); }
      days.push({ d: d, k: k, r: r });
    }
    var end = days[6].d;
    var label = MONTHS[mon.getMonth()] + ' ' + mon.getDate() + ' – ' + (end.getMonth() !== mon.getMonth() ? MONTHS[end.getMonth()] + ' ' : '') + end.getDate();
    return shell('plan',
      '<div class="top"><h1>Weekly plan</h1><span class="sp"></span><div class="weeknav">' +
      '<button class="btn" data-act="wk-" aria-label="Previous week">' + IC.prev + '</button><b>' + label + '</b>' +
      '<button class="btn" data-act="wk+" aria-label="Next week">' + IC.next + '</button></div></div>' +
      '<div class="kpis"><div class="kpi"><div class="l">Dinners planned</div><div class="v">' + planned + ' of 7</div></div>' +
      '<div class="kpi"><div class="l">Total cooking time</div><div class="v">' + (mins ? Math.floor(mins / 60) + ' hr ' + (mins % 60) + ' min' : '—') + '</div>' +
      '<div class="s">Prep plus cook, for planned dinners</div></div>' +
      '<div class="kpi"><div class="l">Net carbs and health fit</div><div class="v">Coming in v2</div><div class="s">Needs nutrition data</div></div></div>' +
      '<div class="week">' + days.map(function (x, i) {
        var inner;
        if (x.r) {
          inner = '<div class="slot"><a href="#/recipe/' + esc(x.r.id) + '" style="display:flex;flex-direction:column;flex:1"><div class="photo" aria-hidden="true" style="background:' + ph(x.r.id) + '">' +
            esc(x.r.title.charAt(0).toUpperCase()) + '</div><div class="b"><div class="t">' + esc(x.r.title) + '</div><div class="meta">' + esc(timeText(x.r) || x.r.servings + ' servings') + '</div></div></a>' +
            '<button class="x" data-act="plan-clear" data-k="' + x.k + '">Remove</button></div>';
        } else {
          inner = '<button class="addslot" data-act="plan-add" data-k="' + x.k + '">+ Add dinner</button>';
        }
        return '<div class="day"><div class="dl' + (x.k === todayKey ? ' today' : '') + '">' + DAYNAMES[i] + ' ' + x.d.getDate() + '</div>' + inner + '</div>';
      }).join('') + '</div>');
  }

  /* ---------- import from screenshots ---------- */

  var SHOT_MAX = 8;
  var shotUi = { list: [], msg: '', busy: false };

  function shotsPanel() {
    var h = '<div class="panel"><h2>Screenshots</h2><p class="note">Add the screenshots of one recipe, in order, like from TikTok or Snapchat. The app reads the text in them and shows the result on the next screen for you to check. Nothing is saved until you save. ' +
      'The images are sent to Google’s Gemini service to be read. On its free tier, Google may use them to improve its products, so crop out or skip anything personal.</p>';
    if (shotUi.list.length) {
      h += '<div class="slist">' + shotUi.list.map(function (s, n) {
        return '<div class="sitem"><img src="' + esc(s.url) + '" alt="Screenshot ' + (n + 1) + '"><div class="sbtns"><span class="sn">' + (n + 1) + '</span>' +
          '<button class="rowx" data-act="shot-up" data-n="' + n + '" aria-label="Move earlier"' + (n === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button class="rowx" data-act="shot-down" data-n="' + n + '" aria-label="Move later"' + (n === shotUi.list.length - 1 ? ' disabled' : '') + '>↓</button>' +
          '<button class="rowx" data-act="shot-del" data-n="' + n + '" aria-label="Remove">×</button></div></div>';
      }).join('') + '</div>';
    }
    if (shotUi.msg) { h += '<p class="note warn">' + esc(shotUi.msg) + '</p>'; }
    h += '<input type="file" accept="image/*" multiple id="sfile" hidden data-shots="1">' +
      '<div class="actions"><button class="btn" data-act="shot-add"' + (shotUi.busy || shotUi.list.length >= SHOT_MAX ? ' disabled' : '') + '>' + (shotUi.list.length ? 'Add more' : 'Choose screenshots') + '</button>' +
      '<button class="btn primary big" data-act="shot-read"' + (shotUi.busy || !shotUi.list.length ? ' disabled' : '') + '>' + (shotUi.busy ? 'Working...' : 'Read these screenshots') + '</button></div>' +
      '<p class="meta" style="font-size:12px">Up to ' + SHOT_MAX + ' images. Order matters: first screenshot first.</p></div>';
    return h;
  }

  function shotClear() {
    shotUi.list.forEach(function (s) { try { URL.revokeObjectURL(s.url); } catch (e) { /* ignore */ } });
    shotUi.list = [];
  }

  function shotAdd(files) {
    var room = SHOT_MAX - shotUi.list.length;
    var arr = Array.prototype.slice.call(files || [], 0, Math.max(0, room));
    if (!arr.length) { return; }
    shotUi.msg = (files.length > room) ? 'Only ' + SHOT_MAX + ' screenshots fit. The rest were left out.' : '';
    shotUi.busy = true; rerender();
    Promise.all(arr.map(function (f) {
      if (!/^image\//i.test(f.type || '')) { return Promise.resolve(null); }
      return photoResizer(f, 1800, 0.8).then(function (b) { return { blob: b, url: URL.createObjectURL(b) }; }, function () { return null; });
    })).then(function (res) {
      shotUi.busy = false;
      var bad = 0;
      res.forEach(function (x) { if (x) { shotUi.list.push(x); } else { bad++; } });
      if (bad) { shotUi.msg = bad + ' file(s) could not be read as images. Try JPEG or PNG.'; }
      rerender();
    });
  }

  function blobB64(b) {
    return new Promise(function (ok, no) {
      var fr = new FileReader();
      fr.onload = function () { var t = String(fr.result || ''); ok(t.slice(t.indexOf(',') + 1)); };
      fr.onerror = function () { no(new Error('read')); };
      fr.readAsDataURL(b);
    });
  }

  function shotRead() {
    if (shotUi.busy || !shotUi.list.length) { return; }
    if (!sb || !cloud.user) { shotUi.msg = 'Sign in under Settings to import from screenshots.'; rerender(); return; }
    shotUi.busy = true; shotUi.msg = ''; rerender();
    Promise.all(shotUi.list.map(function (s) { return blobB64(s.blob).then(function (d) { return { d: d, m: 'image/jpeg' }; }); })).then(function (arr) {
      return sb.functions.invoke(NUTRI_FN, { body: { shots: arr } });
    }).then(function (res) {
      shotUi.busy = false;
      if (res.error || !res.data || !res.data.recipe) {
        return fnError(res.error).then(function (m) { shotUi.msg = m; rerender(); });
      }
      var rec = res.data.recipe;
      ui.reorder = false; ui.focusRow = null;
      var d = linkDraft(rec, 'screenshots', (ui.draft && ui.draft.cat) || []);
      d.src = ''; d.img = ''; d.shots = true; d.pick = null; d.unclear = rec.unclear || [];
      d.original = 'Read from ' + shotUi.list.length + ' screenshot(s)\n\n' + (rec.title || '') + '\n\nIngredients\n' + (rec.ingredients || []).join('\n') + '\n\nInstructions\n' + (rec.steps || []).join('\n');
      ui.draft = d;
      rerender();
    }, function () { shotUi.busy = false; shotUi.msg = 'Could not prepare the images. Try again.'; rerender(); });
  }

  function importView() {
    var tabs = '<div class="tabs"><button class="' + (ui.importTab === 'text' ? 'on' : '') + '" data-act="itab" data-v="text">Paste text</button>' +
      '<button class="' + (ui.importTab === 'link' ? 'on' : '') + '" data-act="itab" data-v="link">Web link</button>' +
      '<button class="' + (ui.importTab === 'shots' ? 'on' : '') + '" data-act="itab" data-v="shots">Screenshots</button></div>';
    var body;
    if (ui.importTab === 'shots') {
      body = ui.draft ? draftHtml('import') : shotsPanel();
    } else if (ui.importTab === 'link') {
      body = ui.draft ? draftHtml('import') : '<div class="panel"><h2>Web link</h2><p class="note">Paste the address of a recipe page. The app reads the recipe data the page includes, then shows it on the next screen for you to check. Nothing is saved until you save. Some sites block this or have no recipe data. Then copy the page text and use Paste text.</p>' +
        '<label for="linkurl" class="lab">Recipe link</label><input id="linkurl" class="inp" type="url" inputmode="url" placeholder="https://" value="' + esc(ui.linkUrl) + '" data-field="linkUrl">' +
        (ui.linkMsg ? '<p class="note warn">' + esc(ui.linkMsg) + '</p>' : '') +
        '<button class="btn primary big" data-act="i-link"' + (ui.linkBusy ? ' disabled' : '') + '>' + (ui.linkBusy ? 'Reading the page...' : 'Read this link') + '</button></div>';
    } else if (!ui.draft) {
      body = '<div class="panel"><h2>Paste a recipe</h2><p class="note">Paste from Google Keep or a web page. Nothing is saved until you check it on the next screen.</p>' +
        '<label for="paste" class="lab">Recipe text</label><textarea id="paste" class="paste" data-field="importText">' + esc(ui.importText) + '</textarea>' +
        '<button class="btn primary big" data-act="i-read">Read this recipe</button></div>';
    } else {
      body = draftHtml('import');
    }
    return shell('import', '<div class="top"><h1>Import a recipe</h1><span class="sp"></span>' + tabs + '</div>' + body);
  }

  function editView(r) {
    return shell('library', '<div class="top"><a class="back" href="#/recipe/' + esc(r.id) + '">' + IC.back + 'Back to recipe</a><h1>Edit recipe</h1></div>' + draftHtml('edit'));
  }

  function shotPickHtml(d) {
    if (!shotUi.list.length) { return ''; }
    return '<div class="lab" style="margin-top:12px">Photo for this recipe (optional)</div><p class="note" style="margin-top:0">Tap one to use it. Tap again to clear. Screenshots may include app buttons or text.</p><div class="pgrid">' +
      shotUi.list.map(function (s, n) {
        return '<button class="pthumb' + (d.pick === n ? ' on' : '') + '" data-act="shot-pick" data-n="' + n + '" aria-label="Use screenshot ' + (n + 1) + ' as the photo" aria-pressed="' + (d.pick === n) + '"><img src="' + esc(s.url) + '" alt=""></button>';
      }).join('') + '</div>';
  }

  function draftHtml(mode) {
    var d = ui.draft;
    var missing = d.ingr.some(function (i) { return i.missing; });
    var left;
    if (mode === 'edit' && !d.original) {
      left = '<section class="panel"><h2>Tips</h2><p class="note">Use the headings to split ingredients and steps into groups, like "For the sauce". Start a step line with # to make it a heading. Times in a step, like "bake 25 minutes", become timers in cooking mode.</p></section>';
    } else {
      left = '<section class="panel"><h2>' + (d.shots ? 'What was read from the screenshots' : (d.src ? 'What was read from the link' : 'What you pasted')) + '</h2><p class="note">Kept with the recipe.</p>' +
        (d.shots && d.unclear && d.unclear.length ? '<p class="note warn">Could not read clearly: ' + esc(d.unclear.join('; ')) + '. Check the amounts and steps against your screenshots.</p>' : '') +
        '<div class="orig">' + esc(d.original) + '</div>' +
        (d.shots ? shotPickHtml(d) : '') +
        (mode === 'import' ? '<button class="btn" data-act="i-back">' + (d.shots ? 'Back to the screenshots' : 'Back to the text') + '</button>' : '') + '</section>';
    }
    var catList = db.config.cats.slice();
    d.cat.forEach(function (c) { if (catList.indexOf(c) < 0) { catList.push(c); } });
    var catChips = catList.map(function (c) {
      return '<button type="button" class="chip' + (d.cat.indexOf(c) >= 0 ? ' on' : '') + '" data-act="dcat" data-v="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');
    var rows = d.ingr.map(function (i, n) {
      if (ui.reorder) {
        var label = i.h != null ? i.h : ((i.qty || '') + ' ' + (i.name || '')).trim();
        return '<div class="irow rrow' + (i.h != null ? ' hrow' : '') + '" data-ri="' + n + '"><button class="grip" data-grip="' + n + '" aria-label="Drag to move">\u283F</button>' +
          '<span class="rtext">' + esc(label || '(empty)') + '</span></div>';
      }
      var acts = '<span class="racts"><button class="rowx" data-act="i-tohead" data-n="' + n + '" title="' + (i.h != null ? 'Make this an ingredient' : 'Make this a group heading') +
        '" aria-label="' + (i.h != null ? 'Make this an ingredient' : 'Make this a group heading') + '">' + (i.h != null ? IC.lst : IC.hd) + '</button>' +
        '<button class="rowx" data-act="i-delrow" data-n="' + n + '" aria-label="Remove">\u00D7</button></span>';
      if (i.h != null) {
        return '<div class="irow hrow"><input class="inp head" aria-label="Group heading" placeholder="Group heading, like For the sauce" data-ing="' + n + '" data-f="head" value="' + esc(i.h) + '">' + acts + '</div>';
      }
      return '<div class="irow"><input class="inp' + (i.missing ? ' warn' : '') + '" aria-label="Amount" data-ing="' + n + '" data-f="qty" value="' + esc(i.qty) + '">' +
        '<input class="inp" aria-label="Ingredient" data-ing="' + n + '" data-f="name" value="' + esc(i.name) + '">' + acts + '</div>';
    }).join('');
    var ingHead = '<div class="rowlab"><div class="lab">Ingredients</div><button class="btn" data-act="i-reorder">' + (ui.reorder ? 'Done' : 'Reorder') + '</button></div>' +
      '<p class="note" style="margin-top:0">' + (ui.reorder ? 'Drag the handle on a row to move it. Tap Done when finished.' :
        'New rows go below the row you last clicked. To move rows, tap Reorder, or press and hold a row on a touch screen.') + '</p>';
    var ingAdd = ui.reorder ? '' : '<div class="actions"><button class="btn" data-act="i-addrow">+ Ingredient</button><button class="btn" data-act="i-addhead">+ Group heading</button></div>';
    return '<div class="two">' + left +
      '<section class="panel"><h2>' + (mode === 'edit' ? 'Edit details' : 'Check before saving') + '</h2>' +
      (mode === 'edit' ? '' : '<p class="note">Nothing is saved yet.</p>') +
      '<div class="flex2"><div class="field"><label for="d-title">Title</label><input id="d-title" class="inp" data-field="title" value="' + esc(d.title) + '"></div>' +
      '<div class="field s"><label for="d-sv">Servings</label><input id="d-sv" class="inp" inputmode="numeric" data-field="servings" value="' + esc(d.servings) + '"></div>' +
      '<div class="field s"><label for="d-cook">Total min</label><input id="d-cook" class="inp" inputmode="numeric" data-field="cook" value="' + esc(d.cook) + '"></div></div>' +
      '<div class="lab">Type (pick any that fit)</div><div class="chipwrap">' + catChips + '</div>' +
      '<div class="flex2"><div class="field"><label for="d-cui">Cuisine</label><input id="d-cui" class="inp" list="cuisines" data-field="cuisine" value="' + esc(d.cuisine) + '" placeholder="Start typing, or enter your own">' +
      '<datalist id="cuisines">' + db.config.cuisines.map(function (c) { return '<option value="' + esc(c) + '">'; }).join('') + '</datalist></div>' +
      '<div class="field"><label for="d-tags">Other tags (separate with commas)</label><input id="d-tags" class="inp" data-field="tags" value="' + esc(d.tags) + '"></div></div>' +
      ingHead + rows + ingAdd +
      (missing ? '<div class="warnnote">Some amounts were not found in your text. Please fill them in, or leave them blank.</div>' : '') +
      '<div class="lab">Steps (one per line. Start a line with # for a heading.)</div><textarea class="stepsbox" aria-label="Steps" data-field="steps">' + esc(d.steps) + '</textarea>' +
      '<div class="actions"><a class="btn" href="' + (mode === 'edit' ? '#/recipe/' + esc(ui.editId) : '#/') + '" data-act="i-cancel">Cancel</a>' +
      '<button class="btn primary" data-act="i-save">Save recipe</button></div></section></div>';
  }

  function modalHtml() {
    var m = ui.modal;
    if (!m) { return ''; }
    var inner = '';
    if (m.kind === 'pick') {
      inner = '<h2>Pick a dinner</h2>' + db.recipes.map(function (r) {
        return '<button class="opt" data-act="plan-pick" data-id="' + esc(r.id) + '" data-k="' + m.k + '">' + esc(r.title) + '<span>' + esc(timeText(r)) + '</span></button>';
      }).join('');
    } else {
      var now = new Date();
      inner = '<h2>Pick a day</h2>';
      for (var i = 0; i < 14; i++) {
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
        var k = dkey(d);
        var cur3 = db.plan[k] ? byId(db.plan[k]) : null;
        inner += '<button class="opt" data-act="plan-pick" data-id="' + esc(m.id) + '" data-k="' + k + '">' +
          DAYNAMES[(d.getDay() + 6) % 7] + ' ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + '<span>' + (cur3 ? 'Replaces ' + esc(cur3.title) : 'Free') + '</span></button>';
      }
    }
    return '<div class="modal" data-act="close"><div class="sheet" role="dialog" aria-modal="true">' + inner +
      '<button class="btn" data-act="close">Cancel</button></div></div>';
  }

  /* ---------- timer ---------- */

  function fmtClock(sec) {
    sec = Math.max(0, Math.ceil(sec));
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    if (m >= 60) { return Math.floor(m / 60) + ':' + pad(m % 60) + ':' + pad(s); }
    return m + ':' + pad(s);
  }

  function stepSecs() {
    var r = byId(cur.id);
    if (!r) { return 0; }
    var st = cookSteps(r)[ui.step];
    if (!st) { return 0; }
    return st.ts[ui.tpick[ui.step] || 0] || 0;
  }

  function timerLeft() {
    if (!ui.timer || ui.timer.step !== ui.step) { return stepSecs(); }
    if (ui.timer.running) { return (ui.timer.end - Date.now()) / 1000; }
    return ui.timer.left;
  }

  function stopTick() {
    if (ui.tick) { clearInterval(ui.tick); ui.tick = null; }
  }

  function resetTimer() {
    stopTick();
    ui.timer = null;
  }

  function beep() {
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      var c = new C();
      for (var i = 0; i < 3; i++) {
        var o = c.createOscillator();
        var g = c.createGain();
        o.frequency.value = 880;
        o.connect(g);
        g.connect(c.destination);
        g.gain.setValueAtTime(0.2, c.currentTime + i * 0.4);
        g.gain.setValueAtTime(0, c.currentTime + i * 0.4 + 0.25);
        o.start(c.currentTime + i * 0.4);
        o.stop(c.currentTime + i * 0.4 + 0.3);
      }
    } catch (e) { /* ignore */ }
    try { if (navigator.vibrate) { navigator.vibrate([300, 150, 300]); } } catch (e2) { /* ignore */ }
  }

  function paintTimer() {
    var el = document.getElementById('tm');
    var btn = document.getElementById('tstart');
    if (!el) { return; }
    var left = timerLeft();
    el.textContent = fmtClock(left);
    var running = ui.timer && ui.timer.step === ui.step && ui.timer.running;
    el.className = 't' + (left <= 0 && ui.timer && ui.timer.step === ui.step ? ' done' : '');
    var started = ui.timer && ui.timer.step === ui.step && ui.timer.started;
    if (btn) { btn.textContent = running ? 'Pause' : (left <= 0 ? 'Start again' : (started ? 'Resume' : 'Start timer')); }
  }

  function tickFn() {
    if (!ui.timer || !ui.timer.running) { stopTick(); return; }
    if (ui.timer.end - Date.now() <= 0) {
      ui.timer.running = false;
      ui.timer.left = 0;
      stopTick();
      beep();
    }
    paintTimer();
  }

  function timerToggle() {
    var left = timerLeft();
    if (ui.timer && ui.timer.step === ui.step && ui.timer.running) {
      ui.timer.left = (ui.timer.end - Date.now()) / 1000;
      ui.timer.running = false;
      stopTick();
    } else {
      if (left <= 0) { left = stepSecs(); }
      ui.timer = { step: ui.step, running: true, started: true, left: left, end: Date.now() + left * 1000 };
      stopTick();
      ui.tick = setInterval(tickFn, 250);
    }
    paintTimer();
  }

  function timerAdd() {
    var left = timerLeft() + 60;
    if (ui.timer && ui.timer.step === ui.step && ui.timer.running) {
      ui.timer.end = Date.now() + left * 1000;
    } else {
      var wasStarted = ui.timer && ui.timer.step === ui.step && ui.timer.started;
      ui.timer = { step: ui.step, running: false, started: !!wasStarted, left: left, end: 0 };
    }
    paintTimer();
  }

  /* ---------- wake lock (the Family Hub app already keeps the screen on; this helps in other browsers) ---------- */

  function wakeOn() {
    try {
      if (navigator.wakeLock && !wakeLock) {
        navigator.wakeLock.request('screen').then(function (l) { wakeLock = l; }).catch(function () { /* ignore */ });
      }
    } catch (e) { /* ignore */ }
  }

  function wakeOff() {
    try { if (wakeLock) { wakeLock.release(); wakeLock = null; } } catch (e) { wakeLock = null; }
  }

  /* ---------- router ---------- */

  var cur = { name: 'library', id: null };

  function route() {
    var h = location.hash;
    if (/access_token=|error_description=|[?&]code=/.test(h)) { h = '#/'; }
    var p = h.replace(/^#\/?/, '').split('/');
    return { name: p[0] || 'library', id: p[1] || null };
  }

  function view(nr) {
    var r = nr.id ? byId(nr.id) : null;
    if (nr.name === 'recipe' && r) { return recipeView(r); }
    if (nr.name === 'cook' && r) { return cookView(r); }
    if (nr.name === 'edit' && r) { return editView(r); }
    if (nr.name === 'settings') { return settingsView(); }
    if (nr.name === 'bulk') { return bulkView(); }
    if (nr.name === 'profile') { return profileView(); }
    if (nr.name === 'plan') { return planView(); }
    if (nr.name === 'import') { return importView(); }
    return libraryView();
  }

  function render() {
    var nr = route();
    if (nr.name !== 'cook') { resetTimer(); wakeOff(); }
    if (nr.name !== cur.name || nr.id !== cur.id) { ui.confirmDel = null; ui.confirmCfg = null; ui.modal = null; }
    if (nr.name === 'cook' && (cur.name !== 'cook' || cur.id !== nr.id)) { ui.step = 0; ui.tpick = {}; resetTimer(); }
    if (nr.name !== 'edit' && ui.editId) { ui.draft = null; ui.editId = null; }
    if (nr.name === 'edit') {
      var er = byId(nr.id);
      if (er && ui.editId !== nr.id) { ui.draft = draftFrom(er); ui.editId = nr.id; ui.reorder = false; ui.focusRow = null; }
    }
    cur = nr;
    document.getElementById('app').innerHTML = view(nr);
    if (nr.name === 'cook' && byId(nr.id)) { wakeOn(); paintTimer(); }
    window.scrollTo(0, 0);
  }

  function rerender() {
    var y = window.pageYOffset;
    document.getElementById('app').innerHTML = view(cur);
    if (cur.name === 'cook' && byId(cur.id)) { paintTimer(); }
    window.scrollTo(0, y);
  }

  /* ---------- drafts (import review and edit) ---------- */

  function rowFromIng(i) {
    return { qty: ((i.q != null ? fmtQty(i.q) : '') + ' ' + (i.u || '')).trim(), name: i.n, missing: !i.found };
  }

  function startDraft(text) {
    ui.reorder = false;
    ui.focusRow = null;
    ui.draft = textDraft(text);
  }

  function textDraft(text) {
    var p = parseText(text);
    return {
      original: text, title: p.title, servings: p.servings, cook: p.minutes || '', cat: [], cuisine: '', tags: '',
      ingr: p.ing.map(function (i) { return i.h != null ? { h: i.h } : rowFromIng(i); }),
      steps: p.steps.join('\n')
    };
  }

  function startLinkDraft(rec, source) {
    ui.reorder = false;
    ui.focusRow = null;
    ui.draft = linkDraft(rec, source, (ui.draft && ui.draft.cat) || []);
  }

  function linkDraft(rec, source, cats) {
    var ing = (rec.ingredients || []).map(function (l) {
      var pl = parseIngredientLine(l);
      return pl.n ? rowFromIng(pl) : { qty: '', name: l, missing: true };
    });
    var img = String(rec.image || '').replace(/^http:\/\//i, 'https://');
    if (!/^https:\/\//i.test(img)) { img = ''; }
    var orig = 'Imported from ' + source + '\n\n' + (rec.title || '') + '\n\nIngredients\n' + (rec.ingredients || []).join('\n') + '\n\nInstructions\n' + (rec.steps || []).join('\n');
    var known = [];
    (rec.category || []).concat(rec.cuisine ? [] : []).forEach(function (c) {
      db.config.cats.forEach(function (k) { if (k.toLowerCase() === String(c).toLowerCase() && known.indexOf(k) < 0) { known.push(k); } });
    });
    return {
      original: orig, title: rec.title || '', servings: rec.servings || 4, cook: rec.minutes || '', cat: known.length ? known : cats, cuisine: rec.cuisine || '', tags: '',
      ingr: ing, steps: (rec.steps || []).join('\n'), src: source, img: img
    };
  }

  function draftFrom(r) {
    return {
      original: r.original || '', title: r.title, servings: r.servings, cook: (r.prep || 0) + (r.cook || 0) || '',
      cat: (r.cat || []).slice(), cuisine: r.cuisine || '', tags: (r.tags || []).join(', '),
      ingr: r.ingredients.map(function (i) { return i.h != null ? { h: i.h } : { qty: amount(i, 1), name: i.n, missing: false }; }),
      steps: r.steps.map(function (s) { return s.h != null ? '# ' + s.h : s.t; }).join('\n')
    };
  }

  function fieldsFromDraft(d) {
    var ingredients = [];
    d.ingr.forEach(function (i) {
      if (i.h != null) { if (i.h.trim()) { ingredients.push({ h: i.h.trim() }); } return; }
      if (!i.name.trim()) { return; }
      var p = parseQtyUnit(i.qty);
      ingredients.push({ q: p.q, u: p.u, n: i.name.trim() });
    });
    var steps = [];
    d.steps.split('\n').forEach(function (l) {
      l = l.trim();
      if (!l) { return; }
      if (l.charAt(0) === '#') { var h = l.replace(/^#+\s*/, ''); if (h) { steps.push({ h: h }); } return; }
      var ts = timerList(l);
      steps.push({ t: l, s: ts[0] || 0, ts: ts });
    });
    var sv = parseInt(d.servings, 10);
    return {
      title: d.title.trim(), servings: sv > 0 ? sv : 4, prep: 0, cook: parseInt(d.cook, 10) || 0,
      cat: d.cat.slice(), cuisine: d.cuisine.trim(),
      tags: d.tags.split(',').map(function (t) { return t.trim(); }).filter(Boolean),
      ingredients: ingredients, steps: steps
    };
  }

  function saveDraft() {
    var d = ui.draft;
    if (!d || !d.title.trim()) { return false; }
    var fields = fieldsFromDraft(d);
    if (fields.cuisine && db.config.cuisines.map(function (c) { return c.toLowerCase(); }).indexOf(fields.cuisine.toLowerCase()) < 0) { db.config.cuisines.push(fields.cuisine); }
    var id;
    if (ui.editId) {
      var r = byId(ui.editId);
      if (!r) { return false; }
      Object.keys(fields).forEach(function (k) { r[k] = fields[k]; });
      r.sample = false;
      id = r.id;
    } else {
      fields.id = 'r' + Date.now();
      fields.original = d.original;
      if (d.src) { fields.src = d.src; }
      if (d.img) { fields.img = d.img; }
      db.recipes.unshift(fields);
      id = fields.id;
    }
    save();
    var pickBlob = (!ui.editId && d.shots && d.pick != null && shotUi.list[d.pick]) ? shotUi.list[d.pick].blob : null;
    if (d.shots && !ui.editId) { shotClear(); }
    ui.draft = null;
    ui.editId = null;
    ui.importText = '';
    ui.servings[id] = null;
    location.hash = '#/recipe/' + id;
    if (pickBlob) { setPhoto(id, pickBlob); }
    return true;
  }

  /* ---------- bulk import (one time, from a Google Keep export) ---------- */

  var BULK_KEY = 'recipeapp.bulk';
  var GENERIC_TITLE = /^(recipes?|ingredients?|instructions?|directions?|method|notes?|untitled)$/i;
  var bulk = loadBulk();
  var bulkUi = { run: false, stop: false, msg: '', now: '' };

  function loadBulk() {
    var b = null;
    try { b = JSON.parse(localStorage.getItem(BULK_KEY)); } catch (e) { b = null; }
    if (!b || !b.items || !b.done) { b = { items: [], done: {} }; }
    return b;
  }

  function saveBulk() {
    try { localStorage.setItem(BULK_KEY, JSON.stringify(bulk)); } catch (e) { /* ignore */ }
  }

  function bulkKey(u) {
    return String(u || '').toLowerCase().replace(/#.*$/, '').replace(/[?&]utm_[^&]*/g, '').replace(/\/+$/, '');
  }

  function bulkLoad(text) {
    var j = null;
    try { j = JSON.parse(text); } catch (e) { j = null; }
    if (!j || !Array.isArray(j.items) || !j.items.length) { bulkUi.msg = 'That file is not a bulk import file.'; return; }
    bulk = { items: [], done: {} };
    j.items.slice(0, 3000).forEach(function (it) {
      if (!it || typeof it !== 'object') { return; }
      var o = { title: String(it.title || '').slice(0, 160), url: /^https?:\/\//i.test(it.url || '') ? String(it.url).slice(0, 600) : '' };
      if (it.text) { o.text = String(it.text).slice(0, 20000); }
      if (it.skip) { o.skip = String(it.skip).slice(0, 40); }
      bulk.items.push(o);
    });
    bulkUi.msg = '';
    saveBulk();
  }

  function bulkCounts() {
    var c = { total: bulk.items.length, skip: 0, ok: 0, fail: 0, dup: 0, left: 0 };
    bulk.items.forEach(function (it, i) {
      var d = bulk.done[i];
      if (it.skip) { c.skip++; return; }
      if (!d) { c.left++; } else if (d.s === 'ok') { c.ok++; } else if (d.s === 'dup') { c.dup++; } else { c.fail++; }
    });
    return c;
  }

  function bulkNext() {
    for (var i = 0; i < bulk.items.length; i++) {
      if (!bulk.items[i].skip && !bulk.done[i]) { return i; }
    }
    return -1;
  }

  function bulkFromText(item) {
    var d = textDraft(item.text);
    if (!d.ingr.some(function (r) { return r.h == null; })) { return null; }
    if (!d.title.trim() || GENERIC_TITLE.test(d.title.trim())) { d.title = item.title || 'Untitled recipe'; }
    if (item.url) { d.src = item.url; }
    return d;
  }

  // Resolves to { ok, draft } or { ok: false, why, auth }. Never rejects.
  function bulkFetch(item) {
    function fallback(why) {
      if (item.text) {
        var d = bulkFromText(item);
        if (d) { return { ok: true, draft: d }; }
      }
      return { ok: false, why: why };
    }
    if (!item.url) { return Promise.resolve(fallback('Could not find ingredients in the note.')); }
    return sb.functions.invoke(NUTRI_FN, { body: { url: item.url } }).then(function (res) {
      if (res.error || !res.data || !res.data.recipe) {
        return fnError(res.error).then(function (m) {
          if (/not signed in/i.test(m)) { return { ok: false, why: m, auth: true }; }
          return fallback(m);
        });
      }
      var rec = res.data.recipe;
      if (!rec.ingredients || !rec.ingredients.length) { return fallback('No ingredients found on that page.'); }
      if (!rec.steps || !rec.steps.length) { return fallback('No steps found on that page.'); }
      var d2 = linkDraft(rec, res.data.source || item.url, []);
      if (!d2.title.trim()) { d2.title = item.title; }
      return { ok: true, draft: d2 };
    }, function (e) { return fallback(failMsg(e)); });
  }

  function bulkAdd(item, d, i) {
    var f = fieldsFromDraft(d);
    if (!f.title) { f.title = item.title || 'Untitled'; }
    if (f.cuisine && db.config.cuisines.map(function (c) { return c.toLowerCase(); }).indexOf(f.cuisine.toLowerCase()) < 0) { db.config.cuisines.push(f.cuisine); }
    if (f.tags.indexOf('Keep import') < 0) { f.tags.push('Keep import'); }
    f.id = 'r' + Date.now() + '-' + i;
    f.original = d.original;
    if (d.src) { f.src = d.src; }
    if (d.img) { f.img = d.img; }
    db.recipes.unshift(f);
    return f.id;
  }

  function bulkRun(limit) {
    if (bulkUi.run) { return; }
    if (!sb || !cloud.user) { bulkUi.msg = 'Sign in under Settings first. The import reads pages through your account.'; rerender(); return; }
    bulkUi.run = true; bulkUi.stop = false; bulkUi.msg = '';
    var have = {};
    db.recipes.forEach(function (r) { if (r.src) { have[bulkKey(r.src)] = 1; } });
    var count = 0;
    var streak = 0;
    function finish() {
      bulkUi.run = false; bulkUi.now = '';
      persist(); cloudChanged(); rerender();
    }
    function next() {
      if (bulkUi.stop || (limit && count >= limit)) { finish(); return; }
      var i = bulkNext();
      if (i < 0) { finish(); return; }
      var item = bulk.items[i];
      if (item.url && have[bulkKey(item.url)]) { bulk.done[i] = { s: 'dup' }; saveBulk(); setTimeout(next, 0); return; }
      count++;
      bulkUi.now = item.title || item.url;
      rerender();
      bulkFetch(item).then(function (r) {
        if (r.ok) {
          bulk.done[i] = { s: 'ok', id: bulkAdd(item, r.draft, i) };
          if (item.url) { have[bulkKey(item.url)] = 1; }
          streak = 0;
        } else {
          bulk.done[i] = { s: 'fail', why: String(r.why || 'Failed').slice(0, 200) };
          streak++;
          if (r.auth) { bulkUi.msg = 'You are signed out. Sign in under Settings, then continue.'; bulkUi.stop = true; delete bulk.done[i]; count--; }
        }
        saveBulk(); persist();
        if (streak >= 8) { bulkUi.msg = 'Stopped after 8 failures in a row. Check your connection or the Supabase function, then continue.'; finish(); return; }
        setTimeout(next, 400);
      });
    }
    next();
  }

  // Imported recipes that probably need a human look: no real name, no steps, or a very long "ingredient" line.
  function bulkAttention() {
    var out = [];
    db.recipes.forEach(function (r) {
      if ((r.tags || []).indexOf('Keep import') < 0) { return; }
      var why = [];
      if (!r.title || GENERIC_TITLE.test(String(r.title).trim()) || /^untitled recipe/i.test(r.title)) { why.push('needs a name'); }
      if (!r.steps || !r.steps.length) { why.push('no steps'); }
      if ((r.ingredients || []).some(function (i) { return i.n && i.n.length > 140; })) { why.push('very long ingredient line'); }
      if (why.length) { out.push({ id: r.id, title: r.title || '(no name)', why: why.join(', ') }); }
    });
    return out;
  }

  function bulkAttentionPanel() {
    var rows = bulkAttention();
    if (!rows.length) { return ''; }
    return '<div class="panel"><h2>Needs attention (' + rows.length + ')</h2><p class="note">Imported recipes that probably need a fix. Open one and use Edit recipe.</p><ul class="blist">' + rows.map(function (r) {
      return '<li><a href="#/recipe/' + esc(r.id) + '">' + esc(r.title) + '</a><span class="note"> ' + esc(r.why) + '</span></li>';
    }).join('') + '</ul></div>';
  }

  function bulkList(title, rows) {
    if (!rows.length) { return ''; }
    return '<div class="panel"><h2>' + esc(title) + ' (' + rows.length + ')</h2><ul class="blist">' + rows.map(function (r) {
      return '<li><span>' + esc(r.title || r.url) + '</span>' + (r.url ? ' <a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">open link</a>' : '') + (r.why ? '<span class="note"> ' + esc(r.why) + '</span>' : '') + '</li>';
    }).join('') + '</ul></div>';
  }

  function bulkView() {
    var h = '<div class="top"><h1>Bulk import</h1></div><div class="cfgwrap">';
    var n = bulk.items.length;
    if (bulkUi.msg) { h += '<p class="note warn">' + esc(bulkUi.msg) + '</p>'; }
    if (!n) {
      h += '<div class="panel"><h2>One-time import from Google Keep</h2>' +
        '<p class="note">Choose the file <b>keep-recipes.json</b>. The app reads each recipe link through your account and saves the recipe with the tag <b>Keep import</b>. Keep this page open while it runs. Nothing is lost if you close it. It continues where it stopped.</p>' +
        '<input type="file" accept=".json,application/json" data-bulk="1"></div>' + bulkAttentionPanel() + '</div>';
      return shell('settings', h);
    }
    var c = bulkCounts();
    h += '<div class="panel"><h2>' + (bulkUi.run ? 'Importing...' : 'Ready') + '</h2>' +
      '<p class="note">' + c.ok + ' imported · ' + c.left + ' left · ' + c.fail + ' failed · ' + c.skip + ' skipped' + (c.dup ? ' · ' + c.dup + ' already in your library' : '') + '</p>' +
      (bulkUi.run ? '<p class="note">Now: ' + esc(bulkUi.now) + '</p>' : '') +
      '<div class="photobar">' +
      (bulkUi.run ? '<button class="btn" data-act="bulk-stop">Stop</button>' :
        (c.left ? '<button class="btn" data-act="bulk-test">Import next 20</button><button class="btn" data-act="bulk-all">Import all remaining</button>' : '') +
        (c.fail ? '<button class="btn" data-act="bulk-retry">Retry failed</button>' : '') +
        '<button class="btn" data-act="bulk-clear">Clear import data</button>') +
      '</div></div>';
    var fails = [];
    var skips = [];
    bulk.items.forEach(function (it, i) {
      var d = bulk.done[i];
      if (it.skip) { skips.push({ title: it.title, url: it.url, why: it.skip }); }
      else if (d && d.s === 'fail') { fails.push({ title: it.title, url: it.url, why: d.why }); }
    });
    h += bulkAttentionPanel() + bulkList('Failed', fails) + bulkList('Skipped', skips) + '</div>';
    return shell('settings', h);
  }

  /* ---------- list editing ---------- */

  function cfgRemove(kind, v) {
    if (kind !== 'tags') { db.config[kind] = db.config[kind].filter(function (x) { return x !== v; }); }
    db.recipes.forEach(function (r) {
      if (kind === 'cats') { r.cat = (r.cat || []).filter(function (x) { return x !== v; }); }
      else if (kind === 'cuisines') { if (r.cuisine === v) { r.cuisine = ''; } }
      else { r.tags = (r.tags || []).filter(function (x) { return x !== v; }); }
    });
    save();
  }

  function cfgRename(kind, oldV, newV) {
    function swap(arr) {
      var out = [];
      (arr || []).forEach(function (x) { var y = x === oldV ? newV : x; if (out.indexOf(y) < 0) { out.push(y); } });
      return out;
    }
    if (kind !== 'tags') { db.config[kind] = swap(db.config[kind]); }
    db.recipes.forEach(function (r) {
      if (kind === 'cats') { r.cat = swap(r.cat); }
      else if (kind === 'cuisines') { if (r.cuisine === oldV) { r.cuisine = newV; } }
      else { r.tags = swap(r.tags); }
    });
    save();
  }

  /* ---------- review form: insert below the cursor, drag to reorder ---------- */

  function insertRow(row) {
    var d = ui.draft;
    var pos = (ui.focusRow == null || ui.focusRow >= d.ingr.length) ? d.ingr.length : ui.focusRow + 1;
    d.ingr.splice(pos, 0, row);
    ui.focusRow = pos;
    rerender();
    var e = document.querySelector('[data-ing="' + pos + '"]');
    if (e) {
      e.focus();
      try { e.scrollIntoView({ block: 'nearest' }); } catch (er) { /* ignore */ }
    }
  }

  function moveRow(from, to) {
    var a = ui.draft.ingr;
    if (from === to || from < 0 || to < 0 || from >= a.length || to >= a.length) { return; }
    var r = a.splice(from, 1)[0];
    a.splice(to, 0, r);
    ui.focusRow = to;
  }

  var drag = null;
  var press = null;

  function clearMarks() {
    Array.prototype.forEach.call(document.querySelectorAll('.rrow'), function (r) { r.classList.remove('dropmark-up'); r.classList.remove('dropmark-down'); });
  }

  function dragMove(ev) {
    if (!drag) { return; }
    var dy = (ev.clientY - drag.startY) + (window.pageYOffset - drag.startScroll);
    drag.row.style.transform = 'translateY(' + dy + 'px)';
    var target = drag.mids[drag.n] + dy;
    var best = drag.n;
    var dist = 1e9;
    drag.mids.forEach(function (m, i) { var dd = Math.abs(m - target); if (dd < dist) { dist = dd; best = i; } });
    drag.to = best;
    clearMarks();
    if (best < drag.n) { drag.rows[best].classList.add('dropmark-up'); }
    if (best > drag.n) { drag.rows[best].classList.add('dropmark-down'); }
    if (ev.clientY < 70) { window.scrollBy(0, -14); }
    if (ev.clientY > window.innerHeight - 70) { window.scrollBy(0, 14); }
  }

  function dragEnd() {
    if (!drag) { return; }
    var d = drag;
    drag = null;
    if (d.to !== d.n) { moveRow(d.n, d.to); }
    rerender();
  }

  document.addEventListener('pointerdown', function (ev) {
    ui.lastPtr = ev.pointerType || '';
    var t = ev.target;
    var g = t.closest ? t.closest('[data-grip]') : null;
    if (g && ui.reorder && ui.draft) {
      var rows = Array.prototype.slice.call(document.querySelectorAll('.rrow'));
      var n = +g.getAttribute('data-grip');
      drag = {
        n: n, to: n, row: rows[n], rows: rows, startY: ev.clientY, startScroll: window.pageYOffset,
        mids: rows.map(function (r) { var b = r.getBoundingClientRect(); return b.top + b.height / 2; })
      };
      rows[n].classList.add('dragging');
      try { g.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
      ev.preventDefault();
      return;
    }
    if (ev.pointerType === 'touch' && ui.draft && !ui.reorder && t.closest && t.closest('.irow')) {
      if (press) { clearTimeout(press.timer); }
      press = { x: ev.clientX, y: ev.clientY, timer: setTimeout(function () {
        press = null;
        ui.reorder = true;
        rerender();
        try { if (navigator.vibrate) { navigator.vibrate(30); } } catch (e2) { /* ignore */ }
      }, 550) };
    }
  });

  document.addEventListener('pointermove', function (ev) {
    if (drag) { dragMove(ev); return; }
    if (press && (Math.abs(ev.clientX - press.x) > 8 || Math.abs(ev.clientY - press.y) > 8)) { clearTimeout(press.timer); press = null; }
  });

  function pointerDone() {
    if (press) { clearTimeout(press.timer); press = null; }
    dragEnd();
  }
  document.addEventListener('pointerup', pointerDone);
  document.addEventListener('pointercancel', pointerDone);

  document.addEventListener('contextmenu', function (ev) {
    if (ui.lastPtr === 'touch' && ui.draft && ev.target.closest && ev.target.closest('.irow')) { ev.preventDefault(); }
  });

  document.addEventListener('focusin', function (ev) {
    var n = ev.target.getAttribute && ev.target.getAttribute('data-ing');
    if (n != null && n !== '') { ui.focusRow = +n; }
  });

  /* ---------- events ---------- */

  document.addEventListener('change', function (ev) {
    var t = ev.target;
    var pid = t.getAttribute && t.getAttribute('data-photo');
    if (pid) {
      var pf0 = t.files && t.files[0];
      if (pf0) { setPhoto(pid, pf0); }
      try { t.value = ''; } catch (e) { /* ignore */ }
      return;
    }
    if (t.getAttribute && t.getAttribute('data-shots')) {
      var sf = t.files ? Array.prototype.slice.call(t.files) : [];
      try { t.value = ''; } catch (e) { /* ignore */ }
      if (sf.length) { shotAdd(sf); }
      return;
    }
    if (t.getAttribute && t.getAttribute('data-bulk')) {
      var bf = t.files && t.files[0];
      if (bf) {
        var rd = new FileReader();
        rd.onload = function () { bulkLoad(String(rd.result || '')); rerender(); };
        rd.onerror = function () { bulkUi.msg = 'Could not read that file.'; rerender(); };
        rd.readAsText(bf);
      }
      return;
    }
    var fk = t.getAttribute && t.getAttribute('data-filter');
    if (fk) { ui[fk] = t.value; rerender(); return; }
    var lk = t.getAttribute && t.getAttribute('data-lim');
    if (lk) {
      var lv = t.value.trim();
      var num = lv === '' ? null : parseFloat(lv);
      pf().limits[lk] = (num == null || isNaN(num) || num < 0) ? null : num;
      save(); rerender(); return;
    }
    var ak = t.getAttribute && t.getAttribute('data-av');
    if (ak != null) {
      var av = t.value.trim();
      var list = pf().avoid;
      if (av) { list[+ak] = av; } else { list.splice(+ak, 1); }
      save(); rerender(); return;
    }
    var ck = t.getAttribute && t.getAttribute('data-cfg');
    if (ck) {
      var oldV = t.getAttribute('data-old');
      var nv = t.value.trim();
      if (nv && nv !== oldV) { cfgRename(ck, oldV, nv); }
      rerender();
    }
  });

  document.addEventListener('keydown', function (ev) {
    var t = ev.target;
    if (ev.key === 'Enter' && t.id && t.id.indexOf('add-') === 0) {
      var b = t.parentNode.querySelector('[data-act="cfg-add"]');
      if (b) { b.click(); }
    }
    if (ev.key === 'Enter' && t.id === 'avadd') {
      var ab = t.parentNode.querySelector('[data-act="av-add"]');
      if (ab) { ab.click(); }
    }
    if (ev.key === 'Enter' && t.id === 'nsearch') {
      var sb2 = t.parentNode.querySelector('[data-act="nutri-search"]');
      if (sb2) { sb2.click(); }
    }
  });

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var el = t.closest ? t.closest('[data-act]') : null;
    if (!el) { return; }
    var act = el.getAttribute('data-act');
    var id = el.getAttribute('data-id');
    if (act === 'close') {
      if (el.className.indexOf('modal') >= 0 && t !== el) { return; }
      ui.modal = null; rerender(); return;
    }
    if (act === 'clear-filters') { ui.fCat = 'All'; ui.fCuisine = 'All'; ui.fTag = 'All'; rerender(); return; }
    if (act === 'av-add') {
      var ai = document.getElementById('avadd');
      var aw = ai ? ai.value.trim() : '';
      var al = pf().avoid;
      if (aw && al.map(function (x) { return x.toLowerCase(); }).indexOf(aw.toLowerCase()) < 0) { al.push(aw); save(); }
      rerender(); return;
    }
    if (act === 'av-del') { pf().avoid.splice(+el.getAttribute('data-n'), 1); save(); rerender(); return; }
    if (act === 'prof-ok') { pf().confirmed = true; save(); rerender(); return; }
    if (act === 'cfg-add') {
      var kind = el.getAttribute('data-kind');
      var inp = document.getElementById('add-' + kind);
      var nv = inp ? inp.value.trim() : '';
      if (nv && db.config[kind].map(function (x) { return x.toLowerCase(); }).indexOf(nv.toLowerCase()) < 0) { db.config[kind].push(nv); save(); }
      rerender(); return;
    }
    if (act === 'cfg-up' || act === 'cfg-down') {
      var arr = db.config[el.getAttribute('data-kind')];
      var ci = +el.getAttribute('data-n');
      var cj = act === 'cfg-up' ? ci - 1 : ci + 1;
      if (cj >= 0 && cj < arr.length) { var tmp = arr[ci]; arr[ci] = arr[cj]; arr[cj] = tmp; save(); }
      rerender(); return;
    }
    if (act === 'cfg-del') {
      var dk = el.getAttribute('data-kind');
      var dv = el.getAttribute('data-v');
      if (ui.confirmCfg === dk + '|' + dv) { cfgRemove(dk, dv); ui.confirmCfg = null; } else { ui.confirmCfg = dk + '|' + dv; }
      rerender(); return;
    }
    if (act === 'nutri-go' || act === 'nutri-redo') {
      var nr0 = byId(id);
      if (nr0 && !ui.nutri.busy) { nutriMatch(nr0, act === 'nutri-redo'); }
      return;
    }
    if (act === 'nutri-review') { ui.nutri.review = id; ui.nutri.pick = null; ui.nutri.msg = ''; rerender(); return; }
    if (act === 'nutri-close') { ui.nutri.review = null; ui.nutri.pick = null; rerender(); return; }
    if (act === 'nutri-change') {
      var ck = el.getAttribute('data-k');
      ui.nutri.pick = ui.nutri.pick === ck ? null : ck; ui.nutri.q = ''; ui.nutri.smsg = '';
      rerender(); return;
    }
    if (act === 'nutri-search') {
      var sk = el.getAttribute('data-k');
      var inp = document.getElementById('nsearch');
      nutriSearch(sk, inp ? inp.value : '');
      return;
    }
    if (act === 'nutri-pick' || act === 'nutri-skip' || act === 'nutri-ok') {
      var rr = byId(cur.id);
      var kk = el.getAttribute('data-k');
      if (!rr || !rr.nm || !rr.nm[kk]) { return; }
      if (act === 'nutri-pick') { nutriPick(rr, kk, parseInt(el.getAttribute('data-i'), 10)); ui.nutri.pick = null; return; }
      if (act === 'nutri-skip') { rr.nm[kk].skip = !rr.nm[kk].skip; ui.nutri.pick = null; }
      if (act === 'nutri-ok') { rr.nm[kk].ok = true; }
      save(); rerender(); return;
    }
    if (act === 'sign-in') {
      if (!sb) { return; }
      if (IN_HUB) { hubSignIn(); return; }
      sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } }).then(function (r) {
        if (r && r.error) { setCloudMsg(r.error.message, false); }
      });
      return;
    }
    if (act === 'sign-out') {
      if (!sb) { return; }
      sb.auth.signOut({ scope: 'local' }).then(function () { cloud.user = null; cloud.msg = ''; photoCache = {}; photoFail = {}; rerender(); });
      return;
    }
    if (act === 'sync-now') { syncAll(true).then(function () { rerender(); }); rerender(); return; }
    if (act === 'rm-samples') {
      db.recipes = db.recipes.filter(function (r) { return !r.sample; });
      Object.keys(db.plan).forEach(function (k) { if (!byId(db.plan[k])) { delete db.plan[k]; } });
      save(); rerender(); return;
    }
    if (act === 'sv+' || act === 'sv-') {
      var r = byId(id);
      if (!r) { return; }
      var v = servingsOf(r) + (act === 'sv+' ? 1 : -1);
      if (v < 1) { v = 1; }
      if (v > 99) { v = 99; }
      ui.servings[id] = v;
      rerender(); return;
    }
    if (act === 'del') {
      if (ui.confirmDel === id) {
        var delR = byId(id);
        if (delR && delR.photo) { photoRemoveStored(delR.photo); }
        db.recipes = db.recipes.filter(function (x) { return x.id !== id; });
        Object.keys(db.plan).forEach(function (k) { if (db.plan[k] === id) { delete db.plan[k]; } });
        save(); ui.confirmDel = null; location.hash = '#/';
      } else { ui.confirmDel = id; rerender(); }
      return;
    }
    if (act === 'addplan') { ui.modal = { kind: 'day', id: id }; rerender(); return; }
    if (act === 'plan-add') { ui.modal = { kind: 'pick', k: el.getAttribute('data-k') }; rerender(); return; }
    if (act === 'plan-pick') {
      db.plan[el.getAttribute('data-k')] = id;
      save(); ui.modal = null;
      if (cur.name === 'recipe') { location.hash = '#/plan'; } else { rerender(); }
      return;
    }
    if (act === 'plan-clear') { delete db.plan[el.getAttribute('data-k')]; save(); rerender(); return; }
    if (act === 'wk+') { ui.weekOffset++; rerender(); return; }
    if (act === 'wk-') { ui.weekOffset--; rerender(); return; }
    if (act === 'c-next') { ui.step++; resetTimer(); rerender(); return; }
    if (act === 'c-prev') { ui.step--; resetTimer(); rerender(); return; }
    if (act === 't-toggle') { timerToggle(); return; }
    if (act === 't-add') { timerAdd(); return; }
    if (act === 't-reset') { resetTimer(); paintTimer(); return; }
    if (act === 't-pick') { ui.tpick[ui.step] = +el.getAttribute('data-v'); resetTimer(); rerender(); return; }
    if (act === 'shot-add') { var sfi = document.getElementById('sfile'); if (sfi) { sfi.click(); } return; }
    if (act === 'shot-read') { shotRead(); return; }
    if (act === 'shot-del') { var dn0 = +el.getAttribute('data-n'); var rm = shotUi.list.splice(dn0, 1)[0]; if (rm) { try { URL.revokeObjectURL(rm.url); } catch (e) { /* ignore */ } } rerender(); return; }
    if (act === 'shot-up' || act === 'shot-down') {
      var si = +el.getAttribute('data-n'); var sj = act === 'shot-up' ? si - 1 : si + 1;
      if (sj >= 0 && sj < shotUi.list.length) { var st = shotUi.list[si]; shotUi.list[si] = shotUi.list[sj]; shotUi.list[sj] = st; }
      rerender(); return;
    }
    if (act === 'shot-pick' && ui.draft) { var pn = +el.getAttribute('data-n'); ui.draft.pick = ui.draft.pick === pn ? null : pn; rerender(); return; }
    if (act === 'itab') { ui.importTab = el.getAttribute('data-v'); if (!ui.editId) { ui.draft = null; } rerender(); return; }
    if (act === 'i-read') {
      var ta = document.getElementById('paste');
      var text = ta ? ta.value : ui.importText;
      ui.importText = text;
      if (!text.trim()) { return; }
      startDraft(text); rerender(); return;
    }
    if (act === 'photo-pick') {
      var fi = document.getElementById(el.getAttribute('data-cam') ? 'pfilecam' : 'pfile');
      if (fi) { fi.click(); }
      return;
    }
    if (act === 'bulk-test') { bulkRun(20); return; }
    if (act === 'bulk-all') { bulkRun(0); return; }
    if (act === 'bulk-stop') { bulkUi.stop = true; return; }
    if (act === 'bulk-retry') {
      Object.keys(bulk.done).forEach(function (k) { if (bulk.done[k].s === 'fail') { delete bulk.done[k]; } });
      saveBulk(); rerender(); return;
    }
    if (act === 'bulk-clear') {
      if (bulkUi.run) { return; }
      bulk = { items: [], done: {} }; saveBulk(); bulkUi.msg = ''; rerender(); return;
    }
    if (act === 'photo-del') { removePhoto(id); return; }
    if (act === 'photo-find') {
      var rr = byId(id);
      photoUi.find = { rid: id, q: rr ? rr.title : '', busy: false, msg: '', list: null };
      rerender(); photoSearch(id); return;
    }
    if (act === 'photo-close') { photoUi.find = null; rerender(); return; }
    if (act === 'photo-search') { photoSearch(photoUi.find && photoUi.find.rid); return; }
    if (act === 'photo-use') { photoUse(id, +el.getAttribute('data-i')); return; }
    if (act === 'i-link') {
      var lu = document.getElementById('linkurl');
      var url = (lu ? lu.value : ui.linkUrl).trim();
      ui.linkUrl = url;
      if (!url) { ui.linkMsg = 'Paste a recipe link first.'; rerender(); return; }
      if (!/^https?:\/\//i.test(url)) { url = 'https://' + url; ui.linkUrl = url; }
      if (!sb || !cloud.user) { ui.linkMsg = 'Sign in under Settings to import from a link.'; rerender(); return; }
      if (ui.linkBusy) { return; }
      ui.linkBusy = true; ui.linkMsg = ''; rerender();
      sb.functions.invoke(NUTRI_FN, { body: { url: url } }).then(function (res) {
        ui.linkBusy = false;
        if (res.error || !res.data || !res.data.recipe) {
          return fnError(res.error).then(function (msg) { ui.linkMsg = msg; rerender(); });
        }
        startLinkDraft(res.data.recipe, res.data.source || url);
        rerender();
      });
      return;
    }
    if (act === 'i-back') { ui.draft = null; ui.reorder = false; rerender(); return; }
    if (act === 'i-cancel') { if (!ui.editId) { ui.draft = null; } return; }
    if (act === 'i-save') { saveDraft(); return; }
    if (act === 'dcat' && ui.draft) {
      var c = el.getAttribute('data-v');
      var ix = ui.draft.cat.indexOf(c);
      if (ix >= 0) { ui.draft.cat.splice(ix, 1); } else { ui.draft.cat.push(c); }
      rerender(); return;
    }
    if (act === 'i-addrow' && ui.draft) { insertRow({ qty: '', name: '', missing: false }); return; }
    if (act === 'i-addhead' && ui.draft) { insertRow({ h: '' }); return; }
    if (act === 'i-reorder' && ui.draft) { ui.reorder = !ui.reorder; rerender(); return; }
    if ((act === 'i-up' || act === 'i-down') && ui.draft) {
      var ri = +el.getAttribute('data-n');
      var rj = act === 'i-up' ? ri - 1 : ri + 1;
      var ar = ui.draft.ingr;
      if (rj >= 0 && rj < ar.length) { var t2 = ar[ri]; ar[ri] = ar[rj]; ar[rj] = t2; }
      rerender(); return;
    }
    if (act === 'i-tohead' && ui.draft) {
      var hn = +el.getAttribute('data-n');
      var hr = ui.draft.ingr[hn];
      ui.draft.ingr[hn] = hr.h != null ? { qty: '', name: hr.h, missing: false } : { h: (hr.name || hr.qty || '').trim() };
      rerender(); return;
    }
    if (act === 'i-delrow' && ui.draft) {
      var dn = +el.getAttribute('data-n');
      ui.draft.ingr.splice(dn, 1);
      if (ui.focusRow != null && ui.focusRow >= dn) { ui.focusRow = ui.focusRow > 0 ? ui.focusRow - 1 : null; }
      rerender(); return;
    }
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' && ev.target && ev.target.id === 'pfq') { ev.preventDefault(); photoSearch(photoUi.find && photoUi.find.rid); }
  });

  document.addEventListener('input', function (ev) {
    var t = ev.target;
    if (t.id === 'q') {
      ui.q = t.value;
      var g = document.getElementById('grid');
      if (g) { g.innerHTML = gridHtml(); }
      return;
    }
    var f = t.getAttribute && t.getAttribute('data-field');
    if (f === 'importText') { ui.importText = t.value; return; }
    if (f === 'linkUrl') { ui.linkUrl = t.value; return; }
    if (f && ui.draft) { ui.draft[f] = t.value; return; }
    var n = t.getAttribute && t.getAttribute('data-ing');
    if (n != null && ui.draft) {
      var row = ui.draft.ingr[+n];
      var ff = t.getAttribute('data-f');
      if (row) {
        if (ff === 'head') { row.h = t.value; }
        else {
          row[ff === 'qty' ? 'qty' : 'name'] = t.value;
          if (ff === 'qty') { row.missing = false; t.className = 'inp'; }
        }
      }
    }
  });

  /* ---------- nutrition (USDA through the Supabase function) ---------- */

  var NUTRI_FN = 'smooth-responder';
  var NKEYS = ['kcal', 'sugars', 'carbs', 'protein', 'fat', 'fiber', 'sodium'];
  var NLABEL = { kcal: 'Calories', sugars: 'Total sugars', carbs: 'Carbs', protein: 'Protein', fat: 'Fat', fiber: 'Fiber', sodium: 'Sodium' };
  var NUNIT = { kcal: '', sugars: ' g', carbs: ' g', protein: ' g', fat: ' g', fiber: ' g', sodium: ' mg' };
  var MASS = { g: 1, gram: 1, grams: 1, kg: 1000, oz: 28.3495, ounce: 28.3495, ounces: 28.3495, lb: 453.592, lbs: 453.592, pound: 453.592, pounds: 453.592 };
  var VOL = { tsp: 4.92892, teaspoon: 4.92892, teaspoons: 4.92892, tbsp: 14.7868, tablespoon: 14.7868, tablespoons: 14.7868, cup: 236.588, cups: 236.588,
    c: 236.588, ml: 1, l: 1000, liter: 1000, liters: 1000, pint: 473.176, pints: 473.176, quart: 946.353, quarts: 946.353 };
  var SIZES = ['extra large', 'jumbo', 'large', 'medium', 'small'];

  function nkey(n) { return String(n || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function stemw(w) { w = w.toLowerCase(); return (w.length > 3 && w.slice(-1) === 's' && w.slice(-2) !== 'ss') ? w.slice(0, -1) : w; }
  function words(s) { return String(s || '').toLowerCase().replace(/\([^)]*\)/g, ' ').split(/[^a-z]+/).filter(Boolean).map(stemw); }

  function volMl(label) {
    var m = String(label).toLowerCase().match(/\b(tsp|teaspoon|tbsp|tablespoon|cup|fl oz)\b/);
    if (!m) { return 0; }
    var k = m[1];
    return (k === 'tsp' || k === 'teaspoon') ? 4.92892 : (k === 'tbsp' || k === 'tablespoon') ? 14.7868 : k === 'cup' ? 236.588 : 29.5735;
  }

  // Turns one ingredient line (amount + unit) into grams. conf: exact (weight), usda (USDA measure), estimate (assumed), none (cannot convert).
  function convert(ing, m) {
    if (ing.q == null) { return { g: 0, conf: 'none', why: 'no amount' }; }
    if (!m || m.skip || !m.food) { return { g: 0, conf: 'none', why: m && m.skip ? 'skipped' : 'no match' }; }
    var q = ing.q;
    var u = String(ing.u || '').toLowerCase().replace(/\.$/, '');
    var ports = m.food.portions || [];
    if (MASS[u]) { return { g: q * MASS[u], conf: 'exact', how: 'by weight' }; }
    var name = words(ing.n);
    if (VOL[u]) {
      var best = null;
      var bs = -1;
      ports.forEach(function (p, i) {
        var ml = volMl(p.label);
        if (!ml) { return; }
        var lw = words(p.label);
        var hit = 0;
        name.forEach(function (w) { if (lw.indexOf(w) >= 0) { hit++; } });
        var sc = hit * 2 - i * 0.01;
        if (sc > bs) { bs = sc; best = { p: p, ml: ml }; }
      });
      if (best) { return { g: q * VOL[u] * best.p.grams / (best.p.amount * best.ml), conf: 'usda', how: 'USDA: ' + best.p.amount + ' x ' + best.p.label + ' = ' + best.p.grams + ' g' }; }
      return { g: q * VOL[u], conf: 'estimate', how: 'assumed 1 g per ml' };
    }
    var cnt = ports.filter(function (p) {
      return !volMl(p.label) && !/\b(oz|ounce|g|gram)\b/i.test(String(p.label).replace(/\([^)]*\)/g, ''));
    });
    var pick = null;
    var uw = u ? stemw(u) : '';
    if (uw) { cnt.forEach(function (p) { if (!pick && words(p.label).indexOf(uw) >= 0) { pick = p; } }); }
    if (!pick) {
      var low = String(ing.n).toLowerCase();
      SIZES.forEach(function (sz) { if (!pick && low.indexOf(sz) >= 0) { cnt.forEach(function (p) { if (!pick && String(p.label).toLowerCase().indexOf(sz) >= 0) { pick = p; } }); } });
    }
    if (!pick) { cnt.forEach(function (p) { if (!pick && words(p.label).some(function (w) { return name.indexOf(w) >= 0; })) { pick = p; } }); }
    if (!pick) { cnt.forEach(function (p) { if (!pick && /\b(medium|large)\b/i.test(p.label)) { pick = p; } }); }
    // A whole item with no unit ("1 lemon") and exactly one count measure from USDA: use it.
    if (!pick && !u && cnt.length === 1) { pick = cnt[0]; }
    if (pick) { return { g: q * pick.grams / pick.amount, conf: 'usda', how: 'USDA: ' + pick.amount + ' x ' + pick.label + ' = ' + pick.grams + ' g' }; }
    if (u === 'pinch') { return { g: q * 0.36, conf: 'estimate', how: 'assumed 0.36 g per pinch' }; }
    if (u === 'dash') { return { g: q * 0.6, conf: 'estimate', how: 'assumed 0.6 g per dash' }; }
    return { g: 0, conf: 'none', why: 'no weight for "' + (u || 'whole item') + '"' };
  }

  function calcNutrition(r) {
    var nm = r.nm || {};
    var tot = {};
    var miss = {};
    NKEYS.forEach(function (k) { tot[k] = 0; miss[k] = false; });
    var out = { used: 0, est: 0, total: 0, unconv: [], items: [], calcKcal: false, matched: 0 };
    r.ingredients.forEach(function (ing, idx) {
      if (ing.h != null) { return; }
      out.total++;
      var m = nm[nkey(ing.n)];
      if (m && m.food) { out.matched++; }
      var res = convert(ing, m);
      out.items.push({ idx: idx, ing: ing, key: nkey(ing.n), m: m, res: res });
      if (!res.g) { out.unconv.push(ing.n); return; }
      out.used++;
      if (res.conf === 'estimate') { out.est++; }
      if (m.food.per100g.kcalCalculated) { out.calcKcal = true; }
      NKEYS.forEach(function (k) {
        var v = m.food.per100g[k];
        if (v == null) { miss[k] = true; } else { tot[k] += v * res.g / 100; }
      });
    });
    var sv = r.servings || 1;
    out.per = {};
    NKEYS.forEach(function (k) { out.per[k] = tot[k] / sv; });
    out.miss = miss;
    return out;
  }

  function fmtN(k, v) {
    if (k === 'kcal' || k === 'sodium' || v >= 10) { return String(Math.round(v)); }
    return String(Math.round(v * 10) / 10);
  }

  function hasNutri(r) { return !!(r.nm && Object.keys(r.nm).length); }

  function sugarChip(r) {
    if (!hasNutri(r)) { return ''; }
    var c = calcNutrition(r);
    if (!c.used) { return ''; }
    return '<span class="nchip" title="Calculated from USDA data">' + IC.calc + (c.est || c.unconv.length ? '~' : '') + fmtN('sugars', c.per.sugars) + ' g sugar</span>';
  }

  function nutritionPanel(r, slot) {
    var n = ui.nutri;
    if (slot === 'review') { return (hasNutri(r) && n.review === r.id) ? reviewPanel(r, calcNutrition(r)) : ''; }
    var head = '<div class="row"><h2>' + IC.calc + ' Nutrition' + (hasNutri(r) ? ' <small>per serving</small>' : '') + '</h2>';
    if (!hasNutri(r)) {
      return '<section class="panel nutri">' + head + '</div><p class="note">Get calories, sugars and more from the USDA food database.</p>' +
        (n.msg && n.id === r.id ? '<p class="note warn">' + esc(n.msg) + '</p>' : '') +
        '<div class="row"><button class="btn primary" data-act="nutri-go" data-id="' + esc(r.id) + '"' + (n.busy ? ' disabled' : '') + '>' + (n.busy && n.id === r.id ? 'Matching ingredients...' : 'Calculate nutrition') + '</button></div></section>';
    }
    var c = calcNutrition(r);
    var cells = NKEYS.map(function (k) {
      return '<div class="ncell"><b>' + fmtN(k, c.per[k]) + '</b><span>' + NLABEL[k] + (NUNIT[k] ? ' (' + NUNIT[k].trim() + ')' : '') + '</span></div>';
    }).join('');
    var notes = [];
    notes.push('Based on ' + c.used + ' of ' + c.total + ' ingredients.');
    if (c.est) { notes.push(c.est + ' amount' + (c.est > 1 ? 's are' : ' is') + ' estimated.'); }
    if (c.unconv.length) { notes.push('Not counted: ' + c.unconv.slice(0, 4).join(', ') + (c.unconv.length > 4 ? ' and ' + (c.unconv.length - 4) + ' more' : '') + '.'); }
    var gaps = NKEYS.filter(function (k) { return c.miss[k]; }).map(function (k) { return NLABEL[k].toLowerCase(); });
    if (gaps.length) { notes.push('Some foods have no USDA value for ' + gaps.join(', ') + ', so those may be higher.'); }
    if (c.calcKcal) { notes.push('Some calories are calculated from protein, carbs and fat.'); }
    var pending = r.ingredients.filter(function (i) { return i.h == null && i.q != null && !r.nm[nkey(i.n)]; }).length;
    return '<section class="panel nutri">' + head + '</div><div class="ngrid">' + cells + '</div><p class="note">' + esc(notes.join(' ')) + '</p>' +
      (n.msg && n.id === r.id ? '<p class="note warn">' + esc(n.msg) + '</p>' : '') +
      '<div class="row"><button class="btn outline" data-act="nutri-review" data-id="' + esc(r.id) + '">Review ingredients</button>' +
      (pending > 0 ? '<button class="btn primary" data-act="nutri-go" data-id="' + esc(r.id) + '">' + (n.busy ? 'Matching...' : 'Match ' + pending + ' new') + '</button>' : '') +
      '<button class="btn" data-act="nutri-redo" data-id="' + esc(r.id) + '"' + (n.busy ? ' disabled' : '') + '>Start over</button></div></section>';
  }

  var CONFTXT = { exact: 'weighed', usda: 'USDA measure', estimate: 'estimate', none: 'not counted' };

  function reviewPanel(r, c) {
    var n = ui.nutri;
    var rows = c.items.map(function (it) {
      var m = it.m;
      var f = m && m.food;
      var open = n.pick === it.key;
      var flag = m && m.flagged && !m.ok && !m.skip;
      var line = '<div class="nrow' + (flag ? ' flag' : '') + '"><div class="nl"><b>' + esc(amount(it.ing, 1)) + ' ' + esc(it.ing.n) + '</b>' +
        '<span class="nm">' + (m && m.skip ? 'Skipped (not counted)' : f ? esc(f.name) + ' <small>(' + esc(f.type) + ')</small>' : (it.ing.q == null ? 'No amount given' : 'No USDA match')) + '</span>' +
        '<span class="nb nb-' + it.res.conf + '">' + CONFTXT[it.res.conf] + (it.res.g ? ': ' + Math.round(it.res.g) + ' g' : '') + (it.res.conf === 'none' && it.res.why ? ' (' + esc(it.res.why) + ')' : '') + '</span>' +
        (it.res.how && it.res.conf !== 'exact' ? '<small class="how">' + esc(it.res.how) + '</small>' : '') + '</div>' +
        '<div class="nr">' + (flag && f ? '<button class="btn" data-act="nutri-ok" data-k="' + esc(it.key) + '">Looks right</button>' : '') +
        '<button class="btn" data-act="nutri-change" data-k="' + esc(it.key) + '">' + (open ? 'Close' : 'Change') + '</button></div></div>';
      if (open && m) {
        line += '<div class="npick"><div class="nsearch"><input id="nsearch" type="search" placeholder="Search USDA, for example pork shoulder" value="' + esc(n.q || '') + '" data-k="' + esc(it.key) + '">' +
          '<button class="btn" data-act="nutri-search" data-k="' + esc(it.key) + '"' + (n.sbusy ? ' disabled' : '') + '>' + (n.sbusy ? 'Searching...' : 'Search') + '</button></div>' +
          (n.smsg ? '<p class="note warn">' + esc(n.smsg) + '</p>' : '') + (m.alts || []).map(function (a, i) {
          return '<button class="btn" data-act="nutri-pick" data-k="' + esc(it.key) + '" data-i="' + i + '">' + esc(a.name) + ' <small>(' + esc(a.type) + ')</small></button>';
        }).join('') + '<button class="btn danger" data-act="nutri-skip" data-k="' + esc(it.key) + '">' + (m.skip ? 'Include again' : 'Skip this ingredient') + '</button></div>';
      }
      return line;
    }).join('');
    return '<section class="panel"><div class="row"><h2>' + IC.calc + ' Review ingredients</h2><button class="btn" data-act="nutri-close">Done</button></div>' +
      '<p class="note">Yellow rows are matches to check. "Estimate" means the amount had no USDA weight, so a guess was used.</p>' +
      (n.msg && n.id === r.id ? '<p class="note warn">' + esc(n.msg) + '</p>' : '') + rows + '</section>';
  }

  function compactFood(f, withPortions) {
    var o = { fdcId: f.fdcId, name: f.name, type: f.type, per100g: f.per100g };
    if (withPortions) { o.portions = (f.portions || []).slice(0, 14); }
    return o;
  }

  function fnError(e) {
    if (e && e.context && typeof e.context.json === 'function') {
      return e.context.json().then(function (j) { return (j && j.error) || e.message; }).catch(function () { return e.message; });
    }
    return Promise.resolve((e && e.message) || 'could not reach the nutrition service');
  }

  function nutriMatch(r, redo) {
    var n = ui.nutri;
    if (!sb || !cloud.user) { n.id = r.id; n.msg = 'Sign in under Settings first. Nutrition looks foods up through your account.'; rerender(); return; }
    if (redo) { r.nm = {}; }
    if (!r.nm) { r.nm = {}; }
    var names = [];
    var seen = {};
    r.ingredients.forEach(function (ing) {
      if (ing.h != null) { return; }
      var k = nkey(ing.n);
      if (!k || ing.q == null || seen[k] || r.nm[k]) { return; }
      seen[k] = true;
      names.push(ing.n);
    });
    if (!names.length) { n.id = r.id; n.msg = 'Everything is already matched.'; rerender(); return; }
    n.busy = true; n.id = r.id; n.msg = '';
    rerender();
    sb.functions.invoke(NUTRI_FN, { body: { names: names } }).then(function (res) {
      n.busy = false;
      if (res.error) { return fnError(res.error).then(function (t) { n.msg = 'Nutrition lookup failed: ' + t; rerender(); }); }
      (res.data.results || []).forEach(function (m) {
        r.nm[nkey(m.name)] = {
          food: m.chosen ? compactFood(m.chosen, true) : null,
          alts: (m.alts || []).map(function (a) { return compactFood(a, false); }),
          flagged: !!m.flagged, ok: false, skip: false
        };
      });
      save();
      var flaggedCount = names.filter(function (x) { var e = r.nm[nkey(x)]; return e && e.flagged; }).length;
      n.msg = flaggedCount ? flaggedCount + ' match' + (flaggedCount > 1 ? 'es are' : ' is') + ' worth a look. Tap Review ingredients.' : '';
      rerender();
    });
  }

  function nutriSearch(key, text) {
    var n = ui.nutri;
    var r = byId(cur.id);
    var m = r && r.nm && r.nm[key];
    text = String(text || '').trim();
    n.q = text; n.smsg = '';
    if (!m || !text) { n.smsg = 'Type a food to search for.'; rerender(); return; }
    if (!sb || !cloud.user) { n.smsg = 'Sign in under Settings to search.'; rerender(); return; }
    n.sbusy = true; rerender();
    sb.functions.invoke(NUTRI_FN, { body: { q: text } }).then(function (res) {
      n.sbusy = false;
      if (res.error || !res.data) {
        return fnError(res.error).then(function (msg) { n.smsg = msg; rerender(); });
      }
      var seen = {};
      var list = [];
      (res.data.foods || []).concat(m.alts || []).forEach(function (f) {
        if (!f || seen[f.fdcId] || (m.food && f.fdcId === m.food.fdcId)) { return; }
        seen[f.fdcId] = true; list.push(compactFood(f, false));
      });
      m.alts = list.slice(0, 10);
      n.smsg = (res.data.foods || []).length ? '' : 'No USDA foods found for that search.';
      save(); rerender();
    });
  }

  function nutriPick(r, key, i) {
    var m = r.nm && r.nm[key];
    if (!m || !m.alts || !m.alts[i]) { return; }
    var alt = m.alts[i];
    var old = m.food;
    m.food = compactFood(alt, true);
    m.food.portions = [];
    m.alts[i] = old ? compactFood(old, false) : alt;
    m.ok = true; m.skip = false; m.flagged = false;
    ui.nutri.id = r.id; ui.nutri.msg = '';
    save(); rerender();
    if (sb && cloud.user) {
      sb.functions.invoke(NUTRI_FN, { body: { fdcId: alt.fdcId } }).then(function (res) {
        if (res.error || !res.data) { return; }
        if (m.food && m.food.fdcId === alt.fdcId) { m.food.portions = (res.data.portions || []).slice(0, 14); save(); rerender(); }
      });
    }
  }

  /* ---------- health rules (profile) ---------- */

  var LIMITS = [
    { k: 'netcarbs', label: 'Net carbs', unit: 'g', dir: 'max', hint: 'carbs minus fiber', meal: 'Dinner' },
    { k: 'sugars', label: 'Total sugars', unit: 'g', dir: 'max', hint: '' },
    { k: 'kcal', label: 'Calories', unit: '', dir: 'max', hint: '' },
    { k: 'sodium', label: 'Sodium', unit: 'mg', dir: 'max', hint: '' },
    { k: 'protein', label: 'Protein', unit: 'g', dir: 'min', hint: '' }
  ];
  var DEF_AVOID = ['deep fry', 'deep fried', 'deep frying', 'battered', 'breaded', 'raw broccoli', 'raw cauliflower', 'raw cabbage', 'raw kale', 'coleslaw'];

  function profile() {
    var p = db.config.profile;
    if (p && p.limits && p.avoid) { return p; }
    return { limits: { netcarbs: 20, sugars: null, kcal: null, sodium: null, protein: null }, avoid: DEF_AVOID.slice(), confirmed: false };
  }
  function pf() {
    if (!db.config.profile || !db.config.profile.limits) { db.config.profile = profile(); }
    return db.config.profile;
  }

  function plain(t) { return ' ' + String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() + ' '; }

  function flagsOf(r) {
    var p = profile();
    var out = [];
    var c = hasNutri(r) ? calcNutrition(r) : null;
    if (c && c.used) {
      var inc = (c.est || c.unconv.length) ? ' (includes estimates)' : '';
      LIMITS.forEach(function (L) {
        var lim = p.limits[L.k];
        if (lim == null || isNaN(lim)) { return; }
        if (L.meal && (r.cat || []).map(function (x) { return x.toLowerCase(); }).indexOf(L.meal.toLowerCase()) < 0) { return; }
        var v = L.k === 'netcarbs' ? Math.max(0, (c.per.carbs || 0) - (c.per.fiber || 0)) : c.per[L.k];
        if (v == null) { return; }
        var shown = Math.round(v * 10) / 10;
        if (L.dir === 'max' && v > lim) { out.push(L.label + ' is ' + shown + (L.unit ? ' ' + L.unit : '') + ' per serving, over your limit of ' + lim + inc + '.'); }
        if (L.dir === 'min' && v < lim && !c.miss[L.k]) { out.push(L.label + ' is ' + shown + (L.unit ? ' ' + L.unit : '') + ' per serving, under your minimum of ' + lim + inc + '.'); }
      });
    }
    var ingText = r.ingredients.filter(function (i) { return i.h == null; }).map(function (i) { return plain(i.n); });
    (p.avoid || []).forEach(function (w) {
      var key = plain(w);
      if (key.trim() === '') { return; }
      if (ingText.some(function (t) { return t.indexOf(key) >= 0; })) { out.push('An ingredient matches your avoid list: "' + w + '".'); return; }
      var n = 0;
      for (var i = 0; i < r.steps.length; i++) {
        var st = r.steps[i];
        if (st.h != null) { continue; }
        n++;
        if (plain(st.t).indexOf(key) >= 0) { out.push('Step ' + n + ' matches your avoid list: "' + w + '".'); return; }
      }
    });
    return out;
  }

  function flagChip(r) {
    var f = flagsOf(r);
    return f.length ? '<span class="nchip warnchip" title="' + esc(f.join(' ')) + '">' + f.length + (f.length === 1 ? ' flag' : ' flags') + '</span>' : '';
  }

  function flagsPanel(r) {
    var p = profile();
    var any = (p.avoid && p.avoid.length) || LIMITS.some(function (L) { return p.limits[L.k] != null; });
    if (!any) { return ''; }
    var f = flagsOf(r);
    return '<section class="panel nutri"><div class="row"><h2>Flags</h2><a class="btn" href="#/profile">Edit rules</a></div>' +
      (f.length ? '<ul class="flags">' + f.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' :
        '<p class="note">Nothing here goes against your rules.' + (hasNutri(r) ? '' : ' Nutrition limits are not checked until you calculate nutrition.') + '</p>') +
      '<p class="note">A guide based on your own rules, not medical advice.</p></section>';
  }

  function profileView() {
    var p = profile();
    var lim = LIMITS.map(function (L) {
      var v = p.limits[L.k];
      return '<div class="crow"><label class="limlbl" for="lim-' + L.k + '">' + L.label + (L.unit ? ' (' + L.unit + ')' : '') + '<small>' + (L.dir === 'max' ? 'flag when over' : 'flag when under') + (L.hint ? ', ' + L.hint : '') + (L.meal ? ', only on ' + L.meal + ' recipes' : '') + '</small></label>' +
        '<input class="inp lim" id="lim-' + L.k + '" type="number" inputmode="decimal" min="0" step="any" placeholder="No limit" data-lim="' + L.k + '" value="' + (v == null ? '' : esc(String(v))) + '"></div>';
    }).join('');
    var av = (p.avoid || []).map(function (w, i) {
      return '<div class="crow"><input class="inp" aria-label="Avoid word" data-av="' + i + '" value="' + esc(w) + '">' +
        '<button class="btn" data-act="av-del" data-n="' + i + '">Remove</button></div>';
    }).join('');
    return shell('profile', '<div class="top"><h1>Health rules</h1></div><div class="cfgwrap">' +
      (p.confirmed ? '' : '<div class="notice">These start with rules you told me earlier. Check each one and change what is wrong. <button class="btn" data-act="prof-ok">I checked them</button></div>') +
      '<section class="panel"><h2>Per-serving limits</h2><p class="note">Recipes get a flag when their calculated nutrition per serving goes past a limit. Leave a box empty for no limit. Needs nutrition calculated on the recipe. Flags are a guide, not medical advice.</p>' + lim + '</section>' +
      '<section class="panel"><h2>Avoid list</h2><p class="note">Words or short phrases to watch for. A recipe gets a flag when its ingredients or steps contain one, for example "deep fry" or "raw broccoli". It is a plain text match, so it can miss other wording.</p>' +
      (av || '<p class="note">None yet.</p>') +
      '<div class="crow"><input class="inp" id="avadd" placeholder="Add a word or phrase" aria-label="Add to avoid list"><button class="btn primary" data-act="av-add">Add</button></div></section></div>');
  }

  /* ---------- own photos (Supabase Storage, private bucket) ---------- */

  var PHOTO_BUCKET = 'recipe-photos';
  var photoUi = { busy: null, msg: '', find: null };
  var photoCache = {};
  var photoPending = {};
  var photoFail = {};

  function photoUrl(r) {
    if (!r || !r.photo) { return ''; }
    var p = r.photo;
    var c = photoCache[p];
    if (c && c.exp > Date.now()) { return c.url; }
    if (!photoPending[p] && sb && cloud.user && !(photoFail[p] && Date.now() - photoFail[p] < 60000)) {
      photoPending[p] = true;
      sb.storage.from(PHOTO_BUCKET).createSignedUrl(p, 3600).then(function (res) {
        photoPending[p] = false;
        if (res && res.data && res.data.signedUrl) { photoCache[p] = { url: res.data.signedUrl, exp: Date.now() + 50 * 60 * 1000 }; softRerender(); }
        else { photoFail[p] = Date.now(); }
      }, function () { photoPending[p] = false; photoFail[p] = Date.now(); });
    }
    return c ? c.url : '';
  }

  function resizeToJpeg(file, maxSide, quality) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var im = new Image();
      im.onload = function () {
        var w = im.naturalWidth;
        var h = im.naturalHeight;
        var k = Math.min(1, (maxSide || 1200) / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * k));
        var ch = Math.max(1, Math.round(h * k));
        var cv = document.createElement('canvas');
        cv.width = cw; cv.height = ch;
        var cx = cv.getContext('2d');
        cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, cw, ch);
        cx.drawImage(im, 0, 0, cw, ch);
        URL.revokeObjectURL(url);
        cv.toBlob(function (b) { if (b) { resolve(b); } else { reject(new Error('encode')); } }, 'image/jpeg', quality || 0.82);
      };
      im.onerror = function () { URL.revokeObjectURL(url); reject(new Error('read')); };
      im.src = url;
    });
  }
  var photoResizer = resizeToJpeg;

  function photoRemoveStored(path) {
    if (!path || !sb || !cloud.user) { return; }
    try { sb.storage.from(PHOTO_BUCKET).remove([path]).then(function () {}, function () {}); } catch (e) { /* ignore */ }
  }

  function setPhoto(rid, file) {
    var r = byId(rid);
    if (!r || !file) { return; }
    if (!sb || !cloud.user) { photoUi.msg = 'Sign in under Settings to add your own photo.'; rerender(); return; }
    if (!/^image\//i.test(file.type || '')) { photoUi.msg = 'Choose an image file.'; rerender(); return; }
    photoUi.busy = rid; photoUi.msg = ''; rerender();
    photoResizer(file).then(function (blob) {
      var path = cloud.user.id + '/' + rid + '-' + Date.now() + '.jpg';
      return sb.storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: 'image/jpeg', upsert: false }).then(function (res) {
        if (res.error) { throw res.error; }
        return path;
      });
    }).then(function (path) {
      var r2 = byId(rid);
      photoUi.busy = null;
      if (!r2) { photoRemoveStored(path); rerender(); return; }
      var old = r2.photo;
      r2.photo = path;
      delete r2.credit;
      if (old && old !== path) { photoRemoveStored(old); }
      save(); rerender();
    }).catch(function (e) {
      photoUi.busy = null;
      var m = e && e.message ? String(e.message) : '';
      photoUi.msg = (m === 'read' || m === 'encode') ? 'Could not read that image. Try a JPEG or PNG.' : 'Could not save the photo' + (m ? ' (' + m + ')' : '') + '. If this keeps happening, the photo storage may not be set up yet.';
      rerender();
    });
  }

  function removePhoto(rid) {
    var r = byId(rid);
    if (!r) { return; }
    if (r.photo) { photoRemoveStored(r.photo); }
    delete r.photo;
    delete r.img;
    delete r.credit;
    photoUi.msg = '';
    save(); rerender();
  }

  function findPanel(r) {
    var f = photoUi.find;
    if (!f || f.rid !== r.id) { return ''; }
    var h = '<div class="panel pfind"><div class="row"><input id="pfq" class="inp" type="text" value="' + esc(f.q) + '" placeholder="Search stock photos"><button class="btn" data-act="photo-search">Search</button><button class="btn" data-act="photo-close">Close</button></div>';
    if (f.busy) { h += '<p class="note">Searching...</p>'; }
    if (f.msg) { h += '<p class="note warn">' + esc(f.msg) + '</p>'; }
    if (f.list && f.list.length) {
      h += '<div class="pgrid">';
      f.list.forEach(function (p, i) {
        h += '<button class="pthumb" data-act="photo-use" data-id="' + esc(r.id) + '" data-i="' + i + '" aria-label="Use this photo"><img src="' + esc(p.thumb) + '" alt="" loading="lazy" referrerpolicy="no-referrer"></button>';
      });
      h += '</div><p class="meta" style="font-size:12px">Photos from <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">Pixabay</a>. Tap one to save it to this recipe.</p>';
    } else if (f.list && !f.busy && !f.msg) {
      h += '<p class="note">No photos found. Try different words.</p>';
    }
    return h + '</div>';
  }

  function photoSearch(rid) {
    var f = photoUi.find;
    if (!f || f.rid !== rid) { return; }
    var inp = document.getElementById('pfq');
    if (inp) { f.q = inp.value.trim(); }
    if (!f.q || f.busy) { return; }
    if (!sb || !cloud.user) { f.msg = 'Sign in under Settings to search photos.'; rerender(); return; }
    f.busy = true; f.msg = ''; f.list = null; rerender();
    sb.functions.invoke(NUTRI_FN, { body: { photo: f.q } }).then(function (res) {
      f.busy = false;
      if (res.error || !res.data || !res.data.photos) {
        return fnError(res.error).then(function (m) { f.msg = m; rerender(); });
      }
      f.list = res.data.photos; rerender();
    });
  }

  function photoUse(rid, i) {
    var f = photoUi.find;
    var p = f && f.list && f.list[i];
    if (!byId(rid) || !p || f.busy) { return; }
    if (!sb || !cloud.user) { f.msg = 'Sign in under Settings to save a photo.'; rerender(); return; }
    f.busy = true; f.msg = ''; rerender();
    sb.functions.invoke(NUTRI_FN, { body: { photoSave: { id: p.id, rid: rid } } }).then(function (res) {
      if (res.error || !res.data || !res.data.path) {
        f.busy = false;
        return fnError(res.error).then(function (m) { f.msg = m; rerender(); });
      }
      var r = byId(rid);
      if (!r) { photoRemoveStored(res.data.path); photoUi.find = null; rerender(); return; }
      var old = r.photo;
      r.photo = res.data.path;
      delete r.img;
      r.credit = { n: res.data.by || p.by, p: res.data.page || p.page };
      if (old && old !== r.photo) { photoRemoveStored(old); }
      photoUi.find = null; photoUi.msg = '';
      save(); rerender();
    });
  }

  function photoBar(r) {
    var has = !!(r.photo || r.img);
    var busy = photoUi.busy === r.id;
    var dis = busy ? ' disabled' : '';
    var touch = (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
    return '<div class="photobar">' +
      (touch ? '<button class="btn" data-act="photo-pick" data-cam="1"' + dis + '>Take photo</button>' : '') +
      '<button class="btn" data-act="photo-pick"' + dis + '>' + (busy ? 'Saving photo...' : (has ? 'Change photo' : 'Choose photo')) + '</button>' +
      '<button class="btn" data-act="photo-find" data-id="' + esc(r.id) + '"' + dis + '>Find photo</button>' +
      (has ? '<button class="btn" data-act="photo-del" data-id="' + esc(r.id) + '"' + dis + '>Remove photo</button>' : '') +
      '</div>' + (photoUi.msg ? '<p class="note warn">' + esc(photoUi.msg) + '</p>' : '') + findPanel(r) +
      '<input type="file" accept="image/*" id="pfile" hidden data-photo="' + esc(r.id) + '">' +
      '<input type="file" accept="image/*" capture="environment" id="pfilecam" hidden data-photo="' + esc(r.id) + '">';
  }

  /* ---------- cloud sync (Supabase) ---------- */

  var SB_URL = 'https://bkvikqntpisfnkdlules.supabase.co';
  var SB_KEY = 'sb_publishable_d4KL76DV7rAfWQmUgIWzOA_G1THfOAl';
  var SYNC_KEY = 'recipeapp.sync';
  var sb = null;
  var cloud = { user: null, busy: false, again: false, msg: '', ok: false, at: 0, timer: null };
  var syncState = loadSync();

  function loadSync() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(SYNC_KEY)); } catch (e) { s = null; }
    if (!s || !s.rec) { s = { uid: null, rec: {}, st: '' }; }
    return s;
  }
  function saveSync() {
    try { localStorage.setItem(SYNC_KEY, JSON.stringify(syncState)); } catch (e) { /* ignore */ }
  }
  function stateJson() { return JSON.stringify({ config: db.config, plan: db.plan }); }
  function realRecipes() { return db.recipes.filter(function (r) { return !r.sample; }); }

  function setCloudMsg(msg, ok) {
    cloud.msg = msg; cloud.ok = !!ok;
    if (ok) { cloud.at = Date.now(); }
    var el = document.getElementById('syncstat');
    if (el) { el.textContent = syncText(); }
  }

  function syncText() {
    if (!sb) { return 'Cloud sync is not available. The app still works on this device only.'; }
    if (!cloud.user) { return cloud.msg && !cloud.ok ? 'Sign-in problem: ' + cloud.msg : ''; }
    if (cloud.busy) { return 'Syncing...'; }
    if (cloud.msg && !cloud.ok) { return 'Not synced: ' + cloud.msg; }
    return cloud.at ? 'Synced at ' + new Date(cloud.at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + '.' : 'Signed in.';
  }

  function cloudChanged() {
    if (!cloud.user || !sb) { return; }
    clearTimeout(cloud.timer);
    cloud.timer = setTimeout(function () { syncAll(false); }, 1500);
  }

  function failMsg(e) {
    var m = e && e.message ? String(e.message) : 'unknown error';
    return /fetch|network|failed/i.test(m) ? 'no connection. Changes are kept on this device and will upload later.' : m;
  }

  // Upload local changes: changed or new recipes, removed recipes, and lists/plan.
  function pushLocal() {
    var uid = cloud.user.id;
    var up = [], seen = {}, del = [];
    realRecipes().forEach(function (r) {
      seen[r.id] = true;
      if (syncState.rec[r.id] !== JSON.stringify(r)) { up.push(r); }
    });
    Object.keys(syncState.rec).forEach(function (id) { if (!seen[id]) { del.push(id); } });
    var st = stateJson();
    var jobs = [];
    if (up.length) {
      jobs.push(sb.from('recipes').upsert(up.map(function (r) { return { owner: uid, id: r.id, data: r, updated_at: new Date().toISOString() }; }), { onConflict: 'owner,id' })
        .then(function (res) {
          if (res.error) { throw res.error; }
          up.forEach(function (r) { syncState.rec[r.id] = JSON.stringify(r); });
        }));
    }
    if (del.length) {
      jobs.push(sb.from('recipes').delete().in('id', del).then(function (res) {
        if (res.error) { throw res.error; }
        del.forEach(function (id) { delete syncState.rec[id]; });
      }));
    }
    if (st !== syncState.st) {
      jobs.push(sb.from('app_state').upsert({ owner: uid, config: db.config, plan: db.plan, updated_at: new Date().toISOString() }, { onConflict: 'owner' })
        .then(function (res) {
          if (res.error) { throw res.error; }
          syncState.st = st;
        }));
    }
    return Promise.all(jobs).then(function () { saveSync(); });
  }

  function idNum(id) { var n = parseInt(String(id).replace(/\D/g, ''), 10); return isNaN(n) ? 0 : n; }

  // Download the cloud copy. firstTime: merge with what is on this device. Otherwise the cloud copy replaces synced recipes.
  function pullCloud(firstTime) {
    return Promise.all([
      sb.from('recipes').select('id,data'),
      sb.from('app_state').select('config,plan').maybeSingle()
    ]).then(function (res) {
      if (res[0].error) { throw res[0].error; }
      if (res[1].error) { throw res[1].error; }
      var rows = res[0].data || [];
      var local = {};
      db.recipes.forEach(function (r) { local[r.id] = r; });
      var inCloud = {};
      var fresh = [];
      rows.forEach(function (row) {
        inCloud[row.id] = true;
        if (local[row.id]) {
          // Same recipe on both sides: keep this device's copy only if it has changes not yet uploaded.
          var pending = !firstTime && syncState.rec[row.id] !== JSON.stringify(local[row.id]);
          if (!pending) { var i = db.recipes.indexOf(local[row.id]); db.recipes[i] = row.data; }
        } else { fresh.push(row.data); }
      });
      if (!firstTime) {
        db.recipes = db.recipes.filter(function (r) { return r.sample || inCloud[r.id] || syncState.rec[r.id] === undefined; });
      }
      fresh.sort(function (a, b) { return idNum(b.id) - idNum(a.id); });
      db.recipes = fresh.concat(db.recipes);
      var s = res[1].data;
      if (s && s.config && s.config.cats) {
        db.config = s.config;
        db.plan = s.plan || {};
      }
      db.recipes.forEach(fixTags);
      var rec = {};
      realRecipes().forEach(function (r) { if (inCloud[r.id]) { rec[r.id] = JSON.stringify(r); } });
      // Keep entries for recipes not uploaded yet as unsynced (absent from rec).
      syncState.rec = rec;
      syncState.st = (s && s.config && s.config.cats) ? stateJson() : syncState.st;
      persist();
      saveSync();
    });
  }

  function syncAll(full) {
    if (!sb || !cloud.user) { return Promise.resolve(); }
    if (cloud.busy) { cloud.again = true; return Promise.resolve(); }
    cloud.busy = true;
    setCloudMsg('', false);
    var uid = cloud.user.id;
    var first = syncState.uid !== uid;
    if (first && syncState.uid) {
      // A different account used this device before: drop its copy so recipes don't mix.
      db.recipes = db.recipes.filter(function (r) { return r.sample; });
      db.plan = {};
      db.config = { cats: CATS.slice(), cuisines: CUISINES.slice() };
      syncState.rec = {}; syncState.st = '';
    }
    var p;
    if (first) {
      syncState.uid = uid;
      p = pullCloud(true).then(function () { return pushLocal(); });
    } else if (full) {
      p = pushLocal().then(function () { return pullCloud(false); });
    } else {
      p = pushLocal();
    }
    return p.then(function () {
      cloud.busy = false;
      setCloudMsg('', true);
      if (first || full) { softRerender(); }
    }).catch(function (e) {
      cloud.busy = false;
      setCloudMsg(failMsg(e), false);
    }).then(function () {
      if (cloud.again) { cloud.again = false; cloudChanged(); }
    });
  }

  // Redraw after a download, but never while someone is typing in a form or cooking.
  function softRerender() {
    if (ui.draft || cur.name === 'cook' || cur.name === 'edit' || cur.name === 'import') { return; }
    if (cur.name === 'recipe' && !byId(cur.id)) { location.hash = '#/'; return; }
    rerender();
  }

  function cleanAuthUrl() {
    var h = location.hash || '';
    if (/access_token=|error_description=|refresh_token=/.test(h)) {
      try { history.replaceState(null, '', location.pathname + location.search + '#/'); } catch (e) { /* ignore */ }
      render();
    }
  }

  // Inside the Family Hub app, Google sign-in opens in Chrome and returns through familyhub://spotify
  // (an https page with an Open Recipes button, which links to the Hub's familyhub://spotify address). The Hub app stores the result for us to pick up.
  var IN_HUB = !!(window.HubApp && window.HubApp.openUrl && window.HubApp.takeSpotifyCallback);
  var PEND_KEY = 'recipeapp.authpending';
  var HUB_RETURN = 'https://risto74.github.io/Recipes/auth-return.html';

  function hubSignIn() {
    sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: HUB_RETURN, skipBrowserRedirect: true } }).then(function (r) {
      if (r.error || !r.data || !r.data.url) { setCloudMsg(r.error ? r.error.message : 'could not start sign-in', false); return; }
      try { localStorage.setItem(PEND_KEY, String(Date.now())); } catch (e) { /* ignore */ }
      window.HubApp.openUrl(r.data.url);
    });
  }

  function authPending() {
    var t = 0;
    try { t = parseInt(localStorage.getItem(PEND_KEY), 10) || 0; } catch (e) { t = 0; }
    return t && Date.now() - t < 10 * 60 * 1000;
  }

  function hubCallback() {
    if (!IN_HUB || !sb || !authPending()) { return; }
    var o = null;
    try { var raw = window.HubApp.takeSpotifyCallback(); if (!raw) { return; } o = JSON.parse(raw); } catch (e) { return; }
    try { localStorage.removeItem(PEND_KEY); } catch (e2) { /* ignore */ }
    if (o.error || !o.code) { setCloudMsg(o.error || 'sign-in did not finish. Try again.', false); if (cur.name === 'settings') { rerender(); } return; }
    sb.auth.exchangeCodeForSession(o.code).then(function (r) {
      if (r.error) { setCloudMsg(r.error.message, false); }
      if (cur.name === 'settings') { rerender(); }
    });
  }

  function initCloud() {
    if (!window.supabase || !window.supabase.createClient) { return; }
    try {
      sb = IN_HUB ? window.supabase.createClient(SB_URL, SB_KEY, { auth: { flowType: 'pkce', detectSessionInUrl: false } }) : window.supabase.createClient(SB_URL, SB_KEY);
    } catch (e) { sb = null; return; }
    sb.auth.onAuthStateChange(function (ev, session) {
      var was = cloud.user ? cloud.user.id : null;
      cloud.user = session ? session.user : null;
      var now = cloud.user ? cloud.user.id : null;
      if (now && now !== was) { setTimeout(function () { syncAll(true).then(function () { if (cur.name === 'settings') { rerender(); } }); }, 0); }
      else if (!now && was) { setTimeout(function () { if (cur.name === 'settings') { rerender(); } }, 0); }
    });
    if (IN_HUB) { window.onSpotifyCb = hubCallback; }
    sb.auth.getSession().then(function () { cleanAuthUrl(); hubCallback(); if (cur.name === 'settings') { rerender(); } });
  }

  function accountPanel() {
    var body;
    if (!sb) {
      body = '<p class="note" id="syncstat">' + esc(syncText()) + '</p>';
    } else if (!cloud.user) {
      body = '<p class="note">Sign in to keep your recipes, lists and meal plan the same on every device. Recipes already on this device are uploaded the first time.</p>' +
        '<div class="row"><button class="btn primary" data-act="sign-in">Sign in with Google</button></div><p class="note" id="syncstat">' + esc(syncText()) + '</p>';
    } else {
      body = '<p class="note">Signed in as <strong>' + esc(cloud.user.email || '') + '</strong></p><p class="note" id="syncstat">' + esc(syncText()) + '</p>' +
        '<div class="row"><button class="btn outline" data-act="sync-now">Sync now</button><button class="btn" data-act="sign-out">Sign out</button></div>';
    }
    return '<section class="panel"><h2>Account and sync</h2>' + body + '</section>';
  }

  // The Family Hub app calls this when the Home button is pressed.
  window.hubHome = function () { location.href = HUB_URL; };

  window.addEventListener('hashchange', render);
  window.addEventListener('pageshow', function () { if (cur.name === 'cook') { wakeOn(); } });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && cur.name === 'cook') { wakeOff(); wakeOn(); } });

  // Test hook: not used by the page.
  window.__recipeApp = {
    bulk: function () { return bulk; },
    parseText: parseText, parseIngredientLine: parseIngredientLine, timerSecs: timerSecs, timerList: timerList, groupHead: groupHead, splitStepTitle: splitStepTitle,
    fmtQty: fmtQty, moveRow: moveRow, ui: ui, db: function () { return db; }, setPhotoResizer: function (f) { photoResizer = f; }
  };

  render();
  initCloud();
  window.addEventListener('online', function () { syncAll(true); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) { hubCallback(); } if (!document.hidden && cloud.user) { syncAll(true); } });
})();
