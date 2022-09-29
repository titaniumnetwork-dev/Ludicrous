import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Layout({ children, particles }: any) {

  const particlesInit: any = async (main: any) => {await loadFull(main)};
  
  const particlesLoaded: any = (e: any) => {e.canvas.element.style.zIndex = '1'};
  
  return (
    <>
      {particles}
      
      <main>{children}</main>
    </>
  )
}