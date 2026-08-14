"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "brewhaven.favorites";

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Menu items the visitor has starred, persisted between visits.
 * Kept in localStorage so the feature works before the API exists.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(read);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggle = useCallback((id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}

export default useFavorites;
