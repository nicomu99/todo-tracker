import DashboardCard from "@/components/ui/dashboard-card";
import TaskListView from "@/components/tasklist-view";

export default async function ListView({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <DashboardCard>
            <TaskListView slug={slug}/>
        </DashboardCard>
    );
}