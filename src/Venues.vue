<template>
    <div style="background-color: beige">

      <div class="top">
        <h2><span style="font-family: cursive">Search Venues:</span></h2>
<!--Button-->
        <Button type="primary" @click="modal2=true" style="width: 90px;">SearchBox</Button>
        <Button type="success" @click="reset1()" style="margin-left: 9px;">Reset</Button>
        <Button type='primary' onclick="window.location.href='/'" style="margin-left: 9px;"><Icon type="ios-home"  style="font-size: 20px;"/></Button>
        <br>
      </div>
<!--Table-->
      <h2 style="font-family: cursive">All Venues:</h2>
      <Table border :columns="columns1" :data="data3"></Table>
<!--Modal-->
      <modal v-model="modal2" title="Search details about Venues" @on-ok="ok" @on-cancel="cancel" height="400px">

        <span><strong>Enter a City:</strong></span>
        <input v-model="city" placeholder="Enter a city name" style="width: 300px;color: lightslategray;" />
        <br>

        <span><strong>Enter VenueName:</strong></span>
        <input v-model="q" placeholder="Enter Characters/Words/Phrase" style="width: 300px;color: lightslategray;"/>
        <br>

        <span><strong>Select Category:</strong></span>
        <select v-model="categoryId" id="category" style="width: 300px;" >
          <option value="1">Accommodation</option>
          <option value="2">Cafe & Restaurant</option>
          <option value="3">Attractions</option>
          <option value="4">Events</option>
          <option value="5">Nature Spots</option>
        </select>
        <br>

        <span><strong>Select minStarRating:</strong></span>
        <select v-model="minStarRating"  style="width: 300px;"><!--option value-->
          <option value="1">1 Star</option>
          <option value="2">2 Star</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
        <br>

        <span><strong>Select maxCostRating:</strong></span>
        <select v-model="maxCostRating"  style="width: 300px;">  <!--?????? options value-->
          <option value="0">Free</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>
        <br>


        <span><strong>Reverse Mean Star Rating:</strong></span>
        <select v-model="reverseSort" style="width:300px" >
          <option value="true">low -> high</option>
        </select>

        <span><strong>Mode Cost Rating & Distance:</strong></span>
        <select v-model="sortList1" style="width:300px" >
          <option value="3">Cost Rating (high -> low)</option>
          <option value="4">Cost Rating (low -> high)</option>
          <option value="2">Distance (near -> far)</option>
          <option value="1">Distance (far -> near)</option>
        </select>

        <Button type="success" @click="reset()" style="margin-left: 120px;">Clear</Button>

      </modal>
<!--pagination-->
    <div class="pagination">
      <h3>Current items: {{this.item}}</h3>
      <Page :total="data2.length" :current="page" show-total  @on-change="changePage" ></Page>
    </div>

    </div>
</template>


