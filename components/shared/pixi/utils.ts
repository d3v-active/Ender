// PixiJS utility helpers with full TypeScript type safety

import { Application, Assets, Sprite, Texture, Container } from "pixi.js";

/**
 * Checks if the Pixi Application's rendering context has been lost.
 */
export const isDestroyed = (app: Application): boolean => {
  if (!app.ticker || !app.renderer || !app.stage || !app.renderer.gl) return true;
  return app.renderer.gl.isContextLost();
};

/**
 * Generates a texture from a Container. Returns a fallback white texture if the app is destroyed.
 */
export const generateTexture = (app: Application, graphic: Container): Texture => {
  const renderer = app.renderer;
  if (!isDestroyed(app)) {
    return renderer.generateTexture(graphic);
  }
  return Texture.WHITE;
};

/** Converts degrees to radians. */
export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/** Loads an image path as a Sprite, using cached texture if available. */
export const imageToSprite = async (app: Application, path: string): Promise<Sprite> => {
  let texture;
  if (Assets.cache.has(path)) {
    texture = Assets.cache.get(path);
  } else {
    texture = await Assets.load(path);
  }
  const sprite = Sprite.from(texture);
  return sprite;
};

/** Creates a render loop that caps the update rate to the given FPS. */
export const createRenderWithFPS = (app: Application, fps: number) => {
  let lastUpdateTime = 0;
  return () => {
    const currentTime = performance.now();
    const timeSinceLastUpdate = currentTime - lastUpdateTime;
    if (timeSinceLastUpdate >= 1000 / fps) {
      app.ticker.update();
      app.render();
      lastUpdateTime = currentTime;
    }
  };
};

/** Returns a promise that resolves when the Pixi canvas dispatches "pixi-initialized". */
export const waitUntilPixiIsReady = (app: Application): Promise<void> => {
  return new Promise((resolve) => {
    app.canvas.addEventListener("pixi-initialized", resolve);
  });
};



