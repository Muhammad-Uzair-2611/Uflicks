# 🎬 UFlicks

A modern, responsive movie and TV series discovery platform built with React and Vite. Discover trending content, explore different genres, and get detailed information about your favorite movies and shows.

<img src="./public//Logo.png" alt="Logo" width="50" height="50" />

![UFlicks Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-6.1.1-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-teal)

## ✨ Features

### 🎯 Core Functionality

- **Movie & TV Series Discovery** - Browse trending, popular, and top-rated content
- **Advanced Search** - Search across movies and TV shows with intelligent filtering
- **Genre-based Filtering** - Explore content by categories (Action, Horror, Drama, Comedy, Adventure, Animation)
- **Detailed Media Information** - Comprehensive details including ratings, cast, production info, and more
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience

- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Image Carousel** - Dynamic banner carousel showcasing featured content
- **Lazy Loading** - Optimized image loading for better performance
- **Error Handling** - Robust error boundaries and user-friendly error messages
- **Session Management** - Persistent user preferences and browsing history

### 🔧 Technical Features

- **Client-side Routing** - Seamless navigation with React Router
- **Context API** - Efficient state management for global application state
- **API Integration** - Comprehensive integration with The Movie Database (TMDB) API
- **Performance Optimization** - Built with Vite for fast development and optimized builds
- **Code Splitting** - Efficient bundle splitting for faster load times

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with modern features
- **Vite 6** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **Framer Motion 12** - Smooth animations and transitions

### Additional Libraries

- **Axios** - HTTP client for API requests
- **React Icons** - Comprehensive icon library
- **React Lazy Load Image Component** - Optimized image loading
- **Terser** - JavaScript minification

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Vite Plugin Compression** - Gzip compression for production builds

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- TMDB API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Muhammad-Uzair-2611/Uflicks.git
   cd uflicks
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   ```

   Get your free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── Components/           # Reusable UI components
│   ├── Hero.jsx         # Main hero section with carousel
│   ├── NavBar.jsx       # Navigation bar with responsive menu
│   ├── Sidebar.jsx      # Category sidebar
│   ├── Sliders.jsx      # Content sliders
│   ├── MediaCard.jsx    # Movie/TV show cards
│   ├── Searchbar.jsx    # Search functionality
│   └── ...
├── Context/             # React Context providers
│   ├── MovieInfoContext.jsx
│   └── Searchcontext.jsx
├── Pages/               # Page components
│   ├── MoviesPage.jsx
│   ├── MediaDetails.jsx
│   ├── CategoryPage.jsx
│   └── ...
├── services/            # API services
│   └── movie_api.js     # TMDB API integration
├── hooks/               # Custom React hooks
└── assets/              # Static assets
```

## 🎯 Key Features Explained

### Search Functionality

- **Unified Search**: Search across both movies and TV shows simultaneously
- **Smart Filtering**: Results are filtered to show only content with complete information
- **Pagination**: Efficient handling of large result sets

### Content Discovery

- **Trending Content**: Daily trending movies and TV shows
- **Genre Categories**: Dedicated pages for different content types
- **Top Rated**: Curated lists of highest-rated content
- **Now Playing**: Currently playing movies in theaters

### Media Details

- **Comprehensive Information**: Detailed view with ratings, cast, production details
- **Image Galleries**: Multiple backdrop images for each title
- **Responsive Design**: Optimized viewing experience across all devices

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🌐 API Integration

UFlicks integrates with The Movie Database (TMDB) API to provide:

- Movie and TV show information
- High-quality images and posters
- Ratings and reviews
- Cast and crew details
- Genre classifications
- Search functionality

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the appearance by:

- Modifying the Tailwind configuration
- Updating color schemes in the CSS files
- Customizing component styles

### Content

- Modify API endpoints in `src/services/movie_api.js`
- Add new genre categories by extending the existing API calls
- Customize the number of results per page

## 🚀 Deployment

The application is optimized for deployment on various platforms:

### Netlify (Recommended)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel

1. Connect your GitHub repository to Vercel
2. Set the build command: `npm run build`
3. Set the output directory: `dist`
4. Add environment variables

### Other Platforms

The application can be deployed to any static hosting service that supports SPA routing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is private and all rights are reserved. This application is for educational and portfolio purposes.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the comprehensive movie and TV show API
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) teams for the excellent development tools
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 👨‍💻 **Author**

**Muhammad Uzair Shaikh**

- GitHub: [@Muhammad-Uzair-2611](https://github.com/Muhammad-Uzair-2611)
- Project: [UFlicks Repository](https://github.com/Muhammad-Uzair-2611/Uflicks.git)
- Portfolio: [My Portfolio](https://uzair-dev-portfolio.netlify.app/)

---

⭐ **Star this repository if you found it helpful!**

🔗 **Live Demo**: [UFlicks App](https://uflicks.netlify.app/)

📧 **Contact**: For questions or suggestions, please open an issue on GitHub.
