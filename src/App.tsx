import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [authResponse, setAuthResponse] = useState<string | null>(null);

  useEffect(() => {
    // Check if the URL has authentication response from Truecaller
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setAuthResponse(`Authentication Successful! Token: ${token}`);
    }
  }, []);

  const handleLogin = () => {
    const requestNonce = Math.random().toString(36).substring(2, 10); // Generate a unique request nonce
    const partnerKey = "bKHikcec23e0096414494be5bfe2fceb1115d"; 
    const privacyUrl = "https://myapp.com/privacy";
    const termsUrl = "https://myapp.com/terms";
    const partnerName = "app";

    const truecallerUrl = `truecallersdk://truesdk/web_verify?
      type=btmsheet
      &requestNonce=${requestNonce}
      &partnerKey=${partnerKey}
      &partnerName=${partnerName}
      &lang=en
      &privacyUrl=${encodeURIComponent(privacyUrl)}
      &termsUrl=${encodeURIComponent(termsUrl)}
      &loginPrefix=Login%20with
      &loginSuffix=Truecaller
      &ctaPrefix=Continue%20with
      &ctaColor=%23007bff
      &ctaTextColor=%23ffffff
      &btnShape=rectangular
      &skipOption=Skip
      &ttl=300000`;

    // Open Truecaller authentication
    window.location.href = truecallerUrl;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Truecaller Authentication</h2>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login with Truecaller
      </button>

      {/* Show authentication response */}
      {authResponse && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f3f3f3", borderRadius: "5px" }}>
          <h4>{authResponse}</h4>
        </div>
      )}
    </div>
  );
};

export default App;