<script>
    export default {
        data(){
          return{
//searchBox
            modal2:false,
            count:'',
            city:'',
            q:'',
            categoryId:'',
            minStarRating:'',
            maxCostRating:'',
            adminId:'',
            sortBy:'',
            reverseSort: "",
            myLatitude:'',
            myLongitude:'',
            distance:'',
            primaryPhoto:'',
            venueId:'',
//reverse sort
            sortList1: '',
//pagination
            page:1,
            item:'',
//venues
            columns1:[
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
                title: 'Photo',
                key: 'primaryPhoto',
                render:(h,params) =>{
                  return h('div',[
                    h('img',{
                      attrs:{
                        src:this.getPhoto(this.data3[params.index].venueId, this.data3[params.index].primaryPhoto)
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
                title:'Distance(Km)',
                key:'distance',
                align:'center',

              },

              {
                title:'Action',
                key:'Action',
                fixed:'right',
                align:'center',
                //width:120,
                render:(h,params)=>{
                  return h('div',[
                    h('Button',{
                    props:{
                      type:'primary', size:'small'
                    },
                    style:{marginRight:'5px'},
                    on:{
                      click:()=>{
                        this.show(params.index)
                      }
                    }
                  },'ViewDetails'),])
                }
              }
            ],
            data1:[], //all venue
            data2:[], //copy venue
            data3:[], ///run func

          }
        },
      mounted:function(){
          this.getLocation();
          this.getPhoto();
        this.check_token()
      },
      methods:{
        getAll:function () {
          const queryBody={};
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
          if(this.myLatitude!=='' && this.myLongitude!==''){
              queryBody.myLatitude=this.myLatitude;
              queryBody.myLongitude=this.myLongitude;
            }
          if(this.count!==''){
            queryBody.count=this.count;
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
          //console.log(queryBody.myLatitude)
/***********************************/
          let venue_result;
          this.$http.get('http://localhost:4941/api/v1/venues',{params:queryBody})
            .then(function (response) {
              this.$http.get('http://localhost:4941/api/v1/categories')
                .then(function (res) {
                  venue_result=response.data;
                  //console.log(venue_result)

                  this.data2=venue_result;
                  this.reverse();
                  this.data3=this.handleList(1);

                  let category_result=res.data;
                  for (const venue of venue_result) {
                    let ccc;
                    ccc= category_result.find(category => category.categoryId===venue.categoryId);
                    venue.categoryName=ccc.categoryName;

                    //mean mode start here///////
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
                  this.data1=venue_result;
                });
            });
        },
        ok(){
            this.getLocation();
            this.page=1;
        },
        cancel(){
            this.$Message.info('Search cancel!')
        },
//inner modal
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
            this.adminId='',
            this.sortList1=''
        },
//outer main page
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
            this.adminId='',
            this.page=1,
            this.sortList1='',
            this.ok();
        },
//reverse Order
        reverse:function(){ //cost rating
          //console.log(this.data2)
          if(this.sortList1==="3"){
            this.data2=this.data2.sort((a,b)=>(a.modeCostRating>b.modeCostRating)? -1:1) //high to low
          }
          else if(this.sortList1==="4"){
            this.data2=this.data2.sort((a,b)=>(a.modeCostRating>b.modeCostRating)? 1:-1) //low to high
          }
          else if(this.sortList1==="1"){
            this.data2=this.data2.sort((a,b)=>(a.distance>b.distance)? -1:1) //high to low
          }
          else if(this.sortList1==="2"){
            this.data2=this.data2.sort((a,b)=>(a.distance>b.distance)? 1:-1) //low to high
          }
        },
//pagination
        handleList:function(num){  //
          let start=(num-1)*10 +1; //11
          let middle=this.data2.slice(start-1,num*10) ; //11-20
          let end=start + middle.length-1; //
          this.item=start.toString()+ '-' + end.toString();
          return middle;
        },
        changePage(page){
          this.page=page;
          this.data3=this.handleList(this.page);
        },
//Location
        getLocation:function () {
          let _this=this;
          this.$getLocation({})
            .then(function (coordinates){ // browser location: {lat: -43.5226535, lng: 172.581231}
              _this.myLatitude=coordinates.lat;
              _this.myLongitude=coordinates.lng;
              _this.getAll();
            });
          // console.log('dfgdfgdfgdfgdfgdf')
          _this.getAll();
        },
        newFunction:function () {
          //console.log('')
          //getLocation:function () {
            let _this=this;
            this.$getLocation({
            })
              .then(function (coordinates){ // browser location: {lat: -43.5226535, lng: 172.581231}
                _this.myLatitude=coordinates.lat;
                _this.myLongitude=coordinates.lng;
                _this.getAll();
              });
        },
//photo
        getPhoto:function (a,b) {
          // console.log(b)
          if(b===null){
            return '/photos/default.png'
          }else{
            return 'http://localhost:4941/api/v1/venues/' + a + '/photos/' + b
          }
        },
//show
        show(index){  //index=0,1,2,3.....          // to oneVenue
          let id = this.data3[index].venueId;  //1, 2,
          let photo=this.data3[index].primaryPhoto;
          this.$router.push({name:'oneVenues', params:{venue_id: id, photoName: photo}});
        },
        check_token(){
          if(this.$cookies.get("CookieToken")!==null){
            window.location.href='/LoginHome'
          }
        }
      },
    }
</script>

<style lang="css">
  span, input{
    display: table-row;
    margin-bottom: 10px;
  }
  .top{
    margin-left:600px;
  }
  .pagination{
    margin-left: 500px;
    margin-top: 20px;
  }
</style>

