<template>
  <div class="navbar">
    <a href="#home">Home</a>
    <a href="#news">News</a>
    <a href="#contact">Contact</a>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar'
}
</script>

<style scoped lang="scss">
/* The navigation bar */
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

/* Links inside the navbar */
.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change background on mouse-over */
.navbar a:hover {
  background: #ddd;
  color: black;
}
</style>
