import DashboardCard from "@/components/ui/dashboard-card";
import TaskListView from "@/components/tasklist-view";

export default async function ListView({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <div className="bg-background ml-74 mt-10 mr-10">
            <DashboardCard>
                <TaskListView slug={slug}/>
            </DashboardCard>
        </div>
    );
}