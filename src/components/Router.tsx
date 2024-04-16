import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import KnowledgeHome from '../pages/knowledges'
import KnowledgeDetail from '../pages/knowledges/detail'
import KnowledgeLNew from '../pages/knowledges/new'
import KnowledgeEdit from '../pages/knowledges/edit'
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
            <Route path="/knowledges" element={<KnowledgeHome/>} />
            <Route path="/knowledges/:id" element={<KnowledgeDetail />}/>
            <Route path="/knowledges/new" element={<KnowledgeLNew />}/>
            <Route path="/knowledges/edit/:id" element={<KnowledgeEdit />} />
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