import { useState } from 'react'
import '../App.css'
import {Routes, Route} from 'react-router-dom'
import Header from './header'
import Home from './home'
import Topics from './topics'
import Articles from './articles'
import ArticleDetails from './article-details'

function App() {

  const [signedInAs, setSignedInAs] = useState("grumpy19")

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={< Home/>}/>
      <Route path='/topics' element={<Topics/>}/>
      <Route path='/articles' element={<Articles/>}/>
      <Route path='articles/:article_id' element={<ArticleDetails/>}/>
    </Routes>
    </>
  )

}

export default App
