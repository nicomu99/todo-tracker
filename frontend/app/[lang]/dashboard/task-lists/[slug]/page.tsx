import DashboardCard from "@/components/ui/dashboard-card";
import Breadcrumbs from "@/components/ui/breadcrumbs";
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
                <Breadcrumbs labels={{[slug]: "List"}}/>
                <TaskListView slug={slug}/>
            </DashboardCard>
        </div>
    );
}