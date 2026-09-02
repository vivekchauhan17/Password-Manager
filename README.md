# PassOP – Your Own Password Manager 🔐

PassOP is a simple password manager built with the **MERN stack**. I created this project to make it easier to save and manage website login details from one place.

With PassOP, you can save a website URL, username, and password, and later view, edit, copy, or delete those credentials whenever you need them.

## 🚀 Features

* **Save Passwords** – Store website URLs, usernames, and passwords.
* **Add, Edit & Delete** – Manage your saved credentials using basic CRUD operations.
* **Copy to Clipboard** – Quickly copy the URL, username, or password with a single click.
* **Password Masking** – Saved passwords are hidden by default.
* **Show/Hide Password** – Toggle password visibility while entering a password.
* **Toast Notifications** – Get a notification when a password is added, updated, copied, or deleted.
* **Responsive Design** – The application works on both desktop and mobile screens.
* **Animated Icons** – Uses Lord Icons to make the interface a little more interactive.

## 🛠️ Technologies Used

### Frontend

* **React.js** – Used to build the user interface.
* **Vite** – Used for setting up and running the React frontend.
* **Tailwind CSS** – Used for styling and responsive design.
* **React Toastify** – Used for displaying toast notifications.
* **UUID** – Used to generate unique IDs for saved credentials.
* **Lord Icons** – Used for animated icons.

### Backend

* **Node.js** – Runtime environment for the backend.
* **Express.js** – Used to create the backend server and API routes.
* **MongoDB** – Used to store the saved credentials.
* **CORS** – Allows the frontend and backend to communicate with each other.
* **Dotenv** – Used to keep environment variables such as the MongoDB connection string separate from the code.

## ⚙️ How to Run the Project

### Prerequisites

Before running PassOP, make sure you have:

* [Node.js](https://nodejs.org/) installed
* [MongoDB](https://www.mongodb.com/try/download/community) installed and running

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/passop.git
cd passop
```

### 2. Set Up the Backend

Go to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/
PORT=3000
```

Then start the backend server:

```bash
node server.js
```

If you have `nodemon` installed, you can also use:

```bash
nodemon server.js
```

The backend will run on:

```text
http://localhost:3000
```

### 3. Set Up the Frontend

Open another terminal and go back to the frontend/root directory:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## ⚠️ Important Note

This project was mainly made for **learning and educational purposes**.

At the moment, passwords are stored as plain text, so this project should **not be used to store real or sensitive passwords** in a production environment.

For a production-ready password manager, additional security features would be needed, such as:

* User authentication
* JWT/session-based authorization
* Password encryption or secure hashing where appropriate
* HTTPS
* Proper access control
* Secure handling of environment variables and database credentials

## 🤝 Contributing

If you have any suggestions, find a bug, or want to improve something, feel free to contribute to the project.

You can open an issue or submit a pull request with your changes.

## 👨‍💻 Author

**Vivek Kumar**

Thanks for checking out PassOP!
This project was built as a practical way to learn and work with the MERN stack.
