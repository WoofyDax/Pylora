
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Network location interface
interface NetworkLocation {
  id: number;
  city: string;
  lat: number;
  lng: number;
  coverage_type: string;
  signal_strength: number;
}

export const MapboxNetworkMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [networkLocations, setNetworkLocations] = useState<NetworkLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the network locations from our API
  const fetchNetworkLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('network_locations')
        .select('*');
      
      if (error) throw error;
      
      setNetworkLocations(data);
      return data;
    } catch (error) {
      console.error('Error fetching network locations:', error);
      toast.error('Failed to load network data');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch Mapbox token from settings
  const fetchMapboxToken = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'mapbox_token')
        .single();
      
      if (error) throw error;
      
      return data.value;
    } catch (error) {
      console.error('Error fetching Mapbox token:', error);
      return '';
    }
  };

  useEffect(() => {
    // Initialize Mapbox and fetch network data
    const initMap = async () => {
      try {
        setLoading(true);
        
        // Get Mapbox token
        const token = await fetchMapboxToken();
        if (!token) {
          throw new Error("Mapbox token not found in settings");
        }
        setMapboxToken(token);
        
        // Get network locations
        const locations = await fetchNetworkLocations();
        
        // Initialize map if container exists and token is available
        if (!mapContainer.current || !token) return;
        
        mapboxgl.accessToken = token;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [0, 20], // Center at the global view
          zoom: 1.8,
          projection: 'globe',
        });
        
        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          })
        );
        
        // Add atmosphere and fog effects
        map.current.on('style.load', () => {
          map.current?.setFog({
            'color': 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });
          
          // Once the map is loaded, add network location markers
          addNetworkMarkers(locations);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
        toast.error('Failed to initialize map');
        setLoading(false);
      }
    };
    
    initMap();
    
    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);
  
  // Add network location markers to the map
  const addNetworkMarkers = (locations: NetworkLocation[]) => {
    if (!map.current) return;
    
    locations.forEach(location => {
      // Create a marker element
      const el = document.createElement('div');
      el.className = 'network-marker';
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      
      // Color based on coverage type
      switch (location.coverage_type) {
        case '5G':
          el.style.backgroundColor = '#10b981'; // Green for 5G
          break;
        case 'LTE':
          el.style.backgroundColor = '#3b82f6'; // Blue for LTE
          break;
        case 'CBRS':
          el.style.backgroundColor = '#8b5cf6'; // Purple for CBRS
          break;
        default:
          el.style.backgroundColor = '#f59e0b'; // Amber for IoT
      }
      
      // Pulse animation for strong signals
      if (location.signal_strength > 70) {
        el.style.boxShadow = `0 0 0 rgba(${location.coverage_type === '5G' ? '16, 185, 129' : '59, 130, 246'}, 0.4)`;
        el.style.animation = 'pulse 2s infinite';
      }
      
      // Create and add the marker
      new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h3 style="font-weight:bold;margin-bottom:5px;">${location.city}</h3>
              <p style="margin:0;"><strong>Type:</strong> ${location.coverage_type}</p>
              <p style="margin:0;"><strong>Signal:</strong> ${location.signal_strength}%</p>
            `)
        )
        .addTo(map.current);
    });
  };

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mint-dark"></div>
        </div>
      )}
      
      {!mapboxToken && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10 p-4 text-center">
          <p className="text-lg font-medium mb-2">Mapbox API Key Required</p>
          <p className="text-sm text-muted-foreground max-w-md">
            Please add a Mapbox public token to your settings table with the key 'mapbox_token'.
          </p>
        </div>
      )}
      
      {/* Add pulse animation for markers */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>
      
      <div ref={mapContainer} className="absolute inset-0 rounded-lg"></div>
    </div>
  );
};
