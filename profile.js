const ctx = document.getElementById('consumoPorHora').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['12 AM','4 AM','8 AM','12 PM','4 PM','8 PM'],
    datasets: [{
      label: 'Consumo (kWh)',
      data: [1,2,1.5,3,2.5,1.8],
      borderColor: '#0b2541',
      backgroundColor: 'rgba(11,37,65,0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false}
    }
  }
});

const label =document.getElementById('consumoPorMes').getContext('2d');
new Chart(label,{
    type:'bar',
    data:{
        labels:["1","2","3","4","5","6","7"],
        datasets:[{
            label:"Consumo por día (kWh)",
            data:[20,18,22,19,24,21,23],
            backgroundColor:"#0b2541",
            borderColor:"#000000ff",
            borderWidth:1,
        }]
    },
    options:{
        responsive:true,
        plugins:{
            legend:{display:false}
        },
    }
});

const donut = document.getElementById('consumoPorDispositivo').getContext('2d');
new Chart(donut,{
    type:'doughnut',
    data:{
        labels:["Refrigerador","Laptop"],
        datasets:[{
            label:"Consumo por dispositivo",
            data:[60,40],
            backgroundColor:["#0b2541","#f46161ff"],
            borderColor:"#000000ff",
            borderWidth:1,
            hoverOffset:4,
        }]
    },
    options:{
        responsive:true,
        plugins:{
            legend:{position:'bottom'}
        },
    }            
});