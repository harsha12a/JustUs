import { useSelector } from "react-redux";
import defaultProfile from "../assets/profile.png";
import { Mail, User } from "lucide-react";

function Profile() {
  const user = useSelector((state: any) => state.user.user);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="bg-grn dark:bg-brn rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
        {/* Profile header with gradient */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600 relative">
          <div className="absolute -bottom-16 inset-x-0 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-lg">
              <img
                src={user?.profilePic || defaultProfile}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="pt-20 pb-8 px-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-2">
            {user?.username || "User"}
          </h1>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <User size={18} />
              <span>@{user?.username}</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</h3>
              <p className="mt-1 text-gray-800 dark:text-gray-200">Active</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
              <p className="mt-1 text-gray-800 dark:text-gray-200">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;