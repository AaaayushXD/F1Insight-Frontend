import type { Constructor } from "../services/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Users, Flag } from "lucide-react";
import { GlowingBorder } from "./ui/GlowingBorder";

interface ConstructorCardProps {
  constructor: Constructor;
  index: number;
}

export function ConstructorCard({ constructor, index }: ConstructorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <GlowingBorder className="h-full rounded-xl">
        <Card className="h-full border-transparent bg-f1-black hover:bg-f1-graphite/40 group premium-card relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Flag className="h-5 w-5 text-f1-red" />
              <span className="text-sm font-medium text-f1-steel font-orbitron tracking-wider">
                {constructor.nationality.toUpperCase()}
              </span>
            </div>
            <CardTitle className="text-2xl transition-colors flex items-center gap-2">
              <span className="group-hover:text-f1-red transition-colors">
                {constructor.name.split(" ")[0]}
              </span>
              <span className="text-f1-white">
                {constructor.name.split(" ").slice(1).join(" ")}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-f1-steel">
              <Users className="h-4 w-4" />
              <span className="text-sm">Team Data</span>
            </div>
            <div className="mt-4 pt-4 border-t border-f1-graphite/50">
              <a
                href={constructor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-f1-blue hover:text-f1-white underline-offset-4 hover:underline"
              >
                View Wiki Profile
              </a>
            </div>
          </CardContent>
        </Card>
      </GlowingBorder>
    </motion.div>
  );
}
