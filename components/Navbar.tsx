const Navbar = function () {
    return (
            <nav
                className="flex w-full h-16 bg-gray-300 items-center justify-between px-5 md:px-[20%]"
            >
                <div>
                    <span className="text-gray-800 font-bold text-2xl">Swappington</span>
                </div>
                <a href="#">
                    <span className="text-gray-800 text-lg border border-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Login</span>
                </a>
            </nav>
    )
}

export default Navbar;