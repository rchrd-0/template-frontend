import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/utils/tailwind";

export function PageLayout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="w-full bg-background">
      <div
        data-slot="page-layout"
        className={cn(
          "mx-auto flex min-h-screen w-full min-w-0 max-w-5xl flex-col gap-8 p-4 sm:gap-12 sm:p-6 lg:p-12 2xl:max-w-6xl",
          className,
        )}
        {...props}
      />
      <Toaster />
    </div>
  );
}
