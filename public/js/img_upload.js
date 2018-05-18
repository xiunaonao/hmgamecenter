/** 
* 从 file 域获取 本地图片 url 
*/ 
function getFileUrl(obj) { 
  let url; 
  url = window.URL.createObjectURL(obj.files.item(0)); 
  return url; 
}


var vapp = new Vue({
  el: '.feedback_box',
  // 定义数据
  data:{
    imgNum:5,    //上传的照片数量，可根据实际情况自定义  
    imgUrl:[],
    flagNum:0      
  },//定义事件
  methods:{
    //根据点击上传按钮触发input
    change_input(){
      let inputArr=$('#addTextForm input');
      let add_inputId='';     //需要被触发的input

      for(let i=0;i<inputArr.length;i++){
          // 根据input的value值判断是否已经选择文件
        if(!inputArr[i].value){          //如果没有选择,获得这个input的ID      
           add_inputId=inputArr[i].id;
           break;
        }
      }

      if(add_inputId){                   //如果需要被触发的input ID存在,将对应的input触发
       
        return  $("#"+add_inputId).click();
      }else{
        $(".alert_msg p").html("最多选择"+this.imgNum+"张图片");
        $(".alert_msg").show();
        setTimeout('$(".alert_msg").hide()', 2000);
      }
    },
    //当input选择了图片的时候触发,将获得的src赋值到相对应的img
    setImg(e){
      let target=e.target;
      $('#img_'+target.id).attr('src',getFileUrl(e.srcElement));
      this.flagNum++;
      console.log("flagNum++:"+this.flagNum);
      if(this.flagNum<5){
        $('#img_'+target.id).parent().css({"margin-right":"0.19rem"});
      }
    },
    //点击图片删除该图片并清除相对的input
    deleteImg(e){
      let target=e.target;
      let inputID='';       //需要清除value的input
      if(target.nodeName=='IMG'){
        target.src='';
        inputID=target.id.replace('img_','');    //获得需要清除value的input
        $('input#'+inputID).val("");
        this.flagNum--;
      }
      console.log("flagNum--:"+this.flagNum);
    },
    //提交信息到后台
    // submit(){
    //     $("#addTextForm").ajaxSubmit({
    //        url: "/api/upload",      
    //        type: "post",
    //        data: {
    //                 'total_price':this.price,
    //                 'descript':this.descript,
    //             },
    //        success:  (data) => {
    //             if(data.success==1){
    //               this.imgUrl = data.url;
    //               console.log(this.imgUrl);
    //               this.allSubmit()
    //               this.flagNum = 0;
    //               return;

    //            }else{
    //               $(".alert_msg p").html(data.msg);
    //               $(".alert_msg").show();
    //               setTimeout('$(".alert_msg").hide()', 2000);
    //               return;
    //            }
    //         }
    //     });  
    //   },
      allSubmit(){
        var name = $(".fb_name").val();
        var mobile = $(".fb_tel").val();
        var context = $(".fb_content").val();
        var uploadSrc = $("#img-wrapper img").attr("src");
        // srcArr = this.imgUrl.split(",");
        console.log(uploadSrc);

        if (name == '') {
            $(".alert_msg p").html("请填写您的姓名！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (mobile == '') {
            $(".alert_msg p").html("请填写您的手机号！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (context == '') {
            $(".alert_msg p").html("请填写您的建议！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }
        if (uploadSrc == '') {
            $(".alert_msg p").html("请填您选择图片！");
            $(".alert_msg").show();
            setTimeout('$(".alert_msg").hide()', 2000);
            return;
        }

        $("#addTextForm").ajaxSubmit({
           url: "/api/upload",      
           type: "post",
           data: {
                    'total_price':this.price,
                    'descript':this.descript,
                },
           success:  (data) => {
                if(data.success==1){
                  this.imgUrl = data.url;
                  console.log(this.imgUrl);
                  var srcArr = this.imgUrl;
                  $.ajax({
                      url: "/api/feedback_add",
                      type: "post",
                      dataType: "json",
                      data:{name:name, mobile:mobile, context:context, images:srcArr},
                      async: false,
                      success: function (data) {
                          if (data.success) {
                            $(".alert_msg p").html("提交成功");
                            $(".alert_msg").show();
                            setTimeout('$(".alert_msg").hide()', 2000);
                            return;
                          } else {
                              $(".alert_msg p").html(data.msg);
                              $(".alert_msg").show();
                              setTimeout('$(".alert_msg").hide()', 2000);
                              return;
                          }
                          
                      }
                  });
                  this.flagNum = 0;
                  return;

               }else{
                  $(".alert_msg p").html(data.msg);
                  $(".alert_msg").show();
                  setTimeout('$(".alert_msg").hide()', 2000);
                  return;
               }
            }
        });

        
      }
   },
  //页面加载后执行
  mounted(){
    for(let i=0;i<this.imgNum;i++){
     //生成input框，默认为1
    let my_input = $('<input type="file" name="image" />');   //创建一个input
    my_input.attr('id',i);                           //为创建的input添加id
    $('#addTextForm').append(my_input);                     //将生成的input追加到指定的form
    //生成img，默认为1
    let my_img = $('<div><img src=""></div>');
    my_img.find("img").attr('id', 'img_'+i);  
    // my_img.css({"margin-right":"0.15rem"});
    $('#img-wrapper').append(my_img); 
    }
  },
}) 

console.log(vapp.imgUrl);