// Interactive DevOps Terminal Engine for Ahmad Muqri Portfolio

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  
  if (!terminalBody || !terminalInput) return;

  const commands = {
    help: `Available commands:
  <span class="highlight">whoami</span>          Display engineer summary & bio
  <span class="highlight">neofetch</span>        System overview & cloud specs
  <span class="highlight">skills</span>          Cloud, DevOps, IaC & CI/CD technical stack
  <span class="highlight">projects</span>        Showcase of automated cloud infrastructure projects
  <span class="highlight">certifications</span>  Certifications & cloud learning path
  <span class="highlight">architecture</span>    Cloud architecture deployment workflow
  <span class="highlight">health</span>          Query live node server metrics via API
  <span class="highlight">contact</span>         Get direct contact details
  <span class="highlight">clear</span>           Clear terminal screen`,

    whoami: `<strong>Ahmad Muqri</strong>
Role: Junior Cloud & DevOps Engineer
Location: Kuala Lumpur, Malaysia / Remote
Mission: Architecting scalable, reliable cloud infrastructure and automating CI/CD pipelines with zero downtime.
Status: <span class="success">🟢 Open for Cloud / DevOps / SRE roles</span>`,

    neofetch: `
  <span class="highlight">ahmad@cloud-cluster</span>
  -------------------
  <span class="highlight">OS:</span> Linux Ubuntu 22.04 LTS (x86_64)
  <span class="highlight">Host:</span> AWS EKS / Hybrid Kubernetes Cluster
  <span class="highlight">Kernel:</span> 6.5.0-cloud-aws
  <span class="highlight">Uptime:</span> 99.99% Reliability Target
  <span class="highlight">Shell:</span> Zsh 5.9 (x86_64-ubuntu-linux-gnu)
  <span class="highlight">Cloud:</span> AWS (EC2, S3, EKS, Lambda, IAM, VPC)
  <span class="highlight">IaC:</span> Terraform v1.8.5 / Ansible
  <span class="highlight">Containers:</span> Docker 26.1 / Kubernetes 1.30
  <span class="highlight">CI/CD:</span> GitHub Actions / ArgoCD / Helm
  <span class="highlight">Monitoring:</span> Prometheus & Grafana Stack`,

    skills: `<span class="highlight">=== CLOUD & DEVOPS TECH STACK ===</span>
  ☁️  <span class="highlight">Cloud Platforms:</span> Amazon Web Services (AWS), Google Cloud (GCP)
  🏗️  <span class="highlight">Infrastructure as Code:</span> Terraform, CloudFormation, Ansible
  🐳 <span class="highlight">Container Orchestration:</span> Docker, Kubernetes, Helm, ArgoCD
  ⚙️  <span class="highlight">CI/CD Automation:</span> GitHub Actions, GitLab CI, Jenkins
  📊 <span class="highlight">Observability:</span> Prometheus, Grafana, CloudWatch, ELK Stack
  💻 <span class="highlight">Scripting & Web:</span> Node.js, Bash, Python, YAML, JSON`,

    projects: `<span class="highlight">=== FEATURED CLOUD PROJECTS ===</span>
  1. <span class="highlight">Automated GitOps K8s Cluster</span>
     - Terraform + ArgoCD + Helm + GitHub Actions
  2. <span class="highlight">AWS Serverless Microservices API</span>
     - Node.js + Lambda + API Gateway + DynamoDB + Terraform
  3. <span class="highlight">Production Node.js REST API Architecture</span>
     - Express + Zod + Pino + Docker + Health Metrics API`,

    certifications: `<span class="highlight">=== CERTIFICATIONS & DEVOPS BADGES ===</span>
  ✅ AWS Certified Cloud Practitioner
  🎯 AWS Certified Solutions Architect Associate (In Progress)
  🛠️ HashiCorp Certified: Terraform Associate
  🐳 Docker & Kubernetes Hands-On Masterclass`,

    architecture: `<span class="highlight">=== DEVOPS WORKFLOW PIPELINE ===</span>
  [Developer Code Push]
          ↓
  [GitHub Actions CI: Linting & Unit Tests]
          ↓
  [Trivy Vulnerability & Security Scan]
          ↓
  [Docker Container Build & ECR Push]
          ↓
  [ArgoCD GitOps Kubernetes Sync]
          ↓
  [Prometheus & Grafana Observability Dashboard]`,

    contact: `Email: <span class="highlight">ahmad.muqri@example.com</span>
GitHub: <span class="highlight">https://github.com/ahmadmuqri</span>
LinkedIn: <span class="highlight">https://linkedin.com/in/ahmadmuqri</span>
Location: Remote / Malaysia`,
  };

  const appendToTerminal = (htmlContent) => {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    outputDiv.innerHTML = htmlContent;
    terminalBody.insertBefore(outputDiv, terminalInput.parentElement);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  const handleCommand = async (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    
    // Create executed line
    const historyLine = document.createElement('div');
    historyLine.className = 'prompt-line';
    historyLine.innerHTML = `<span class="prompt-user">ahmad@cloud-cluster</span>:<span class="prompt-path">~</span><span class="prompt-symbol">$</span> <span>${rawCmd}</span>`;
    terminalBody.insertBefore(historyLine, terminalInput.parentElement);

    if (cmd === '') return;

    if (cmd === 'clear') {
      const outputs = terminalBody.querySelectorAll('.command-output, .prompt-line');
      outputs.forEach(el => {
        if (el !== terminalInput.parentElement) el.remove();
      });
      return;
    }

    if (cmd === 'health') {
      appendToTerminal('<span class="warn">Fetching live backend node status from /api/v1/health...</span>');
      try {
        const res = await fetch('/api/v1/health');
        const data = await res.json();
        if (data.success) {
          const h = data.data;
          const output = `<span class="success">✔ Live API Health Status: ${h.status}</span>
  Uptime: ${Math.floor(h.uptime)}s
  Environment: ${h.environment}
  Memory Usage Heap: ${(h.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB
  Timestamp: ${h.timestamp}`;
          appendToTerminal(output);
        } else {
          appendToTerminal('<span class="warn">❌ Unable to retrieve health status</span>');
        }
      } catch (err) {
        appendToTerminal('<span class="warn">❌ Error connecting to live backend API</span>');
      }
      return;
    }

    if (commands[cmd]) {
      appendToTerminal(commands[cmd]);
    } else {
      appendToTerminal(`zsh: command not found: ${cmd}. Type <span class="highlight">help</span> for available commands.`);
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      terminalInput.value = '';
      handleCommand(cmd);
    }
  });

  // Pre-load welcome neofetch on launch
  setTimeout(() => {
    handleCommand('neofetch');
  }, 300);
});
