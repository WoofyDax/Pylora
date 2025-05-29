
import { Button } from '@/components/ui/button';
import { ArrowRight, Signal } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-silver-light to-background -z-10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-mint-light/20 to-transparent opacity-70 -z-10" />
      
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-mint-light/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-mint-light/10 rounded-full blur-3xl -z-10" />
      
      {/* Animated Signal Icons */}
      <div className="absolute top-1/4 left-1/4 opacity-20 animate-float">
        <Signal className="w-12 h-12 text-mint-dark" />
      </div>
      <div className="absolute bottom-1/4 right-1/3 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
        <Signal className="w-8 h-8 text-mint-dark" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <Signal className="w-10 h-10 text-mint-dark" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-border bg-background/50 text-sm font-medium animate-fade-in">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-dark opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-dark"></span>
            </span>
            Decentralized 5G Network | Now in Public Beta
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
            The Future of Telecom is <span className="text-mint-dark">Decentralized</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '400ms' }}>
            Join our network of miners, provide 5G coverage in your area, and earn rewards automatically while contributing to a more connected world.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '600ms' }}>
            <Button size="lg" className="rounded-full bg-mint-dark hover:bg-mint text-white px-8 font-medium h-12 hover:shadow-neon transition-all">
              Become a Provider
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 font-medium h-12">
              Explore Network
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-radial from-mint-light/20 to-transparent -z-10 rounded-2xl blur-xl" />
            <div className="glass rounded-2xl overflow-hidden border border-silver p-3 shadow-xl animate-fade-up" style={{ animationDelay: '800ms' }}>
              <div className="aspect-video rounded-xl overflow-hidden bg-silver/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <Signal className="w-16 h-16 mx-auto text-mint-dark mb-4" />
                  <h3 className="text-lg font-medium mb-2">Interactive Network Visualization</h3>
                  <p className="text-sm text-muted-foreground">Real-time visualization of our growing network will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
