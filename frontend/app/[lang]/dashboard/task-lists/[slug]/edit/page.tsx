import DashboardCard from "@/components/ui/dashboard-card";
import Breadcrumbs from "@/components/ui/breadcrumbs";
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
                <Breadcrumbs labels={{[slug]: "List"}}/>
                <TaskListEditView slug={slug}/>
            </DashboardCard>
        </div>
    );
}