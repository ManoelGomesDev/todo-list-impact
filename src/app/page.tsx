"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { CardTask } from "@/components/cardTask";

export default function Home() {

  const [tasks, setTasks] = useState<string[]>([])
  const [task, setTask] = useState<string>("")
 
  const handleAddTask = (task: string) => {

    setTasks([...tasks, task])
    setTask("")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Lista de Tarefas</h1>
      <h2 className="text-lg text-gray-500">Organize suas tarefas de forma simples e elegante</h2>
      <div className="flex  items-center bg-white rounded-md p-2 w-[28rem] gap-2 mt-4">
        <Input placeholder="Adicione uma tarefa" onChange={(e) => setTask(e.target.value)} value={task || ""} />
        <Button onClick={() => handleAddTask(task)}>
          <Plus />
        </Button>
      </div>
      <div className="mt-4">
        <Tabs defaultValue="all" className="w-[400px] bg-white rounded-md p-2">
          <TabsList className="w-full  grid-cols-2">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="favorite">Favoritas</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="flex flex-col gap-2">
            {tasks.map((task) => (
              <CardTask key={task} task={task} />
            ))}
          </TabsContent>
          <TabsContent value="favorite">
            <div>
              <h1>Favoritas</h1>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
