import { Outlet } from "react-router"
import Header from "./components/Header"
import ThreadList from "./components/ThreadList"

function App() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ThreadList />
    </>
  )
}

export default App
