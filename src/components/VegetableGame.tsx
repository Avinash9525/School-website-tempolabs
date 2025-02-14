import React, { useState } from "react";
import Header from "./Header";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Leaf, Apple, Sprout, GitBranch, Flower } from "lucide-react";

interface Vegetable {
  id: number;
  name: string;
  image: string;
  category: "root" | "fruit" | "stem" | "leaves" | "flower";
}

const vegetables: Vegetable[] = [
  {
    id: 1,
    name: "Carrot",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop",
    category: "root",
  },
  {
    id: 2,
    name: "Tomato",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop",
    category: "fruit",
  },
  {
    id: 3,
    name: "Celery",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&h=150&fit=crop",
    category: "stem",
  },
  {
    id: 4,
    name: "Spinach",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop",
    category: "leaves",
  },
  {
    id: 5,
    name: "Radish",
    image:
      "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=150&h=150&fit=crop",
    category: "root",
  },
  {
    id: 6,
    name: "Bell Pepper",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=150&h=150&fit=crop",
    category: "fruit",
  },
  {
    id: 7,
    name: "Asparagus",
    image:
      "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?w=150&h=150&fit=crop",
    category: "stem",
  },
  {
    id: 8,
    name: "Lettuce",
    image:
      "https://images.unsplash.com/photo-1622205313162-be1d5712a43c?w=150&h=150&fit=crop",
    category: "leaves",
  },
  {
    id: 9,
    name: "Broccoli",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop",
    category: "flower",
  },
  {
    id: 10,
    name: "Cauliflower",
    image:
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=150&h=150&fit=crop",
    category: "flower",
  },
];

const VegetableGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [remainingVegetables, setRemainingVegetables] = useState<Vegetable[]>(
    [],
  );
  const [categorizedVegetables, setCategorizedVegetables] = useState<{
    [key in Vegetable["category"]]: Vegetable[];
  }>({ root: [], fruit: [], stem: [], leaves: [], flower: [] });

  const startGame = () => {
    setScore(0);
    setRemainingVegetables([...vegetables]);
    setCategorizedVegetables({
      root: [],
      fruit: [],
      stem: [],
      leaves: [],
      flower: [],
    });
    setGameStarted(true);
  };

  const [draggedVegetable, setDraggedVegetable] = useState<{
    vegetable: Vegetable;
    fromCategory?: Vegetable["category"];
  } | null>(null);

  const handleDragStart = (
    e: React.DragEvent,
    vegetable: Vegetable,
    fromCategory?: Vegetable["category"],
  ) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ vegetable, fromCategory }),
    );
    setDraggedVegetable({ vegetable, fromCategory });

    const dragImage = new Image();
    dragImage.src = vegetable.image;
    e.dataTransfer.setDragImage(dragImage, 75, 75);
  };

  const handleTouchStart = (
    vegetable: Vegetable,
    fromCategory?: Vegetable["category"],
  ) => {
    setDraggedVegetable({ vegetable, fromCategory });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (
    e: React.TouchEvent,
    targetCategory: Vegetable["category"],
  ) => {
    e.preventDefault();
    if (draggedVegetable) {
      handleVegetableDrop(
        draggedVegetable.vegetable,
        targetCategory,
        draggedVegetable.fromCategory,
      );
      setDraggedVegetable(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleVegetableDrop = (
    vegetable: Vegetable,
    targetCategory: Vegetable["category"],
    fromCategory?: Vegetable["category"],
  ) => {
    // If it's coming from another category
    if (fromCategory) {
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
      }
      // Reduce score if moving from correct category to wrong category
      else if (
        vegetable.category === fromCategory &&
        fromCategory !== targetCategory
      ) {
        setScore((prev) => prev - 1);
      }
    } else {
      // If it's coming from the remaining vegetables
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
      }
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    targetCategory: Vegetable["category"],
  ) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data) {
      const { vegetable, fromCategory } = JSON.parse(data);
      handleVegetableDrop(vegetable, targetCategory, fromCategory);
      setDraggedVegetable(null);
    }
  };

  const getCategoryColor = (category: Vegetable["category"]) => {
    if (categorizedVegetables[category].length === 0) return "bg-secondary";
    const allCorrect = categorizedVegetables[category].every(
      (v) => v.category === category,
    );
    return allCorrect ? "bg-green-100" : "bg-red-100";
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
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-xl font-semibold">Score: {score}</p>
                  <p className="text-sm text-gray-600">
                    Remaining: {remainingVegetables.length}
                  </p>
                </div>

                {remainingVegetables.length === 0 && (
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">
                      Game Over! Final Score: {score}/{vegetables.length}
                    </h3>
                    <Button onClick={startGame}>Play Again</Button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Vegetables</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
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
                            className="w-full h-24 md:h-32 object-cover rounded-lg"
                          />
                          <p className="text-center mt-2">{vegetable.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    {(
                      ["root", "fruit", "stem", "leaves", "flower"] as const
                    ).map((category) => (
                      <div
                        key={category}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, category)}
                        onTouchEnd={(e) => handleTouchEnd(e, category)}
                        className={`p-2 md:p-4 rounded-lg min-h-[150px] md:min-h-[200px] ${
                          draggedVegetable
                            ? "border-2 border-dashed border-primary"
                            : ""
                        } ${getCategoryColor(category)}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {category === "root" && (
                            <Sprout className="w-5 h-5" />
                          )}
                          {category === "fruit" && (
                            <Apple className="w-5 h-5" />
                          )}
                          {category === "stem" && (
                            <GitBranch className="w-5 h-5" />
                          )}
                          {category === "leaves" && (
                            <Leaf className="w-5 h-5" />
                          )}
                          {category === "flower" && (
                            <Flower className="w-5 h-5" />
                          )}
                          <h3 className="text-lg font-semibold capitalize">
                            {category}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {category === "root" &&
                            "Grows underground and stores nutrients"}
                          {category === "fruit" &&
                            "Contains seeds and develops from flowers"}
                          {category === "stem" &&
                            "Supports the plant and transports nutrients"}
                          {category === "leaves" &&
                            "Makes food for the plant through photosynthesis"}
                          {category === "flower" &&
                            "Edible flower buds or flower heads"}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
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
                              className="relative cursor-move hover:scale-105 transition-transform"
                            >
                              <img
                                src={vegetable.image}
                                alt={vegetable.name}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <p className="text-xs text-center mt-1">
                                {vegetable.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VegetableGame;
