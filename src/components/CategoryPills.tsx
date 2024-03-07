import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const translateAmount = 200;

function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillsProps) {
  const [translate, setTranslate] = useState(0);
  const [leftChevronVisible, setLeftChevronVisible] = useState(false);
  const [rightChevronVisible, setRightChevronVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container === null) return;

      setLeftChevronVisible(translate > 0);

      setRightChevronVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect;
    };
  }, [containerRef, translate]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      {leftChevronVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            className="h-full aspect-square w-auto p-1.5"
            variant="ghost"
            size="icon"
            onClick={() => {
              setTranslate((translate) => {
                const newtranslate = translate - translateAmount;
                if (newtranslate <= 0) return 0;
                return newtranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {rightChevronVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full">
          <Button
            className="h-full float-end aspect-square w-auto p-1.5"
            variant="ghost"
            size="icon"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current === null) return translate;
                const newtranslate = translate + translateAmount;
                const edge = containerRef.current?.scrollWidth;
                const width = containerRef.current?.clientWidth;
                if (newtranslate + width >= edge) {
                  return edge - width;
                }
                return newtranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPills;
