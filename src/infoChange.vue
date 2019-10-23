<template>
<div style=" padding-top: 50px;padding-left: 650px;background-color: lavenderblush;">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" class="infoChange">
<!--params-->
    <h2><strong>change my info:</strong></h2>
    <FormItem label="GivenName" prop="givenName">
      <Input v-model="formValidate.givenName" placeholder="Enter givenName" style="width: 300px"></Input>
    </FormItem>
    <FormItem label="FamilyName" prop="familyName">
      <Input v-model="formValidate.familyName" placeholder="Enter familyName" style="width: 300px"></Input>
    </FormItem>


<!--check current password-->
    <FormItem label="Current Password" prop="password">
      <Input type="password" v-model="formValidate.cpassword" placeholder="Enter password" style="width: 300px"></Input>
    </FormItem>




    <FormItem label="New Password" prop="password">
      <Input type="password" v-model="formValidate.password" placeholder="Enter password" style="width: 300px"></Input>
    </FormItem>
    <FormItem label="Confirm" prop="passwdCheck">
      <Input type="password" v-model="formValidate.passwdCheck" placeholder="Please Enter Password Again" style="width: 300px"></Input>
    </FormItem>
<!--Button-->
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Change</Button>
      <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      <Button type="primary" @click="handleHome('formValidate')" style="margin-left: 8px"><Icon type="ios-home"  style="font-size: 18px;"/></Button>
    </FormItem>
  </Form>
</div>
</template>

<script>
  export default {
    data () {
      const checkpassword = (rule, value, callback) => {
        if (this.formValidate.passwdCheck !== this.formValidate.password) {
          return callback(new Error());
        }
      };
      // const cpassword = (rule, value, callback) => {
      //   if (this.formValidate.cpassword !== this.$cookies.get("CookiePassword")) {
      //     return callback(new Error());
      //   }
      // };
      return {
        formValidate: {
          givenName: '',
          familyName: '',
          password: '',
          data: '',
          cpassword:''
        },
        ruleValidate: {
          givenName: [
            { required: false, message: 'Change GivenName', trigger: 'blur' }
          ],
          familyName: [
            { required: false, message: 'Change FamilyName', trigger: 'blur' }
          ],
          // cpassword: [
          //   { required: false, message: 'Change Password', trigger: 'blur' },
          //   { validator: cpassword, message: 'Current password is wrong', trigger: 'blur' }
          // ],
          password: [
            { required: false, message: 'Change Password', trigger: 'blur' }
          ],
          passwdCheck: [
            { required: false, message: 'Please input password again', trigger: 'blur' },
            { validator: checkpassword, message: 'Two password do not match!', trigger: 'blur' }
          ],
        }
      }
    },
    mounted:function(){
      this.check_token()
    },
    methods: {
      handleSubmit (name) {
        let data1={};
        if(this.formValidate.givenName!==''){
          data1.givenName=this.formValidate.givenName;
        }
        if(this.formValidate.familyName!==''){
          data1.familyName=this.formValidate.familyName;
        }
        // if(this.formValidate.password!==''){
        //   data1.password=this.formValidate.password;
        // }

        if(this.formValidate.cpassword!==''){
          if(this.formValidate.cpassword!==this.$cookies.get("CookiePassword") ){
            alert("Current Password is wrong!")
          }else{
            if(this.formValidate.passwdCheck !== this.formValidate.password){
              alert("password doesn't match!")
            }else{
              data1.password=this.formValidate.password;

            }
          }
        }
        this.$http.patch('http://localhost:4941/api/v1/users/' + this.$cookies.get("CookieId"), JSON.stringify(data1),
          {
            headers: {'X-Authorization': this.$cookies.get("CookieToken")}
          })
          .then(function () {
            alert("Successful Change, Please Login Again!");
            this.handlelogout();
          }, function (err) {
            alert('Error')
          })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      handleHome (){
        window.location.href = '/loginHome'
      },
      handlelogout() {
        this.$http.post('http://localhost:4941/api/v1/users/logout', "", {
          headers: {'X-Authorization': this.$cookies.get("CookieToken")}
        })
          .then(function () {
            console.log("token is here first :" + this.$cookies.get("CookieToken"));
            this.$Message.success('Successful logout!');
            this.$cookies.remove("CookieToken");
            this.$cookies.remove("CookieId");
            window.location.href = '/Login'
          }, function (err) {
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


