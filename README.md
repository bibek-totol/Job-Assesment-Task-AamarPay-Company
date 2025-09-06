# Live Link: https://job-assesment-task-aamar-pay-compan.vercel.app/
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🎉 Event Management System

A **mini Event Management System** built with **Next.js** as part of a frontend developer task.  
This project demonstrates skills in **project setup, routing, forms, state management, data fetching, and UI/UX**.

---

## 📌 Objective

The goal of this project is to build a system where users can:

- 📅 View upcoming events  
- ➕ Create a new event  
- 🔍 Filter & search events  
- 📖 View details of a single event  
- 👤 Manage personal events (My Events)  

---

## 🗂️ Task Modules

### **Module 1: Project Setup & Layout**
- Create a Next.js app with a simple layout (`Header + Main content`).
- Header navigation: **Home | Create Event | My Events**.

✅ *Evaluates: project setup, layout structure, navigation*  

---

### **Module 2: Event List (Home Page)**
- Display a list of events (title, date, location).
- Use mock API (`/api/events`) or hardcoded JSON.
- Add **search bar** (filter by title).
- Add **category filter** (Conference, Workshop, Meetup).

✅ *Evaluates: data fetching, filtering, conditional rendering*  

---

### **Module 3: Event Details Page**
- Dynamic route: `/events/[id]`.
- Show event details: **title, description, date, location, category**.

✅ *Evaluates: Next.js dynamic routing, SSR/CSR understanding*  

---

### **Module 4: Create Event Page**
- Form with: **title, description, date, location, category**.
- On submit → add event to local state (or `localStorage`).
- Redirect to **My Events** page.

✅ *Evaluates: forms, controlled components, validation*  

---

### **Module 5: My Events Page**
- Show only events created by the user.
- Allow **deleting** an event.

✅ *Evaluates: state management, CRUD basics*  

---

### **Bonus (Optional)**
- Add **RSVP button** → track attendance.  
- Add ability to **edit an event**.  
- Deploy to **Vercel**.  

✅ *Evaluates: extra effort, real-world mindset*  

---

## 🛠️ Tech Stack

- **Next.js** – React framework  
- **React Hooks** – State management  
- **TailwindCSS** – Styling (optional but recommended)  
- **Local state / localStorage** – Persistence  
- **Mock API (`/api/events`)** – Data source  

---




