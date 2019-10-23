<template>
  <div class="loginHome" >
    <layout>
      <Header class="header">
        <menu mode="horizontal" theme="dark" active-name="logout">
          <div class="new">
            <menuitem name="Venues" onclick="window.location.href='/longinVenues'" class="search">
              <Icon type="ios-paper" />
              <strong style="font-family: cursive">All Venues & Add Reviews</strong>
            </menuitem>

            <menuitem name="Reviews" onclick="window.location.href='/loginReviews'" class="search">
              <Icon type="ios-paper" />
              <strong style="font-family: cursive">My Reviews</strong>
            </menuitem>

            <menuitem name="Add Venues" onclick="window.location.href='/createVenues'" class="search">
              <Icon type="md-add-circle" />
              <strong style="font-family: cursive">Add My Venues</strong>
            </menuitem>

            <menuitem name="Personal Info" onclick="window.location.href='/PersonalInfo'"  class="search">
              <Icon type="ios-person" />
              <strong style="font-family: cursive">My Personal Info</strong>
            </menuitem>
<!--logout-->
            <menuitem name="logout">
              <Button type="primary" @click="handlelogout('formValidate')" class="logout"><strong style="font-family: cursive">Logout</strong></Button>
            </menuitem>

          </div>
        </menu>
      </Header>

<!--photo-->
      <content><div class="img1" ></div></content>
      <content><div class="img2"></div></content>
      <content><div class="img3"></div></content>
      <content><div class="img4" style="padding-right: 50px;"></div ></content>

      <footer class="home-footer" style="width: 100%;position:absolute; top:1460px;">Copyright 2019</footer>
    </layout>



  </div>
</template>

<script>
  export default {
    mounted:function () {
      this.check_token();
      //this.deletePhoto();
    },

    methods: {
      handlelogout() {
        this.$http.post('http://localhost:4941/api/v1/users/logout', "", {
          headers: {'X-Authorization': this.$cookies.get("CookieToken")}
        })
          .then(function () {
            //console.log(this.$cookies.get("CookieToken"));
            this.$Message.success('Successful logout!');
            this.$cookies.remove("CookieToken");
            this.$cookies.remove("CookieId");
            window.location.href = '/'
          }, function (err) {
            //console.log("token is here :" + this.$cookies.get("CookieToken"));
            this.$Message.error('error!');
          })
      },
      check_token(){
        if(this.$cookies.get("CookieToken")===null){
          window.location.href='/'
        }
      }
    }
  }
</script>

<style scoped>
  .new .search{
    margin-left: 60px;
    margin-top:15px;
    padding-right: 10px;
    font-family: "Times New Roman";
    font-size:18px;
  }
  .logout{
    margin-left: 100px;
    font-family: "Times New Roman";
    font-size:15px;
  }
  .header{
    border: 1px solid lightgray;
    background-color: #D6D7FE;
    height: 60px;
  }
  .img1{
    background-image: url(./assets/travel3.jpg);
    width: 50%;
    height: 350px;
  }
  .img2{
    background-image: url(./assets/travel13.jpg);
    width: 50%;
    height: 350px;
    background-position: right;
    position:absolute;
    top:410px;
    right:0px;
  }
  .img3{
    background-image: url(./assets/travel6.jpg);
    width: 50%;
    height: 350px;
    background-position: right;
    position:absolute;
    top:760px;
  }
  .img4{
    background-image: url(./assets/travel14.jpg);
    width: 50%;
    height: 350px;
    position:absolute;
    top:1110px;
    right:0px;

  }
  .home-footer{
    text-align: center;
    border: 1px solid lightgray;
    background:lightgray;
  }


</style>
