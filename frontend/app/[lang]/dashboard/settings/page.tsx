import Breadcrumbs from "@/components/ui/breadcrumbs";
import CardIcon from "@/components/ui/card-icon";
import TaskListIcon from "@/icons/tasklist-icon";
import PageTitle from "@/components/ui/page-title";
import DashboardCard from "@/components/ui/dashboard-card";
import SettingsView from "@/components/settings-view";

export default function SettingsPage() {
    return (
        <DashboardCard>
            <Breadcrumbs/>
            <div className="flex flex-row items-center gap-8 mb-4">
                <CardIcon>
                    <TaskListIcon width="2.5em" height="2.5em"/>
                </CardIcon>
                <PageTitle>
                    Update Profile
                </PageTitle>
            </div>
            <SettingsView/>
        </DashboardCard>
    );
}