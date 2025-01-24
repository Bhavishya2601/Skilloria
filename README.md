# Skilloria

<p align="center">
  <img src="https://socialify.git.ci/Bhavishya2601/Skilloria/image?font=Raleway&language=1&name=1&owner=1&pattern=Floating+Cogs&stargazers=1&theme=Dark" alt="Skilloria" />
</p>

Skilloria is a full-featured e-learning platform built with the MERN (MongoDB, Express, React, Node.js) stack and TypeScript. It enables users to learn from a wide range of courses as well as contribute by creating and uploading their own courses. The platform focuses on flexibility, scalability, and ease of use, making it ideal for both learners and educators.

## Features

### For Learners
- Watch video lessons and access course materials.
- Interactive user interface for an optimized learning experience.

### For Educators
- Upload new courses with rich metadata (title, description, category, etc.).
- Add multiple lessons, including video content and resources.

### General Features
- Secure user authentication and authorization.
- Responsive design for seamless usage across devices.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **TypeScript**: Ensures type safety and better developer experience.
- **React Router**: For navigation and routing.
- **Axios**: For API communication.
- **Tailwind CSS**: For styling the application.

### Backend
- **Node.js**: Runtime environment for server-side logic.
- **Express**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and course data.

### Additional Tools
- **JWT**: For secure user authentication.
- **Cloudinary**: For handling image and video uploads.

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB installed and running.
- Cloudinary account for handling media uploads (optional).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bhavishya2601/skilloria.git
   cd skilloria
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following:
     ```env
     PORT=
     FRONTEND_URL=
     MONGODB_URI=
     SESSION_SECRET=
     EMAIL=
     EMAIL_PASSWORD=
     SALT_ROUNDS=
     JWT_SECRET=
     GOOGLE_CLIENT_ID=
     GOOGLE_CLIENT_SECRET=
     GOOGLE_REDIRECT_URL=
     ```

4. Start the development servers:
   ```bash
   # In one terminal, start the backend:
   cd backend
   npm run dev

   # In another terminal, start the frontend:
   cd frontend
   npm run start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```plaintext
skilloria/
├── frontend/      # React application
├── backend/       # Express server and API logic
├── README.md
└── LICENSE
```

## Contribution

We welcome contributions to Skilloria! If you have an idea or want to fix a bug, feel free to:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request with detailed information about your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to reach out:
- **Email**: bhavishya2601garg@gmail.com
- **GitHub**: [bhavishya2601](https://github.com/bhavishya2601)

