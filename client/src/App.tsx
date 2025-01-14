import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Loading from './components/Loading'
import Header from './components/Header'
import UserProvider from './context/userContext'

const Home = lazy(() => import('./pages/Home'))
const Signup = lazy(() => import('./pages/Signup'))
const Login = lazy(() => import('./pages/Login'))
const Error = lazy(() => import('./pages/Error'))
const Verification = lazy(() => import('./pages/Verification'))
const CoursesDashboard = lazy(() => import('./pages/CoursesDashboard'))
const Admin = lazy(() => import('./pages/Admin'))
const CourseForm = lazy(() => import('./pages/CourseForm'))
const CoursePage = lazy(() => import('./pages/CoursePage'))

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Toaster />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/verify/:token'} element={<Verification />} />
            <Route path={'/courses'} element={<CoursesDashboard />} />
            <Route path={'/admin'} element={<Admin />} />
            <Route path={'/courses/form'} element={<CourseForm />} />
            <Route path={'/courses/:id'} element={<CoursePage />} />
            <Route path={'*'} element={<Error />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
