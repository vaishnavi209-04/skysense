````markdown
# 🌤️ SkySense – Full Stack Weather Web Application

**SkySense** is a modern, full-stack weather web application built with **React.js**, **Node.js**, and the **OpenWeather API**.  
It allows users to view real-time weather updates with an elegant UI, smooth transitions, and dynamic backgrounds that adapt to current weather conditions.

---

## 🚀 Live Demo
🎯 **Frontend (Vercel):** [https://skysense-weab.vercel.app](https://skysense-web.vercel.app)  
☁️ **Backend (Render):** [https://skysense-server.onrender.com](https://skysense-server.onrender.com)

---

## 🧠 Features

✅ Real-time weather updates using OpenWeather API  
🌈 Dynamic background images that match weather conditions  
📅 3-Day forecast display  
🌡️ Temperature unit toggle (°C ↔ °F)  
💨 Wind speed, humidity, and condition details  
📍 Search weather by city name  
🎨 Fully responsive design (mobile-friendly)  
⚡ Fast, lightweight, and deployed on modern platforms  

---

## 🏗️ Tech Stack

| Category | Technology Used |
|-----------|-----------------|
| **Frontend** | React.js, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js, CORS, dotenv |
| **API** | OpenWeather API, Unsplash API |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **Version Control** | Git & GitHub |

---

## ⚙️ Installation & Setup (For Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/vaishnavi209-04/skysense.git
cd skysense
````

### 2️⃣ Install dependencies

**For backend**

```bash
cd server
npm install
```

**For frontend**

```bash
cd ../client
npm install
```

---

### 3️⃣ Add environment variables

In the `/server` folder, create a file named `.env` and add:

```
OPENWEATHER_KEY=your_openweather_api_key
UNSPLASH_KEY=your_unsplash_api_key
PORT=5000
```

---

### 4️⃣ Run the application locally

**Start backend**

```bash
cd server
npm start
```

**Start frontend**

```bash
cd ../client
npm start
```

Your app will be live on
🌐 Frontend → `http://localhost:3000`
⚙️ Backend → `http://localhost:5000`

---

## 🌦️ API Endpoints

| Endpoint                 | Description                             | Example                  |
| ------------------------ | --------------------------------------- | ------------------------ |
| `/api/weather/:city`     | Get current weather of a city           | `/api/weather/London`    |
| `/api/forecast/:city`    | Get 3-day forecast of a city            | `/api/forecast/Delhi`    |
| `/api/background/:query` | Get a background image based on weather | `/api/background/cloudy` |

---

## 🧩 Folder Structure

```
SkySense/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   └── package.json
│
├── server/                # Express Backend
│   ├── index.js
│   └── package.json
│
├── .gitignore
├── package.json           # Root config for both
└── README.md
```

---

## 💫 Deployment

* **Frontend:** Deployed on [Vercel](https://vercel.com)
* **Backend:** Deployed on [Render](https://render.com)
* Environment variables securely configured on both platforms

---
📸 Screenshots
🏠 Landing Page

(Showcases SkySense logo, gradient background, and feature blocks)
<img width="1919" height="977" alt="image" src="https://github.com/user-attachments/assets/bb0af129-c0cd-44ca-82b7-c3de0e8b1d53" />


🌦️ Weather Page

(Displays temperature, condition, icons, and forecast)
<img width="1919" height="976" alt="image" src="https://github.com/user-attachments/assets/8003ef43-b4ad-444a-97f0-0ae3dfffb845" />


---

## 👩‍💻 Author

**Developed by [Vaishnavi Mishra](https://github.com/vaishnavi209-04)**
💙 Passionate about full-stack development, modern UI, and creative problem-solving.

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify with attribution.

---

### 🌈 *“Built with ❤️ and curiosity to explore the skies with code.”*

```

