// import { faCheck, faCirclePlus, faPencil, faPlus, faTrash, faTrashCan, faX } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios"

// const AddSubCategory = () => {
//     const [showAdd, setShowAdd] = useState(false)
//     const [getApiData,setGetApiData] = useState([])

//     useEffect(()=>{
//         axios.get(process.env.React_APP_DATA_API).then((response)=>{setGetApiData(response.data )}).catch((error)=>{console.log(error)})
//     },[])
//     const handleAddCategory = () => {
//         setShowAdd(true)
//     }
//     return(
//        <React.Fragment>
//          <div className="breadcrumb-container">
//          <div className="sub-category-form">
//             <select className="form-control">
//                 <option value="">Select Category </option>
//                 {getApiData.map((option,index)=>(
//                     <option key={index} value={option.category}>{option.category}</option>
//                 ) )}
//             </select>
//             <input type="text" className="form-control" placeholder="Please Enter Sub Category" />
//             <button className="button-create"><FontAwesomeIcon icon={faPlus} /> Create</button>
//            </div>
//            <Link to="/" className="link-back">Back</Link>
//            </div>

//         <table className="table-container">
//             <thead>
//                 <tr>
//                     <th>Category 1</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {getApiData.map((option,index)=>(
//                 <tr>
//                     <td>   {
//                             showAdd && (
//                                 <div key={index}>
//                                 <input type="text" value="Category" className="input-table-edit" />
//                             </div>
//                             )
//                         }
//                          {
//                             !showAdd && (
//                                 <div>
//                                Sub Category
//                             </div>
//                             )
//                         }</td>

//                     <td>
//                     {
//                             showAdd && (
//                                 <div className="action-button-container">
//                        <button className="action-button action-button-add" onClick={handleAddCategory}>
//                             <FontAwesomeIcon icon={faCheck} />
//                         </button>
//                         <button className="action-button action-button-delete">
//                             <FontAwesomeIcon icon={faX} />
//                         </button>
//                        </div>
//                             )
//                         }
//                     {
//                             !showAdd && (
//                                 <div className="action-button-container">
//                        <button className="action-button action-button-add" onClick={handleAddCategory}>
//                             <FontAwesomeIcon icon={faPencil} />
//                         </button>
//                         <button className="action-button action-button-delete">
//                             <FontAwesomeIcon icon={faTrashCan} />
//                         </button>
//                        </div>
//                             )
//                         }
//                     </td>
//                 </tr>

//             </tbody>

