
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ArrowRight, Signal } from 'lucide-react';

const pricingPlans = [
  {
    name: "Starter Miner",
    price: "$599",
    description: "Perfect for individuals looking to join the network",
    features: [
      "1 CBRS Small Cell Miner",
      "2-4 mile coverage radius",
      "Automatic rewards distribution",
      "Basic dashboard access",
      "Email support"
    ],
    highlight: false,
    cta: "Get Started"
  },
  {
    name: "Pro Miner",
    price: "$1,299",
    description: "Ideal for serious miners looking to maximize rewards",
    features: [
      "1 CBRS Mid-Range Miner",
      "5-8 mile coverage radius",
      "Priority rewards distribution",
      "Advanced analytics dashboard",
      "Priority email & chat support",
      "Automated optimization tools"
    ],
    highlight: true,
    cta: "Buy Pro"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For businesses looking to deploy multiple miners",
    features: [
      "Multiple CBRS miners",
      "Custom coverage planning",
      "Dedicated rewards pool",
      "Team dashboard with permissions",
      "24/7 dedicated support",
      "Custom API integration",
      "On-site installation assistance"
    ],
    highlight: false,
    cta: "Contact Sales"
  }
];

const Pricing = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-silver-light to-background -z-10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-mint-light/20 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Simple, Transparent <span className="text-mint-dark">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the right miner package for your needs and start earning rewards
              while contributing to our decentralized network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`border ${plan.highlight ? 'border-mint-dark shadow-xl shadow-mint-light/20' : 'border-border'} relative animate-fade-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-mint-dark text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground ml-2">one-time purchase</span>
                    )}
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-mint-dark mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full rounded-full ${plan.highlight ? 'bg-mint-dark hover:bg-mint text-white' : ''}`}
                    variant={plan.highlight ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="glass rounded-2xl border border-silver p-8 shadow-xl max-w-4xl mx-auto animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Rewards Calculator</h2>
                <p className="text-muted-foreground mb-6">
                  Estimate your potential monthly earnings based on your location and the miner you choose.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-mint-dark mr-2"></div>
                    <span>Urban Area</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Suburban</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                    <span>Rural</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-xl p-6 border border-silver/50">
                <div className="text-center space-y-6">
                  <Signal className="h-8 w-8 text-mint-dark mx-auto" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Average Monthly Earnings</div>
                    <div className="text-4xl font-bold">$350 - $950</div>
                    <div className="text-sm text-muted-foreground mt-1">Based on urban location & Pro Miner</div>
                  </div>
                  <Button className="w-full rounded-full bg-mint-dark hover:bg-mint text-white">
                    Calculate Your Earnings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-24 animate-fade-up">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How do rewards work?",
                  a: "Miners earn rewards based on their uptime, the amount of data they process, and the quality of service they provide. Rewards are automatically distributed to your account on a weekly basis."
                },
                {
                  q: "What are the ongoing costs?",
                  a: "The only ongoing cost is the electricity to power your miner, which typically costs less than $10 per month. There are no subscription fees or hidden charges."
                },
                {
                  q: "How much internet bandwidth do I need?",
                  a: "We recommend at least 50Mbps download and 10Mbps upload speeds for optimal performance. The miner connects to your existing internet connection."
                },
                {
                  q: "Do I need technical expertise to set up a miner?",
                  a: "No, our miners are designed for easy setup. Most customers can complete the installation in under 15 minutes with our step-by-step guide."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-border pb-6 last:border-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
