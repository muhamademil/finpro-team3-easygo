import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
          <a
            href={item.href}
            className={`hover:text-gray-900 ${index === items.length - 1 ? 'text-gray-900 font-medium' : ''}`}
          >
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  );
}
