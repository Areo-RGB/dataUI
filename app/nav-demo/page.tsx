import { NavigationMenuDemo } from "@/components/ui/navigation-menu-demo"
import Layout from "@/components/layout/layout"

export default function NavigationMenuDemoPage() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Navigation Menu Component Demo</h1>
        <div className="p-6 bg-card rounded-lg border border-border shadow-md">
          <h2 className="text-xl font-medium mb-4">Example Usage</h2>
          <NavigationMenuDemo />
        </div>
      </div>
    </Layout>
  )
} 