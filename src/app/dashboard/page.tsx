import { columns } from "@/app/columns";
import { mockData } from "@/data/mock-data";
import { DataTable } from "@/components/data-table";

export default async function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}
