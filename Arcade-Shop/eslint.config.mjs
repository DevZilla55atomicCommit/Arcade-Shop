import nextConfig from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: ["**/._*", "**/node_modules/**", "**/out/**", "**/.next/**"],
  },
  ...nextConfig,
  {
    // src/lib/three-scene.tsx builds a THREE.js scene graph (React.memo factory
    // that assigns meshes to refs), not a React component tree. The react/* and
    // react-hooks/* rules only understand JSX/React elements, so they misfire on
    // the ref assignments and Three.js attributes in this file.
    files: ["src/lib/three-scene.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off",
      "react-hooks/refs": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
    },
  },
];
