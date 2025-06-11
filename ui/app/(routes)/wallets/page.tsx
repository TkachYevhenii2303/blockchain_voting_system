"use client";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModeToggle } from "@/components/sidebar/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { Separator } from "@/components/shadcn/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn/ui/sidebar";
import { EnhancedWalletManager } from "@/components/wallets/wallet-manager";
import { ProfileWidget } from "@/components/cards/profile-card";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-2 sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="hidden sm:flex">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden lg:block">
                  <BreadcrumbLink href="#" className="text-sm">
                    Blockchain Voting System
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden lg:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium">
                    Wallets
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-2 sm:px-4">
            <ModeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 lg:p-6 pt-2 sm:pt-4">
          {/* Mobile: Stack vertically, Tablet: 1 column, Desktop: 2 columns */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 lg:gap-6">
            {/* Main Content - Wallet Manager */}
            <div className="w-full">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                <EnhancedWalletManager />
              </div>
            </div>

            {/* Sidebar Content - Profile Widget */}
            <div className="w-full">
              <div className="rounded-xl border bg-card text-card-foreground shadow-sm min-h-[300px] sm:min-h-[400px] xl:min-h-[500px]">
                <ProfileWidget />
              </div>
            </div>
          </div>

          {/* Additional responsive section for future content */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Placeholder for future widgets */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
