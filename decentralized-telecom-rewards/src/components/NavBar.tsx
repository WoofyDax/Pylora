
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Signal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-sm' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Signal className="h-8 w-8 text-mint-dark animate-pulse-slow" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-mint-dark rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-semibold tracking-tight">DecentNet</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-mint-dark transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-mint-dark transition-colors">
              About
            </Link>
            <Link to="/network" className="text-sm font-medium hover:text-mint-dark transition-colors">
              Network
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-mint-dark transition-colors">
              Pricing
            </Link>
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="h-9 px-4 rounded-full" onClick={handleSignOut}>
                  Sign Out
                </Button>
                <Button 
                  size="sm" 
                  className="h-9 px-4 rounded-full bg-mint-dark hover:bg-mint text-white hover:shadow-neon transition-all"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 px-4 rounded-full"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button 
                  size="sm" 
                  className="h-9 px-4 rounded-full bg-mint-dark hover:bg-mint text-white hover:shadow-neon transition-all"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
          
          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-card/95 backdrop-blur-lg border-b border-border animate-fade-in">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/network" 
                className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Network
              </Link>
              <Link 
                to="/pricing" 
                className="text-sm font-medium px-4 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center rounded-full"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                  <Button 
                    className="w-full justify-center rounded-full bg-mint-dark hover:bg-mint text-white"
                    onClick={() => {
                      navigate('/dashboard');
                      setIsOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center rounded-full"
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="w-full justify-center rounded-full bg-mint-dark hover:bg-mint text-white"
                    onClick={() => {
                      navigate('/signup');
                      setIsOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
