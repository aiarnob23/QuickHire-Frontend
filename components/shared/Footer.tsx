import SvgLogo from "@/public/svgs/SvgLogo";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dribbble, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-footer-bg">
      <div className="container mx-auto px-6 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
               <SvgLogo/>
              <h3 className="text-xl text-primary-foreground font-semibold">
                QuickHire
              </h3>
            </div>

            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">About</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/companies" className="hover:text-primary transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/advice" className="hover:text-primary transition">
                  Advice
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link href="/docs" className="hover:text-primary transition">
                  Help Docs
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-primary transition">
                  Guide
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-primary transition">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary-foreground mb-3">
                Get job notifications
              </h4>
              <p className="text-sm text-muted">
                The latest job news and articles sent to your inbox weekly.
              </p>
            </div>

            <form className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none"
              />
              <Button
                type="submit"
                className="px-5 py-2 ml-2 text-sm font-medium border border-border rounded-r-md"
              >
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted">

          <p>
            © {new Date().getFullYear()} QuickHire. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition"><Facebook/></Link>
            <Link href="#" className="hover:text-primary transition"><Instagram/></Link>
            <Link href="#" className="hover:text-primary transition"><Dribbble/></Link>
            <Link href="#" className="hover:text-primary transition"><Linkedin/></Link>
            <Link href="#" className="hover:text-primary transition"><Twitter/></Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;