const key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5aGdtamhucWtqZmhzeXBtaHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1MDgwODcsImV4cCI6MTk4ODA4NDA4N30.mg_nYE1wCYt_6mPywXGezjIK8CsbfZEsA3TPdTNFJcs";

const url = "https://gyhgmjhnqkjfhsypmhxm.supabase.co";

const database = supabase.createClient(url, key);

let save = document.querySelector("#save");
save.addEventListener("click", async (e) => {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let price = document.querySelector("#price").value;
  let category = document.querySelector("#category").value;
  let description = document.querySelector("#description").value;
  let img = document.querySelector("#img").value;

  save.innerText = "Saving....";
  save.setAttribute("disabled", true);
  let res = await database.from("products").insert({
    title: title,
    price: price,
    category: category,
    description : description,
    img : img
  });
  if (res) {
    alert("Product ajout Success");
    save.innerText = "Save";
    save.setAttribute("disabled", false);
    title = "";
    price = "";
    category = "";
    description = "";
    img = "";
    getProduct();
    getTotalCount();
  } else {
    alert("Student Not Add Successfully");
    save.innerText = "Save";
    save.setAttribute("disabled", false);
  }
});

const getProduct = async () => {
  let tbody = document.getElementById("tbody");
  let loading = document.getElementById("loading");
  let tr = "";
  loading.innerText = "Loadding....";
  const res = await database.from("products").select("*");
  if (res) {
    for (var i in res.data) {
      tr += `<tr>
         <td>${parseInt(i) + 1}</td>
         <td>${res.data[i].title}</td>
         <td>${res.data[i].price}</td>
         <td>${res.data[i].category}</td>
         
         <td>${res.data[i].description}</td>
         <td><img src="${res.data[i].img}" width="42" height="42"></td>
         
         <td><button class="btn btn-primary" data-bs-toggle="modal"
         onclick='editStudent(${
           res.data[i].id
         })' data-bs-target="#editModel">Edit</button></td>
         <td><button onclick='deleteStudent(${
           res.data[i].id
         })' class="btn btn-danger">Delete</button></td>
         </tr>`;
    }
    tbody.innerHTML = tr;
    loading.innerText = "";
  }
};

getProduct();

const getTotalCount = async () => {
  let total = document.querySelector("#total");
  const res = await database.from("products").select("*", { count: "exact" });
  total.innerText = res.data.length;
};

getTotalCount();

const editStudent = async (id) => {
  const res = await database.from("products").select("*").eq("id", id);
  if (res) {
    document.getElementById("id").value = res.data[0].id;
    document.getElementById("edit-title").value = res.data[0].title;
    document.getElementById("edit-price").value = res.data[0].price;
    document.getElementById("edit-category").value = res.data[0].category;
    document.getElementById("edit-description").value = res.data[0].price;
    document.getElementById("edit-img").value = res.data[0].category;
  }
};

const update = document.getElementById("update");

update.addEventListener("click", async () => {
  let id = document.getElementById("id").value;
  let title = document.getElementById("edit-title").value;
  let price = document.getElementById("edit-price").value;
  let category = document.getElementById("edit-category").value;
  let description = document.getElementById("edit-description").value;
  let img = document.getElementById("edit-img").value;
  update.innerText = "Updateing....";
  update.setAttribute("disabled", true);
  const res = await database
    .from("products")
    .update({
      title,
      price,
      category,
      description,
      img,
    })
    .eq("id", id);

  if (res) {
    alert("Produit Update Success");
    update.innerText = "Update";
    update.setAttribute("disabled", false);
    title = "";
    price = "";
    category = "";
    description = "";
    img = "";
    getProduct();
    getTotalCount();
  } else {
    alert("Produit Not Update Successfully");
    update.innerText = "Update";
    update.setAttribute("disabled", false);
  }
});

const deleteStudent = async (id) => {
  const res = await database.from("products").delete().eq("id", id);

  if (res) {
    alert("Delete successfully");
    getProduct();
    getTotalCount();
  } else {
    alert("Delete successfully");
  }
};
