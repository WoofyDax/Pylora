
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Signal } from 'lucide-react';

export const NetworkMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // This is just a placeholder for an actual map implementation
  useEffect(() => {
    if (!mapRef.current) return;
    
    // In a real implementation, we would initialize a map library here
    // For now, let's create a stylized placeholder
    const createPlaceholderMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;
      
      // Style the placeholder
      mapElement.className = "w-full h-full rounded-xl bg-gradient-to-br from-silver-light to-silver";
      
      // Add some "pins" to represent miners
      const pins = [
        { top: '20%', left: '30%' },
        { top: '50%', left: '70%' },
        { top: '30%', left: '60%' },
        { top: '60%', left: '40%' },
        { top: '25%', left: '80%' },
        { top: '70%', left: '25%' },
        { top: '40%', left: '20%' },
        { top: '65%', left: '65%' },
      ];
      
      pins.forEach((position, index) => {
        const pinElement = document.createElement('div');
        pinElement.className = "absolute w-3 h-3 bg-mint-dark rounded-full shadow-neon transform -translate-x-1/2 -translate-y-1/2";
        pinElement.style.top = position.top;
        pinElement.style.left = position.left;
        
        // Add pulse animation to some pins
        if (index % 2 === 0) {
          const pulse = document.createElement('div');
          pulse.className = "absolute w-full h-full rounded-full bg-mint-dark/50 animate-ping";
          pinElement.appendChild(pulse);
        }
        
        mapElement.appendChild(pinElement);
      });
    };
    
    createPlaceholderMap();
  }, []);
  
  return (
    <section className="py-20 bg-silver-light/50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Network Coverage</h2>
          <p className="text-lg text-muted-foreground">
            See our growing network of miners providing 5G coverage across the globe.
            Join the revolution and help us expand to new areas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl h-[400px] md:h-[500px] overflow-hidden animate-fade-up">
              <CardContent className="p-0 h-full">
                {/* Map placeholder - would be replaced with actual map in production */}
                <div ref={mapRef} className="relative w-full h-full"></div>
                
                {/* Map controls overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm px-3 py-1.5">
                    <Signal className="h-4 w-4 mr-1 text-mint-dark" />
                    <span>2,458 Active Miners</span>
                  </Badge>
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm px-3 py-1.5">
                    <MapPin className="h-4 w-4 mr-1 text-mint-dark" />
                    <span>78 Countries</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border border-border/50 shadow-sm animate-fade-up" style={{ animationDelay: '200ms' }}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Network Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Miners</span>
                    <span className="font-medium">2,458</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Data Processed</span>
                    <span className="font-medium">1.8 PB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Network Uptime</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Rewards Paid</span>
                    <span className="font-medium">$1.2M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border/50 shadow-sm animate-fade-up" style={{ animationDelay: '400ms' }}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Top Performing Areas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-mint-dark">1</Badge>
                      <span>San Francisco, USA</span>
                    </div>
                    <span className="text-sm text-muted-foreground">187 miners</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-charcoal-light">2</Badge>
                      <span>Seoul, South Korea</span>
                    </div>
                    <span className="text-sm text-muted-foreground">143 miners</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-charcoal-light">3</Badge>
                      <span>London, UK</span>
                    </div>
                    <span className="text-sm text-muted-foreground">112 miners</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
