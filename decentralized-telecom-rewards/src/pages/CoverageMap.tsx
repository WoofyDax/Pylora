
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapboxNetworkMap } from '@/components/MapboxNetworkMap';

const CoverageMap = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex flex-col mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Coverage Map</h1>
          <p className="text-muted-foreground max-w-3xl">
            View our network coverage across the country. Our distributed network provides reliable connectivity for IoT devices and mobile users.
          </p>
        </div>

        <Card className="mb-8 animate-fade-up">
          <CardHeader className="pb-2">
            <CardTitle>Network Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md relative">
              <MapboxNetworkMap />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-up">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Coverage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">States Covered</span>
                  <span className="font-medium">42</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Cities Covered</span>
                  <span className="font-medium">428</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Population Covered</span>
                  <span className="font-medium">245M+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Coverage Area</span>
                  <span className="font-medium">3.2M sq miles</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Network Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">5G</span>
                  <span className="font-medium">187 cities</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">LTE</span>
                  <span className="font-medium">428 cities</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">CBRS</span>
                  <span className="font-medium">315 cities</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">IoT Specific</span>
                  <span className="font-medium">385 cities</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Expansion Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Next 3 Months</span>
                  <span className="font-medium">+28 cities</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Next 6 Months</span>
                  <span className="font-medium">+75 cities</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Next 12 Months</span>
                  <span className="font-medium">+200 cities</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Rural Coverage</span>
                  <span className="font-medium">+40% increase</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CoverageMap;
