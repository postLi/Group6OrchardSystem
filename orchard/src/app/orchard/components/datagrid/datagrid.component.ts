import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import $ from '../../utils/httpclient'
import {Utils} from '../../utils/utils'
import {HttpService} from '../../utils/http.service'
import {CommonService} from '../../utils/common.service'

@Component({
    selector: 'datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.scss']
})

export class DataGridComponent implements OnInit{
    dataset: Array<any> = null;
    columns: Array<string> = null;
    filterColumns: Array<string> = null;
    privateDic: Object; //私有字典
    multiple: boolean;
    currentTrIndexs: Array<number> = [];
    filterDataConfig: Object = {};
    pageCount: number = 0;
    paginationConfig: Object;
    apiConfig: string;
    searchConfig: Object = {};
    rowsCount:number;
    redactApi:string;
    redactShow:boolean = false;
    currentDataset:Array<any> = null;
    goodsredact:string;
    delapi:string;
    @Input() config: string;
    Page:Number;
    loging:boolean = false;
    totalItems:Number;
    maxSize: number = 5;
    currentPage = 1;
    smallnumPages = 0;
    itemsPerPage:Number;
    currentId:Number;
    searchData:object;
    // setPage(pageNo: number): void {
    //     this.currentPage = pageNo;
    // }
    position:string;
    success:boolean = false;
    warn:boolean = false;
    error:boolean = false;

    constructor(private common: CommonService,private http: HttpService){}

    ngOnInit(){
        this.loging = true;
        this.position = window.sessionStorage.getItem('position');
        //获取当前模块的配置
        this.http.get(this.config).then((configRes) => {
            this.loging = false;

            let cols = configRes['cols'];
            this.columns = !cols || cols == '*' ? [] : cols.split(',');

            let filterCols = configRes['filterCols'];
            this.filterColumns = !filterCols ? [] : filterCols.split(',');

            let dic = configRes['dictionary'];
            this.privateDic = dic || {};

            this.multiple = configRes['multiple'];

            this.filterDataConfig = configRes['filterData'] || {};

            this.paginationConfig = configRes['pagination'] || {};

            this.apiConfig = configRes['api'];
            
            //搜索
            this.searchConfig = configRes['search'] || {};

            //编辑
            this.redactApi = configRes['redactApi'] || {};

            //删除
            this.delapi = configRes['delapi'] || {};

            this.goodsredact = configRes['goodsRedact'] || null;
            

            this.apiRequest();

        })
    }

    apiRequest(_page = 1){
        this.loging = true;
        let pageParams = {};
        if(this.paginationConfig){
            pageParams['pageitems'] = this.paginationConfig['pageitems'];
            pageParams['page'] = _page;
            pageParams['search'] = this.searchData || {};
        }     
        
        //配置信息中的 api
        this.http.get(this.apiConfig, pageParams).then((apiRes) => {
            this.loging = false;
            this.dataset = apiRes['data'].results[0];
            // console.log(this.dataset)
            this.rowsCount = apiRes['data'].results[1][0].rowscount;
            this.totalItems =  this.rowsCount;
            let pageItems = this.paginationConfig['pageitems'];
            this.itemsPerPage = pageItems;
            this.pageCount = Math.ceil(this.rowsCount / pageItems);
             
        })
    }

    getKeys(item){
        if(item){
            return Object.keys(item);   
        }
    }

    selectTr(_idx){
        if(this.multiple){
            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.currentTrIndexs.splice(this.currentTrIndexs.indexOf(_idx), 1);
            } else {
                this.currentTrIndexs.push(_idx);
            }
        } else {
            this.currentTrIndexs = [_idx];
        }
    }

    selectAll(){
        if(this.currentTrIndexs.length != this.dataset.length){
            this.currentTrIndexs = [];
            for(let i = 0; i < this.dataset.length; i++){
                this.currentTrIndexs.push(i);
            }
        } else {
            this.currentTrIndexs = [];
        }
    }

    parentEvent(val){
        this.redactShow = val;
    }
    searchEvent(_data){
        this.apiConfig = _data.searchApi;
        this.searchData = _data.params; 
        this.apiRequest();

    }

    filterData(_key, _val){
        let _config = this.filterDataConfig[_key];
        if(!_config){
            return _val;
        } else if(_config.type == "DateFormat"){
            return Utils.dateFormat(new Date(_val), _config.format); 
        } else if(_config.type == "Replace"){
            let reg = new RegExp(_config.reg);
            if(_val != null){
                return _val.replace(reg, _config.replaceVal);       
            }else{
                return _val;
            }
        }
    }
    pageChanged(event: any): void {
        this.Page = event.page;
        this.apiRequest(event.page);
    }
    //编辑
    redact(idx){
        if(this.position == '员工'){
            console.log(this.position)
            alert('您无此操作');
        }else{

            this.redactShow = true;
            this.currentDataset = this.dataset[idx];
            // console.log(this.currentDataset)
           
            let _id = this.dataset[idx].id;
            this.currentId = _id; 
        }
    }
    del(idx){
        if(this.position == '员工'){
            console.log(this.position)
            alert('您无此操作');
        }else{ 
            let id = this.dataset[idx].id;
            let params = {};
            params['id'] = id;
            this.http.post(this.delapi,params).then((res)=>{
                if(res['status']){
                    this.dataset.splice(idx,1)
                    this.success = true; 
                        setTimeout(()=>{
                           this.success = false;   
                    }, 1000);
                    if(this.dataset.length==0){
                        let currentPage;
                        if(this.Page>1){  
                            currentPage = Number(this.Page)-1;    
                        }else{
                            currentPage = Number(this.Page)+1
                        }
                        this.apiRequest(currentPage);
                    }
                }
                 
            })
        }
    }
}