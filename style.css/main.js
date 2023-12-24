var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');



var ProductCountainer=[]

if (localStorage.getItem('myVistis')!= null) {
    ProductCountainer = JSON.parse(localStorage.getItem('myVistis'));
    displayProducts(ProductCountainer);
}else{
    ProductCountainer =[]
}



function addProduct(){
    var BookMarks = {
        name:bookmarkName.value,
        url:bookmarkURL.value, 

        
    }

    if (vld(BookMarks)) {
        ProductCountainer.push(BookMarks);
        localStorage.setItem('myVistis',JSON.stringify(ProductCountainer));
        displayProducts(ProductCountainer);
        clearForm()
        Swal.fire({
            title: "Good job!",
            text: "your information submited!",
            icon: "success"
          });
       
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:'Site URL must be a valid one',
            footer: "Must start with http"
        });

    }
  
}


function vld(BookMarks) {
var urlPattern  = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/;
var namePattern =/^\w{3,}(\s+\w+)*$/;


if (urlPattern.test(BookMarks.url) && namePattern.test(BookMarks.name)){
return true;
}else{

return false;
}
}




function clearForm()
{
    bookmarkName.value = " "
    bookmarkURL.value = " "
}



function displayProducts(ProductCountainer) {
    var cartoona =``;
    for(var i= 0 ;i < ProductCountainer.length ; i++){
        cartoona +=`
        <tr>
        <td>${i+1}</td>
        <td>${ProductCountainer[i].name}</td>
        <td><button onclick="opn (${i})"  class="btn btn-warning" >visit</button></td>
        <td><button onclick="DeleteProduct(${i})" class=" btn  btn-danger" >Delete</button></td>
        </tr>
        `
    }
    tableContent.innerHTML = cartoona;
}


function DeleteProduct(deleteIndex){
    ProductCountainer.splice(deleteIndex,1);
    displayProducts(ProductCountainer);
    localStorage.setItem('myVistis',JSON.stringify(ProductCountainer));
    }

function opn (index) {
window.open(ProductCountainer[index].url, '_blank');
}