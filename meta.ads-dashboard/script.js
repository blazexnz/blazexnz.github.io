// ─── DATA ────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: "mockup",
    num: "01",
    name: "Mock Up Test",
    description: "Find a winning mock up design.",
    objectives: [
      "Find a mock up winner for your brand",
      "Same colour t-shirt and design on all variations",
      "Run test Thu–Sun at $21/day",
      "Never stop making designs",
    ],
    actions: [
      "Create 10 static ad designs as mock ups",
      "Choose best t -shirt design as a control",
      "Run ads Thur-Fri",
      "Select winner: 5+ link clicks & CPC < $1.70",
    ],
    metrics: [
      { key: "link_clicks", name: "Link Clicks", target: "≥ 5", operator: "gte", threshold: 5, higherIsBetter: true },
      { key: "cpc", name: "Cost Per Click (CPC)", target: "< $1.70", prefix: "$", operator: "lt", threshold: 1.70, higherIsBetter: false, decimal: true },
    ],
  },
  {
    id: "testing",
    num: "02",
    name: "Testing",
    description: "Entry: winning mock up. Launch catalogue ad using winning mock up and find emerging winners. Ignore sales - we are learning the market.",
    objectives: [
      "Find emerging winners, CPC below $1.70",
      "Get overall catalogue CPC below $1.70",
      "Apply winning mock up to Shopify product pages",
      "Run catalogue ad Thu–Sun at $12.50 USD/day",
      "Iterate on emerging winners — never stop making designs",
      "Get overall catalogue CPC below $1.70",
    ],
    actions: [
      "Run catalogue ad Thu–Sun",
      "Identify emerging winners each cycle",
      "Iterate designs based on what's working",
      "Keep creating designs, 25 per week",
    ],
    metrics: [
      { key: "link_clicks", name: "Link Clicks", target: "3–5", operator: "gte", threshold: 3, higherIsBetter: true },
      { key: "cpc", name: "Cost Per Click (CPC)", target: "< $1.70", prefix: "$", operator: "lt", threshold: 1.70, higherIsBetter: false, decimal: true },
    ],
  },
  {
    id: "scaling",
    num: "03",
    name: "Scaling",
    description: "Entry criteria: proven winners from catalogue test. Double down on what's working and increase budgets.",
    objectives: [
      "Scale winning ad sets by 30–50% weekly",
      "Maintain ROAS ≥ 3.0 at scale",
      "Keep Cost Per Purchase within target",
      "Expand to Lookalike audiences 1–5%",
    ],
    actions: [
      "Increase budget every Mon if ROAS holds",
      "Launch new Lookalike audiences weekly",
      "Monitor CPA daily — pause if 2× target",
      "Refresh creatives every 2 weeks to fight fatigue",
    ],
    metrics: [
      { key: "roas", name: "ROAS", target: "≥ 3.0×", suffix: "×", operator: "gte", threshold: 3.0, higherIsBetter: true },
      { key: "cpa", name: "Cost Per Purchase (CPA)", target: "< $30", prefix: "$", operator: "lt", threshold: 30.0, higherIsBetter: false, decimal: true },
      { key: "cpc", name: "Cost Per Click (CPC)", target: "< $0.70", prefix: "$", operator: "lt", threshold: 0.7, higherIsBetter: false, decimal: true },
      { key: "ctr", name: "CTR", target: "> 2.5%", suffix: "%", operator: "gt", threshold: 2.5, higherIsBetter: true },
      { key: "frequency", name: "Frequency", target: "< 4.0", operator: "lt", threshold: 4.0, higherIsBetter: false },
      { key: "link_clicks", name: "Link Clicks", target: "≥ 200", operator: "gte", threshold: 200, higherIsBetter: true },
    ],
  },
  {
    id: "optimising",
    num: "04",
    name: "Optimising",
    description: "Entry criteria: 2.0 ROAS. Traffic is coming in — now convert it. Focus on store performance, offers, and maximising revenue per visitor.",
    objectives: [
      "Improve product page conversion rate",
      "Increase average order value via upsells",
      "Reduce bounce rate on landing pages",
      "Test pricing, offers, and bundles",
    ],
    actions: [
      "Review product page copy and images weekly",
      "A/B test pricing or offer on top products",
      "Add upsell or cross-sell to checkout",
      "Check site speed and mobile experience",
    ],
    metrics: [
      { key: "conversion_rate", name: "Conversion Rate", target: "> 2.5%", suffix: "%", operator: "gt", threshold: 2.5, higherIsBetter: true },
      { key: "roas", name: "ROAS", target: "≥ 4.0×", suffix: "×", operator: "gte", threshold: 4.0, higherIsBetter: true },
      { key: "aov", name: "Avg Order Value (AOV)", target: "> $50", prefix: "$", operator: "gt", threshold: 50.0, higherIsBetter: true, decimal: true },
      { key: "cpa", name: "Cost Per Purchase (CPA)", target: "< $20", prefix: "$", operator: "lt", threshold: 20.0, higherIsBetter: false, decimal: true },
      { key: "cpc", name: "Cost Per Click (CPC)", target: "< $0.60", prefix: "$", operator: "lt", threshold: 0.6, higherIsBetter: false, decimal: true },
    ],
  },
];

