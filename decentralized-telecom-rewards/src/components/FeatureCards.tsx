
import { ArrowRight, Signal, Globe, Wifi, CreditCard } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
  {
    title: "Register Your Miner",
    description: "Connect your CBRS 430H Miner to our network and start providing 5G coverage in minutes.",
    icon: Signal,
    color: "bg-mint-light text-mint-dark",
    delay: "0ms"
  },
  {
    title: "Provide 5G Coverage",
    description: "Help build a decentralized telecom network while serving your local community.",
    icon: Wifi,
    color: "bg-blue-50 text-blue-500",
    delay: "200ms"
  },
  {
    title: "Global Connection",
    description: "Join miners worldwide in creating a truly decentralized and accessible network.",
    icon: Globe,
    color: "bg-purple-50 text-purple-500",
    delay: "400ms"
  },
  {
    title: "Automated Rewards",
    description: "Earn rewards based on uptime and data processed, with payments via Stripe.",
    icon: CreditCard,
    color: "bg-amber-50 text-amber-500",
    delay: "600ms"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Our platform makes it easy to join the decentralized telecom revolution,
            earn rewards, and help build the network of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-up group h-full"
              style={{ animationDelay: feature.delay }}
            >
              <CardHeader className="pb-2">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-primary group-hover:text-mint-dark transition-colors"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
