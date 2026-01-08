export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "getting-started-with-docker",
    title: "Getting Started with Docker",
    excerpt: "A comprehensive guide to containerization with Docker. Learn how to build, run, and manage containers.",
    date: "Mar 15, 2025",
    readTime: "8 min read",
    category: "Containerization",
    content: `Docker is a containerization platform that has revolutionized how we deploy applications. 

## What is Docker?

Docker allows you to package your entire application including dependencies into a container that runs consistently across any environment.

## Key Concepts

- **Images**: Lightweight, standalone, executable packages containing everything needed to run an application
- **Containers**: Runtime instances of Docker images
- **Registries**: Repositories where you store and share Docker images

## Getting Started

To get started with Docker:

1. Install Docker from docker.com
2. Create a Dockerfile in your project
3. Build your image: \`docker build -t myapp:1.0 .\`
4. Run your container: \`docker run -p 8080:8080 myapp:1.0\`

## Best Practices

- Use specific base image versions
- Minimize layers in your Dockerfile
- Use .dockerignore files
- Don't run as root in containers
- Use health checks

Docker is essential for modern application development and deployment.`,
  },
  {
    id: 2,
    slug: "kubernetes-for-devops",
    title: "Kubernetes for DevOps",
    excerpt:
      "Explore Kubernetes concepts including deployments, services, and ingress for orchestrating containerized applications.",
    date: "Mar 10, 2025",
    readTime: "12 min read",
    category: "Orchestration",
    content: `Kubernetes has become the standard for container orchestration in modern enterprises.

## Why Kubernetes?

Kubernetes automates many of the manual processes involved in deploying, managing, and scaling containerized applications.

## Core Components

- **Pods**: Smallest deployable units in Kubernetes
- **Deployments**: Manage replica sets of pods
- **Services**: Expose pods to network traffic
- **Ingress**: Manage external access to services

## Deployment Example

Creating a simple Kubernetes deployment is straightforward with proper configuration.

## Production Considerations

When moving to production with Kubernetes, consider:
- Resource requests and limits
- Health checks
- Network policies
- RBAC configuration
- Persistent storage

Kubernetes might seem complex initially, but it's worth the learning curve.`,
  },
  {
    id: 3,
    slug: "terraform-infrastructure-as-code",
    title: "Terraform Infrastructure as Code",
    excerpt:
      "Learn how to manage your AWS infrastructure using Terraform for reproducible and version-controlled deployments.",
    date: "Mar 1, 2025",
    readTime: "10 min read",
    category: "Infrastructure",
    content: `Infrastructure as Code (IaC) is a best practice for managing cloud resources.

## What is Terraform?

Terraform is an open-source IaC tool that allows you to define infrastructure using declarative configuration files.

## Benefits of IaC

- Version control for infrastructure
- Reproducible deployments
- Infrastructure documentation
- Team collaboration
- Disaster recovery

## Basic Terraform Workflow

1. Write configuration files (.tf files)
2. Initialize Terraform: \`terraform init\`
3. Plan changes: \`terraform plan\`
4. Apply changes: \`terraform apply\`

## Example

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "web-server"
  }
}
\`\`\`

Terraform makes infrastructure management predictable and scalable.`,
  },
  {
    id: 4,
    slug: "automating-nodejs-deployment-with-ansible",
    title: "Automating Node.js Deployment with Nginx and Ansible Roles on AWS",
    excerpt:
      "Learn how to automate Node.js application deployment on AWS EC2 using Ansible Roles, Nginx reverse proxy, and AWS Dynamic Inventory.",
    date: "Mar 25, 2025",
    readTime: "15 min read",
    category: "Automation",
    content: `In the world of DevOps, consistency is king. Manually configuring servers, installing dependencies, and setting up reverse proxies is not only tedious but prone to human error. This is where Ansible shines.

In this guide, we will walk through how to deploy a Node.js application behind an Nginx reverse proxy on an AWS EC2 instance. We will utilize Ansible Roles to keep our code modular and AWS Dynamic Inventory to automatically target our instances.

## What are Ansible Roles?

Before diving into the code, let's understand the structure we are using. In Ansible, Roles are a way to organize and package related tasks, handlers, variables, and files into a reusable unit. They provide a structured approach for creating modular and shareable content.

A typical role contains:
- **Tasks**: A set of actions to be executed on the target hosts.
- **Handlers**: Actions triggered by specific events (e.g., restarting a service after a config change).
- **Templates**: Jinja2 templates used to dynamically generate configuration files.

## Step 1: Project Setup and Inventory Configuration

First, we need to organize our directory structure. We will create two roles: nginx and nodejs.

### The Playbook

Create a file named \`playbook.yml\`. This file acts as the entry point that maps your hosts to the roles they should execute.

\`\`\`yaml
---
- hosts: nginx
  become: true
  gather_facts: true
  roles: 
    - nginx
    - nodejs
  vars:
    ansible_connection: aws_ssm
    ansible_aws_ssm_region: us-east-1
    ansible_aws_ssm_bucket_name: sujata-static-website-one
\`\`\`

Note: We are using aws_ssm for the connection, which requires the AWS SSM agent to be installed and proper IAM roles attached to your EC2 instance.

### Dynamic Inventory

Instead of manually typing IP addresses, we will use the AWS EC2 plugin to find our instances based on tags. Create a file named \`aws_ec2.yml\`.

\`\`\`yaml
plugin: aws_ec2
regions:
  - us-east-1
hostnames: 
  - instance-id
groups:
  nginx: "'ansible-nginx-server-suj' in tags.Name"
filters:
   tag:Name: ansible-nginx-server-suj
   tag:owner: sujata.dahal
\`\`\`

This configuration tells Ansible to look for instances in us-east-1 with the specific tag Name: ansible-nginx-server-suj.

## Step 2: Configuring the Nginx Role

We need Nginx to act as a reverse proxy, forwarding traffic from port 80 to our Node.js application running on port 3000.

### Nginx Tasks

Create \`roles/nginx/tasks/main.yml\`:

\`\`\`yaml
# Installing nginx in EC2 instance
- name: Install nginx
  ansible.builtin.apt:
    name: nginx
    state: latest

# Changing configuration nginx file 
- name: Copy configuration file 
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/default
\`\`\`

### Nginx Template

Create the template file \`roles/nginx/templates/nginx.conf.j2\`. This configuration listens on port 80 and proxies requests to localhost:3000.

\`\`\`nginx
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
    }
}
\`\`\`

## Step 3: Configuring the Node.js Role

Next, we define the tasks to install Node.js, pull our application code, and start it.

### Node.js Tasks

Create \`roles/nodejs/tasks/main.yml\`:

\`\`\`yaml
- name: Install nodejs and npm
  ansible.builtin.apt:
    name: 
      - nodejs
      - npm
    state: latest

- name: Install PM2 (Process Manager for Node.js)
  npm:
    name: pm2   

- name: Clone Node.js application repository
  git:
    repo: 'https://github.com/digitalocean/sample-nodejs.git'
    dest: /home/ubuntu/app

- name: Install dependencies
  npm: 
    path: /home/ubuntu/app/

- name: Start the Node.js application with pm2
  command: pm2 start -f app.js
  args:
    chdir: /home/ubuntu/app/
  notify: Restart nginx
\`\`\`

### Handlers

We noticed a \`notify: Restart nginx\` in the task above. We need to define this handler so Nginx restarts whenever the application state changes.

Create \`roles/nodejs/handlers/main.yml\`:

\`\`\`yaml
- name: Restart nginx
  service:
    name: nginx
    state: restarted
\`\`\`

## Step 4: Execution

With our playbook, inventory, and roles set up, we are ready to deploy. Open your terminal and run the following command:

\`\`\`bash
ansible-playbook -i aws_ec2.yml playbook.yml
\`\`\`

Ansible will connect to your EC2 instance via AWS Systems Manager (SSM), install the necessary packages, configure Nginx, and launch your Node.js application.

## Verification

Once the playbook finishes successfully, copy the Public IP or Public DNS of your EC2 instance and paste it into your browser:

\`http://<public_hostname_of_EC2_Instance>\`

You should see your Node.js application running successfully behind Nginx!

## Conclusion

By using Ansible Roles, we have created a modular deployment strategy. If we need to change how Nginx is configured, we only touch the nginx role. If the application logic changes, we update the nodejs role. This approach scales much better than writing a single massive playbook file.

Happy Automating!`,
  },
]
