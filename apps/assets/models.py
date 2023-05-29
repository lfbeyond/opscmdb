from django.db import models
import django.utils.timezone as timezone
#from account.models import User,Structure
from datetime import datetime
from mptt.models import MPTTModel, TreeForeignKey
#from apps.pc_list.models import     Server_Assets,Idc_Assets,Cabinet_Assets,Status_Assent,Assets_type
#from dao.base import AESCharField


    
# class Zone_Assets(models.Model):  
#     zone_name = models.CharField(max_length=100,unique=True) 
#     '''自定义权限'''
#     class Meta:
#         db_table = 'apulis_zone_assets'
#         default_permissions = ()
#         permissions = (
#             ("assets_read_zone", "读取区域机房权限"),
#             ("assets_change_zone", "更改区域机房权限"),
#             ("assets_add_zone", "添加区域机房权限"),
#             ("assets_delete_zone", "删除区域机房权限"),             
#         )  
#         verbose_name = '资产管理'  
#          verbose_name_plural = '区域资产表' 

class Idc_Assets(models.Model):
    #zone = models.ForeignKey('Zone_Assets',related_name='idc_assets',on_delete=models.CASCADE)
    idc_name = models.CharField(max_length=32, verbose_name=u'机房名称')
    idc_bandwidth = models.CharField(max_length=32, blank=True, null=True, default='', verbose_name=u'机房带宽')
    idc_linkman = models.CharField(max_length=16, blank=True, null=True, default='', verbose_name=u'联系人')
    idc_phone = models.CharField(max_length=32, blank=True, null=True, default='', verbose_name=u'联系电话')
    idc_address = models.CharField(max_length=128, blank=True, null=True, default='', verbose_name=u"机房地址")
    idc_network = models.TextField(blank=True, null=True, default='', verbose_name=u"IP地址段")
    update_time = models.DateField(auto_now=True, null=True)
    idc_operator = models.CharField(max_length=32, blank=True, default='', null=True, verbose_name=u"运营商")
    idc_desc = models.CharField(max_length=128, blank=True, default='', null=True, verbose_name=u"备注")
    create_date = models.DateTimeField(default = timezone.now)
    update_date = models.DateTimeField(auto_now_add=True)
    '''自定义权限'''
    class Meta:
        db_table = 'apulis_idc_assets'
        default_permissions = ()
        verbose_name = '资产管理'  
        verbose_name_plural = '机房资产表'         

class Group_Assets(models.Model):
    #zone = models.ForeignKey('Zone_Assets',related_name='idc_assets',on_delete=models.CASCADE)
    group_name = models.CharField(max_length=32, verbose_name=u'组名')
    group_desc = models.CharField(max_length=128, blank=True, default='', null=True, verbose_name=u"备注")
    create_date = models.DateTimeField(default = timezone.now)
    update_date = models.DateTimeField(auto_now_add=True)
    '''自定义权限'''
    class Meta:
        db_table = 'apulis_group_assets'
        default_permissions = ()
        verbose_name = '资产管理'  
        verbose_name_plural = '项目组'  

class Cabinet_Assets(models.Model):
    cabinet_name= models.CharField(max_length=32, verbose_name=u'机架名称')
    idc=models.ForeignKey('Idc_Assets',on_delete=models.CASCADE)
    create_date = models.DateTimeField(default = timezone.now)
    update_date = models.DateTimeField(auto_now_add=True)    
    '''自定义权限'''
    class Meta:
        db_table = 'apulis_cabinet_assets'
        default_permissions = ()
        verbose_name = '资产管理'  
        verbose_name_plural = '机架' 


class Status_Assent(models.Model):
    status= models.CharField(max_length=32, verbose_name=u'状态名称')
    create_date = models.DateTimeField(default = timezone.now)
    update_date = models.DateTimeField(auto_now_add=True)    
    '''自定义权限'''
    class Meta:
        db_table = 'apulis_status_assets'
        default_permissions = ()
        verbose_name = '资产管理'  
        verbose_name_plural = '机架' 

