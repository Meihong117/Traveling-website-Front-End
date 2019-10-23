<template>
  <div style=" padding-top: 50px;padding-left: 650px;">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <h2><strong>Login</strong></h2>
      <FormItem label="Username/E-mail:" prop="user" >
        <Input type="text" v-model="formInline.user" placeholder="Username/Email" ></Input>
      </FormItem>

      <br>
      <FormItem label="Password:" prop="password" >
        <Input type="password" v-model="formInline.password" placeholder="Password" >
        </Input>
      </FormItem>
      <br>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Login</Button>
        <Button type="info" onclick="window.location.href='/createUser'">Register</Button>
      </FormItem>

    </Form>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: '',
          id: '',
          token: '',
          //cpassword:''
        },
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the username or email', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 1, message: 'The password length cannot be less than 1 bits', trigger: 'blur' }
          ]
        }
      }
    },
    mounted:function(){
      this.check_token()
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if((this.formInline.user).indexOf("@") === -1) {
              this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
                "username": this.formInline.user,
                "password": this.formInline.password
              })).then(function (response) {
                console.log(response.data)
                  this.$cookies.set("CookieToken", response.data.token, "2h");
                  this.$cookies.set("CookieId", response.data.userId, "2h");
                   this.$cookies.set("CookiePassword", this.formInline.password);
              //  console.log(response.data.password)
                }).then(function () {
                  this.$Message.success('Success!');
                  window.location.href = '/loginHome'
                }, function (err) {
                  this.$Message.error('Username or Password error!');
                });
            }else{
              this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
                "email": this.formInline.user,
                "password": this.formInline.password
              })).then(function (response){
                  this.$cookies.set("CookieToken", response.data.token, "2h");
                  this.$cookies.set("CookieId", response.data.userId, "2h");
                  this.$cookies.set("CookiePassword", this.formInline.password);
                }).then(function () {
                  this.$Message.success('Success!');
                  window.location.href = '/loginHome'
                }, function (err) {
                  this.$Message.error('Email or Password error!');
                });
            }
            ///this.show(index);
          }
        });
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
  .login{
    margin-left:550px;
    margin-top: 150px;
  }

  label, input {
    display: table-cell;
    margin-bottom: 10px;
  }

  label {
    padding-right: 10px;
  }


</style>
