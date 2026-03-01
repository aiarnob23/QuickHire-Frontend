"use client";

import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";;
import SvgLogo from "@/public/svgs/SvgLogo";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const drawerRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const navLinks = [
        { name: "Find Jobs", path: "/jobs" },
        { name: "Browse Companies", path: "/companies" },
    ];

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.2,
                ease: "power2.out",
            });

            gsap.fromTo(
                drawerRef.current,
                { x: "-100%" },
                { x: "0%", duration: 0.4, ease: "power1.out" }
            );

            gsap.fromTo(
                linkRefs.current,
                { y: 0, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        } else {
            gsap.to(overlayRef.current, {
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.in",
            });
            gsap.to(drawerRef.current, {
                x: "-100%",
                duration: 0.4,
                ease: "power3.in",
            });
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    const handleSignInClick = () => {
        console.log("Sign In button clicked");
    };



    return (
        <>
            {/* Main Navbar */}
            <nav className="bg-primary-100 relative z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-24">
                            {/* Logo/Brand */}
                            <Link href='/' className="shrink-0 flex items-center gap-3">
                                <SvgLogo />
                                <h1 className="text-heading text-2xl font-semibold lg:font-bold leading-7">
                                    QuickHire
                                </h1>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-4">
                                {navLinks.map((link) => {
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.path}
                                            className="flex items-center space-x-2 text-subheading text-lg px-3 py-2 rounded-md font-medium transition-all duration-200 hover:bg-gray-50"
                                        >
                                            <span>{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desktop Button */}
                        <div className="lg:flex gap-4 hidden items-center">
                            <div className="">
                                <Button variant={'ghost'} className="text-primary font-semibold text-lg">Login</Button>
                            </div>
                            <span className="border-r h-6 border-border" />
                            <div className="">
                                <Button onClick={handleSignInClick} className="bg-primary">
                                    Sign Up
                                </Button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center gap-1">
                            
                            <button
                                onClick={toggleMenu}
                                className="text-gray-700 hover:text-gray-900 p-2 rounded-lg transition-colors duration-200"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            <div
                ref={overlayRef}
                onClick={toggleMenu}
                className="fixed inset-0 bg-black/30 invisible opacity-0 lg:hidden z-40"
            />

            {/* Mobile Navigation Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 left-0 w-80 h-full bg-white shadow-2xl lg:hidden z-50 transform -translate-x-full"
            >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h1 className="text-heading text-xl font-bold leading-7">
                        QuickHire
                    </h1>
                    <div>
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Items */}
                <div className="py-6 flex flex-col gap-2">
                    {navLinks.map((link, i) => {
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                ref={(el) => {
                                    linkRefs.current[i] = el;
                                }}
                                onClick={toggleMenu}
                                className="flex items-center space-x-4 px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 border-l-4 border-transparent hover:border-gray-800"
                            >
                                <span className="text-base font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile Button */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
                    <Button onClick={handleSignInClick} className="">
                        Sign up
                    </Button>
                </div>
            </div>

        </>
    );
};

export default Navbar;