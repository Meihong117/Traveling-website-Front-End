<template>
<div style="background-color: lavenderblush">


  <div>
    <br>
    <h2>Venue Photo Details:</h2>
    <Table border :columns="columns1" :data="data1"></Table>
  <!--<  id="images">-->
  </div>


    <div id = "upload">
      <Form ref="upload" :model="upload" :rules="ruleInline" :label-width="80">
        <br>
        <br>
        <h2>Add Venue Photo:</h2>
        <FormItem label="Description">
          <input v-model="upload.desc" placeholder="Description"></input>
        </FormItem>

        <FormItem label="Primary">
          <select  v-model="upload.primary" >
            <option value = 'true' >True</option>
            <option value = 'false' >False</option>
          </select>
        </FormItem>

        <FormItem label="Photo File">
          <input type = "file" accept = ".jpeg,.jpg,.png" id = "myFile" class="input"></input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click = "addPhoto">submit</Button>
          <Button type="default" style="margin-left: 8px" class="pop_cancel" @click="close_upload">Cancel</Button>
        </FormItem>
      </Form>
    </div>




</div>

</template>

<script>
    export default {
        data(){
          return{
            modal2:'',
            test:'',
            photoFilename:'',
            photoDescription:'',
            isPrimary:'',

            upload:{
              desc:'',
              file:"",
              primary:""
            },
            ruleInline: {
              desc: [
                { required: true, message: 'Please fill in the username or email', trigger: 'blur' }
              ],
              primary: [
                { required: true, message: 'Please fill in the username or email', trigger: 'blur' }
              ],
              file: [
                { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                { type: 'file', min: 1, message: 'The password length cannot be less than 1 bits', trigger: 'blur' }
              ]
            },
            columns1: [
              {
                title: "photoFilename",
                key:'venue4',
                align: 'center',
              },
              {
                title: 'Description',
                key: 'venue5',
                align: 'center',
              },
              {
                title: 'isPrimary',
                key: 'venue6',
                align: 'center',
              },
              {
                title:'primaryPhoto',
                key:'primaryPhoto',
                align:'center',
                render: (h, params) => {
                  return h('div', [
                    h('img', {
                      attrs: {
                        src:this.getImage(this.$route.params.venue_id, this.data1[params.index].photoFilename)
                      },
                      style:{
                        width:'50px',
                        height:'50px'
                      }
                    }),
                  ]);
                }
              },
              {
                title:'primaryPhoto',
                key:'primaryPhoto',
                align:'center',
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
                          this.deletePhoto(params.index)
                        },
                        style:{

                        }
                      }
                    }, 'delete'),
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
                          this.setPrimary(params.index)
                        },
                        style:{

                        }
                      }
                    }, 'set Primary'),


                  ]);
                }
              },
            ],
            data1:[],
          }
        },
      mounted:function () {
        this.getOne();
        this.check_token();
      }
      ,
      methods:{
        getOne: function () {
          const queryBody={};

          if(this.photoFilename!==''){
            queryBody.photoFilename=this.photoFilename;
          }
          if(this.photoDescription!==''){
            queryBody.photoDescription=this.photoDescription;
          }
          if(this.isPrimary!==''){
            queryBody.isPrimary=this.isPrimary;
          }
          this.$http.get('http://localhost:4941/api/v1/venues/'+ this.$route.params.venue_id)
            .then(function (response) {
                  let venue_id_result=response.data;
                  let photos=venue_id_result.photos.length;

                  for(let i=0; i<photos; i++){
                    venue_id_result.photos[i].venue4=venue_id_result.photos[i].photoFilename;
                    venue_id_result.photos[i].venue5=venue_id_result.photos[i].photoDescription;
                    venue_id_result.photos[i].venue6=venue_id_result.photos[i].isPrimary;
                    this.photoFilename=venue_id_result.photos[i].photoFilename;
                  }
                  this.data1 = venue_id_result.photos;
            });
          //this.getImage();
        },
        getImage (a,b){
          //console.log(b)
          if(b===null){
            return '/photos/default.png'
          }else{
            return 'http://localhost:4941/api/v1/venues/' + a + '/photos/' + b
          }
        },

        addPhoto(){
          //this.expire();
          this.upload.file = document.getElementById("myFile").files[0];  //?
          if (this.upload.desc === "" || this.upload.primary === "" || this.upload.file === ""){
            alert("Please fill in all fields!")
          }else{
            if (this.upload.primary === 'true'){
              this.upload.primary = true;
            }else{
              this.upload.primary = false;
            }
            let data = new FormData();
            data.append('photo', this.upload.file);
            data.append('description',this.upload.desc);
            data.append('makePrimary',this.upload.primary);
            //console.log(data)
            this.$http.post('http://127.0.0.1:4941/api/v1/venues/'+this.$route.params.venue_id+'/photos', data,
              {headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'content-type': 'multipart/form-data',
                'X-Authorization': this.$cookies.get("CookieToken")
              }}).then(function () {
              this.$Message.success('Success put photo!');
              window.location.href='/PersonalInfo'
            },function () {
              alert("Error!")
            })
          }
        },
        close_upload: function () {
          this.upload.desc = "";
          this.upload.primary = "";
          this.upload.file = "";
        },
        deletePhoto(a){
          let data = this.data1;
          let pname = data[a].photoFilename;
          this.$http.delete('http://localhost:4941/api/v1/venues/'+this.$route.params.venue_id+'/photos/'+pname,
            {headers:{'X-Authorization': this.$cookies.get("CookieToken")}

            }).then(function () {
              this.$Message.success('Delete succeed!');
            window.location.href='/PersonalInfo'

            });
        },
        setPrimary(a){
          let data = this.data1;
          let pname = data[a].photoFilename;
          this.$http.post('http://127.0.0.1:4941/api/v1/venues/'+this.$route.params.venue_id+'/photos/'+pname+'/setPrimary',"",
            {headers:{'X-Authorization': this.$cookies.get("CookieToken")}
            }).then(function () {
              this.$Message.success('Primary set!');
            window.location.href='/PersonalInfo'
            });
        },
        check_token(){
          if(this.$cookies.get("CookieToken")===null){
            window.location.href='/'
          }
        },
      }
    }
</script>

<style scoped>

</style>
