# Lightweight Container Runtime Built with Bash

Low-level systems engineering exploration into Linux container internals.

## Core Implementation

Built a lightweight container runtime entirely in Bash utilizing core Linux kernel features:
- `chroot` for basic filesystem jailing.
- Linux namespaces for isolation.
- Btrfs filesystem snapshots for rapid container provisioning.

## Isolation Mechanisms

Implemented comprehensive isolation mechanisms:
1. **Process Isolation**: Using PID namespaces to prevent containers from seeing host processes.
2. **Network Isolation**: Setting up virtual Ethernet pairs (veth) and network namespaces.
3. **Hostname Isolation**: Using UTS namespaces.
4. **Filesystem Isolation**: Using Mount namespaces and Btrfs.

## Lifecycle Management

Added container image pulling capabilities (simulating a registry fetch), process execution management, and basic CPU/memory resource controls using cgroups.

This project provided a deep dive into container internals across filesystem isolation, networking, namespaces, and runtime lifecycle management, uncovering how tools like Docker actually work under the hood.

> Note: You can embed images in this folder and reference them here, like `![Namespace Diagram](./namespaces.png)`.
