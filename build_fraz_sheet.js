const fs = require('fs');
const path = require('path');

// 1. Load LeetCode problems database
const leetcodeJson = JSON.parse(fs.readFileSync('leetcode_all.json', 'utf8'));
const slugToLc = new Map();

for (const pair of leetcodeJson.stat_status_pairs) {
  const slug = pair.stat.question__title_slug;
  const id = pair.stat.frontend_question_id;
  const title = pair.stat.question__title;
  let difficulty = '🟡 Medium';
  if (pair.difficulty.level === 1) difficulty = '🟢 Easy';
  else if (pair.difficulty.level === 2) difficulty = '🟡 Medium';
  else if (pair.difficulty.level === 3) difficulty = '🔴 Hard';

  slugToLc.set(slug, {
    id: id.toString(),
    title,
    difficulty,
    url: `https://leetcode.com/problems/${slug}/`
  });
}

// Aliases for renamed LeetCode slugs
const slugAliases = {
  'implement-strstr': 'find-the-index-of-the-first-occurrence-in-a-string',
  'minimum-deletion-cost-to-avoid-repeating-letters': 'minimum-time-to-make-rope-colorful'
};

// 2. Scan local solutions in ./questions directory
const slugToSol = new Map();

function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const fullPath = path.join(dir, f.name);
    if (f.isDirectory()) {
      scanDir(fullPath);
    } else if (f.isFile() && f.name.endsWith('.md')) {
      const relPath = './' + path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
      const content = fs.readFileSync(fullPath, 'utf8');

      // Check leetcode URLs in file
      const matches = content.matchAll(/https:\/\/leetcode\.com\/problems\/([a-z0-9\-]+)\/?/g);
      for (const m of matches) {
        const slug = m[1];
        if (slug !== 'discuss') {
          slugToSol.set(slug, relPath);
        }
      }

      // Check filename pattern (e.g. 01-contains-duplicate.md -> contains-duplicate)
      const baseNameMatch = f.name.match(/^\d+-(.+)\.md$/);
      if (baseNameMatch) {
        const slugCandidate = baseNameMatch[1];
        if (!slugToSol.has(slugCandidate)) {
          slugToSol.set(slugCandidate, relPath);
        }
      }
    }
  }
}

scanDir(path.join(process.cwd(), 'questions'));

// Also scan NeetCode 250.md for solution links
if (fs.existsSync('NeetCode 250.md')) {
  const ncContent = fs.readFileSync('NeetCode 250.md', 'utf8');
  const ncMatches = ncContent.matchAll(/\|\s*`\[x\]`\s*\|\s*(\d+)\s*\|\s*\[(.*?)\]\((https:\/\/leetcode\.com\/problems\/([a-z0-9\-]+)\/?)\)\s*\|\s*([^\|]+)\s*\|\s*([^\|]+)\s*\|\s*\[Solution 📄\]\((.*?)\)/g);
  for (const m of ncMatches) {
    const slug = m[4];
    const solPath = m[7];
    if (!slugToSol.has(slug)) {
      slugToSol.set(slug, solPath);
    }
  }
}

// Also scan Practice-Tracker.md
if (fs.existsSync('Practice-Tracker.md')) {
  const ptContent = fs.readFileSync('Practice-Tracker.md', 'utf8');
  const ptMatches = ptContent.matchAll(/\[(.*?)\]\((\.\/questions\/[^\)]+)\)\s*\(\[LeetCode\]\((https:\/\/leetcode\.com\/problems\/([a-z0-9\-]+)\/?.*?)\)\)/g);
  for (const m of ptMatches) {
    const solPath = m[2];
    const slug = m[4];
    if (!slugToSol.has(slug)) {
      slugToSol.set(slug, solPath);
    }
  }
}

// 3. Helper to generate 15-character progress bar
function generateProgressBar(pct) {
  const totalBlocks = 15;
  let filled = Math.round((pct / 100) * totalBlocks);
  if (filled < 0) filled = 0;
  if (filled > totalBlocks) filled = totalBlocks;
  const empty = totalBlocks - filled;
  return `\`[${'█'.repeat(filled)}${'░'.repeat(empty)}]\``;
}

// 4. Parse CSV lines
function parseCsv(content) {
  const rows = [];
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const row = [];
    let inQuotes = false;
    let curr = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          curr += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        row.push(curr.trim());
        curr = '';
      } else {
        curr += c;
      }
    }
    row.push(curr.trim());
    rows.push(row);
  }
  return rows;
}

const csvRaw = fs.readFileSync('fraz_sheet.csv', 'utf8');
const rows = parseCsv(csvRaw);

const topics = [];
let currentTopic = null;
let currentDiff = '';

