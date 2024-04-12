import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          content
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;