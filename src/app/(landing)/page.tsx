import AboutSection from "./about-section";
import CategoriesSection from "./categories-section";
import CollectionSection from "./collection-section";
import HeroSection from "./hero-section";
import NftSection from "./nft-section";

export default function Home() {

  return (
    <div>
      <HeroSection/>
      <CollectionSection/>
      <CategoriesSection/>
      <NftSection/>
      <AboutSection/>
    </div>
  );
}
