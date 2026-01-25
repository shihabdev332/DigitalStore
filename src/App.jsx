import Header from "./component/Header";
import Container from "./component/Container";
import Banner from "./component/Banner";
import Sell from "./component/Sell";
import NewArrival from "./component/NewArrival";
import Recommended from "./component/Recommended";
import AiChat from "./component/AiChat"; // ✅ AI Chat কম্পোনেন্টটি ইমপোর্ট করা হয়েছে

const App = () => {
  return (
    <main className="relative">
      <Banner />
      <NewArrival />
      <Container className="py-5 md:py-10">
        <Sell />
        <Recommended />
      </Container>

      {/* ✅ AI চ্যাটবট এখানে যুক্ত করা হয়েছে */}
      <AiChat /> 
    </main>
  );
};

export default App;