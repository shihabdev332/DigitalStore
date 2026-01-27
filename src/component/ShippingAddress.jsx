import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin, Navigation } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../config";

// Leaflet icon fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * ChangeView Component: Ensures map stays synced with coordinates
 */
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 16);
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [center, map]);
  return null;
}

const ShippingAddress = ({ onAddressUpdate }) => {
  const [position, setPosition] = useState([23.8103, 90.4125]);
  const [address, setAddress] = useState({
    city: "",
    upazila: "",
    fullAddress: "",
  });

  // Handle manual changes for input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedAddress = { ...address, [name]: value };
    setAddress(updatedAddress);
    if (onAddressUpdate) {
      onAddressUpdate({ ...updatedAddress, position });
    }
  };

  /**
   * reverseGeocode: Logic updated to prioritize Upazila detection
   */
  const reverseGeocode = async (lat, lon) => {
    try {
      const { data } = await axios.post(`${serverUrl}/api/location/reverse-geocode`, { lat, lon });
      
      if (data.success) {
        const addr = data.address;
        
        // Priority logic for Upazila/Thana/Area
        const detectedUpazila = 
          addr.county ||            // Often Nominatim marks Upazila as county
          addr.suburb || 
          addr.neighbourhood || 
          addr.city_district || 
          addr.town || 
          addr.village || "";

        // Detection for City/District
        const detectedCity = 
          addr.city || 
          addr.state_district || 
          addr.district || 
          addr.state || "";

        const newAddress = {
          city: detectedCity,
          upazila: detectedUpazila,
          fullAddress: data.displayName || "",
        };
        
        setAddress(newAddress);

        if (onAddressUpdate) {
          onAddressUpdate({ ...newAddress, position: [lat, lon] });
        }
      }
    } catch (error) {
      console.error("Backend Geocoding error:", error);
      toast.error("Location detected, please verify the details.");
    }
  };

  /**
   * getUserLocation: Get coordinates from browser
   */
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported");
      return;
    }

    const toastId = toast.loading("Locating...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        await reverseGeocode(latitude, longitude);
        toast.dismiss(toastId);
        toast.success("Location Pinpointed!");
      },
      () => {
        toast.dismiss(toastId);
        toast.error("Location access denied.");
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="p-2 md:p-6 bg-white rounded-[2.5rem]">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Form Side */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-zinc-900 text-white rounded-2xl shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Shipping Details</h2>
              <p className="text-sm text-zinc-400 font-medium">Verify your Upazila and City</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={getUserLocation}
              className="w-full flex items-center justify-center gap-2 py-4 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all active:scale-[0.98] shadow-md shadow-orange-100 cursor-pointer"
            >
              <Navigation size={18} /> Auto-detect My Location
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City / District */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">City / District</label>
                <input 
                  type="text" name="city" value={address.city} onChange={handleInputChange}
                  placeholder="e.g. Kushtia"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold text-zinc-800 outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Upazila / Thana */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Upazila / Thana</label>
                <input 
                  type="text" name="upazila" value={address.upazila} onChange={handleInputChange}
                  placeholder="e.g. Daulatpur"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold text-zinc-800 outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Full Address */}
              <div className="col-span-full flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Detailed Street Address</label>
                <textarea 
                  name="fullAddress" value={address.fullAddress} onChange={handleInputChange}
                  rows="3" placeholder="Village, House No, Road..."
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 text-sm font-bold text-zinc-800 outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-500 resize-none transition-all"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Map Side */}
        <div className="flex-1 w-full min-h-[300px] h-[400px] lg:h-auto rounded-[2.5rem] overflow-hidden border-8 border-zinc-50 shadow-inner relative z-0">
          <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false}
            className="w-full h-full absolute inset-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={position} />
            <Marker 
              position={position} 
              draggable={true}
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setPosition([lat, lng]);
                  reverseGeocode(lat, lng);
                }
              }}
            >
              <Popup className="font-bold">Delivery Point</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
