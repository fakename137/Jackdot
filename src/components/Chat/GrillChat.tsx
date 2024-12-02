import React, { useEffect, useState } from "react";

const GrillChat = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Function to load the external script
  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // Load the grill widget script
    loadScript("https://unpkg.com/@subsocial/grill-widget@latest")
      .then(() => {
        console.log("Script loaded successfully");
      })
      .catch(() => {
        console.error("Failed to load the script");
      });
  }, []);

  useEffect(() => {
    if (isChatVisible) {
      // Initialize the grill widget if visible
      const config = {
        widgetElementId: "grill",
        hub: { id: "cc" },
        channel: {
          type: "channel",
          id: "8590", // Change this number with your chat number
          settings: {
            enableBackButton: false,
            enableLoginButton: false,
            enableInputAutofocus: true,
          },
        },
        theme: "dark",
      };

      if (window.GRILL) {
        window.GRILL.init(config);
      }
    }
  }, [isChatVisible]);

  const handleToggle = () => {
    setIsChatVisible((prevState) => !prevState);
  };

  return (
    <div className="fixed-div">
      <div
        id="grill"
        className={`h-[25rem] chat ${isChatVisible ? "chat-show" : ""}`}
      ></div>
      <img
        id="grill-toggle"
        alt="grill-logo"
        src="https://sub.id/images/grillchat.svg"
        onClick={handleToggle}
      />
    </div>
  );
};

export default GrillChat;
