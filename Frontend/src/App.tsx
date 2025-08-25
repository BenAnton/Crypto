import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header/Header.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Home from "./Pages/Home.tsx"; 
import Portfolio from "./Pages/Portfolio.tsx";
import History from "./Pages/History.tsx";
import {CoinsProvider} from "./Context/coinsContext.tsx";
import {
    CurrencyProvider
} from "./Context/currencyContext.tsx";
import {ThemeProvider} from "./Context/themeContext.tsx";
import {
    AlertProvider
} from "./Context/AlertContext.tsx"
import Alert from "./Components/Alert/Alert.tsx";

function App() {


  return (
    <>
    <Router>
        <CurrencyProvider>
            <ThemeProvider>
                <AlertProvider>
        <Header/>
        
        <div className="content-cont">
            <CoinsProvider> 
                
            <Routes>
                    <Route path="/" element={<Home/>}/>
                
                    <Route path="/portfolio" element={<Portfolio/>}/>
                
                    <Route path="/history" element={<History/>}/>
            </Routes>
                
            </CoinsProvider>
                
    </div> 
        
    <Footer/>
                    <Alert/>
                </AlertProvider>
            </ThemeProvider>
        </CurrencyProvider>
        </Router>
        
    </>
  )
}

export default App
