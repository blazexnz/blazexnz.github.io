// ─── STATE ───────────────────────────────────────────
const STORAGE_KEY = 'prompt_library_v1';

let prompts = load();
let editingId   = null;
let activeTag   = 'all';
let searchQuery = '';
let currentTags = []; // tags being edited in the modal

// ─── PERSISTENCE ─────────────────────────────────────
function load() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // Migrate old single-tag format → tags array
    return data.map(p => {
      if (!p.tags) {
        p.tags = p.tag ? [p.tag] : [];
        delete p.tag;
      }
      return p;
    });
  } catch { return []; }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

// ─── DOM REFS ────────────────────────────────────────
const grid           = document.getElementById('grid');
const emptyState     = document.getElementById('emptyState');
const filterWrap     = document.getElementById('filterWrap');
const searchInput    = document.getElementById('searchInput');
const backdrop       = document.getElementById('backdrop');
const modal          = document.getElementById('modal');
const modalTitle     = document.getElementById('modalTitle');
const btnAdd         = document.getElementById('btnAdd');
const btnClose       = document.getElementById('btnClose');
const btnCancel      = document.getElementById('btnCancel');
const btnSave        = document.getElementById('btnSave');
const fieldTitle     = document.getElementById('fieldTitle');
const tagInputWrap   = document.getElementById('tagInputWrap');
const tagInput       = document.getElementById('tagInput');
const tagSuggestions = document.getElementById('tagSuggestions');
const fieldDesc      = document.getElementById('fieldDesc');
const fieldPrompt    = document.getElementById('fieldPrompt');
const toast          = document.getElementById('toast');

// ─── HELPERS ─────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 350ms ease';
  el.addEventListener('animationend', () => { el.style.animation = ''; }, { once: true });
}

// ─── TAG PILL INPUT ───────────────────────────────────
function renderPills() {
  // Remove existing pills (keep the input)
  tagInputWrap.querySelectorAll('.tag-pill').forEach(el => el.remove());

  currentTags.forEach((tag, i) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.innerHTML = `${escHtml(tag)}<button class="tag-pill-remove" data-index="${i}" touch-action="manipulation" aria-label="Remove ${escHtml(tag)}">×</button>`;
    tagInputWrap.insertBefore(pill, tagInput);
  });
}

function addTag(raw) {
  const tag = raw.trim().replace(/,+$/, '').trim();
  if (!tag) return;
  // Avoid duplicates (case-insensitive)
  if (currentTags.some(t => t.toLowerCase() === tag.toLowerCase())) {
    tagInput.value = '';
    return;
  }
  currentTags.push(tag);
  renderPills();
  tagInput.value = '';
}

function removeTag(index) {
  currentTags.splice(index, 1);
  renderPills();
}

// Clicking the wrap focuses the input
tagInputWrap.addEventListener('click', () => tagInput.focus());

// Pill remove buttons (delegated)
tagInputWrap.addEventListener('click', e => {
  const btn = e.target.closest('.tag-pill-remove');
  if (btn) removeTag(Number(btn.dataset.index));
});

tagInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag(tagInput.value);
  }
  // Backspace on empty input removes last tag
  if (e.key === 'Backspace' && tagInput.value === '' && currentTags.length > 0) {
    removeTag(currentTags.length - 1);
  }
});

// Also commit on blur so tapping away saves a partially-typed tag
tagInput.addEventListener('blur', () => {
  if (tagInput.value.trim()) addTag(tagInput.value);
});

// Comma typed mid-value
tagInput.addEventListener('input', () => {
  if (tagInput.value.includes(',')) {
    tagInput.value.split(',').forEach(part => addTag(part));
  }
});

// ─── ALL TAGS (unique, sorted) ────────────────────────
function getAllTags() {
  const set = new Set();
  prompts.forEach(p => (p.tags || []).forEach(t => set.add(t)));
  return [...set].sort();
}

// ─── FILTER CHIPS ────────────────────────────────────
function renderFilters() {
  filterWrap.querySelectorAll('[data-tag]:not([data-tag="all"])').forEach(el => el.remove());

  getAllTags().forEach(tag => {
    const chip = document.createElement('button');
    chip.className = 'filter-chip' + (activeTag === tag ? ' active' : '');
    chip.dataset.tag = tag;
    chip.textContent = tag;
    chip.setAttribute('touch-action', 'manipulation');
    chip.addEventListener('click', () => setTag(tag));
    filterWrap.appendChild(chip);
  });

  // Update datalist
  tagSuggestions.innerHTML = '';
  getAllTags().forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    tagSuggestions.appendChild(opt);
  });

  filterWrap.querySelector('[data-tag="all"]').classList.toggle('active', activeTag === 'all');
}

