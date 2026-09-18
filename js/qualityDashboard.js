/**
 * HELIOSUNTECH PLASTICS - TECHNICAL QUALITY & BATCH INSPECTION CONSOLE
 * Real-world process control, traceability, and batch testing metrics.
 */

const SAMPLE_BATCHES = [
  {
    batchNo: "HST-26-PP-104",
    material: "Recycled PP Homopolymer",
    grade: "Injection Grade A",
    prodDate: "2026-09-14",
    inspection: "Thermal MFI & Moisture Analysis",
    result: "Consistent (0.12% moisture)",
    status: "PASSED",
    operator: "QC-Station-1"
  },
  {
    batchNo: "HST-26-HD-089",
    material: "Recycled HDPE",
    grade: "Blow Moulding",
    prodDate: "2026-09-15",
    inspection: "Density & Contamination Check",
    result: "0.952 g/cm³ - No volatile residue",
    status: "PASSED",
    operator: "QC-Station-2"
  },
  {
    batchNo: "HST-26-CF-042",
    material: "Plastic Coating Film",
    grade: "Substrate Grade 50µ",
    prodDate: "2026-09-17",
    inspection: "Micron Gauge & Surface Corona Test",
    result: "Tolerance +/- 2.5% across web",
    status: "PASSED",
    operator: "QC-Film-Line"
  },
  {
    batchNo: "HST-26-LD-115",
    material: "Recycled LDPE Flakes",
    grade: "Extrusion Feedstock",
    prodDate: "2026-09-18",
    inspection: "NIR Polymer Purity Spectrum",
    result: "Purity > 99.4%",
    status: "IN TESTING",
    operator: "QC-Lab-Optical"
  }
];

class QualityDashboard {
  constructor() {
    this.tableBody = document.getElementById('qualityTableBody');
    this.searchBatchInput = document.getElementById('searchBatchInput');
    this.batches = SAMPLE_BATCHES;
    this.init();
  }

  init() {
    if (!this.tableBody) return;
    this.render();

    if (this.searchBatchInput) {
      this.searchBatchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.render(query);
      });
    }
  }

  render(query = '') {
    this.tableBody.innerHTML = '';
    const filtered = this.batches.filter(b => 
      !query || b.batchNo.toLowerCase().includes(query) || b.material.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      this.tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No batch record found matching "${query}".
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(b => {
      const tr = document.createElement('tr');
      const isPassed = b.status === 'PASSED';
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--accent-cyan); font-family: monospace;">${b.batchNo}</td>
        <td>${b.material} <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">${b.grade}</span></td>
        <td style="color: var(--text-secondary); font-size: 0.85rem;">${b.prodDate}</td>
        <td style="font-size: 0.85rem;">${b.inspection}<span style="display: block; color: var(--text-muted); font-size: 0.75rem;">${b.result}</span></td>
        <td>
          <span class="status-badge ${isPassed ? 'passed' : 'testing'}">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: currentColor;"></span>
            ${b.status}
          </span>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="window.viewBatchDetails('${b.batchNo}')">Inspect</button>
        </td>
      `;
      this.tableBody.appendChild(tr);
    });
  }
}

window.QualityDashboard = QualityDashboard;
