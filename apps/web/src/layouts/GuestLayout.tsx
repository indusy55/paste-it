import { Outlet } from 'react-router'

export default function GuestLayout() {
  return (
    <div className="w-full h-full px-8">
      <Outlet />
    </div>
  )
}
