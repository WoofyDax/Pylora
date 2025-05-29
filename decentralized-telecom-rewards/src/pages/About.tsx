
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Zap, Globe, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="bg-silver-light/50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 animate-fade-right">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Revolutionizing Connectivity Through Decentralization</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  We're building the world's largest decentralized 5G network, powered by people like you. Our mission is to create accessible, affordable, and censorship-resistant connectivity for everyone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-mint-dark hover:bg-mint text-white">
                    <Link to="/our-team">Meet Our Team</Link>
                  </Button>
                  <Button variant="outline">
                    <Link to="/careers">Join Our Mission</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 animate-fade-left">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                    alt="Network visualization" 
                    className="w-full object-cover h-[500px]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                From a bold idea to a revolutionary network, here's how we're changing the telecommunications landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-xl animate-fade-up">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-mint-dark mb-2">2019</div>
                  <h3 className="text-xl font-semibold mb-4">The Beginning</h3>
                  <p className="text-muted-foreground">
                    Founded with a vision to democratize connectivity, we set out to build a decentralized network that would empower individuals rather than corporations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-xl animate-fade-up" style={{ animationDelay: '200ms' }}>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-mint-dark mb-2">2021</div>
                  <h3 className="text-xl font-semibold mb-4">First Network Deployment</h3>
                  <p className="text-muted-foreground">
                    Our first miners went live, proving that a decentralized approach to telecommunications infrastructure was not only possible but more efficient.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-xl animate-fade-up" style={{ animationDelay: '400ms' }}>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-mint-dark mb-2">Today</div>
                  <h3 className="text-xl font-semibold mb-4">Global Expansion</h3>
                  <p className="text-muted-foreground">
                    With thousands of miners across 78 countries, we're rapidly expanding our network coverage while maintaining our commitment to decentralization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 bg-silver-light/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide us in building the future of connectivity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 items-start animate-fade-right">
                <div className="bg-mint-dark p-3 rounded-lg text-white">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                  <p className="text-muted-foreground">
                    We constantly push the boundaries of what's possible with decentralized network technology, staying at the cutting edge of telecommunications.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start animate-fade-left">
                <div className="bg-mint-dark p-3 rounded-lg text-white">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                  <p className="text-muted-foreground">
                    We believe connectivity is a right, not a privilege. Our mission is to bring affordable, reliable 5G to everyone, everywhere.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start animate-fade-right">
                <div className="bg-mint-dark p-3 rounded-lg text-white">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Decentralization</h3>
                  <p className="text-muted-foreground">
                    By distributing network ownership and control, we're creating a resilient and censorship-resistant communication infrastructure.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start animate-fade-left">
                <div className="bg-mint-dark p-3 rounded-lg text-white">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Power</h3>
                  <p className="text-muted-foreground">
                    Our network is built by the community, for the community. We reward those who contribute to the growth of our ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-charcoal to-charcoal-light rounded-xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">Ready to join the revolution?</h2>
                  <p className="text-silver-light text-lg">
                    Become part of our growing network by hosting a miner or using our service.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-mint-dark hover:bg-mint text-white">
                    <Link to="/pricing">Get Started</Link>
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    <Link to="/network">Learn More</Link>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
