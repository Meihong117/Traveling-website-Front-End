<template>
  <div style="background-color: lightyellow">
    <div>
      <Button type='success' onclick="window.location.href='/LoginHome'"><Icon type="ios-home"  style="font-size: 23px;"/></Button>
      <br>
    </div>

    <!--<Card style="width: 240px ; height: 235px; margin-left: 600px;">-->
    <!--<div style="text-align:center">-->
    <!--<img v-bind:src="imageView" style="width: 200px ; height: 200px">-->
    <!--</div>-->
    <!--</Card>-->

    <h2 style="font-family: cursive">Venue Photos:</h2>
    <div id="images"></div>


    <h2><span style="font-family: cursive">Detail of Venues:</span></h2>
    <Table border :columns="columns5" :data="data5"></Table>
    <br>
    <br>

    <h2 style="font-family: cursive"><strong>Description:</strong></h2>
    <Collapse>
      <Panel name="2">
        {{this.shortDescription}}
        <p slot="content">{{this.shortDescription}}{{' '}}{{this.longDescription}}</p>
      </Panel>
    </Collapse>

    <br>
    <br>
    <h2><span style="font-family: cursive">Venues Reviews:</span></h2>
    <Table border :columns="columns4" :data="data4"></Table>
    <br>
    <br>


    <h2><span style="font-family: cursive">User Information:</span></h2>
    <Table border :columns="columns6" :data="data6" style="width: 600px ; height: 90px"></Table>
    <br>

  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        meanStarRating:'',
        modeCostRating:'',
        shortDescription:'',
        longDescription:'',
        imageView: '',
        photofilename: '',
        modal1: false,
        test:'',
        photo:'',
        userId:'',
        imageView:'',
//reviews
        columns4: [
          {
            title: "Reviewer's Name",
            key:'reviewAuthor',
            align: 'center',
          },
          {
            title: 'Review Body',
            key: 'reviewBody',
            align: 'center'
          },
          {
            title: 'Star Rating',
            key: 'starRating',
            align: 'center'
          },
          {
            title: 'Cost Rating',
            key: 'costRating',
            align: 'center'
          },
          {
            title: 'Time Posted',
            key: 'timePosted',
            align: 'center'
          },
        ],
        data4:[],
//venues:
        columns5: [
          {
            title: 'VenueName',
            key: 'venueName',
            align: 'center',
          },
          {
            title: 'Admin',
            align: 'center',
            children: [
              {
                title: 'User Id',
                key: 'userId',
                align: 'center',
              },
              {
                title: 'Username',
                key: 'username',
                align: 'center',
              },
            ]
          },
          {
            title: 'Category',
            align: 'center',
            children: [
              {
                title: 'Category Name',
                key: 'categoryName',
                align: 'center',
              },
              {
                title: 'Category Description',
                key: 'categoryDescription',
                align: 'center',
              },
            ]
          },
          {
            title: 'City',
            key: 'city',
            align: 'center',
          },
          {
            title: 'Date',
            key: 'dateAdded',
            align: 'center',
          },
          {
            title: 'Address',
            key: 'address',
            align: 'center',
          },
          {
            title: 'meanStarRating',
            key: 'meanStarRating',
            align: 'center',
          },
          {
            title: 'modeCostRating',
            key: 'modeCostRating',
            align: 'center',
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
                      this.getReview();
                    }
                  }
                }, 'View Review'),
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
                      this.show(params.row.userId);
                    }
                  }
                }, 'View User Detail'),
              ]);
            }
          }
        ],
        data5:[],
