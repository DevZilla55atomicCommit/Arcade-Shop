---
name: threejs-webgl
description: Custom 3D scenes with WebGL
---

# Three.js WebGL Skill

Use when building custom 3D scenes with raw Three.js/WebGL.

## Core Concepts

- Scene, Camera, Renderer setup
- Geometry, Material, Mesh
- Lighting (Ambient, Directional, Point, Spot)
- Shadows (PCF, PCFSoft, VSM)
- Post-processing (EffectComposer, passes)
- Shaders (GLSL, ShaderMaterial)
- Loaders (GLTF, OBJ, Texture, Font)

## Arcade Effects

- CRT shader (scanlines, curvature, vignette, noise)
- Neon glow materials
- Particle systems
- Grid floor with animated colors
- Floating geometry with emissive materials

## Performance

- InstancedMesh for repeated objects
- Frustum culling
- Texture atlasing
- Level of detail (LOD)
- GPU instancing
- Minimize state changes

## Optimization

- Reuse geometries/materials
- Dispose on unmount
- Compressed textures (KTX2, Basis)
- DRACO compression for GLTF
- Web Workers for heavy computation