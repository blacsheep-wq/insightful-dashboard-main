
import { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { usePlatform } from '@/contexts/PlatformContext';
import { platformData } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Minus, MoveLeft, MoveRight } from 'lucide-react';

// Publicly available TopoJSON map
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const LAND_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json";

export function LocationMap() {
  const { platform } = usePlatform();
  const data = platformData[platform].locationData;
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 });
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);

  // Only render for platforms with location data (Instagram/YouTube)
  if (!data) return null;

  const title = platform === 'youtube' ? 'Subscribers from location' : 'Followers from location';

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }));
  };

  const handleMoveLeft = () => {
     setPosition((pos) => ({ ...pos, coordinates: [pos.coordinates[0] - 30, pos.coordinates[1]] as [number, number] }));
  };

  const handleMoveRight = () => {
    setPosition((pos) => ({ ...pos, coordinates: [pos.coordinates[0] + 30, pos.coordinates[1]] as [number, number] }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <div className="metric-card animate-fade-in opacity-0 relative" style={{ animationDelay: '300ms' }}>
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <div className="relative h-[400px] w-full rounded-xl border border-black bg-[#E3F2FD] overflow-hidden">
        <ComposableMap projectionConfig={{ scale: 140 }}>
          <ZoomableGroup 
             zoom={position.zoom} 
             center={position.coordinates} 
             onMoveEnd={handleMoveEnd}
          >
            {/* Layer 1: Countries (Invisible strokes, handles tooltips) */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryData = data.find((d) => d.id === geo.id || d.id === geo.properties.iso_a3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#FFFFFF"
                      stroke="none"
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#E3F2FD", outline: "none" }, // Subtle highlight interaction only
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(evt) => {
                        if (countryData) {
                          // Show tooltip only if we have data
                           setTooltip({
                            content: `${countryData.name}: ${countryData.value}%`,
                            x: evt.clientX,
                            y: evt.clientY
                          });
                        }
                      }}
                      onMouseMove={(evt) => {
                        if (countryData && tooltip) {
                          setTooltip({
                            ...tooltip,
                            x: evt.clientX,
                            y: evt.clientY
                          });
                        }
                      }}
                      onMouseLeave={() => {
                        setTooltip(null);
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Layer 2: Land Borders (Continent outlines) */}
            <Geographies geography={LAND_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="none"
                    stroke="#000000"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", pointerEvents: "none" },
                      hover: { outline: "none", pointerEvents: "none" },
                      pressed: { outline: "none", pointerEvents: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Map Labels / Markers */}
            {data.map(({ id, name, value, coordinates }) => (
              <Marker key={id} coordinates={coordinates}>
                <text
                  textAnchor="middle"
                  y={-5}
                  style={{ fontFamily: "system-ui", fill: "#7C3AED", fontSize: "10px", fontWeight: "bold", pointerEvents: "none" }}
                >
                  {name}
                </text>
                 <text
                  textAnchor="middle"
                  y={8}
                  style={{ fontFamily: "system-ui", fill: "#7C3AED", fontSize: "8px", pointerEvents: "none" }}
                >
                  {value}%
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Custom Tooltip Portal/Overlay */}
        {tooltip && (
          <div 
             className="fixed z-50 px-3 py-1 text-sm font-medium text-white bg-black rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
             style={{ left: tooltip.x, top: tooltip.y - 10 }}
          >
            {tooltip.content}
          </div>
        )}

        {/* Pan Controls - Bottom Left */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button variant="secondary" size="icon" onClick={handleMoveLeft} className="h-8 w-8 shadow-md border hover:bg-gray-100">
             <MoveLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleMoveRight} className="h-8 w-8 shadow-md border hover:bg-gray-100">
             <MoveRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Controls - Bottom Right */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8 shadow-md border hover:bg-gray-100">
             <Minus className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8 shadow-md border hover:bg-gray-100">
             <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Legend / Stats (Retained as supplementary info) */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {data.map(country => (
           <div key={country.id} className="flex items-center gap-2">
              <span className="text-sm font-medium border px-2 py-1 rounded bg-secondary/50">
                {country.name}: {country.value}%
              </span>
           </div>
        ))}
      </div>
    </div>
  );
}
