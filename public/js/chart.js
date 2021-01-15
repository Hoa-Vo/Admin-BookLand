$(document).ready(() => {
  const year = $("#year").find(":selected").text().split(" ")[1];
  $(".loader").css("display", "flex");
  $.ajax({
    url: "/api/get-chart-info",
    type: "GET",
    data: {
      year: year,
    },
    success: function (res) {
      console.log(res);
      updateChart(res);
    },
    error: function (jqXHR, textStatus, err) {},
  });
  topSaleApiCall();
  $(".loader").css("display", "none");
});
function updateChart(res) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: res.months,
      datasets: [
        {
          label: "Doanh thu tháng (đ)",
          data: res.data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function topSaleApiCall() {
  $.ajax({
    url: "/api/get-top-sale",
    type: "GET",
    success: function (res) {
      updateProductHtml(res);
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
function updateProductHtml(res) {
  if (res.length < 1) {
    $(".products").html("<p>Chưa có sản phẩm nào được mua</p>");
  } else {
    res
      .sort((a, b) => {
        return a.number - b.number;
      })
      .reverse();
    const source = $("#top-product").html();
    const template = Handlebars.compile(source);
    $(".products").html(template(res));
  }
}

function getDataOfYear() {
  const year = $("#year").find(":selected").text().split(" ")[1];

  $.ajax({
    url: "/api/get-chart-info",
    type: "GET",
    data: {
      year: year,
    },
    success: function (res) {
      console.log(res);
      updateChart(res);
    },
    error: function (jqXHR, textStatus, err) {},
  });
}
