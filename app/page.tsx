"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: usersData } = await supabase.from("users").select("*");
    const { data: projectsData } = await supabase.from("projects").select("*");
    setUsers(usersData || []);
    setProjects(projectsData || []);
  }

  async function createUser() {
    await supabase.from("users").insert([
      {
        type: "studio",
        name: "Studio Test",
        email: "test@mail.com",
        location: "Milano",
        verified: true,
      },
    ]);
    fetchData();
  }

  async function createProject() {
    if (!users.length) return alert("Create user first");

    await supabase.from("projects").insert([
      {
        client_id: users[0].id,
        title: "Progetto Strutturale",
        description: "Richiesta calcolo strutturale",
        budget_type: "fixed",
        budget_amount: 5000,
      },
    ]);
    fetchData();
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Engineering Marketplace MVP</h1>

      <button onClick={createUser}>Create Test User</button>
      <button onClick={createProject}>Create Test Project</button>

      <h2>Users</h2>
      {users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}

      <h2>Projects</h2>
      {projects.map((p) => (
        <div key={p.id}>{p.title} - {p.status}</div>
      ))}
    </div>
  );
}
