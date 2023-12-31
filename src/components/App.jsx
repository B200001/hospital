import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormOne from './FormOne'
import Home from './Home'
import FormTwo from './FormTwo'
import Entry from './Entry'
import Preview from './Preview'
import PreviewOne from './PreviewOne'
import PreviewTwo from './PreviewTwo'
import FormDetails from './FormDetails'
import Header from './Header'



const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/Hospital/' element={<Home/>}/>
            <Route path='/formOne/:userId' element={<FormOne/>}/>
            <Route path='/formTwo/:userId' element={<FormTwo/>}/>
            <Route path="/newEntry/:userId" element={<Entry />} />
            <Route path='/preview/:userId' element={<Preview/>}/>
            <Route path='/formOneView/:userId' element={<PreviewOne/>}/>
            <Route path='/formTwoView/:userId' element={<PreviewTwo/>}/>
            <Route path='/formDetails/:userId' element={<FormDetails/>}/>
            
            {/* <Route path="/editFormTwo/:userId" element={<EditFormTwo />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
