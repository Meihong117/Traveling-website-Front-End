<template>
    <div class="info" style="background-color: lavenderblush">
      <br>
      <Button type='primary' onclick="window.location.href='/loginHome'" style="margin-left: 9px; width:90px;"><Icon type="ios-home"  style="font-size: 18px;"/></Button>

<!--card: photo-->
      <Card style="width: 240px ; height: 235px;">
        <div style="text-align:center">
          <img v-bind:src="imageView" style="width: 200px ; height: 200px">
        </div>
      </Card>
      <br>
<!--add photo -->
      <div class="photo">
        <h3><span>Add photo:</span></h3>
        <input type="file" @change="fileChange" accept=".jpeg,.jpg,.png">
      </div>

      <Button type="primary" @click="insertPhoto('formValidate')" >Submit</Button>
      <Button type="error" @click="deletePhoto('formValidate')" style="margin-left: 8px;">Delete Photo</Button>

      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" >
<!--user info: -->
        <br>
        <h2><span style="font-family: cursive">My Information:</span></h2>
        <Table border :columns="columns1" :data="data1" style=""></Table>
        <br>

<!--myOwnVenues -->
        <h2><span style="font-family: cursive">My posted Venues:</span></h2>
        <Table border :columns="columns2" :data="data2" style=""></Table>

      </Form>
    </div>
</template>

<script>
    export default {
        data(){
          const checkNumber=(rule, valueParser,callback)=>{
            if(isNaN(this.formValidate.userId)){
              return callback(new Error());
            }
          };
          return{
            modal2:false,
            startIndex:0,
            count:10,
            city:'',
            q:'',
            categoryId:'',
            minStarRating:'',
            maxCostRating:'',
            adminId:'',
            sortBy:'',
            reverseSort:'',
            latitude:'',
            longitude:'',
            distance:'',
            imageView:'',
            venueId:'',
            photo:'',
//user info
            formValidate: {
              userId: '',
              openFile:'',
            },
            ruleValidate: {
              userId: [
                {required: true, message: 'userId cannot be empty', trigger: 'blur'},
              ],
            },
//user info
            columns1:[
              {
                title:'Username',
                key:'username',
                align:'center',

              },
              {
                title:'Given Name',
                key:'givenName',
                align:'center',

              },
              {
                title:'Family Name',
                key:'familyName',
                align:'center',

              },
              {
                title:'E-mail',
                key:'email',
                align:'center',

              },
              {
                title: 'Action',
                key: 'action',
                fixed: 'right',

                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          window.location.href='/infoChange'
                        }
                      }
                    }, 'Modify')
                  ]);
                }
              }
            ],
            data1:[],

