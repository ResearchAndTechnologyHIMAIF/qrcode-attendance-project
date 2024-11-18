import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2'

  const form = document.getElementById('registerForm')

  form.addEventListener('submit', async (event) => {
  event.preventDefault()
  try {
    const registerPost = async() => {
     const response = await fetch(
      `${import.meta.env.VITE_API_HOST}/api/v1/regist`,
       {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           email: document.getElementById("email").value,
           nim: document.getElementById("nim").value,
           name: document.getElementById("name").value,
           phone: document.getElementById("phone").value,
           generation: document.getElementById("generation").value,
           department: document.getElementById("department").value,
           classes: document.getElementById("classes").value,
         }),
       }
     );
 
     const data = await response.json();
     Swal.fire({
       icon: "success",
       title: "Success!",
       text: data.message,
     });
    }
    registerPost();
   } catch (error) {
     Swal.fire({
       icon: "success",
       title: "Success!",
       text: error,
     });
   }
 }
)
