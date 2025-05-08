"use client"

import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";


interface CardTaskProps {

    task: string
    isFavorite: boolean
    onFavorite: (task: string) => void
    onDelete: (task: string) => void
}

export function CardTask({  task, isFavorite, onFavorite, onDelete }: CardTaskProps) {

    const handleFavoriteTask = () => {
        onFavorite(task)
    }

    const handleDeleteTask = () => {
        onDelete(task)
    }

  return (
   <Card className="p-2">
   <CardContent className="flex justify-between items-center">
    <h1>{task}</h1>
    <div className="flex gap-2">
        <Button variant="outline" onClick={handleFavoriteTask} className="cursor-pointer">
            {isFavorite ? <MdOutlineStar color="yellow" className="w-4 h-4" /> : <MdOutlineStarBorder className="w-4 h-4"/>}
        </Button>
        <Button variant="outline" onClick={handleDeleteTask} className="cursor-pointer">
        <FaRegTrashCan color="red" className="w-4 h-4" />
        </Button>
    </div>
   </CardContent>
   </Card>
  )
}