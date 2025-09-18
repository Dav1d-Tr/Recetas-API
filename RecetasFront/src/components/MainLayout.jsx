import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
    
  return (
    <div >
      {/* Header con props condicionales */}
      <Header/>

      {/* Aquí se montan las páginas */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout;