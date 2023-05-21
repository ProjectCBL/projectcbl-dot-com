import Blog from '../Home/Blog/Blog'
import Main from '../Home/Main/Main'
import About from '../Home/About/About'
import Showcase from '../Home/Showcase/Showcase'

function Home() {
  return (
    <div>
      <Main />
      <div className="flex mt-8 space-x-8">
        <About />
        <Blog />
      </div>
      <div className="mt-8 flex justify-center">
        <Showcase />
      </div>
    </div>
  )
}

export default Home
