import App from "./App"
import Calendar from "./Calendar"
import { Route, Routes } from "react-router-dom"
export default function Path() {
    return (
      <>
        <div className='appcontainer'>
          <Routes>
            <Route path ="/" element = {<App/>} />
            <Route path ="/calendar" element = {<Calendar/>} />
          </Routes>
        </div>
      </>
    )
  }