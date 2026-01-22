import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HeroMediaItem } from "@/data/mockData";

// Custom shader material for curved effect with enhanced 3D depth
const vertexShader = `
  uniform float curve;
  varying vec2 vertexUV;
  varying float vDepth;
  
  void main() {
    vertexUV = uv;
    vec3 newPosition = position;
    
    // Calculate distance from center of the scene (world space X)
    float distanceFromCenter = abs((modelMatrix * vec4(position, 1.0)).x);
    
    // Apply parabolic curve - items curve UP at edges
    newPosition.y *= 1.0 + (curve / 100.0) * pow(distanceFromCenter, 2.0);
    
    // Add subtle Z depth for 3D effect
    newPosition.z -= (curve / 150.0) * pow(distanceFromCenter, 1.5);
    
    vDepth = distanceFromCenter;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D tex;
  varying vec2 vertexUV;
  varying float vDepth;
  
  void main() {
    vec4 texColor = texture2D(tex, vertexUV);
    
    // Increase vibrancy - boost saturation and contrast
    float saturationBoost = 1.2;
    float contrastBoost = 1.1;
    
    vec3 color = texColor.rgb;
    
    // Boost saturation
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, saturationBoost);
    
    // Boost contrast
    color = (color - 0.5) * contrastBoost + 0.5;
    
    // Slight brightness boost for vibrancy
    color *= 1.05;
    
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), texColor.a);
  }
`;

interface MediaPlaneProps {
  src: string;
  position: [number, number, number];
  curve: number;
  type: "image" | "video";
}

const MediaPlane = ({ src, position, curve, type }: MediaPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null);
  
  useEffect(() => {
    if (type === "image") {
      // Handle image loading
      const loader = new THREE.TextureLoader();
      // Enable CORS for external images
      loader.setCrossOrigin("anonymous");
      
      loader.load(
        src,
        (loadedTexture) => {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          loadedTexture.minFilter = THREE.LinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          setTexture(loadedTexture);
          textureRef.current = loadedTexture;
        },
        undefined,
        (error) => {
          console.error("Error loading image texture:", error);
        }
      );
    } else if (type === "video") {
      // Handle video loading
      const video = document.createElement("video");
      video.src = src;
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      
      // Create texture from video
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      
      setTexture(videoTexture);
      textureRef.current = videoTexture;
      
      // Start playing the video
      video.play().catch(error => {
        console.error("Error playing video:", error);
      });
      
      return () => {
        video.pause();
        video.remove();
        videoTexture.dispose();
      };
    }
    
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, [src, type]);

  const shaderMaterial = useMemo(() => {
    if (!texture) return null;
    return new THREE.ShaderMaterial({
      uniforms: {
        tex: { value: texture },
        curve: { value: curve },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [texture, curve]);

  if (!shaderMaterial) return null;

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.6, 1.1, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

interface MediaItem {
  src: string;
  type: "image" | "video";
}

interface SliderSceneProps {
  mediaItems: MediaItem[];
  speed: number;
  gap: number;
  curve: number;
  isPaused: boolean;
}

const SliderScene = ({ mediaItems, speed, gap, curve, isPaused }: SliderSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const { viewport } = useThree();

  // Calculate how many images we need to fill the viewport + buffer
  const planeWidth = 1 + gap / 100;
  const totalMediaItems = useMemo(() => {
    const visibleCount = Math.ceil(viewport.width / planeWidth) + 2;
    const repeats = Math.ceil(visibleCount / mediaItems.length) + 1;
    return Array(repeats)
      .fill(mediaItems)
      .flat();
  }, [mediaItems, viewport.width, planeWidth]);

  const initialOffset = useMemo(() => {
    return Math.ceil(viewport.width / (2 * planeWidth) - 0.5);
  }, [viewport.width, planeWidth]);

  useFrame((_, delta) => {
    if (!groupRef.current || isPaused) return;

    timeRef.current += delta * 0.5;
    groupRef.current.position.x = -timeRef.current * speed * 0.1;

    // Reset position for seamless loop
    const resetPoint = planeWidth * mediaItems.length;
    if (Math.abs(groupRef.current.position.x) >= resetPoint) {
      timeRef.current = 0;
      groupRef.current.position.x = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {totalMediaItems.map((mediaItem, i) => (
        <MediaPlane
          key={`${mediaItem.src}-${i}`}
          src={mediaItem.src}
          position={[(i - initialOffset) * planeWidth, 0, 0]}
          curve={curve}
          type={mediaItem.type}
        />
      ))}
    </group>
  );
};

interface CurvedSliderProps {
  items: HeroMediaItem[];
  speed?: number;
  gap?: number;
  curve?: number;
}

const CurvedSlider = ({
  items,
  speed = 12,
  gap = 25,
  curve = 18,
}: CurvedSliderProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Extract all media items (images and videos for the 3D slider)
  const mediaItems = useMemo(() => {
    return items
      .map((item) => ({
        src: item.src,
        type: item.type
      }));
  }, [items]);

  const effectivelyPaused = isPaused || prefersReducedMotion;

  return (
    <div
      className="curved-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <SliderScene
          mediaItems={mediaItems}
          speed={speed}
          gap={gap}
          curve={curve}
          isPaused={effectivelyPaused}
        />
      </Canvas>
    </div>
  );
};

export default CurvedSlider;
