import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navitems from "./Navitems";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        <Navitems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile/Tablet Hamburger Menu */}
      <HamburgerMenu />
    </nav>
  );
};

export default Navbar;
