<script>
import About from "../components/About.vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import Navbar from "../components/Navbar.vue";
import Section from "../components/Section.vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
import CardBusinesses from "../components/CardBusinesses.vue";
import CardDashboard from "../components/CardDashboard.vue";
import { useQuery } from "@vue/apollo-composable";
import { PARTNERS_QUERY } from "../stores/queries";

export default {
  name: "LandingPage",
  setup() {
    const { result, loading, error } = useQuery(PARTNERS_QUERY);
    return {
      result,
      loading,
      error,
    };
  },
  components: { Hero, About, Section, Footer, Navbar, CardDashboard },
  computed: {
    ...mapState(useCounterStore, ["businesses"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchBusinessesLanding"]),
  },
  created() {
    // this.fetchBusinessesLanding();
  },
};
</script>

<template>
  <div>
    <!-- {{ JSON.stringify(result) }} -->
    <Navbar />
    <Hero />

    <main id="main">
      <About />

      <!-- ======= Services Section ======= -->
      <Section
        id="services"
        title="Services"
        content="Sed tamen tempor magna labore dolore dolor sint tempor duis magna elit veniam aliqua esse amet veniam enim exports quid quid veniam aliqua eram noster malis nulla duis fugiat culpa esse aute nulla ipsum velit exports irure minim illum fore"
      >
        <div class="row gy-4">
          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div class="box">
              <div class="icon"><i class="bi bi-briefcase"></i></div>
              <h4 class="title"><a href="">Lorem Ipsum</a></h4>
              <p class="description">
                Voluptatum deleniti atque corrupti quos dolores et quas
                molestias excepturi sint occaecati cupiditate non provident
                etiro rabeta lingo.
              </p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div class="box">
              <div class="icon"><i class="bi bi-card-checklist"></i></div>
              <h4 class="title"><a href="">Dolor Sitema</a></h4>
              <p class="description">
                Minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat tarad limino ata nodera clas.
              </p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
            <div class="box">
              <div class="icon"><i class="bi bi-bar-chart"></i></div>
              <h4 class="title"><a href="">Sed ut perspiciatis</a></h4>
              <p class="description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur trinige zareta lobur
                trade.
              </p>
            </div>
          </div>

          <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
            <div class="box">
              <div class="icon"><i class="bi bi-binoculars"></i></div>
              <h4 class="title"><a href="">Magni Dolores</a></h4>
              <p class="description">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum rideta zanox
                satirente madera
              </p>
            </div>
          </div>
        </div>
      </Section>

      <!-- ======= Clients Section ======= -->
      <Section
        id="clients"
        title="Clients"
        content="Sed tamen tempor magna labore dolore dolor sint tempor duis magna
              elit veniam aliqua esse amet veniam enim export quid quid veniam
              aliqua eram noster malis nulla duis fugiat culpa esse aute nulla
              ipsum velit export irure minim illum fore"
      >
        <div
          class="clients-slider swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="container swiper-wrapper align-items-center">
            <div class="row row-cols-4" v-if="result">
              <!-- <div class="col swiper-slide">
                <img
                  src="../assets/img/clients/client-1.png"
                  class="img-fluid"
                  alt=""
                />
              </div> -->

              <CardDashboard
                v-for="business in result.allPartnerBusiness.slice(0, 12)"
                :key="business.id"
                :business="business"
              />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </Section>

      <!-- ======= Testimonials Section ======= -->
      <Section
        id="testimonials"
        title="Testimonials"
        content="Sed tamen tempor magna labore dolore dolor sint tempor duis magna
              elit veniam aliqua esse amet veniam enim export quid quid veniam
              aliqua eram noster malis nulla duis fugiat culpa esse aute nulla
              ipsum velit export irure minim illum fore"
      >
        <div
          class="testimonials-slider swiper"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img
                    src="../assets/img/quote-sign-left.png"
                    class="quote-sign-left"
                    alt=""
                  />
                  Proin iaculis purus consequat sem cure digni ssim donec
                  porttitora entum suscipit rhoncus. Accusantium quam, ultricies
                  eget id, aliquam eget nibh et. Maecen aliquam, risus at
                  semper.
                  <img
                    src="../assets/img/quote-sign-right.png"
                    class="quote-sign-right"
                    alt=""
                  />
                </p>
                <img
                  src="../assets/img/testimonial-1.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img
                    src="../assets/img/quote-sign-left.png"
                    class="quote-sign-left"
                    alt=""
                  />
                  Export tempor illum tamen malis malis eram quae irure esse
                  labore quem cillum quid cillum eram malis quorum velit fore
                  eram velit sunt aliqua noster fugiat irure amet legam anim
                  culpa.
                  <img
                    src="../assets/img/quote-sign-right.png"
                    class="quote-sign-right"
                    alt=""
                  />
                </p>
                <img
                  src="../assets/img/testimonial-2.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img
                    src="../assets/img/quote-sign-left.png"
                    class="quote-sign-left"
                    alt=""
                  />
                  Enim nisi quem export duis labore cillum quae magna enim sint
                  quorum nulla quem veniam duis minim tempor labore quem eram
                  duis noster aute amet eram fore quis sint minim.
                  <img
                    src="../assets/img/quote-sign-right.png"
                    class="quote-sign-right"
                    alt=""
                  />
                </p>
                <img
                  src="../assets/img/testimonial-3.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img
                    src="../assets/img/quote-sign-left.png"
                    class="quote-sign-left"
                    alt=""
                  />
                  Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                  multos export minim fugiat minim velit minim dolor enim duis
                  veniam ipsum anim magna sunt elit fore quem dolore labore
                  illum veniam.
                  <img
                    src="../assets/img/quote-sign-right.png"
                    class="quote-sign-right"
                    alt=""
                  />
                </p>
                <img
                  src="../assets/img/testimonial-4.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
              </div>
            </div>
            <!-- End testimonial item -->

            <div class="swiper-slide">
              <div class="testimonial-item">
                <p>
                  <img
                    src="../assets/img/quote-sign-left.png"
                    class="quote-sign-left"
                    alt=""
                  />
                  Quis quorum aliqua sint quem legam fore sunt eram irure aliqua
                  veniam tempor noster veniam enim culpa labore duis sunt culpa
                  nulla illum cillum fugiat legam esse veniam culpa fore nisi
                  cillum quid.
                  <img
                    src="../assets/img/quote-sign-right.png"
                    class="quote-sign-right"
                    alt=""
                  />
                </p>
                <img
                  src="../assets/img/testimonial-5.jpg"
                  class="testimonial-img"
                  alt=""
                />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
              </div>
            </div>
            <!-- End testimonial item -->
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </Section>

      <!-- ======= Call To Action Section ======= -->
      <section id="call-to-action">
        <div class="container" data-aos="zoom-out">
          <div class="row">
            <div class="col-lg-9 text-center text-lg-start">
              <h3 class="cta-title">Call To Action</h3>
              <p class="cta-text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <div class="col-lg-3 cta-btn-container text-center">
              <a class="cta-btn align-middle" href="#">Call To Action</a>
            </div>
          </div>
        </div>
      </section>
      <!-- End Call To Action Section -->

      <!-- ======= Team Section ======= -->
      <Section id="team" title="Our Team">
        <div class="row row-cols-6">
          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-1.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Walter White</h4>
                <span>Chief Executive Officer</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-2.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Sarah Jhinson</h4>
                <span>Product Manager</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-3.jpg" alt="" />
              </div>
              <div class="details">
                <h4>William Anderson</h4>
                <span>CTO</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-4.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Amanda Jepson</h4>
                <span>Accountant</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-4.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Amanda Jepson</h4>
                <span>Accountant</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="member">
              <div class="pic">
                <img src="../assets/img/team-4.jpg" alt="" />
              </div>
              <div class="details">
                <h4>Amanda Jepson</h4>
                <span>Accountant</span>
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <!-- ======= Contact Section ======= -->
      <Section
        id="contact"
        title="Contact Us"
        content="Sed tamen tempor magna labore dolore dolor sint tempor duis magna
              elit veniam aliqua esse amet veniam enim export quid quid veniam
              aliqua eram noster malis nulla duis fugiat culpa esse aute nulla
              ipsum velit export irure minim illum fore"
      >
        <div class="row contact-info">
          <div class="col-md-4">
            <div class="contact-address">
              <i class="bi bi-geo-alt"></i>
              <h3>Address</h3>
              <address>
                Jl. Arteri Pd. Indah No.7, RT.5/RW.9, Kby. Lama Sel., Kec. Kby.
                Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240
              </address>
            </div>
          </div>

          <div class="col-md-4">
            <div class="contact-phone">
              <i class="bi bi-phone"></i>
              <h3>Phone Number</h3>
              <p><a href="tel:+155895548855">+62 5589 55488 55</a></p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="contact-email">
              <i class="bi bi-envelope"></i>
              <h3>Email</h3>
              <p><a href="mailto:info@example.com">wanderia@gmail.com</a></p>
            </div>
          </div>
        </div>

        <template #container>
          <div class="container mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15864.088188144957!2d106.7815368!3d-6.260826!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c3ea1f4a28bfac5!2sHacktiv8!5e0!3m2!1sid!2sid!4v1675597810745!5m2!1sid!2sid"
              width="100%"
              height="380"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </div>
        </template>
      </Section>
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    <Footer />

    <a
      href="#"
      class="back-to-top d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
  </div>
</template>
