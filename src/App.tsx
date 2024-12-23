import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Homepage } from './pages/Homepage/Homepage';
import { Books } from './pages/Books/Books';
import { Members } from './pages/Members/Members';
import { About } from './pages/About/About';
import { SignIn } from './pages/SignIn/SignIn';
import { JoinClub } from './pages/JoinClub/JoinClub';
import { BookDetail } from './pages/BookDetail/BookDetail';

import './styles/global.scss';

const router = createBrowserRouter([
  { path: '/', element: <Homepage /> },
  { path: '/books', element: <Books /> },
  { path: '/members', element: <Members /> },
  { path: '/about', element: <About /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/joinclub', element: <JoinClub /> },
  { path: '/books/:id', element: <BookDetail /> },
]);

export const App = () => <RouterProvider router={router} />;
