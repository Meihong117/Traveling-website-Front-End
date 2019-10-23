<template>
  <div class="createUser">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" >


      <h2><strong>Create a user:</strong></h2>

      <FormItem label="Username" prop="username">
        <Input v-model="formValidate.username" placeholder="Enter username" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="GivenName" prop="givenName">
        <Input v-model="formValidate.givenName" placeholder="Enter givenName" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="FamilyName" prop="familyName">
        <Input v-model="formValidate.familyName" placeholder="Enter familyName" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="E-mail" prop="email">
        <Input v-model="formValidate.email" placeholder="Enter email" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="Password" prop="password">
        <Input type="password" v-model="formValidate.password" placeholder="Enter password" style="width: 300px"></Input>
      </FormItem>
      <FormItem label="Confirm Password" prop="passwdCheck">
        <Input type="password" v-model="formValidate.passwdCheck" placeholder="Please Enter Password Again" style="width: 300px"></Input>
      </FormItem>
<!--Button-->
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')" style="font-family: cursive">Submit</Button>
        <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px;font-family: cursive">Reset</Button>
        <Button type="primary" @click="handleHome('formValidate')" style="margin-left: 8px;font-family: cursive">Home</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          username: '',
          givenName: '',
          familyName: '',
          email: '',
          password: ''
        },
        ruleValidate: {
          username: [
            { required: true, message: 'Username cannot be empty', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'E-mail cannot be empty', trigger: 'blur' },
            { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
          ],
          givenName: [
            { required: true, message: 'GivenName cannot be empty', trigger: 'blur' }
          ],
          familyName: [
            { required: true, message: 'FamilyName cannot be empty', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Password cannot be empty', trigger: 'blur' }
          ],
          passwdCheck: [
            { required: true, message: 'passwdCheck cannot be empty', trigger: 'blur' }
          ],
        }
      }
    },
    mounted:function(){
      this.check_token()
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if(this.formValidate.passwdCheck !== this.formValidate.password){
              this.$Message.error('Two passwords do not match!!');
            }else {
              this.$http.post('http://localhost:4941/api/v1/users', JSON.stringify({
                "username": this.formValidate.username,
                "givenName": this.formValidate.givenName,
                "familyName": this.formValidate.familyName,
                "email": this.formValidate.email,
                "password": this.formValidate.password
              })).then(function () {
                this.$Message.success('Success!');
                window.location.href = '/login'
              }, function () {
                this.$Message.error('Username or Email has been created!');
              })
            }
          }else{
            this.$Message.error('Error!');
          }
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      handleHome (){
        window.location.href = '/'
      },
      check_token(){
        if(this.$cookies.get("CookieToken")!==null){
          window.location.href='/LoginHome'
        }
      }
    }
  }
</script>


<style scoped>

  .createUser{
    padding-top: 50px;
    padding-left: 650px;
    background-color: lavenderblush;
  }
</style>
