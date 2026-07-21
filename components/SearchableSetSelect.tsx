"use client";

import Image from "next/image";
import { type ChangeEvent, type FocusEvent, type KeyboardEvent, useMemo, useRef, useState } from "react";

type SearchableSet = {
  set_id: string;
  set_number: string;
  name: string;
  imageAvailable: boolean;
};

type SearchableSetSelectProps = {
  id: string;
  label: string;
  sets: SearchableSet[];
  value: string;
  locale: string;
  placeholder: string;
  noResults: string;
  openLabel: string;
  closeLabel: string;
  onChange: (setNumber: string) => void;
};

function optionLabel(set: SearchableSet) {
  return `#${set.set_number} · ${set.name}`;
}

function imagePath(set: SearchableSet) {
  return set.imageAvailable ? `/set-images/${set.set_id}.jpg` : null;
}

export function SearchableSetSelect({
  id,
  label,
  sets,
  value,
  locale,
  placeholder,
  noResults,
  openLabel,
  closeLabel,
  onChange,
}: SearchableSetSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = sets.find((set) => set.set_number === value) ?? sets[0];
  const selectedLabel = optionLabel(selected);
  const [inputValue, setInputValue] = useState(selectedLabel);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = `${id}-listbox`;
  const showSelectedThumbnail = inputValue === selectedLabel;
  const selectedImage = imagePath(selected);

  const filteredSets = useMemo(() => {
    const query = (inputValue === selectedLabel ? "" : inputValue).trim().toLocaleLowerCase(locale);
    if (!query) return sets;
    return sets.filter((set) => `${set.set_number} ${set.name}`.toLocaleLowerCase(locale).includes(query));
  }, [inputValue, locale, selectedLabel, sets]);

  const openList = () => {
    setIsOpen(true);
    const selectedIndex = filteredSets.findIndex((set) => set.set_number === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const closeList = () => {
    setIsOpen(false);
    setInputValue(selectedLabel);
  };

  const chooseSet = (set: SearchableSet) => {
    onChange(set.set_number);
    setInputValue(optionLabel(set));
    setIsOpen(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setActiveIndex(0);
    setIsOpen(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openList();
        return;
      }
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => {
        if (!filteredSets.length) return 0;
        return (current + direction + filteredSets.length) % filteredSets.length;
      });
      return;
    }
    if (event.key === "Enter" && isOpen && filteredSets[activeIndex]) {
      event.preventDefault();
      chooseSet(filteredSets[activeIndex]);
      return;
    }
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeList();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) closeList();
  };

  return (
    <div className="field set-search-field">
      <label htmlFor={id}>{label}</label>
      <div className="set-combobox" data-has-thumbnail={showSelectedThumbnail} ref={rootRef} onBlur={handleBlur}>
        {showSelectedThumbnail ? (
          <span className="set-combobox-selected-image" aria-hidden="true">
            {selectedImage
              ? <Image src={selectedImage} alt="" fill unoptimized sizes="38px" />
              : <span>#{selected.set_number}</span>}
          </span>
        ) : null}
        <input
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-activedescendant={isOpen && filteredSets[activeIndex] ? `${id}-option-${filteredSets[activeIndex].set_number}` : undefined}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInput}
          onFocus={(event) => {
            event.currentTarget.select();
            openList();
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="set-combobox-toggle"
          aria-label={isOpen ? closeLabel : openLabel}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          onClick={() => {
            if (isOpen) closeList();
            else {
              setInputValue(selectedLabel);
              openList();
            }
          }}
        >
          <span aria-hidden="true">⌄</span>
        </button>
        {isOpen ? (
          <div className="set-combobox-list" id={listboxId} role="listbox" aria-label={label}>
            {filteredSets.length ? filteredSets.map((set, index) => (
              <button
                type="button"
                id={`${id}-option-${set.set_number}`}
                className="set-combobox-option"
                data-active={index === activeIndex}
                role="option"
                aria-selected={set.set_number === value}
                tabIndex={-1}
                key={set.set_number}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseSet(set)}
              >
                <span className="set-combobox-option-image" aria-hidden="true">
                  {imagePath(set)
                    ? <Image src={imagePath(set) ?? ""} alt="" width={48} height={36} unoptimized sizes="48px" />
                    : <span>#{set.set_number}</span>}
                </span>
                <span className="set-combobox-option-number">#{set.set_number}</span>
                <strong>{set.name}</strong>
              </button>
            )) : <p className="set-combobox-empty">{noResults}</p>}
          </div>
        ) : null}
      </div>
    </div>
  );
}
