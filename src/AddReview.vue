<template>
<div class="addReview">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110" >

    <h2 style="color: Blue;font-family: cursive">Add Review:</h2>

    <FormItem label="Review" prop="reviewBody">
      <Input v-model="formValidate.reviewBody" placeholder="Enter reviewBody" style="width: 300px"></Input>
    </FormItem>

    <FormItem label="starRating" prop="starRating">
      <Select v-model="formValidate.starRating" style="width: 300px">
        <Option value=1>1 star</Option>
        <Option value=2>2 star</Option>
        <Option value=3>3 star</Option>
        <Option value=4>4 star</Option>
        <Option value=5>5 star</Option>
      </Select>
    </FormItem>

    <FormItem label="costRating" prop="costRating">
      <Select v-model="formValidate.costRating" style="width: 300px">
        <Option value=0>Free</Option>
        <Option value=1>$</Option>
        <Option value=2>$$</Option>
        <Option value=3>$$$</Option>
        <Option value=4>$$$$</Option>
      </Select>
    </FormItem>

<!--button-->
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      <Button type="primary" @click="handleLoginHome('formValidate')" style="margin-left: 8px"><Icon type="ios-home"  style="font-size: 18px;"/></Button>
    </FormItem>

  </Form>
</div>
</template>


<script>
  export default {
    data () {
      return {
        formValidate: {
          reviewBody: '',
          starRating: '',
          costRating:'',

        },
        ruleValidate: {
          reviewBody: [
            { required: true, message: 'Review description cannot be empty', trigger: 'blur' }
          ],
          starRating: [
            { required: true, message: 'Star rating cannot be empty', trigger: 'blur' },
          ],
          costRating: [
            { required: true, message: 'Cost rating cannot be empty', trigger: 'blur' },
          ],

        }
      }
    },
    mounted: function () {
      this.check_token()
    },
    methods: {
      handleSubmit () {
        this.$http.post('http://localhost:4941/api/v1/venues/'+this.$route.params.venue_id+'/reviews',{
          "reviewBody": this.formValidate.reviewBody,
          "starRating": parseInt(this.formValidate.starRating),
          "costRating": parseInt(this.formValidate.costRating),
        },
          {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          })
          .then(function (response) {
            alert('Success add review');
            window.location.href = '/loginReviews'
          }, function (err) {
            //alert(err)
            alert('Already posted review OR you cannot post review for your OWN venue');
          })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      handleLoginHome (name) {
        window.location.href = '/loginHome'
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
  .addReview{
    padding-top: 50px;
    padding-left: 650px;
    background-color: lavenderblush;
  }
</style>
