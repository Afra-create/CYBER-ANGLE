import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  open: 2400,
  danger: 2900,
  tension: 1000,
  shield: 3400,
  resolve: 3500,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  open: Scene1,
  danger: Scene2,
  tension: Scene3,
  shield: Scene4,
  resolve: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617]">
      {/* Persistent Background Layer */}
      <motion.div
        className="absolute inset-0 transition-colors duration-2000"
        animate={{
          background: sceneIndex >= 3
            ? 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)'
            : 'radial-gradient(circle at center, #020617 0%, #000000 100%)'
        }}
      />

      {/* Dynamic light pulse in the center for shield scene */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[100px] pointer-events-none"
        animate={{
          background: sceneIndex >= 3 ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' : 'transparent',
          scale: sceneIndex >= 3 ? [0.8, 1.1, 1] : 0,
          opacity: sceneIndex >= 3 ? 1 : 0
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* The Neighborhood Image Layer - Persists across all scenes */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: sceneIndex >= 0 ? 1 : 0,
          scale: sceneIndex >= 3 ? 1.02 : 1,
        }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={`${import.meta.env.BASE_URL}neighborhood.png`}
          alt="Neighborhood"
          className="w-[80vw] max-w-[1200px] object-contain opacity-70"
          style={{
            filter: sceneIndex >= 3
              ? 'drop-shadow(0 0 30px rgba(59,130,246,0.2)) brightness(1.2)'
              : 'brightness(0.7)'
          }}
        />
      </motion.div>

      {/* Global Shield overlay that covers everything from scene 4 */}
      <motion.div
        className="absolute inset-x-[10vw] bottom-0 top-[20vh] rounded-t-full border-t-2 border-[#3b82f6]/30 bg-gradient-to-t from-[#3b82f6]/10 to-transparent pointer-events-none backdrop-blur-[2px]"
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{
          opacity: sceneIndex >= 3 ? 1 : 0,
          scale: sceneIndex >= 3 ? 1 : 0.8,
          y: sceneIndex >= 3 ? 0 : 100
        }}
        transition={{ duration: 1.5, ease: "easeOut", delay: sceneIndex === 3 ? 0.5 : 0 }}
      />

      <AnimatePresence mode="sync">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
