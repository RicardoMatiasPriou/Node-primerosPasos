import './App.css';
import { PostForm, HomePage, NotFundPage } from './pages'
import { Routes, Route, } from 'react-router-dom';
import { PostProvider } from './context/postContext';
import { Toaster } from 'react-hot-toast';


function App() {
  return (

    <div className='bg-neutral-500 min-h-screen flex items-center'>
      <div className='px-10 container m-auto'>
     <PostProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/new' element={<PostForm />} />
            <Route path='/post/:id' element={<PostForm />} />
            <Route path='*' element={<NotFundPage />} />
          </Routes>
          <Toaster />
     </PostProvider>

      </div>
    </div>
  );
}

export default App;