import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import store from './store'
import { loadUser } from './actions/userAction'
import UserOptions from './components/UserOptions'
import { useSelector } from 'react-redux'
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
  TermsAndConditions,
  LoginSignUp,
  Profile
} from './pages'

function App() {
  const {isAuthenticated, user} = useSelector((state) => state.user); 
  console.log(user,"app vala");
  useEffect(() => {
      store.dispatch(loadUser())
    }, []);

  return (
    
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:productid' element={<SingleProduct />} />
          <Route path='terms' element={<TermsAndConditions />} />
          <Route path='login' element={<LoginSignUp/>}/>
          <Route path ='account' element={<Profile/>} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path='error' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