# class Assets_type(models.Model):   
#     assets_type_choices = (
#                           ('server',u'物理机'),
#                           ('vmser',u'虚拟机'),
#                           ('switch',u'交换机'),
#                           ('route',u'路由器'),
#                           ('printer',u'打印机'),
#                           ('scanner',u'扫描仪'),
#                           ('firewall',u'防火墙'),
#                           ('storage',u'存储设备'),
#                           ('wifi',u'无线设备'),
#                           )
#     assets_type_dicts = {
#         "printer": "打印机",
#         "scanner": "ai卡",
#         "firewall": "防火墙",
#         "route": "路由器",
#         "wifi": "无线设备",
#         "storage": "存储设备",
#         "server": "物理机",
#         "switch": "交换机",
#         "vmser": "虚拟机"
#     }
#     assets_type = models.CharField(choices=assets_type_choices,max_length=100,default='server',verbose_name='资产类型')
#     create_date = models.DateTimeField(default = timezone.now)
#     update_date = models.DateTimeField(auto_now_add=True)    
#     class Meta:
#         db_table = 'apulis_assetstype'
#         default_permissions = ()
#         permissions = (
#             ("assets_read_assets", "读取资产权限"),
#             ("assets_change_assets", "更改资产权限"),
#             ("assets_add_assets", "添加资产权限"),
#             ("assets_delete_assets", "删除资产权限"),
#             ("assets_dumps_assets", "导出资产权限"),
#         ) 
#         verbose_name = '资产管理'  
#         verbose_name_plural = '资产类型'














