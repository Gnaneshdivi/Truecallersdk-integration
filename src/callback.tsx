import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface TruecallerUser {
  name: string;
  phoneNumber: string;
  email?: string;
  gender?: string;
  city?: string;
}

const Callback: React.FC = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<TruecallerUser | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const payload = queryParams.get("payload");

    if (payload) {
      try {
        const decodedPayload = JSON.parse(atob(payload)) as TruecallerUser;
        setUserData(decodedPayload);
      } catch (error) {
        console.error("Error decoding payload:", error);
      }
    }
  }, [location.search]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Truecaller Auth Callback</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Phone:</strong> {userData.phoneNumber}</p>
          {userData.email && <p><strong>Email:</strong> {userData.email}</p>}
          {userData.gender && <p><strong>Gender:</strong> {userData.gender}</p>}
          {userData.city && <p><strong>City:</strong> {userData.city}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Callback;
