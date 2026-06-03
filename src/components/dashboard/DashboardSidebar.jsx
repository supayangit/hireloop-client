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
    Check,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function DashboardSidebar() {
    const { data: session } = authClient.useSession();
    const navItems = [
            { icon: House, label: "Dashboard", key: "dashboard" },
            { icon: Briefcase, label: "My Company", key: "company" },
            { icon: Briefcase, label: "Manage Jobs", key: "jobs" },
            { icon: Check, label: "Applications", key: "applications" },
            { icon: Gear, label: "Settings", key: "settings" },
    ];

    const NavLink = (
        <nav className="flex flex-col gap-2">
            {navItems.map((item, idx) => (
                <button
                    key={item.key}
                    type="button"
                    className={
                        `flex items-center gap-3 rounded-md px-4 py-2 text-sm text-gray-200 transition-colors hover:bg-white/3 ` +
                        (idx === 0 ? "bg-white/5 border-r-4 border-indigo-500" : "")
                    }
                >
                    <item.icon className="size-5 text-gray-400" />
                    <span className="truncate">{item.label}</span>
                </button>
            ))}
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

                <div className="pt-2 space-y-2">
                    <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-500">Post a Job</Button>

                    {session?.user ? (
                        <>
                            <Link href="/profile" className="w-full block rounded-md border border-white/6 px-4 py-2 text-left text-white">Profile</Link>
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