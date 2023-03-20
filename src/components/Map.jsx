import { useMemo, useState, forwardRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";

const libraries = ["places"];

const Map = forwardRef((props, ref) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCew9_bIsxbq6eNSD4mb2qJqMGdjUOVZFQ",
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapFrame ref={ref} />;
});

const MapFrame = forwardRef((props, ref) => {
  const center = useMemo(() => ({ lat: 28.7041, lng: 77.1025 }), []);
  //   const [selected, setSelected] = useState(null);
  const defaultMapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
  };
  return (
    <div className="h-full w-full relative" ref={ref}>
      {/* <div className="absolte top-2 left-2 rounded-sm overflow-hiden z-10">
        <PlacesAutocomplete setSelected={setSelected} />
      </div> */}
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

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();
//   return (
//     <Combobox>
//       <ComboboxInput
//         className="p-1"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

export default Map;
