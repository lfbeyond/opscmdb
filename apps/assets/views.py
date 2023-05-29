from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.generic import View
#from utils.base import method_decorator_adaptor
from .models import Assets,Card_Assets,Server_Assets
from django.contrib.auth.mixins import LoginRequiredMixin
from dao.assets import AssetsBase,AssetsSource
from django.http import JsonResponse

def index(request):
    return render(request, 'assets/assets_list.html')

class AssetsList(View):
    login_url = '/login/'  
    #@method_decorator_adaptor(permission_required, "asset.assets_read_assets","/403/")   
    def get(self, request, *args, **kwagrs): 
        return render(request, 'assets/assets_list.html')  
    

class AssetsSearch(View):  
    AssetFieldsList = [ n.name for n in Assets._meta.fields ]
    ServerAssetFieldsList = [ n.name for n in Server_Assets._meta.fields ]
    cardAssetFieldsList = [ n.name for n in Card_Assets._meta.fields ]

    def get(self, request, *args, **kwagrs):
        return render(request, 'assets/assets_search.html')
    
    def post(self, request, *args, **kwagrs):
        
        interDataList = []       
        data = dict()        
        tags = None


        for (k,v)  in request.POST.items() :
            if k == "tags": 
                tags = v
                continue
            if v is not None and v != u'':
                data[k] = v       
                print(data)         

        assetsList = []
        if "ip" in data.keys():
            id_list=[]
            dict_ip={}
            dict_ip["ip"]=data["ip"]
            for i in Server_Assets.objects.filter(**dict_ip):
                id_list.append(i.assets_id)

            for f in  Card_Assets.objects.filter(**dict_ip):
                id_list.append(f.assets_id)
            print(id_list)
            data.pop("ip")
            for assid in id_list:
                data["id"]=assid
                for ds in Assets.objects.filter(**data):
                    assetsList.append(ds)           
        else:
            for ds in Assets.objects.filter(**data):
                assetsList.append(ds)




        
        # if len(AssetIntersection) > 0 and len(ipIntersection)==0:
        #     
        #         assetsList.append(ds)
        # elif len(ipIntersection)>0 and len(AssetIntersection) > 0:
        #     for ds in Card_Assets.objects.filter(**ipIntersection):
        #         pass
                


            








        dataList = []
        
        tagsAssetsList = []

        if tags: 
            tagsAssetsList = [ t.aid for t in Tags_Server_Assets.objects.filter(tid=tags)]
            
            if assetsList and tagsAssetsList:
                
                interDataList = list(set(assetsList).intersection(set(tagsAssetsList)))
            
            elif len(data.keys()) > 0 and len(assetsList) == 0: 
                interDataList = [] 
                
            elif len(data.keys()) == 0  and tagsAssetsList: 
                interDataList = tagsAssetsList  
        else:
            interDataList = assetsList
        
        for a in interDataList:     
            dataList.append(a.to_json()) 
            
        print(dataList)    
        return JsonResponse({'msg':"数据查询成功","code":200,'data':dataList,'count':0})   
    

class AssetsManage(View,AssetsBase):
    login_url = '/login/'  
    
    #@method_decorator_adaptor(permission_required, "asset.assets_read_assets","/403/")   
    def get(self, request, *args, **kwagrs):
        if request.GET.get('id') and request.GET.get('model')=='edit':
            return render(request, 'assets/assets_modf.html',{"user":request.user,"assets":self.assets(id=request.GET.get('id')),"assetsBase":self.base()}) 
#         elif request.GET.get('id') and request.GET.get('model')=='info':
#             return JsonResponse({'msg':"主机查询成功","code":200,'data':self.info(request.GET.get('id'))})  
        print(self.base())
        return render(request, 'assets/assets_add.html',{"user":request.user,"assets":self.base()})    
