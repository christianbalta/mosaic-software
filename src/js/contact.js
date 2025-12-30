// Contact Form Handler - Mosaic Software
document.addEventListener('astro:page-load', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Prevent duplicate bindings
  if (form.dataset.bound) return;
  form.dataset.bound = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('success-message');
    const successContent = document.getElementById('success-content');
    const originalBtnText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sende...';

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch('https://submission.mosaic-software.ch/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Show success overlay (already exists in HTML)
        successMessage.classList.remove('opacity-0', 'pointer-events-none');
        successContent.classList.remove('scale-90');
        form.reset();
      } else {
        showError(form, result.error || 'Ein Fehler ist aufgetreten.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showError(form, 'Verbindungsfehler. Bitte versuche es später erneut.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
});

function showError(form, message) {
  // Remove existing error
  const existing = form.parentElement.querySelector('.form-error');
  if (existing) existing.remove();

  // Create error element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error mt-4 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200';
  errorDiv.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    </div>
  `;

  form.parentElement.appendChild(errorDiv);
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Auto-remove after 10 seconds
  setTimeout(() => errorDiv.remove(), 10000);
}