class Assets(models.Model):
    assets_type_choices = (
                          ('server',u'物理机'),
                          ('card',u'ai卡'),
                          ('switch',u'交换机'),
                          ('route',u'路由器'),
                          ('printer',u'打印机'),
                          ('scanner',u'扫描仪'),
                          ('firewall',u'防火墙'),
                          ('storage',u'存储设备'),
                          ('wifi',u'无线设备'),
                          )
    assets_type_dicts = {
        "card": "ai卡",
        "scanner": "扫描仪",
        "firewall": "防火墙",
        "route": "路由器",
        "wifi": "无线设备",
        "storage": "存储设备",
        "server": "物理机",
        "switch": "交换机",
        "vmser": "虚拟机"
    }
    assets_type = models.CharField(choices=assets_type_choices,max_length=100,default='server',verbose_name='资产类型')
    name = models.CharField(max_length=100,verbose_name='资产编号',unique=True)
    buy_time = models.DateField(blank=True,null=True,verbose_name='购买时间')
    expire_date = models.DateField(u'过保修期',null=True, blank=True)
    manufacturer = models.CharField(max_length=100,blank=True,null=True,verbose_name='制造商')
    model = models.CharField(max_length=100,blank=True,null=True,verbose_name='资产型号')
    status =  models.ForeignKey('Status_Assent', on_delete=models.CASCADE)
    idc = models.ForeignKey('Idc_Assets',on_delete=models.CASCADE)
    group = models.ForeignKey('Group_Assets',on_delete=models.CASCADE)
    mark = models.TextField(blank=True,null=True,verbose_name='资产标示')
    cabinet = models.ForeignKey('Cabinet_Assets',on_delete=models.CASCADE)
    ip = models.CharField(unique=True,max_length=100,blank=True,null=True,verbose_name='管理ip')
    #business_tree = models.ManyToManyField('Business_Tree_Assets',blank=True)
    #department_tree = models.ManyToManyField('account.Structure',blank=True)
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'apulis_assets'
        default_permissions = ()
        permissions = (
            ("assets_read_assets", "读取资产权限"),
            ("assets_change_assets", "更改资产权限"),
            ("assets_add_assets", "添加资产权限"),
            ("assets_delete_assets", "删除资产权限"),
            ("assets_dumps_assets", "导出资产权限"),
        ) 
        verbose_name = '资产管理'  
        verbose_name_plural = '总资产表' 


    def get_idc(self):
        try:
            return Idc_Assets.objects.get(id=self.idc.id).idc_name
        except:
            return '未知'        

    def get_group(self):
        try:
            return Group_Assets.objects.get(id=self.group.id).group_name
        except:
            return '未知'  
    def get_cabinet(self):
        try:
            return Cabinet_Assets.objects.get(id=self.cabinet.id).cabinet_name
        except:
            return '未知'
    def get_status(self):
        try:
            return Status_Assent.objects.get(id=self.status.id).status
        except:
            return '未知' 

    # def get_tags(self):
    #     dataList = []
    #     for ds in Tags_Server_Assets.objects.filter(aid=self.id):
    #         data = {}
    #         data['tags_name'] = ds.tid.tags_name
    #         data['id'] = ds.tid.id
    #         dataList.append(data)
    #     return dataList          
    
    def get_disk(self):
        return [ i.to_json() for i in Disk_Assets.objects.filter(assets=self.id) ]
    
    def get_ram(self):
        return [ i.to_json() for i in Ram_Assets.objects.filter(assets=self.id) ]
    
    def get_networkcard(self):
        return [ i.to_json() for i in NetworkCard_Assets.objects.filter(assets=self.id) ]
    
    def get_business(self):
        return [ ds.business_env() + '/' + ds.node_path() for ds in self.business_tree.all() ]



                    
    def to_json(self):  
        if hasattr(self,'server_assets'): #hasattr判断是否包含对应属性
            detail  = self.server_assets.to_json()
            #print(detail)
        elif hasattr(self,'card_assets'):
            detail = self.card_assets.to_json() 
        #Server_Assets.to_json()
        json_format = {
           "id": self.id,
            "assets_type": self.assets_type_dicts[self.assets_type],
            "name": self.name,
            "buy_time": self.buy_time,
            "expire_date": self.expire_date,
            "manufacturer": self.manufacturer,
            "model": self.model,
            "status": self.get_status(),
            "idc": self.get_idc(),
            "group": self.get_group(),
            "mark": self.mark,
            "cabinet": self.get_cabinet(),
            "create_date": datetime.strftime(self.create_date, '%Y-%m-%d %H:%M:%S'),
            "update_date": datetime.strftime(self.update_date, '%Y-%m-%d %H:%M:%S'),
            "detail":detail,
        }
        #print(json_format)
        return  json_format
    
    def to_full_json(self):  
        if hasattr(self,'to_full_json'):
            detail = self.server_assets.to_json()
            
        elif hasattr(self,'network_assets'):
            detail = self.network_assets.to_json() 
            
        json_format = {
           "id": self.id,
            "assets_type": self.assets_type_dicts[self.assets_type],
            "name": self.name,
            "sn": self.sn,
            "buy_time": self.buy_time,
            "expire_date": self.expire_date,
            "disk":self.get_disk(),
            "ram":self.get_ram(),
            "business":self.get_business(),
            "networkcard":self.get_networkcard(),
            "tags":self.get_tags(),
           # "buy_user": self.get_buy_user(),
            "management_ip": self.management_ip,
            "manufacturer": self.manufacturer,
            #"provider": self.provider,
            "model": self.model,
            "status": self.status,
            "idc": self.get_idc(),
            "group": self.get_group(),
            #"host_vars": self.host_vars,
            "mark": self.mark,
            #"cabinet": self.cabinet,
            "put_zone": self.put_zone,
            "create_date": datetime.strftime(self.create_date, '%Y-%m-%d %H:%M:%S'),
            "update_date": datetime.strftime(self.update_date, '%Y-%m-%d %H:%M:%S'),
            "detail":detail,
        }
        return  json_format



