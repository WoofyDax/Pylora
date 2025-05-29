import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CreditCard, DollarSign, Download, Filter, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define types for our data
interface Reward {
  id: string;
  user_id: string;
  miner_id: string;
  amount: number;
  description: string;
  status: string;
  transaction_type: string;
  created_at: string;
  updated_at: string;
}

interface Miner {
  id: string;
  name: string;
}

const Rewards = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [yearlyEarnings, setYearlyEarnings] = useState(0);
  const [pendingPayout, setPendingPayout] = useState(0);
  const [monthlyTarget] = useState(500); // This could be fetched from user settings in the future
  
  // Fetch rewards data
  const { data: rewards, isLoading: isLoadingRewards } = useQuery({
    queryKey: ['rewards', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching rewards:', error);
        toast({
          title: 'Error',
          description: 'Failed to load rewards data',
          variant: 'destructive',
        });
        return [];
      }
      
      return data as Reward[];
    },
    enabled: !!user,
  });

  // Fetch miners data for displaying names
  const { data: miners } = useQuery({
    queryKey: ['miners', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('miners')
        .select('id, name')
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error fetching miners:', error);
        return [];
      }
      
      return data as Miner[];
    },
    enabled: !!user,
  });

  // Process withdraw mutation
  const withdrawMutation = useMutation({
    mutationFn: async (amount: number) => {
      if (!user) throw new Error('User not authenticated');
      
      // Create a withdrawal transaction in the rewards table
      const { data, error } = await supabase
        .from('rewards')
        .insert({
          user_id: user.id,
          amount: amount,
          description: 'Withdrawal to bank account',
          status: 'processing',
          transaction_type: 'debit',
          miner_id: null
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards', user?.id] });
      toast({
        title: 'Withdrawal Initiated',
        description: `Your withdrawal of $${pendingPayout.toFixed(2)} has been initiated. It will be processed within 24 hours.`,
      });
    },
    onError: (error) => {
      console.error('Withdrawal error:', error);
      toast({
        title: 'Withdrawal Failed',
        description: 'There was an error processing your withdrawal. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Process add reward mutation
  const addRewardMutation = useMutation({
    mutationFn: async (newReward: Omit<Reward, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('rewards')
        .insert({
          user_id: user.id,
          miner_id: newReward.miner_id,
          amount: newReward.amount,
          description: newReward.description,
          transaction_type: newReward.transaction_type
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards', user?.id] });
      toast({
        title: 'Reward Added',
        description: 'Your reward has been added successfully.',
      });
    },
    onError: (error) => {
      console.error('Add reward error:', error);
      toast({
        title: 'Reward Addition Failed',
        description: 'There was an error adding your reward. Please try again.',
        variant: 'destructive',
      });
    }
  });

  // Calculate earnings summaries when rewards data changes
  useEffect(() => {
    if (!rewards) return;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Calculate monthly earnings
    const thisMonthRewards = rewards.filter(reward => {
      const rewardDate = new Date(reward.created_at);
      return rewardDate.getMonth() === currentMonth && 
             rewardDate.getFullYear() === currentYear &&
             reward.transaction_type === 'credit';
    });
    
    const thisMonthTotal = thisMonthRewards.reduce((sum, reward) => 
      sum + (reward.transaction_type === 'credit' ? reward.amount : 0), 0);
    
    // Calculate yearly earnings
    const thisYearRewards = rewards.filter(reward => {
      const rewardDate = new Date(reward.created_at);
      return rewardDate.getFullYear() === currentYear &&
             reward.transaction_type === 'credit';
    });
    
    const thisYearTotal = thisYearRewards.reduce((sum, reward) => 
      sum + (reward.transaction_type === 'credit' ? reward.amount : 0), 0);
    
    // Calculate pending payout (all pending credits minus pending debits)
    const pendingRewards = rewards.filter(reward => 
      reward.status === 'pending' || reward.status === 'processing'
    );
    
    const pendingTotal = pendingRewards.reduce((sum, reward) => 
      reward.transaction_type === 'credit' 
        ? sum + reward.amount 
        : sum - reward.amount, 0);
    
    setMonthlyEarnings(thisMonthTotal);
    setYearlyEarnings(thisYearTotal);
    setPendingPayout(Math.max(0, pendingTotal)); // Ensure we don't show negative pending amount
    
  }, [rewards]);

  const handleWithdraw = () => {
    if (pendingPayout <= 0) {
      toast({
        title: 'No Funds Available',
        description: 'You do not have any funds available for withdrawal.',
        variant: 'destructive',
      });
      return;
    }
    
    withdrawMutation.mutate(pendingPayout);
  };
  
  // Helper function to get miner name from ID
  const getMinerName = (minerId: string | null) => {
    if (!minerId || !miners) return 'System';
    const miner = miners.find(m => m.id === minerId);
    return miner ? miner.name : 'Unknown Miner';
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get appropriate icon and color based on transaction status and type
  const getTransactionIcon = (reward: Reward) => {
    if (reward.transaction_type === 'debit') {
      return <CreditCard className="h-5 w-5 text-blue-600" />;
    }
    
    if (reward.status === 'pending' || reward.status === 'processing') {
      return <Clock className="h-5 w-5 text-amber-600" />;
    }
    
    if (reward.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    
    if (reward.status === 'failed') {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
    
    return <DollarSign className="h-5 w-5 text-mint-dark" />;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Rewards</h1>
            <p className="text-muted-foreground">
              Track and manage your earnings from network participation
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {isLoadingRewards ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-mint-dark border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="animate-fade-up">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-mint-dark" />
                    <div className="text-2xl font-bold">${monthlyEarnings.toFixed(2)}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Current month earnings</p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-up" style={{ animationDelay: '100ms' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Yearly Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-mint-dark" />
                    <div className="text-2xl font-bold">${yearlyEarnings.toFixed(2)}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Year to date</p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-up" style={{ animationDelay: '200ms' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Payout
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-mint-dark" />
                    <div className="text-2xl font-bold">${pendingPayout.toFixed(2)}</div>
                  </div>
                  <div className="mt-2">
                    <Button 
                      size="sm" 
                      className="w-full bg-mint-dark hover:bg-mint text-white"
                      onClick={handleWithdraw}
                      disabled={pendingPayout <= 0 || withdrawMutation.isPending}
                    >
                      {withdrawMutation.isPending ? 'Processing...' : 'Withdraw'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-8 animate-fade-up">
              <CardHeader>
                <CardTitle>Earnings Progress</CardTitle>
                <CardDescription>
                  Track your earnings towards the next payout threshold
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Monthly Target: ${monthlyTarget.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        ${monthlyEarnings.toFixed(2)} earned (${(monthlyTarget - monthlyEarnings).toFixed(2)} remaining)
                      </p>
                    </div>
                    <Badge variant="outline">{Math.round((monthlyEarnings / monthlyTarget) * 100)}%</Badge>
                  </div>
                  <Progress value={(monthlyEarnings / monthlyTarget) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <div className="mb-8">
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Transaction History</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {rewards && rewards.length > 0 ? (
                        <div className="space-y-4">
                          {rewards.map((reward, index) => (
                            <div 
                              key={reward.id} 
                              className="flex items-center justify-between p-4 border rounded-lg animate-fade-up"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${
                                  reward.transaction_type === 'debit' 
                                    ? 'bg-blue-100' 
                                    : reward.status === 'pending' || reward.status === 'processing'
                                      ? 'bg-amber-100'
                                      : reward.status === 'completed'
                                        ? 'bg-green-100'
                                        : 'bg-red-100'
                                }`}>
                                  {getTransactionIcon(reward)}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {reward.transaction_type === 'debit' 
                                      ? 'Withdrawal' 
                                      : 'Miner Reward'}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatDate(reward.created_at)} • {getMinerName(reward.miner_id)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-medium ${
                                  reward.transaction_type === 'credit' 
                                    ? 'text-green-600' 
                                    : ''
                                }`}>
                                  {reward.transaction_type === 'credit' ? '+' : '-'}${reward.amount.toFixed(2)}
                                </p>
                                <Badge variant="outline" className="mt-1">
                                  {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No transactions found</p>
                        </div>
                      )}
                    </CardContent>
                    {rewards && rewards.length > 0 && (
                      <CardFooter className="flex justify-center">
                        <Button variant="outline" size="sm">
                          Load More
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="pending" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {rewards && rewards.filter(r => r.status === 'pending' || r.status === 'processing').length > 0 ? (
                        <div className="space-y-4">
                          {rewards
                            .filter(r => r.status === 'pending' || r.status === 'processing')
                            .map((reward, index) => (
                              <div 
                                key={reward.id} 
                                className="flex items-center justify-between p-4 border rounded-lg animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="bg-amber-100 p-2 rounded-full">
                                    <Clock className="h-5 w-5 text-amber-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {reward.transaction_type === 'debit' 
                                        ? 'Withdrawal' 
                                        : 'Miner Reward'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {formatDate(reward.created_at)} • {getMinerName(reward.miner_id)}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`font-medium ${
                                    reward.transaction_type === 'credit' 
                                      ? 'text-amber-600' 
                                      : ''
                                  }`}>
                                    {reward.transaction_type === 'credit' ? '+' : '-'}${reward.amount.toFixed(2)}
                                  </p>
                                  <Badge variant="outline" className="mt-1">Pending</Badge>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No pending transactions</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="completed" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {rewards && rewards.filter(r => r.status === 'completed').length > 0 ? (
                        <div className="space-y-4">
                          {rewards
                            .filter(r => r.status === 'completed')
                            .map((reward, index) => (
                              <div 
                                key={reward.id} 
                                className="flex items-center justify-between p-4 border rounded-lg animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`p-2 rounded-full ${
                                    reward.transaction_type === 'debit' 
                                      ? 'bg-blue-100' 
                                      : 'bg-green-100'
                                  }`}>
                                    {reward.transaction_type === 'debit' 
                                      ? <CreditCard className="h-5 w-5 text-blue-600" />
                                      : <CheckCircle className="h-5 w-5 text-green-600" />
                                    }
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {reward.transaction_type === 'debit' 
                                        ? 'Withdrawal' 
                                        : 'Miner Reward'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {formatDate(reward.created_at)} • {getMinerName(reward.miner_id)}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`font-medium ${
                                    reward.transaction_type === 'credit' 
                                      ? 'text-green-600' 
                                      : ''
                                  }`}>
                                    {reward.transaction_type === 'credit' ? '+' : '-'}${reward.amount.toFixed(2)}
                                  </p>
                                  <Badge variant="outline" className="mt-1">Completed</Badge>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No completed transactions</p>
                        </div>
                      )}
                    </CardContent>
                    {rewards && rewards.filter(r => r.status === 'completed').length > 5 && (
                      <CardFooter className="flex justify-center">
                        <Button variant="outline" size="sm">
                          Load More
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Rewards;
