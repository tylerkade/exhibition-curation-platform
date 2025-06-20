# Easy Exhibitions

### Browse and Favourite Collections of Art, Sculptures, and Artifacts.

## 📄 Summary

Easy Exhibitions is a full-stack web application that lets users explore artwork from public musuem collections.

Unregistered users can freely browse and filter through pieces from multiple museum collections. Registered
users gain access to features like favouriting artworks and creating personalised exhibits.

## 🚀 Live Demo

You can view the deployed version [here](https://exhibition-curation-platform-ten.vercel.app/).

[Video](https://youtu.be/XmwdTQRAkcc) demonstration of key features.

## 📋 Features

### **Unregistered users can:**

- Browse and filter through collections of art, sculptures, and artifacts from multiple museums.

### **Registered users can:**

- Login/logout
- Create custom exhibits (your own collections of favourited artworks)
- Favourite artwork, and add them to your exhibits
- Access a personalised dashboard displaying all your created exhibits and saved artworks

## 🛠️ Setup and Installation

### **1. Clone the Repository**

```
git clone https://github.com/tylerkade/exhibition-curation-platform
cd exhibition-curation-platform
```

### **2. Install Dependencies**

```
npm install
```

### **3. Create Environment Variable**

Create a `.env.local` file in the root of the project

```
AUTH_SECRET=your_auth_code
DATABASE_URL=your_database_url
```

`AUTH_SECRET` can be autogenerated and automatically placed in your `.env.local` file by running `npx auth secret`.

### **4. Run the Development Server**

```
npm run dev
```

Then visit http://localhost:3000 in your browser.

## 🔗 API Integration

This project currently integrates with two public museum APIs:

- [The Metropolitan Museum of Art](https://metmuseum.github.io/)
- [The Art Institute of Chicago](https://api.artic.edu/docs/)

These APIs are used to fetch and filter through their extensive collections of art, sculptures, and artifacts.

## 🖥️ Technologies Used

This is a [Next.js](https://nextjs.org) project written in [Typescript](https://www.typescriptlang.org/), and hosted on [Vercel](https://vercel.com).

### **Frontend & Backend:** [Next.js](https://nextjs.org)

- Combines the frontend and backend in a single repository for better organization.
- Enables server-side rendering and static site generation for optimized performance.

### **Hosting:** [Vercel](https://vercel.com)

- Hosts the frontend, backend, and database under one roof for streamlined deployment.

### **Other Notable Dependancies:**

- [React](https://react.dev/)
- [Postgres](https://www.postgresql.org/)
- [Tailwind](https://tailwindcss.com/)
- [dompurify](https://www.npmjs.com/package/dompurify)
- [bad-words](https://www.npmjs.com/package/bad-words)

---

This project was created as part of the freelance Launchpad program by [Tech Returners](https://www.techreturners.com/)
