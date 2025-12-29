# 🚀 NotionV2

## Overview

**NotionV2** is an enhanced and structured intelligent assistant designed to interact with **Notion** using natural language. It leverages a high-performance AI model via **Groq** to automate content creation, organization, and retrieval within Notion workspaces.

The goal of this project is to reduce manual interaction with Notion by enabling users to manage notes, tasks, and ideas through simple, human-readable instructions.

---

## Key Features

* Natural language interaction
* Automated creation and modification of Notion content
* Fast AI inference powered by Groq
* Clean and extensible project structure

---

## Prerequisites

Before running this project, make sure you have the following requirements configured.

### 1. Groq API Key (Required)

This project requires a valid **Groq API Key** to function.

Unlike traditional setups where the API key is defined as an environment variable, **NotionV2 prompts the user to enter the Groq API key directly through the web interface when accessing the application**.

* The API key is provided at runtime
* It is used to process AI requests via Groq
* The application will not function until a valid key is entered

⚠️ A Groq API key is mandatory. Without it, AI-related features will be unavailable.

---

### 2. Notion Integration Token

To allow the application to access your Notion workspace:

* Create a Notion integration
* Obtain the integration token
* Share the relevant workspace or database with the integration

Store the token securely as an environment variable.

---

## How It Works

1. The user provides an instruction in natural language
2. The request is processed by the AI model via Groq
3. The system determines the appropriate Notion action:

   * Create content
   * Update existing pages
   * Retrieve information
4. The action is executed using the Notion API
5. The result is reflected in the Notion workspace

This workflow is designed to minimize friction and maximize productivity.

---

## Technology Stack

* **Node.js**
* **JavaScript / TypeScript**
* **Notion API**
* **Groq API (LLMs)**

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the project in development mode:

```bash
npm run dev
```

Ensure all required environment variables are properly configured before starting the application.

---

## Notes

* API keys should never be committed to version control
* This project is intended for educational and productivity purposes

---

## Page

https://bagifo10.github.io/NotionV2/
