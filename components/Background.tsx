import React from "react";

const Background = () => {
  return (
    <div className="absolute inset-0 pointer-events-none ">
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-moss-500/10 blur-[120px] rounded-full animate-mist-drift"></div>
      <div
        className="absolute w-[100%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full "
        style={{ animationDelay: "-5s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[80vh] bg-linear-to-b from-transparent via-moss-500/10 to-transparent"></div>
    </div>
  );
};

export default Background;