// ─── STATE ───────────────────────────────────────────────────────────────────

let activePhase = 0;
let values = {}; // { phaseId_metricKey: value }

// ─── INIT ────────────────────────────────────────────────────────────────────

function init() {
  setDate();
  renderPhaseTabs();
  renderPhase(activePhase);
  loadValues();
}

function setDate() {
  const d = new Date();
  const opts = { weekday: "short", month: "short", day: "numeric" };
  document.getElementById("dateBadge").textContent = d.toLocaleDateString("en-NZ", opts).toUpperCase();
}

// ─── PHASE TABS ──────────────────────────────────────────────────────────────

function renderPhaseTabs() {
  const container = document.getElementById("phaseTabs");
  container.innerHTML = PHASES.map((p, i) => `
    <button
      class="phase-tab${i === activePhase ? " active" : ""}"
      onclick="switchPhase(${i})"
    >
      <span class="tab-num">${p.num}</span>
      <span class="tab-name">${p.name}</span>
    </button>
  `).join("");
}

function switchPhase(index) {
  saveCurrentValues();
  activePhase = index;
  renderPhaseTabs();
  renderPhase(index);
  loadValues();
}

// ─── PHASE CONTENT ───────────────────────────────────────────────────────────

function renderPhase(index) {
  const phase = PHASES[index];

  // Header
  document.getElementById("phaseHeaderName").textContent = `Phase ${phase.num} — ${phase.name}`;
  document.getElementById("phaseHeaderDesc").textContent = phase.description;

  // Objectives & Actions
  document.getElementById("infoCards").innerHTML = `
    <div class="info-card">
      <div class="info-card-label">Objectives</div>
      <ul class="info-list">
        ${phase.objectives.map(o => `<li>${o}</li>`).join("")}
      </ul>
    </div>
    <div class="info-card">
      <div class="info-card-label actions-label">Daily Actions</div>
      <ul class="info-list">
        ${phase.actions.map(a => `<li>${a}</li>`).join("")}
      </ul>
    </div>
  `;

  // Metrics
  const grid = document.getElementById("metricsGrid");
  grid.innerHTML = phase.metrics.map(m => {
    const storageKey = `${PHASES[index].id}_${m.key}`;
    const savedVal = values[storageKey] ?? "";
    const prefix = m.prefix || "";
    const suffix = m.suffix || "";

    const inputMode = m.decimal ? "numeric" : "decimal";
    const inputType = "text";

    return `
      <div class="metric-card neutral" id="card_${storageKey}">
        <div class="metric-name">${m.name}</div>
        <div class="metric-bottom">
          <div class="metric-input-wrap">
            ${prefix ? `<span class="metric-prefix">${prefix}</span>` : ""}
            <input
              class="metric-input"
              id="input_${storageKey}"
              type="${inputType}"
              inputmode="${inputMode}"
              pattern="[0-9]*"
              placeholder="—"
              value="${savedVal}"
              autocomplete="off"
              data-decimal="${m.decimal ? "true" : "false"}"
              oninput="onValueChange('${storageKey}', '${PHASES[index].id}', ${index})"
            >${suffix ? `<span class="metric-prefix" style="font-size:13px;margin-left:2px;">${suffix}</span>` : ""}
          </div>
          <div class="metric-status" id="status_${storageKey}"></div>
        </div>
        <div class="metric-target">${m.target}</div>
      </div>
    `;
  }).join("");

  // Re-evaluate any pre-filled values
  phase.metrics.forEach(m => {
    const storageKey = `${phase.id}_${m.key}`;
    if (values[storageKey] !== undefined && values[storageKey] !== "") {
      evaluateMetric(storageKey, phase.id, index);
    }
  });

  updateScore(index);
}