class Server_Assets(models.Model): 
    use_key = (
                          ('yes',u'使用密钥登录'),
                          ('no',u'使用密码登录'),
                          
                          )
    assets= models.OneToOneField('Assets', on_delete=models.CASCADE) 
    ip = models.CharField(max_length=100,unique=True,blank=True,null=True) 
    hostname = models.CharField(max_length=100,blank=True,null=True)  
    username = models.CharField(max_length=100,blank=True,null=True)   
    passwd =  models.CharField(max_length=100,default='root',blank=True,null=True)  
    sudo_passwd =  models.CharField(max_length=100,blank=True,null=True)
    userkey =  models.CharField(choices=use_key,max_length=100)#FileField(upload_to = './upload/key/',blank=True,null=True,verbose_name='密钥文件')
    port = models.DecimalField(max_digits=6,decimal_places=0,default=22)
    cpu = models.SmallIntegerField(blank=True,null=True)
    disk_total = models.IntegerField(blank=True,null=True)
    ram_total= models.IntegerField(blank=True,null=True)
    kernel = models.CharField(max_length=100,blank=True,null=True)
    #raid = models.SmallIntegerField(blank=True,null=True)
    system = models.CharField(max_length=100,blank=True,null=True)
#     mount = models.TextField(blank=True,null=True,verbose_name='分区情况')
    manage_ip = models.CharField(unique=True,max_length=100,blank=True,null=True,verbose_name='管理ip')
    create_date = models.DateTimeField(default = timezone.now)
    update_date = models.DateTimeField(auto_now_add=True)
    '''自定义添加只读权限-系统自带了add change delete三种权限'''
    class Meta:
        db_table = 'apulis_server_assets'
        default_permissions = ()
        permissions = (
            ("assets_read_server", "读取服务器资产权限"),
            ("assets_change_server", "更改服务器资产权限"),
            ("assets_add_server", "添加服务器资产权限"),
            ("assets_delete_server", "删除服务器资产权限"),   
            ("assets_webssh_server", "登陆服务器资产权限"),         
        )
        verbose_name = '资产管理' 
        verbose_name_plural = '服务器资产表' 
    


        


        
    def to_json(self):
        json_format = {
            "id": self.id,
            "assets_id": self.assets.id,
            #"assets_type": "server",
            #"name": self.name,
            #"assets_id": self.assets.id,
            "ip": self.ip,
            "hostname": self.hostname,
            "username": self.username,
            "core": self.cpu,
            #"cpu_core":self.cpu_core,
            "disk_total": self.disk_total,
            "ram_total": self.ram_total,
            "kernel": self.kernel,
           # "raid": self.get_raid(),
            "system": self.system,
            "create_date": datetime.strftime(self.create_date, '%Y-%m-%d %H:%M:%S'),
            "update_date": datetime.strftime(self.update_date, '%Y-%m-%d %H:%M:%S')
        }
        return  json_format
    
class Card_Assets(models.Model): 
    assets_type = models.OneToOneField('Assets', on_delete=models.CASCADE) 
    ip = models.CharField(max_length=100,unique=True,blank=True,null=True,verbose_name='绑定的服务ip') 
    card_sum = models.CharField(max_length=100,blank=True,null=True)
    ram_total= models.IntegerField(blank=True,null=True)
    create_date = models.DateTimeField(default = timezone.now)
    update_date = models.DateTimeField(auto_now_add=True)
    '''自定义添加只读权限-系统自带了add change delete三种权限'''
    class Meta:
        db_table = 'apulis_card_assets'
        default_permissions = ()
        permissions = (
            ("assets_read_card", "读取服务器资产权限"),
            ("assets_change_card", "更改服务器资产权限"),
            ("assets_add_card", "添加服务器资产权限"),
            ("assets_delete_card", "删除服务器资产权限"),   
            ("assets_webssh_card", "登陆服务器资产权限"),         
        )
        verbose_name = '资产管理' 
        verbose_name_plural = 'ai卡资产表'     
        
    def to_json(self):
        json_format = {
            "id": self.id,

            #"assets_id": self.assets.id,
            "ip": self.ip,
            "card_sum": self.card_sum,
            "ram_total": self.ram_total,
            "create_date": datetime.strftime(self.create_date, '%Y-%m-%d %H:%M:%S'),
            "update_date": datetime.strftime(self.update_date, '%Y-%m-%d %H:%M:%S')
        }
        return  json_format
