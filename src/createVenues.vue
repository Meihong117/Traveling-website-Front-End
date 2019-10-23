<template>
<div class="createVenue">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110" >
<!--venue params-->
    <h2 style="color: blue; font-family: cursive;">Add Venues:</h2>
    <FormItem label="venueName" prop="venueName">
      <Input v-model="formValidate.venueName" placeholder="Enter venueName" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="Category" prop="categoryId">
      <Select v-model="formValidate.categoryId" style="width: 300px">
        <Option value=1>Accommodation</Option>
        <Option value=2>Cafe & Restaurant</Option>
        <Option value=3>Attractions</Option>
        <Option value=4>Events</Option>
        <Option value=5>Spots</Option>
      </Select>
    </FormItem>

    <FormItem label="city" prop="city">
      <Input v-model="formValidate.city" placeholder="Enter City Name" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="shortDescription" prop="shortDescription">
      <Input v-model="formValidate.shortDescription" placeholder="Enter Short Description" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="longDescription" prop="longDescription">
      <Input v-model="formValidate.longDescription" placeholder="Enter Long Description" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="address" prop="address">
      <Input v-model="formValidate.address" placeholder="Enter Address" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="latitude" prop="latitude">
      <Input v-model="formValidate.latitude" placeholder="Enter latitude (latitude<=90)" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="longitude" prop="longitude">
      <Input v-model="formValidate.longitude" placeholder="Enter longitude(longitude<=180) " style="width: 300px"></Input>
    </FormItem>



<!--button-->
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      <Button type="primary" @click="handleLoginHome('formValidate')" style="margin-left: 8px"><Icon type="ios-home"  style="font-size: 18px;"/></Button>
    </FormItem>
    <br>

  </Form>
</div>
</template>
<script>

  export default {
    data () {

      return {
//enter
        formValidate: {
          venueName: '',
          categoryId: '',
          city: '',
          shortDescription: '',
          longDescription: '',
          address: '',
          latitude: '',
          longitude:'',
          openFile: null

        },
        ruleValidate: {
          venueName: [
            { required: true, message: 'venueName cannot be empty', trigger: 'blur' },
          ],
          categoryId: [
            { required: true, message: 'CategoryId cannot be empty', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'city cannot be empty', trigger: 'blur' }
          ],
          shortDescription: [
            { required: true, message: 'shortDescription cannot be empty', trigger: 'blur' },
          ],
          longDescription: [
            { required: true, message: 'longDescription cannot be empty', trigger: 'blur' },
          ],
          address: [
            { required: true, message: 'address cannot be empty', trigger: 'blur' },
          ],
          latitude: [
            { required: true, message: 'latitude cannot be empty and latitude should be <=90', trigger: 'blur' },
          ],
          longitude: [
            { required: true, message: 'longitude cannot be empty and longitude should be <=180', trigger: 'blur' },
          ],
        }
      }
    },
    mounted: function () {
      this.check_token()
    },
    methods: {
      handleSubmit () {
        this.$http.post('http://localhost:4941/api/v1/venues', JSON.stringify({
            "venueName": this.formValidate.venueName,
            "categoryId": parseInt(this.formValidate.categoryId),
            "city": this.formValidate.city,
            "shortDescription": this.formValidate.shortDescription,
            "longDescription": this.formValidate.longDescription,
            "address": this.formValidate.address,
            "latitude": parseInt(this.formValidate.latitude),
            "longitude": parseInt(this.formValidate.longitude)
          }),
          {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          })
          .then(function (response) {
            this.$Message.success('Success!');
            window.location.href = '/PersonalInfo'
          }, function (err) {
            console.log("in err message:::" + this.$cookies.get("CookieToken"));
            this.$Message.error('There are something wrong!');
          })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      handleLoginHome (name) {
        window.location.href = '/loginHome'
      },
      fileChange (event){
        this.formValidate.openFile = event.target.files[0]
      },

//add photo
      insertPhoto (id){
        this.$http.post('http://localhost:4941/api/v1/venues/'+ this.$route.params.venue_id +'/photos',
          this.formValidate.openFile,{
            headers: {
              'X-Authorization': this.$cookies.get("CookieToken"),
              'Content-Type': "image/jpeg"
            }
          }).then(function () {
          alert('Success!')
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
  .photo{
    margin-left: 50px;
  }
  .createVenue{
    /*margin-left: 500px;*/
    padding-top: 50px;
    padding-left: 650px;

    background-color: lavenderblush;
  }
</style>
