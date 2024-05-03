import './App.css';
import FileProcessPage from './components/FileUploadPage/FileProcessPage'
import Footer from './components/footer/Footer';





function App() {


  // const[ShowModal,setShowModal] =useState(false);
  // const handbuttonclick=()=>{
  //   setShowModal(false)
  // }
  return (
    <div className='App-header'>
    {/* //   <button className="btn btn-no" onClick={()=>setShowModal(true)}>No</button> */}
      <FileProcessPage />
      <Footer />
      {/* {ShowModal &&
      <ModalAlert onSubmit={handbuttonclick} onCancel={handbuttonclick} onClose={handbuttonclick}/>
} */}
    </div>
     );
}

export default App;
