import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import App from './app';
import { DragAndDropPage } from './pages/DragAndDropPage';
import { PatternBuilderPage } from './pages/PatternBuilderPage';

// Root route that serves as the main layout
const rootRoute = createRootRoute({
  component: App,
});

// Individual page routes
const dragAndDropRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DragAndDropPage,
});

const patternBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pattern-builder',
  component: PatternBuilderPage,
});

const routeTree = rootRoute.addChildren([
  patternBuilderRoute,
  dragAndDropRoute,
]);

// Create and export the router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Type declaration for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
