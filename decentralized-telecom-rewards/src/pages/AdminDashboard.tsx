
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Server, Signal, Shield, BarChart3, 
  AlertTriangle, CheckCircle, Settings, Download, 
  RefreshCw, Search, UserPlus, Wifi
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeUsers, setActiveUsers] = useState(154);
  const [networkNodes, setNetworkNodes] = useState(428);
  const [systemAlerts, setSystemAlerts] = useState(3);
  const [systemHealth, setSystemHealth] = useState(98.2);
  
  const handleRefresh = () => {
    toast({
      title: "Dashboard Refreshed",
      description: "Admin dashboard data has been refreshed.",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              System overview and management
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-mint-dark hover:bg-mint text-white">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-up">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-mint-dark" />
                <div className="text-2xl font-bold">{activeUsers}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+12 in the last hour</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Network Nodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-mint-dark" />
                <div className="text-2xl font-bold">{networkNodes}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{networkNodes - 8} online, 8 offline</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div className="text-2xl font-bold">{systemAlerts}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">2 warnings, 1 critical</p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">{systemHealth}%</div>
                <Badge className="bg-green-500 hover:bg-green-600">Healthy</Badge>
              </div>
              <Progress value={systemHealth} className="h-2" />
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="users" className="text-sm">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="miners" className="text-sm">
                <Signal className="mr-2 h-4 w-4" />
                Miners
              </TabsTrigger>
              <TabsTrigger value="network" className="text-sm">
                <Wifi className="mr-2 h-4 w-4" />
                Network
              </TabsTrigger>
              <TabsTrigger value="security" className="text-sm">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-0">
              <Card className="animate-fade-up">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
                    <CardTitle>User Management</CardTitle>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search users..."
                          className="pl-8 w-[250px]"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Status</div>
                      <div>Role</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {/* User 1 */}
                    <div className="grid grid-cols-5 px-4 py-3 border-b">
                      <div>John Doe</div>
                      <div>john@example.com</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </div>
                      <div>Admin</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* User 2 */}
                    <div className="grid grid-cols-5 px-4 py-3 border-b">
                      <div>Jane Smith</div>
                      <div>jane@example.com</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </div>
                      <div>User</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* User 3 */}
                    <div className="grid grid-cols-5 px-4 py-3 border-b">
                      <div>Robert Johnson</div>
                      <div>robert@example.com</div>
                      <div>
                        <Badge variant="outline">Inactive</Badge>
                      </div>
                      <div>User</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* User 4 */}
                    <div className="grid grid-cols-5 px-4 py-3 border-b">
                      <div>Emily Davis</div>
                      <div>emily@example.com</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </div>
                      <div>Manager</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* User 5 */}
                    <div className="grid grid-cols-5 px-4 py-3">
                      <div>Michael Wilson</div>
                      <div>michael@example.com</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                      </div>
                      <div>User</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 154 users
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="miners" className="mt-0">
              <Card className="animate-fade-up">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
                    <CardTitle>Miner Management</CardTitle>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search miners..."
                          className="pl-8 w-[250px]"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 border-b px-4 py-3 font-medium">
                      <div>ID</div>
                      <div>Owner</div>
                      <div>Location</div>
                      <div>Status</div>
                      <div>Earnings</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {/* Miner 1 */}
                    <div className="grid grid-cols-6 px-4 py-3 border-b">
                      <div className="truncate">CBRS-001</div>
                      <div>John Doe</div>
                      <div>New York, NY</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                      </div>
                      <div>$237.45</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* Miner 2 */}
                    <div className="grid grid-cols-6 px-4 py-3 border-b">
                      <div className="truncate">CBRS-002</div>
                      <div>Jane Smith</div>
                      <div>San Francisco, CA</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                      </div>
                      <div>$192.39</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* Miner 3 */}
                    <div className="grid grid-cols-6 px-4 py-3 border-b">
                      <div className="truncate">CBRS-003</div>
                      <div>Robert Johnson</div>
                      <div>Chicago, IL</div>
                      <div>
                        <Badge variant="outline">Offline</Badge>
                      </div>
                      <div>$0.00</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* Miner 4 */}
                    <div className="grid grid-cols-6 px-4 py-3 border-b">
                      <div className="truncate">CBRS-004</div>
                      <div>Emily Davis</div>
                      <div>Austin, TX</div>
                      <div>
                        <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                      </div>
                      <div>$178.92</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    {/* Miner 5 */}
                    <div className="grid grid-cols-6 px-4 py-3">
                      <div className="truncate">CBRS-005</div>
                      <div>Michael Wilson</div>
                      <div>Seattle, WA</div>
                      <div>
                        <Badge className="bg-amber-500 hover:bg-amber-600">Maintenance</Badge>
                      </div>
                      <div>$47.21</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 428 miners
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="network" className="mt-0">
              <Card className="animate-fade-up">
                <CardHeader>
                  <CardTitle>Network Status</CardTitle>
                  <CardDescription>
                    Overview of network health and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Uptime Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Core Network</span>
                              <span>99.998%</span>
                            </div>
                            <Progress value={99.998} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Edge Nodes</span>
                              <span>99.82%</span>
                            </div>
                            <Progress value={99.82} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Public API</span>
                              <span>99.95%</span>
                            </div>
                            <Progress value={99.95} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Admin Services</span>
                              <span>100%</span>
                            </div>
                            <Progress value={100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Network Alerts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">High Latency Detected</p>
                              <p className="text-xs text-muted-foreground">East Coast region - 4h ago</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Node Connectivity Issues</p>
                              <p className="text-xs text-muted-foreground">Dallas, TX - 2h ago</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Bandwidth Throttling</p>
                              <p className="text-xs text-muted-foreground">West Coast region - 6h ago</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card className="animate-fade-up">
                <CardHeader>
                  <CardTitle>Security Overview</CardTitle>
                  <CardDescription>
                    System security status and recent events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Security Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-sm font-medium">Firewall</p>
                            </div>
                            <Badge className="bg-green-500 hover:bg-green-600">Secure</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-sm font-medium">Authentication</p>
                            </div>
                            <Badge className="bg-green-500 hover:bg-green-600">Secure</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              <p className="text-sm font-medium">Data Encryption</p>
                            </div>
                            <Badge className="bg-green-500 hover:bg-green-600">Secure</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                              <p className="text-sm font-medium">Software Updates</p>
                            </div>
                            <Badge className="bg-amber-500 hover:bg-amber-600">Updates Available</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Recent Security Events</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start p-3 bg-muted rounded-lg">
                            <div className="mr-3 mt-0.5">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Failed Login Attempts</p>
                              <p className="text-xs text-muted-foreground">Multiple attempts from IP 192.168.1.45</p>
                              <p className="text-xs text-muted-foreground mt-1">June 5, 2023 - 14:32</p>
                            </div>
                          </div>
                          <div className="flex items-start p-3 bg-muted rounded-lg">
                            <div className="mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Security Patch Applied</p>
                              <p className="text-xs text-muted-foreground">System upgraded to latest security patch</p>
                              <p className="text-xs text-muted-foreground mt-1">June 3, 2023 - 08:15</p>
                            </div>
                          </div>
                          <div className="flex items-start p-3 bg-muted rounded-lg">
                            <div className="mr-3 mt-0.5">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Unauthorized Access Attempt</p>
                              <p className="text-xs text-muted-foreground">Attempt to access admin panel from unknown IP</p>
                              <p className="text-xs text-muted-foreground mt-1">June 1, 2023 - 23:47</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
