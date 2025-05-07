import Content from "@/components/dashboard/content"
import Layout from "@/components/layout/layout"

export default function Dashboard() {
  return (
    <Layout>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl -z-10"></div>
        <Content />
      </div>
    </Layout>
  )
}