// ─── VALUE HANDLING ───────────────────────────────────────────────────────────

function onValueChange(storageKey, phaseId, phaseIndex) {
  const input = document.getElementById(`input_${storageKey}`);
  const isDecimal = input.dataset.decimal === "true";

  if (isDecimal) {
    // Strip everything except digits
    const digits = input.value.replace(/\D/g, "");

    if (digits === "") {
      input.value = "";
      values[storageKey] = "";
    } else {
      // Treat digits as cents: 70 → 0.70, 170 → 1.70, 1700 → 17.00
      const cents = parseInt(digits, 10);
      const amount = cents / 100;
      const formatted = amount.toFixed(2);
      input.value = formatted;
      values[storageKey] = formatted;
    }
  } else {
    values[storageKey] = input.value;
  }

  evaluateMetric(storageKey, phaseId, phaseIndex);
  updateScore(phaseIndex);
  saveToStorage();
}

function evaluateMetric(storageKey, phaseId, phaseIndex) {
  const phase = PHASES[phaseIndex];
  const metricKey = storageKey.replace(`${phaseId}_`, "");
  const metric = phase.metrics.find(m => m.key === metricKey);
  if (!metric) return;

  const rawVal = values[storageKey];
  const card = document.getElementById(`card_${storageKey}`);
  const status = document.getElementById(`status_${storageKey}`);

  if (rawVal === "" || rawVal === undefined || rawVal === null) {
    card.className = "metric-card neutral";
    status.textContent = "";
    return;
  }

  const num = parseFloat(rawVal.replace(",", "."));
  if (isNaN(num)) {
    card.className = "metric-card neutral";
    status.textContent = "?";
    return;
  }

  let pass = false;
  switch (metric.operator) {
    case "lt":  pass = num < metric.threshold; break;
    case "lte": pass = num <= metric.threshold; break;
    case "gt":  pass = num > metric.threshold; break;
    case "gte": pass = num >= metric.threshold; break;
  }

  card.className = `metric-card ${pass ? "pass" : "fail"}`;
  status.textContent = pass ? "✓" : "✗";
}

