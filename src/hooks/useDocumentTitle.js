import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      const baseTitle = 'UFlicks';
      
      // Handle different routes
      switch (pathname) {
        case '/':
          return `${baseTitle} - Discover Movies & TV Shows`;
        case '/movies':
          return `${baseTitle} - Movies`;
        case '/tv_series':
          return `${baseTitle} - TV Series`;
        case '/about':
          return `${baseTitle} - About`;
        default:
          // Handle category pages
          if (pathname.includes('/animations/')) {
            return `${baseTitle} - Animation ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          if (pathname.includes('/action/')) {
            return `${baseTitle} - Action ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          if (pathname.includes('/adventure/')) {
            return `${baseTitle} - Adventure ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          if (pathname.includes('/horror/')) {
            return `${baseTitle} - Horror ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          if (pathname.includes('/drama/')) {
            return `${baseTitle} - Drama ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          if (pathname.includes('/comedy/')) {
            return `${baseTitle} - Comedy ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          // Handle search pages
          if (pathname.includes('/search/')) {
            return `${baseTitle} - Search ${pathname.includes('/movies') ? 'Movies' : 'Shows'}`;
          }
          // Handle media details pages
          if (pathname.includes('/media/')) {
            return `${baseTitle} - Media Details`;
          }
          // Default fallback
          return baseTitle;
      }
    };

    const newTitle = getPageTitle(location.pathname);
    document.title = newTitle;
  }, [location.pathname]);
};

export default useDocumentTitle;
