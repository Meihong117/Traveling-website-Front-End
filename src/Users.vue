<template>
  <div style="background-color: beige">


    <Card style="width: 240px ; height: 235px; background-color: lightpink">
      <div >
        <img v-bind:src="imageView" style="width: 200px ; height: 200px;text-align:center">
      </div>
    </Card>
    <br>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" >
      <br>
      <h2 style="color: red;">Search User:</h2>
      <FormItem label="UserId" prop="userId">
        <Input v-model="formValidate.userId" placeholder="Input UserId" style="width: 100px"></Input>
        <Button type="primary" @click="getOne()" >Search</Button>
        <Button type="primary" onclick="window.location.href='/'" style="margin-left: 8px"><Icon type="ios-home"  style="font-size: 18px;"/></Button>
      </FormItem>
      <h2><span>User Information</span></h2>
      <br>
      <Table border :columns="columns6" :data="data6"></Table>
      <br>
    </Form>

  </div>
</template>

<script>
  export default {

    data() {
      const checknumber = (rule, value, callback) => {
        if (isNaN(this.formValidate.userId)) {
          return callback(new Error());
        }
      };
      return {
        formValidate: {
          userId: '',
        },
        ruleValidate: {
          userId: [
            {required: true, message: 'userId cannot be empty', trigger: 'blur'},
            {validator: checknumber, message: 'userId must a number', trigger: 'blur' },
          ],
        },
//user info
        columns6: [
          {
            title: 'Username',
            key: 'username',
            align: 'center'
          },
          {
            title: 'GivenName',
            key: 'givenName',
            align: 'center'
          },
          {
            title: 'FamilyName',
            key: 'familyName',
            align: 'center'
          },
        ],
        data6:[],
        imageView: '',
      }
    },
    mounted: function () {
      this.check_token()
     // this.getImage()
    },
    methods: {
//get user
      getOne: function () {
        this.data6 = [];
        this.$http.get('http://localhost:4941/api/v1/users/'+ this.formValidate.userId, {
          headers: {'X-Authorization': this.$cookies.get("CookieToken")}
        })
          .then(function (response) {
            //console.log(response.data);
            let result = response.data;
            this.data6.push(result);
          },function (err) {
           // alert('Id Error!')
          });
        this.getImage();
      },
//get photo
      getImage (){
        console.log(this.imageView)
        let url='http://localhost:4941/api/v1/users/'+this.formValidate.userId +'/photo';
        let http=new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if(http.status!==404){
          this.imageView = 'http://localhost:4941/api/v1/users/'+this.formValidate.userId +'/photo';
        }else{
          this.imageView='/photos/default.png';
        }
      },
      check_token(){
        if(this.$cookies.get("CookieToken")!==null){
          window.location.href='/LoginHome'
        }
      }

    },
  }
</script>

<style scoped>

</style>
