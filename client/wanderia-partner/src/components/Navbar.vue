<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <div>
    <section id="topbar" class="d-flex align-items-center">
      <div
        class="container d-flex justify-content-center justify-content-md-between"
      >
        <div class="contact-info d-flex align-items-center">
          <i class="bi bi-envelope d-flex align-items-center"
            ><a href="mailto:wanderia@gmail.com">wanderia@gmail.com</a></i
          >
          <i class="bi bi-phone d-flex align-items-center ms-4"
            ><span>+62 5589 55488 55</span></i
          >
        </div>
        <div class="social-links d-none d-md-flex align-items-center">
          <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
          <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </section>

    <header
      id="header"
      class="d-flex align-items-center bg-secondary bg-opacity-50"
    >
      <div class="container d-flex justify-content-between">
        <div id="logo">
          <!-- <h1>
            <a href="index.html">Reve<span>al</span></a>
          </h1> -->
          <!-- Uncomment below if you prefer to use an image logo -->
          <a href="/">
            <img
              src="https://i.imgur.com/fLn2YRT.png"
              alt="Wanderia"
              width="100px"
            />
          </a>
        </div>

        <nav id="navbar" class="navbar container">
          <ul>
            <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
            <li><a class="nav-link scrollto" href="#about">About</a></li>
            <li><a class="nav-link scrollto" href="#services">Services</a></li>

            <li><a class="nav-link scrollto" href="#team">Team</a></li>

            <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
            <li><a class="nav-link scrollto" href="/login">Login</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  </div>
</template>
