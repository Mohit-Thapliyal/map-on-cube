import { useMemo, forwardRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const libraries = ["places"];

const Map = forwardRef((props, ref) => {
  const { isLoaded } = useLoadScript({
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapFrame ref={ref} />;
});

const MapFrame = forwardRef((props, ref) => {
  const center = useMemo(() => ({ lat: 28.7041, lng: 77.1025 }), []);
  const defaultMapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
  };
  return (
    <div className="h-full w-full relative" ref={ref}>
      <GoogleMap
        ref={ref}
        zoom={11}
        center={center}
        mapContainerClassName="h-full w-full"
        options={defaultMapOptions}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
});

export default Map;
