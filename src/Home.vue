<template>
  <div><!--1-->
    <layout>
<!--header-->
      <Header class="header">
        <menu mode="horizontal" theme="dark" active-name="login">
            <div class="new">

              <menuitem name="Search Venues" onclick="window.location.href='/Venues'" class="search" style="text-color:white">
                <Icon type="ios-paper-outline" style="color:white"/>
                <strong style="color:white;font-family: cursive">Venues</strong>
              </menuitem>

              <menuitem name="Search Users" onclick="window.location.href='/Users'" class="search">
                <Icon type="ios-search-outline" style="color:white"/>
                <strong style="color:white;font-family: cursive">Search User Info</strong>
              </menuitem>

              <menuitem name="login" onclick="window.location.href='/Login'" class="login">
                <Icon type="ios-contact" style="color:white"/>
                <strong style="color:white;font-family: cursive">Login</strong>
              </menuitem>
              <menuitem name="Sign up" onclick="window.location.href='/CreateUser'" class="signup">
                <Icon type="md-person-add" style="color:white;"/>
                <strong style="color:white;font-family: cursive">Sign up</strong>
              </menuitem>

            </div>
        </menu>
      </Header>

<!--content: photo-->
      <content><div class="home-logo"></div></content>
<!--footer-->
      <footer class="home-footer">Copyright 2019</footer>
    </layout>



  </div>
</template>

<script>
    export default {
      mounted:function(){
        this.check_token()
      },
        methods:{
          check_token(){
            console.log(this.$cookies.get("CookieToken"))
            if(this.$cookies.get("CookieToken")!==null){
              this.$cookies.remove("CookieToken");
              this.$cookies.remove("CookieId");
              window.location.href='/LoginHome'
            }
          }
        }
    }
</script>

<style scoped>
  .new .search{
    margin-left: 100px;
    margin-top:15px;
    padding-right: 10px;
    font-family: "Times New Roman";
    font-size:18px;
  }
  .login{
    margin-left: 600px;
    font-family: "Times New Roman";
    font-size:18px;

  }
  .signup{
    margin-left: 50px;
    font-family: "Times New Roman";
    font-size:18px;

  }
  .header{
    border: 1px solid lightgray;
    background: #446BF8;
    height: 60px;
  }

  .home-logo{
    background-image: url(./assets/travel.jpg);
    width: 100%;
    height: 789px;

  }
  .search{
    margin-left:780px;

  }
  .home-footer{
    text-align: center;
    border: 1px solid lightgray;
    background:lightgray;
  }

</style>
