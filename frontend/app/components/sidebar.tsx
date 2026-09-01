import  Image from "next/image";
import Logo from "@/icons/logo";
import DashboardLink from "@/components/ui/dashboard-link";
import { useAuth } from "@/providers/auth-provider";
import DashboardIcon from "@/icons/dashboard-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import { useParams } from "next/navigation";
import SettingsIcon from "@/icons/settings-icon";
import LogoutButton from "@/components/ui/logout-button";

export default function Sidebar() {
    const { user } = useAuth();
    const { lang } = useParams();

    return (
        <div className="
                md:fixed md:left-0 md:top-0 w-full md:w-64 md:h-full
                bg-surface border-r border-text-subtle z-40
            ">
            <div className="h-full flex flex-col p-5">
                <div className="my-5">
                    <Logo/>
                </div>
                <div className="
                        flex flex-row items-center gap-2 px-2 py-1 mb-5 rounded-sm border
                        border-text-subtle backdrop-blur-lg
                        shadow-[var(--shadow-x,0px)_var(--shadow-y,4px)_15px_-10px_rgba(104,104,111)]">
                    <Image
                        src="/random-person.jpeg"
                        alt="User profile image"
                        className="rounded-full w-12"
                        width={100} height={100}
                    />
                    <div>
                        <p className="leading-tight">
                            {user ? user.fullName : "Missing"}
                        </p>
                        <p className="text-xs text-text-muted leading-none">
                            {user ? `@${user.username}` : "Empty"}
                        </p>
                    </div>
                    <LogoutButton />
                </div>
                <div className="flex flex-1 flex-col gap-2 md:mb-10">
                    <DashboardLink link={`/${lang}/dashboard`} linkText="Dashboard" textClassName="translate-y-px" icon={<DashboardIcon/>}/>
                    <DashboardLink link={`/${lang}/dashboard/task-lists`} linkText="Task Lists" icon={<TaskListIcon/>}/>
                    <DashboardLink link={`/${lang}/dashboard/settings`} linkText="Settings" className="md:mt-auto md:mb-16" icon={<SettingsIcon/>}/>
                </div>
            </div>
        </div>
    );
}