import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'book', element: <BookAppointment /> },
      { path: 'book/:doctorId', element: <BookAppointment /> },
      { path: 'appointments', element: <MyAppointments /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
