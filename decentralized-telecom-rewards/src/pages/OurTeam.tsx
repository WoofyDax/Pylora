
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Founder",
    bio: "Former telecommunications executive with 15 years of experience. Sarah founded our company with a vision to democratize connectivity through decentralization.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Technology Officer",
    bio: "Blockchain expert and network architect with a background in developing distributed systems. Michael leads our technical vision and roadmap.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Aisha Patel",
    role: "VP of Network Operations",
    bio: "Telecommunications veteran with expertise in deploying and managing complex network infrastructures across global markets.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "#"
    }
  },
  {
    name: "David Kim",
    role: "Chief Financial Officer",
    bio: "Former investment banker with expertise in cryptocurrency markets and technology venture funding. David oversees our financial strategy and growth.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Elena Sorokina",
    role: "VP of Community",
    bio: "With a background in community building for tech startups, Elena leads our efforts to grow and nurture our global community of miners and users.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "James Wilson",
    role: "Head of Hardware",
    bio: "Electronics engineer with a passion for building accessible technology. James leads our miner hardware development and manufacturing partnerships.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      github: "#",
      linkedin: "#"
    }
  },
  {
    name: "Olivia Martinez",
    role: "Legal Counsel",
    bio: "Specializing in telecommunications regulation and blockchain technology, Olivia navigates the complex regulatory landscape for our global operations.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "#"
    }
  },
  {
    name: "Thomas Lee",
    role: "Director of Marketing",
    bio: "With experience in both traditional and crypto marketing, Thomas crafts our brand strategy and leads our efforts to reach new audiences worldwide.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "#",
      linkedin: "#"
    }
  }
];

const OurTeam = () => {
  return (
    <Layout>
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="bg-silver-light/50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
              <p className="text-lg text-muted-foreground mb-8">
                The innovators, visionaries, and experts building the future of decentralized connectivity.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Members Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <div className="text-mint-dark font-medium mb-3">{member.role}</div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex gap-3">
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="text-muted-foreground hover:text-mint-dark transition-colors">
                          <Twitter size={18} />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="text-muted-foreground hover:text-mint-dark transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} className="text-muted-foreground hover:text-mint-dark transition-colors">
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join the Team Section */}
        <section className="py-16 bg-silver-light/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 animate-fade-right">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're always looking for talented individuals who are passionate about our mission to decentralize connectivity. Join us in building the future of telecommunications.
                </p>
                <Button className="bg-mint-dark hover:bg-mint text-white">
                  <Link to="/careers">View Open Positions</Link>
                </Button>
              </div>
              <div className="lg:w-1/2 animate-fade-left">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="font-semibold">Innovation-First Culture</div>
                        <p className="text-sm text-muted-foreground">
                          We encourage creative thinking and bold ideas at every level of our organization.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-semibold">Remote-Friendly</div>
                        <p className="text-sm text-muted-foreground">
                          Work from anywhere with our globally distributed team spanning multiple time zones.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-semibold">Competitive Benefits</div>
                        <p className="text-sm text-muted-foreground">
                          Enjoy comprehensive health coverage, equity options, and flexible time off.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-semibold">Career Growth</div>
                        <p className="text-sm text-muted-foreground">
                          We invest in your growth with learning opportunities and clear advancement paths.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OurTeam;
