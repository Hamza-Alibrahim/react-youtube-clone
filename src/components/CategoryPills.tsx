import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeft, setIsLeft] = useState(false);
  const [isright, setIsRight] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target;
      setIsLeft(translate > 0);
      setIsRight(translate + container.clientWidth < container.scrollWidth);
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);
  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((e) => {
          return (
            <Button
              key={e}
              variant={e == selectedCategory ? "dark" : "default"}
              className="py-1 px-3 rounded-lg whitespace-nowrap"
              onClick={() => onSelect(e)}
            >
              {e}
            </Button>
          );
        })}
      </div>
      {isLeft && (
        <div className=" absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full w-auto p-1.5"
            onClick={() =>
              setTranslate((prev) => {
                const newTranslate = prev - TRANSLATE_AMOUNT;
                if (newTranslate < 0) return 0;
                return newTranslate;
              })
            }
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isright && (
        <div className=" absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-full w-auto p-1.5"
            onClick={() =>
              setTranslate((prev) => {
                if (containerRef.current === null) return translate;
                const newTranslate = prev + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) return edge - width;
                return newTranslate;
              })
            }
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};
export default CategoryPills;
