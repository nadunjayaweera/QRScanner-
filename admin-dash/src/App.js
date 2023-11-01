// import React from 'react'
// import Home from './pages/home/Home'
// import Login from './pages/login/Login';



// import {
//   BrowserRouter,
//   Route,
//   Routes,
// } from "react-router-dom";

// function App() {
//   return (
//     <div className='app'>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//            <Route index element={<Home />} />
//            <Route path='login' element={<Login />} />
           
          
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App;
import React, { useState } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    // Perform authentication logic, e.g., check credentials
    // For this example, just setting authenticated to true on successful login
    setAuthenticated(true);
  };

  // Guarded Route component to restrict access based on authentication status
  const AuthGuardedRoute = ({ element, ...rest }) => {
    return authenticated ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Default route is the Login page */}
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          
          {/* Route for the admin panel (Home) */}
          <Route
            path="/home"
            element={<AuthGuardedRoute element={<Home />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
