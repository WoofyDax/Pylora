
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";

// Update the Reward interface
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

const Dashboard = () => {
  const { user } = useAuth();
  
  // Update the fetchRewards function
  const { data: recentRewards, isLoading: isLoadingRewards } = useQuery({
    queryKey: ['recent-rewards', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) {
        throw error;
      }
      
      return data as Reward[];
    },
    enabled: !!user,
  });

  // Add the rest of your Dashboard component here
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>Earnings from your miners</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${recentRewards?.reduce((sum, reward) => sum + reward.amount, 0).toFixed(2) || "0.00"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Miners</CardTitle>
              <CardDescription>Currently operating miners</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Network Coverage</CardTitle>
              <CardDescription>Your contribution to the network</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12.4%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="rewards">
            <TabsList className="mb-4">
              <TabsTrigger value="rewards">Recent Rewards</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Rewards</CardTitle>
                  <CardDescription>Your latest earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingRewards ? (
                    <p>Loading rewards...</p>
                  ) : recentRewards && recentRewards.length > 0 ? (
                    <div className="space-y-4">
                      {recentRewards.map((reward) => (
                        <div key={reward.id} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{reward.description}</p>
                            <p className="text-sm text-gray-500">{new Date(reward.created_at).toLocaleDateString()}</p>
                          </div>
                          <p className="font-bold text-green-600">+${reward.amount.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No recent rewards found.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest network activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>No recent activities.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
