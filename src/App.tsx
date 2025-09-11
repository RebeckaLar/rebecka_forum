import { Outlet } from "react-router"
import Header from "./components/Header"
import ThreadList from "./components/ThreadList"
import TagList from "./components/TagList"

function App() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ThreadList />
      <TagList />
    </>
  )
}

export default App
