"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SetCard, type SetCardSet } from "@/components/SetCard";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/data/i18n";
import { hasDimensionValues, longestDimension } from "@/data/set-presentation";

type SizeFilter = "all" | "available" | "no_fixed";
type SortKey = "rank" | "longest" | "owned";
export type LibrarySet = SetCardSet & { owned: number };

export function SetLibrary({ sets, locale }: { sets: LibrarySet[]; locale: Locale }) {
  const t = getDictionary(locale).library;
  const pageSize = siteConfig.libraryPageSize;
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("all");
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("all");
  const [sort, setSort] = useState<SortKey>("rank");
  const [visibleCount, setVisibleCount] = useState<number>(pageSize);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const themes = useMemo(() => [...new Set(sets.map((set) => set.theme))].sort(), [sets]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return sets
      .filter((set) => !normalizedQuery || `${set.set_number} ${set.name} ${set.theme}`.toLowerCase().includes(normalizedQuery))
      .filter((set) => theme === "all" || set.theme === theme)
      .filter((set) => sizeFilter === "all" || (sizeFilter === "available" ? hasDimensionValues(set) : !hasDimensionValues(set)))
      .sort((a, b) => {
        if (sort === "longest") return (longestDimension(b) ?? -1) - (longestDimension(a) ?? -1);
        if (sort === "owned") return b.owned - a.owned;
        return a.rank_by_pieces - b.rank_by_pieces;
      });
  }, [query, sets, sizeFilter, sort, theme]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= filtered.length) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => Math.min(count + pageSize, filtered.length));
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [filtered.length, pageSize, visibleCount]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;

  return (
    <div>
      <div className="library-controls" aria-label={t.searchLabel}>
        <div className="field library-search"><label htmlFor="library-query">{t.searchLabel}</label><input id="library-query" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(pageSize); }} placeholder={t.searchPlaceholder} /></div>
        <div className="field"><label htmlFor="theme-filter">{t.theme}</label><select id="theme-filter" value={theme} onChange={(event) => { setTheme(event.target.value); setVisibleCount(pageSize); }}><option value="all">{t.allThemes}</option>{themes.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div className="field"><label htmlFor="size-filter">{t.builtSize}</label><select id="size-filter" value={sizeFilter} onChange={(event) => { setSizeFilter(event.target.value as SizeFilter); setVisibleCount(pageSize); }}><option value="all">{t.allRecords}</option><option value="available">{t.available}</option><option value="no_fixed">{t.noFixed}</option></select></div>
        <div className="field"><label htmlFor="sort-filter">{t.sort}</label><select id="sort-filter" value={sort} onChange={(event) => { setSort(event.target.value as SortKey); setVisibleCount(pageSize); }}><option value="rank">{t.sortRank}</option><option value="longest">{t.sortLongest}</option><option value="owned">{t.sortOwned}</option></select></div>
      </div>
      <div className="library-result-line"><strong>{filtered.length}</strong> / {sets.length} {t.match} · {t.showing} {visible.length}</div>
      {filtered.length > 0 ? <><div className="set-grid">{visible.map((set) => <SetCard key={set.set_id} set={set} locale={locale} />)}</div>{hasMore ? <div className="library-load-more" ref={loadMoreRef}><button className="button button-secondary" type="button" onClick={() => setVisibleCount((count) => Math.min(count + pageSize, filtered.length))}>{t.loadMore} ({pageSize})</button><span>{t.scroll}</span></div> : <p className="library-end">{t.allShown}</p>}</> : <div className="empty-library">{t.empty}</div>}
    </div>
  );
}
