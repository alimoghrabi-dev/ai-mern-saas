import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex mr-auto items-center gap-2">
      <img src="openai.png" alt="logo" className="w-[30px] h-[30px] invert" />
      <Typography className="hidden md:block mr-auto font-extrabold drop-shadow-lg">
        <span className="text-[20px]">MERN</span>-GPT
      </Typography>
    </Link>
  );
};

export default Logo;
