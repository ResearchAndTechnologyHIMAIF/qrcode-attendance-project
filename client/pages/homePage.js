import axios from "axios";
import Swal from "sweetalert2";

const homePage = () => {
  const rootElement = document.getElementById("app");
  rootElement.innerHTML = `
    <div class="main">
        <div class="container">
          <div class="icon-image">
            <img src="/assets/img/iwu.png" alt="" width="100" />
            <img src="/assets/img/Logo HIMA IF.png" alt="" width="100" />
          </div>

          <div class="header mt-3">
            <p class="h-1">FORMULIR REGISTRASI</p>
            <p class="h-2">KEGIATAN HIMAIF</p>
          </div>

          <form id="registerForm" class="row p-3">
            <div class="col-12">
              <label for="inputAddress" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Masukkan Email"
                required
              />
            </div>

            <div class="col-12 mt-2">
              <label for="inputAddress" class="form-label">NIM</label>
              <input
                type="number"
                class="form-control"
                id="nim"
                placeholder="Masukkan NIM"
                required
              />
            </div>

            <div class="col-12 mt-2">
              <label for="inputAddress" class="form-label">Nama</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Masukkan Nama"
                required
              />
            </div>

            <div class="col-12 mt-2">
              <label for="inputAddress" class="form-label">Nomor Telepon</label>
              <input
                type="number"
                class="form-control"
                id="phone"
                placeholder="Masukkan Nomor Telepon"
                required
              />
            </div>

            <div class="col-4 mt-2">
              <label for="inputState" class="form-label">Angkatan</label>
              <select
                id="generation"
                class="form-select"
                aria-label="Pilih Angkatan"
                required
              >
                <option value="2021" selected>2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div class="col-12 mt-2">
              <label for="inputAddress2" class="form-label"
                >Program Studi</label
              >
              <input
                type="text"
                class="form-control"
                id="department"
                placeholder="Masukkan Program Studi"
                required
              />
            </div>

            <div class="col-12 mt-2">
              <label for="inputAddress" class="form-label">Kelas</label>
              <input
                type="text"
                class="form-control"
                id="classes"
                placeholder="Masukkan Kelas"
                required
              />
            </div>

            <div class="d-grid justify-content-end mt-3">
              <button id="submitButton" class="btn btn-primary" type="submit"></button>
            </div>
          </form>
          <footer class="mt-5">
            <p>© 2024 RISTEK HIMAIF-IWU</p>
          </footer>
        </div>
      </div>
  `;

  const form = document.getElementById("registerForm");
  const submitButton = document.getElementById("submitButton");

  submitButton.disabled = false;
  submitButton.textContent = "Submit";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const registerPost = async () => {
        submitButton.disabled = true;
        submitButton.textContent = "Loading...";
        const response = await axios.post(
          `${import.meta.env.VITE_API_HOST}/api/v1/regist`,
          {
            email: document.getElementById("email").value,
            nim: document.getElementById("nim").value,
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            generation: document.getElementById("generation").value,
            department: document.getElementById("department").value,
            classes: document.getElementById("classes").value,
          }
        );
        submitButton.disabled = false;
        submitButton.textContent = "Submit";

        const data = response.data;
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: data.message,
        });
      };
      registerPost();
    } catch (error) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: error,
      });
    }
  });
};

export default homePage;
