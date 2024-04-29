import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import GrowthHome from '../pages/growth'
import GrowthDetailPage from '../pages/growth/detail'
import GrowthNewPage from '../pages/growth/new'
import GrowthEditPage from '../pages/growth/edit'
import EducationHome from '../pages/education'
import EducationDetailPage from '../pages/education/detail'
import EducationNewPage from '../pages/education/new'
import EducationEditPage from '../pages/education/edit'
import CultureHome from '../pages/culture'
import CultureDetailPage from '../pages/culture/detail'
import CultureNewPage from '../pages/culture/new'
import CultureEditPage from '../pages/culture/edit'
import LoginPage from '../pages/login'
import SignupPage from '../pages/signup'

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({isAuthenticated}: RouterProps) => {

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />}/>
            <Route path="/growth" element={<GrowthHome/>} />
            <Route path="/growth/:id" element={<GrowthDetailPage />}/>
            <Route path="/growth/new" element={<GrowthNewPage />}/>
            <Route path="/growth/edit/:id" element={<GrowthEditPage />} />
            <Route path="/education" element={<EducationHome/>} />
            <Route path="/education/:id" element={<EducationDetailPage />}/>
            <Route path="/education/new" element={<EducationNewPage />}/>
            <Route path="/education/edit/:id" element={<EducationEditPage />} />
            <Route path="/culture" element={<CultureHome/>} />
            <Route path="/culture/:id" element={<CultureDetailPage />}/>
            <Route path="/culture/new" element={<CultureNewPage />}/>
            <Route path="/culture/edit/:id" element={<CultureEditPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ): (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default Router