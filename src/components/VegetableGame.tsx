import React, { useState } from "react";
import Header from "./Header";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Leaf,
  Apple,
  Sprout,
  GitBranch,
  Flower,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

interface Vegetable {
  id: number;
  name: string;
  image: string;
  category: "root" | "fruit" | "stem" | "leaves" | "flower";
}

interface DraggedVegetable {
  vegetable: Vegetable;
  fromCategory?: Vegetable["category"];
}

const vegetables: Vegetable[] = [
  {
    id: 1,
    name: "Carrot",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300",
    category: "root",
  },
  {
    id: 2,
    name: "Tomato",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300",
    category: "fruit",
  },
  {
    id: 3,
    name: "Celery",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300",
    category: "stem",
  },
  {
    id: 4,
    name: "Spinach",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300",
    category: "leaves",
  },
  {
    id: 5,
    name: "Broccoli",
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=300",
    category: "flower",
  },
  {
    id: 6,
    name: "Radish",
    image: "https://images.unsplash.com/photo-1586767240180-f99c22df0a24?w=300",
    category: "root",
  },
  {
    id: 7,
    name: "Eggplant",
    image: "https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=300",
    category: "fruit",
  },
  {
    id: 8,
    name: "Asparagus",
    image: "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?w=300",
    category: "stem",
  },
  {
    id: 9,
    name: "Lettuce",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300",
    category: "leaves",
  },
  {
    id: 10,
    name: "Cauliflower",
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=300",
    category: "flower",
  },
];

