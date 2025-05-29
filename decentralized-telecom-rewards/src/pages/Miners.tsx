
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Signal, Settings, PlusCircle, Filter, Download, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the miner type
interface Miner {
  id: string;
  user_id: string;
  name: string;
  location: string;
  status: string;
  data_processed: number;
  rewards_earned: number;
  hardware_model?: string;
  created_at: string;
  updated_at: string;
}

const Miners = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [view, setView] = useState('grid');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [minerName, setMinerName] = useState('');
  const [minerLocation, setMinerLocation] = useState('');
  const [minerHardware, setMinerHardware] = useState('FreedomFi');
  
  // Query to fetch miners data
  const { data: miners, isLoading } = useQuery({
    queryKey: ['miners', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('miners')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) {
          throw error;
        }
        
        // Cast data to Miner[] to ensure hardware_model is recognized
        return data as Miner[];
      } catch (error) {
        console.error('Error fetching miners:', error);
        toast({
          title: 'Error',
          description: 'Failed to load miners data.',
          variant: 'destructive',
        });
        return [];
      }
    },
    enabled: !!user,
  });
  
  // Mutation to add a new miner
  const addMinerMutation = useMutation({
    mutationFn: async (newMiner: Omit<Miner, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'data_processed' | 'rewards_earned'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('miners')
        .insert({
          user_id: user.id,
          name: newMiner.name,
          location: newMiner.location,
          status: 'offline', // New miners start offline
          hardware_model: newMiner.hardware_model,
          data_processed: 0,
          rewards_earned: 0
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miners', user?.id] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Miner added successfully. You can now set it up.',
      });
    },
    onError: (error) => {
      console.error('Error adding miner:', error);
      toast({
        title: 'Error',
        description: 'Failed to add miner. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  // Reset form fields
  const resetForm = () => {
    setMinerName('');
    setMinerLocation('');
    setMinerHardware('FreedomFi');
  };
  
  // Handle form submission
  const handleAddMiner = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!minerName.trim() || !minerLocation.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all the fields.',
        variant: 'destructive',
      });
      return;
    }
    
    const newMiner = {
      name: minerName,
      location: minerLocation,
      hardware_model: minerHardware,
      status: 'offline'
    };
    
    addMinerMutation.mutate(newMiner);
  };
  
  // Update miner status
  const updateMinerStatusMutation = useMutation({
    mutationFn: async ({ minerId, status }: { minerId: string; status: string }) => {
      const { data, error } = await supabase
        .from('miners')
        .update({ status })
        .eq('id', minerId)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['miners', user?.id] });
      toast({
        title: 'Success',
        description: 'Miner status updated successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating miner status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update miner status. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  const handleAddMinerClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add a miner.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDialogOpen(true);
  };
  
  const getFilteredMiners = (status: string) => {
    if (!miners) return [];
    if (status === 'all') return miners;
    return miners.filter(miner => miner.status === status);
  };

  // Activate a miner (for demo purposes, in a real app this would integrate with real hardware)
  const activateMiner = (minerId: string) => {
    updateMinerStatusMutation.mutate({ minerId, status: 'active' });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Miners</h1>
            <p className="text-muted-foreground">
              Manage your network miners and optimize their performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-mint-dark hover:bg-mint text-white" onClick={handleAddMinerClick}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Miner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a New Miner</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new mining device below.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddMiner}>
                  <div className="space-y-4 py-4">
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="minerName">Miner Name</Label>
                      <Input
                        id="minerName"
                        placeholder="e.g., CBRS Miner #4"
                        value={minerName}
                        onChange={(e) => setMinerName(e.target.value)}
                      />
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="minerLocation">Location</Label>
                      <Input
                        id="minerLocation"
                        placeholder="e.g., Office Building"
                        value={minerLocation}
                        onChange={(e) => setMinerLocation(e.target.value)}
                      />
                    </div>
                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="minerHardware">Hardware Model</Label>
                      <Select value={minerHardware} onValueChange={setMinerHardware}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a hardware model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FreedomFi">FreedomFi</SelectItem>
                          <SelectItem value="BaiCells">BaiCells</SelectItem>
                          <SelectItem value="Helium">Helium</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={addMinerMutation.isPending}>
                      {addMinerMutation.isPending ? 'Adding...' : 'Add Miner'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-mint-dark border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="mb-8">
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Miners</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
              
              <div className="flex justify-end mb-4">
                <div className="flex bg-muted rounded-md overflow-hidden">
                  <Button 
                    variant={view === 'grid' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setView('grid')}
                    className="rounded-none px-3"
                  >
                    <Signal className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={view === 'analytics' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setView('analytics')}
                    className="rounded-none px-3"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {miners && miners.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredMiners('all').map((miner, index) => (
                      <Card key={miner.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{miner.name}</CardTitle>
                              <CardDescription>{miner.hardware_model || 'Unknown Hardware'}</CardDescription>
                            </div>
                            <Badge className={miner.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}>
                              {miner.status === 'active' ? 'Online' : 'Offline'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <span className="font-medium">{miner.status.charAt(0).toUpperCase() + miner.status.slice(1)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Location</span>
                              <span>{miner.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Data Processed</span>
                              <span>{miner.data_processed} GB</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Earnings</span>
                              <span className="font-medium">${miner.rewards_earned.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 flex space-x-2">
                              <Button variant="outline" size="sm" className="w-full">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage
                              </Button>
                              {miner.status === 'offline' ? (
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="w-full bg-mint-dark hover:bg-mint"
                                  onClick={() => activateMiner(miner.id)}
                                >
                                  Activate
                                </Button>
                              ) : (
                                <Button 
                                  variant="default" 
                                  size="sm" 
                                  className="w-full bg-mint-dark hover:bg-mint"
                                >
                                  Details
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center p-8">
                    <CardContent className="pt-8">
                      <Signal className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No Miners Found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You don't have any miners set up yet. Add your first miner to get started.
                      </p>
                      <Button 
                        className="bg-mint-dark hover:bg-mint text-white" 
                        onClick={handleAddMinerClick}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Your First Miner
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="active" className="mt-0">
                {getFilteredMiners('active').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredMiners('active').map((miner, index) => (
                      <Card key={miner.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{miner.name}</CardTitle>
                              <CardDescription>{miner.hardware_model || 'Unknown Hardware'}</CardDescription>
                            </div>
                            <Badge className="bg-green-500 hover:bg-green-600">Online</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <span className="font-medium">Active</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Location</span>
                              <span>{miner.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Data Processed</span>
                              <span>{miner.data_processed} GB</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Earnings</span>
                              <span className="font-medium">${miner.rewards_earned.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 flex space-x-2">
                              <Button variant="outline" size="sm" className="w-full">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage
                              </Button>
                              <Button variant="default" size="sm" className="w-full bg-mint-dark hover:bg-mint">
                                Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 text-center h-32">
                    <p className="text-muted-foreground">No active miners found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="offline" className="mt-0">
                {getFilteredMiners('offline').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredMiners('offline').map((miner, index) => (
                      <Card key={miner.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{miner.name}</CardTitle>
                              <CardDescription>{miner.hardware_model || 'Unknown Hardware'}</CardDescription>
                            </div>
                            <Badge variant="outline">Offline</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <span className="font-medium text-muted-foreground">Offline</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Location</span>
                              <span>{miner.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Data Processed</span>
                              <span>{miner.data_processed} GB</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Earnings</span>
                              <span className="font-medium">${miner.rewards_earned.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 flex space-x-2">
                              <Button variant="outline" size="sm" className="w-full">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="w-full bg-mint-dark hover:bg-mint"
                                onClick={() => activateMiner(miner.id)}
                              >
                                Activate
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 text-center h-32">
                    <p className="text-muted-foreground">No offline miners found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="maintenance" className="mt-0">
                {getFilteredMiners('maintenance').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredMiners('maintenance').map((miner, index) => (
                      <Card key={miner.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{miner.name}</CardTitle>
                              <CardDescription>{miner.hardware_model || 'Unknown Hardware'}</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">Maintenance</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <span className="font-medium">Maintenance</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Location</span>
                              <span>{miner.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Data Processed</span>
                              <span>{miner.data_processed} GB</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Earnings</span>
                              <span className="font-medium">${miner.rewards_earned.toFixed(2)}</span>
                            </div>
                            <div className="pt-2 flex space-x-2">
                              <Button variant="outline" size="sm" className="w-full">
                                <Settings className="h-4 w-4 mr-2" />
                                Manage
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="w-full bg-mint-dark hover:bg-mint"
                                onClick={() => activateMiner(miner.id)}
                              >
                                Reactivate
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 text-center h-32">
                    <p className="text-muted-foreground">No miners currently in maintenance mode</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Miners;
