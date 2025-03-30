# Gen AI Analytics

## 🚀 Overview
**Gen AI Analytics** is a powerful analytics dashboard for monitoring and visualizing generative AI model performance. The application is built with modern web technologies and deployed seamlessly on **Vercel**.

## ✨ Features
- 📊 **Interactive Dashboards** – View AI model analytics in real-time.
- 📈 **Data Visualization** – Graphs and charts for better insights.
- 🔍 **User-Friendly Interface** – Easy-to-navigate UI.
- ⚡ **Fast & Scalable** – Optimized for speed and performance.

## 🛠️ Tech Stack
- **Frontend**: React (Next.js) + Tailwind CSS
- **Backend**: Node.js (if applicable) / Serverless API
- **Hosting**: Vercel

## 📥 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/Yuvalakshmii/Gen-AI-Analytics.git
   cd Gen-AI-Analytics
   ```
2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```
3. **Run the development server**
   ```sh
   npm run dev  # or yarn dev
   ```
## 🔄 State Management with Redux
This project uses **Redux** for efficient **global state management**. Redux helps in:
- **Centralizing AI model analytics data** for easy access across components.
- **Handling API calls** efficiently using middleware like **Redux Thunk** or **Redux Saga**.
- **Optimizing performance** by updating only necessary components and avoiding unnecessary re-renders.

## 📊 Dataset & Data Handling
Currently, the application utilizes **mock data** for generating AI analytics. The dataset is simulated through the `generateMockResults` function, which provides predefined responses based on user queries. This approach allows for development and testing without reliance on an external database or API.

- **Mock Data Simulation**: The `processQuery` function in Redux Thunk **mimics an API request** using a timeout delay (`setTimeout(resolve, 1500)`). Instead of fetching real data, it retrieves results from `mock-data.ts`.
  
- **Future Enhancements**: To integrate real-time AI analytics, the mock data should be replaced with:
  - **Actual API calls** to external AI services (e.g., OpenAI, Firebase, MongoDB).
  - **A dedicated database** for storing AI-generated insights and query history.
  - **Dynamic real-time data updates** to enhance user experience and accuracy.

  
## 🚀 Deployment
- **Automatic Deployment**: Pushing to `main` automatically deploys the latest changes on [Vercel]([https://gen-ai-analytics-yuva.vercel.app/]).
- **Manual Deployment**: Run:
  ```sh
  vercel deploy
  ```

## 👥 Contributors
- **Yuvalakshmii**

## 📜 License
This project is licensed under the MIT License.
