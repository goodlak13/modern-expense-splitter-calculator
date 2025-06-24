# 💰 Expense Splitter Calculator

A modern, fully-featured web application for splitting expenses fairly among friends with smart settlement calculations and beautiful UI design.

![Expense Splitter](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC)

## 🌟 Features

### 👥 People Management
- Add and remove participants (minimum 2 people required)
- Clean, intuitive interface for managing group members
- Real-time validation and feedback

### 💸 Expense Tracking
- **Detailed Expense Entry**: Description, amount, payer, and participants
- **Category System**: Organized with emoji icons (🍕 Food, 🏨 Accommodation, 🚗 Transport, etc.)
- **Real-time Calculations**: Running totals and averages updated instantly
- **Edit & Delete**: Full CRUD operations for expenses

### 🧮 Smart Settlement Algorithm
- **Optimized Calculations**: Minimizes the number of transactions needed
- **Debt Simplification**: Automatically calculates who owes whom and how much
- **Balance Tracking**: Clear visualization of each person's financial position
- **Step-by-step Instructions**: Easy-to-follow settlement recommendations

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful gradient backgrounds with backdrop blur effects
- **Responsive Layout**: Optimized for both mobile and desktop devices
- **Smooth Animations**: Hover effects and micro-interactions throughout
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 🚀 Live Demo

**[View Live Application](https://steady-meerkat-b7f596.netlify.app)**

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe JavaScript for better development experience
- **Vite 5.4.2** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful, customizable icons
- **Custom Glassmorphism** - Modern UI design with backdrop blur effects

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-splitter.git
   cd expense-splitter
Install dependencies


npm install
Start development server


npm run dev
Open your browser
Navigate to http://localhost:5173

Build for Production

# Create production build
npm run build

# Preview production build locally
npm run preview
🎯 How to Use
1. Setup Phase
Add participants to your group (minimum 2 people)
Each person will be displayed in a card with remove option
2. Add Expenses
Click "Add Expense" button
Fill in the expense details:
Category: Choose from predefined categories with emojis
Description: Brief description of the expense
Amount: Total amount spent
Paid by: Select who paid for this expense
Participants: Check who participated in this expense
3. View Results
Click "Calculate Settlements" to see the results
Review individual balances and settlement instructions
Follow the step-by-step payment recommendations
🧮 Settlement Algorithm
The application uses an optimized debt settlement algorithm that:

Calculates individual balances for each person
Identifies creditors (people who are owed money)
Identifies debtors (people who owe money)
Minimizes transactions by pairing the largest creditor with the largest debtor
Provides clear instructions for settling all debts efficiently
📱 Responsive Design
Mobile First: Optimized for mobile devices with touch-friendly interfaces
Tablet Support: Adapted layouts for medium-screen devices
Desktop Enhanced: Full-featured experience on larger screens
Cross-browser Compatible: Works on all modern browsers
🎨 Design System
Color Palette
Primary Gradient: Deep purple (#6366f1) to cyan (#06b6d4)
Accent Colors: Electric blue (#3b82f6), Emerald (#10b981), Coral (#f59e0b)
Status Colors: Rose (#f43f5e) for deletions, Violet (#8b5cf6) for highlights
Neutral Colors: Various shades of gray for text and backgrounds
Typography
Headings: Bold, modern typography with proper hierarchy
Body Text: Clean, readable fonts with optimal line spacing
Interactive Elements: Clear visual feedback and hover states
🔧 Project Structure

src/
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles and Tailwind imports
└── vite-env.d.ts       # Vite type definitions

public/
└── black_circle_360x360.png  # Bolt.new badge asset

Configuration Files:
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite build configuration
└── eslint.config.js    # ESLint configuration
🚀 Deployment
This project is deployed on Netlify with automatic builds from the main branch.

Deploy Your Own
Fork this repository
Connect your GitHub account to Netlify
Select this repository for deployment
Build command: npm run build
Publish directory: dist
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Development Guidelines
Follow the existing code style and TypeScript conventions
Add appropriate comments for complex logic
Test your changes thoroughly on different screen sizes
Ensure accessibility standards are maintained
📄 License
This project is open source and available under the MIT License.

🙏 Acknowledgments
Bolt.new - AI-powered development platform used to create this project
Lucide Icons - Beautiful icon library
Tailwind CSS - Utility-first CSS framework
Netlify - Hosting and deployment platform
📞 Support
If you have any questions or run into issues, please:

Check the existing issues in this repository
Create a new issue with detailed information
Provide steps to reproduce any bugs
Made with ❤️ using Bolt.new