function setTag(tag) {
  activeTag = tag;
  document.querySelectorAll('.filter-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.tag === tag)
  );
  renderGrid();
}

// ─── FILTERING ───────────────────────────────────────
function filtered() {
  let list = prompts;
  if (activeTag !== 'all') {
    list = list.filter(p => (p.tags || []).includes(activeTag));
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.desc  || '').toLowerCase().includes(q) ||
      (p.tags  || []).some(t => t.toLowerCase().includes(q)) ||
      p.prompt.toLowerCase().includes(q)
    );
  }
  return list;
}

// ─── RENDER GRID ─────────────────────────────────────
function renderGrid() {
  renderFilters();
  const list = filtered();
  grid.innerHTML = '';

  let countEl = document.querySelector('.count-badge');
  if (!countEl) {
    countEl = document.createElement('p');
    countEl.className = 'count-badge';
    grid.before(countEl);
  }
  countEl.textContent = list.length === 0 ? '' :
    `${list.length} prompt${list.length === 1 ? '' : 's'}`;

  if (list.length === 0) { emptyState.hidden = false; return; }
  emptyState.hidden = true;

  list.forEach((p, i) => {
    const tags = p.tags || [];
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${i * 30}ms`;
    card.innerHTML = `
      <div class="card-top">
        ${tags.length ? `<div class="card-tags">${tags.map(t => `<span class="card-tag">${escHtml(t)}</span>`).join('')}</div>` : ''}
        <div class="card-title">${escHtml(p.title)}</div>
        ${p.desc ? `<div class="card-desc">${escHtml(p.desc)}</div>` : ''}
      </div>
      <div class="card-preview">${escHtml(p.prompt)}</div>
      <div class="card-actions">
        <button class="card-btn del-btn" data-id="${p.id}" touch-action="manipulation">
          ✕ Delete
        </button>
        <button class="card-btn edit-btn" data-id="${p.id}" touch-action="manipulation">
          ✎ Edit
        </button>
        <button class="card-btn copy-btn" data-id="${p.id}" touch-action="manipulation">
          <span class="copy-icon">⎘</span><span class="copy-label"> Copy</span>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ─── SEARCH ──────────────────────────────────────────
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim();
  renderGrid();
});

filterWrap.querySelector('[data-tag="all"]').addEventListener('click', () => setTag('all'));

// ─── MODAL ───────────────────────────────────────────
function openModal(prompt = null) {
  editingId = prompt ? prompt.id : null;
  modalTitle.textContent = prompt ? 'Edit Prompt' : 'New Prompt';
  fieldTitle.value  = prompt ? prompt.title       : '';
  fieldDesc.value   = prompt ? (prompt.desc || '') : '';
  fieldPrompt.value = prompt ? prompt.prompt      : '';

  // Load tags into pill state
  currentTags = prompt ? [...(prompt.tags || [])] : [];
  renderPills();
  tagInput.value = '';

  modal.classList.add('visible');
  backdrop.classList.add('visible');
  document.body.style.overflow = 'hidden';

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    setTimeout(() => fieldTitle.focus(), 50);
  }
}

function closeModal() {
  modal.classList.remove('visible');
  backdrop.classList.remove('visible');
  document.body.style.overflow = '';
  editingId = null;
}

btnAdd.addEventListener('click', () => openModal());
btnClose.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── SAVE ────────────────────────────────────────────
btnSave.addEventListener('click', () => {
  // Commit any partially-typed tag
  if (tagInput.value.trim()) addTag(tagInput.value);

  const title  = fieldTitle.value.trim();
  const desc   = fieldDesc.value.trim();
  const prompt = fieldPrompt.value.trim();
  const tags   = [...currentTags];

  if (!title)  { shake(fieldTitle);  fieldTitle.focus();  return; }
  if (!prompt) { shake(fieldPrompt); fieldPrompt.focus(); return; }

  if (editingId) {
    const idx = prompts.findIndex(p => p.id === editingId);
    if (idx !== -1) prompts[idx] = { ...prompts[idx], title, tags, desc, prompt };
  } else {
    prompts.unshift({ id: uid(), title, tags, desc, prompt, created: Date.now() });
  }

  save();
  closeModal();
  renderGrid();
  showToast(editingId ? 'Prompt updated' : 'Prompt saved');
});

