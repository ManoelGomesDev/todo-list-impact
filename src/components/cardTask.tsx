import { Star, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function CardTask({ task }: { task: string }) {
  return (
   <Card className="p-2">
   <CardContent className="flex justify-between items-center">
    <h1>{task}</h1>
    <div className="flex gap-2">
        <Button variant="outline">
            <Star className="w-4 h-4" />
        </Button>
        <Button variant="outline">
            <Trash className="w-4 h-4" />
        </Button>
    </div>
   </CardContent>
   </Card>
  )
}