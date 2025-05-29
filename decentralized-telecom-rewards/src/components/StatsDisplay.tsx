
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StatsDisplay = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-mint-light/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            <div className="lg:col-span-1 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Real Results, Real Rewards</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our network is growing, and so are the rewards. Join thousands of providers who are
                earning while helping build the future of decentralized telecom.
              </p>
              <Button className="rounded-full bg-mint-dark hover:bg-mint text-white px-6 font-medium hover:shadow-neon transition-all">
                Start Earning
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6 border-t border-l border-white/20 shadow-glass animate-fade-up" style={{ animationDelay: '200ms' }}>
                  <div className="text-4xl font-bold mb-2 text-mint-dark">$3.4k</div>
                  <div className="text-sm text-muted-foreground">Average monthly rewards for top performers</div>
                </div>
                
                <div className="glass rounded-xl p-6 border-t border-l border-white/20 shadow-glass animate-fade-up" style={{ animationDelay: '400ms' }}>
                  <div className="text-4xl font-bold mb-2">142TB</div>
                  <div className="text-sm text-muted-foreground">Average monthly data processed per miner</div>
                </div>
                
                <div className="glass rounded-xl p-6 border-t border-l border-white/20 shadow-glass animate-fade-up" style={{ animationDelay: '600ms' }}>
                  <div className="text-4xl font-bold mb-2">2,458</div>
                  <div className="text-sm text-muted-foreground">Active miners worldwide and growing</div>
                </div>
                
                <div className="glass rounded-xl p-6 border-t border-l border-white/20 shadow-glass animate-fade-up" style={{ animationDelay: '800ms' }}>
                  <div className="text-4xl font-bold mb-2">99.8%</div>
                  <div className="text-sm text-muted-foreground">Average network uptime</div>
                </div>
                
                <div className="glass rounded-xl p-6 border-t border-l border-white/20 shadow-glass animate-fade-up" style={{ animationDelay: '1000ms' }}>
                  <div className="text-4xl font-bold mb-2">12hrs</div>
                  <div className="text-sm text-muted-foreground">Average setup time for new miners</div>
                </div>
                
                <div className="glass rounded-xl p-6 border-t border-l border-white/20 shadow-glass animate-fade-up" style={{ animationDelay: '1200ms' }}>
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Real-time monitoring and analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
