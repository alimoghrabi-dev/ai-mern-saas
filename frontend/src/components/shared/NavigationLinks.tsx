import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

type Props = {
  to: string;
  variantBg: "ghost" | "default";
  text: string;
  textColor: string;
  onClick?: () => void;
};

const NavigationLinks = ({
  to,
  variantBg,
  text,
  textColor,
  onClick,
}: Props) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        buttonVariants({ variant: variantBg, className: textColor })
      )}>
      {text}
    </Link>
  );
};

export default NavigationLinks;
