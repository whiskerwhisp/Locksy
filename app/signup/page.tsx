import { SignupForm } from '@/components/signup-form'
import Navbar from "@/section/navbar"
const page = () => {
  return (
    <div>
      <Navbar/>
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
    </div>
  )
}

export default page;