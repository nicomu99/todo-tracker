import DashboardCard from "@/components/ui/dashboard-card";
import TaskListEditView from "@/components/task-list-edit-view";

export default async function EditPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    return (
        <div className="bg-background ml-74 mt-10 mr-10">
            <DashboardCard>
                <TaskListEditView slug={slug}/>
            </DashboardCard>
        </div>
    );
}