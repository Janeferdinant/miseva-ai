import { describe, it, expect } from 'vitest';
import { getAllRegions } from '../lib/data/cuisines';
import { getCuisineEmblemMeta, REGION_EMBLEM_MAP } from '../components/CuisineEmblem';

describe('Cuisine Branding & Regional Emblems Suite', () => {
  const allRegions = getAllRegions();

  it('should have all 23 culinary regions registered in the emblem map', () => {
    expect(allRegions).toHaveLength(23);
    for (const region of allRegions) {
      expect(REGION_EMBLEM_MAP[region.id]).toBeDefined();
    }
  });

  it('should ensure each emblem has distinct culinary motifs and metadata', () => {
    const motifs = new Set<string>();
    for (const region of allRegions) {
      const emblem = getCuisineEmblemMeta(region.id);
      expect(emblem).toBeDefined();
      expect(emblem.name).toBe(region.name);
      expect(emblem.motif.length).toBeGreaterThan(10);
      expect(emblem.primaryElement.length).toBeGreaterThan(3);
      expect(emblem.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);

      // Verify no duplicates in primary motif description
      expect(motifs.has(emblem.motif)).toBe(false);
      motifs.add(emblem.motif);
    }
  });

  it('should avoid generic globe or reused emblems across unrelated regions', () => {
    const primaryElements = allRegions.map(r => getCuisineEmblemMeta(r.id).primaryElement);
    const uniqueElements = new Set(primaryElements);
    // Every region must have its own unique culinary primary element
    expect(uniqueElements.size).toBe(23);
  });

  it('should provide fallback for unknown slugs with safe accessible defaults', () => {
    const fallback = getCuisineEmblemMeta('unknown-region');
    expect(fallback).toBeDefined();
    expect(fallback.primaryElement).toBe('Universal Culinary Vessel');
  });
});
