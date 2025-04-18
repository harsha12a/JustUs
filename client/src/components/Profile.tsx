import { useSelector } from "react-redux";
import profile from "../assets/profile.png";
// import { useNavigate } from "react-router-dom";
// import { Pencil } from "lucide-react";

function Profile() {
  const user = useSelector((state: any) => state.user.user);
  // const navigate = useNavigate();

  // const handleEdit = () => {
  //   // You can replace this with a modal or real route
  //   navigate("/edit-profile");
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-grn dark:bg-brn px-4">
      <div className="bg-white dark:bg-[#1f1f1f] shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-brn dark:border-grn mb-4">
          <img
            src={user.profilePic || profile}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-brn dark:text-grn">
          Welcome, {user.username}
        </h1>
        <p className="text-md mt-2 text-brn dark:text-grn font-medium">
          Email: {user.email}
        </p>
        {/* <button
          onClick={handleEdit}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brn dark:bg-grn text-white dark:text-brn hover:scale-105 transition-transform"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button> */}
      </div>
    </div>
  );
}

export default Profile;
