import { Link } from 'react-router-dom';
import { VscEmptyWindow } from 'react-icons/vsc'
import { usePosts } from "../context/postContext"
import { PostCard } from '../components/PostCard';


export function HomePage() {

  const { posts } = usePosts()
  if (posts.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className='w-48 h-48 text-blue-600' />
        <h1 className='text-blue-700'>No have posts</h1>
        <Link to='/new' className='text-white py-3'>Create a new Post</Link>
      </div>
    );


  return (
    <div className="text-white">
      <Link to='/new' className='text-white'>Create a new Post</Link>
      <div className='grid grid-cols-3 gap-2'>
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  )

}

