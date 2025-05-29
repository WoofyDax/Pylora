
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Smartphone, Signal, BarChart3, PlusCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define types for SIM card data
interface SimCard {
  id: string;
  user_id: string;
  number: string;
  plan: string;
  status: string;
  data_used: number;
  data_limit: number;
  activation_date: string;
  created_at: string;
  updated_at: string;
}

const SimCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [simNumber, setSimNumber] = useState('');
  const [simPlan, setSimPlan] = useState('basic');
  const [dataLimit, setDataLimit] = useState(10);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query to fetch SIM cards
  const { data: simCards, isLoading } = useQuery({
    queryKey: ['simCards', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      try {
        const { data, error } = await supabase
          .from('sim_cards')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error('Error fetching SIM cards:', error);
        toast({
          title: 'Error',
          description: 'Failed to load SIM cards. Please try again.',
          variant: 'destructive',
        });
        return [];
      }
    },
    enabled: !!user,
  });

  // Mutation to add a new SIM card
  const addSimCardMutation = useMutation({
    mutationFn: async (newSimCard: Omit<SimCard, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'activation_date' | 'data_used'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('sim_cards')
        .insert({
          user_id: user.id,
          number: newSimCard.number,
          plan: newSimCard.plan,
          status: 'active',
          data_limit: newSimCard.data_limit,
          data_used: 0
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simCards', user?.id] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'SIM card added successfully.',
      });
    },
    onError: (error) => {
      console.error('Error adding SIM card:', error);
      toast({
        title: 'Error',
        description: 'Failed to add SIM card. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Reset form fields
  const resetForm = () => {
    setSimNumber('');
    setSimPlan('basic');
    setDataLimit(10);
  };

  // Handle form submission
  const handleAddSimCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!simNumber.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a SIM card number.',
        variant: 'destructive',
      });
      return;
    }

    const newSimCard = {
      number: simNumber,
      plan: simPlan,
      data_limit: dataLimit,
      status: 'active'
    };

    addSimCardMutation.mutate(newSimCard);
  };

  // Generate a random data value for demo
  const generateRandomData = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  // Format the plan name for display
  const formatPlanName = (plan: string) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">Your SIM Cards</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-mint-dark hover:bg-mint text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add SIM Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a New SIM Card</DialogTitle>
                <DialogDescription>
                  Enter the details for your new SIM card below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSimCard}>
                <div className="space-y-4 py-4">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="simNumber">SIM Card Number</Label>
                    <Input
                      id="simNumber"
                      placeholder="e.g., 12345678900"
                      value={simNumber}
                      onChange={(e) => setSimNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="simPlan">Plan Type</Label>
                    <Select value={simPlan} onValueChange={setSimPlan}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="dataLimit">Data Limit (GB)</Label>
                    <Input
                      id="dataLimit"
                      type="number"
                      min="1"
                      value={dataLimit}
                      onChange={(e) => setDataLimit(Number(e.target.value))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addSimCardMutation.isPending}>
                    {addSimCardMutation.isPending ? 'Adding...' : 'Add SIM Card'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-mint-dark border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simCards && simCards.length > 0 ? (
              simCards.map((simCard: SimCard) => (
                <Card key={simCard.id} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <div className={`h-3 w-3 rounded-full ${simCard.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      {simCard.number}
                    </CardTitle>
                    <CardDescription>
                      {formatPlanName(simCard.plan)} - {simCard.status}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Data Used</div>
                      <div className="text-sm font-medium">
                        {simCard.data_used} / {simCard.data_limit} GB
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-mint-dark"
                        style={{ width: `${(simCard.data_used / simCard.data_limit) * 100}%` }}
                      ></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full">
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Smartphone className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No SIM Cards Found</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      You don't have any SIM cards associated with your account.
                    </p>
                    <Button 
                      variant="outline" 
                      className="bg-mint-dark text-white hover:bg-mint"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      <Signal className="h-4 w-4 mr-2" />
                      Get a SIM Card
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SimCards;
