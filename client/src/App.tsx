import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const Signup = lazy(() => import('./pages/Signup'))
const Login = lazy(() => import('./pages/Login'))
const Error = lazy(() => import('./pages/Error'))
const Verification = lazy(() => import('./pages/Verification'))
const Courses = lazy(() => import('./pages/Courses'))
const Admin = lazy(()=> import('./pages/Admin'))
const CourseForm = lazy(()=> import('./pages/CourseForm'))

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/verify/:token'} element={<Verification />} />
          <Route path={'/courses'} element={<Courses />} />
          <Route path={'/admin'} element={<Admin />} />
          <Route path={'/courses/form'} element={<CourseForm />} />
          
          <Route path={'*'} element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
