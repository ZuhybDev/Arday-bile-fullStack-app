<h1 align="center">

# Arday Bile FullStack App
</h1>


<p align="center">
  <img src="/frontend//src//assets//images//desktopViewImage.png" width="600" alt="Dashboard Screenshot" />
</p>

Arday Bile is a modern, full-stack web application designed for schools to efficiently manage student information, examination results, and grading workflows. Built with a robust Next.js frontend and a scalable Node.js/TypeScript backend, Arday Bile delivers a seamless and interactive user experience for administrators, teachers, and students.

---

## 🚀 Features

- **Student Management**: Register, update, and manage student profiles.
- **Result Management**: Create, update, and delete examination results for students.
- **Smart Grading**: Automatic calculation of grades and average marks, including letter grade status.
- **Role-Based Access**: Secure authentication and authorization for different user roles (admin, student).
- **Modern UI/UX**: Responsive, mobile-friendly dashboards with animated navigation and theme toggling.
- **School Management**: Multi-school support with isolated data per institution.
- **Secure Login**: JWT-based authentication with short-lived tokens for enhanced security.
- **Intuitive Onboarding**: Easy sign-up and login flows for both admins and students.

---

## 🖥️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Zod, Lucide Icons
- **Backend**: Node.js, TypeScript, NestJS, Prisma ORM, JWT Auth
- **Database**: PostgreSQL
- **Other**: Vercel (deploy), API integration, Toast notifications

---

## 📸 Screenshots  mobile view

<p align="center">
  <img src="/frontend//src//assets//images//mobileVewImage.png" width="300" alt="Mobile View" />
</p>

---

## 🧑‍💻 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ZuhybDev/Arday-bile-fullStack-app.git
cd Arday-bile-fullStack-app
```

### 2. Install dependencies

```bash
# For backend
cd server
pnpm install

# For frontend
cd frontend
pnpm install
```

### 3. Configure environment

Set up `.env` files in both `server` and `frontend` directories with your database and API keys.

```bash
#frontend --
NEXT_PUBLIC_NESTJS_API='http://localhost:8000' #nestjs development url
#server --

JWT_SECRET_KEY="YOUR-SECRET"
PORT=8000 #development port
DATABASE_URL='YOUR-SQL-URL'
JWT_EXPIRY_IN='1hr' # 1d,
NEXTJS_PUBLIC_API="http://localhost:3000" #nextjs development url
```

### 4. Run the app

```bash
# Start frontend
cd ../frontend
pnpm run dev


# Start backend
cd server
pnpm run start:dev


#prisma
```

---

## 🛠️ Core Modules

- **Dashboard**: Manage students, subjects, and results from a clean, animated interface.
- **Authentication**: Secure login/signup for admins and students.
- **Results**: Add, update, and view exam results with automatic grade calculation.
- **Responsive design**: Smooth navigation optimized for both desktop and mobile screens.

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue to discuss your ideas or report bugs.

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Credits

Developed and maintained by [ZuhybDev](https://github.com/ZuhybDev).

---

> _Empowering schools with smart, beautiful, and efficient result management._
