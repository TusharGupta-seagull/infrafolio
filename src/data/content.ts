export const metrics = [
  {
    id: 1,
    value: '100K+',
    label: 'Users On System',
    description: 'Maintained high availability for large-scale application workloads.',
  },
  {
    id: 2,
    value: '$10K/mo',
    label: 'AWS Cost Savings',
    description: 'Optimized cloud infrastructure and resource allocation.',
  }
];

export const experience = [
  {
    id: 1,
    role: 'Associate System Engineer',
    company: 'IBM',
    period: 'Present',
    description: 'Automated enterprise release workflows and built CI/CD pipelines with integrated test automation to accelerate delivery at scale.',
    technologies: ['CI/CD', 'Selenium', 'Cucumber', 'Release Management']
  },
  {
    id: 2,
    role: 'DevOps Engineer Intern',
    company: 'NowNow Digital Systems Limited',
    period: 'Past',
    description: 'Administered core AWS infrastructure serving 100K+ users, optimized cloud spend by $10K/month, and automated CI/CD pipelines enabling 20+ weekly production releases.',
    technologies: ['AWS', 'EC2', 'RDS', 'VPC', 'Jenkins', 'Spring Boot', 'AWS CLI', 'Cost Optimization', 'Microsoft 365']
  },
  {
    id: 3,
    role: 'DevOps Intern',
    company: 'THE OPSWORK',
    period: 'Past',
    description: 'Provisioned Kubernetes infrastructure via Terraform and engineered a centralized observability stack utilizing Prometheus, Thanos, and Grafana for distributed clusters.',
    technologies: ['Kubernetes', 'Terraform', 'Prometheus', 'Thanos', 'Grafana', 'Loki', 'Tempo']
  }
];

export const certifications = [
  {
    id: 1,
    name: 'AWS Certified CloudOps Engineer – Associate',
    issuer: 'Amazon Web Services',
    url: 'https://www.credly.com/badges/5f1e9fb5-b915-43ad-93c4-003629bb543d/public_url',
    image: '/images/cloudops.png'
  },
  {
    id: 2,
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    url: 'https://www.credly.com/badges/c2df4fb9-8c4a-43b8-8750-1a587389489f/public_url',
    image: '/images/solutions-architect.png'
  },
  {
    id: 3,
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    url: 'https://www.credly.com/badges/4424a681-7efb-44d4-8f98-3978a6fd8aa0/public_url',
    image: '/images/terraform.png'
  },
  {
    id: 4,
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    url: 'https://www.credly.com/badges/af87ad7e-e0b9-491d-b8e4-b8f3125def88/public_url',
    image: '/images/cloud-practitioner.png'
  }
];

export const skills = [
  { category: 'Cloud Providers', items: ['AWS'] },
  { category: 'Containers & Orchestration', items: ['Docker', 'Kubernetes', 'EKS'] },
  { category: 'Infrastructure as Code', items: ['Terraform'] },
  { category: 'CI/CD', items: ['Jenkins'] },
  { category: 'Observability', items: ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'Thanos'] },
  { category: 'OS & Scripting', items: ['Linux', 'Bash'] },
  { category: 'Development', items: ['Java', 'Spring Boot'] }
];

export const projects = [
  {
    id: 1,
    slug: 'vaultpay',
    title: 'VaultPay',
    description: 'Distributed backend system',
    longDescription: 'A secure financial processing backend designed for scale and high availability.',
    problem: 'Traditional payment backends face severe scaling bottlenecks and security vulnerabilities when processing high-throughput transactions under burst loads.',
    architecture: 'Microservices architecture deployed on a managed Kubernetes cluster, utilizing a highly available PostgreSQL cluster for ACID-compliant transactions, and Redis for a high-speed caching layer.',
    engineering: 'Engineered robust CI/CD pipelines using Jenkins and Terraform to provision infrastructure as code. This approach reduced manual deployment errors to zero and ensured 100% environment consistency across staging and production.',
    technologies: ['AWS', 'Terraform', 'Docker']
  },
  {
    id: 2,
    slug: 'env-as-code',
    title: 'Environment-as-Code: Scalable AWS Infrastructure',
    description: 'Infrastructure automation and provisioning',
    longDescription: '– Built production-style AWS infrastructure using reusable Terraform modules for VPC, ALB, Auto Scaling Groups, RDS, S3, Route 53, security groups, and supporting networking components across environments\n– Automated EC2 provisioning and configuration with Ansible using dynamic inventories generated from Terraform outputs, reducing manual setup and keeping server configuration consistent with the deployed infrastructure\n– Designed a secure Jenkins-based CI/CD setup with Jenkins hosted in private subnets, controlled outbound access through NAT gateways, and bastion-based administration for managing production infrastructure',
    technologies: ['Terraform', 'Ansible', 'Jenkins', 'AWS', 'Bash', 'Java']
  },
  {
    id: 3,
    slug: 'container-runtime',
    title: 'Lightweight Container Runtime Built with Bash',
    description: 'Low-level systems engineering',
    longDescription: '– Built a lightweight container runtime in Bash utilizing chroot, Linux namespaces and Btrfs filesystem snapshots\n– Implemented process, network, hostname and filesystem isolation using namespaces and virtual Ethernet pairs\n– Added container image pulling, process execution management and basic CPU and memory resource controls\n– Explored container internals across filesystem isolation, networking, namespaces and runtime lifecycle management',
    technologies: ['Bash', 'Linux', 'Vagrant']
  }
];

export const links = {
  github: 'https://github.com/TusharGupta-seagull',
  linkedin: 'https://www.linkedin.com/in/tushargupta-s/'
};
