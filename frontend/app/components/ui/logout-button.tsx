import LogoutIcon from "@/icons/logout-icon";
import { useAuth } from "@/providers/auth-provider";

export default function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button className="
            ml-auto p-4 rounded-full

            transition-all duration-150
            hover:cursor-pointer
            hover:-translate-y-0.5
            hover:bg-white
            hover:text-black

            active:translate-y-0
            active:bg-accent
            active:text-white
        " onClick={logout}>
            <LogoutIcon />
        </button>
    );
}