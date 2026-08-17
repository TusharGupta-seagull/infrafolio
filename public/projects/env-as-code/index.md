# Environment-as-Code: Scalable AWS Infrastructure

Infrastructure automation and provisioning.

## Overview

Built production-style AWS infrastructure using reusable Terraform modules for VPC, ALB, Auto Scaling Groups, RDS, S3, Route 53, security groups, and supporting networking components across environments.

## Implementation Details

### Automated Provisioning
Automated EC2 provisioning and configuration with Ansible using dynamic inventories generated from Terraform outputs. This reduced manual setup and kept server configuration consistent with the deployed infrastructure.

### Secure CI/CD
Designed a secure Jenkins-based CI/CD setup:
- **Private Hosting**: Jenkins hosted in private subnets.
- **Controlled Egress**: Outbound access controlled through NAT gateways.
- **Bastion Administration**: Bastion-based administration for managing production infrastructure securely without exposing core systems to the public internet.

> Note: You can embed images in this folder and reference them here, like `![Network Topology](./topology.png)`.