for (const fields of rows) {
  const c0 = fields[0] || '';
  const c1 = fields[1] || '';
  const c2 = fields[2] || '';

  // Skip header metadata
  if (/^DSA Sheet by FRAZ/i.test(c1) || /^CHECKOUT/i.test(c1) || /^HOW TO FOLLOW/i.test(c1) || /^JOIN TELEGRAM/i.test(c1)) {
    continue;
  }

  const trimmedC1 = c1.trim().toUpperCase();

  // Major Topic Headers
  const knownTopics = [
    'ARRAYS', 'RECURSION', 'DYNAMIC PROGRAMING', 'STRINGS', 'MATHS', 'GREEDY',
    'DFS', 'TREE', 'HASH TABLE', 'BINARY SEARCH', 'BFS', 'TWO POINTER',
    'STACK', 'DESIGN', 'GRAPH', 'BIT MANIPULATION', 'LINKED LIST', 'HEAP',
    'SLIDING WINDOW', 'TRIE', 'SEGMENT TREE'
  ];

  if (knownTopics.includes(trimmedC1)) {
    let tName = c1.trim();
    switch (trimmedC1) {
      case 'ARRAYS': tName = 'Arrays'; break;
      case 'RECURSION': tName = 'Recursion & Backtracking'; break;
      case 'DYNAMIC PROGRAMING': tName = 'Dynamic Programming'; break;
      case 'STRINGS': tName = 'Strings'; break;
      case 'MATHS': tName = 'Math & Geometry'; break;
      case 'GREEDY': tName = 'Greedy'; break;
      case 'DFS': tName = 'Depth-First Search (DFS)'; break;
      case 'TREE': tName = 'Trees & Binary Search Trees'; break;
      case 'HASH TABLE': tName = 'Hash Table'; break;
      case 'BINARY SEARCH': tName = 'Binary Search'; break;
      case 'BFS': tName = 'Breadth-First Search (BFS)'; break;
      case 'TWO POINTER': tName = 'Two Pointers'; break;
      case 'STACK': tName = 'Stack & Queue'; break;
      case 'DESIGN': tName = 'Design'; break;
      case 'GRAPH': tName = 'Graphs'; break;
      case 'BIT MANIPULATION': tName = 'Bit Manipulation'; break;
      case 'LINKED LIST': tName = 'Linked List'; break;
      case 'HEAP': tName = 'Heap / Priority Queue'; break;
      case 'SLIDING WINDOW': tName = 'Sliding Window'; break;
      case 'TRIE': tName = 'Trie'; break;
      case 'SEGMENT TREE': tName = 'Segment Tree'; break;
    }
    currentTopic = { name: tName, items: [] };
    topics.push(currentTopic);
    currentDiff = '';
    continue;
  }

  // Difficulty Headers
  if (['EASY', 'MEDIUM', 'HARD', 'MEDIUM / HARD', 'MEDIUM/HARD'].includes(trimmedC1)) {
    if (trimmedC1 === 'EASY') currentDiff = '🟢 Easy';
    else if (trimmedC1 === 'HARD') currentDiff = '🔴 Hard';
    else currentDiff = '🟡 Medium';
    continue;
  }

  if (/THAT WOULD BE TOO EASY/i.test(trimmedC1)) continue;
  if (!c1 && !c2) continue;

  if (!currentTopic) {
    currentTopic = { name: 'Arrays', items: [] };
    topics.push(currentTopic);
  }

  const item = {
    saved: '[ ]',
    number: '-',
    title: '',
    problemUrl: '',
    difficulty: '🟡 Medium',
    videoEditorial: '-',
    solution: '-',
    isProblem: true
  };

  // 1. Identify LeetCode Problem URL
  const slugMatch = c1.match(/https:\/\/leetcode\.com\/problems\/([a-z0-9\-]+)\/?/);
  if (slugMatch && slugMatch[1] !== 'discuss') {
    let slug = slugMatch[1];
    if (slugAliases[slug]) {
      slug = slugAliases[slug];
    }
    item.problemUrl = `https://leetcode.com/problems/${slugMatch[1]}/`;
    if (slugToLc.has(slug)) {
      const lc = slugToLc.get(slug);
      item.number = lc.id;
      item.title = lc.title;
      item.difficulty = currentDiff || lc.difficulty;
    } else {
      item.title = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      item.difficulty = currentDiff || '🟡 Medium';
    }

    if (slugToSol.has(slug) || slugToSol.has(slugMatch[1])) {
      item.saved = '[x]';
      const sol = slugToSol.get(slug) || slugToSol.get(slugMatch[1]);
      item.solution = `[Solution 📄](${sol})`;
    }
  }

  // 2. Identify Non-problem / Explore / Discuss / Concept
  if (!item.problemUrl) {
    if (c1.includes('explore/learn/card/')) {
      const cardMatch = c1.match(/explore\/learn\/card\/([a-z0-9\-]+)\/?/);
      const cardName = cardMatch ? cardMatch[1].toUpperCase() : 'TRIE';
      item.title = `LeetCode Explore: ${cardName}`;
      item.problemUrl = c1;
      item.difficulty = '🟡 Medium';
      item.number = '-';
    } else if (c1.includes('articles/')) {
      const artMatch = c1.match(/articles\/([a-z0-9\-]+)\/?/);
      const artName = artMatch ? artMatch[1].replace(/-/g, ' ') : 'Article';
      item.title = `LeetCode Article: ${artName}`;
      item.problemUrl = c1;
      item.difficulty = '🔴 Hard';
      item.number = '-';
    } else if (c1.includes('/discuss/')) {
      const discMatch = c1.match(/problems\/([a-z0-9\-]+)\/discuss\//);
      let discSlug = discMatch ? discMatch[1] : '';
      if (slugAliases[discSlug]) discSlug = slugAliases[discSlug];

      if (discSlug && slugToLc.has(discSlug)) {
        const lc = slugToLc.get(discSlug);
        item.number = lc.id;
        item.title = lc.title;
        item.problemUrl = lc.url;
        item.difficulty = lc.difficulty;
        if (slugToSol.has(discSlug)) {
          item.saved = '[x]';
          item.solution = `[Solution 📄](${slugToSol.get(discSlug)})`;
        }
      } else {
        item.title = 'LeetCode Discussion Reference';
        item.problemUrl = c1;
        item.difficulty = '🟡 Medium';
      }
      item.videoEditorial = `[Discussion 📝](${c1})`;
    } else {
      // Concept or tutorial topic
      item.isProblem = false;
      const cleanTitle = c1.replace(/^\d+-\s*/, '').replace(/^"|"$/g, '').trim();
      item.title = cleanTitle;
      item.difficulty = '📘 Concept';
      item.number = '-';
    }
  }

  // 3. Process Video / Editorial column (c2)
  if (item.videoEditorial === '-') {
    if (/https:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s",]+/i.test(c2)) {
      const match = c2.match(/https:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s",]+/i);
      item.videoEditorial = `[Watch 🎥](${match[0].replace(/[",]$/, '')})`;
    } else if (/https:\/\/leetcode\.com\/problems\/[^\s",]+\/discuss\/[^\s",]+/i.test(c2)) {
      const match = c2.match(/https:\/\/leetcode\.com\/problems\/[^\s",]+\/discuss\/[^\s",]+/i);
      item.videoEditorial = `[Editorial 📝](${match[0].replace(/[",]$/, '')})`;
    } else if (/https:\/\/[^\s",]+/i.test(c2)) {
      const match = c2.match(/https:\/\/[^\s",]+/i);
      item.videoEditorial = `[Resource 🔗](${match[0].replace(/[",]$/, '')})`;
    }
  }

  currentTopic.items.push(item);
}

// Compute statistics
let totalProblems = 0;
let totalSolved = 0;

for (const t of topics) {
  for (const it of t.items) {
    if (it.isProblem) {
      totalProblems++;
      if (it.saved === '[x]') totalSolved++;
    }
  }
}

const overallPct = Math.round((totalSolved / totalProblems) * 100);
const overallBar = generateProgressBar(overallPct);

// Build markdown
const lines = [];
lines.push('# Fraz SDE Sheet Roadmap Tracker');
lines.push('');
lines.push('This file tracks the status of the **Fraz SDE Sheet** (250+ Curated LeetCode DSA Problems & Concepts) coding interview prep roadmap.');
lines.push('');
lines.push('---');
lines.push('');
lines.push('## 📊 Progress Dashboard');
lines.push('');
lines.push(`**Overall Completion:** **${totalSolved}** of **${totalProblems}** solved (${overallPct}%)`);
lines.push(overallBar);
lines.push('');
lines.push('### Topic-wise Progress');
lines.push('');
lines.push('| Topic | Progress | Completion % | Solved | Total |');
lines.push('| :--- | :--- | :--- | :--- | :--- |');

for (const t of topics) {
  let tProb = 0;
  let tSolved = 0;
  for (const it of t.items) {
    if (it.isProblem) {
      tProb++;
      if (it.saved === '[x]') tSolved++;
    }
  }
  const tPct = tProb > 0 ? Math.round((tSolved / tProb) * 100) : 0;
  const tBar = generateProgressBar(tPct);
  lines.push(`| **${t.name}** | ${tBar} | ${tPct}% | ${tSolved} | ${tProb} |`);
}

lines.push('');
lines.push('---');
lines.push('');
lines.push('## 📚 Problem Set by Topic');

for (const t of topics) {
  lines.push('');
  lines.push(`### ${t.name}`);
  lines.push('');
  lines.push('| Saved | # | Question Link | Difficulty | YouTube Video / Editorial | Local Solution |');
  lines.push('| :---: | :---: | :--- | :---: | :---: | :--- |');

  for (const it of t.items) {
    const savedStr = `\`${it.saved}\``;
    const numStr = it.number;
    const qLink = it.problemUrl ? `[${it.title}](${it.problemUrl})` : it.title;
    const diffStr = it.difficulty;
    const videoStr = it.videoEditorial;
    const solStr = it.solution;

    lines.push(`| ${savedStr} | ${numStr} | ${qLink} | ${diffStr} | ${videoStr} | ${solStr} |`);
  }
}

lines.push('');

const outputMd = lines.join('\n');
fs.writeFileSync('Fraz SDE Sheet.md', outputMd, 'utf8');
console.log(`Generated Fraz SDE Sheet.md successfully with ${totalProblems} total problems, ${totalSolved} solved (${overallPct}%)!`);
