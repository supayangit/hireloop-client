"use client"
import {
    LayoutSideContentLeft,
    Bell,
    Envelope,
    Gear,
    House,
    Magnifier,
    Person,
    Briefcase,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';

export function DashboardSidebar() {
    const { data: session } = authClient.useSession();
        const navItems = [
            { icon: House, label: "Dashboard", key: "dashboard", href: '/dashboard/recruiter' },
            { icon: Person, label: "My Company", key: "company", href: '/dashboard/recruiter/company' },
            { icon: Briefcase, label: "Manage Jobs", key: "jobs", href: '/dashboard/recruiter/jobs' },
            { icon: Envelope, label: "Applications", key: "applications", href: '/dashboard/recruiter/applications' },
            { icon: FiPlus, label: "Post a Job", key: "post", href: '/dashboard/recruiter/post' },
            { icon: Gear, label: "Settings", key: "settings", href: '/dashboard/recruiter/settings' },
        ];

    const pathname = usePathname();

    const NavLink = (
        <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
                // Dashboard should be active only on the exact dashboard home path.
                const isActive = item.key === 'dashboard'
                    ? pathname === item.href || pathname === `${item.href}/`
                    : pathname?.startsWith(item.href);
                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        className={
                            `flex items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors ` +
                            (isActive
                                ? 'bg-white/5 border-r-4 border-indigo-500 text-white'
                                : 'text-gray-200 hover:bg-white/3')
                        }
                    >
                                                <span className="text-gray-300">
                                                    <item.icon className="w-5 h-5" />
                                                </span>
                        <span className="truncate">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-64 flex-col gap-6 p-6 bg-black/80 border-r border-white/6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white">HireLoop</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/5">
                            <img
                                src={session?.user?.image || "/avatar-placeholder.png"}
                                alt={session?.user?.name || "User"}
                                className="h-10 w-10 object-cover rounded-full"
                            />
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-white">{session?.user?.name || "Alex Sterling"}</div>
                            <div className="text-xs text-gray-400">{session?.user?.role || session?.user?.user_metadata?.role || "Recruiter · Premium"}</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">{NavLink}</div>

                <div className="pt-2 space-y-3">
                    {session?.user ? (
                        <>
                            <Link
                                href="/profile"
                                className="w-full block rounded-md border border-white/6 px-4 py-2 text-left text-white hover:bg-white/5 transition-colors duration-150"
                            >
                                Profile
                            </Link>
                        </>
                    ) : null}
                </div>
            </aside>

            {/* Mobile drawer */}
            <Drawer>
                <Button variant="secondary" className="md:hidden" type="button">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>{NavLink}</Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}