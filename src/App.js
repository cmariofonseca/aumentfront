import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './modules/shared/components/Navbar';
import { Dashboard } from "./modules/posts/components/Dashboard";
import { List } from './modules/posts/components/List';
import { NotFound } from "./modules/shared/components/NotFound";
import { PostProvider } from "./context/PostContext";

function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/list' element={<List />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
