# VaultPay: Distributed Backend System

VaultPay is a secure financial processing backend designed for scale and high availability.

## The Problem

Traditional payment backends face severe scaling bottlenecks and security vulnerabilities when processing high-throughput transactions under burst loads. This often leads to failed transactions, unacceptable latency, and potential data inconsistency during peak shopping events.

## Architecture

To solve these challenges, VaultPay employs a microservices architecture deployed on a managed Kubernetes cluster.

### Key Components

- **Kubernetes (EKS)**: Orchestrates the microservices, providing automatic scaling and self-healing capabilities.
- **PostgreSQL Cluster**: A highly available relational database setup ensures ACID-compliant transactions. We utilized active-passive replication for failover.
- **Redis Caching Layer**: Acts as a high-speed, in-memory data store to cache frequently accessed user profiles and session data, significantly reducing database load.

## Engineering Highlights

Engineered robust CI/CD pipelines using Jenkins and Terraform to provision infrastructure as code. This approach:
- Reduced manual deployment errors to zero.
- Ensured 100% environment consistency across staging and production.
- Enabled rapid rollback capabilities in case of deployment failures.

> Note: You can embed images in this folder and reference them here, like `![Architecture Diagram](./architecture.png)`.
