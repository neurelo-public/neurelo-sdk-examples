import { Link } from "react-router-dom";
import logoSrc from "../../assets/neurelo.png";
import {
  CameraIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  GaugeIcon,
} from "lucide-react";
import { useAuthSlice } from "@store/index";
import { AccountAvatar, Button } from "@components/ui";
import { useMemo } from "react";

const HEADER_LINKS = [
  {
    key: "home",
    label: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    key: "films",
    label: "Films",
    href: "/films",
    Icon: CameraIcon,
  },
  {
    key: "sign-in",
    label: "Sign In",
    href: "/sign-in",
    Icon: LogInIcon,
  },
];

export function Header() {
  const authSlice = useAuthSlice();

  const allLinks = useMemo(() => {
    if (authSlice.account) {
      return HEADER_LINKS.concat({
        key: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        Icon: GaugeIcon,
      }).filter((link) => link.key !== "sign-in" && link.key !== "register");
    }
    return HEADER_LINKS;
  }, [authSlice.account]);

  return (
    <header
      className="z-20 w-full py-3 px-4 border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-900
      sticky top-0"
    >
      <div
        className="flex items-center justify-between flex-row
          bg-transparent
          text-zinc-300 max-w-7xl mx-auto"
      >
        <Link to="/">
          <img
            src={logoSrc}
            className="pointer-events-none"
            alt="logo"
            width="130"
            height="34"
          />
        </Link>

        <nav className="flex gap-3 flex-nowrap items-center">
          {allLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-zinc-50 hover:text-yellow-400 transition-colors duration-200 ease-in-out
                flex flex-nowrap items-center justify-center gap-1.5
                p-2 rounded-md group/link"
            >
              <link.Icon
                size={16}
                className="text-orange-300 stroke-1 group-hover/link:text-yellow-400"
              />
              {link.label}
            </Link>
          ))}

          {authSlice.account ? (
            <>
              <Button
                startIcon={LogOutIcon}
                className="w-8 h-8 p-0 bg-red-950 hover:bg-red-800 border-red-700"
                onClick={() => authSlice.reset()}
              />
              <AccountAvatar account={authSlice.account} />
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
