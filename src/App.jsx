import './App.css'
import Countdown from './components/Countdown'
import Navigation from './components/Navigation'
import Ranking from './components/Ranking'

function App() {
  return (
    <section className='section'>
      <Navigation />
      <Countdown />
      <Ranking />
    </section>
  )
}

export default App