//user info:
        columns6: [
          {
            title: 'Photo',
            key: 'userPhoto',
            render:(h,params) =>{
              return h('div',[
                h('img',{
                  attrs:{
                    src:this.imageView
                  },
                  style:{
                    width:'55px',
                    height:'55px',
                  }

                })
              ])
            },

          },
          {
            title: 'Username',
            key: 'username',
            align: 'center',
          },
          {
            title: 'GivenName',
            key: 'givenName',
            align: 'center',
          },
          {
            title: 'FamilyName',
            key: 'familyName',
            align: 'center',
          },
          {
            title: 'Email',
            key: 'email',
            align: 'center',
          },
        ],
        data6:[],
      }
    },
    mounted: function () {
      this.getOne();
      this.check_token()
    },
    methods: {
//venues
      getOne: function () {
        const queryBody={};
        if(this.meanStarRating!==''){
          queryBody.meanStarRating=this.meanStarRating;
        }
        if(this.modeCostRating!==''){
          queryBody.modeCostRating=this.modeCostRating;
        }
        this.$http.get('http://localhost:4941/api/v1/venues/'+ this.$route.params.venue_id)  // is working: 1
          .then(function (response) {
            this.$http.get('http://localhost:4941/api/v1/venues',{params:queryBody})
              .then(function (res) {
                let venue_id_result=response.data  //venue id-->this.$route.params.venue_id
                let venue_result=res.data  // venue all--->venueId

                this.shortDescription=venue_id_result.shortDescription;
                this.longDescription=venue_id_result.longDescription;


                //console.log(response.data.admin.userId)
                this.userId=response.data.admin.userId;

                let star,cost;
                const id=this.$route.params.venue_id;
                for(let i in venue_result){
                  if(venue_result[i].venueId===id){
                    star=venue_result[i].meanStarRating;
                    cost=venue_result[i].modeCostRating;
                  }
                  if(star===null ){
                    star=3;
                  }
                  if(cost===null ){
                    cost='Free';
                  }
                  if(cost===1){
                    cost='$';
                  }
                  if(cost===2){
                    cost='$$';
                  }
                  if(cost===3){
                    cost='$$$';
                  }
                  if(cost===4){
                    cost='$$$$';
                  }
                }
                const data = [];
                data.push({
                  "venueName": response.data.venueName,
                  "userId": response.data.admin.userId,
                  "username": response.data.admin.username,
                  "categoryName": response.data.category.categoryName,
                  "categoryDescription": response.data.category.categoryDescription,
                  "city": response.data.city,
                  "shortDescription": response.data.shortDescription,
                  "longDescription": response.data.longDescription,
                  "dateAdded": moment(response.data.dateAdded).format('lll'),
                  "address": response.data.address,
                  "meanStarRating":star,
                  "modeCostRating": cost,
                });
                this.data5 = data;
              });
            this.getImage();
          });
      },
//reviews
      getReview: function () {
        this.$http.get('http://localhost:4941/api/v1/venues/' + this.$route.params.venue_id+'/reviews')
          .then(function (response) {
            let result=response.data;

            for(let i in result){
              result[i].reviewAuthor=result[i].reviewAuthor.username;
              //console.log(result[i])

              if(result[i].starRating===null ||result[i].costRating===null){
                result[i].starRating='3';
                result[i].costRating="Free";
              }
              if(result[i].costRating===0){
                result[i].costRating="Free"
              }
              if(result[i].costRating===1){
                result[i].costRating="$"
              }
              if(result[i].costRating===2){
                result[i].costRating="$$"
              }
              if(result[i].costRating===3){
                result[i].costRating="$$$"
              }
              if(result[i].costRating===4){
                result[i].costRating="$$$$"
              }
              if(result[i].starRating){
                result[i].starRating=result[i].starRating+ " Star"
              }

            }
            if(result.length===0){
              alert("No Review")
            }else{
              this.data4 = result;
            }
          });
      },
//user info
      getUser: function (id) {
        this.data6 = [];

        if(this.$cookies.get("CookieId")===this.userId){
          this.$http.get('http://localhost:4941/api/v1/users/'+this.$cookies.get("CookieId"), {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          }).then(function (response) {
              let result = response.data;
              this.data6.push(result);
            },function (err) {

            });
        }else{
          this.$http.get('http://localhost:4941/api/v1/users/'+ this.userId, {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          }).then(function (response) {
              let result = response.data;

              this.data6.push(result);
            },function (err) {

            });
        }
        this.getPhoto();
      },
//show
      show (id) {
        this.getUser(id);
      },
// venue photo
      getImage (){
        this.$http.get('http://localhost:4941/api/v1/venues/'+ this.$route.params.venue_id)  // is working: 1
          .then(function (response) {
            //console.log(response.data.photos)
            this.test=response.data.photos;
            let all=this.test;
            let parent=document.getElementById('images');
            if(all.length===0){
              let img=new Image(150,150);
              img.src='/photos/default.png';
              parent.appendChild(img)
            }else{
              for (let i=0;i<all.length;i++){
                let img=new Image(200,150);
                img.src='http://localhost:4941/api/v1/venues/'+this.$route.params.venue_id +'/photos/' +all[i].photoFilename;
                parent.appendChild(img)
              }

            }
          });

      },

//get user photo
      getPhoto (){
        //console.log(this.imageView)
        if(this.imageView===''){
          this.imageView='/photos/default.png'
        }else{
          this.imageView = 'http://localhost:4941/api/v1/users/'+this.userId +'/photo';
        }
      },
      check_token(){
        if(this.$cookies.get("CookieToken")===null){
          window.location.href='/'
        }
      }

    }
  }
</script>




