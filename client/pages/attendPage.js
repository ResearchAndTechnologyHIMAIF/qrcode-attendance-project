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

  try {
    const attendPost = async () => {
      const response = await axios.post(`http://localhost:8080/api/v1/attend`, {
        email: email,
        nim: nim,
        name: name,
        phone: phone,
        generation: generation,
        department: department,
        classes: classes,
      });

      const data = response.data;
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message,
      });
    };
    attendPost();
  } catch (error) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: error,
    });
  }
};

export default attendPage;
