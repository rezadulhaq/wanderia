<script>
export default {
  name: "AddBusiness",
};
</script>

<template>
  <div class="d-flex align-self-center">
    <main class="form-register w-100 m-auto">
      <img
        src="../assets/logo-wanderia.png"
        class="mx-auto d-block pb-4"
        alt="Wanderia"
        width="100px"
      />
      <form>
        <h1 class="h3 mb-3 fw-normal">Add Business</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="description" class="col-sm-2 col-form-label"
            >Description</label
          >
          <div class="col-sm-10">
            <textarea class="form-control" id="description" rows="3"></textarea>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="categoryId" class="col-sm-2 col-form-label"
            >Category ID</label
          >
          <div class="col-sm-10">
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="mapUrl" class="col-sm-2 col-form-label">Map URL</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="mapUrl" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="imageUrl" class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="imageUrl" />
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  </div>
</template>
