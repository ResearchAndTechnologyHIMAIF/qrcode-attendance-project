import axios from "axios";
import Swal from "sweetalert2";

const attendPage = () => {
  const rootElement = document.getElementById("app");
  rootElement.innerHTML = `
      <div class="main"></div>
    `;
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const nim = urlParams.get("nim");
  const name = urlParams.get("name");
  const phone = urlParams.get("phone");
  const generation = urlParams.get("generation");
  const department = urlParams.get("department");
  const classes = urlParams.get("classes");

  const attendPost = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/attend`, {
        email: email,
        nim: nim,
        name: name,
        phone: phone,
        generation: generation,
        department: department,
        classes: classes,
      });

      if (response.status === 202) {
        Swal.fire({
          icon: "info",
          title: "Info!",
          text: response.data.message,
        });
      } else if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Server responded with an error: ${error.response.status}`,
        });
      } else if (error.request) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "There was a problem making the request. Check your internet connection.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  attendPost();
};

export default attendPage;
