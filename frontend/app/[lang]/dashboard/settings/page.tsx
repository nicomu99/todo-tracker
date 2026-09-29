import DashboardCard from "@/components/ui/dashboard-card";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import SettingsIcon from "@/icons/settings-icon";
import SettingsView from "@/components/settings-view";

export default function SettingsPage() {
    return (
            <DashboardCard>
                <Breadcrumbs/>
                <div className="flex flex-row items-center gap-8 mb-4">
                    <CardIcon>
                    </CardIcon>
                    <PageTitle>
                    </PageTitle>
                </div>
                <SettingsView />
            </DashboardCard>
    );
}