import React from "react";
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from "wagmi";

const Web3Login: React.FC = () => {
  const { connect, isConnected, loading, error } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address } = useAccount();

  console.log("Web3Login - isConnected:", isConnected, "address:", address, "userInfo:", userInfo);
  console.log("userinfo is here:", userInfo);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ padding: 32, borderRadius: 12, background: "#fff", boxShadow: "0 2px 8px #0001", minWidth: 320 }}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Web3Auth Login Test</h2>
        {!isConnected ? (
          <button
            onClick={() => connect()}
            style={{
              width: "100%",
              padding: "12px 0",
              borderRadius: 8,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              marginBottom: 16,
            }}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect with Web3Auth"}
          </button>
        ) : (
          <>
            <div style={{ marginBottom: 16, textAlign: "center" }}>
              <div>Connected!</div>
              <div style={{ fontSize: 12, color: "#666" }}>{address}</div>
              {userInfo && (
                <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
                  {userInfo.email || userInfo.name}
                </div>
              )}
            </div>
            <button
              onClick={() => disconnect()}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 8,
                background: "#e11d48",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </>
        )}
        {error && <div style={{ color: "red", marginTop: 16 }}>{error.message || "Web3Auth error"}</div>}
      </div>
    </div>
  );
};

export default Web3Login;