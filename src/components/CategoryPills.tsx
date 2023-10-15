import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useReducer, useRef, useState } from "react";

type CategoryPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  onSelect,
  selectedCategory,
}: CategoryPillsProps) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container === null) {
        return;
      }
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        style={{ transform: `translateX(-${translate}px)` }}
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
      >
        {categories.map((category) => (
          <Button
            onClick={() => onSelect(category)}
            key={category}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible ? (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            onClick={() => {
              setTranslate((translate: any) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
            className="h-full aspect-square w-auto p-1.5"
            variant={"ghost"}
            size={"icon"}
          >
            <ChevronLeft />
          </Button>
        </div>
      ) : null}

      {isRightVisible ? (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            onClick={() => {
              setTranslate((translate: any) => {
                if (containerRef.current == null) {
                  console.log("this is the ");
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current?.scrollWidth; // this will give the entire scrolled width
                const width = containerRef.current?.clientWidth; // this will give the visible width
                console.log(newTranslate, width, edge);
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
            className="h-full aspect-square w-auto p-1.5"
            variant={"ghost"}
            size={"icon"}
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryPills;
