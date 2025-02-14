import React from "react";

const App: React.FC = () => {
  const handleLogin = () => {
    const requestNonce = Math.random().toString(36).substring(2, 10); // Generate a unique request nonce
    const partnerKey = "xVmuK4fc94fc4f23d47dcab85ffaf4c9fe7b6"; 
    const privacyUrl = "https://myapp.com/privacy";
    const termsUrl = "https://myapp.com/terms";
    const partnerName = "Rewardsy Test";
    const truecallerUrl = `truecallersdk://truesdk/web_verify?
    
      type=btmsheet
      &requestNonce=${requestNonce}
      &partnerKey=${partnerKey}
      &partnerName=${partnerName}
      &lang=en
      &privacyUrl=${privacyUrl}
      &termsUrl=${termsUrl}
      &loginPrefix=Login%20with
      &loginSuffix=Truecaller
      &ctaPrefix=Continue%20with
      &ctaColor=%23007bff
      &ctaTextColor=%23ffffff
      &btnShape=rectangular
      &skipOption=Skip
      &ttl=300000`;

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
  </div>
  );
};

export default App;
