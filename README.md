# VendorConnect - Vendor-Supplier Platform

A web platform connecting Indian street vendors with local suppliers for efficient sourcing of raw materials.

## 🚀 Features

- **User Authentication**: Secure login and registration system for vendors and suppliers
- **Supplier Discovery**: Search and filter suppliers by category, location, and ratings
- **Real-time Messaging**: Direct communication between vendors and suppliers
- **Profile Management**: Detailed profiles for both vendors and suppliers
- **Loyalty System**: Track and reward long-term business relationships
- **Review System**: Rate and review suppliers to maintain quality standards
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies

- React.js (Frontend Framework)
- Firebase (Backend & Authentication)
- Tailwind CSS (Styling)
- React Router (Navigation)
- Firestore (Database)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm/yarn
- Firebase account

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vendor-connect.git
   cd vendor-connect
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:

   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 📦 Building for Production

```bash
npm run build
```

## 🚀 Deployment

### Deploy to Firebase

1. Install Firebase CLI:

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:

   ```bash
   firebase login
   ```

3. Initialize Firebase:

   ```bash
   firebase init
   ```

4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

### Deploy to Vercel

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

## 🌱 Database Seeding

To populate the database with sample data:

```bash
npm run seed
```

## 🧪 Testing

```bash
npm test
```

## 📁 Project Structure

```
vendor-connect
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   ├── pages
│   ├── App.js
│   ├── index.js
│   └── firebase.js
├── .env
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Anuj Harad]
Made with ❤️ by [Prasad Maskar]
Made with ❤️ by [Jay Dhamankar]
Made with ❤️ by [Aditya Mohite]
Made with ❤️ by [Shubham Gavali]

