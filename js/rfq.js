/**
 * HELIOSUNTECH PLASTICS - B2B RFQ & SPECIFICATION INQUIRY SYSTEM
 * High-conversion industrial lead generation and custom quote management.
 */

class RfqManager {
  constructor() {
    this.modal = document.getElementById('rfqModal');
    this.form = document.getElementById('rfqForm');
    this.sectionForm = document.getElementById('sectionRfqForm');
    this.fileDrop = document.getElementById('rfqDropZone');
    this.fileInput = document.getElementById('rfqFileInput');
    this.fileNameDisplay = document.getElementById('rfqFileName');
    
    this.init();
  }

  init() {
    // Hook submit handlers
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e, 'modal'));
    }
    if (this.sectionForm) {
      this.sectionForm.addEventListener('submit', (e) => this.handleSubmit(e, 'section'));
    }

    // Drag and drop handling
    if (this.fileDrop && this.fileInput) {
      this.fileDrop.addEventListener('click', () => this.fileInput.click());
      this.fileInput.addEventListener('change', () => {
        if (this.fileInput.files.length > 0) {
          this.fileNameDisplay.textContent = `Attached: ${this.fileInput.files[0].name}`;
          this.fileNameDisplay.style.color = 'var(--accent-green)';
        }
      });

      this.fileDrop.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.fileDrop.style.borderColor = 'var(--accent-green)';
      });
      this.fileDrop.addEventListener('dragleave', () => {
        this.fileDrop.style.borderColor = 'var(--border-subtle)';
      });
      this.fileDrop.addEventListener('drop', (e) => {
        e.preventDefault();
        this.fileDrop.style.borderColor = 'var(--border-subtle)';
        if (e.dataTransfer.files.length > 0) {
          this.fileInput.files = e.dataTransfer.files;
          this.fileNameDisplay.textContent = `Attached: ${e.dataTransfer.files[0].name}`;
          this.fileNameDisplay.style.color = 'var(--accent-green)';
        }
      });
    }
  }

  open(prefilledProduct = '', requirementType = 'Plastic Granules') {
    if (!this.modal) return;
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (prefilledProduct) {
      const prodField = document.getElementById('rfqModalProduct');
      if (prodField) prodField.value = decodeURIComponent(prefilledProduct);
    }
    if (requirementType) {
      const typeField = document.getElementById('rfqModalRequirementType');
      if (typeField) typeField.value = requirementType;
    }
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  handleSubmit(e, source) {
    e.preventDefault();
    const activeForm = source === 'modal' ? this.form : this.sectionForm;
    const formData = new FormData(activeForm);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    if (!data.name || !data.email || !data.phone) {
      window.showToast('Please fill in your name, email, and phone number.');
      return;
    }

    // Persist inquiry to localStorage for CMS viewing
    const inquiries = JSON.parse(localStorage.getItem('heliosuntech_inquiries') || '[]');
    inquiries.unshift({
      id: 'RFQ-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...data
    });
    localStorage.setItem('heliosuntech_inquiries', JSON.stringify(inquiries));

    // Reset form & show toast
    activeForm.reset();
    if (this.fileNameDisplay) this.fileNameDisplay.textContent = '';
    if (source === 'modal') this.close();

    window.showToast('Enquiry received! Our industrial materials team will contact you shortly.');
  }
}

window.RfqManager = RfqManager;
