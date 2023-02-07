<script>
export default {
  name: "AddPost",
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
        <h1 class="h3 mb-3 fw-normal">Add Post</h1>

        <div class="mb-3 row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="imageUrl" class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="imageUrl" />
          </div>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  </div>
</template>