//my own venues:
            columns2:[
              {
                title:'VenueId',
                key:'venueId',
                align:'center',
              },
              {
                title:'VenueName',
                key:'venueName',
                align:'center',
              },
              {
                title:'CategoryName',
                key:'categoryName',
                align:'center',
              },
              {
                title:'City',
                key:'city',
                align:'center',
              },

              {
                title:'ShortDescription',
                key:'shortDescription',
                align:'center',
              },
              {
                title:'MeanStarRating',
                key:'meanStarRating',
                align:'center',
              },
              {
                title:'ModeCostRating',
                key:'modeCostRating',
                align:'center',
              },
              {
                title:'primaryPhoto',
                key:'primaryPhoto',
                align:'center',
                render: (h, params) => {
                  return h('div', [
                    h('img', {
                      attrs: {
                        src:this.getPhoto(this.data2[params.index].venueId, this.data2[params.index].primaryPhoto) //own venues
                      },
                      style:{
                        width:'50px',
                        height:'50px'
                      }
                    }),
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click:()=>{
                          this.show_photo(params.index)
                        },
                        style:{

                        }
                      }
                    }, 'detail&Modify'),


                  ]);
                }
              },
              {
                title:'Latitude',
                key:'latitude',
                align:'center',
                //width:100,
                //sortable: true
              },
              {
                title:'Longitude',
                key:'longitude',
                align:'center',

                //sortable: true
              },

              {
                title: 'Action',
                key: 'action',
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click:()=>{
                          this.show(params.index)
                        }
                      }
                    }, 'Modify'),
                  ]);
                },
              },
            ],
            data2:[],
          }
        },

      mounted:function(){
        this.getOneUser();
        this.getMyOwnVenues();
        this.getPhoto();
        this.check_token()
      },
      methods:{
        getOneUser: function () {
          this.$http.get('http://localhost:4941/api/v1/users/'+this.$cookies.get("CookieId"), {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          })
            .then(function (response) {
              let result = response.data;
              this.data1.push(result);
            },function (err) {

            });
          this.getImage();
        },
        getMyOwnVenues:function () {
          const queryBody={};
          queryBody.adminId=this.$cookies.get("CookieId");
          if(this.categoryId.length!==0){
            queryBody.categoryId=this.categoryId
          }
          if(this.city.length!==0){
            queryBody.city=this.city
          }
          if(this.reverseSort.length!==0){
            queryBody.reverseSort=this.reverseSort
          }
          if(this.q.length!==0 && this.q.toString()){
            queryBody.q=this.q
          }
          if(this.latitude!=='' && this.longitude!==''){
            queryBody.latitude=this.latitude;
            queryBody.longitude=this.longitude;
          }
          if(this.minStarRating!==''){
            queryBody.minStarRating=this.minStarRating;
          }
          if(this.maxCostRating!==''){
            queryBody.maxCostRating=this.maxCostRating;
          }
          if(this.sortBy.length!==0){
            queryBody.sortBy=this.sortBy;
          }
          /***********************************/
          let venue_result;
          this.$http.get('http://localhost:4941/api/v1/venues',{params:queryBody})
            .then(function (response) {
              this.$http.get('http://localhost:4941/api/v1/categories')
                .then(function (res) {
                  venue_result=response.data;
                  let category_result=res.data;
                  for (const venue of venue_result) {
                    let ccc;
                    ccc= category_result.find(category => category.categoryId===venue.categoryId);
                    venue.categoryName=ccc.categoryName;

                    this.venueId=venue.venueId;
                    this.photo=venue.primaryPhoto

                    if(venue.meanStarRating===null ||venue.modeCostRating===null){
                      venue.meanStarRating='3';
                      venue.modeCostRating="Free";
                    }
                    if(venue.modeCostRating===0){
                      venue.modeCostRating="Free"
                    }
                    if(venue.modeCostRating===1){
                      venue.modeCostRating="$"
                    }
                    if(venue.modeCostRating===2){
                      venue.modeCostRating="$$"
                    }
                    if(venue.modeCostRating===3){
                      venue.modeCostRating="$$$"
                    }
                    if(venue.modeCostRating===4){
                      venue.modeCostRating="$$$$"
                    }
                    if(venue.meanStarRating){
                      venue.meanStarRating=venue.meanStarRating+ " Star"
                    }
                  }
                  this.data2=venue_result
                });
            });
        },
        show(index){ //index=0
          let id=this.data2[index].venueId;
          this.$router.push({name:'ModifyVenues', params:{venue_id: id}});
        },
        ok(){
          this.getMyOwnVenues()
        },
        cancel(){
          this.$Message.info('Search cancel!')
        },
        reset(){
          this.count='',
            this.startIndex='',
            this.categoryId='',
            this.maxCostRating='',
            this.adminId='',
            this.q='',
            this.minStarRating='',
            this.sortBy='',
            this.reverseSort='',
            this.myLatitude='',
            this.myLongitude='',
            this.city='',
            this.count='',
            this.adminId=''
        },
        reset1(){
          this.count='',
            this.startIndex='',
            this.categoryId='',
            this.maxCostRating='',
            this.adminId='',
            this.q='',
            this.minStarRating='',
            this.sortBy='',
            this.reverseSort='',
            this.myLatitude='',
            this.myLongitude='',
            this.city='',
            this.count='',
            this.adminId=''
          this.ok();
        },
        fileChange (event){
          this.formValidate.openFile = event.target.files[0]
        },
//put img
        insertPhoto (){
          this.$http.put('http://localhost:4941/api/v1/users/'+ this.$cookies.get("CookieId") +'/photo',
            this.formValidate.openFile,{
              headers: {
                'X-Authorization': this.$cookies.get("CookieToken"),
                'Content-Type': "image/jpeg"
              }
            }).then(function () {
            window.location.href='/PersonalInfo'
            //alert('Success,please load the page again!')
          });
        },
//get user img
        getImage (){
          // if(this.imageView===''){
          //   this.imageView='/photos/default.png'
          // }else{
            this.imageView = 'http://localhost:4941/api/v1/users/'+this.$cookies.get("CookieId") +'/photo';
          //}
        },
//get own venues photo:
        getPhoto:function (a,b) {
          if(b===null){
            return '/photos/default.png'
          }else{
            return 'http://localhost:4941/api/v1/venues/' + a + '/photos/' + b
          }
        },
 //delete photo
        deletePhoto:function () {
          this.$http.delete('http://localhost:4941/api/v1/users/'+this.$cookies.get("CookieId")+'/photo', {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          })
            .then(function (response) {
              alert("Successful Delete Photo!");
              window.location.href='/PersonalInfo'
            },function (err) {
              alert('Already deleted photo!')
            });
        },
//show detail photo
        show_photo:function (index) {
          let id = this.data2[index].venueId;  //1, 2,
          let photo=this.data2[index].primaryPhoto;

          this.$router.push({name:'VenuePhoto', params:{venue_id: id, photoName: photo}})
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
  span, input{
    display: table-row;
    margin-bottom: 10px;
  }
  .top{
    margin-left:600px;
  }
</style>
