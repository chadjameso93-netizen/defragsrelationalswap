import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .limit(5);

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>DEFRAG: Supabase Connected</h1>

      <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </main>
  );
}
