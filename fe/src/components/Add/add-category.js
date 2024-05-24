// import {
//   faCheck,
//   faCirclePlus,
//   faPencil,
//   faPlus,
//   faTrash,
//   faTrashCan,
//   faX,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import axios from "axios";
// import "./add-category.css";
// import ModalAlert from "../Alerts/ModalAlert";
// import WarmingAlert from "../Alerts/WarmingAlert"
// import SuccessAlert from "../Alerts/SuccessAlert"


// const AddCategory = () => {
//   const [showAdd, setShowAdd] = useState(false);
//   const [showCategory, setShowCategory] = useState([]);
//   const [addCategory, setAddCategory] = useState({
//     category_name: "",
//   });
//   const [editIndex, setEditIndex] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [putcategory, setPutCategory] = useState({
//     category: "",
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [updateSave, setUpdateSave] = useState(false);
//   const [putApi, setPutApi] = useState("");
//   const [originalCategory, setOriginalCategory] = useState("");
//   const [warningSave, setWarningSave] =useState(false)
//   const [deleteSuccess,setDeleteSuccess] =useState(false)
//   const [createSuccess,setCreateSuccess] =useState(false)
//   const [updateSuccess,setUpdateSuccess] =useState(false)



//   const handleUpdaetCategory = (index) => {
//     // debugger
//     if (originalCategory !== showCategory[index].category) {
//       setUpdateSave(true);
//       setPutCategory({ ...putcategory, category: showCategory[index].category });
//       setPutApi(`${process.env.REACT_APP_PUT_API}/${showCategory[index].id}/update/`);
//     }else{
//       setWarningSave(true)
//       setTimeout(() => {
//         setWarningSave(false)
//       }, 4000);
//     }
//     // showModal(false)
//   };
    

//   const handleUpdateConfimation = () => {
//     setShowAdd(true);

//     axios
//       .put(putApi, putcategory)
//       .then((response) => {
//         setUpdateSuccess(true)
//         setTimeout(() => {
//           setUpdateSuccess(false)
//         }, 4000);
//         console.log("Category Updated successfully", response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setUpdateSave(false);
//     setShowAdd(false);
//   };
//   // }
//   const handleCancelUpdate = () => {
//     setUpdateSave(false);
//   };
  

//   const handleEditClose = (index) => {
//     if (editIndex === index) {
//       setShowAdd(false);
//       setEditIndex(null);
//     }
//   };

//   const handleEditCategory = (index) => {
//     setEditIndex(index);
//     setOriginalCategory(showCategory[index].category);
//     setShowAdd(true);
//   };

//   const handleChangeCategory = (e, index) => {
//     const updatedCategories = [...showCategory]; // Create a copy of the showCategory array
//     updatedCategories[index].category = e.target.value; // Update the category name at the specific index

//     setShowCategory(updatedCategories); // Set the updated array as the new state
//   };

//   const handlePostCategory = (e) => {
//     if (e.target.value.length <= 50) {
//       setAddCategory({ ...addCategory, category_name: e.target.value });
//     } else
//       setErrorMessage("Invaalid Category name cannot exceed 50 characters!!");
//   };

//   const handleCreateCategory = () => {
//     if (!addCategory.category_name.trim()) {
//       setErrorMessage("Invalid Category name cannot be empty!!");
//       return <p>The category was empty</p>;
//     }

//     if (addCategory.category_name.length > 50) {
//       setErrorMessage("Invaalid Category name cannot exceed 50 characters!!");
//       return;
//     }

//     const CreateCategoryApi = process.env.REACT_APP_EXCEL_DOWNLOAD_POST_API;
//     axios
//       .post(CreateCategoryApi, addCategory)
//       .then((response) => {
//         console.log("category added successfully", response.data);
//         setShowCategory([...showCategory, response.data]);
//         setAddCategory({ category_name: "" });
//         setShowAdd(false);
//         setEditIndex(null);
//         setCreateSuccess(true);
//         setTimeout(() => {
//           setCreateSuccess(false);
//         }, 4000);

//       })
//       .catch((error) => {
//         console.log("error in adding category", error);
//       });
//   };

//   useEffect(() => {
//     axios
//       .get(process.env.React_APP_DATA_API)
//       .then((response) => {
//         setShowCategory(response.data);
//       })
//       .catch((error) => {
//         console.log("Error fetching categories:", error);
//       });
//   }, []);


