import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <>
      <div className="p-3 shadow-sm w-full h-24 flex justify-between bg-slate-200  items-center px-5">
        <img src="./logo.svg" className="w-10 h-20" alt="logo" />
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    alt="Profile"
                    className="h-[35px] w-[35px] rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.removeItem("user"); // Remove user before refreshing
                      window.location.reload();
                      // setUser(null); // Update state instead of reloading
                    }}
                  >
                    Log Out
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
          )}
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <span className=" text-3xl font-bold text-lg  mt-7">
                  Sign In with Google
                </span>
                <span>
                  Sign in to the app with Google Authentication securely!
                </span>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" /> Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Header;
