  labels = [] ; 
       data_train = [] ; 
       data = [] ; 
       

       $('body').on('click','#train',function(){
        
           
           
           $('#gf').show() ; 

           
           chart('/stock_prices') ; 

       
       }) ; 
       
            $('body').on('click','#predict',function(){
        
           
           chart('/stock_prices_predict') ; 
       
       }) ; 
  
       
        
       init_chart(data_train,data,labels) ; 

       
       
       function chart(url) 
       {
            $.ajax({
        url : url , 
        success : function(result)
        {
            
            $("#gf").hide() ; 
            
            //s = JSON.parse("{'a','b'}".toString()) ;
           // a = " " ; 
            //s = $.parseJSON(a+result.slice(0,result.length-1)) ; 
            s = $.parseJSON(result.slice(0,result.length-4)+result.slice(result.length-2,result.length)) ; 
            
            for(var i = 0 ; i < 6000 ; i++ )
            {
                labels[i] = i ; 
                data_train[i] = s[i] ; 
            }
            
            
            $.ajax({
            url : '/stock_prices_data' , 
            success : function(result)
            {
                s = $.parseJSON(result.slice(0,result.length-4)+result.slice(result.length-2,result.length)) ; 
            
                for(var i = 0 ; i < 6000 ; i++ )
                {
                    data[i] = s[i] ; 
                }
                

               init_chart(data_train,data,labels) ; 
                
            }
                }) ;
            
                } 
       
       }) ; 
       
       }
       
       function init_chart(data_train,data,labels)
       {
            var stock_data_train = {
                     label: "stock price prediction ",
                     data: data_train,
                     backgroundColor: 'rgba(99, 132, 0, 0.6)' ,
                     borderColor : 'rgba(255,255,255,0)'
                    
                    };
                
                var stock_data = {
                      label: "stock price ",
                      data: data ,
                      backgroundColor: 'rgba(19, 100, 200, 0.6)' ,
                      borderColor : 'rgba(255,255,255,0)'
                
                    };
                
                var st = {
                    labels: labels ,
                    datasets: [stock_data,stock_data_train] 
                    
                    };
                
                var chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 80,
                            fontColor: 'black'
                        }    
                        } , 
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    min: 0, 
                                    beginAtZero: true,
                                    stepSize: 1  
                                }
                            }
                        ]
                        ,
                        yAxes: [
                            {
                                ticks: {
                                    min: 0, 
                                    max: 200, 
                                    beginAtZero: true,
                                    stepSize: 1 
                                    
                                }
                            }
                        ]
                    }
                        };
       
                var spchar = $('#spchart') ; 
       
       
                var lineChart = new Chart(spchart, {
                    type: 'line',
                    data: st,
                    options: chartOptions
                });
      
       }