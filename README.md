# Andhra Pickles - Premium E-commerce

A high-energy, premium full-stack e-commerce experience for authentic Andhra pickles, featuring a "Liquid Glass" design and sensory motion.

## Features

- **Liquid Glass UI**: Modern aesthetic with backdrop-blur and spicy orange/crimson accents.
- **Dynamic Spice Slider**: Real-time theme transformation based on spice intensity.
- **Full-Stack Management**:
  - **SQLite Database**: Persistent product storage using `better-sqlite3`.
  - **Admin Panel**: Toggleable admin mode to add or remove products directly from the UI.
- **Sensory Motion**: Physics-based spring animations and scroll-triggered reveals using `motion/react`.
- **Responsive Design**: Optimized for all screen sizes.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Lucide Icons, Motion.
- **Backend**: Node.js, Express.
- **Database**: SQLite (better-sqlite3).

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd andhra-pickles
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Admin Mode

To manage products:
1. Click the **Shield Icon** in the bottom-right corner to activate Admin Mode.
2. Use the **"+"** button to add new pickles.
3. Click the **Trash Icon** on any product card to delete it.

## Environment Variables

- `GEMINI_API_KEY`: Required if you extend the app with AI features.
- `APP_URL`: Automatically handled in the AI Studio environment.

## License

This project is licensed under the Apache-2.0 License.
