
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Briefcase, MapPin, Clock, Globe } from 'lucide-react';

interface JobListing {
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  remote: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  category: 'Engineering' | 'Product' | 'Business' | 'Operations';
}

const jobListings: JobListing[] = [
  {
    title: "Senior Blockchain Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: true,
    description: "We're looking for an experienced blockchain engineer to help build our decentralized network infrastructure and token ecosystem.",
    responsibilities: [
      "Design and implement blockchain protocols for network incentives and governance",
      "Develop smart contracts for network operations and token management",
      "Collaborate with the network team to integrate blockchain components",
      "Optimize performance and security of blockchain infrastructure"
    ],
    requirements: [
      "5+ years of experience in blockchain development",
      "Strong knowledge of Ethereum, Solidity, and Web3 technologies",
      "Experience with developing and auditing smart contracts",
      "Understanding of consensus mechanisms and blockchain scalability"
    ],
    category: "Engineering"
  },
  {
    title: "5G Network Engineer",
    department: "Engineering",
    location: "Boston, MA",
    type: "Full-time",
    remote: false,
    description: "Join our team to help design and optimize our decentralized 5G network architecture for maximum coverage and performance.",
    responsibilities: [
      "Design and optimize 5G network architecture for decentralized deployment",
      "Develop software for managing network nodes and connectivity",
      "Create tools for network monitoring and performance analysis",
      "Collaborate with hardware team on miner specifications"
    ],
    requirements: [
      "4+ years of experience in telecommunications engineering",
      "Expertise in 5G technologies and standards",
      "Experience with network optimization and monitoring",
      "Knowledge of software-defined networking (SDN)"
    ],
    category: "Engineering"
  },
  {
    title: "Product Manager, Miner Hardware",
    department: "Product",
    location: "Austin, TX",
    type: "Full-time",
    remote: true,
    description: "Lead the development and lifecycle management of our miner hardware products, from concept to market.",
    responsibilities: [
      "Define product roadmap for miner hardware and accessories",
      "Work with engineering teams to develop specifications and features",
      "Manage product lifecycle from concept to production",
      "Gather market feedback to inform product iterations"
    ],
    requirements: [
      "3+ years of experience in hardware product management",
      "Background in telecommunications or IoT products",
      "Experience managing hardware development cycles",
      "Strong analytical and communication skills"
    ],
    category: "Product"
  },
  {
    title: "Community Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    remote: true,
    description: "Build and nurture our global community of miners, users, and enthusiasts to drive network growth and adoption.",
    responsibilities: [
      "Develop and implement community engagement strategies",
      "Manage social media channels and community forums",
      "Create content to educate and engage community members",
      "Organize community events and meetups (virtual and in-person)"
    ],
    requirements: [
      "2+ years of experience in community management",
      "Excellent communication and interpersonal skills",
      "Experience with Web3 or telecommunications communities",
      "Ability to create compelling content across platforms"
    ],
    category: "Business"
  },
  {
    title: "Business Development Representative",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    remote: true,
    description: "Identify and pursue partnership opportunities to expand our network coverage and business reach.",
    responsibilities: [
      "Identify and qualify potential partners and customers",
      "Develop relationships with telecommunications companies and businesses",
      "Create partnership proposals and presentations",
      "Collaborate with product and engineering teams on partnership requirements"
    ],
    requirements: [
      "3+ years of experience in business development or sales",
      "Strong network in telecommunications or technology",
      "Excellent negotiation and communication skills",
      "Experience with partnership development and management"
    ],
    category: "Business"
  },
  {
    title: "Operations Coordinator",
    department: "Operations",
    location: "Chicago, IL",
    type: "Full-time",
    remote: false,
    description: "Help manage our day-to-day operations, including miner logistics, shipping, and supply chain coordination.",
    responsibilities: [
      "Coordinate miner deployment and logistics",
      "Manage relationships with manufacturing and shipping partners",
      "Monitor and optimize supply chain operations",
      "Support customer service team with technical inquiries"
    ],
    requirements: [
      "2+ years of experience in operations or logistics",
      "Strong organizational and problem-solving skills",
      "Experience with inventory and supply chain management",
      "Excellent attention to detail and follow-through"
    ],
    category: "Operations"
  }
];

