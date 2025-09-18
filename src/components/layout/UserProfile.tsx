import { useState } from "react";
import useAuth from "../../state/useAuth";
import { DarkModeToggle } from "../ui/DarkModeToggle";
// import GoogleLogin from "../ui/GoogleLogin";
import { Button } from "../ui";
import useLoginModal from "../../state/useLoginModal";
import { AuthManager } from "../../utils/AuthManager";

const UserProfile = () => {
    const auth = useAuth();
    const loginModal = useLoginModal();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div>
            <div>
                <button
                    type="button"
                    className="flex text-sm focus:bg-gray-200 rounded-full focus:ring-2 focus:ring-gray-400 dark:focus:ring-neutral-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <span className="sr-only">Open user menu</span>
                    {!auth.user ? (
                        <i className="bi bi-sliders2 text-white text-2xl mx-3 my-2"></i>
                    ) : (
                        <img
                            className="w-10 h-10 rounded-full"
                            src={auth.picture || './assets/img/user.png'}
                            alt="user photo"
                        />
                    )}
                </button>
            </div>

            <div className={`absolute fixed top-0 left-0 w-screen h-screen ${dropdownOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={() => setDropdownOpen(false)}
            >
                <div
                    className={`z-50 absolute top-10 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm border border-gray-400 dark:border-neutral-600 dark:bg-neutral-900 dark:divide-neutral-600 transition-opacity duration-300 ${dropdownOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                        }`}
                        onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-4 py-3" role="none">
                        {auth.user ? (
                            <>
                                <p className="text-sm text-gray-900 dark:text-white" role="none">
                                    {auth.name}
                                </p>
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {auth.email}
                                </p>
                            </>
                        ) : (
                            <Button variant="transparent-blue" className="text-sm py-2.5 w-full" onClick={() => loginModal.show()}>Login</Button>
                        )}
                    </div>

                    <div className="px-4 py-3 grid space-y-4" role="none">
                        <DarkModeToggle />
                        {auth.user ? (
                            <Button variant="red" onClick={() => AuthManager.logOut()}>Logout</Button>
                        ) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
