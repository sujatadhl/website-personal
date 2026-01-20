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
  {
    id: 4,
    slug: "serverless-rest-api-dynamodb-direct-integration",
    title: "Building a Serverless REST API: Direct Integration Between AWS API Gateway and DynamoDB",
    excerpt: "Learn how to build a serverless REST API without Lambda functions by directly integrating AWS API Gateway with DynamoDB for better performance and lower costs.",
    date: "Nov 15, 2025",
    readTime: "12 min read",
    category: "AWS",
    content: `I'll be honest with you - I used to be that developer who'd slap a Lambda function between everything. API Gateway talking to DynamoDB? Better add a Lambda! Need to format some data? Lambda time! But then I discovered something that completely changed how I think about serverless architecture.

You know that classic "Lambda Sandwich" pattern we all love (API Gateway → Lambda → DynamoDB)? Well, turns out you can actually skip the bread and go straight to the filling. For simple CRUD operations, AWS API Gateway can talk directly to DynamoDB, and trust me, your wallet and your latency metrics will thank you.

## Why I Stopped Using Lambda for Everything

Let me paint you a picture. You've probably built dozens of APIs that look like this: API Gateway receives a request, triggers a Lambda function that does some basic data transformation, then calls DynamoDB. Sound familiar?

Here's the thing - **AWS API Gateway** isn't just a fancy doorman. It's got this incredibly powerful feature called "AWS Service Integration" that lets it talk to over 100 AWS services directly. No middleman required!

In this walkthrough, I'm going to show you how to build what I call a "Movie Database" API. We'll create two endpoints:
1. A **POST** endpoint to add new movies to our database
2. A **GET** endpoint to fetch all our movies

And here's the kicker - we won't write a single line of Lambda code.

So why did I make the switch? Three big reasons that hit me like a truck:

- **Performance:** Remember **Lambda** cold starts? Yeah, those are gone. When **API Gateway** talks directly to **DynamoDB**, your response times are consistently fast.

- **Cost:** This one's a no-brainer. You're only paying for **API Gateway** requests and **DynamoDB** reads/writes. No **Lambda** execution time to worry about.

- **Simplicity:** Less moving parts = fewer things that can break. I can't tell you how many times I've had to debug **Lambda** functions that were basically just data pass-throughs.

## What You'll Need

Before we dive in, make sure you've got:

- An AWS account (obviously)
- Basic knowledge of REST APIs and JSON (nothing fancy)
- The ability to create IAM roles (we'll walk through this together)

Fair warning: if you're expecting to write code, you might be disappointed. This is all configuration, baby!

---

## Step 1: Setting Up Our Movie Database

Alright, let's start with the foundation. We need somewhere to store our movie data, and DynamoDB is perfect for this.

Head over to the **AWS Console**. I know, I know - navigating the **AWS console** can feel like trying to find your keys in a black hole, but bear with me. Go to **Services** and find **DynamoDB**.

Click on **Create table**. This is where the magic begins.

![Create Table](/image.png)

Now, here's where I see a lot of people overthink things. For our movie database, we're keeping it simple:

- **Table name:** \`movie-db\` 
- **Partition key:** \`movie-id\` 

![DynamoDB Table Configuration](/image1.png)

Leave everything else as default. Seriously, don't touch those other settings unless you know what you're doing. **AWS** has pretty good defaults, and we're not building the next Netflix here.

Hit **Create** and grab a coffee. **DynamoDB** is fast, but even it needs a moment.

![DynamoDB Table Created](/image3.png)

Boom! Your movie database is ready to roll.

---

## Step 2: The IAM Dance

Ah, **IAM** - every developer's favorite topic (that was sarcasm, in case you missed it). But seriously, this step is crucial because **API Gateway** needs to be able to chat with **DynamoDB** on your behalf.

![IAM Role Creation](/image4.png)

Navigate to **IAM** → **Roles** → **Create role**. Choose **AWS Service** and then **API Gateway**. 

Now, for the policy. In production, you'd want to follow the principle of least privilege, but for this tutorial, I'm going to suggest using **AmazonDynamoDBFullAccess**. Yes, it's overkill, but it works, and we're learning here.

Pro tip: Name your role something memorable like **APIGatewayDynamoDBRole**. Future you will thank present you when you're trying to figure out what this role does at 2 AM.

**Important:** Copy that **ARN**! You'll need it in the next step, and trust me, you don't want to go hunting for it later.

---

## Step 3: Creating Our API Gateway

Time for the fun part! Head over to the **API Gateway** service. If you've never used **API Gateway** before, prepare to be both amazed and slightly confused.

![API Gateway Console](/image5.png)

Click **Create API**, and here's where **AWS** tries to confuse you with options. Choose **REST API** and click **Build**. Not **HTTP API**, not **WebSocket API** - just good old **REST API**.

![REST API Selection](/image6.png)

Choose New API (unless you're feeling adventurous with examples, but we're not).

Give it a name - I went with **MovieServiceAPI** because I'm nothing if not consistent.

![API Gateway Setup](/image7.png)

Click **Create API** and congratulations! You now own a brand new API that does absolutely nothing. Yet.

---

## Step 4: Building the Endpoints

Here's where things get interesting. An API without endpoints is like a car without wheels - technically impressive engineering, but not very useful.

### Creating Our Resource

In API Gateway speak, a "resource" is basically a URL path. We want \`/movies\`, so let's make that happen.

Click **Actions** → **Create Resource**. Set the resource name to \`movies\` and watch as the resource path magically becomes \`/movies\`. **AWS** is helpful like that.

![Resource Creation](/image8.png)

![Resource Configuration](/image9.png)

### The POST Method (Adding Movies)

Now we need to tell our \`/movies\` resource what to do when someone sends it data. Select your shiny new resource and click **Actions** → **Create Method** → **POST**.

![POST Method Creation](/image10.png)

Here's where the real magic happens. Instead of pointing this to a **Lambda** function like every other tutorial on the internet, we're going to choose:

- **Integration type:** **AWS Service**
- **AWS Service:** **DynamoDB**  
- **HTTP method:** **POST**
- **Action:** **PutItem**
- **Execution role:** Paste that **ARN** you copied earlier

![POST Method Setup](/image11.png)

Click **Save** and smile - you just connected **API Gateway** directly to **DynamoDB** without writing a single line of code.

---

## Step 5: The Magic Mapping Templates

Okay, this is where things get a bit technical, but stick with me. **API Gateway** speaks **JSON**, but **DynamoDB** has its own special format. Think of mapping templates as translators.

Click on **Integration Request** → **Mapping Templates**.

![Mapping Templates Configuration](/image12.png)

Add **application/json** as your content type, and then paste this bad boy:

\`\`\`json
{
    "TableName": "movie-db",
    "Item": {
        "movie-id": { "S": "$input.path('$.movie-id')" },
        "name": { "S": "$input.path('$.name')" }
    }
}
\`\`\`

What's this doing? It's taking your nice, clean **JSON** and converting it to **DynamoDB's** format. That **"S"** stands for **String** type - **DynamoDB** is picky about data types.

### The GET Method (Fetching Movies)

Same drill for the **GET** method, but this time we use the **Scan** action instead of **PutItem**. The mapping template is much simpler:

![GET Method Mapping Template](/imageget.png)

\`\`\`json
{
    "TableName": "movie-db"
}
\`\`\`

That's it. We're telling **DynamoDB** to scan our entire table and return everything.

---

## Step 6: Testing Time

The moment of truth! Let's see if this thing actually works.

### Testing POST

Click that little lightning bolt **Test** button on your **POST** method. In the request body, throw in some test data:

![POST Method Testing](/image13.png)

\`\`\`json
{
    "movie-id": "001",
    "name": "Inception"
}
\`\`\`

Hit **Test** and cross your fingers.

![POST Test Response](/image15.png)

If you see a **200** response, do a little victory dance! But don't take my word for it - hop over to **DynamoDB** and check if your movie actually made it there.

![DynamoDB Verification](/image16.png)

Beautiful, isn't it?

### Testing GET

Now for the **GET** method - this one's even easier. No request body needed, just click **Test**.

![GET Method Testing](/image17.png)

If everything worked, you should see your movie data coming back. Magic!

---

## Wrapping Up

And there you have it - a fully functional **REST API** that talks directly to **DynamoDB**, no **Lambda** in sight!

This approach isn't going to replace **Lambda** for everything (I still love my serverless functions), but for simple **CRUD** operations? It's a game-changer. You get better performance, lower costs, and fewer moving parts to worry about.

**What's Next?**

If you're feeling ambitious, try adding:
- A **GetItem** action to fetch individual movies by ID
- Some authentication with **API Keys** or **Cognito**
- Deploy this thing to a real stage so you can show it off

The beauty of this pattern is its simplicity. Sometimes the best solution is the one that does less, not more.

Happy building! 🚀`,
  },
]
