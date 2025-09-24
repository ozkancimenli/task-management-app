# Task Management App (React + TypeScript + Auth0)

A task management application built with **React**, **TypeScript**, **Auth0 authentication**, and **React-Bootstrap**.  
Users can create, edit, delete, and view tasks in a secure, authenticated environment.

---

## 🚀 Features
- 🔑 **Authentication & Authorization**: Auth0 integration for secure login/logout  
- 📝 **Task CRUD**: Create, read, update, and delete tasks  
- 🖥 **Dashboard**: Task overview page with list and quick actions  
- 📄 **Details View**: Full task details with edit option  
- 🛠 **Edit Page**: Modify existing tasks  
- 🆕 **Create Page**: Add new tasks with validation  
- 🎨 **Responsive UI**: React-Bootstrap styling  
- 💾 **Local Storage Persistence**: Tasks are saved locally for demo purposes  
- ✅ **TypeScript Integration**: Strong typing for safety and maintainability  
- 🌍 **React Router**: Multi-page navigation  

---

## 📂 Project Structure
src/
components/ # NavBar, TaskForm, TaskList, etc.
context/ # Global state management (TaskContext)
hooks/ # Custom hooks
pages/ # Dashboard, TaskDetails, Create, Edit, Login, NotFound
types/ # TypeScript interfaces and types
App.tsx # App routes
main.tsx # App entry point

yaml
Copy code

---

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/task-management-app.git
   cd task-management-app
Install dependencies

bash
Copy code
npm install
Set up environment variables
Create a .env file in the project root:

env
Copy code
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
Run the app

bash
Copy code
npm run dev
🔒 Auth0 Setup
Go to Auth0 Dashboard

Create a new Single Page Application (SPA)

Add the following URLs to Allowed Callback URLs, Logout URLs, and CORS Origins:

arduino
Copy code
http://localhost:5173
Copy Domain and Client ID into .env

📸 Screenshots (optional)
Add screenshots of your app here (Dashboard, Task Form, etc.)

🏗 Tech Stack
React + Vite

TypeScript

Auth0 for authentication

React Router for routing

React-Bootstrap for UI

📜 License
This project is licensed under the MIT License.
