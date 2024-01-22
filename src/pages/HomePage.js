import Header from '../components/layout/Header';
import Fondo from '../components/layout/Fondo';
import Footer from "../components/layout/Footer";

function home() {
  return (
    <div className="App">
      <Header></Header>
      <Fondo></Fondo>
      <Footer></Footer>
    </div>
  );
}

export default home;