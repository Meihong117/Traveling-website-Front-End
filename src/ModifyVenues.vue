<template>
<div style=" padding-top: 50px;padding-left: 650px;background-color: lavenderblush;">
  <Form ref="formValidate" :model="formValidate" :label-width="110" >
<!--params-->
    <h2 style="color: blue;">Modify Venues:</h2>
    <FormItem label="Venue Name" prop="venueName">
      <Input v-model="formValidate.venueName" placeholder="Enter Name" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="Category Id" prop="categoryId">
      <Select v-model="formValidate.categoryId" id="category" style="width: 300px;" >
        <Option value="1">1-Accommodation</Option>
        <Option value="2">2-Cafe & Restaurant</Option>
        <Option value="3">3-Attractions</Option>
        <Option value="4">4-Events</Option>
        <Option value="5">5-Nature Spots</Option>
      </Select>
    </FormItem>

    <FormItem label="City" prop="city">
      <Input v-model="formValidate.city" placeholder="Enter City" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="Short Description" prop="shortDescription">
      <Input v-model="formValidate.shortDescription" placeholder="Enter Short Description" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="Long Description" prop="longDescription">
      <Input v-model="formValidate.longDescription" placeholder="Enter Long Description" style="width: 300px"></Input>
    </FormItem>


    <FormItem label="Address" prop="address">
      <Input v-model="formValidate.address" placeholder="Enter Address" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="Latitude" prop="latitude">
      <Input v-model="formValidate.latitude" placeholder="Enter Latitude" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="Longitude" prop="longitude">
      <Input v-model="formValidate.longitude" placeholder="Enter Longitude" style="width: 300px"></Input>
    </FormItem>



<!--button-->
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      <Button type="primary" @click="handleLoginHome('formValidate')" style="margin-left: 8px">Home</Button>
    </FormItem>

  </Form>
</div>
</template>


<script>
  export default {
    data () {
      return {
        formValidate: {
          venueName: '',
          categoryId: '',
          shortDescription: '',
          longDescription: '',
          city: '',
          address:'',
          latitude: '',
          longitude: '',
          venueId:'',
        },
        ruleValidate: {
          venueName: [
            { required: false, message: 'Venue Name cannot be empty', trigger: 'blur' }
          ],
          categoryId: [
            { required: false, message: 'category id cannot be empty', trigger: 'blur' },
          ],
          shortDescription: [
            { required: false, message: 'shortDescription cannot be empty', trigger: 'blur' }
          ],
          longDescription: [
            { required: false, message: 'longDescription cannot be empty', trigger: 'blur' }
          ],
          city: [
            { required: false, message: 'City cannot be empty', trigger: 'blur' },
          ],
          address: [
            { required: false, message: 'Address cannot be empty', trigger: 'blur' },
          ],
          latitude: [
            { required: false, message: 'Latitude cannot be empty', trigger: 'blur' }
          ],
          longitude: [
            { required: false, message: 'Longitude cannot be empty', trigger: 'blur' }
          ],
        }
      }
    },
    mounted: function () {
      this.check_token()
    },
    methods: {
      handleSubmit () {
        let data={};
        if(this.formValidate.venueName!==''){
          data.venueName=this.formValidate.venueName;
        }
        if(this.formValidate.categoryId!==''){
          data.categoryId=parseInt(this.formValidate.categoryId);
        }
        if(this.formValidate.city!==''){
          data.city=this.formValidate.city;
        }
        if(this.formValidate.shortDescription!==''){
          data.shortDescription=this.formValidate.shortDescription;
        }
        if(this.formValidate.longDescription!==''){
          data.longDescription=this.formValidate.longDescription;
        }
        if(this.formValidate.address!==''){
          data.address=this.formValidate.address;
        }
        if(this.formValidate.latitude!==''){
          data.latitude=parseInt(this.formValidate.latitude);
        }
        if(this.formValidate.longitude!==''){
          data.longitude=parseInt(this.formValidate.longitude);
        }
        this.$http.patch('http://localhost:4941/api/v1/venues/'+this.$route.params.venue_id, JSON.stringify(data),
          {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          }).then(function (response) {
            this.$Message.success('Success!');
            window.location.href = '/PersonalInfo'
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
      check_token(){
        if(this.$cookies.get("CookieToken")===null){
          window.location.href='/'
        }
      }

    }
  }
</script>


<style scoped>
  .ModifyVenues{
    margin-left: 500px;
    padding-top: 50px;
  }
</style>
