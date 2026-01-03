#  GlobeTrotter

**GlobeTrotter** is a modern, AI-powered travel planning application designed with a **premium luxury aesthetic**. It helps travelers creates detailed itineraries, manage budgets, and discover new destinations with style.

![Luxury Theme Preview](https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070)

##  Features

*   **Luxury UI/UX**: A completely redesigned interface featuring a **Gold (`#C5A065`) & Dark Slate** palette, 'Playfair Display' typography, and elegant micro-interactions.
*   **Trip Wizard**: A step-by-step flow to create trips, including scope (Domestic/International), dates, and budget.
*   **Smart Search**: Auto-complete destination search that automatically fetches high-quality cover images for your trips.
*   **Itinerary Management**: Add stops, organize activities, and track daily schedules.
*   **Budget Tracking**: Real-time visualization of your trip costs vs. your total budget.
*   **Travel Personas**: Select traveler types (Solo, Family, Adventure, Luxury) for tailored experiences.

##  Tech Stack

### Frontend
*   **React** (Vite)
*   **Tailwind CSS** (Custom Luxury Configuration)
*   **Framer Motion** (Animations)
*   **Lucide React** (Icons)
*   **Axios** (API Communication)

### Backend
*   **Node.js** & **Express**
*   **SQLite** (Local Database)
*   **UUID** (Identity generation)
*   **Cors** & **Dotenv**

##  How We Built It (Development Journey)

The development of GlobeTrotter followed a structured, iterative approach:

1.  **Phase 1: Foundation & Architecture**
    *   Established the Monorepo structure (Client + Server).
    *   Configured the SQLite database with `db.ts` and schema initialization.
    *   Implemented secure Authentication (Login/Signup) using a custom Auth Store.

2.  **Phase 2: Core Functionality**
    *   Built the CRUD APIs for Trips and Activities.
    *   Integrated the **City Search API** using a static curated list of 50+ global destinations.
    *   Implemented the Trip Wizard logic to handle multi-step form state.

3.  **Phase 3: The Luxury Pivot**
    *   *Challenge*: The initial UI was Anime-themed (Pink/Sakura).
    *   *Solution*: Completely refactored the design system to a Premium Aesthetic.
    *   *Changes*: Implemented 'Playfair Display' fonts, Gold/Dark colors, and the Hero Search component.
    *   *Optimization*: Added automatic image fetching (`/search/city-image`) to enhance visual appeal.

4.  **Phase 4: Optimization & Deployment**
    *   Fixed PostCSS/Tailwind build errors.
    *   Ensured mobile responsiveness in `Layout.tsx`.
    *   Finalized documentation and deployed to GitHub.

##  Final Output

The application successfully delivers a premium user experience:

*   **Landing Page**: A cinematic full-screen hero section with a "Book Now" aesthetic.
*   **Trip Dashboard**: An elegant grid view of upcoming trips, featuring high-quality localized imagery.
*   **Trip Details**: A polished itinerary view with budget progress bars and organized activity lists.
*   **Visual Identity**: Consistent use of Gold accents (`#C5A065`) against clean white/dark backgrounds for a sophisticated feel.

##  Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/jeffybrailin/Globe-Trotter.git
    cd Globe-Trotter
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    # Initialize Database (if needed)
    npx ts-node src/db.init.ts
    # Start Server
    npx ts-node src/index.ts
    ```
    *Server runs on port 5000*

3.  **Setup Frontend**
    ```bash
    # Open a new terminal
    cd client
    npm install
    # Start Development Server
    npm run dev
    ```
    *Client runs on port 5173*

##  Theme Customization

The luxury theme is centrally managed in `client/tailwind.config.js`. You can adjust the **Primary Gold** or **Secondary Dark** colors there to fit your brand.

```javascript
colors: {
    primary: '#C5A065', // Luxury Gold
    secondary: '#1F2937', // Dark Slate
}
```


