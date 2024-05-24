// import React, { useEffect, useState } from 'react';
// import './App.css';
// import './responsive.css';
// import FileProcessPage from './components/FileUploadPage/FileProcessPage';
// import Footer from './components/footer/Footer';
// import CreateCategory from './components/CreateCategory/CreateCategory';
// import HelpButton from './components/Button/HelpButton/HelpButton';
// import { BrowserRouter as Router, Routes, Route, useResolvedPath, useMatches, useLocation } from 'react-router-dom';
// import UpdateCategory from './components/UpdateCategory/UpdateCategory'

// import Header from './components/header/header';
// import AddCategory from './components/Add/add-category';
// import AddSubCategory from './components/Add/add-sub-category';


// function App() {
//   const location = useLocation();
//     const getHeaderTitle = () => {
//         switch (location.pathname) {
//           case '/create':
//             return 'Add New Category and Sub Category';
//           case '/update':
//             return 'Update Category and Sub Category';
//           case '/add-category':
//             return 'Create Category';
//           case '/add-sub-category':
//             return 'Create Sub Category'
            
//           default:
//             return 'Convert WORD to EXCEL';
//         }
//       };
  
 
//   // const HomePage = () => (
//   //   <React.Fragment>
//   //     <Header title="Convert WORD to EXCEL" />

//   //     <FileProcessPage />
//   //     <Footer />
//   //   </React.Fragment>
//   // );


//   return (

//     <Router>
//       <Header  />
//       <div className="page-wrapper">
//         <div className="main-page-section">
//           <div className="container">
          
//             <div className='section-category'>
//             <h1 class="headers-content mobile-title">{getHeaderTitle()}</h1>
//             <Routes>
//               <Route path="/" element={<FileProcessPage />} />
//               <Route path="/create" element={<CreateCategory />} />
//               <Route path="/update" element={<UpdateCategory />} />
//               <Route path='/add-category' element={<AddCategory />} />
//               <Route path='/add-sub-category' element={<AddSubCategory />} />
//             </Routes>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </Router>

//   );
// }

// export default App;


// import './App.css';
// import FileProcessPage from './components/FileUploadPage/FileProcessPage';
// import Footer from './components/footer/Footer';
// import CreateCategory from './components/CreateCategory/CreateCategory';
// import HelpButton from './components/Button/HelpButton/HelpButton';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import UpdateCategory from './components/UpdateCategory/UpdateCategory'


// function App() {
//   return (
//     <div>
//     <FileProcessPage />
//     <Footer />
//     </div>
//   )
// }
// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './responsive.css';
import FileProcessPage from './components/FileUploadPage/FileProcessPage';
import Footer from './components/footer/Footer';
import HelpButton from './components/Button/HelpButton/HelpButton';
import Header from './components/header/header';
import AddCategory from './components/Add/add-category';
import AddSubCategory from './components/Add/add-sub-category';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();

  const getHeaderTitle = () => {
    switch (location.pathname) {
      case '/create':
        return 'Add New Category and Sub Category';
      case '/update':
        return 'Update Category and Sub Category';
      case '/add-category':
        return 'Create Category';
      case '/add-sub-category':
        return 'Create Sub Category';
      default:
        return 'Convert WORD to EXCEL';
    }
  };

  return (
    <>
      <Header title={getHeaderTitle()} />
      <div className="page-wrapper">
        <div className="main-page-section">
          <div className="container">
            <div className='section-category'>
              <h1 className="headers-content mobile-title">{getHeaderTitle()}</h1>
              <Routes>
                <Route path="/" element={<FileProcessPage />} />
                {/* <Route path="/create" element={<CreateCategory />} />
                <Route path="/update" element={<UpdateCategory />} /> */}
                <Route path='/add-category' element={<AddCategory />} />
                <Route path='/add-sub-category' element={<AddSubCategory />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
