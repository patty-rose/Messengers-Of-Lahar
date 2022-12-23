import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase.js'
import SignIn from './pages/SignIn.js';
import Home from './pages/Home.js';
import MolPage from './pages/MolPage.js';
import SharedLayout from './components/SharedLayout.js';
import Dashboard from './pages/Dashboard.js';
import AddPage from './pages/AddPage.js';
import EditPage from './pages/EditPage.js';
import PreviewPage from './pages/PreviewPage.js';
import Error from './pages/Error.js';

function App(){

  //useState hooks:
  const [mainPageList, setMainPageList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  //Auth object & observer:
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // localStorage.setItem("authUser", JSON.stringify(authUser));
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
      // localStorage.removeItem("authUser");
    }
  });

  //query Firestore
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, 'pages'),
      (collectionSnapshot) => {
        const pages = [];
        collectionSnapshot.forEach((doc) => {
          pages.push({
            pageText: doc.data().pageText,
            backgroundImage: doc.data().backgroundImage,
            id: doc.id,
          });
        });
        setMainPageList(pages);
      },
      (error) => {
        //add more
      }
    );
    return () => unSubscribe();
  }, []);

  //protected route comp:
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/' />;
    }
    return children;
  };

  //CRUD handlers:
  const handleAddingNewPageToList = async (newPageData) => {
    const docRef = await addDoc(collection(db, "page"), newPageData);
    return docRef;
  }

  const handleEditingPageInList = async (pageToEdit) => {
    const pageRef = doc(db, "pages", pageToEdit.id);
    await updateDoc(pageRef, pageToEdit);
  }

  const handleDeletingPage = async (id) => {
    await deleteDoc(doc(db, "pages", id));
  } 
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:pageId' element={<MolPage />}/>

          <Route path='/admin' element={<SharedLayout />}>
            <Route index element = {<SignIn />} />
            <Route path='dashboard' element={<ProtectedRoute><Dashboard pageList = {mainPageList} /></ProtectedRoute>} />

            <Route path='addPage' element={<ProtectedRoute><AddPage onNewPageCreation={handleAddingNewPageToList}/></ProtectedRoute>}>
            </Route>

            <Route path = 'edit/:pageId' element = {<ProtectedRoute><EditPage pageList = {mainPageList} onEditPage={handleEditingPageInList}/></ProtectedRoute>} />

            <Route path = 'preview/:pageId' element = {<ProtectedRoute><PreviewPage pageList = {mainPageList} /></ProtectedRoute>} />
          </Route>

          <Route path='*' element={<Error />} />
        </Routes>
    </BrowserRouter>
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<MolTitlePage />} />
    //     <Route path="/MolPages/:thisPageNumber" element={<MolPages mainPageList = {mainPageList}/>} />

    //     <Route 
    //       path="/admin" 
    //       element={<PageControl />} >

    //       <Route index element={<PageList mainPageList = {mainPageList} setMainPageList = {setMainPageList} selectedPage = {selectedPage} setSelectedPage = {setSelectedPage} />} />
    //       <Route path='AddPage' element={<AddPage />} />
    //       <Route path='details/:thisPageId' element={<PageDetail mainPageList = {mainPageList} />}/>
    //       <Route path='editPage/:thisPageId' element={<EditPage mainPageList = {mainPageList} />}/>

    //     </Route>

    //     <Route path='*' element={<Error />} />
        
    //   </Routes>
    // </Router>
  );
}

export default App;