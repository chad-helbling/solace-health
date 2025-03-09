import { AdvocatesTable } from "@/components/AdvocatesTable/AdvocatesTable";
import { columns } from "@/components/AdvocatesTable/columns";

async function getInitalAdvocates() {
  const response = await fetch("http://localhost:3000/api/advocates");
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export default async function Home() {
  const advocates = await getInitalAdvocates();

  return <AdvocatesTable columns={columns} data={advocates} />;
}