// ─── GRID EVENTS (delegation) ─────────────────────────
grid.addEventListener('click', e => {
  const copyBtn = e.target.closest('.copy-btn');
  const editBtn = e.target.closest('.edit-btn');
  const delBtn  = e.target.closest('.del-btn');

  if (copyBtn) {
    const p = prompts.find(p => p.id === copyBtn.dataset.id);
    if (!p) return;
    copyText(p.prompt);
    copyBtn.classList.add('copied');
    copyBtn.querySelector('.copy-icon').textContent = '✓';
    copyBtn.querySelector('.copy-label').textContent = ' Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.querySelector('.copy-icon').textContent = '⎘';
      copyBtn.querySelector('.copy-label').textContent = ' Copy';
    }, 2000);
    showToast('Copied to clipboard');
  }

  if (editBtn) {
    const p = prompts.find(p => p.id === editBtn.dataset.id);
    if (p) openModal(p);
  }

  if (delBtn) {
    if (!confirm('Delete this prompt?')) return;
    prompts = prompts.filter(p => p.id !== delBtn.dataset.id);
    save();
    renderGrid();
    showToast('Prompt deleted');
  }
});

// ─── CLIPBOARD ───────────────────────────────────────
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-999px;top:-999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

// ─── TOAST ───────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ─── SEED DATA (first launch only) ───────────────────
function seed() {
  if (prompts.length > 0) return;
  prompts = [
    {
      id: uid(), title: 'Rewrite for Clarity', tags: ['Writing'],
      desc: 'Simplifies complex text without losing meaning.',
      prompt: 'Rewrite the following text so it is clear, concise, and easy to understand. Remove jargon, shorten sentences, and keep the core meaning intact:\n\n[PASTE TEXT HERE]',
      created: Date.now()
    },
    {
      id: uid(), title: 'Code Review', tags: ['Code', 'Dev'],
      desc: 'Reviews code for bugs, readability, and best practices.',
      prompt: 'Review the following code. Look for bugs, performance issues, and anything that violates best practices. Suggest specific improvements with examples:\n\n[PASTE CODE HERE]',
      created: Date.now()
    },
    {
      id: uid(), title: 'Summarise in 3 Bullets', tags: ['Writing', 'Research'],
      desc: 'Distils any content into three key takeaways.',
      prompt: 'Summarise the following content in exactly 3 bullet points. Each bullet should be one clear, self-contained sentence:\n\n[PASTE CONTENT HERE]',
      created: Date.now()
    },
  ];
  save();
}

// ─── MENU (import / export) ──────────────────────────
const btnMenu         = document.getElementById('btnMenu');
const dropdown        = document.getElementById('dropdown');
const btnExport       = document.getElementById('btnExport');
const btnImportTrigger= document.getElementById('btnImportTrigger');
const importFile      = document.getElementById('importFile');

function closeMenu() { dropdown.classList.remove('open'); }

btnMenu.addEventListener('click', e => {
  e.stopPropagation();
  dropdown.classList.toggle('open');
});

document.addEventListener('click', () => closeMenu());
dropdown.addEventListener('click', e => e.stopPropagation());

// ── Export ────────────────────────────────────────────
btnExport.addEventListener('click', () => {
  closeMenu();
  // Sanitise before export — normalise line endings so JSON.stringify never
  // produces literal newlines inside string values
  const clean = prompts.map(p => ({
    ...p,
    prompt: p.prompt.replace(/\r\n/g, '\n').replace(/\r/g, '\n'),
  }));
  const json = JSON.stringify(clean, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href     = url;
  a.download = `prompt-library-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Exported ${prompts.length} prompt${prompts.length === 1 ? '' : 's'}`);
});

// ── Import ────────────────────────────────────────────
const conflictDialog  = document.getElementById('conflictDialog');
const conflictTitle   = document.getElementById('conflictTitle');
const conflictBody    = document.getElementById('conflictBody');
const btnConflictReplace = document.getElementById('btnConflictReplace');
const btnConflictSkip    = document.getElementById('btnConflictSkip');
const btnConflictCancel  = document.getElementById('btnConflictCancel');

