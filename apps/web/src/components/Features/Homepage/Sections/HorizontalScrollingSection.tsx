import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type BaseItem = {
  id: string | number;
};

type HorizontalScrollingSectionProps<T extends BaseItem> = {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

export const HorizontalScrollingSection = <T extends BaseItem>({
  icon,
  title,
  subtitle,
  items,
  renderItem,
}: HorizontalScrollingSectionProps<T>) => {
  return (
    <section className="container mx-auto px-4 py-8 sm:px-10 sm:py-10">
      <div className="flex items-center gap-4 mb-6">
        {icon && icon}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 font-fat">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm">{subtitle}</p>
        </div>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4 xl:justify-between">
          {items.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
