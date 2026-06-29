# DSA Quest - Setup Guide

## Prerequisites

Install:

* Node.js
* MySQL
* MySQL Workbench
* Git
* VS Code

---

## Step 1

Clone the repository

```bash
git clone <repository-url>

cd DSA-Quest
```

---

## Step 2

Setup Backend

```bash
cd server

npm install
```

Create a `.env` file inside `server/`

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dsa_quest
```

---

## Step 3

Setup Frontend

```bash
cd ../client

npm install
```

---

## Step 4

Create Database

Open MySQL Workbench

Run

```sql
CREATE DATABASE dsa_quest;
```

Select

```sql
USE dsa_quest;
```

Run

```
database/01_schema.sql
```

Then

```
database/02_seed.sql
```

---

## Step 5

Start Backend

```bash
cd server

npm run dev
```

---

## Step 6

Start Frontend

```bash
cd client

npm run dev
```

---

## Step 7

Open

```
http://localhost:5173
```

The project should now be running successfully.
