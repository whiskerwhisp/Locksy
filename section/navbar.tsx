import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" flex justify-between bg-white shadow-md py-5 px-10 border border-gray-200 ">
      <div>
        <h1>Locksy</h1>
    </div>
      <div className="flex space-x-5">
  <Link href="/">Home</Link>
  <Link href="/signup">SignUp</Link>
  <Link href="/login">Login</Link>
      </div>
    </div>
  )
}

export default Navbar;
