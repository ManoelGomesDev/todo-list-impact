"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { CardTask } from "@/components/cardTask";
import { v4 as uuidv4 } from 'uuid';
interface Task {
  id: string
  title: string
  favorite: boolean
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<string>("")
  
  const handleAddTask = (task: string) => {
    setTasks([...tasks, { id: uuidv4(), title: task, favorite: false }])
    setTask("")
  }

  const handleFavoriteTask = (taskToUpdate: Task) => {
    setTasks(tasks.map(task => 
      task.id === taskToUpdate.id 
        ? { ...task, favorite: !task.favorite } 
        : task
    ))
  }

  const handleDeleteTask = (task: Task) => {
    setTasks(tasks.filter((t) => t.id !== task.id))
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
          <TabsTrigger value="favorite">Favoritas ({tasks.filter(task => task.favorite).length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="flex flex-col gap-2">
            {tasks.map((task) => (
                <CardTask key={task.id} task={task.title} isFavorite={task.favorite} onFavorite={() => handleFavoriteTask(task)} onDelete={() => handleDeleteTask(task)}/>
            ))}
          </TabsContent>
          <TabsContent value="favorite" className="flex flex-col gap-2">
            {tasks.filter(task => task.favorite).map((task) => (
              <CardTask 
                key={task.id} 
                task={task.title} 
                isFavorite={task.favorite} 
                onFavorite={() => handleFavoriteTask(task)} 
                onDelete={() => handleDeleteTask(task)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
