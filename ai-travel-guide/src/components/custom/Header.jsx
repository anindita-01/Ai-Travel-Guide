import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <>
      <div className="p-3 shadow-sm w-full h-24 flex justify-between bg-slate-200  items-center px-5">
        <img src="./logo.svg" className="w-10 h-20" />
        <Button>Sign in</Button>
      </div>
    </>
  );
};

export default Header;