function updateScore(phaseIndex) {
  const phase = PHASES[phaseIndex];
  let filled = 0, passed = 0;

  phase.metrics.forEach(m => {
    const storageKey = `${phase.id}_${m.key}`;
    const rawVal = values[storageKey];
    if (rawVal === "" || rawVal === undefined) return;

    const num = parseFloat((rawVal + "").replace(",", "."));
    if (isNaN(num)) return;

    filled++;
    let pass = false;
    switch (m.operator) {
      case "lt":  pass = num < m.threshold; break;
      case "lte": pass = num <= m.threshold; break;
      case "gt":  pass = num > m.threshold; break;
      case "gte": pass = num >= m.threshold; break;
    }
    if (pass) passed++;
  });

  const fraction = document.getElementById("scoreFraction");
  const fill = document.getElementById("scoreFill");
  const note = document.getElementById("scoreNote");

  if (filled === 0) {
    fraction.innerHTML = "—";
    fill.style.width = "0%";
    fill.className = "score-fill";
    note.textContent = "Enter values above to see your score.";
    return;
  }

  const pct = Math.round((passed / filled) * 100);
  const total = phase.metrics.length;

  fraction.innerHTML = `<span class="score-pass">${passed}</span> / <span class="score-fail">${filled}</span> <span style="color:var(--text-tertiary);font-size:11px;">of ${total} metrics entered</span>`;

  fill.style.width = `${pct}%`;
  fill.className = `score-fill${pct >= 75 ? "" : pct >= 50 ? " mid" : " low"}`;

  const messages = {
    100: "All metrics passing — looking strong 🔥",
    75:  "Mostly on track. Investigate failing metrics.",
    50:  "Mixed results. Prioritise failing metrics today.",
    0:   "Below target. Consider pausing underperformers.",
  };

  const msgKey = pct === 100 ? 100 : pct >= 75 ? 75 : pct >= 50 ? 50 : 0;
  note.textContent = messages[msgKey];
}

// ─── CLEAR ───────────────────────────────────────────────────────────────────

function clearValues() {
  const phase = PHASES[activePhase];
  phase.metrics.forEach(m => {
    const storageKey = `${phase.id}_${m.key}`;
    delete values[storageKey];
    const input = document.getElementById(`input_${storageKey}`);
    if (input) input.value = "";
    const card = document.getElementById(`card_${storageKey}`);
    if (card) card.className = "metric-card neutral";
    const status = document.getElementById(`status_${storageKey}`);
    if (status) status.textContent = "";
  });
  updateScore(activePhase);
  saveToStorage();
}

// ─── PERSISTENCE ─────────────────────────────────────────────────────────────

function saveCurrentValues() {
  // Already saved on input
}

function saveToStorage() {
  try {
    localStorage.setItem("metaads_values", JSON.stringify(values));
  } catch (e) {}
}

