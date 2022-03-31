import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import {useNavigate} from 'react-router-dom'

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate()

  const handelDelete = (_id) => {
    toast(
      (t) => (
        <div>
          <p className=" text-white ">
            Do you want to delete a post? <strong>{_id}</strong>{" "}
          </p>
          <div>
            <button
              className=" bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => {
                deletePost(_id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white text-sm rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer "
      onClick={()=>navigate("/post/"+post._id)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button
            className="bg-red-600 text-sm px-2 py-1 rounded-sm "
            onClick={() => handelDelete(post._id)}
          >
            Delete
          </button>
        </div>
        <p>{post.description}</p>
      </div>
    </div>
  );
}
