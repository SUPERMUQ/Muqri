// Main Frontend JavaScript Logic for Ahmad Muqri Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Live Metrics Fetcher
  const updateLiveMetrics = async () => {
    try {
      const res = await fetch('/api/v1/health');
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.data) {
        const metrics = data.data;
        
        const uptimeEl = document.getElementById('metric-uptime');
        const memoryEl = document.getElementById('metric-memory');
        const statusEl = document.getElementById('metric-status');
        
        if (uptimeEl) uptimeEl.textContent = `${Math.floor(metrics.uptime)}s`;
        if (memoryEl) memoryEl.textContent = `${(metrics.memoryUsage.heapUsed / 1024 / 1024).toFixed(1)} MB`;
        if (statusEl) statusEl.textContent = metrics.status;
      }
    } catch (err) {
      console.warn('Failed to fetch live health metrics:', err);
    }
  };

  // Poll metrics every 5 seconds
  updateLiveMetrics();
  setInterval(updateLiveMetrics, 5000);

  // Contact Form AJAX Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        subject: document.getElementById('form-subject').value,
        message: document.getElementById('form-message').value,
      };

      try {
        const response = await fetch('/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          formStatus.className = 'form-status success';
          formStatus.textContent = data.message || 'Message sent successfully!';
          formStatus.style.display = 'block';
          contactForm.reset();
        } else {
          formStatus.className = 'form-status error';
          formStatus.textContent = data.error?.message || 'Failed to send message. Please check input fields.';
          formStatus.style.display = 'block';
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Server connection error. Please try again later.';
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // Interactive Pipeline Step Selector
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  pipelineSteps.forEach((step) => {
    step.addEventListener('click', () => {
      pipelineSteps.forEach((s) => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
});
