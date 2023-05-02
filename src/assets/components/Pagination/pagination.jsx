import React from "react";

//Taking props in from the parent component
export default function Pagination({
    recipesPerPage,
    totalRecipes,
    currentPage,
    onPageChange
}){
    //Calculating the total amount of pages, using Math.ceil to round up the resulted number 
    const totalPages = Math.ceil(totalRecipes / recipesPerPage); 
      
    //Current page is a state in parent component and is sent to here as a prop 
    function handleNextPage(){
        onPageChange(currentPage + 1);
    }
  
    function handlePreviousPage(){
        onPageChange(currentPage -1);
    }

    // Checking if the page is not 1, then we use Previous button 
    // Also checking if the page is smaller than the total number of pages, then we can use Next button 
    return(<> 
       <div className="pagination">
          {currentPage!==1 &&(
            <button className="pageBtn" onClick={handlePreviousPage}>Previous</button>
          )}
          {currentPage!== totalPages && (
            <button  className="pageBtn" onClick={handleNextPage}>Next</button>
          )}
      </div>
    </>)
}