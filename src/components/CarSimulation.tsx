import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const CarSimulation: React.FC = () => {
  const [speed, setSpeed] = useState(5); // pixels per frame
  const [isRunning, setIsRunning] = useState(false);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(0);
  const [data, setData] = useState<{ time: number; position: number }[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let startTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isRunning) return;

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      const newTime = (currentTime - startTime) / 1000;
      const newPosition = position + speed * deltaTime;

      setPosition(newPosition);
      setTime(newTime);

      // Update data points every 100ms
      if (newTime - time >= 0.1) {
        setData((prevData) => [
          ...prevData,
          {
            time: Number(newTime.toFixed(1)),
            position: Number(newPosition.toFixed(1)),
          },
        ]);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      lastTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, speed, position, time]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPosition(0);
    setTime(0);
    setData([]);
    lastTimeRef.current = 0;
  };

  const chartData = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label: "Position",
        data: data.map((d) => d.position),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Position vs Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (s)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Position (px)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Car Motion Simulation</h2>

            {/* Controls */}
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Speed (pixels/second)
                </label>
                <Slider
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>

              <div className="space-x-4">
                <Button onClick={handleStart} disabled={isRunning}>
                  Start
                </Button>
                <Button
                  onClick={handleStop}
                  disabled={!isRunning}
                  variant="outline"
                >
                  Stop
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              </div>
            </div>

            {/* Car Animation */}
            <div className="mb-8 border-b-2 border-gray-300 relative overflow-x-auto">
              <div
                style={{
                  width: "100%",
                  minWidth: "800px",
                  height: "100px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "0",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#CBD5E1",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: `${position}px`,
                    bottom: "22px",
                    transform: "translateY(50%)",
                    transition: "left 0.1s linear",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.4 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Position-Time Graph */}
            <div className="h-[400px]">
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Current Values */}
            <div className="mt-4 space-y-2">
              <p className="text-sm">Current Time: {time.toFixed(1)} seconds</p>
              <p className="text-sm">
                Current Position: {position.toFixed(1)} pixels
              </p>
              <p className="text-sm">Current Speed: {speed} pixels/second</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarSimulation;
