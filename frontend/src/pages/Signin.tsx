import { Button } from "@/components/ui/button";
import { Box, TextField, Typography } from "@mui/material";
import { Loader2 } from "lucide-react";
import { TbLogin } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const Signin = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing in...", { id: "signin" });

      await auth?.login(email, password);

      toast.success("Signed in Successfully!", { id: "signin" });

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: "signin" });
      navigate("/signin");
    } finally {
      setIsLoading(false);
      e.currentTarget.reset();
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      gap={6}
      flex={1}
      className="px-0 lg:px-16 pr-0 md:pr-24">
      <Box padding={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="robot" className="w-[315px]" />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}>
        <form
          onSubmit={handleSumbit}
          className="shadow-lg mt-14 md:mt-0 rounded-[10px]">
          <Box
            display={"flex"}
            height={"100%"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}>
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}>
              Sign In
            </Typography>
            <div className="w-[350px] sm:w-[500px] md:w-[400px] flex flex-col gap-5">
              <TextField
                type="email"
                name="email"
                label="Email"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderRadius: "10px",
                    width: "100%",
                    border: "1px solid #1e2431",
                  },
                }}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderRadius: "10px",
                    width: "100%",
                    border: "1px solid #1e2431",
                  },
                }}
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="py-6 flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-[18px] h-[18px] animate-spin" />
                ) : (
                  <>
                    Sign In
                    <TbLogin className="w-[19px] h-[19px] mt-0.5" />
                  </>
                )}
              </Button>
              <span className="flex items-center gap-1 text-white text-sm font-medium">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 hover:text-blue-700 transition-all underline">
                  Sign Up
                </Link>
              </span>
            </div>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signin;
