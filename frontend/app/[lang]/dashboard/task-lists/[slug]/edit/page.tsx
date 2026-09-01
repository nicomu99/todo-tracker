import DashboardCard from "@/components/ui/dashboard-card";
import TaskListEditView from "@/components/task-list-edit-view";

export default async function EditPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <DashboardCard>
            <TaskListEditView slug={slug}/>
        </DashboardCard>
    );
}