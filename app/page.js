import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
