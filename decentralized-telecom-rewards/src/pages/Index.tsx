
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { FeatureCards } from '@/components/FeatureCards';
import { NetworkMap } from '@/components/NetworkMap';
import { StatsDisplay } from '@/components/StatsDisplay';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeatureCards />
      <NetworkMap />
      <StatsDisplay />
    </Layout>
  );
};

export default Index;
