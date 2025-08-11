import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Components/Header/Header.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Home from "./Pages/Home.tsx"; 
import Portfolio from "./Pages/Portfolio.tsx";
import History from "./Pages/History.tsx";
import {CoinsProvider} from "./Context/coinsContext.tsx";

function App() {


  return (
    <>
    <Router>
        <Header/>
        <CoinsProvider>
        <div className="content-cont">
                
            <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/portfolio" element={<Portfolio/>}/>
                    <Route path="/history" element={<History/>}/>
            </Routes>
               
    </div> 
        </CoinsProvider>
    <Footer/>
        </Router>
        
    </>
  )
}

export default App
