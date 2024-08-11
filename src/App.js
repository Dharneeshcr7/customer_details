
import Home from "./pages/home/Home"
import { UserContextProvider } from "./context/UserContext";
import './index.css';
function App() {
  return (
    
      <UserContextProvider>
         <Home/>
      </UserContextProvider>
    
  );
}

export default App;
