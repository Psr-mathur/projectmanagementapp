# Project Management App - API Documentation

## Overview

This project management application is built using the **T3 stack** (Next.js, tRPC, Prisma, NextAuth, TypeScript, Tailwind CSS, and Supabase). The app allows users to create, assign, and manage tasks with tags, along with user profile management.

### Features

- User authentication using **NextAuth** (email/password only).
- Task management: Create, update, delete, assign tasks.
- Tag management: Add and retrieve tags.
- User management: Fetch user details and update profiles.
- Team management: Add and retrieve members.

---

## API Endpoints

### Task Routes

#### `GET /api/trpc/task.getAllTasks`

Retrieve all tasks for the authenticated user (either created by or assigned to them).

##### Request Body:

```json
{
  "status": "TaskStatus",
  "priority": "TaskPriority",
  "tags": [{ "id": "tagId" }],
  "searchQuery": "string"
}
```

##### Response:

```json
[
  {
    "id": "taskId",
    "title": "Task Title",
    "description": "Task Description",
    "status": "TaskStatus",
    "priority": "TaskPriority",
    "dueDate": "DateTime",
    "tags": [{ "id": "tagId", "name": "Tag Name" }],
    "createdByUser": { "id": "userId", "name": "User Name" },
    "assignedToUser": { "id": "userId", "name": "User Name" }
  }
]
```

#### `POST /api/trpc/task.createTask`

Create a new task.

##### Request Body:

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "TaskPriority",
  "dueDate": "DateTime",
  "assignedToUserId": "userId",
  "status": "TaskStatus",
  "tags": [{ "id": "tagId" }]
}
```

##### Response:

```json
{
  "id": "taskId",
  "title": "Task Title"
}
```

#### `PUT /api/trpc/task.updateTask`

Update an existing task.

##### Request Body:

```json
{
  "id": "taskId",
  "title": "Updated Title",
  "description": "Updated Description",
  "priority": "Updated Priority",
  "dueDate": "Updated DateTime",
  "status": "Updated Status",
  "assignedToUserId": "New User Id",
  "tags": [{ "id": "tagId" }]
}
```

##### Response:

```json
{
  "id": "taskId",
  "title": "Updated Title"
}
```

#### `DELETE /api/trpc/task.deleteTask`

Delete a task.

##### Request Body:

```json
{
  "id": "taskId"
}
```

##### Response:

```json
{
  "success": true
}
```

---

### Tag Routes

#### `GET /api/trpc/tag.getAllTags`

Retrieve all available tags.

##### Response:

```json
[{ "id": "tagId", "name": "Tag Name" }]
```

#### `POST /api/trpc/tag.createTag`

Create a new tag.

##### Request Body:

```json
{
  "name": "New Tag Name"
}
```

##### Response:

```json
{
  "id": "tagId",
  "name": "New Tag Name"
}
```

---

### User Routes

#### `GET /api/trpc/user.getAllUsers`

Retrieve all users.

##### Response:

```json
[{ "id": "userId", "name": "User Name", "email": "user@example.com" }]
```

#### `GET /api/trpc/user.getUserById`

Retrieve user details by ID.

##### Request Body:

```json
{
  "id": "userId"
}
```

##### Response:

```json
{
  "id": "userId",
  "name": "User Name",
  "email": "user@example.com",
  "avatar": "avatarUrl"
}
```

#### `POST /api/trpc/user.createUser`

Create a new user.

##### Request Body:

```json
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "securepassword",
  "avatar": "avatarUrl"
}
```

##### Response:

```json
{
  "id": "userId",
  "name": "User Name"
}
```

#### `PUT /api/trpc/user.updateUser`

Update user details.

##### Request Body:

```json
{
  "id": "userId",
  "email": "updated@example.com",
  "name": "Updated Name",
  "avatar": "updatedAvatarUrl",
  "password": "newpassword"
}
```

##### Response:

```json
{
  "id": "userId",
  "name": "Updated Name"
}
```

---

## Authentication

Authentication is handled using **NextAuth.js** with email/password authentication.

### `POST /api/auth/signin`

Sign in a user.

##### Request Body:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

##### Response:

```json
{
  "user": {
    "id": "userId",
    "name": "User Name",
    "email": "user@example.com"
  },
  "token": "JWT_TOKEN"
}
```

### `POST /api/auth/signout`

Sign out a user.

##### Response:

```json
{
  "success": true
}
```

---

## Setup Instructions

### Prerequisites

- Node.js (>= 16.x)

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:Psr-mathur/projectmanagementapp.git
   cd projectmanagementapp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure `.env` file:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   AUTH_SECRET=your-secret-key
   ```
4. Run database migrations:
   ```sh
   npx prisma db push
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Future Enhancements

- Implement Role-Based Access Control (RBAC) for different user permissions.

- Integrate notifications for task assignments and due dates.

- UI Improvement : Loading States, Error Handling, etc.

- User Should add Profile Picture.

- Support file attachments for tasks.

---
