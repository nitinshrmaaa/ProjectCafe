"use client";

import { Component } from "react";

/**
 * Catches anything thrown while a WebGL scene mounts or renders — a lost
 * context, a driver that refuses the canvas — and shows the photographic
 * fallback instead of leaving an empty box on the page.
 */
class CanvasBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("3D scene failed, falling back to photography:", error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;

    return this.props.children;
  }
}

export default CanvasBoundary;
