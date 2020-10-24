// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$.ajax({
  type: "POST",//用POST传递数据，GET也可以
  url: "http://192.168.56.134:8080/getSta",//我用的是MVC，这样可以直接触发对应的Controle
  headers: {'X-Auth-Token': localStorage.token},
  // data:JSON.stringify({"pageNo": 1,"pageSize": 20,"sortType": 1}),   // 发送的数据，注意，这里一定要序列化，因为已经声明了。
  contentType:'application/json',  // 声明发送数据格式
  dataType: "json",//定义的是返回数据的格式，直接写json就对了，写text的话还要用JSON.pare()再转换一次
  success: function (msg) {
      if (msg == null || msg == '') {
          alert("请联系管理员维护数据");     
      } else {
        showPie(msg);
        console.log("pie-finfsh");
      }
    }
});

function showPie(msg){

  let pielabelData=[];
  let pienumData=[];

  for(let i=0;i<msg.data.length;i++) {
    pielabelData.push(msg.data[i].label);
    pienumData.push(msg.data[i].num);
  }

  // Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: pielabelData,//["Direct", "Referral", "Social"],
      datasets: [{
        data: pienumData,//[55, 30, 15],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });

}


