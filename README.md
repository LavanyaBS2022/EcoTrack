# EcoTrack 🌿 - Your Personal Air Quality Companion

EcoTrack is a modern web application designed to help you monitor the air quality in your environment, understand its impact on your health, and receive personalized, AI-powered recommendations to improve it. This prototype was built to showcase a clean, responsive user interface and the integration of generative AI for providing actionable insights.

![EcoTrack Screenshot](https://placehold.co/800x400.png?text=EcoTrack+Dashboard)
*A placeholder for your app's screenshot. You can replace this link with a real image after deployment.*

---

## ✨ Key Features

- **Real-time Dashboard**: A central dashboard that displays key air quality metrics like PM2.5, PM10, CO2, temperature, and humidity using simulated data.
- **AI-Powered Recommendations**: Leverages Google's Gemini AI to generate personalized tips for improving air quality based on current conditions and user-provided interests (e.g., fitness, pets, children).
- **Historical Data Visualization**: A clean, interactive chart shows air quality trends over the past 7 days, helping users identify patterns.
- **Customizable Alerts**: Users can set custom thresholds for different pollutants and receive visual alerts when levels are exceeded.
- **Community Forum**: A simulated forum where users can share tips and insights, fostering a sense of community.
- **Responsive Design**: A mobile-first, fully responsive interface built with modern design principles.

---

## 🚀 Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Google's Genkit](https://firebase.google.com/docs/genkit) with the Gemini API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Ready for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

## 🛠️ Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- A package manager like `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add your Gemini API key:
    ```env
    GOOGLE_API_KEY=your_gemini_api_key_here
    ```
    You can get a free API key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:9002](http://localhost:9002).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
