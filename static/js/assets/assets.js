	function Percentage(num, total) {
			return (Math.round(num / total * 10000) / 100);
	}	

	function getRandomColor(){
		return '#'+(Math.random()*0xffffff<<0).toString(16);
	}

	function groupCount (ids,dataList) {
		if(dataList.length){
        	var labels = [];	
        	var data = [];
        	var trHtml = '';
        	var total = 0;
        	var colorList = ["aero","purple","green","blue","red"]
        	for (var i=0; i < dataList.length; i++){
        		data.push(dataList[i]["count"]);
        		labels.push(dataList[i]["name"]);
        		total = total + dataList[i]["count"]
        	}
        	for (var i=0; i < dataList.length; i++){
        		trHtml = trHtml +  '<tr>' +
			                          '<td>' +
			                             '<p><i class="fa fa-square '+ colorList[i] +'"></i>'+ dataList[i]["name"] +'</p>' +
			                          '</td>' +
			                          '<td>'+ Percentage(dataList[i]["count"],total) + '%</td>' +
			                       '</tr>'            		
        	}
        	$("#group_count").html(trHtml);	
        	init_chart_doughnut(ids,labels,data);			
		}else{
        	var labels = ["DBA", "运维", "开发一组", "开发二组", "开发三组"];	
			var data = [1, 2, 3, 1, 3];
			init_chart_doughnut(ids,labels,data);  			
		}
	}
	
	function typeCount (dataList) {
		if (dataList.length){
       		var labelsList = [];	
        	var values = [];				
		}else{
			var labelsList = ["物理服务器","虚拟机"];
			var values = [203,124];			
		}
	    if ($("#pieChart").length) { 
	    	let colorList = []
        	for (var i=0; i < dataList.length; i++){
        		values.push(dataList[i]["count"]);
        		labelsList.push(dataList[i]["assets_type"]);
        		colorList.push(getRandomColor())
        	}		    
	        var f = document.getElementById("pieChart"),        
	        i = {
	            datasets: [{
	                data: values,
	                backgroundColor: colorList,
	                label: "My dataset"
	            }],
	            labels: labelsList
	        };
	        new Chart(f, {
	            data: i,
	            type: "pie",
	            otpions: {
	                legend: !1
	            }
	        })
	    }
	}	


	
	function tagsCount (dataList) {
		if (dataList.length){
       		var labelsList = [];	
        	var values = [];				
		}else{
			var labelsList = ["物理服务器","虚拟机"];
			var values = [203,124];			
		}
	    if ($("#pieTagsChart").length) { 
	    	let colorList = []
        	for (var i=0; i < dataList.length; i++){
        		values.push(dataList[i]["count"]);
        		labelsList.push(dataList[i]["tags_name"]);
        		colorList.push(getRandomColor())
        	}		    
	        var f = document.getElementById("pieTagsChart"),        
	        i = {
	            datasets: [{
	                data: values,
	                backgroundColor: colorList,
	                label: "My dataset"
	            }],
	            labels: labelsList
	        };
	        new Chart(f, {
	            data: i,
	            type: "pie",
	            otpions: {
	                legend: !1
	            }
	        })
	    }
	}	
	
	function idcCount (dataList) {
		if(dataList.length){
        	var labels = [];	
        	var data = [];
        	var divHtml = '';
        	var total = 0;
        	for (var i=0; i < dataList.length; i++){
        		data.push(dataList[i]["count"]);
        		labels.push(dataList[i]["idc_name"]);
        		total = total + dataList[i]["count"]
        	}
        	for (var i=0; i < dataList.length; i++){
        		divHtml = divHtml +     '<div class="widget_summary">' +
					                    '<div class="w_left w_25">' +
					                      '<span>'+ dataList[i]["idc_name"] +'</span>' +
					                    '</div>' +
					                    '<div class="w_center w_55">' +
					                      '<div class="progress">' +
					                        '<div class="progress-bar bg-green" role="progressbar" aria-valuenow="'+ Percentage(dataList[i]["count"],total) +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ Percentage(dataList[i]["count"],total) +'%;">' +
					                          '<span class="sr-only">'+ Percentage(dataList[i]["count"],total) +'% Complete</span>' +
					                        '</div>' +
					                      '</div>' +
					                    '</div>' +
					                    '<div class="w_right w_20">' +
					                      '<span>'+ dataList[i]["count"] +'</span>' +
					                    '</div>' +
					                    '<div class="clearfix"></div>' +
					                  '</div>'           		
        	};
        	$("#zone_count").html(divHtml);			
		}  			
	}		
	
	function statusCount (dataList) {
		if(dataList.length){
			var total = 0;
			var data = [];
        	for (var i=0; i < dataList.length; i++){
        		data.push(dataList[i]["count"]);
				switch(dataList[i]["status"])
				{
					case 0:
					  $("#zx_count").text(dataList[i]["count"]);	
					  break;
					case 1:
					  $("#xx_count").text(dataList[i]["count"]);	
					  break;
					case 2:
					  $("#wx_count").text(dataList[i]["count"]);	
					  break;	
					case 3:
					  $("#rk_count").text(dataList[i]["count"]);	
					  break;	
					case 4:
					  $("#wy_count").text(dataList[i]["count"]);	
					  break;					  				  				  
					default:
					  console.log("no data");
				}
        		total = total + dataList[i]["count"]
        	}	
        	 $("#zj_count").text(total);			
		}
	}

	function requests(method,url,data){
		var ret = '';
		$.ajax({
			async:false,
			url:url, //请求地址
			type:method,  //提交类似
	       	success:function(response){
	             ret = response;
	        },
	        error:function(data){
	            ret = {};
	        }
		});	
		return 	ret
	}
	
	var language =  {
			"sProcessing" : "处理中...",
			"sLengthMenu" : "显示 _MENU_ 项结果",
			"sZeroRecords" : "没有匹配结果",
			"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
			"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
			"sInfoPostFix" : "",
			"sSearch" : "搜索: ",
			"sUrl" : "",
			"sEmptyTable" : "表中数据为空",
			"sLoadingRecords" : "载入中...",
			"sInfoThousands" : ",",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "上页",
				"sNext" : "下页",
				"sLast" : "末页"
			},
			"oAria" : {
				"sSortAscending" : ": 以升序排列此列",
				"sSortDescending" : ": 以降序排列此列"
			}
	}
	
	function InitDataTable(tableId,dataList,buttons,columns,columnDefs,page){
		oOverviewTable =$('#'+tableId).dataTable({
					    "dom": "Bfrtip",
					    "buttons":buttons,				  
			    		"bScrollCollapse": false, 				
			    	    "bRetrieve": true,			
			    		"destroy": true, 
			    		"data":	dataList.results,
			    		"columns": columns,
			    		"columnDefs" :columnDefs,			  
			    		"language" : language,
			    		"iDisplayLength": 20,
			            "select": {
			                "style":    'multi',
			                "selector": 'td:first-child'
			            },		    		
			    		"order": [[ 0, "ase" ]],
			    		"autoWidth": false	    			
		});	
	  if (dataList['next']){
		  $("button[name='"+ page +"_page_next']").attr("disabled", false).val(dataList['next']);	
	  }else{
		  $("button[name='"+ page +"_page_next']").attr("disabled", true).val();
	  }
	  if (dataList['previous']){
		  $("button[name='"+ page +"_page_previous']").attr("disabled", false).val(dataList['next']);	
	  }else{
		  $("button[name='"+ page +"_page_previous']").attr("disabled", true).val();
	  }	  		
	}	
	
	function RefreshTable(tableId, urlData, page){
		$.getJSON(urlData, null, function( dataList )
		{
		  table = $('#'+tableId).dataTable();
		  oSettings = table.fnSettings();
		  
		  table.fnClearTable(this);
		
		  for (var i=0; i<dataList["results"].length; i++)
		  {
		    table.oApi._fnAddData(oSettings, dataList["results"][i]);
		  }
		
		  oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
		  table.fnDraw();
		  if (dataList['next']){
		   	  $("button[name='"+ page +"_page_next']").attr("disabled", false).val(dataList['next']);	
		  }else{
		   	  $("button[name='"+ page +"_page_next']").attr("disabled", true).val();
		  }
		  if (dataList['previous']){
		   	  $("button[name='"+ page +"_page_previous']").attr("disabled", false).val(dataList['previous']);	
		  }else{
		   	  $("button[name='"+ page +"_page_previous']").attr("disabled", true).val();
		  } 	  
		});
	}	
	
	function RefreshAssetsTable(tableId, urlData, page){
		$.getJSON(urlData, null, function( dataList ){
	    table = $('#'+tableId).dataTable();
	    oSettings = table.fnSettings();
	    
	    table.fnClearTable(this);

	    for (var i=0; i<dataList.length; i++)
	    {
	      table.oApi._fnAddData(oSettings, dataList[i]);
	    }    
	    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
	    table.fnDraw();
	  	if (dataList['next']){
	   	  	$("button[name='"+ page +"_page_next']").attr("disabled", false).val(dataList['next']);	
	  	}else{
	   	  	$("button[name='"+ page +"_page_next']").attr("disabled", true).val();
	  	}
	  	if (dataList['previous']){
	   	  	$("button[name='"+ page +"_page_previous']").attr("disabled", false).val(dataList['previous']);	
	  	}else{
	   	  	$("button[name='"+ page +"_page_previous']").attr("disabled", true).val();
	  	} 		    
	  });	
	}	
	
	function updateAssetsByAnsible(dataList){
		var serverId = [];
		for (var i=0; i <dataList.length; i++){
			serverId.push(dataList[i]["id"])
		}
		$.ajax({
			  type: 'POST',
			  url: '/assets/batch/',
			  dataType:"json",
			  data:{
				  'ids':serverId,
				  'model':'batch'
			  },
		      success:function(response){	
		    	var sip = '';
		    	var fip = '';
		    	var modal = '';
	    		for  (var i = 0; i < response['data']['success'].length; i++){
	    			 sip += response['data']['success'][i] + '<br>'
	    		}
	    		for  (var i = 0; i < response['data']['failed'].length; i++){
	    			 fip += response['data']['failed'][i] + '<br>'
	    		}	
	    		msg = '成功：'+ '<br>' + sip + '<br>' + '失败：'+ '<br>' + fip;	
		    	if (response['code']==200){
	            	new PNotify({
	                    title: 'Success!',
	                    text: msg,
	                    type: 'success',
	                    styling: 'bootstrap3',
	                    delay: 18000
	                }); 
	            	RefreshAssetsTable("assetsListTable", "/api/assets/", "assets")
		    	}
		    	else{
	            	new PNotify({
	                    title: 'Ops Failed!',
	                    text: response["msg"],
	                    type: 'error',
	                    styling: 'bootstrap3',
	                    delay: 18000
	                }); 
		    	}	            
		      },
            error:function(response){
	          	new PNotify({
	                  title: 'Ops Failed!',
	                  text: '资产修改失败',
	                  type: 'error',
	                  styling: 'bootstrap3'
	              }); 
            }
		});			
	}
	
	$(document).ready(function() {		
    	$.ajax({  
            cache: true,  
            type: "GET",  
            url:"/api/assets/count/",  
            async : true,  
            error: function(request) {  
            	groupCount([])      
            },  
            success: function(request) {  
 				groupCount("groupCountcanvasDoughnut",request["data"]["groupCount"])
 				typeCount(request["data"]["typeCount"])
 				tagsCount(request["data"]["tagsCount"])
 				idcCount(request["data"]["idcCount"])
 				statusCount(request["data"]["statusCount"])
            }  
    	}); 			 
	});  
	
	$(document).ready(function() {
	      if ($("#zoneTableLists").length) {
	    	    $('#zoneTableLists').DataTable( {
	      	        "order": [[1, 'desc']],
	    			language : {
						"sProcessing" : "处理中...",
						"sLengthMenu" : "显示 _MENU_ 项结果",
						"sZeroRecords" : "没有匹配结果",
						"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
						"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
						"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
						"sInfoPostFix" : "",
						"sSearch" : "搜索:",
						"sUrl" : "",
						"sEmptyTable" : "表中数据为空",
						"sLoadingRecords" : "载入中...",
						"sInfoThousands" : ",",
						"oPaginate" : {
							"sFirst" : "首页",
							"sPrevious" : "上页",
							"sNext" : "下页",
							"sLast" : "末页"
						},
						"oAria" : {
							"sSortAscending" : ": 以升序排列此列",
							"sSortDescending" : ": 以降序排列此列"
						}
				},	      	        
	      	    });		
	      };	      
	      if ($("#assetsListTable").length) {	
	      	
	        $("button[name^='assets_page_']").on("click", function(){
	          	var url = $(this).val();
	          	$(this).attr("disabled",true);
	          	if (url.length){
	          		RefreshTable('assetsListTable', url, 'assets');
	          	}      	
	        	$(this).attr('disabled',false);
	          }); 	      	
	      	
		    function makeAssetsTableList(dataList){
		        var columns = [		                       
		    		           {
		   		                "orderable": false,
		   		                "data":      null,
		   		                "className": 'select-checkbox', 
		   		                "defaultContent": ''
		    		           },  
		                       {
								"className": 'details-control',
								"orderable": false,
								"data":      null,
								"defaultContent": ''
		                       },	
//			                   {"data": "status"},
			                   {"data": "name"},
		                       {"data": "name"},		                       
		                       {"data": "detail.ip"},     
		                       {
		                    	   "data": "detail.system",
		                    	   "defaultContent": ''
		                       },
		    	               {
		                    	   "data": "detail.kernel",
		                    	   "defaultContent": ''
		    	               },
		    	               {
		    	            	   "data": "detail.cpu_number",
		    	            	   "defaultContent": ''
		    	               },
		    	               {
		    	            	   "data": "detail.ram_total",
		    	            	   "defaultContent": ''
		    	               },
		    	               {
		    	            	   "data": "detail.disk_total",
		    	            	   "defaultContent": ''
		    	               },
		    	               {
		    	            	   "data": "idc",
		    	            	   "defaultContent": ''
		    	               },
		    	               ]
		       var columnDefs = [     
		       
		    	    		       {
		       	    				targets: [3],
		       	    				render: function(data, type, row, meta) {  	    					
		       	                        	return formart_assets_type(row.assets_type)
		       	    					}
		    	    		        },		       
		    	    		       {
		       	    				targets: [11],
		       	    				render: function(data, type, row, meta) {  	    					
		       	                        return '<div class="btn-group  btn-group-sm">' +	
					       	                     	'<button type="button" name="btn-assets-alter" value="'+ row.id +'" class="btn btn-default" aria-label="Center Align"><a href="/assets/manage/?id='+row.id+'&model=edit" target="view_window"><span class="glyphicon glyphicon-check" aria-hidden="true"></span></a>' +
						                            '</button>' +
						                            '<button type="button" name="btn-assets-info" value="'+ row.id +'" class="btn btn-default" aria-label="Right Align" data-toggle="modal" data-target=".bs-example-modal-info"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>' +
						                            '</button>' +	                            
						                            '<button type="button" name="btn-assets-update" value="'+ row.id +'" class="btn btn-default" aria-label="Right Align"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>' +
						                            '</button>' +
						                            '<button type="button" name="btn-assets-delete" value="'+ row.id +'" class="btn btn-default" aria-label="Justify"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' +
						                            '</button>' +
		    	    	                           '</div>';
		       	    				},
		       	    				"className": "text-center",
		    	    		        }
		    	    		      ]	
		        var buttons = [{
		            text: '更新',
		            className: "btn-sm",
		            action: function ( e, dt, node, config ) {        	
		                	let dataList = dt.rows('.selected').data()
		                	var vips = ''
		                	if (dataList.length==0){
		                		$.alert({
		                		    title: '操作失败',
		                		    content: '批量更新资产失败，请先选择资产',
		                		    type: 'red',		    
		                		});	            		
		                	}else{ 
		                		updateAssetsByAnsible(dataList)
		                	} 
	                	} 
		        	},
		            {
		                text: '修改',
		                className: "btn-sm",
		                action: function (e, dt, button, config) {
		                	//dt.rows().select();          	
		                }
		            },       
		            {
		                text: '全选',
		                className: "btn-sm",
		                action: function (e, dt, button, config) {
		                	dt.rows().select();
		                }
		            },        
		            {
		                text: '反选',
		                className: "btn-sm",
		                action: function (e, dt, button, config) {
		                	dt.rows().deselect();
		                }
		            }    	
		        ]    
		    	InitDataTable('assetsListTable',dataList,buttons,columns,columnDefs,'assets');	
		    }		    
		    makeAssetsTableList(requests("get","/api/assets/"))
		    // Add event listener for opening and closing details
		    $('#assetsListTable tbody').on('click', 'td.details-control', function () {
		    	var table = $('#assetsListTable').DataTable();
		        var tr = $(this).closest('tr');
		        var row = table.row( tr );
		        var data ={};
		        aId = row.data()["id"];
		        $.ajax({
		            url : "/api/assets/"+aId+"/",
		            type : "get",
		            async : false,
		            dataType : "json",
		            success : function(result) {
		            	data = result
		            }
		        });	        
		        if ( row.child.isShown() ) {
		            row.child.hide();
		            tr.removeClass('shown');
		        }
		        else {
		            row.child( format(data) ).show();
		            tr.addClass('shown');
		        }
		    });
	    }  	
		
		//更新资产
		$('#assetsListTable tbody').on('click','button[name="btn-assets-update"]',function(){
			var table = $('#assetsListTable').DataTable();
			$(this).attr('disabled',true);
	    	var vIds = $(this).val();
	    	var td = $(this).parent().parent().parent().find("td")
	    	var ip = td.eq(4).text(); 
			$.confirm({
			    title: '更新确认',
			    content: ip,
			    buttons: {
			              更新: function () {
				    	$.ajax({  
				            cache: true,  
				            type: "POST",  
				            url:"/assets/modf/" + vIds + '/', 
				            data:{"model":'collector',"ids":vIds},
				            error: function(request) {  
				            	new PNotify({
				                    title: 'Ops Failed!',
				                    text: "更新失败",
				                    type: 'error',
				                    styling: 'bootstrap3'
				                });       
				            },  
				            success: function(request) {  
				            	if (request["code"] == "200"){
					            	new PNotify({
					                    title: 'Success!',
					                    text: request["msg"],
					                    type: 'success',
					                    styling: 'bootstrap3'
					                }); 
					            	window.location.reload();				            		
				            	}else{
					            	new PNotify({
					                    title: 'Ops Failed!',
					                    text: request["msg"],
					                    type: 'error',
					                    styling: 'bootstrap3'
					                });  				            		
				            	}

				            }  
				    	});
			        },
				        取消: function () {
				            return true;			            
				        },			        
				    }
			});			
			$(this).attr('disabled',false);
		});
		
		//更新资产
		$('#assetsListTable tbody').on('click','button[name="btn-assets-hw"]',function(){
			$(this).attr('disabled',true);
	    	var vIds = $(this).val();
	    	var td = $(this).parent().parent().parent().find("td")
	    	var ip = td.eq(4).text(); 
			$.confirm({
			    title: '更新内存硬盘信息',
			    content: ip,
			    buttons: {
			              更新: function () {
				    	$.ajax({  
				            cache: true,  
				            type: "POST",  
				            url:"/assets/modf/" + vIds + '/', 
				            data:{"model":'crawHw',"ids":vIds},
				            error: function(request) {  
				            	new PNotify({
				                    title: 'Ops Failed!',
				                    text: "更新失败",
				                    type: 'error',
				                    styling: 'bootstrap3'
				                });       
				            },  
				            success: function(request) {  
				            	if (request["code"] == "200"){
					            	new PNotify({
					                    title: 'Success!',
					                    text: request["msg"],
					                    type: 'success',
					                    styling: 'bootstrap3'
					                }); 
					            	window.location.reload();				            		
				            	}else{
					            	new PNotify({
					                    title: 'Ops Failed!',
					                    text: request["msg"],
					                    type: 'error',
					                    styling: 'bootstrap3'
					                });  				            		
				            	}

				            }  
				    	});
			        },
				        取消: function () {
				            return true;			            
				        },			        
				    }
			});			
			$(this).attr('disabled',false);
		});		
		
		 //删除资产
	     $('#assetsListTable tbody').on('click','button[name="btn-assets-delete"]',function(){
	    	var vIds = $(this).val();
	    	var td = $(this).parent().parent().parent().find("td")
	    	var ip = td.eq(4).text(); 
			$.confirm({
			    title: '删除确认',
			    content: ip,
			    type: 'red',
			    buttons: {
			        删除: function () {
					    	$.ajax({  
					            cache: true,  
					            type: "DELETE",  
					            url:"/api/assets/" + vIds + '/',  
					            error: function(request) {  
					            	new PNotify({
					                    title: 'Ops Failed!',
					                    text: "删除失败",
					                    type: 'error',
					                    styling: 'bootstrap3'
					                });       
					            },  
					            success: function(request) {  
					            	new PNotify({
					                    title: 'Success!',
					                    text: "删除成功",
					                    type: 'success',
					                    styling: 'bootstrap3'
					                }); 
					            	window.location.reload();
					            }  
					    	});
			        },
			         取消: function () {
			            return true;			            
			        },			        
			    }
			});	  	
	    });		    

	});

	
	$('#assetsListTable tbody').on('click','button[name="btn-assets-info"]',function(){
		$(this).attr('disabled',true);
    	var vIds = $(this).val();
    	var td = $(this).parent().parent().parent().find("td")
    	var ip = td.eq(4).text(); 
    	$.ajax({  
            cache: true,  
            type: "GET",  
//            url:"/assets/manage/?id="+ vIds +"&model=info",  
            url:"/api/assets/"+ vIds +"/",  
            async: false,  
            error: function(response) {  
            	console.log(response)
            },  
            success: function(response) {   	
            	if (Object.keys(response).length > 0){
            		switch (response["status"])
            		{
	            		case 0:
	            		  status = '<span class="label label-success">已上线</span>';
	            		  break;
	            		case 1:
	            		  status = '<span class="label label-warning">已下线</span>';
	            		  break;
	            		case 2:
	            		  status = '<span class="label label-default">维修中</span>';
	            		  break;
	            		case 3:
	            		  status = '<span class="label label-info">已入库</span>';
	            		  break;
	            		case 4:
	            		  status = '<span class="label label-primary">未使用</span>';
	            		  break;
            		}         		
            		var ulTag = '<ul class="list-unstyled timeline" id="assets_info">';
            		var serverLiTags = '';
            		var netcardLiTags = '';
            		var ramLiTags = '';
            		var diskLiTags = '';            		
            		var baseLiTags  =  '<li>' +
										  '<div class="block">' +
											'<div class="tags">' +
											  '<a href="" class="tag">' +
												'<span>基础信息</span>' +
											  '</a>' +
											'</div>' +
											'<div class="block_content">' +
							                    '<table class="table table-striped">' +		                
							                      '<tbody>' +
							                        '<tr>' +
							                          '<td>资产类型 :</td>' +
							                         ' <td>'+ response["assets_type"] +'</td>' +
							                          '<td> 资产编号  :</td>' +
							                          '<td>'+ response["name"] +'</td>' +			                         
							                        '</tr>' +
							                        '<tr>' +
							                          '<td>设备序列号 :</td>' +
							                          '<td>'+ response["sn"] +'</td>' +
							                          '<td>购买日期 : </td>' +
							                          '<td>'+ response["buy_time"] +'</td>' +			                          
							                        '</tr>' +		
							                        '<tr>' +
							                          '<td>过保日期 :</td>' +
							                          '<td>'+ response["expire_date"] +'</td>' +
							                          '<td>管理IP:</td>' +
							                          '<td>'+ response["management_ip"] +'</td>' +			                          
							                        '</tr>' +
							                        '<tr>' +
							                          '<td>购买人 : </td>' +
							                          '<td>'+ response["buy_user"] +'</td>' +
							                          '<td>生产制造商  :</td>' +
							                          '<td>'+ response["manufacturer"] +'</td>' +			                          
							                        '</tr>' +		
							                        '<tr>' +
							                          '<td>设备型号 :</td>' +
							                          '<td>'+ response["model"] +'</td>' +
							                          '<td>供货商 : </td>' +
							                          '<td>'+ response["provider"] +'</td>' +			                          
							                        '</tr>' +	
							                        '<tr>' +
							                          '<td>放置区域 :</td>' +
							                          '<td>'+ response["idc"] +'</td>' +
							                          '<td>机柜信息 : </td>' +
							                          '<td>'+ response["cabinet"] +'</td>' +			                          
							                        '</tr>' +	
							                        '<tr>' +
							                          '<td>设备状态 : </td>' +
							                          '<td>'+ status +'</td>' +
							                          '<td>使用组 :</td>' +
							                          '<td>'+ response["group"] +'</td>' +			                          
							                        '</tr>' +
//							                        '<tr>' +
//							                          '<td>所属项目 : </td>' +
//							                          '<td>'+ response["business"] +'</td>' +
//							                          '<td>所属应用 : </td>' +
//							                          '<td>'+ response["service"] +'</td>' +			                          
//							                        '</tr>' +			                        
							                      '</tbody>' +
							                    '</table>' +							
											'</div>' +
										  '</div>' +
										'</li>';
            		if (Object.keys(response["detail"]).length > 0){
                		serverLiTags = '<li>' +
						  '<div class="block">' +
							'<div class="tags">' +
							  '<a href="" class="tag">' +
								'<span>硬件信息</span>' +
							  '</a>' +
							'</div>' +
							'<div class="block_content">' +
			                    '<table class="table table-striped">' +		                
			                      '<tbody>' +
			                        '<tr>' +
			                          '<td>主机名 :</td>' +
			                         ' <td>'+ response["detail"]["hostname"] +'</td>' +
			                          '<td>操作系统:</td>' +
			                          '<td>'+ response["detail"]["system"]+'</td>' +			                         
			                        '</tr>' +
			                        '<tr>' +
			                          '<td>内核版本 :</td>' +
			                          '<td>'+ response["detail"]["kernel"] +'</td>' +
			                          '<td>IP地址 : </td>' +
			                          '<td>'+ response["detail"]["ip"] +'</td>' +			                          
			                        '</tr>' +		
			                        '<tr>' +
			                          '<td>CPU :</td>' +
			                          '<td>'+ response["detail"]["cpu"] +'</td>' +
			                          '<td>CPU个数:</td>' +
			                          '<td>'+ response["detail"]["vcpu_number"] +'</td>' +			                          
			                        '</tr>' +
			                        '<tr>' +
			                          '<td>硬盘大小(GB) : </td>' +
			                          '<td>'+ response["detail"]["disk_total"] +'</td>' +
			                          '<td>Raid类型:</td>' +
			                          '<td>'+ response["detail"]["raid"] +'</td>' +			                          
			                        '</tr>' +		
			                        '<tr>' +
			                          '<td>出口线路 :</td>' +
			                          '<td>'+ response["detail"]["line"] +'</td>' +
			                          '<td>内存容量 (GB): </td>' +
			                          '<td>'+ response["detail"]["ram_total"] +'</td>' +			                          
			                        '</tr>' +	
			                        '<tr>' +
			                          '<td>Swap容量:</td>' +
			                          '<td>'+ response["detail"]["swap"] +'</td>' +
			                          '<td>Selinux : </td>' +
			                          '<td>'+ response["detail"]["selinux"] +'</td>' +			                          
			                        '</tr>' +				                        
			                      '</tbody>' +
			                    '</table>' +							
							'</div>' +
						  '</div>' +
						'</li>';            			
            		}
            		if (Object.keys(response["networkcard"]).length > 0){
            			var trTags = '';
						for (var i=0; i <response["networkcard"].length; i++){
		                      if (response["networkcard"][i]["active"]>0){
		                    	  status = '<td><span class="label label-success">on</span></td>' 
		                      }else{
		                    	  status = '<td><span class="label label-danger">off</span></td>'  
		                      }								
							trTags = trTags + '<tr>' +
					                          '<td>'+ response["networkcard"][i]["device"] +'</td>' +
					                          '<td>'+ response["networkcard"][i]["macaddress"]+'</td>' +	
						                      '<td>'+ response["networkcard"][i]["ip"] +'</td>' +
						                      '<td>'+ response["networkcard"][i]["module"]+'</td>' +			
						                      '<td>'+ response["networkcard"][i]["mtu"]+'</td>' +
						                       status +
					                        '</tr>';
						};              			
            			netcardLiTags = '<li>' +
						  '<div class="block">' +
							'<div class="tags">' +
							  '<a href="" class="tag">' +
								'<span>网卡信息</span>' +
							  '</a>' +
							'</div>' +
							'<div class="block_content">' +
			                    '<table class="table table-striped">' +		                
			                      '<tbody>' +
			                        '<tr>' +
			                          '<td>Name</td>' +
			                          '<td>MAC</td>' +	
				                      '<td>IPV4</td>' +
				                      '<td>Speed</td>' +			
				                      '<td>MTU</td>' +				
				                      '<td>Status</td>' +			                        	
			                        '</tr>' + trTags +		                        
			                      '</tbody>' +
			                    '</table>' +							
							'</div>' +
						  '</div>' +
						'</li>';               			
						
            		}
            		if (Object.keys(response["ram"]).length > 0){
            			var trTags = '';
						for (var i=0; i <response["ram"].length; i++){
		                      if (response["ram"][i]["device_status"]>0){
		                    	  status = '<td><span class="label label-success">on</span></td>' 
		                      }else{
		                    	  status = '<td><span class="label label-danger">off</span></td>'  
		                      }								
							trTags = trTags + '<tr>' +
					                          '<td>'+ response["ram"][i]["device_model"] +'</td>' +
					                          '<td>'+ response["ram"][i]["device_volume"]+'</td>' +	
						                      '<td>'+ response["ram"][i]["device_brand"] +'</td>' +
						                      '<td>'+ response["ram"][i]["device_slot"]+'</td>' +			
						                       status +
					                        '</tr>';
						};              			
            			ramLiTags = '<li>' +
									  '<div class="block">' +
										'<div class="tags">' +
										  '<a href="" class="tag">' +
											'<span>内存明细</span>' +
										  '</a>' +
										'</div>' +
										'<div class="block_content">' +
						                    '<table class="table table-striped">' +		                
						                      '<tbody>' +
						                        '<tr>' +
						                          '<td>内存型号</td>' +
						                          '<td>内存容量(GB)</td>' +	
							                      '<td>生产商</td>' +
							                      '<td>Slot</td>' +					
							                      '<td>Status</td>' +			                        	
						                        '</tr>' + trTags +		                        
						                      '</tbody>' +
						                    '</table>' +							
										'</div>' +
									  '</div>' +
									'</li>';               			
						
            		}   
            		if (Object.keys(response["disk"]).length > 0){
            			var trTags = '';
						for (var i=0; i <response["disk"].length; i++){
		                      if (response["disk"][i]["device_status"]>0){
		                    	  status = '<td><span class="label label-success">on</span></td>' 
		                      }else{
		                    	  status = '<td><span class="label label-danger">off</span></td>'  
		                      }								
							trTags = trTags + '<tr>' +
					                          '<td>'+ response["disk"][i]["device_model"] +'</td>' +
					                          '<td>'+ response["disk"][i]["device_volume"]+'</td>' +	
					                          '<td>'+ response["disk"][i]["device_serial"] +'</td>' +
						                      '<td>'+ response["disk"][i]["device_brand"] +'</td>' +
						                      '<td>'+ response["disk"][i]["device_slot"]+'</td>' +			
						                       status +
					                        '</tr>';
						};              			
            			diskLiTags = '<li>' +
									  '<div class="block">' +
										'<div class="tags">' +
										  '<a href="" class="tag">' +
											'<span>硬盘明细</span>' +
										  '</a>' +
										'</div>' +
										'<div class="block_content">' +
						                    '<table class="table table-striped">' +		                
						                      '<tbody>' +
						                        '<tr>' +
						                          '<td>硬盘型号</td>' +
						                          '<td>硬盘容量</td>' +	
						                          '<td>序列号</td>' +	
							                      '<td>生产商</td>' +
							                      '<td>Slot</td>' +					
							                      '<td>Status</td>' +			                        	
						                        '</tr>' + trTags +		                        
						                      '</tbody>' +
						                    '</table>' +							
										'</div>' +
									  '</div>' +
									'</li>';               			
						
            		}            		
            		$("#assets_info").html(ulTag + baseLiTags + serverLiTags + netcardLiTags + ramLiTags + diskLiTags + '</ul>');	
            	}
            }  
    	});    	
		$(this).attr('disabled',false);
	});	

  
  	  
	function oBtProjectSelect(){
		   $('#business option:selected').empty();
		   var dbId = $('#project option:selected').val();
		   if ( dbId.length > 0){	 
				$.ajax({
					dataType: "JSON",
					url:'/api/project/'+ dbId + '/', //请求地址
					type:"GET",  //提交类似
					success:function(response){
						$("#business").empty();
						var binlogHtml = '<select class="form-control" name="business" id="business" required="required">'
						var selectHtml = '';
						for (var i=0; i <response["service_assets"].length; i++){
							 selectHtml += '<option name="asset_business" value="'+ response["service_assets"][i]["id"] +'">' + response["service_assets"][i]["service_name"] + '</option>' 
						};                        
						binlogHtml =  binlogHtml + selectHtml + '</select>';
						$("#business").html(binlogHtml);	
							
					},
				});	
		   };
	
	}  
	
	function oBtAuthType() {
		   var obj = document.getElementById("auth_type_select"); 
		   var index = obj.selectedIndex;
		   var value = obj.options[index].value; 
		   if (value=="0"){
			   document.getElementById("auth_accout_select").style.display = ""; 
			   document.getElementById("auth_keyfile_select").style.display = "none";
		   }
		   else {
			   document.getElementById("auth_accout_select").style.display = "none";	
			   document.getElementById("auth_keyfile_select").style.display = "";
		   }
	}	

	function getFormData (form, filler) {
		var assets = {};
		var server = {};
		var net = {};
		for (var i = 0; i < form.length; ++i) {
			var name = form[i].name;
			var value = form[i].value;
			if (name.length == 0)
				continue;
			try {
				value  = value.replace(/\n/g,'<br/>');
			}catch (e) {
				alert(e);
			}			
			if (value.length == 0) {
				if ((typeof filler != 'string') || (filler.length == 0))
					continue;
				else
					value = filler;
			}
			let assetStart = name.indexOf("asset_");
			let serverStart = name.indexOf("server_");
			let netStart = name.indexOf("net_");
			if (assetStart==0){
				var asz = "assets."+name.replace("asset_","")+" = '" + value + "'";
				try {
					eval(asz);
				} catch (e) {
					alert(e);
				}
			}
			else if(serverStart==0){
				var ssz = "server."+name.replace("server_","")+" = '" + value + "'";
				try {					
					eval(ssz);
				} catch (e) {
					alert(e);
				}
			}			
			else if(netStart==0){
				var nsz = "net."+name.replace("net_","")+" = '" + value + "'";
				try {					
					eval(nsz);
				} catch (e) {
					alert(e);
				}
			}
			else if(netStart==0){
				var nsz = "net."+name.replace("net_","")+" = '" + value + "'";
				try {
					eval(nsz);
				} catch (e) {
					alert(e);
				}
			}
			
		}
		if (assets.assets_type == "server" || assets.assets_type=="vmser"){
			server.assets = assets;
			return server;		
		}
		else {
			net.assets = assets;
			return net;
		}
	}	
	
	 var assets = ['asset_name'];
	 $("#assets_type_select").change(function(){
		   var obj = document.getElementById("assets_type_select"); 
		   var index = obj.selectedIndex;
		   var value = obj.options[index].value; 
		   if (value=="server"){
			   document.getElementById("asset_net_chioce").style.display = "none";
			   document.getElementById("asset_server_chioce").style.display = "";  
			   document.getElementById("asset_server_common_div").style.display = "";
			   document.getElementById("asset_net_common_div").style.display = "none";
			   document.getElementById("asset_vmserver_chioce").style.display = "";	
			   document.getElementById("asset_common_chioce").style.display = "";
//			   assets = ['asset_assets_type','asset_name','asset_sn','asset_expire_date','asset_buy_time','asset_buy_user','asset_management_ip','asset_manufacturer','asset_provider','asset_model','asset_status','asset_idc','asset_group','asset_business','asset_cabinet','asset_project'];
		   }
		   else if (value=="vmser"){
			   document.getElementById("asset_server_chioce").style.display = ""; 
			   document.getElementById("asset_server_common_div").style.display = "";
			   document.getElementById("asset_net_common_div").style.display = "none";			   			   
			   document.getElementById("asset_net_chioce").style.display = "none";		
			   document.getElementById("asset_vmserver_chioce").style.display = "none";
			   document.getElementById("asset_common_chioce").style.display = "";
//			   assets = ['asset_assets_type','asset_name','asset_status','asset_idc','asset_group','asset_business','asset_cabinet'];
		   }		   
 		   else {
			   document.getElementById("asset_net_chioce").style.display = "";
			   document.getElementById("asset_net_common_div").style.display = "";
			   document.getElementById("asset_server_common_div").style.display = "none";
			   document.getElementById("asset_server_chioce").style.display = "none";	
			   document.getElementById("asset_vmserver_chioce").style.display = "none";	
			   document.getElementById("asset_common_chioce").style.display = "";
//			   assets = ['asset_assets_type','asset_name','asset_sn','asset_expire_date','asset_buy_time','asset_buy_user','asset_management_ip','asset_manufacturer','asset_provider','asset_model','asset_status','asset_idc','asset_group','asset_business','asset_project','asset_cabinet'];
		   }			 
	 });	
	
	 $("#asset_put_zone").change(function(){
		   $('#asset_idc option:selected').empty();
		   $('#asset_cabinet option:selected').empty();
		   var dbId = $('#asset_put_zone option:selected').val();
		   if ( dbId.length > 0){	 
				$.ajax({
					dataType: "JSON",
					url:'/api/zone/'+ dbId + '/', //请求地址
					type:"GET",  //提交类似
					success:function(response){
						var idcHtml = '<select class="form-control" name="asset_idc" id="asset_idc">'
						var selectHtml = '';
						for (var i=0; i <response["idc_assets"].length; i++){
							selectHtml += '<option name="asset_idc" value="'+ response["idc_assets"][i]["id"] +'">' +  response["idc_assets"][i]["idc_name"] + '</option>' 
						};                        
						idcHtml =  idcHtml + selectHtml + '</select>';
						$("#asset_idc").html(idcHtml)
					}
				});	
		   };
		
	});  	
	
	 $("#asset_idc").change(function(){
		   $('#asset_cabinet option:selected').empty();
		   var dbId = $('#asset_idc option:selected').val();
		   if ( dbId.length > 0){	 
				$.ajax({
					dataType: "JSON",
					url:'/api/idc/'+ dbId + '/', //请求地址
					type:"GET",  //提交类似
					success:function(response){
						var cabinetHtml = '<select class="form-control" name="asset_cabinet" id="asset_cabinet">'
						var selectHtml = '';
						for (var i=0; i <response["cabinet_assets"].length; i++){
							selectHtml += '<option name="asset_idc" value="'+ response["cabinet_assets"][i]["id"] +'">' +  response["cabinet_assets"][i]["cabinet_name"] + '</option>' 
						};                        
						cabinetHtml =  cabinetHtml + selectHtml + '</select>';
						$("#asset_cabinet").html(cabinetHtml)
							
					},
				});	
		   };
		
	}); 	

	function addAssetsData(obj) {
		var form = document.getElementById('addAssets');
		for (var i = 0; i < form.length; ++i) {
			var name = form[i].name;
			var value = form[i].value;
			var assetStart = name.indexOf("asset_");
			if (assetStart==0 && value.length == 0 && assets.indexOf(name)>=0 ){
				$("[name='"+ name +"']").parent().addClass("has-error");
            	new PNotify({
                    title: 'Warning!',
                    text: '请注意必填项不能为空~',
                    type: 'warning',
                    styling: 'bootstrap3'
                }); 				
				return false;
			}		
		};
		var asset_data = getFormData(document.getElementById('addAssets'),''); 
		var btnObj = $(obj);
		if (asset_data.assets.assets_type=="server" || asset_data.assets.assets_type=="vmser"){
			var putUrl = '/api/server/';
		}
		else {
			var putUrl = '/api/net/';
		}
		$.ajax({
			dataType: "JSON",
			url:putUrl, //请求地址
			type:"POST",  //提交类似
			contentType: "application/json",
			data: JSON.stringify({
				'data':asset_data
			}),  //提交参数
			success:function(response){
            	new PNotify({
                    title: 'Success!',
                    text: '资产添加成功',
                    type: 'success',
                    styling: 'bootstrap3'
                }); 
				
			},
	    	error:function(response){
            	new PNotify({
                    title: 'Ops Failed!',
                    text: response.responseText,
                    type: 'error',
                    styling: 'bootstrap3'
                }); 				
	    	}
		})	
	}		  


	function format (data) {
	    var astHtml = '';
	    if (data['assets_type'] == "物理机" || data['assets_type'] == "虚拟机"){
	    	astHtml = '<tr><td class="col-md-1 col-sm-12 col-xs-12">CPU型号:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['cpu'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">CPU个数:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['vcpu_number'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">硬盘容量:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['disk_total'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">内存容量:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['ram_total'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">操作系统:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['system'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">内核版本:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['kernel'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">主机名:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['hostname'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">资产备注:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['mark'] +'</td></tr>' 
	    }else{
	    	astHtml = '<tr><td class="col-md-1 col-sm-12 col-xs-12">CPU型号:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['cpu'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">内存容量:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['ram_total'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">背板带宽:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['bandwidth'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">端口总数:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['port_number'] +'</td></tr>' + 
	    			 '<tr><td class="col-md-1 col-sm-12 col-xs-12">资产备注:</td><td class="col-md-1 col-sm-12 col-xs-12">'+ data['detail']['mark'] +'</td></tr>'	    	
	    }
		var nktTrHtml = '';
	    if (data["networkcard"].length){
	    	var nktTdHtml = '';
			for (var i=0; i <data["networkcard"].length; i++){	
				if ( data["networkcard"][i]["active"]=="1"){
					var status = '<span class="label label-success">on</span>' 
				}else{
					var status = '<span class="label label-danger">off</span>'
				}
				nktTdHtml += '</tr>' + 
							 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["device"] +'</td>'+ 
						  	 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["macaddress"] +'</td>' +
						  	 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["ip"] +'</td>' +
						  	 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["module"] +'</td>' +
						  	 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["mtu"] +'</td>' +
						   	 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ status +'</td>' +
						   	 '</tr>'
			};	   
			nktTrHtml += nktTrHtml + nktTdHtml 
	    }
	    var businessTrHtml = ''
	    if (data["business"].length){
	    	var bussTdHtml = '';
			for (var i=0; i <data["business"].length; i++){	
				bussTdHtml += '</tr>' + 
							 	'<td class="col-md-1 col-sm-12 col-xs-12">关联业务线:</td>'+ 
						  	 	'<td class="col-md-1 col-sm-12 col-xs-12">'+ data["business"][i] +'</td>' +
						   	 '</tr>'
			};	   
			businessTrHtml += businessTrHtml + bussTdHtml 
	    }	    	    
	    var diskTrHtml = '';
	    if (data["disk"].length){
	    	var diskTdHtml = '';
			for (var i=0; i <data["disk"].length; i++){	
				if ( data["disk"][i]["active"]=="1"){
					var status = '<span class="label label-success">on</span>' 
				}else{
					var status = '<span class="label label-danger">off</span>'
				}
				diskTdHtml += '</tr>' + 
							 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["device_volume"] +'</td>'+ 
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["device_model"] +'</td>' +
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["device_brand"] +'</td>' +
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["device_serial"] +'</td>' +
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["networkcard"][i]["device_slot"] +'</td>' +
						   	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ status +'</td>' +
						   	 '</tr>'
			};	   
			diskTrHtml += diskTrHtml + diskTdHtml 
	    }	  
	    var ramTrHtml = '';
	    if (data["ram"].length){
	    	var ramTdHtml = '';
			for (var i=0; i <data["ram"].length; i++){	
				if ( data["ram"][i]["active"]=="1"){
					var status = '<span class="label label-success">on</span>' 
				}else{
					var status = '<span class="label label-danger">off</span>'
				}
				ramTdHtml += '</tr>' + 
							 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["ram"][i]["device_model"] +'</td>'+ 
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["ram"][i]["device_volume"] +'</td>' +
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["ram"][i]["device_brand"] +'</td>' +
						  	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ data["ram"][i]["device_slot"] +'</td>' +
						   	 '<td class="col-md-1 col-sm-12 col-xs-12">'+ status +'</td>' +
						   	 '</tr>'
			};	   
			ramTrHtml += ramTrHtml + ramTdHtml 
	    }		    
	    
		var netcardHtml = '<legend>网卡信息</legend>' +
		    					'<table class="table table-striped" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+ 
		    						'<tr>' +
		    							'<th>Name</th>' +
		    							'<th>MAC</th>' +
		    							'<th>IPV4</th>' +
		    							'<th>Speed</th>' +
		    							'<th>MTU</th>' +
		    							'<th>Status</th>' +
		    						'</tr>' + nktTrHtml  +
		    					'</table>'
			
 	    var astHtml = '<div class="col-md-6 col-sm-12 col-xs-12">' +
		    			'<legend>硬件信息</legend>' +
		    				'<table class="table table-striped" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+ 
		    				 astHtml  +
		    				'</table>' +
					  '</div>'; 	
					
		var businessHtml = '<legend>业务线信息</legend>' +
			    				'<table class="table table-striped" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+ 
									businessTrHtml +
			    				'</table>'								
		var diskHtml = '<legend>磁盘信息</legend>' +
		    					'<table class="table table-striped" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+ 
		    						'<tr>' +
		    							'<th>硬盘容量</th>' +
		    							'<th>硬盘状态</th>' +
		    							'<th>硬盘型号</th>' +
		    							'<th>硬盘生产商</th>' +
		    							'<th>硬盘序列号</th>' +
		    							'<th>硬盘插槽</th>' +
		    						'</tr>' + diskTrHtml  +
		    					'</table>'	
		var ramHtml = '<legend>内存信息</legend>' +
		    					'<table class="table table-striped" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+ 
		    						'<tr>' +
		    							'<th>内存型号</th>' +
		    							'<th>内存容量</th>' +
		    							'<th>内存生产商</th>' +
		    							'<th>内存插槽</th>' +
		    							'<th>内存状态</th>' +
		    						'</tr>' + ramTrHtml  +
		    					'</table>'			    						
	    return '<div class="col-md-6 col-sm-12 col-xs-12">'+ businessHtml + diskHtml + ramHtml + netcardHtml + '</div>' + astHtml;
	}		
    

	function modfAssetsData(obj,id,mode) {
		var form = document.getElementById('modfAssets');
		for (var i = 0; i < form.length; ++i) {
			var name = form[i].name;
			var value = form[i].value;
			var assetStart = name.indexOf("asset_");
			if (assetStart==0 && value.length == 0 && assets.indexOf(name)>=0 ){
				$("[name='"+ name +"']").parent().addClass("has-error");
            	new PNotify({
                    title: 'Warning!',
                    text: '请注意必填项不能为空~',
                    type: 'warning',
                    styling: 'bootstrap3'
                }); 				
				return false;
			}else if (assetStart==0 && value.length > 0 ){
				$("[name='"+ name +"']").parent().removeClass("has-error");
			}
			
		};
		var asset_data = getFormData(document.getElementById('modfAssets'),''); 
		var btnObj = $(obj);
		if (mode =="server" || mode=="vmser"){
			var putUrl = '/api/server/' + id + '/';
		}
		else {
			var putUrl = '/api/net/' + id + '/';
		}
		$.ajax({
			dataType: "JSON",
			url:putUrl, //请求地址
			type:"PUT",  //提交类似
			contentType: "application/json",
			data: JSON.stringify({
				'data':asset_data
			}),  //提交参数
			success:function(response){
            	new PNotify({
                    title: 'Success!',
                    text: '资产修改成功',
                    type: 'success',
                    styling: 'bootstrap3'
                }); 
				
			},
	    	error:function(response){
            	new PNotify({
                    title: 'Ops Failed!',
                    text: response.responseText,
                    type: 'error',
                    styling: 'bootstrap3'
                }); 				
	    	}
		})	
	}	
	
	
    var curpage = 1;
    $(document).ready(function () {       
        $('#more_search_click').click(function(){//点击a标签  
            if($('#more_search').is(':hidden')){
            	$('#more_search').show();
            }
            else{
            	$('#more_search').hide();
            }  
        });  
        //业务类型
        $('#selBusiness').change(function () {
            if ($('#selBusiness').val() != "") {
                $("#hdnBusiness").val($('#selBusiness').val());
                var span = "<span class='tag' id='spanBusiness'>" + $("#selBusiness").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='business' type='hidden' value='"
                + $('#selBusiness').val() + "'/></span> &nbsp;";
                if ($("#spanBusiness").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                    
                }
                else {
                    $("#spanBusiness").html($("#selBusiness").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='business' type='hidden' value='"
                     + $('#selBusiness').val() + "'/></span> &nbsp;");
                }
                changepage(1);
            }
        })   
        
		//设备状态
        $('#selStatus').change(function () {
            if ($('#selStatus').val() != "") {
                $("#hdnStatus").val($('#selStatus').val());
                var span = "<span class='tag' id='spanStatus'>" + $("#selStatus").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='status' type='hidden' value='"
                + $('#selStatus').val() + "'/></span> &nbsp;";
                if ($("#spanStatus").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanStatus").html($("#selStatus").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='status' type='hidden' value='"
                     + $('#selStatus').val() + "'/></span> &nbsp;");
                }
                changepage(1);
            }
        })  
        
		//所属项目
        $('#selTags').change(function () {
            if ($('#selTags').val() != "") {
                $("#hdnTags").val($('#selTags').val());
                var span = "<span class='tag' id='spanTags'>" + $("#selTags").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='tags' type='hidden' value='"
                + $('#selTags').val() + "'/></span> &nbsp;";
                if ($("#spanTags").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanTags").html($("#selTags").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='tags' type='hidden' value='"
                     + $('#selTags').val() + "'/></span> &nbsp;");
                }
                changepage(1);
            }
        })        
        
        //ip地址
        $('#ip').change(function () {
            if ($('#ip').val() != "") {
                var span = "<span class='tag' id='spanIp'>" + $("#ip").val()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='ip' type='hidden' value='"
                + $('#ip').val() + "'/></span> &nbsp;";
                if ($("#spanIp").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanIp").html($("#ip").val()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='ip' type='hidden' value='"
                     + $('#ip').val() + "'/></span> &nbsp;");
                }
                changepage(1);
            }
        })             
        
		//机房类型
        $('#selIdc').change(function () {
            if ($('#selIdc').val() != "") {
                $("#hdnZone").val($('#selIdc').val());
                var span = "<span class='tag' id='spanIdc'>" + $("#selIdc").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='idc' type='hidden' value='"
                + $('#selIdc').val() + "'/></span> &nbsp;";
                if ($("#spanIdc").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanIdc").html($("#selIdc").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='idc' type='hidden' value='"
                     + $('#selIdc').val() + "'/></span> &nbsp;");
                }
                changepage(1);
            }
        })   
        
		//使用组
        $('#selGroup').change(function () {
            if ($('#selGroup').val() != "") {
                $("#hdnGroup").val($('#selGroup').val());
                var span = "<span class='tag' id='spanGroup'>" + $("#selGroup").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='group' type='hidden' value='"
                + $('#selGroup').val() + "'/></span> &nbsp;";
                if ($("#spanGroup").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanGroup").html($("#selGroup").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x</a><input name='group' type='hidden' value='"
                     + $('#selGroup').val() + "'/></span> &nbsp;");
                }
                changepage(1);
            }
        })  
        
		//设备类型
        $('#selAssetsType').change(function () {
            if ($('#selAssetsType').val() != "") {
                $("#hdnAssetsType").val($('#selAssetsType').val());
                var span = "<span class='tag' id='spanAssetsType'>" + $("#selAssetsType").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='assets_type' type='hidden' value='"
                + $('#selAssetsType').val() + "' /></span> &nbsp;";
                if ($("#spanAssetsType").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanAssetsType").html($("#selAssetsType").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='assets_type' type='hidden' value='"
                     + $('#selAssetsType').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        }) 
		//生产制造商
        $('#selManufacturer').change(function () {
            if ($('#selManufacturer').val() != "") {
                $("#hdnManufacturer").val($('#selManufacturer').val());
                var span = "<span class='tag' id='spanManufacturer'>" + $("#selManufacturer").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='manufacturer' type='hidden' value='"
                + $('#selManufacturer').val() + "' /></span> &nbsp;";
                if ($("#spanManufacturer").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanManufacturer").html($("#selManufacturer").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='manufacturer' type='hidden' value='"
                     + $('#selManufacturer').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })         
        
        //供货商
        $('#selProvider').change(function () {
            if ($('#selProvider').val() != "") {
                $("#hdnProvider").val($('#selProvider').val());
                var span = "<span class='tag' id='spanProvider'>" + $("#selProvider").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='provider' type='hidden' value='"
                + $('#selProvider').val() + "' /></span> &nbsp;";
                if ($("#spanProvider").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanProvider").html($("#selProvider").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='provider' type='hidden' value='"
                     + $('#selProvider').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })         

        //设备类型
        $('#selModel').change(function () {
            if ($('#selModel').val() != "") {
                $("#hdnModel").val($('#selModel').val());
                var span = "<span class='tag' id='spanModel'>" + $("#selModel").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='model' type='hidden' value='"
                + $('#selModel').val() + "' /></span> &nbsp;";
                if ($("#spanModel").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanModel").html($("#selModel").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='model' type='hidden' value='"
                     + $('#selModel').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })         
        
        //Raid类型
        $('#selRaid').change(function () {
            if ($('#selRaid').val() != "") {
                $("#hdnRaid").val($('#selRaid').val());
                var span = "<span class='tag' id='spanRaid'>" + $("#selRaid").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='raid' type='hidden' value='"
                + $('#selRaid').val() + "' /></span> &nbsp;";
                if ($("#spanRaid").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanRaid").html($("#selRaid").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='raid' type='hidden' value='"
                     + $('#selRaid').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })  
        
        //CPU
        $('#selCpu').change(function () {
            if ($('#selCpu').val() != "") {
                $("#hdnCpu").val($('#selCpu').val());
                var span = "<span class='tag' id='spanCpu'>" + $("#selCpu").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='cpu' type='hidden' value='"
                + $('#selCpu').val() + "' /></span> &nbsp;";
                if ($("#spanCpu").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanCpu").html($("#selCpu").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='cpu' type='hidden' value='"
                     + $('#selCpu').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        }) 
        
		//购买人
        $('#selBuyUser').change(function () {
            if ($('#selBuyUser').val() != "") {
                $("#hdnBuyUser").val($('#selBuyUser').val());
                var span = "<span class='tag' id='spanBuyUser'>" + $("#selBuyUser").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='buy_user' type='hidden' value='"
                + $('#selBuyUser').val() + "' /></span> &nbsp;";
                if ($("#spanBuyUser").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanBuyUser").html($("#selBuyUser").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='buy_user' type='hidden' value='"
                     + $('#selBuyUser').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        }) 
        
		//线路类型
        $('#selLine').change(function () {
            if ($('#selLine').val() != "") {
                $("#hdnLine").val($('#selLine').val());
                var span = "<span class='tag' id='spanLine'>" + $("#selLine").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='line' type='hidden' value='"
                + $('#selLine').val() + "' /></span> &nbsp;";
                if ($("#spanLine").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanLine").html($("#selLine").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='line' type='hidden' value='"
                     + $('#selLine').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        }) 
        //系统类型
        $('#selSystem').change(function () {
            if ($('#selSystem').val() != "") {
                $("#hdnSystem").val($('#selSystem').val());
                var span = "<span class='tag' id='spanSystem'>" + $("#selSystem").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='system' type='hidden' value='"
                + $('#selSystem').val() + "' /></span> &nbsp;";
                if ($("#spanSystem").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanSystem").html($("#selSystem").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='system' type='hidden' value='"
                     + $('#selSystem').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })         
        
		//内核版本
        $('#selKernel').change(function () {
            if ($('#selKernel').val() != "") {
                $("#hdnKernel").val($('#selKernel').val());
                var span = "<span class='tag' id='spanKernel'>" + $("#selKernel").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='kernel' type='hidden' value='"
                + $('#selKernel').val() + "' /></span> &nbsp;";
                if ($("#spanKernel").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanKernel").html($("#selKernel").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='kernel' type='hidden' value='"
                     + $('#selKernel').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })
        
        //机柜类型
        $('#selCabinet').change(function () {
            if ($('#selCabinet').val() != "") {
                $("#hdnCabinet").val($('#selCabinet').val());
                var span = "<span class='tag' id='spanCabinet'>" + $("#selCabinet").find("option:selected").text()
                + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='cabinet' type='hidden' value='"
                + $('#selCabinet').val() + "' /></span> &nbsp;";
                if ($("#spanCabinet").length == 0) {
                	$("#divSelectedType").show();
                    $('#divSelectedType').append(span);
                }
                else {
                    $("#spanCabinet").html($("#selCabinet").find("option:selected").text()
                     + "&nbsp;&nbsp;<a  title='Removing tag' onclick='removeself(this)'>x<input name='cabinet' type='hidden' value='"
                     + $('#selCabinet').val() + "' /></span> &nbsp;");
                }
                changepage(1);
            }
        })         
        
        //购买年份
        if ($("#buy_time-range").length){
            $("#buy_time-range").slider({
    		    range: "min",
    		    value: 0,
    		    min: 2000,
    		    max: 2030,
                values: [2017,2019],
                slide: function (event, ui) {
                    if (ui.values[0] != ui.values[1]) {
                        $("#buy_time").val("购买时间: " + ui.values[0] + " - " + ui.values[1] + "年");
                    }
                    else {
                        $("#buy_time").val("购买时间: " + ui.values[0] + "年");
                    }
                },
                change: function (event, ui) {
                    var span = "<span  class='tag' id='spanBuyTime'>购买年份：" + ui.values[0] + "-" + ui.values[1] +
                     "年 <a  title='Removing tag' onclick='removeself(this)'>x<input name='buy_time' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;";
                    if ($("#spanBuyTime").length == 0) {
                    	$("#divSelectedType").show();
                        $('#divSelectedType').append(span);
                    }
                    else {
                        $("#spanBuyTime").html("购买年份：" + ui.values[0] + "-" + ui.values[1] +
                         "年  <a  title='Removing tag'  onclick='removeself(this)'>x<input name='buy_time' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;");
                    }
                    changepage(1);
                }
            });  
            $("#buy_time").val($("#buy_time-range").slider("values", 0) + " - " + $("#buy_time-range").slider("values", 1) + "年");          	
        }
      
        //过保年份
        if ($("#buy_time-range").length){
            $("#expire_date-range").slider({
    		    range: "min",
    		    value: 2017,
    		    min: 2000,
    		    max: 2030,
                values: [2017,2019],
                slide: function (event, ui) {
                    if (ui.values[0] != ui.values[1]) {
                        $("#expire_date").val("过保年份: " + ui.values[0] + " - " + ui.values[1] + "年");
                    }
                    else {
                        $("#expire_date").val("过保年份: " + ui.values[0] + "年");
                    }
                },
                change: function (event, ui) {
                    var span = "<span  class='tag'  id='spanExpireDate'>过保年份：" + ui.values[0] + "-" + ui.values[1] +
                     "年  <a  title='Removing tag' onclick='removeself(this)'>x<input name='expire_date' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;";
                    if ($("#spanExpireDate").length == 0) {
                    	$("#divSelectedType").show();
                        $('#divSelectedType').append(span);
                    }
                    else {
                        $("#spanExpireDate").html("过保年份：" + ui.values[0] + "-" + ui.values[1] +
                         "年  <a  title='Removing tag'  onclick='removeself(this)'>x<input name='expire_date' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;");
                    }
                    changepage(1);
                }
            });
            $("#expire_date").val($("#expire_date-range").slider("values", 0) + " - " + $("#expire_date-range").slider("values", 1) + "年");          	
        }
        
        
        //内存区间
        if ($("#ram_total-range").length){
            $("#ram_total-range").slider({
    		    range: "min",
    		    value: 0,
    		    min: 1,
    		    max: 1024,
                values: [1, 128],
                slide: function (event, ui) {
                    if (ui.values[0] != ui.values[1]) {
                        $("#ram_total").val("内存区间: " +ui.values[0] + " - " + ui.values[1] + "GB");
                    }
                    else {
                        $("#ram_total").val("内存区间: " +ui.values[0] + "GB");
                    }
                },
                change: function (event, ui) {
                    var span = "<span class='tag' id='spanRamTotal'>内存区间：" + ui.values[0] + "-" + ui.values[1] +
                     "GB <a  title='Removing tag'  onclick='removeself(this)'>x<input name='ram_total' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;";
                    if ($("#spanRamTotal").length == 0) {
                    	$("#divSelectedType").show();
                        $('#divSelectedType').append(span);
                    }
                    else {
                        $("#spanRamTotal").html("内存区间：" + ui.values[0] + "-" + ui.values[1] +
                         "GB <a  title='Removing tag'  onclick='removeself(this)'>x<input name='ram_total' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;");
                    }
                    changepage(1);
                }
            });
            $("#ram_total").val($("#ram_total-range").slider("values", 0) + " - " + $("#ram_total-range").slider("values", 1) + "GB");          	
        }

        
        //disk_total区间
        if($("#disk_total-range").length){
            $("#disk_total-range").slider({
    		    range: "min",
    		    value: 0,
    		    min: 10,
    		    max: 4096,
                values: [20, 120],
                slide: function (event, ui) {
                    if (ui.values[0] != ui.values[1]) {
                        $("#disk_total").val("硬盘区间：" + ui.values[0] + " - " + ui.values[1] + "GB");
                    }
                    else {
                        $("#disk_total").val("硬盘区间：" + ui.values[0] + "GB");
                    }
                },
                change: function (event, ui) {
                    var span = "<span class='tag' id='spanDiskTotal'>硬盘区间：" + ui.values[0] + "-" + ui.values[1] +
                     "GB <a  title='Removing tag' onclick='removeself(this)'>x<input name='disk_total' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;";
                    if ($("#spanDiskTotal").length == 0) {
                    	$("#divSelectedType").show();
                        $('#divSelectedType').append(span);
                    }
                    else {
                        $("#spanDiskTotal").html("硬盘区间：" + ui.values[0] + "-" + ui.values[1] +
                         "GB <a  title='Removing tag' onclick='removeself(this)'>x<input name='disk_total' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;");
                    }
                    changepage(1);
                }
            });
            $("#disk_total").val($("#disk_total-range").slider("values", 0) + " - " + $("#disk_total-range").slider("values", 1) + "GB");         	
        }

        
        //物理CPU个数区间
        if($("#cpu_number-range").length){
            $("#cpu_number-range").slider({
    		    range: "min",
    		    value: 0,
    		    min: 1,
    		    max: 10,
                values: [1, 10],
                slide: function (event, ui) {
                    if (ui.values[0] != ui.values[1]) {
                        $("#cpu_number").val("物理CPU: " + ui.values[0] + " - " + ui.values[1] + "颗");
                    }
                    else {
                        $("#cpu_number").val("物理CPU: " +ui.values[0] + "颗");
                    }
                },
                change: function (event, ui) {
                    var span = "<span class='tag' id='spanCpuNmuber'>物理CPU个数：" + ui.values[0] + "-" + ui.values[1] +
                     "颗  <a  title='Removing tag' onclick='removeself(this)'>x<input name='cpu_number' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;";
                    if ($("#spanCpuNmuber").length == 0) {
                    	$("#divSelectedType").show();
                        $('#divSelectedType').append(span);
                    }
                    else {
                        $("#spanCpuNmuber").html("物理CPU个数" + ui.values[0] + "-" + ui.values[1] +
                         "颗   <a  title='Removing tag' onclick='removeself(this)'>x<input name='cpu_number' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;");
                    }
                    changepage(1);
                }
            });
            $("#cpu_number").val($("#cpu_number-range").slider("values", 0) +
    		" - " + $("#cpu_number-range").slider("values", 1) + "颗");          	
        }
      
        
        //逻辑CPU个数区间
        if($("#vcpu_number-range").length){
            $("#vcpu_number-range").slider({
    		    range: "min",
    		    value: 0,
    		    min: 1,
    		    max: 100,
                values: [1, 10],
                slide: function (event, ui) {
                    if (ui.values[0] != ui.values[1]) {
                        $("#vcpu_number").val("逻辑CPU个数：" + ui.values[0] + " - " + ui.values[1] + "颗");
                    }
                    else {
                        $("#vcpu_number").val("逻辑CPU个数：" + ui.values[0] + "颗");
                    }
                },
                change: function (event, ui) {
                    var span = "<span class='tag' id='spanVcpuNmuber'>逻辑CPU个数：" + ui.values[0] + "-" + ui.values[1] +
                     "颗  <a  title='Removing tag' onclick='removeself(this)'>x<input name='vcpu_number' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;";
                    if ($("#spanVcpuNmuber").length == 0) {
                    	$("#divSelectedType").show();
                        $('#divSelectedType').append(span);
                    }
                    else {
                        $("#spanVcpuNmuber").html("逻辑CPU个数：" + ui.values[0] + "-" + ui.values[1] +
                         "颗 <a  title='Removing tag' onclick='removeself(this)'>x<input name='vcpu_number' type='hidden' value='"
                     + ui.values[0] + "-" + ui.values[1] + "' /></span> &nbsp;");
                    }
                    changepage(1);
                }
            });
            $("#vcpu_number").val($("#vcpu_number-range").slider("values", 0) +
    		" - " + $("#vcpu_number-range").slider("values", 1) + "颗");        	
        }
               
    })

    function search_go() {
        var parameter = {};
        $("input[type='hidden']").each(function () {
            var key = $(this).prop('name');
            var value = $(this).val();
            if (key != "csrfmiddlewaretoken"){
            	parameter[key] = value;
            }  
        })

        var count = 0;
        for (var i in parameter) {
            count += i;
            break;
        }
        if (count == 0) {
            return false;
        }

        $.post('/assets/search/', parameter, function (result) {
            if (result["data"].length > 0) {
/*                 	document.getElementById("div-search-result").style.display = ""; */
					 var table = $('#assetsListTable').dataTable();
					 oSettings = table.fnSettings();
					 table.fnClearTable(this);
					 for (var i=0; i<result["data"].length; i++)
					 {
					   table.oApi._fnAddData(oSettings, result["data"][i]);
					 }
					 oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
					 table.fnDraw();                	               	
            }
            else{
            	//没有数据就清空
            	var table = $('#assetsListTable').dataTable();
            	table.fnClearTable(this);
            }
        })
    }

    function changepage(pageindex) {
        curpage = pageindex;
        search_go();
    }

    function removeself(obj) {
        $(obj).parent().remove();
        changepage(1);
    }	
  
    
	var selectState = false;  
	function checkAllBox(){ 
	  	var qcheck=document.getElementsByName("ckbox");
	  	for (var i = 0; i < qcheck.length; i++)  
		  {  
		    var checkbox = qcheck[i];  
		    checkbox.checked = !selectState; 
		  }  
	  	selectState = !selectState; 
	}  
	$("#assetsImport").on("click", function(){
		$.confirm({
			title: '批量导入',
		    content: '跳转到用户中心->资产列表进行操作，是否跳转过去？',
		    type: 'blue',
		    buttons: {
		        yes: {
		            keys: ['y'],
		            btnClass: 'btn-blue',
		            action: function () {
		            	 window.location.href="/user/center/";
		            }
		        },
		        no: {
		            keys: ['N'],
		            action: function () {
		                return 
		            }
		        },
		    }
		});	
	})
	$("#assetsDumps").on("click", function(){
		$.alert({
		    title: '批量下载',
		    content: '跳转到用户中心->资产列表进行操作',
		    type: 'blue',
		    buttons: {
		        yes: {
		            keys: ['y'],
		            btnClass: 'btn-blue',
		            action: function () {
		            	 window.location.href="/user/center/";
		            }
		        },
		        no: {
		            keys: ['N'],
		            action: function () {
		                return 
		            }
		        },
		    }		    
		});			
	})	
	$("#assetsRefresh").on("click", function(){
		var btnObj = $(this);
		btnObj.attr('disabled',true);
		var serverId = [];
	  	var qcheck=document.getElementsByName("ckbox");
	  	for (var i = 0; i < qcheck.length; i++){  
	  		if(qcheck[i].checked==true){
	  			serverId.push(qcheck[i].value);
	  		}
		}
	  	if (serverId.length > 0){
			$.ajax({
				  type: 'POST',
				  url: '/assets/batch/',
				  dataType:"json",
				  data:{
					  'ids':serverId,
					  'model':'batch'
				  },
			      success:function(response){	
			    	var sip = '';
			    	var fip = '';
			    	var modal = '';
		    		for  (var i = 0; i < response['data']['success'].length; i++){
		    			 sip += response['data']['success'][i] + '<br>'
		    		}
		    		for  (var i = 0; i < response['data']['failed'].length; i++){
		    			 fip += response['data']['failed'][i] + '<br>'
		    		}	
		    		msg = '成功：'+ '<br>' + sip + '<br>' + '失败：'+ '<br>' + fip;	
 			    	if (response['code']==200){
 		            	new PNotify({
 		                    title: 'Success!',
 		                    text: msg,
 		                    type: 'success',
 		                    styling: 'bootstrap3',
 		                    delay: 18000
 		                }); 	
			    	}
			    	else{
		            	new PNotify({
		                    title: 'Ops Failed!',
		                    text: response["msg"],
		                    type: 'error',
		                    styling: 'bootstrap3',
		                    delay: 18000
		                }); 
			    	}
 			    	btnObj.removeAttr('disabled');		            
			      },
	              error:function(response){
	            	btnObj.removeAttr('disabled');
	            	new PNotify({
	                    title: 'Ops Failed!',
	                    text: '资产修改失败',
	                    type: 'error',
	                    styling: 'bootstrap3'
	                }); 
	              }
				});			
	  	}
	  	else{
        	new PNotify({
                title: 'Warning!',
                text: '请至少选择一个资产!',
                type: 'warning',
                styling: 'bootstrap3'
            }); 
        	$(this).removeAttr('disabled');
	  	}
	});	
	
	$("#assetsDelete").on("click", function(){
		var btnObj = $(this);
		btnObj.attr('disabled',true);
		var serverId = [];
	  	var qcheck=document.getElementsByName("ckbox");
	  	for (var i = 0; i < qcheck.length; i++){  
	  		if(qcheck[i].checked==true){
	  			serverId.push(qcheck[i].value);
	  		}
		}
	  	if (serverId.length > 0){
			$.ajax({
				  type: 'DELETE',
				  url: '/assets/batch/',
				  dataType:"json",
				  data:{
					  'assetsIds':serverId,
				  },
			      success:function(response){	
			    	var sip = '';
			    	var fip = '';
			    	var modal = '';
		    		for  (var i = 0; i < response['data']['success'].length; i++){
		    			 sip += response['data']['success'][i] + '<br>'
		    		}
		    		for  (var i = 0; i < response['data']['failed'].length; i++){
		    			 fip += response['data']['failed'][i] + '<br>'
		    		}	
		    		msg = '成功：'+ '<br>' + sip + '<br>' + '失败：'+ '<br>' + fip;	
 			    	if (response['code']==200){
 		            	new PNotify({
 		                    title: 'Success!',
 		                    text: msg,
 		                    type: 'success',
 		                    styling: 'bootstrap3',
 		                    delay: 18000
 		                }); 	
			    	}
			    	else{
		            	new PNotify({
		                    title: 'Ops Failed!',
		                    text: response["msg"],
		                    type: 'error',
		                    styling: 'bootstrap3',
		                    delay: 18000
		                }); 
			    	}
				    btnObj.removeAttr('disabled');		            
			      },
	              error:function(response){
	            	btnObj.removeAttr('disabled');
	            	new PNotify({
	                    title: 'Ops Failed!',
	                    text: '资产修改失败',
	                    type: 'error',
	                    styling: 'bootstrap3'
	                }); 
	              }
				});			
	  	}
	  	else{
        	new PNotify({
                title: 'Warning!',
                text: '请至少选择一个资产!',
                type: 'warning',
                styling: 'bootstrap3'
            }); 
	  		btnObj.removeAttr('disabled');
	  	}
	});	
	