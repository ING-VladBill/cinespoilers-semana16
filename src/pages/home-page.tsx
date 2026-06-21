import HeroSection from "@/components/home/hero-section";
import PageContainer from "@/components/layout/page-container";
import MoviesGrid from "@/components/movies/movies-grid";

const HomePage = () => {
  return (
    <>
      <PageContainer>
        <HeroSection />
      </PageContainer>

      <PageContainer>
        <MoviesGrid />
      </PageContainer>
    </>
  );
};

export default HomePage;