function loadValues() {
  try {
    const saved = localStorage.getItem("metaads_values");
    if (saved) values = { ...values, ...JSON.parse(saved) };
  } catch (e) {}

  // Re-render with loaded values
  const phase = PHASES[activePhase];
  phase.metrics.forEach(m => {
    const storageKey = `${phase.id}_${m.key}`;
    const input = document.getElementById(`input_${storageKey}`);
    if (input && values[storageKey] !== undefined) {
      input.value = values[storageKey];
      evaluateMetric(storageKey, phase.id, activePhase);
    }
  });
  updateScore(activePhase);
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────

function openExportModal() {
  const phase = PHASES[activePhase];
  document.getElementById("exportSubtitle").textContent =
    `Phase ${phase.num} — ${phase.name} · ${new Date().toLocaleDateString("en-NZ", { weekday:"short", day:"numeric", month:"short", year:"numeric" })}`;
  document.getElementById("exportStatus").textContent = "";
  document.getElementById("exportModal").classList.add("open");
}

function closeExportModal(e) {
  if (e && e.target !== document.getElementById("exportModal")) return;
  document.getElementById("exportModal").classList.remove("open");
}

function setExportStatus(msg, isError) {
  const el = document.getElementById("exportStatus");
  el.textContent = msg;
  el.style.color = isError ? "var(--accent-red)" : "var(--accent-green)";
}

async function exportAs(format) {
  const phase = PHASES[activePhase];
  const dateStr = new Date().toLocaleDateString("en-NZ", { day:"2-digit", month:"2-digit", year:"numeric" }).replace(/\//g, "-");
  const filename = `meta-ads-${phase.id}-${dateStr}`;

  if (format === "text" || format === "copy") {
    const text = buildPlainText(phase);
    if (format === "text") {
      downloadText(text, `${filename}.txt`);
      setExportStatus("✓ Text file downloaded");
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setExportStatus("✓ Copied to clipboard");
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select(); document.execCommand("copy");
        document.body.removeChild(ta);
        setExportStatus("✓ Copied to clipboard");
      }
    }
    return;
  }

  if (format === "png" || format === "pdf") {
    setExportStatus("Generating…");
    try {
      const modal = document.getElementById("exportModal");
      modal.classList.remove("open");
      await new Promise(r => setTimeout(r, 120));

      const canvas = await html2canvas(document.querySelector(".app"), {
        backgroundColor: "#0a0a0b",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      modal.classList.add("open");

      if (format === "png") {
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setExportStatus("✓ PNG downloaded");
      } else {
        const { jsPDF } = window.jspdf;
        const pxW = canvas.width, pxH = canvas.height;
        const pdfW = 210;
        const pdfH = Math.round((pxH / pxW) * pdfW);
        const pdf = new jsPDF({ orientation: pdfH > pdfW ? "p" : "l", unit: "mm", format: [pdfW, pdfH] });
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfW, pdfH);
        pdf.save(`${filename}.pdf`);
        setExportStatus("✓ PDF downloaded");
      }
    } catch (err) {
      console.error(err);
      setExportStatus("Export failed — try plain text instead", true);
    }
  }
}

function buildPlainText(phase) {
  const lines = [];
  const d = new Date().toLocaleDateString("en-NZ", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  lines.push("═══════════════════════════════════════");
  lines.push("  META ADS REVIEW");
  lines.push(`  ${d}`);
  lines.push("═══════════════════════════════════════");
  lines.push(`  Phase ${phase.num} — ${phase.name.toUpperCase()}`);
  lines.push(`  ${phase.description}`);
  lines.push("");
  lines.push("OBJECTIVES");
  lines.push("───────────────────────────────────────");
  phase.objectives.forEach(o => lines.push(`  › ${o}`));
  lines.push("");
  lines.push("DAILY ACTIONS");
  lines.push("───────────────────────────────────────");
  phase.actions.forEach(a => lines.push(`  › ${a}`));
  lines.push("");
  lines.push("KEY METRICS");
  lines.push("───────────────────────────────────────");

  let passed = 0, filled = 0;
  phase.metrics.forEach(m => {
    const storageKey = `${phase.id}_${m.key}`;
    const raw = values[storageKey];
    const prefix = m.prefix || "";
    const suffix = m.suffix || "";
    let status = "—";
    let valueStr = "not entered";

    if (raw !== undefined && raw !== "") {
      const num = parseFloat((raw + "").replace(",", "."));
      filled++;
      if (!isNaN(num)) {
        let pass = false;
        switch (m.operator) {
          case "lt":  pass = num < m.threshold; break;
          case "lte": pass = num <= m.threshold; break;
          case "gt":  pass = num > m.threshold; break;
          case "gte": pass = num >= m.threshold; break;
        }
        if (pass) { passed++; status = "✓ PASS"; }
        else { status = "✗ FAIL"; }
        valueStr = `${prefix}${num}${suffix}`;
      }
    }

    lines.push(`  ${m.name}`);
    lines.push(`    Target : ${m.target}`);
    lines.push(`    Value  : ${valueStr}`);
    lines.push(`    Status : ${status}`);
    lines.push("");
  });

  lines.push("SCORE SUMMARY");
  lines.push("───────────────────────────────────────");
  if (filled === 0) {
    lines.push("  No values entered.");
  } else {
    const pct = Math.round((passed / filled) * 100);
    lines.push(`  ${passed} of ${filled} entered metrics passing (${pct}%)`);
    lines.push(`  Total metrics in phase: ${phase.metrics.length}`);
  }
  lines.push("");
  lines.push("═══════════════════════════════════════");
  lines.push("  Generated by META.ADS Review Tool");
  lines.push("═══════════════════════════════════════");

  return lines.join("\n");
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ─── START ───────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", init);