//   const handleDeleteCategory = (category) => {
//     setShowModal(true); 
//     setAddCategory(category);
//   };


//   const handleConfirmDelete = () => {
//     const DeleteApi = `${process.env.REACT_APP_DELETE_API}/${addCategory.id}/delete/`;
//     axios
//       .delete(DeleteApi)
//       .then((response) => {
//         setShowModal(false);
//         setDeleteSuccess(true)
//         setTimeout(() => {
//           setDeleteSuccess(false)
//         }, 4000);
//         console.log("Category deleted successfully", response.data);
//         setShowCategory(
//           showCategory.filter((cat) => cat.id !== addCategory.id)
//         );
//       })
//       .catch((error) => {
//         console.log("Error in deleting category", error);
//       });
//   };

//   const handleCancelDelete = () => {
//     setShowModal(false); 
//   };
  

//   return (
//     <React.Fragment>
//       <div className="breadcrumb-container">
//         <div className="sub-category-form">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Please Enter Category Name"
//             onChange={handlePostCategory}
//             value={addCategory.category_name}
//           />

//           <button className="button-create" onClick={handleCreateCategory}>
//             <FontAwesomeIcon icon={faPlus} /> Create
//           </button>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//         </div>
//         <Link to="/" className="link-back">
//           Back
//         </Link>
//       </div>
//       <table className="table-container">
//         <thead>
//           <tr>
//             <th>Category Name</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {showCategory.map((category, index) => (
//             <tr key={index}>
//               <td>
//                 {showAdd && editIndex === index ? (
//                   <div>
//                     <input
//                       type="text"
//                       value={showCategory[index].category}
//                       className="input-table-edit"
//                       onChange={(e) => handleChangeCategory(e, index)}
//                     />
//                   </div>
//                 ) : (
//                   <div>{category.category}</div>
//                 )}
//               </td>
//               <td>
//                 {showAdd && editIndex === index ? (
//                   <div className="action-button-container">
//                     <button
//                       className="action-button action-button-add"
//                       onClick={() => handleUpdaetCategory(index)}
//                     >
//                       <FontAwesomeIcon icon={faCheck} />
//                     </button>
//                     <button
//                       className="action-button action-button-delete"
//                       onClick={() => handleEditClose(index)}
//                     >
//                       <FontAwesomeIcon icon={faX} />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="action-button-container">
//                     <button
//                       className="action-button action-button-add"
//                       onClick={() => handleEditCategory(index)}
//                     >
//                       <FontAwesomeIcon icon={faPencil} />
//                     </button>
//                     <button
//                       className="action-button action-button-delete"
//                       onClick={() => handleDeleteCategory(category)}
//                     >
//                       <FontAwesomeIcon icon={faTrashCan} />
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {showModal && (
//         <ModalAlert
//           onSubmit={handleConfirmDelete} 
//           onCancel={handleCancelDelete} 
//           onClose={handleCancelDelete}
//         >
//           Are you sure you want to delete this category?
//         </ModalAlert>
//       )}
//       {updateSave && (
//         <ModalAlert
//           onSubmit={handleUpdateConfimation}
//           onCancel={handleCancelUpdate}
//           onClose={handleCancelUpdate}
//         >
//           Are You sure you want to update this category?
//         </ModalAlert>
//       )}
//       {warningSave && (
//         <WarmingAlert message="No changes in category!!!" />
//       )}
//       {deleteSuccess && (
//         <SuccessAlert message="The selected category was deleted successfully" />
//       )}
//       {createSuccess && (
//         <SuccessAlert message="category created successfully!!!" />
//       )}
//       {updateSuccess && (
//         <SuccessAlert message="category updated successfully!!!" />
//       )}



//     </React.Fragment>
//   );
// };
// export default AddCategory;








import {
  faCheck,
  faPencil,
  faPlus,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./add-category.css";
import ModalAlert from "../Alerts/ModalAlert";
import WarningAlert from "../Alerts/WarmingAlert";
import SuccessAlert from "../Alerts/SuccessAlert";
import ErrorAlert from "../Alerts/ErrorAlert";
import WarmingAlert from "../Alerts/WarmingAlert"

const AddCategory = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showCategory, setShowCategory] = useState([]);
  const [addCategory, setAddCategory] = useState({
    category_name: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [putcategory, setPutCategory] = useState({
    category: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [updateSave, setUpdateSave] = useState(false);
  const [putApi, setPutApi] = useState("");
  const [originalCategory, setOriginalCategory] = useState("");
  const [warningSave, setWarningSave] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [createApiError, setCreateApiError] = useState(false);
  const [updateApiError, setUpdateApiError] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState(false);
  const [errorCatgory,setErrorCatgory] =useState(false);
  const [categoryError,setCategoryError] =useState(false);
  const [categoryDigitError,setCategoryDigitError] =useState(false)




  const handleUpdateCategory = (index) => {
    if (originalCategory !== showCategory[index].category) {
      setUpdateSave(true);
      setPutCategory({ ...putcategory, category: showCategory[index].category });
      setPutApi(`${process.env.REACT_APP_PUT_API}/${showCategory[index].id}/update/`);
    } else {
      setWarningSave(true);
      setTimeout(() => {
        setWarningSave(false);
      }, 4000);
    }
  };


  const handleUpdateConfirmation = () => {
    axios
      .put(putApi, putcategory)
      .then((response) => {
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 4000);
        console.log("Category Updated successfully", response.data);
        setShowCategory(
          showCategory.map((cat) =>
            cat.id === response.data.id ? response.data : cat
          )
        );
      })
      .catch((error) => {
        setUpdateApiError(true);
        setTimeout(() => {
          setUpdateApiError(false)
        }, 3000);
        console.log(error);
      });
    setUpdateSave(false);
    setShowAdd(false);
  };


  const handleCancelUpdate = () => {
    setUpdateSave(false);
  };


  const handleEditClose = (index) => {
    if (editIndex === index) {
      setShowAdd(false);
      setEditIndex(null);
    }
  };


  const handleEditCategory = (index) => {
    setEditIndex(index);
    setOriginalCategory(showCategory[index].category);
    setShowAdd(true);
  };


  const handleChangeCategory = (e, index) => {
    const updatedCategories = [...showCategory];
    updatedCategories[index].category = e.target.value;
    setShowCategory(updatedCategories);
  };


  const handlePostCategory = (e) => {
    if (e.target.value.length <= 50) {
      setAddCategory({ ...addCategory, category_name: e.target.value });
    } else {
      setCategoryDigitError(true);
      setAddCategory({ category_name: "" });
      setTimeout(() => {
        setCategoryDigitError(false)
      }, 3000);
    }
  };


  const handleCreateCategory = () => {
    if (!addCategory.category_name.trim()) {
      setCategoryError(true);
      setTimeout(() => {
        setCategoryError(false);
      }, 3000);
      return;
    }

    if (addCategory.category_name.length > 50) {
      setCategoryDigitError(true);
      
      setTimeout(() => {
        setCategoryDigitError(false)
      }, 3000);
      return;
    }
    const isDuplicateCategory = showCategory.some(category => category === addCategory.category_name);
    if (isDuplicateCategory) {
      setErrorCatgory(true);
        setTimeout(() => {
          setErrorCatgory(false);
        }, 3000);
        return
    }

    const CreateCategoryApi = process.env.REACT_APP_EXCEL_DOWNLOAD_POST_API;
    axios
      .post(CreateCategoryApi, addCategory)
      .then((response) => {
        console.log("category added successfully", response.data);

        setShowCategory([...showCategory, response.data.category]);
        setAddCategory({ category_name: "" });
        setShowAdd(false);
        setEditIndex(null);
        setCreateSuccess(true);
        setTimeout(() => {
          setCreateSuccess(false);
        }, 4000);
      })
      .catch((error) => {
        setCreateApiError(true);
        setAddCategory({ category_name: "" });
        setTimeout(() => {
          setCreateApiError(false)
        }, 3000);
        console.log("error in adding category", error);
      });
  };


  useEffect(() => {
    axios
      .get(process.env.React_APP_DATA_API)
      .then((response) => {
        setShowCategory(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);


  const handleDeleteCategory = (category) => {
    setShowModal(true);
    setAddCategory(category);
  };


  const handleConfirmDelete = () => {
    const DeleteApi = `${process.env.REACT_APP_DELETE_API}/${addCategory.id}/delete/`;
    axios
      .delete(DeleteApi)
      .then((response) => {
        setShowModal(false);
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 4000);
        console.log("Category deleted successfully", response.data);
        setShowCategory(
          showCategory.filter((cat) => cat.id !== addCategory.id)
        );
      })
      .catch((error) => {
        setDeleteApiError(true);
        setTimeout(() => {
          setDeleteApiError(false)
        }, 4000);
        console.log("Error in deleting category", error);
      });
  };


  const handleCancelDelete = () => {
    setShowModal(false);
  };

  
  return (
    <React.Fragment>
      <div className="breadcrumb-container">
        <div className="sub-category-form">
          <input
            type="text"
            className="form-control"
            placeholder="Please Enter Category Name"
            onChange={handlePostCategory}
            value={addCategory.category_name}
          />

          <button className="button-create" onClick={handleCreateCategory}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <Link to="/" className="link-back">
          Back
        </Link>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showCategory.map((category, index) => (
            <tr key={index}>
              <td>
                {showAdd && editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={showCategory[index].category}
                      className="input-table-edit"
                      onChange={(e) => handleChangeCategory(e, index)}
                    />
                  </div>
                ) : (
                  <div key={category.id}>{category.category}</div>
                )}
              </td>
              <td>
                {showAdd && editIndex === index ? (
                  <div className="action-button-container">
                    <button
                      className="action-button action-button-add"
                      onClick={() => handleUpdateCategory(index)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className="action-button action-button-delete"
                      onClick={() => handleEditClose(index)}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>
                ) : (
                  <div className="action-button-container">
                    <button
                      className="action-button action-button-add"
                      onClick={() => handleEditCategory(index)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="action-button action-button-delete"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ModalAlert
          onSubmit={handleConfirmDelete}
          onCancel={handleCancelDelete}
          onClose={handleCancelDelete}
        >
          Are you sure you want to delete this category?
        </ModalAlert>
      )}
      {updateSave && (
        <ModalAlert
          onSubmit={handleUpdateConfirmation}
          onCancel={handleCancelUpdate}
          onClose={handleCancelUpdate}
        >
          Are You sure you want to update this category?
        </ModalAlert>
      )}
      {warningSave && <WarningAlert message="Please make the change and confirm with a green tick" />}
      {deleteSuccess && (
        <SuccessAlert message="The selected category was deleted successfully" />
      )}
      {createSuccess && (
        <SuccessAlert message="Category created successfully !!!" />
      )}
      {updateSuccess && (
        <SuccessAlert message="Category updated successfully !!!" />
      )}
      {createApiError && (
        <ErrorAlert message="Duplicate category was not permitted !!!" />
      )}
      {updateApiError && (
        <ErrorAlert message="Duplicate category value was not permitted !!!" />
      )}
      {deleteApiError && (
        <ErrorAlert message="Error on deleting category !!!" />
      )}
      {errorCatgory && (
          <WarmingAlert message="Duplicate value not accepted !!!" />
        )}
      {categoryError && (
        <ErrorAlert message="Category cannot be left empty !!!" />
      )}
      {categoryDigitError && (
        <ErrorAlert message="Invalid Category cannot exceed 50 characters !!!" />
      )}






    </React.Fragment>
  );
};
export default AddCategory;






























// const handleDeleteCategory = (category) => {
  //   console.log("wcbwchwbcwki", category.id);
  //   setShowModal(true)
  //   if (showYes){
  //   const DeleteApi = `${process.env.REACT_APP_DELETE_API}/${category.id}/delete/`;
  //   console.log(DeleteApi);
  //   axios
  //     .delete(DeleteApi)
  //     .then((response) => {
  //       setTimeout(() => {}, 4000);
  //       console.log("Catergory deleted Successfully", response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error in Deleting Category", error);
  //     });
  //     setShowYes(false);
  //   }else{
  //     setShowModal(false)
  //   }
  // };




  // const handleUpdaetCategory = (index) => {
  //   console.log(showCategory[index].category)
  //   setPutCategory({...putcategory , category:showCategory[index].category})
  //   setShowAdd(true);
  //   const PutApi=`${process.env.REACT_APP_PUT_API}/${showCategory[index].id}/update/`
  //   console.log(PutApi)
  //   console.log(putcategory)
  //   axios.put(PutApi,putcategory).then((response)=>{
  //     console.log("Category Updated successfully",response.data)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  //   setShowAdd(false);

  // };