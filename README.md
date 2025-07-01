# 🌍 Visalta – One Platform, Many Student Solutions

**Visalta** is a student-centric platform built using the **MERN stack**, designed to solve real campus-life problems. From exchanging items to discovering budget-friendly restaurants, worship places, and getting updates — Visalta connects the student community with powerful tools, feedback features, and a dynamic admin panel.

> 👨‍💻 Lead Developer: Darsh Kumar  
> 👨‍🎨 UI & Frontend: Designed by teammate  
> 🧠 Built during: Dec 2024 – Feb 2025  
> 🌐 Live: [www.visalta.in](http://www.visalta.in)

---

## 🚀 Key Features

### 🎒 For Students:
- **Item Exchange System**  
  Upload product images, connect instantly via **WhatsApp icon**
  
- **Restaurant Recommender**  
  Suggests restaurants based on **taste and budget**

- **Worship Locator**  
  Explore spiritual/worship places near campus

- **Feedback, Suggestions, Contact Us**  
  Let students voice their ideas or issues

- **Live Student User Base**  
  📈 Over **300+ students** from NIT Warangal logged in

---

### 🛠️ For Admin:
- **Admin Panel with User Data View**
- **Frontend Edit Tools**  
  Makes UI and content updates easier — no code change needed

---

## 🎨 UI & UX

- Built using **React Bits** & inspiration from **Shreyians Coding School**
- Smooth animations and transitions
- Clean responsive design

---

## 🧰 Tech Stack

| Layer        | Tech Used                        |
|--------------|----------------------------------|
| Frontend     | React.js, Tailwind CSS, React Bits |
| State Mgmt   | Redux Toolkit (if used)          |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB + Mongoose               |
| Other Tools  | WhatsApp API link, Cloudinary    |
| Hosting      | Frontend: Vercel / Backend: Render / DB: MongoDB Atlas |

---

## 🔧 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/visalta.git
cd visalta

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install

# Add environment variables (.env)
MONGO_URI=
JWT_SECRET=
CLOUDINARY_API_KEY=
...

# Start the project
npm run dev    # for backend
npm start      # for frontend
