<template>
  <div id="navbar" class="flex-container">
    <div id="logoNavbar">
        <img src="@/assets/logo_navbar.png" class="img-fluid"  alt="logo housing association"/>
    </div>
    <div id="sentence">
      <p>Marketing text in navbar</p>
    </div>
    <div id="personArea" >
      <div id="usersData">
          <span >{{loggedUser}}</span>
          <img class="rounded-circle" width="40" height="40" src="@/assets/avatar.png" alt="users avatar">
      </div>
      <div id="usersButton">
        <button type="button" class="btn btn-light">konto</button>
        <button type="button" class="btn btn-success ml-3 mr-3" @click="logOut">wyloguj</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  data(){
    return{
      loggedUser:"",
    };
  },
  components: {},
  mounted() {
    // const user = JSON.parse(localStorage.getItem("user"));
    // this.loggedUser = user.username;
    this.loggedUser  = "Adam Kowalski"
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
<style scoped>

#navbar {
  height: 17vh;
  margin: 0 auto 10px;
  font-size: 32px;
  display: -webkit-flex;
  display: flex;
  background-color: #D0D0D0;
}
#logoNavbar{
  -webkit-flex: 1;
  flex: 1;
}
#personArea{
  -webkit-flex: 2;
  flex: 2;
  box-sizing: border-box;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}

#usersData{
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#usersData img {
  margin-right: 20px;
  margin-left: 10px;
}

#sentence {
  -webkit-flex: 4;
  flex: 4;
  text-align: center;
}

#sentence p {
  color: black;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
}

#usersButton{
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
