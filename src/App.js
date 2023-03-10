import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebase.js'
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
            timestamp: serverTimestamp(),
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
      console.log('not authenticated')
      return <Navigate to='/' />;
    }
    return children;
  };

  //CRUD handlers:
  const handleAddingNewPageToList = async (newPageData) => {
    const docRef = await addDoc(collection(db, "pages"), newPageData);
    return docRef;
  }

  const handleEditingPageInList = async (pageToEdit) => {
    const pageRef = doc(db, "pages", pageToEdit.id);
    await updateDoc(pageRef, pageToEdit);
  }

  const handleClickingDelete = async (id) => {
    await deleteDoc(doc(db, "pages", id));
  } 

  const handleGetRandomPageId = (pagesArr) => {
    const max = pagesArr.length;
    if (max > 0){
      const arrIndex = Math.floor(Math.random() * max);
      const randomPageId = pagesArr[arrIndex].id
      return randomPageId;
    } 
    else return null;
  }
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home listOfPages = {mainPageList} onGetRandomPageId = {handleGetRandomPageId} />} />
          <Route path='/:pageId' element={<MolPage listOfPages = {mainPageList} onGetRandomPageId = {handleGetRandomPageId} />}/>

          <Route path='/admin' element={<SharedLayout user={currentUser}/>}>
            <Route index element = {<SignIn />} />
            <Route path='dashboard' element={<ProtectedRoute><Dashboard listOfPages = {mainPageList} onClickingDelete={handleClickingDelete} /></ProtectedRoute>} />

            <Route path='addPage' element={<ProtectedRoute><AddPage onNewPageCreation={handleAddingNewPageToList}/></ProtectedRoute>}>
            </Route>

            <Route path = 'edit/:pageId' element = {<ProtectedRoute><EditPage listOfPages = {mainPageList} onEditPage={handleEditingPageInList}/></ProtectedRoute>} />

            <Route path = 'preview/:pageId' element = {<ProtectedRoute><PreviewPage pageList = {mainPageList} /></ProtectedRoute>} />
          </Route>

          <Route path='*' element={<Error />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;