import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db, auth } from './firebase.js'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import SignIn from './pages/SignIn.js';

function App(){

  //useState hooks:
  const [mainPageList, setMainPageList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, 'pages'),
      (collectionSnapshot) => {
        const pages = [];
        collectionSnapshot.forEach((doc) => {
          pages.push({
            pageText: doc.data().pageText,
            backgroundImage: doc.data().backgroundImage,
            pageNumber: doc.data().pageNumber,
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
  
  return (
    <>
      mainPageList:{mainPageList}
      <SignIn />
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