const Careers = () => {
  return (
    <Layout>
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="bg-silver-light/50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 animate-fade-right">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  We're looking for passionate individuals to help us build the future of decentralized connectivity. Join our team and make a global impact.
                </p>
                <Button className="bg-mint-dark hover:bg-mint text-white">
                  View Open Positions
                </Button>
              </div>
              <div className="lg:w-1/2 animate-fade-left">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Team working together" 
                    className="w-full object-cover h-[400px]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Culture Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Culture</h2>
              <p className="text-lg text-muted-foreground">
                At our company, we're building more than technology—we're building a community united by a shared vision.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-xl animate-fade-up">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Innovation First</h3>
                  <p className="text-muted-foreground">
                    We encourage creative thinking and bold ideas at every level. Our team is constantly pushing the boundaries of what's possible in decentralized network technology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-xl animate-fade-up" style={{ animationDelay: '200ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Global Impact</h3>
                  <p className="text-muted-foreground">
                    Our work has the potential to transform connectivity worldwide. We're motivated by the opportunity to create positive change on a global scale.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-xl animate-fade-up" style={{ animationDelay: '400ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
                  <p className="text-muted-foreground">
                    We value collaboration, transparency, and community input. Our team works closely with our global network of miners and users to shape our direction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-silver-light/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Benefits & Perks</h2>
              <p className="text-lg text-muted-foreground">
                We take care of our team with competitive benefits and a supportive work environment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-0 shadow-sm animate-fade-up">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Competitive Compensation</h3>
                  <p className="text-sm text-muted-foreground">
                    Salary, equity options, and performance bonuses to reward your contributions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '100ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Comprehensive Healthcare</h3>
                  <p className="text-sm text-muted-foreground">
                    Medical, dental, and vision coverage for you and your dependents.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '200ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Flexible Work</h3>
                  <p className="text-sm text-muted-foreground">
                    Remote-friendly culture with flexible hours to accommodate your lifestyle.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '300ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Learning & Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Budget for courses, conferences, and resources to support your growth.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '400ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Wellness Programs</h3>
                  <p className="text-sm text-muted-foreground">
                    Mental health support, fitness stipends, and wellness initiatives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '500ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Generous Time Off</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlimited PTO policy that encourages rest and recharging.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '600ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Retirement Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    401(k) matching program to help you save for the future.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm animate-fade-up" style={{ animationDelay: '700ms' }}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Home Office Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Stipend for creating a comfortable and productive workspace.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Open Positions Section */}
        <section className="py-20" id="openPositions">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 animate-fade-up">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground">
                Join our team and help us build the future of decentralized connectivity.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full animate-fade-up">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Engineering">Engineering</TabsTrigger>
                <TabsTrigger value="Product">Product</TabsTrigger>
                <TabsTrigger value="Business">Business</TabsTrigger>
                <TabsTrigger value="Operations">Operations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {jobListings.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="Engineering" className="space-y-4">
                {jobListings.filter(job => job.category === "Engineering").map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="Product" className="space-y-4">
                {jobListings.filter(job => job.category === "Product").map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="Business" className="space-y-4">
                {jobListings.filter(job => job.category === "Business").map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </TabsContent>
              
              <TabsContent value="Operations" className="space-y-4">
                {jobListings.filter(job => job.category === "Operations").map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const JobCard = ({ job }: { job: JobListing }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-up">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-1">{job.department}</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            Apply
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase size={14} className="mr-1" />
            {job.type}
          </div>
          {job.remote && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Globe size={14} className="mr-1" />
              Remote
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground mb-4">{job.description}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Responsibilities:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Requirements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {job.requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Careers;
