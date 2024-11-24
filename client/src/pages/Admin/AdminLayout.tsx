import AdminMenu from '@/components/AdminMenu'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex gap-4">
      <AdminMenu />
      <main className="w-full md:w-3/4">
        <div>{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout