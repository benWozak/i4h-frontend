import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-full border-gray-200 bg-gray-100/[.9] focus:bg-white p-2 pe-32 text-sm font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface SearchInputProps extends InputProps {
  iconClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, iconClassName, ...props }, ref) => {
    return (
      <div className="relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 pb-1 transform -translate-y-1/2 text-gray-400 z-10",
            iconClassName
          )}
        />
        <Input className={cn("pl-10", className)} ref={ref} {...props} />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { Input, SearchInput };
