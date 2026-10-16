# 👤 User Profile Card Generator

A simple and interactive web application that generates dynamic user profile cards based on user input. Users can enter their profile details, preview their generated card, and receive a unique Profile ID.

## 🚀 Features

- 📝 Enter user profile information through a form.
- 👤 Generate a dynamic HTML profile card.
- 🖼️ Display an avatar preview.
- 🆔 Generate and display a Profile ID.
- ✅ Show a success message after profile creation.
- 💾 Save profile information in a JSON file.
- 🔍 Retrieve saved profiles through a backend API.
- 🛡️ Validate user input and safely display profile information.
- 📱 Simple and responsive user interface.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- JSON for data storage

## 📂 Project Structure

```text
User_Profile_Card_Generator/
├── index.html
├── style.css
├── server.js
├── profiles.json
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install Node.js and npm on your computer.

### Step 1: Clone the repository

```bash
git clone https://github.com/surajchowdary2005/User_Profile_Card_Generator.git
```

### Step 2: Open the project folder

```bash
cd User_Profile_Card_Generator
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the application

```bash
npm start
```

If the project does not have a `start` script in `package.json`, use:

```bash
node server.js
```

### Step 5: Open in your browser

Visit:

```text
http://localhost:3000
```

## 🔌 API Endpoint

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profiles` | Retrieve saved user profiles |

The application also processes profile submissions through its backend. Check `server.js` for the exact submission endpoint.

## 💡 How It Works

1. Enter the required user details in the form.
2. Submit the profile information.
3. The application processes the information using the backend.
4. A dynamic profile card and avatar preview are displayed.
5. A unique Profile ID and success message are shown.
6. Profile data is saved in `profiles.json`.

## 🎯 Project Objective

The main objective of this project is to demonstrate form handling, dynamic HTML generation, frontend and backend communication, input validation, and JSON-based data storage.

## 🌐 Project Links

- **GitHub Repository:** [User Profile Card Generator](https://github.com/surajchowdary2005/User_Profile_Card_Generator)
- **Live Demo:** Add your deployed application URL here after deployment.

## 👨‍💻 Author

**Suraj Chowdary**

GitHub: [surajchowdary2005](https://github.com/surajchowdary2005)

---

Built with ❤️ using HTML, CSS, JavaScript, Node.js, and Express.js.