const VegetableGame: React.FC = () => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingVegetables, setRemainingVegetables] = useState<Vegetable[]>(
    [],
  );
  const [categorizedVegetables, setCategorizedVegetables] = useState<
    Record<Vegetable["category"], Vegetable[]>
  >({
    root: [],
    fruit: [],
    stem: [],
    leaves: [],
    flower: [],
  });
  const [draggedVegetable, setDraggedVegetable] =
    useState<DraggedVegetable | null>(null);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRemainingVegetables([...vegetables]);
    setCategorizedVegetables({
      root: [],
      fruit: [],
      stem: [],
      leaves: [],
      flower: [],
    });
  };

  const handleDragStart = (
    e: React.DragEvent,
    vegetable: Vegetable,
    fromCategory?: Vegetable["category"],
  ) => {
    setDraggedVegetable({ vegetable, fromCategory });
    e.dataTransfer.setData("text/plain", ""); // Required for Firefox
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, category: Vegetable["category"]) => {
    e.preventDefault();
    if (draggedVegetable) {
      handleVegetableDrop(
        draggedVegetable.vegetable,
        category,
        draggedVegetable.fromCategory,
      );
      setDraggedVegetable(null);
    }
  };

  // Touch event handlers for mobile support
  const handleTouchStart = (
    vegetable: Vegetable,
    fromCategory?: Vegetable["category"],
  ) => {
    setDraggedVegetable({ vegetable, fromCategory });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
  };

  const handleTouchEnd = (
    e: React.TouchEvent,
    category: Vegetable["category"],
  ) => {
    if (draggedVegetable) {
      handleVegetableDrop(
        draggedVegetable.vegetable,
        category,
        draggedVegetable.fromCategory,
      );
      setDraggedVegetable(null);
    }
  };

  const handleVegetableDrop = (
    vegetable: Vegetable,
    targetCategory: Vegetable["category"],
    fromCategory?: Vegetable["category"],
  ) => {
    // If it's coming from another category
    if (fromCategory) {
      // Don't do anything if dropping in the same category
      if (fromCategory === targetCategory) return;

      setCategorizedVegetables((prev) => ({
        ...prev,
        [fromCategory]: prev[fromCategory].filter((v) => v.id !== vegetable.id),
        [targetCategory]: [...prev[targetCategory], vegetable],
      }));

      // Update score if moving to correct category from wrong category
      if (
        vegetable.category === targetCategory &&
        fromCategory !== targetCategory
      ) {
        setScore((prev) => prev + 1);
        toast({
          title: "Correct!",
          description: `${vegetable.name} belongs in the ${targetCategory} category!`,
          variant: "default",
          className: "bg-emerald-600 text-white border-none",
          icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          duration: 2000,
        });
      }
      // Reduce score if moving from correct category to wrong category
      else if (
        vegetable.category === fromCategory &&
        fromCategory !== targetCategory
      ) {
        setScore((prev) => prev - 1);
        toast({
          title: "Wrong Category",
          description: `${vegetable.name} doesn't belong in the ${targetCategory} category. Try again!`,
          variant: "destructive",
          className: "bg-red-600 text-white border-none",
          icon: <XCircle className="w-5 h-5 text-white" />,
          duration: 2000,
        });
      }
    } else {
      // If it's coming from the remaining vegetables
      // Check if the vegetable is already in any category
      const isAlreadyCategorized = Object.values(categorizedVegetables).some(
        (categoryVegetables) =>
          categoryVegetables.some((v) => v.id === vegetable.id),
      );

      if (isAlreadyCategorized) return;

      setRemainingVegetables((prev) =>
        prev.filter((v) => v.id !== vegetable.id),
      );
      setCategorizedVegetables((prev) => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], vegetable],
      }));

      // Update score only when initially placing in correct category
      if (vegetable.category === targetCategory) {
        setScore((prev) => prev + 1);
        toast({
          title: "Correct!",
          description: `${vegetable.name} belongs in the ${targetCategory} category!`,
          variant: "default",
          className: "bg-emerald-600 text-white border-none",
          icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          duration: 2000,
        });
      } else {
        toast({
          title: "Wrong Category",
          description: `${vegetable.name} doesn't belong in the ${targetCategory} category. Try again!`,
          variant: "destructive",
          className: "bg-red-600 text-white border-none",
          icon: <XCircle className="w-5 h-5 text-white" />,
          duration: 2000,
        });
      }
    }
  };

  const getCategoryColor = (category: Vegetable["category"]) => {
    switch (category) {
      case "root":
        return "bg-orange-100";
      case "fruit":
        return "bg-red-100";
      case "stem":
        return "bg-green-100";
      case "leaves":
        return "bg-emerald-100";
      case "flower":
        return "bg-purple-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Vegetable Categories Game
            </h2>

            {!gameStarted ? (
              <div className="text-center">
                <div className="max-w-2xl mx-auto mb-8">
                  <p className="mb-4 text-lg">
                    Learn about different parts of vegetables by sorting them
                    into their correct categories!
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4" /> Root Vegetables
                    </div>
                    <div className="flex items-center gap-2">
                      <Apple className="w-4 h-4" /> Fruit Vegetables
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4" /> Stem Vegetables
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4" /> Leafy Vegetables
                    </div>
                    <div className="flex items-center gap-2">
                      <Flower className="w-4 h-4" /> Flower Vegetables
                    </div>
                  </div>
                </div>
                <Button onClick={startGame}>Start Game</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-xl font-semibold">Score: {score}</p>
                  <p className="text-sm text-gray-600">
                    Remaining: {remainingVegetables.length}
                  </p>
                </div>

                {remainingVegetables.length === 0 && (
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-4">
                      Game Over! Final Score: {score}/{vegetables.length}
                    </h3>
                    <Button onClick={startGame}>Play Again</Button>
                  </div>
                )}

                {/* Categories Grid at the top */}
                <div className="grid grid-cols-5 gap-2">
                  {(["root", "fruit", "stem", "leaves", "flower"] as const).map(
                    (category) => (
                      <div
                        key={category}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, category)}
                        onTouchEnd={(e) => handleTouchEnd(e, category)}
                        className={`p-2 rounded-lg ${
                          draggedVegetable
                            ? "border-2 border-dashed border-primary"
                            : ""
                        } ${getCategoryColor(category)}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {category === "root" && (
                            <Sprout className="w-4 h-4" />
                          )}
                          {category === "fruit" && (
                            <Apple className="w-4 h-4" />
                          )}
                          {category === "stem" && (
                            <GitBranch className="w-4 h-4" />
                          )}
                          {category === "leaves" && (
                            <Leaf className="w-4 h-4" />
                          )}
                          {category === "flower" && (
                            <Flower className="w-4 h-4" />
                          )}
                          <h3 className="text-sm font-semibold capitalize">
                            {category}
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-1 min-h-[200px]">
                          {categorizedVegetables[category].map((vegetable) => (
                            <div
                              key={vegetable.id}
                              draggable="true"
                              onDragStart={(e) =>
                                handleDragStart(e, vegetable, category)
                              }
                              onTouchStart={() =>
                                handleTouchStart(vegetable, category)
                              }
                              className="relative group cursor-move hover:scale-105 transition-transform"
                            >
                              <div className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-center rounded-lg transition-opacity">
                                Drag to move
                              </div>
                              <img
                                src={vegetable.image}
                                alt={vegetable.name}
                                className="w-full h-16 object-cover rounded-lg"
                              />
                              <p className="text-[10px] text-center mt-1">
                                {vegetable.name}
                                {vegetable.category !== category && (
                                  <span className="block text-red-500 text-[8px]">
                                    Wrong
                                  </span>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Available Vegetables */}
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    Available Vegetables
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {remainingVegetables.map((vegetable) => (
                      <div
                        key={vegetable.id}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, vegetable)}
                        onTouchStart={() => handleTouchStart(vegetable)}
                        onTouchMove={handleTouchMove}
                        className={`cursor-move hover:scale-105 transition-transform ${
                          draggedVegetable?.vegetable.id === vegetable.id
                            ? "opacity-50"
                            : ""
                        }`}
                      >
                        <img
                          src={vegetable.image}
                          alt={vegetable.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <p className="text-center mt-2 text-sm">
                          {vegetable.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default VegetableGame;
