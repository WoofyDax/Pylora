
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, MapPin, Signal, Wifi, Globe } from 'lucide-react';

const NetworkPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <Layout>
      <section className="pt-32 pb-20 md:pb-28 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-silver-light to-background -z-10" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-mint-light/20 to-transparent opacity-70 -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Network <span className="text-mint-dark">Coverage</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our growing decentralized 5G network and find coverage in your area.
            </p>
          </div>
          
          <div className="glass rounded-xl border border-silver/50 p-4 shadow-xl mb-12 animate-fade-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by city, state, or zip code"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-mint-dark hover:bg-mint text-white rounded-full">
                Find Coverage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mb-16 animate-fade-up">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="map" className="text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  Coverage Map
                </TabsTrigger>
                <TabsTrigger value="statistics" className="text-sm">
                  <Signal className="mr-2 h-4 w-4" />
                  Network Statistics
                </TabsTrigger>
                <TabsTrigger value="providers" className="text-sm">
                  <Wifi className="mr-2 h-4 w-4" />
                  Top Providers
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="animate-fade-up">
                <Card className="border border-border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Network Coverage Map</CardTitle>
                    <CardDescription>
                      Green areas indicate active coverage from our decentralized network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-lg overflow-hidden bg-silver/20 border border-border">
                      <div className="aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center max-w-md p-8">
                            <Globe className="h-16 w-16 mx-auto text-mint-dark mb-4" />
                            <h3 className="text-lg font-medium mb-2">Interactive Coverage Map</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Our interactive network map will be displayed here, showing real-time coverage from all miners in our network.
                            </p>
                            <Button variant="outline" size="sm" className="rounded-full">
                              View Full Screen
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="statistics" className="animate-fade-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Coverage Area
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">327 sq miles</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Active Miners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,458</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Network Uptime
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">99.8%</div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Network Growth</CardTitle>
                    <CardDescription>
                      Monthly growth of our decentralized network over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Signal className="h-12 w-12 mx-auto mb-4 text-mint-dark" />
                      <h3 className="text-lg font-medium mb-2">Network Growth Chart</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed statistics and growth charts will be displayed here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="providers" className="animate-fade-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Network Providers</CardTitle>
                    <CardDescription>
                      Miners contributing the most to our network coverage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-mint-light/50 flex items-center justify-center">
                              <Signal className="h-6 w-6 text-mint-dark" />
                            </div>
                            <div>
                              <h3 className="font-medium">Provider #{i}</h3>
                              <p className="text-sm text-muted-foreground">
                                {["San Francisco, CA", "Austin, TX", "New York, NY", "Seattle, WA", "Miami, FL"][i-1]}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{(500 - i * 50).toFixed(1)} TB</div>
                            <p className="text-sm text-muted-foreground">Data processed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Expand Our Network?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of miners who are earning rewards while providing coverage in their local areas.
            </p>
            <Button size="lg" className="rounded-full bg-mint-dark hover:bg-mint text-white px-8 h-12">
              Become a Provider
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NetworkPage;
