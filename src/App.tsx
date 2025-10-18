import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import Modules from './components/Modules'
import Roadmap from './components/Roadmap'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProblemSolution />
              <Features />
              <Modules />
              <Roadmap />
              <About />
              <Contact />
            </>
          } />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

