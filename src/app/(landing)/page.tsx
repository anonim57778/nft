import AboutSection from "./about-section";
import ArtistSection from "./artist-section";
import CategoriesSection from "./categories-section";
import HeroSection from "./hero-section";
import ArtSection from "./art-section";
import SubscriptionSection from "./subscription-section";
import CollectionSection from "./collection-section";

export default function Home() {

  return (
    <div>
      <HeroSection/>
      <CollectionSection/>
      <ArtistSection/>
      <CategoriesSection/>
      <ArtSection/>
      <AboutSection/>
      <SubscriptionSection/>
    </div>
  );
}
