<template>
  <div style="background-color: lavenderblush">
    <br>
    <Button type='primary' onclick="window.location.href='/LoginHome'" style="margin-left: 9px; width:90px;"><Icon type="ios-home"  style="font-size: 18px;"/></Button>
    <br>
    <br>
    <br>
    <h2 style="font-family: cursive"><span>My posted Reviews:</span></h2>
    <Table border :columns="columns4" :data="data4"></Table>
    <br>
  </div>
</template>

<script>
    export default {
        data(){
          return{
//reviews:
        columns4: [
          {
            title: "Reviewer's Name",
            key:'reviewAuthor',
            align: 'center',


          },
          {
            title: 'Review Body',
            key: 'reviewBody',
            align: 'center',

          },
          {
            title: 'Star Rating',
            key: 'starRating',
            align: 'center',

          },
          {
            title: 'Cost Rating',
            key: 'costRating',
            align: 'center',

          },
          {
            title: 'Time',
            key: 'timePosted',
            align: 'center',

          },

          {
            title: 'venue Id',
            key:'venue1',
            align: 'center',

          },
          {
            title: 'venue Name',
            key:'venue2',
            align: 'center',

          },
          {
            title: 'categoryName',
            key:'venue3',
            align: 'center',

          },
          {
            title: 'City',
            key:'venue4',
            align: 'center',

          },
          {
            title: 'ShortDescription',
            key:'venue5',
            align: 'center',

          },
        ],
        data4:[],
          }
        },
      mounted:function(){
          this.getReview();
        this.check_token()
      },
      methods:{
      getReview: function () {
        this.$http.get('http://localhost:4941/api/v1/users/' + this.$cookies.get("CookieId")+'/reviews',{
          headers: {'X-Authorization': this.$cookies.get("CookieToken")}
        }).then(function (response) {
            let result=response.data;

           for(let i in result){
             if(result[i].costRating===0){
               result[i].costRating='Free'
             }
             if(result[i].costRating===1){
               result[i].costRating='$'
             }
             if(result[i].costRating===2){
               result[i].costRating='$$'
             }
             if(result[i].costRating===3){
               result[i].costRating='$$$'
             }
             if(result[i].costRating===4){
               result[i].costRating='$$$$'
             }
           }
            for(let i in result){
              result[i].reviewAuthor=result[i].reviewAuthor.username;
              result[i].venue1=result[i].venue.venueId;
              result[i].venue2=result[i].venue.venueName;
              result[i].venue3=result[i].venue.categoryName;
              result[i].venue4=result[i].venue.city;
              result[i].venue5=result[i].venue.shortDescription;
              result[i].venue6=result[i].venue.longDescription;
            }
            this.data4 = result;
          });
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

</style>