function parseImportFile(raw) {
  // Repair literal newlines inside JSON string values (from broken exports)
  const repaired = raw.replace(/"(?:[^"\\]|\\.)*"/gs, match =>
    match.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
  );
  const incoming = JSON.parse(repaired);
  if (!Array.isArray(incoming)) throw new Error('Not an array');
  return incoming.filter(p =>
    p && typeof p.title === 'string' && typeof p.prompt === 'string'
  ).map(p => ({
    id:      p.id || uid(),
    title:   p.title,
    tags:    Array.isArray(p.tags) ? p.tags : (p.tag ? [p.tag] : []),
    desc:    p.desc  || '',
    prompt:  p.prompt,
    created: p.created || Date.now(),
  }));
}

// Compare two prompts — true if content is identical (ignores created timestamp)
function promptsAreIdentical(a, b) {
  return a.title  === b.title  &&
         a.prompt === b.prompt &&
         a.desc   === b.desc   &&
         JSON.stringify(a.tags) === JSON.stringify(b.tags);
}

function applyImport(brandNew, modified, replaceModified) {
  let added    = 0;
  let replaced = 0;

  // Add brand new prompts
  if (brandNew.length > 0) {
    prompts = [...brandNew, ...prompts];
    added = brandNew.length;
  }

  // Replace modified prompts if user chose to
  if (replaceModified && modified.length > 0) {
    modified.forEach(incoming => {
      const idx = prompts.findIndex(p => p.id === incoming.id);
      if (idx !== -1) { prompts[idx] = incoming; replaced++; }
    });
  }

  save();
  renderGrid();

  const parts = [];
  if (added    > 0) parts.push(`${added} new`);
  if (replaced > 0) parts.push(`${replaced} restored`);
  const skipped = modified.length - replaced;
  if (skipped  > 0) parts.push(`${skipped} kept`);
  showToast(parts.length ? parts.join(' · ') + ' prompt' + (added + replaced + skipped === 1 ? '' : 's') : 'Already up to date');
}

btnImportTrigger.addEventListener('click', () => {
  closeMenu();
  importFile.value = '';
  importFile.click();
});

importFile.addEventListener('change', () => {
  const file = importFile.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const valid = parseImportFile(e.target.result);
      if (valid.length === 0) throw new Error('No valid prompts found');

      const existingMap = new Map(prompts.map(p => [p.id, p]));

      const brandNew  = [];  // ID not in library → auto-import
      const identical = [];  // same ID + same content → silently skip
      const modified  = [];  // same ID + different content → show dialog

      valid.forEach(incoming => {
        if (!existingMap.has(incoming.id)) {
          brandNew.push(incoming);
        } else if (promptsAreIdentical(existingMap.get(incoming.id), incoming)) {
          identical.push(incoming);
        } else {
          modified.push(incoming);
        }
      });

      // No dialog needed — silently apply
      if (modified.length === 0) {
        applyImport(brandNew, [], false);
        if (brandNew.length === 0) showToast('Already up to date');
        return;
      }

      // Show conflict dialog only for genuinely modified prompts
      const parts = [];
      if (modified.length > 0) parts.push(`<strong>${modified.length} modified</strong>`);
      if (brandNew.length  > 0) parts.push(`<strong>${brandNew.length} new</strong> will be added automatically`);
      if (identical.length > 0) parts.push(`<strong>${identical.length} identical</strong> will be skipped`);

      conflictTitle.textContent = `${modified.length} conflict${modified.length === 1 ? '' : 's'} found`;
      conflictBody.innerHTML = parts.join(' · ') + `.<br><br>The modified prompt${modified.length === 1 ? ' has' : 's have'} changed since this backup. Keep your current version or restore from backup?`;

      conflictDialog.classList.add('visible');
      backdrop.classList.add('visible');

      const cleanup = () => {
        conflictDialog.classList.remove('visible');
        backdrop.classList.remove('visible');
        btnConflictReplace.removeEventListener('click', onReplace);
        btnConflictSkip.removeEventListener('click', onSkip);
        btnConflictCancel.removeEventListener('click', onCancel);
      };
      const onReplace = () => { cleanup(); applyImport(brandNew, modified, true);  };
      const onSkip    = () => { cleanup(); applyImport(brandNew, modified, false); };
      const onCancel  = () => { cleanup(); showToast('Import cancelled'); };

      btnConflictReplace.addEventListener('click', onReplace, { once: true });
      btnConflictSkip.addEventListener('click', onSkip, { once: true });
      btnConflictCancel.addEventListener('click', onCancel, { once: true });

    } catch (err) {
      console.error('Import error:', err);
      showToast('Import failed — invalid file');
    }
  };
  reader.readAsText(file);
});


seed();
renderGrid();