//         </table>
//        </React.Fragment>
//     )
// }
// export default AddSubCategory
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
  import SuccessAlert from "../Alerts/SuccessAlert";
  import ErrorAlert from "../Alerts/ErrorAlert";
  import ModalAlert from "../Alerts/ModalAlert";
  import WarmingAlert from "../Alerts/WarmingAlert";

  
  const AddSubCategory = () => {
    const [getApiData, setGetApiData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [addSubCat, setAddSubCat] = useState(false);
    const [withoutSelect, setWithoutSelect] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // Track the index being edited
    const [editedSubCategory, setEditedSubCategory] = useState(""); // Track the edited subcategory
    const [showModalDelete,setShowModelDelete] = useState(false)
    const [deleteApiframe,setDeleteApiFrame] =useState('')
    const [deleteSubcat,setDeleteSubCat]= useState(false)
    const [errorDeleteSubcat,setErrorDeleteSubCat]= useState(false)
    const [isIndex,setIsIndex] =useState(null);
    // const [SubCategoryToDelete,setSubCategoryToDelete] =useState('')
    const [errorMessage,setErrorMessage] =useState(false)
    const [withoutSubCategory,setWithoutSubCategory] =useState(false)
    const [subCategoryAdded,setSubCategoryAdded] =useState(false)


  

 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(process.env.React_APP_DATA_API);
          setGetApiData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
      setEditIndex(null); 
    };
  
    const handleSubCategoryChange = (e) => {
      setSubCategory(e.target.value);
    };
  
   
    const handleCreateSubCategory = () => {
      if (!selectedCategory) {
        setWithoutSelect(true);
        setTimeout(() => {
          setWithoutSelect(false);
        }, 3000);
        return;
      }
      if (!subCategory){
        setWithoutSubCategory(true);
        setTimeout(() => {
          setWithoutSubCategory(false)
        }, 4000);
      }
    
      const categoryData = getApiData.find((item) => item.category === selectedCategory);
      if (!categoryData) {
        console.error("Selected category not found in API data");
        return;
      }
      debugger

      console.log(categoryData)
      const isDuplicate = categoryData.subcategories.some(
        (subCat) => subCat.name.toLowerCase() === subCategory.toLowerCase()
      );
    
      if (isDuplicate) {
        setErrorMessage(true);
        setSubCategory('');
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
        return;
      }
    
      const newCategoryData = {
        category_name: selectedCategory,
        sub_category_name: [subCategory],
        // sub_category_name: [...(categoryData.subcategories.map(subCat => subCat.name)), subCategory],
      };
    
      console.log(newCategoryData)
      axios
        .post(process.env.REACT_APP_EXCEL_DOWNLOAD_POST_API, newCategoryData)
        .then((response) => {
          console.log(response.data);
          const updatedApiData = getApiData.map((item) => {
            if (item.category === selectedCategory) {
              return {
                
                ...item,
                subcategories: [
                  ...item.subcategories,
                  { id: response.data.sub_cat_id, name: subCategory },
                ],
              };
            }
            return item;
          });
          setGetApiData(updatedApiData);
          setAddSubCat(true);
          setTimeout(() => {
            setAddSubCat(false);
          }, 3000);
          setSubCategory("");
        })
        .catch((error) => {
          console.log(error);
          
        });
    };
    
    // const handleCreateSubCategory = () => {
    //   if (!selectedCategory || !subCategory) {
    //     setWithoutSelect(true);
    //     setTimeout(() => {
    //       setWithoutSelect(false);
    //     }, 3000);
    //     return;
    //   }
    
    //   axios
    //     .post(process.env.REACT_APP_EXCEL_DOWNLOAD_POST_API, {
    //       category_name: selectedCategory,
    //       sub_category_name: [subCategory]
    //     })
    //     .then((response) => {
    //       console.log("Success:", response.data);
    //       // Assuming response.data contains the newly created subcategory ID or other relevant information
    //       // Update the local state if needed
    //       setAddSubCat(true);
    //       setTimeout(() => {
    //         setAddSubCat(false);
    //       }, 3000);
    //       setSubCategory("");
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // };
    
    
    
    
  
    
    const getSubCategories = (category) => {
      const categoryData = getApiData.find((item) => item.category === category);
      if (!categoryData) return [];
      return categoryData.subcategories || [];
    };
    
  
    const handleEditClick = (index, subCat) => {
      setEditIndex(index);
      setEditedSubCategory(subCat); 
    };
  
    const handleCancelEdit = () => {
      setEditIndex(null);
      setEditedSubCategory("");
    };
  
    const handleSaveEdit = () => {
      if (!editedSubCategory) {
        setWithoutSelect(true);
        setTimeout(() => {
          setWithoutSelect(false);
        }, 3000);
        return;
      }
    
      const categoryData = getApiData.find((item) => item.category === selectedCategory);
      if (!categoryData) {
        console.error("Selected category not found in API data");
        return;
      }
      const isDuplicate = categoryData.subcategories.some(
        (subCat, index) => subCat.name.toLowerCase() === editedSubCategory.toLowerCase() && index !== editIndex
      );
  
      if (isDuplicate) {
        setErrorMessage(true);
        setEditedSubCategory('');
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
        return;
      }
  
    
      let updatedSubCategoryData = null;
      const updatedSubCategories = categoryData.subcategories.map((subCat, index) => {
        if (index === editIndex) {
          updatedSubCategoryData = { id: subCat.id, name: editedSubCategory };
          console.log(`Subcategory ID changed: ${subCat.id}`);
          return { ...subCat, name: editedSubCategory };
        }
        return subCat;
      });
    
      const updatedCategoryData = {
        ...categoryData,
        subcategories: updatedSubCategories,
      };
    
      if (updatedSubCategoryData) {
        const payload = {
          category: selectedCategory,
          "sub category": updatedSubCategoryData.name,
        };
        console.log(updatedSubCategoryData.id)
        console.log(categoryData.id)
        console.log(payload)
        axios
        .put(`${process.env.REACT_APP_PUT_API}/${categoryData.id}/${updatedSubCategoryData.id}/update/`, payload)
        .then(response => {
          console.log('Subcategory updated successfully:', response.data);
  
          // Update the state with the new data
          setGetApiData(prevData => {
            return prevData.map(item => {
              if (item.category === selectedCategory) {
                return updatedCategoryData;
              }
              return item;
            });
          });

          setEditedSubCategory('');
          setSubCategoryAdded(true)
          setTimeout(() => {
            setSubCategoryAdded(false)
          }, 4000);
          setEditIndex(null);
        })
        .catch(error => {
          console.error('Error updating subcategory:', error);
        });
    } else {
      console.error('No subcategory was updated.');
    }
    };
      
    
    const handleEditedSubCategoryChange = (e) => {
      setEditedSubCategory(e.target.value);
    };


    const handleDeleteClick =(index)=>{
        const Todelete = getApiData.find(
            (item)=>item.category === selectedCategory 
        )
        if (!Todelete) {
            console.error("Selected category not found in API data");
            return;
          }
        debugger
        console.log(Todelete)
        const subcategories = Todelete.subcategories;

        const subCategoryToDelete = subcategories[index];
        console.log(subCategoryToDelete)
        const deleteApi = `${process.env.REACT_APP_DELETE_API_SUBCATEGORIES}/${Todelete.id}/${subCategoryToDelete.id}/delete/`
        console.log(deleteApi)
        setShowModelDelete(true)
        setIsIndex(index) 
        setDeleteApiFrame(deleteApi) 

    }
    const handleConfimationDelete = () => {
      setShowModelDelete(false);
      axios
        .delete(deleteApiframe)
        .then((response) => {
          console.log('Deleted successfully', response.data);
          const updatedApiData = getApiData.map((item) => {
            if (item.category === selectedCategory) {
              const updatedSubCategories = item.subcategories.filter(
                (subCat, index) => index !== isIndex
              );
    
              return { ...item, subcategories: updatedSubCategories };
            }
            return item;
          });
    
          setGetApiData(updatedApiData);
          setDeleteSubCat(true);
          setTimeout(() => {
            setDeleteSubCat(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error deleting subcategory", error);
          setErrorDeleteSubCat(true);
          setTimeout(() => {
            setErrorDeleteSubCat(false);
          }, 3000);
        });
    };


    
    const handleDeteleCancel=()=>{
        setShowModelDelete(false)
    }
  
    return (
      <React.Fragment>
        <div className="breadcrumb-container">
          <div className="sub-category-form">
            <select
              className="form-control"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">Select Category</option>
              {getApiData.map((option, index) => (
                <option key={index} value={option.category}>
                  {option.category}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter Sub Category"
              value={subCategory}
              onChange={handleSubCategoryChange}
            />
            <button className="button-create" onClick={handleCreateSubCategory}>
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          <Link to="/" className="link-back">
            Back
          </Link>
        </div>
  
        <table className="table-container">
          <thead>
            <tr>
              <th>Sub Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedCategory &&
              getSubCategories(selectedCategory).map((subCat, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedSubCategory}
                        className="input-table-edit"
                        onChange={handleEditedSubCategoryChange}
                      />
                    ) : (
                      <div>{subCat.name}</div>
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <div className="action-button-container">
                        <button
                          className="action-button action-button-add"
                          onClick={handleSaveEdit}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className="action-button action-button-delete"
                          onClick={handleCancelEdit}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </button>
                      </div>
                    ) : (
                      <div className="action-button-container">
                        <button
                          className="action-button action-button-add"
                          onClick={() => handleEditClick(index,  subCat.name)}
                        >
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button className="action-button action-button-delete"
                        onClick={()=>handleDeleteClick(index)}
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
        {addSubCat && (
          <SuccessAlert message="subcategory added successfully !!!" />
        )}
        {withoutSelect && (
          <ErrorAlert message="Please select category before creating !!!" />
        )}
        {withoutSubCategory && (
          <ErrorAlert message="please enter valid Characters !!!" />
        )}
        {showModalDelete && (
            <ModalAlert 
            onSubmit={handleConfimationDelete}
            onCancel={handleDeteleCancel}
            onClose={handleDeteleCancel}
            >Are you sure you want to delete this subcategory?
            </ModalAlert>
        )}
        {errorMessage && (
          <WarmingAlert message="Duplicate subcategory was not permitted !!!" />
        )}
        {subCategoryAdded && (
          <SuccessAlert message="subcategory updated successfully !!!" />
        )}
        {deleteSubcat && (
          <SuccessAlert message="The selected subcategory was deleted successfully !!!" />
        )}
        {errorDeleteSubcat && (
          <ErrorAlert message="Error on deleting subcategory !!!" />
        )}


      </React.Fragment>
    );
  };
  
  export default AddSubCategory;
  
